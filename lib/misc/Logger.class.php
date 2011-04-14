<?php

class Logger
{
  # Global variables
  protected $sLogFile = ''
           ,$fFile = ''
           ,$sOutputBuffer = '';

  public static $sError;

  function __construct ( $sLog )
  {
    $this->sLogFile = $sLog;
    if ( $this->sLogFile != 'stdout' )
    {
      if( !file_exists($this->sLogFile) )
      {
        self::$sError = "File doesn't exist";
        return false;
      }
      if ( !is_readable($this->sLogFile) )
      {
        self::$sError = "File isn't readable";
        return false;
      }
      if ( !is_writable($this->sLogFile) )
      {
        self::$sError = "File isn't writeable";
        return false;
      }

      if( !$fFile = fopen( $this->sLogFile, 'a+' ) )
      {
        self::$sError = "Failed to open file";
        return false;
      }
      $this->fFile = $fFile;
    }

    return true;
  }

  public function log_msg ( $sMessage )
  {
    return $this->log($sMessage);
  }

  # Log a message to file or put in the buffer if using stdout
  public function log ( $sMessage )
  {
    $sMessage = dump($sMessage,true);
    if ( $this->sLogFile == 'stdout' )
      $this->sOutputBuffer .= $sMessage;
    else
    {
      if ( !fwrite( $this->fFile, $sMessage."\n" ) )
      {
        self::$sError = "Failed to write to ".$this->sLogFile;
        return false;
      }
    }

    return true;
  }

  # Returns output buffer
  public function output ()
  {
    if( !$this->fFile )
      return $this->sOutputBuffer;
    else
      return file_get_contents($this->sLogFile);
  }

  function __deconstruct ()
  {
    fclose( $this->fFile );
    return true;
  }
}

?>
