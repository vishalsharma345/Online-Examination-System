
/*function popup(packageId) {
    
        //location.href='index.php?pageName=popUp;
        var pageURL='index.php?pageName=popUp&id='+packageId+'&mode=1';
        var title='vikash';
        var w=800;
        var h=400;
var left = (screen.width/2)-(w/2);
var top = (screen.height/2)-(h/2);
var targetWin = window.open (pageURL, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);

}*/
 function popForSolution(qnid,subjectid,quetype,ser,language)
 { 
   
        var pageURL='index.php?pageName=solution&qnid='+qnid+'&subjectid='+subjectid+'&serialno='+ser+'&quetype='+quetype+'&language='+language;
        var title='vikash';
        var w=600;
        var h=400;
var left = (screen.width/2)-(w/2);
var top = (screen.height/2)-(h/2);
var targetWin = window.open (pageURL, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
 }
 function popForEssay(essayid){

  var pageURL='index.php?pageName=essayDisplay&essayid='+essayid;
        var title='vikash';
        var w=600;
        var h=400;
var left = (screen.width/2)-(w/2);
var top = (screen.height/2)-(h/2);
var targetWin = window.open (pageURL, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
}
function bookmark(studentId,testId,quesNo,language)//work when we click bookmark button
{//alert(studentId+","+testId+","+quesNo+","+language);
    $('#unbookmark'+studentId+'_'+testId+'_'+quesNo).attr('style','display:block');
    $('#bookmark'+studentId+'_'+testId+'_'+quesNo).attr('style', 'display:none');
 $.ajax({
        type: "post",
        url: "index.php?pageName=ajaxReport",
        data:"studentId="+studentId+"&testId="+testId+"&quesNo="+quesNo+"&language="+language+"&mode="+'bookmark' ,
        error:function() {
        },
        success: function(result){
        }
    })
}
function unbookmark(studentId,testId,quesNo,language)//work when we click unbookmark button
{
   // alert(quesNo+","+language);
  $('#bookmark'+studentId+'_'+testId+'_'+quesNo).attr('style', 'display:block');
  $('#unbookmark'+studentId+'_'+testId+'_'+quesNo).attr('style', 'display:none');
  $.ajax({
        type: "post",
        url: "index.php?pageName=ajaxReport",
        data:"studentId="+studentId+"&testId="+testId+"&quesNo="+quesNo+"&language="+language+"&mode="+'unbookmark' ,
        error:function() {
        },
        success: function(result){
            //alert(result);
        }
    })
}
function unbookmark2(studentId,testId,quesNo,language)//this funtion is for when we unbookmark from bookmark pege
{
   var numQuestion=document.getElementById('num_question'+testId).innerHTML;
   numQuestion=numQuestion-1;
   if(numQuestion!=0)
   {
       $('#question'+studentId+'_'+testId+'_'+quesNo).attr('style', 'display:none');//hide the question from bookmark page
        document.getElementById('num_question'+testId).innerHTML=numQuestion;
   }
   else
   {
       $('#test'+studentId+'_'+testId).attr('style', 'display:none');//hide the test from bookmark page when all questions of this test has been unbookmarked
       var numTest=document.getElementById('num_Test').innerHTML
       numTest=numTest-1;
       if(numTest!=0)
       {
          document.getElementById('num_Test').innerHTML=numTest;
       }
       else
       {
          $('#allUnbookmarked').attr('style', 'display:block;');
       }
   }
   unbookmark(studentId,testId,quesNo,language);
}

function printSolution(){
    //title Add by Gaurav for proper
var testName = document.getElementById("testname").value;
var title = document.getElementById("title").value;
     if (document.getElementById != null)
                    {
                        var html = '<HTML>\n<HEAD>\n';
                        html += '\n<TITLE>'+title+'</TITLE>'+"<link type='text/css' media='all' rel='stylesheet' href='student/css/style.css'><link type='text/css' media='all' rel='stylesheet' href='css/tablestyle.css'> "+"<link rel='shortcut icon' href='student/images/favicon.ico'' />"+'</HEAD>\n<BODY>\n';/*here favicon image link add by navneet*/
                       // html += "<link type='text/css' media='all' rel='stylesheet' href='css/style.css'><link type='text/css' media='all' rel='stylesheet' href='css/tablestyle.css'> "
                        var printReadyElem =document.getElementById("printSolutionScreen");
                        html +='<div class="test-heading" style="margin-top:7px;"><ul><li class="login-top" style="margin-top:-20px;"><strong>Solution Report For </strong>'+testName+'<br/></li></ul></div>'+"<div class='solution-report' style='margin-top:7px;'>"+printReadyElem.innerHTML+"</div>";
                        html += '\n</BO' + 'DY>\n</HT' + 'ML>';
                        var printWin = window.open("","_blank");
                        printWin.document.open();
                        printWin.document.write(html);
                        printWin.document.close();
                        printWin.print();

                    }
}
//                else
//                {
//                        alert("Sorry, the print ready feature is only available in modern browsers.");
//                }
 //}
 //for static schedule add by ankit garg
 function report1(packageId) {    
        //location.href='index.php?pageName=popUp;
        var pageURL='index.php?pageName=popUp&id='+packageId+'&mode=2';
        var title='vikash';
        var w=800;
        var h=400;
var left = (screen.width/2)-(w/2);
var top = (screen.height/2)-(h/2);
var targetWin = window.open (pageURL, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
 }

  function getInEnglish(studentId,testId,quesNo,language){
        $.ajax({
        type: "post",
        url: "index.php?pageName=ajaxReport",
        data:"studentId="+studentId+"&testId="+testId+"&quesNo="+quesNo+"&language="+language+"&mode="+'getEnglishBookmark' ,
        error:function() {
        },
        success: function(result){
        //    alert(result);
            location.reload();
        }
    })
  }

  function getInHindi(studentId,testId,quesNo,language){
   //   alert(studentId+","+testId+","+quesNo+","+language);
       $.ajax({
        type: "post",
        url: "index.php?pageName=ajaxReport",
        data:"studentId="+studentId+"&testId="+testId+"&quesNo="+quesNo+"&language="+language+"&mode="+'getHindiBookmark' ,
        error:function() {
        },
        success: function(result){
        //    alert(result);
            location.reload();
        }
    })
  }
  
  
  function popForDoubt(qnid,subjectid,quetype,ser,language,testId)
 {         
        var pageURL='index.php?pageName=doubt&testId='+testId+'&qnid='+qnid+'&subjectid='+subjectid+'&serialno='+ser+'&quetype='+quetype+'&language='+language;
        window.open(pageURL,'_blank');

 }
