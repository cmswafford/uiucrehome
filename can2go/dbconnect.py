
'''
Created on 2011-06-02

@author: Dan Mestas 'mestas1'
@email: dan5446@gmail.com
'''
import shlex, math, MySQLdb, time
from subprocess import Popen, PIPE
from rehome_defs import controller_path, state_var_check_args

class dbconnect(object):
    
    def __init__(self):
        tries = 0
        while(tries < 5):
            try:
                self.db = MySQLdb.connect(host='localhost', user='uiucsd', passwd='uiuc$d2011', db='uiucsd')
                tries = 5
            except MySQLdb.OperationalError:
                tries += 1
                time.sleep(5)
        self.cur = self.db.cursor()
    
    def insert_gallon(self,id):
        self.cur.execute('''INSERT INTO `uiucsd`.`Water_logs` (`device_id`, `timestamp`) VALUES ('''+ str(id) + ''', CURRENT_TIMESTAMP);''')


    def door_open(self,id):
        self.cur.execute('''UPDATE `door_states` SET state = 0, timestamp = CURRENT_TIMESTAMP WHERE device_id = '''+ str(id))

    def door_close(self,id):
        self.cur.execute('''UPDATE `door_states` SET state = 1, timestamp = CURRENT_TIMESTAMP WHERE device_id = '''+ str(id))
   
