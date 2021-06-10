$(function() {
    load();
    $('.text-box>button').on({
        'click': function() {
            let todolist = getDate();
            let todoitem = $('.text-box>input').val();
            todolist.push({todo: todoitem, done: false});
            saveDate(todolist);
            $('.text-box>input').val('');
            load();
        }
    });

    function load() {
        let date = getDate();
        $('.main-list>ul').empty();
        $.each(date, function(index, value) {
            let li = $('<li><input type="checkbox"><p>' + value.todo + '</p><a index='+ index + ' href="javascript:void(0);">删除</a></li>');
            li.children('input').prop('checked', value.done);
            if (li.children('input').prop('checked'))
                $('.done-list').append(li);
            else 
                $('.doing-list').append(li);
        });

        $('.main-list a').on({
            click: function() {
                let index = $(this).attr('index');
                date.splice(index, 1);
                saveDate(date);
                load();
            }
        });

        $('.main-list').find('input').on({
            click: function() {
                let index = $(this).siblings('a').attr('index');
                date[index].done = $(this).prop('checked');
                saveDate(date);
                load();
            }
        });
    }

    function getDate() {
        let date = localStorage.getItem('todolist');
        if(date != null) {
            return JSON.parse(date);
        } else {
            return [];
        }
    }

    function saveDate(date) {
        let packDate = JSON.stringify(date)
        localStorage.setItem('todolist',packDate);
    }
});