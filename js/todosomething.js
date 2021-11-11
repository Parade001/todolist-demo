/*
 * @Descripttion: 这是熊大写的
 * @version: 1.0.0
 * @Author: xt_xiong
 * @Date: 2021-11-04 09:16:19
 * @LastEditors: xt_xiong
 * @LastEditTime: 2021-11-11 08:05:57
 */
$(function () {
    load();
    $("#title").on("keydown", function (e) {
        if (e.keyCode === 13) {
            if ($(this).val() === "") {} else {
                var info = {
                    title: $(this).val().trim(),
                    done: false
                }
                var local = getData(); //把local的数组更新数据 并追加给local数组
                local.push(info); //把他推给本地存储
                saveData(local);
                load(); //本地存储数据渲染加载页面
                $(this).val("");
            }
        }
    });

    function getData() {
        var str = localStorage.getItem("#todolist");
        if (str !== null) {
            return JSON.parse(str);
        } else {
            return [];
        }
    }

    function saveData(data) {
        var str = JSON.stringify(data);
        localStorage.setItem("#todolist", str);
    }

    function load() {
        var data = getData();
        $("#todolist,#donelist").html("")
        data.forEach(function (value, index) {
            console.log(value);
            if (value.done) {
                $("#donelist").prepend(`<li data-index="${index}"> <input type = "checkbox" checked> <p> ${value.title}'</p><a href="javascript:;"></a></li>`)
            } else {
                $("#todolist").prepend(`<li data-index="${index}"> <input type = "checkbox"> <p>${value.title}</p><a href:"javascript:;"></a></li>`)
            }
        })
    }
    $("#todolist").on("click", 'a', function () {
        var index = $(this).parent().data("index");
        var local = getData();
        local.splice(index, 1);
        saveData(local);
        load();
    })

    $("#todolist,#donelist").on("change", "input", function () {
        var index = $(this).parent().data("index")
        var local = getData();
        local[index].done = $(this).prop("checked");
        saveData(local);
        load();
    })
    load();

    function count() {
        var todoCount = 0;
        var doneCount = 0;
        var local = getData();
        local.forEach(function (value, index) {
            if (value.done) {
                doneCount++
            } else {
                todoCount++
            }
        })
        $("#todocount").html(todoCount);
        $("#donecount").html(doneCount);
    }

})