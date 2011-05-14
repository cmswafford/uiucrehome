"""
This script reads raw current and voltage data from the serial port
and performs several power calculations on this data.

NOTE: Please DO NOT edit the contents of this file unless you 
have some background in DSP, i.e. you've at least taken ECE 410. Unless you
have a thorough understanding of Discrete Fourier Transforms, do not change
anything, especially the sampling rate of the ADC on the microcontroller,
the total number of samples, or any sections of code involving fft's, ifft's,
or freqz's.  Thank you.

Authors: Sammy Nammari (nammari1@illinois.edu) and Jessica Perng (perng2@illinois.edu)

"""

# import necessary packages
from numpy import *
import matplotlib.pyplot as plt
from scipy.signal import freqz
from scipy import *
import serial
import sys

# set up serial port connection
port = '/dev/ttyUSB0'
s = serial.Serial(port,57600)

# send code telling arduino to sample and send data
s.write(sys.argv[1])

# read data
data = zeros(512)
for i in range(512):
	data[i] = s.readline()

# close the serial connection
s.close()

# extract voltage and current
data = data.reshape(256,2)
v = data[:,0]
i = data[:,1]

# restore data to original scale
vscale = 0.497		# determined experimentally
iscale = .0144		# determined experimentally
#vscale = 1
#iscale = 1
v = (v-mean(v))*vscale
i = (i-mean(i))*iscale
#print v.max()
#print i.max()

# find sampling rate and sampling period
Wv, V = freqz(v,1,256)
Wi, I = freqz(i,1,256)
Vmax = V.max()					# max value
Wmax = V.argmax()				# index of max value
Fs = (60.0*2*(Wv.size))/Wmax	# calculate sampling rate
T = 1/Fs


# perform a time shift to account for the 112 microsecond delay between
# analogRead(voltagePin) and analogRead(currentPin)
delay = .000112                  
N = 256
#w = -pi : pi/N : pi - pi/N
w = arange(-pi,pi-pi/N,pi/N)
i = ifft(exp(1j*delay*w)*fft(i,N*2),N*2)
i = real(i[0:N])                      

"""
# truncate to an even period
#samplesPerPeriod = Fs/60.
#periods = size(v)/samplesPerPeriod
#newN = round(floor(periods)*samplesPerPeriod)

#vold = v
#iold = i
#v = v[0:newN]
#i = i[0:newN]
#print mean(v)
#v = v-mean(v)
#i = i-mean(i)

#print samplesPerPeriod
#print periods
#print newN
#print size(v)
"""

# power calculations
# when mean = 0, standard deviation == RMS
vrms = std(v)					# RMS voltage
irms = std(i)					# RMS current
S = vrms*irms					# magnitude of apparent power
P = mean(v*i)					# real power consumed
PF = P/S						# power factor
PFangle = arccos(PF)*180/pi		# power factor angle (degrees)

print 'RMS voltage: ', vrms
print 'RMS current: ', irms
print 'Apparent Power Mag: ', S
print 'Real Power: ', P
print 'Power Factor: ', PF
print 'Power Factor Angle: ', PFangle
#print 'Sampling Rate: ', Fs
#print 'fft size: ', Wv.size
#print 'location of max: ', Wmax

# plots of v, i, V and I
plt.subplot(2,2,1)
plt.plot(v,'b.')
plt.title("voltage")

plt.subplot(2,2,2)
plt.plot(i,'r')
plt.title("current")

plt.subplot(2,2,3)
plt.plot(Wv,abs(V),'g')
#plt.plot(vold,'b.')
plt.title("fft of voltage")

plt.subplot(2,2,4)
#plt.plot(iold,'b.')
plt.plot(Wi,abs(I),'g')

plt.title("fft of current")

#plt.show()

