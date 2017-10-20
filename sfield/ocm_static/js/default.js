function vp ()
{
	var viewportwidth;
	var viewportheight;
	 
	// the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
	
	if (typeof window.innerWidth != 'undefined')
	{
	  viewportwidth = window.innerWidth,
	  viewportheight = window.innerHeight
	}
	
	// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
	
	else if (typeof document.documentElement != 'undefined'
	 && typeof document.documentElement.clientWidth !=
	 'undefined' && document.documentElement.clientWidth != 0)
	{
	   viewportwidth = document.documentElement.clientWidth,
	   viewportheight = document.documentElement.clientHeight
	}
	
	// older versions of IE
	
	else
	{
	   viewportwidth = document.getElementsByTagName('body')[0].clientWidth,
	   viewportheight = document.getElementsByTagName('body')[0].clientHeight
	}
	
	return new Array(viewportwidth, viewportheight);
}

function json_failure (err)
{
	alert('Failure in request please try again.');
}

function json_failure_message (err)
{
	document.getElementById('message').innerHTML = 'Failure in request please reload page.';
}

function json_wait_failure (err)
{
	alert('Failure in request please try again.');
	hide_json_wait();
}

function show_json_wait ()
{
	document.getElementById('json_wait').style.display = 'block';
	
	if(typeof(window.pageYOffset)=='number')
	{
       var pageY = window.pageYOffset;
    }
	
    else
	{
       var pageY = document.documentElement.scrollTop;
    }
	
	pageY = pageY + 90;
    document.getElementById('json_wait_message').style.marginTop = pageY + 'px';
	
	
	var vps = vp();
	
	if (document.body.scrollHeight > vps[1])
	{
		document.getElementById('json_wait').style.height = document.body.scrollHeight + 'px';
	}
	
	else
	{
		document.getElementById('json_wait').style.height = vps[1] + 'px';
	}
}

function show_shaded_popup (id)
{
	document.getElementById(id).style.display = 'block';
	
	if(typeof(window.pageYOffset)=='number')
	{
       var pageY = window.pageYOffset;
    }
	
    else
	{
       var pageY = document.documentElement.scrollTop;
    }
	
	pageY = pageY + 90;
    document.getElementById(id + '_content').style.marginTop = pageY + 'px';
	
	var vps = vp();

    if (document.body.scrollHeight > vps[1])
    {
        document.getElementById(id).style.height = document.body.scrollHeight + 'px';
    }

    else
    {
        document.getElementById(id).style.height = vps[1] + 'px';
    }
	
	//document.getElementById(id).style.height = pageHeight + 'px';
}

function hide_json_wait ()
{
	document.getElementById('json_wait').style.display = 'none';
}

function round_corners ()
{
	roundClass(null, 'rounded', null);
	roundClass(null, 'abs_round', {'border': "#000"});
}

function hide_div (id)
{
	document.getElementById(id).style.display = 'none';
}

function show_div (id)
{
	document.getElementById(id).style.display = 'block';
}

function findPosY(obj)
{
	var curtop = 0;
	if (obj.offsetParent)
	{
		while (obj.offsetParent)
		{
			curtop += obj.offsetTop
			obj = obj.offsetParent;
		}
	}
	else if (obj.y)
		curtop += obj.y;
	return curtop;
}

function findPosX(obj)
{
	var curleft = 0;
	if (obj.offsetParent)
	{
		while (obj.offsetParent)
		{
			curleft += obj.offsetLeft
			obj = obj.offsetParent;
		}
	}
	else if (obj.x)
		curleft += obj.x;
	return curleft;
}

function asp_escape (stringy)
{
	stringy.replace("'", "\\'");
	
	return stringy;
}

function get_pull_down (id, dval)
{
	var ret = dval;
	var opts = document.getElementById(id).options;
	for (var i=0; i<opts.length; i++)
	{
		if (opts[i].selected)
		{
			ret = opts[i].value;
			break;
		}
	}
	
	return ret;
}

function get_pull_down_name (id, dval)
{
	var ret = dval;
	var opts = document.getElementById(id).options;
	for (var i=0; i<opts.length; i++)
	{
		if (opts[i].selected)
		{
			ret = opts[i].innerHTML;
			break;
		}
	}
	
	return ret;
}

function get_pull_down_obj(obj, dval){
	var ret = dval;
	var opts = obj.options;
	for (var i = 0; i < opts.length; i++) {
		if (opts[i].selected) {
			ret = opts[i].value;
			break;
		}
	}
	
	return ret;
}

function get_pull_down_obj_name (obj, dval)
{
	var ret = dval;
	var opts = obj.options;
	for (var i=0; i<opts.length; i++)
	{
		if (opts[i].selected)
		{
			ret = opts[i].innerHTML;
			break;
		}
	}
	
	return ret;
}

function get_radio (id, dval)
{
	var ret = dval;
	var radios = document.getElementsByName(id);
	for (var i=0; i < radios.length; i++)
	{
		if (radios[i].checked)
		{
			ret = radios[i].value;
			break;
		}
	}
	
	return ret;
}

function set_pull_down (id, val)
{
	ret = '';
	var opts = document.getElementById(id).options;
	for (var i=0; i<opts.length; i++)
	{
		if (opts[i].value == val)
		{
			opts[i].selected = true;
		}
		
		else
		{
			opts[i].selected = false;
		}
	}
	
	return ret;
}

function open_win (link, name, width, height)
{
	mypopup = window.open(link, name, 'scrollbars=yes,resizable,width='+ width + ',height=' + height);
}

function open_in (link)
{
	opener.location.href = link;
}

function show_login ()
{
	var l = document.getElementById('login_popup');
	var base = document.getElementById('login_base');
	
	var x = findPosX(base);
	var y = findPosY(base);
	
	l.style.top = y + 'px';
	l.style.left = x + 'px';
	l.style.display = 'block';
}

function autoResize()
{
	var newheight;
	var newwidth;

	jQuery("iframe[name='wcal']").each(function ()
	{
		if (!window.opera && !document.mimeType && document.all && document.getElementById){
				newheight = this.contentWindow.document.body.offsetHeight;
				newwidth = this.contentWindow.document.body.offsetWidth;
		}else if(document.getElementById){
				newheight = this.contentWindow.document.body.scrollHeight;
				newwidth = this.contentWindow.document.body.scrollWidth;
		}

		this.height= (newheight + 16) + "px";
		//document.getElementById(id).width= (newwidth + 16) + "px";
	})
}

function autoResizeName (fname)
{
	var newheight;
	var newwidth;
	
	jQuery("iframe[name='" + fname + "']").each(function ()
	{
		if (!window.opera && !document.mimeType && document.all && document.getElementById){
				newheight = this.contentWindow.document.body.offsetHeight;
				newwidth = this.contentWindow.document.body.offsetWidth;
		}else if(document.getElementById){
				newheight = this.contentWindow.document.body.scrollHeight;
				newwidth = this.contentWindow.document.body.scrollWidth;
		}
		
		
		this.height = (newheight + 20) + "px";
		this.width= (newwidth + 20) + "px";
	})
}

jQuery(document).ready(round_corners);
