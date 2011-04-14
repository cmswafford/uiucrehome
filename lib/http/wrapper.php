<?php
if( isset($_GET['snippet']) )
  require_once('./bootstrap.php');
else
  require_once('./header.php');

//$oLog->log_msg("\n------REQUESTED FILE: ".$_GET['file']).'------';

if( isset($_GET['file']) )
{
  if( $_GET['file'] )
  {
    # Include controller
    if( file_exists(PUBLIC_PATH.$_GET['file'].'.php') && is_readable(PUBLIC_PATH.$_GET['file'].'.php') )
      include(PUBLIC_PATH.$_GET['file'].'.php');

    # Include HTML file
    if( file_exists(HTML.$_GET['file'].'.html') && is_readable(HTML.$_GET['file'].'.html') )
    {
      if( !isset($config['display_html']) || $config['display_html'] !== false )
        include(HTML.$_GET['file'].'.html');
      elseif( $_GET['snippet'] )
        include(HTML.$_GET['file'].'.html');
    }
  }
  else
    include(PUBLIC_PATH.'index.php');
}

if( !isset($_GET['snippet']) )
  require_once(LIB.'http/footer.php');

//$oLog->log_msg("------END REQUESTED FILE: ".$_GET['file'])."------\n";
?>
