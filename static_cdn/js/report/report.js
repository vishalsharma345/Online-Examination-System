var s3Path='https://s3-ap-southeast-1.amazonaws.com/gw-mdsy/2019/';
$(document).ready(function() {
    $("#examperPage").change(function() {
        var id = $(this).val();
        location.href = "index.php?pageName=report&id1=" + id
    });
    $("#praceperPage").change(function() {
        var id = $(this).val();
        var hiddenvar = document.getElementById("hiddensortablevariable").value;
        location.href = "index.php?pageName=report&ID2=" + hiddenvar + "&id2=" + id
    });
    $("#quizperPage").change(function() {
        var id = $(this).val();
        var hiddenvarQuiz = document.getElementById("hiddenvarQuiz").value;
        location.href = "index.php?pageName=report&ID4=" + hiddenvarQuiz + "&id4=" + id
    });
    $("#omrperPage").change(function() {
        var id = $(this).val();
        location.href = "index.php?pageName=report&id3=" + id
    });
    $("#mailperPage").change(function() {
        var id = $(this).val();
        location.href = "index.php?pageName=inbox/mailList&id=" + id
    }); var t = 1;
    $("#search").keyup(function(eh) {
        var searchbox = $(this).val();
        var tt = document.getElementById('idcheck').value;
        var dataString = 'searchword=' + searchbox + '&mode=' + 'auto';
        var multiple = document.getElementById('formultiple').value;
        if (searchbox == '') {
            document.getElementById('idcheck').value = 1;
            t = 1
        } else if (tt == 2) {
            if (eh.keyCode == 40) {
                var limit = document.getElementById('limit').value;
                if (limit == t - 1) {
                    t = 1;
                    $("#mailid" + limit).removeClass("temp");
                    $("#mailid" + t).addClass("temp")
                }
                if (t > 1) {
                    var tt1 = t;
                    tt1 = tt1 - 1;
                    $("#mailid" + tt1).removeClass("temp");
                    $("#mailid" + t).addClass("temp");
                    document.getElementById('idcheck4').value = $("#mailid" + t).html();
                    document.getElementById('idcheck5').value = t
                } else {
                    $("#mailid" + t).addClass("temp");
                    document.getElementById('idcheck4').value = $("#mailid" + t).html();
                    document.getElementById('idcheck5').value = t
                }
                t++
            } else if (eh.keyCode == 38) {
                var tt2 = t - 1;
                var tt3 = t - 2;
                t--;
                $("#mailid" + tt2).removeClass("temp");
                $("#mailid" + tt3).addClass("temp");
                document.getElementById('idcheck4').value = $("#mailid" + t).html();
                document.getElementById('idcheck5').value = t
            }
        } else if (multiple == 1 && eh.keyCode != 13) {
            $.ajax({
                type: "POST",
                url: "index.php?pageName=insertAjaxProfile",
                data: dataString,
                cache: false,
                success: function(html) {
                    document.getElementById('idcheck').value = 2;
                    $("#display").html(html).show()
                }
            })
        } else if (eh.keyCode == 13) {
            $("#display").hide();
            t = 1
        } else {
            $.ajax({
                type: "POST",
                url: "index.php?pageName=insertAjaxProfile",
                data: dataString,
                cache: false,
                success: function(html) {
                    document.getElementById('idcheck').value = 2;
                    $("#display").html(html).show()
                }
            })
        }
        return false
    })
});

function yourTestAnalisis(testid, studentid, temp, testType) {
    if (temp == 2 || temp == 8) {
        if (document.getElementById("testAnalysis" + temp).style.display == 'block') {
            document.getElementById("testAnalysis" + temp).style.display = 'none';
            document.getElementById("imgid" + temp).src = s3Path+'student/images/drop-detail-icon.png';
            return false
        }
    }
    if (temp == 3) {
        if (document.getElementById("testAnalysis3").style.display == 'block') {
            document.getElementById("testAnalysis3").style.display = 'none';
            document.getElementById("imgid" + temp).src = s3Path+'student/images/drop-detail-icon.png';
            return false
        }
    }
    if (temp == 4) {
        if (document.getElementById("testAnalysis4").style.display == 'block') {
            document.getElementById("testAnalysis4").style.display = 'none';
            document.getElementById("imgid" + temp).src = s3Path+'student/images/drop-detail-icon.png';
            return false
        }
    }
    if (temp == 5) {
        if (document.getElementById("testAnalysis5").style.display == 'block') {
            document.getElementById("testAnalysis5").style.display = 'none';
            document.getElementById("imgid" + temp).src = s3Path+'student/images/drop-detail-icon.png';
            return false
        }
    }
    if (temp == 6) {
        if (document.getElementById("testAnalysis6").style.display == 'block') {
            document.getElementById("testAnalysis6").style.display = 'none';
            document.getElementById("imgid" + temp).src = s3Path+'student/images/drop-detail-icon.png';
            return false
        }
    }
    if (temp == 7) {
        if (document.getElementById("testAnalysis7").style.display == 'block') {
            document.getElementById("testAnalysis7").style.display = 'none';
            document.getElementById("imgid" + temp).src = s3Path+'student/images/drop-detail-icon.png';
            return false
        }
    }
    if (temp == 9) {
        if (document.getElementById("testAnalysis9").style.display == 'block') {
            document.getElementById("testAnalysis9").style.display = 'none';
            document.getElementById("imgid" + temp).src = s3Path+'student/images/drop-detail-icon.png';
            return false
        }
    }
    var urldata = "testid=" + testid + "&testType=" + testType + "&studentid=" + studentid;
    $.ajax({
        type: "post",
        url: 'index.php?pageName=reports/yourtTestAnalysis',
        data: urldata,
        error: function() {
            alert("error")
        },
        success: function(result) {
            if (temp == 1) {
                $("#testAnalysis").html(result)
            }
            if (temp == 2 || temp == 8) {
                $("#testAnalysis" + temp).html(result);
                $("#testAnalysis" + temp).show();
                document.getElementById("imgid" + temp).src = s3Path+'student/images/drop-detail-icon1.png'
            }
            if (temp == 3) {
                $("#testAnalysis3").html(result);
                $("#testAnalysis3").show();
                document.getElementById("imgid" + temp).src = s3Path+'student/images/drop-detail-icon1.png'
            }
            if (temp == 4) {
                $("#testAnalysis4").html(result);
                $("#testAnalysis4").show();
                document.getElementById("imgid" + temp).src = s3Path+'student/images/drop-detail-icon1.png'
            }
            if (temp == 5) {
                $("#testAnalysis5").html(result);
                $("#testAnalysis5").show();
                document.getElementById("imgid" + temp).src = s3Path+'student/images/drop-detail-icon1.png'
            }
            if (temp == 6) {
                $("#testAnalysis6").html(result);
                $("#testAnalysis6").show();
                document.getElementById("imgid" + temp).src = s3Path+'student/images/drop-detail-icon1.png'
            }
            if (temp == 7) {
                $("#testAnalysis7").html(result);
                $("#testAnalysis7").show();
                document.getElementById("imgid" + temp).src = s3Path+'student/images/drop-detail-icon1.png'
            }
            if (temp == 9) {
                $("#testAnalysis9").html(result);
                $("#testAnalysis9").show();
                document.getElementById("imgid" + temp).src = s3Path+'student/images/drop-detail-icon1.png'
            }
        }
    })
}

