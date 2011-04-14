<?php

# The purpose of this file is so that in files later in the 
# execution sequence use constants which provide security of 
# variables not being changed after this file
# i.e. config variables that get defined as constants should not be used
# use the constant instead

# Site Options
define( 'SITE_NAME',        $aConfig['site_name'] );
define( 'SITE_NAME_VANITY', $aConfig['site_name_vanity'] );
define( 'TITLE_DEFAULT',    $aConfig['page_title_default'] );

# System Paths
define( 'ROOT_PATH',    $aConfig['root_path'] );
define( 'PUBLIC_PATH',  $aConfig['public_path'] );
define( 'CRON_PATH',    $aConfig['cron_path'] );
define( 'JS_PATH',      $aConfig['js_path'] );
define( 'IMG_PATH',     $aConfig['img_path'] );
define( 'LIB',          $aConfig['lib_path'] );
define( 'HTML',         $aConfig['html_path'] );

# Site URLs
define( 'WWW', $aConfig['root_url'] );
define( 'IMG', $aConfig['img_url'] );
define( 'JS',  $aConfig['js_url'] );
define( 'CSS', $aConfig['css_url'] );
//define( 'COOKIE_DOMAIN', $aConfig['cookie_domain'] );

/*if( isset($_SERVER['REQUEST_URI']) )
{
  if( strpos($_SERVER['REQUEST_URI'],'/admin') !== false )
    define('ADMIN_PAGE',true);
  else
    define('ADMIN_PAGE',false);
}*/

?>
