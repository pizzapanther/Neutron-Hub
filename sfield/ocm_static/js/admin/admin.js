function cat_array (array) {
	var ret = '';
	for (var i=0; i < array.length; i++) {
		ret += array[i];
	}
	
	return ret;
}
	
function round_admin ()
{
	jQuery(".abs_round_admin").each(
		function ()
		{
			if (jQuery(this).hasClass('roundDone')) {}
			else
			{
				roundElement(this, {'border': "#184D18"});
				jQuery(this).addClass('roundDone');
			}
		}
	);
	
	jQuery(".round_border").each(
		function ()
		{
			if (jQuery(this).hasClass('roundDone')) {}
			else
			{
				roundElement(this, {'border': "#184D18"});
				jQuery(this).addClass('roundDone');
			}
		}
	);
}

function toggle ()
{
	jQuery("input[type='checkbox']").each(function ()
	{
		if (this.checked)
		{
			this.checked = false;
		}
		
		else
		{
			this.checked = true;
		}
	});
}

function user_search (link)
{
	show_json_wait();
	var search = document.getElementById('search').value;
	var stype = get_pull_down('stype', 'lname');
	
	new Ajax.Updater('user_results', link, { method: 'post' , parameters: {task: 'search', search: search, stype: stype, fill: ufill_id}, onComplete: hide_json_wait, onFailure: json_wait_failure});
	
	return false;
}

function user_search_email (link)
{
	show_json_wait();
	var search = document.getElementById('search').value;
	var stype = get_pull_down('stype', 'lname');
	
	new Ajax.Updater('user_results', link, { method: 'post' , parameters: {task: 'search', search: search, stype: stype, fill: ufill_id, uret: 'email'}, onComplete: hide_json_wait, onFailure: json_wait_failure});
	
	return false;
}

function set_user (id, sn)
{
	document.getElementById(id).value = sn;
	
	try
	{
		custom_set_user(sn);
	}
	
	catch (e)
	{
		hide_div('usearch');
	}
}

jQuery(document).ready(round_admin);