function yourTestAnalisisOmr(testid, studentid, temp) {
    if (temp != '1') {
        if (document.getElementById("testAnalysisomr" + temp).style.display == 'block') {
            document.getElementById("testAnalysisomr" + temp).style.display = 'none';
            document.getElementById("omrimgid" + temp).src = s3Path+'student/images/drop-detail-icon.png';
            return false
        } else {
            document.getElementById("testAnalysisomr" + temp).style.display = 'block';
            document.getElementById("omrimgid" + temp).src = s3Path+'student/images/drop-detail-icon1.png'
        }
    }
    var urldata = "testid=" + testid + "&studentid=" + studentid;
    $.ajax({
        type: "post",
        url: 'index.php?pageName=reports/yourTestAnalysisOmr',
        data: urldata,
        error: function() {},
        success: function(result) {
            if (temp != '1') {
                $("#testAnalysisomr" + temp).html(result)
            }
        }
    })
}

function changereport(layer, panel) {
    var tab = ['first', 'second', 'third', 'fourth'];
    var panel1 = ['panel1', 'panel2', 'panel3', 'panel4'];
    for (a = 0; a < 4; a++) {
        if (tab[a] == layer) {
            $("#" + layer).removeClass('test-tab-box-active');
            $("#" + layer).addClass('test-tab-box-1');
            $("#" + panel).show();
        } else {
            $("#" + tab[a]).removeClass('test-tab-box-1');
            $("#" + tab[a]).addClass('test-tab-box-active');
            $("#" + panel1[a]).hide();
        }
    }
}
check = 0;

function showdata(id) {
    if (check == 0) {
        $("#popdata" + id).hide();
        $("#popdata111" + id).hide();
        $("#popdata1111" + id).show();
        $("#popdata11" + id).show();
        document.getElementById('imagechang' + id).src = s3Path+'student/images/news-arrow1.jpg'
        $("#popdata9" + id).html('less more');
        check = id
    } else if (id == check) {
        $("#popdata11" + id).hide();
        $("#popdata" + id).show();
        document.getElementById('imagechang' + id).src = s3Path+'student/images/news-arrow.jpg'
        $("#popdata9" + id).html('read more');
        check = 0
    } else {
        $("#popdata" + check).show();
        $("#popdata11" + check).hide();
        $("#popdata" + id).hide();
        $("#popdata11" + id).show();
        $("#popdata9" + id).html('less more');
        $("#popdata9" + check).html('read more');
        document.getElementById('imagechang' + check).src = s3Path+'student/images/news-arrow.jpg'
        document.getElementById('imagechang' + id).src = s3Path+'student/images/news-arrow1.jpg'
        check = id
    }
}

function getData(id, count) {
    if (document.getElementById('save').value == "") {
        document.getElementById('save').value = id;
        var temp = document.getElementById('save').value
    } else {
        var temp = document.getElementById('save').value;
        temp = temp + "," + id;
        document.getElementById('save').value = temp
    }
    if (document.getElementById('idcheck7').value == "") {
        document.getElementById('idcheck7').value = $("#mailid11" + count).val()
    } else {
        var temp1 = $("#mailid11" + count).val();
        var temp3 = document.getElementById('idcheck7').value;
        document.getElementById('idcheck7').value = temp3 + "," + temp1
    }
    document.getElementById('formultiple').value = 1;
    document.getElementById('idcheck').value = 1;
    document.getElementById('search').value = temp;
    $("#display").hide()
}

function reportExamPerPage(sort) {
    location.href = "index.php?pageName=report" + sort
}
