// Generated by CoffeeScript 1.7.1
$(function() {
  var $policyList, editedEvent, keypressEvent;
  $policyList = $('#policy-list');
  $.ajax({
    url: "/policy/list/",
    type: "GET",
    success: function(data) {
      var html, source, template;
      console.log(data);
      source = $("#policy-list-template").html();
      template = Handlebars.compile(source);
      html = template({
        policys: data.body
      });
      return $policyList.html(html);
    },
    failed: function() {
      return alert("GET POLICY LIST FAILED!");
    }
  });
  $policyList.on('click', 'button[action=remove]', function(e) {
    var $elt, answer, pid;
    $elt = $(this).closest('li');
    pid = $elt.attr('policy-id');
    answer = confirm('你确定删除吗？');
    if (!answer) {
      return;
    }
    $.ajax({
      url: "/policy/" + pid + "/",
      type: "DELETE",
      success: function(data) {
        if (data.code === 0) {
          return $elt.animate({
            width: '10px'
          }, 1000, function() {
            return $(this).remove();
          });
        } else {
          return alert(data.body);
        }
      },
      fail: function() {
        return alert("删除失败，请稍候再试");
      }
    });
  });
  $policyList.on('click', 'button[action=edit]', function(e) {
    var $elt, $href, $icon, $input;
    $elt = $(this).closest('li');
    $input = $elt.find('input');
    $href = $elt.find('a');
    $input.show();
    $href.hide();
    $icon = $elt.find('button[action=edit] i');
    $icon.removeClass("glyphicon-pencil").addClass("glyphicon-ok");
    $elt.find('button[action=edit]').attr('action', 'editing');
  });
  editedEvent = function(e) {
    var $elt, $href, $icon, $input, oldValue, pid, value;
    $elt = $(e.target).closest('li');
    pid = $elt.attr('policy-id');
    $input = $elt.find('input');
    $href = $elt.find('a');
    value = $input.val();
    oldValue = $href.text();
    console.log(pid, value, oldValue);
    $icon = $elt.find('button[action=editing] i');
    $icon.removeClass("glyphicon-ok").addClass("glyphicon-pencil");
    $href.show();
    $input.hide();
    $elt.find('button[action=editing]').attr('action', 'edit');
    if (value === "" || oldValue === value) {
      return;
    }
    return $.ajax({
      url: "/policy/" + pid + "/description/",
      type: "PUT",
      data: {
        description: value
      },
      success: function(data) {
        if (data.code === 0) {
          return $href.html("<strong>" + value + "</strong>");
        } else {
          return alert(data.body);
        }
      },
      fail: function() {
        return alert("通信失败，请稍候再试");
      }
    });
  };
  keypressEvent = function(e) {
    if (e.which === 13) {
      return editedEvent(e);
    }
  };
  $policyList.on('click', 'button[action=editing]', editedEvent);
  $policyList.on('keypress', 'input[type=text]', keypressEvent);
});
