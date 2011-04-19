<?php

ini_set('date.timezone','America/Chicago');

# Initialize
$aConfig = array ();
$aConfig['mysql'] = array ();

# System Paths
$aConfig['root_path']	    = '/var/www/uiucrehome/'; # Needs trailing /
$aConfig['config_path']   = $aConfig['root_path'].'config/';
$aConfig['public_path']	  = $aConfig['root_path'].'public/';
$aConfig['cron_path']	    = $aConfig['root_path'].'cron/';
$aConfig['lib_path']	    = $aConfig['root_path'].'lib/';
$aConfig['html_path']	    = $aConfig['root_path'].'html/';
$aConfig['js_path']	      = $aConfig['public_path'].'js/';
$aConfig['css_path']	    = $aConfig['public_path'].'css/';
$aConfig['img_path']	    = $aConfig['public_path'].'images/';

# Site Options
$aConfig['site_name']	          = "UIUCSD";
$aConfig['site_name_vanity']	  = "UIUC Solar Decathlon";
$aConfig['page_title']          = "";
$aConfig['page_title_default']  = "UIUC Solar Decathlon";
$aConfig['page_title_suffix']   = " | UIUC Solar Decathlon";

# Default URIs
$aConfig['root_url']	    = 'http://localhost';
$aConfig['js_url']	      = $aConfig['root_url'].'/js/';
$aConfig['css_url']	      = $aConfig['root_url'].'/public/css/';
$aConfig['img_url']	      = $aConfig['root_url'].'/images/';

# Default HTML settings
$aConfig['display_header']  = false;
$aConfig['display_footer']  = false;
$aConfig['display_html']    = false;
$aConfig['body_id']         = '';
$aConfig['body_class']      = '';

# Site debug for stdout. Value must === true/false
$aConfig['debug'] = true;

# Database settings
$aConfig['mysql']['host']     = "localhost";
$aConfig['mysql']['database'] = 'uiucsd';
$aConfig['mysql']['user']     = "uiucsd";
$aConfig['mysql']['password'] = '********';

$aConfig['env'] = 'development';

