<?php

if( isset($aConfig['jsonp']) && $aConfig['jsonp'] === true )
  $aConfig['html'] = false;
if( isset($aConfig['ajax']) && $aConfig['ajax'] === true )
  $aConfig['html'] = false;

# Display HTML 
if( isset($aConfig['html']) )
{
  if( $aConfig['html'] === true ):
    $aConfig['display_header'] = true;
    $aConfig['display_html']    = true;
    $aConfig['display_footer'] = true;
  elseif( $aConfig['html'] === false ):
    $aConfig['display_header'] = false;
    $aConfig['display_html']    = false;
    $aConfig['display_footer'] = false;
  endif;
}

$sThisPageContents = ob_get_clean();

# By default always append the page_title_suffix
#
# To set a page title that discludes the page_title_suffix, 
# simply set $aConfig['page_title_suffix'] = '' in that script
if ( $aConfig['page_title'] )
  $aConfig['page_title'] .= $aConfig['page_title_suffix'];
else
  $aConfig['page_title'] = $aConfig['page_title_default'];

# Show debugging info if neccesary
if( $aConfig['env'] != 'production' && $aConfig['debug'] === true )
{
  //$oDebug->log ( 'Queries: '.dump($mysql->aQueries, true) ) );
  $oDebug->log ( "<br><br>----------------------------------<br><br>\n" );
  $oDebug->log ( '$_GET: '.dump($_GET, true, true) );
  $oDebug->log ( "\n----------------------------------<br><br>\n" );
  $oDebug->log ( '$_POST: '.dump($_POST, true, true) );
  $oDebug->log ( "\n----------------------------------<br><br>\n" );
  $oDebug->log ( '$_SESSION: '.dump($_SESSION, true, true) );
  $oDebug->log ( "\n----------------------------------<br><br>\n" );
  $oDebug->log ( '$_COOKIE: '.dump($_COOKIE, true, true) );
  $oDebug->log ( "\n----------------------------------<br><br>\n" );
  $oDebug->log ( '$_SERVER: '.dump($_SERVER, true, true) );
  $oDebug->log ( "\n----------------------------------<br><br>\n" );
  $oDebug->log ( 'QUERIES: '.dump(DB::getQueries(), true, true) );
  $oDebug->log ( "\n----------------------------------<br><br>\n" );
  $oDebug->log ( '$aConfig: '.dump($aConfig, true, true) );
  $oDebug->log ( "\n----------------------------------<br><br>\n" );
  //$oDebug->log ( '$_REQUEST: '.dump($_REQUEST, true) ) );
  //$oDebug->log ( "<br>----------------------------------<br>" );
}

# Construct JS includes string
$sJS = '';
if( isset($aJS) && !empty($aJS) )
  foreach ( $aJS as $sFile ) 
    $sJS .= "\n".'  <script type="text/javascript" src="'.$sFile.'"></script>'."\n";

# Construct CSS includes string
$sCSS = '';
if( isset($aCSS) && !empty($aCSS) )
  foreach ( $aCSS as $sFile ) 
    $sCSS .= "\n".'  <link rel="stylesheet" href="'.$sFile.'" type="text/css" media="screen">'."\n";

# Display header HTML
if ( $aConfig['display_header'] === true )
{
  if( isset($aConfig['header_html']) )
    require_once( $aConfig['header_html'] );
  elseif( isset($aConfig['header_html']) )
    echo $aConfig['header_html'];
  else
    require_once( HTML.'header.html' );
}

# Display this specific page's contents
echo $sThisPageContents;

# End page load time clock ALAP (opposite of ASAP)
$fMicroEnd = microtime();
list ( $fMicroSecs, $fSecs ) = explode ( " ", $fMicroEnd );
define( 'END_TIME', $fMicroSecs+$fSecs );

# Calculate the page load time
define( 'LOAD_TIME', round(END_TIME-START_TIME, 5) );

# Nothing should go below here besides displaying the footer

# Load the footer template file into the template engine
if ( $aConfig['display_footer'] === true )
  require_once( HTML.'footer.html' );
elseif( isset($aConfig['footer_html']) )
  echo $aConfig['footer_html'];

if( isset($aConfig['redirect']) && is_string($aConfig['redirect']) )
  header('Location:'.$aConfig['redirect']);

if( isset($aConfig['jsonp']) && $aConfig['jsonp'] === true 
 && isset($aReturn) )
{
  # The JSONP callback function should be specified in 
  # either $_GET['callback'] or $_POST['callback']
  $sCallback = isset($_GET['callback']) ? $_GET['callback'] : $_POST['callback'];
  echo $sCallback.'('.json_encode($aReturn).');';
}

?>
