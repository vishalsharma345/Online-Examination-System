/* function for difficulty report start here*/
function getDifficultyReport(array){ 
    var jsondata=JSON.parse(array);
    var difficultArray=jsondata[0];
    var data;
    var difficultArrayTopper=jsondata[1];
    var topperid=jsondata[2];
    var testid=jsondata[3];
    var testname=jsondata[4];
    var studentid=jsondata[5];
    var testTypevar=jsondata[6];
    var correct_incorrect=jsondata[7];
    var right_negative=jsondata[8];
    var reportValidate=jsondata[9];
    var result=" ",correctquest = " ",incorecctque = " ",rightmark = " ",negativemark = " ",totalque = " ",topperTotalmarks = 0,i;
    if(reportValidate==1){
        result="<div class='test-heading'>";
        result=result+"<ul>";
        result=result+"<li><img src='https://gw-mdsy-new.s3-accelerate.amazonaws.com/student/images/all-report.gif' /></li>";
        result=result+"<li class='login-top'><strong>Difficulty Level Report For</strong>"+" "+testname+"<br/><div style='font-size:11px;color:gray'>Represent your excellence according to raising difficult level.</div></li>";
        result=result+"</ul>";
        result=result+"</div>";


        result=result+"<div class='dropcollapsed'>";
        result=result+"<h2>";
        result=result+"<div class='view-report-status' onclick='yourTestAnalisis("+testid+","+studentid+",7,"+testTypevar+")'>";
        result=result+"<img  id='imgid7' src='https://gw-mdsy-new.s3-accelerate.amazonaws.com/student/images/drop-detail-icon.png' align='top' />&nbsp;&nbsp;View Your Test Analysis";
        result=result+"</div>";
        result=result+"</h2>";
        result=result+"<div class='dropcontent' id='testAnalysis7'></div>";
        result=result+"</div>";


        result=result+"<table width='100%'  cellpadding='10px' cellspacing='0px' align='center' id='table-coloumn'>";

            result=result+"<tr>";
            result=result+"<td width='14%' valign='middle' align='center' class='coloumn-black'>Level</td>";
            result=result+"<td valign='middle' align='center' class='coloumn-black'>Total Questions</td>";
            result=result+"<td valign='middle' align='center' class='coloumn-black'>"+correct_incorrect+"</td>";
            result=result+"<td valign='middle' align='center' class='coloumn-black'>"+right_negative+"</td>";
            result=result+"<td valign='middle' align='center' class='coloumn-black'>Total Marks</td>";
            if(testTypevar== "1" || testTypevar == "2"){
                result=result+"<td valign='middle' align='center' class='coloumn-black'>Topper's Marks</td>";
            }
            result=result+"</tr>";
            for(i=0;i<difficultArray.length;i++){
              if (totalque == " ") {
                 totalque = parseFloat(difficultArray[i][1]);
              } else {
                 totalque = totalque + parseFloat(difficultArray[i][1]);
              }
              if (correctquest == " ") {
                 correctquest = parseFloat(difficultArray[i][2]);
              }else {
                 correctquest = correctquest + parseFloat(difficultArray[i][2]);
              }
              if (incorecctque == " ") {
                 incorecctque = parseFloat(difficultArray[i][3]);
              } else {
                 incorecctque = incorecctque + parseFloat(difficultArray[i][3]);
              }
              if (rightmark == " ") {
                 rightmark = parseFloat(difficultArray[i][4]);
              } else {
                 rightmark = rightmark + parseFloat(difficultArray[i][4]);
              }
              if (negativemark == " ") {
                 negativemark = parseFloat(difficultArray[i][5]);
              } else {
                 negativemark = negativemark + parseFloat(difficultArray[i][5]);
              }
              if(testTypevar== "1" || testTypevar == "2"){
                 if (testTypevar == 2) {
                    if (topperid[1] != undefined) {
                        if (topperTotalmarks == 0) {
                            topperTotalmarks = parseFloat(difficultArrayTopper[i][4])-parseFloat(difficultArrayTopper[i][5]);
                        } else {
                           topperTotalmarks = topperTotalmarks + parseFloat(difficultArrayTopper[i][4])-parseFloat(difficultArrayTopper[i][5]);
                        }
                    } else if (topperid[0] == 2) {
                        topperTotalmarks = "-NA-";
                    } else {
                        topperTotalmarks = "You";
                    }
                 } else {
                    if (topperid[1] != undefined && topperid[1] != null) {
                        if (topperTotalmarks == 0) {
                            topperTotalmarks = parseFloat(difficultArrayTopper[i][4]) - parseFloat(difficultArrayTopper[i][5]);
                        } else {
                            topperTotalmarks = topperTotalmarks + parseFloat(difficultArrayTopper[i][4]) - parseFloat(difficultArrayTopper[i][5]);
                        }
                    } else if (topperid[0] == 1) {
                        topperTotalmarks = "You";
                    } else{
                        topperTotalmarks = "-NA-";
                    }
                 }

                 if (testTypevar == 2) {
                    if (topperid[0] == 1) {
                        data = "You";
                    } else if (topperid[0] == 2 && topperid[1] != undefined) {
                        data =(parseFloat(difficultArrayTopper[i][4]) - parseFloat(difficultArrayTopper[i][5])).toFixed(2);
                    } else {
                        data ="-NA-";
                    }
                 } else {
                    if (topperid[0] == 1) {
                        data = "You";
                    } else if(topperid[1] != undefined && topperid[1]!=null){
                        data = (parseFloat(difficultArrayTopper[i][4]) - parseFloat(difficultArrayTopper[i][5])).toFixed(2);
                    } else{
                        data ="-NA-";
                    }
                 }
              }
              result=result+"<tr>";
              result=result+"<td valign='middle' align='center' class='coloumn-gray'><strong>"+difficultArray[i][0]+"</strong></td>";
              result=result+"<td valign='middle' align='center' class='coloumn-gray'>"+difficultArray[i][1]+"</td>";
              result=result+"<td valign='middle' align='center' class='coloumn-gray'>"+difficultArray[i][2]+"/<span>"+difficultArray[i][3]+"</span></td>";
              result=result+"<td valign='middle' align='center' class='coloumn-gray'>"+difficultArray[i][4]+"/<span>"+difficultArray[i][5]+"</td>";
              result=result+"<td valign='middle' align='center' class='coloumn-gray'>"+(difficultArray[i][4]-difficultArray[i][5]).toFixed(2)+"</td>";
              if(testTypevar== "1" || testTypevar == "2"){
                 result=result+"<td valign='middle' align='center' class='coloumn-gray'>"+data+"</td>";
              }
              result=result+"</tr>";
            }
            if(topperTotalmarks!="-NA-" && topperTotalmarks!="You"){
                 topperTotalmarks = topperTotalmarks.toFixed(2);
            }
            result=result+"<tr>";
            result=result+"<td valign='middle' align='center' class='coloumn-yellow'><strong>Total</strong></td>";
            result=result+"<td valign='middle' align='center' class='coloumn-yellow'>"+totalque+"</td>";
            result=result+"<td valign='middle' align='center' class='coloumn-yellow'>"+correctquest+"/<span>"+incorecctque+"</span></td>";
            result=result+"<td valign='middle' align='center' class='coloumn-yellow'>"+rightmark.toFixed(2)+"/<span>"+negativemark.toFixed(2)+"</span></td>";
            result=result+"<td valign='middle' align='center' class='coloumn-yellow'>"+(rightmark-negativemark).toFixed(2)+"</td>";
            if(testTypevar== "1" || testTypevar == "2"){
                result=result+"<td valign='middle' align='center' class='coloumn-yellow'>"+topperTotalmarks+"</td>";
            }
            result=result+"</tr>";

        result=result+"</table>";
    } else{
        result=result+"<center><b>This report is not published by admin</b></center>";
    }
    return result;
}
/* function for difficulty report end here*/


/* function for topic report start here*/
function getTopicReport(array){
    var jsondata=JSON.parse(array);
    var topicArray=jsondata[0];
    var topperMarkTopicWise=jsondata[1];
    var topperId=jsondata[2];
    var testid=jsondata[3];
    var testname=jsondata[4];
    var studentid=jsondata[5];
    var testTypevar=jsondata[6];
    var correct_incorrect=jsondata[7];
    var right_negative=jsondata[8];
    var left_question_and_marks=jsondata[9];
    var reportValidate=parseInt(jsondata[10]);
    var result=" ",data1,data,i,totalQue = "",correctQue = "",incorrectQue = "",rightMarks = "",negativeMarks = "",leftQue = "",leftMarks = "",topperTotalMarks="",testtime="",length = topicArray.length;
    if(reportValidate==1){
        result="<div class='test-heading'>";
        result=result+"<ul>";
        result=result+"<li><img src='https://gw-mdsy-new.s3-accelerate.amazonaws.com/student/images/all-report.gif' /></li>";
        result=result+"<li class='login-top'><strong>Topic Report For</strong>"+" "+testname+"<br/><div style='font-size:11px;color:gray'>Represent your excellence according to characterized Topics.</div></li>";
        result=result+"</ul>";
        result=result+"</div>";

        result=result+"<div class='dropcollapsed'>";
        result=result+"<h2>";
        result=result+"<div class='view-report-status' onclick='yourTestAnalisis("+testid+","+studentid+",8,"+testTypevar+")'>";
        result=result+"<img  id='imgid8' src='https://gw-mdsy-new.s3-accelerate.amazonaws.com/student/images/drop-detail-icon.png' align='top' />&nbsp;&nbsp;View Your Test Analysis";
        result=result+"</div>";
        result=result+"</h2>";
        result=result+"<div class='dropcontent' id='testAnalysis8'></div>";
        result=result+"</div>";


        result=result+"<table width='100%'  cellpadding='10px' cellspacing='0px' align='center' id='table-coloumn'>";

           result=result+"<tr>";
           result=result+"<td width='14%' valign='middle' align='center' class='coloumn-black'>Name</td>";
           result=result+"<td valign='middle' align='center' class='coloumn-black'>Total Questions</td>";
           result=result+"<td valign='middle' align='center' class='coloumn-black'>"+correct_incorrect+"</td>";
           result=result+"<td valign='middle' align='center' class='coloumn-black'>Marks Scored/Negative Marks</td>";
           result=result+"<td valign='middle' align='center' class='coloumn-black'>Unattempted Questions/Marks</td>";
           result=result+"<td valign='middle' align='center' class='coloumn-black'>Total Time (in min)</td>";
           result=result+"<td valign='middle' align='center' class='coloumn-black'>Total Marks</td>";
           if(testTypevar== "1" || testTypevar == "2"){
              result=result+"<td valign='middle' align='center' class='coloumn-black'>Topper's Marks</td>";
           }
           result=result+"</tr>";

           for(i=0;i<topicArray.length;i++){
               if(totalQue==""){
                 totalQue=parseFloat(topicArray[i][1]);
               } else
                 totalQue=totalQue+parseFloat(topicArray[i][1]);

               if(correctQue==""){
                 correctQue =parseFloat(topicArray[i][2]);
               } else
                 correctQue=correctQue+parseFloat(topicArray[i][2]);

               if(incorrectQue==""){
                   incorrectQue=parseFloat(topicArray[i][3]);
               } else
                   incorrectQue=incorrectQue+parseFloat(topicArray[i][3]);

               if(rightMarks==""){
                   rightMarks=parseFloat(topicArray[i][5]);
               } else
                   rightMarks=rightMarks+parseFloat(topicArray[i][5]);

               if(negativeMarks==""){
                   negativeMarks=parseFloat(topicArray[i][6]);
               } else
                   negativeMarks=negativeMarks+parseFloat(topicArray[i][6]);

               if(leftQue==""){
                   leftQue=parseFloat(topicArray[i][4]);
               } else
                   leftQue=leftQue+parseFloat(topicArray[i][4]);

               if(leftMarks==""){
                   leftMarks=parseFloat(topicArray[i][7]);
               } else
                   leftMarks=leftMarks+parseFloat(topicArray[i][7]);
               if(topicArray[i][8]==null){
                   topicArray[i][8]=0;
               }
               if(testtime==""){
                   testtime=parseInt(topicArray[i][8]);
               } else
                   testtime=testtime+parseInt(topicArray[i][8]);

               if(testTypevar== "1" || testTypevar == "2"){
                  if (testTypevar == 2) {
                      if(topperId[0] == 1) {
                         data = "You";
                      } else if(topperId[0] == 2 && topperId[1] != undefined){
                          if(topperTotalMarks==""){
                             topperTotalMarks=parseFloat(topperMarkTopicWise[i][5]) - parseFloat(topperMarkTopicWise[i][6]);
                          } else{
                             topperTotalMarks=topperTotalMarks+parseFloat(topperMarkTopicWise[i][5]) - parseFloat(topperMarkTopicWise[i][6]);
                          }
                          data = (parseFloat(topperMarkTopicWise[i][5]) - parseFloat(topperMarkTopicWise[i][6])).toFixed(2);
                      } else {
                          data ="-NA-";
                      }
                  } else {
                      if (topperId[0] == 1) {
                          data = "You";
                      } else if(topperId[1] != undefined && topperId[1] != null){
                          if(topperTotalMarks==""){
                             topperTotalMarks=parseFloat(topperMarkTopicWise[i][5]) - parseFloat(topperMarkTopicWise[i][6]);
                          } else{
                             topperTotalMarks=topperTotalMarks+parseFloat(topperMarkTopicWise[i][5]) - parseFloat(topperMarkTopicWise[i][6]);
                          }
                          data = (parseFloat(topperMarkTopicWise[i][5]) - parseFloat(topperMarkTopicWise[i][6])).toFixed(2);
                      } else{
                          data = "-NA-";
                      }
                  }

                  if (topperId[0] == 1) {
                      data1= "You";
                  } else if(topperId[0] == 2 && topperId[1] != undefined) {
                      data1=topperTotalMarks.toFixed(2);
                  } else
                      data1="-NA-";
               }
               result=result+"<tr>";
               result=result+"<td valign='middle' align='center' class='coloumn-gray'><strong>"+topicArray[i][0]+"</strong></td>";
               result=result+"<td valign='middle' align='center' class='coloumn-gray'>"+topicArray[i][1]+"</td>";
               result=result+"<td valign='middle' align='center' class='coloumn-gray'>"+topicArray[i][2]+"/<span>"+topicArray[i][3]+"</span></td>";
               result=result+"<td valign='middle' align='center' class='coloumn-gray'>"+topicArray[i][5]+"/<span>"+topicArray[i][6]+"</span></td>";
               result=result+"<td valign='middle' align='center' class='coloumn-gray'>"+topicArray[i][4]+"/<span>"+topicArray[i][7]+"</span></td>";
               result=result+"<td valign='middle' align='center' class='coloumn-gray'>"+Math.floor(topicArray[i][8]/60)+":"+topicArray[i][8]%60+"</td>";
               result=result+"<td valign='middle' align='center' class='coloumn-gray'>"+(parseFloat(topicArray[i][5])- parseFloat(topicArray[i][6])).toFixed(2)+"</td>";
               if(testTypevar== "1" || testTypevar == "2"){
                  result=result+"<td valign='middle' align='center' class='coloumn-gray'>"+data+"</td>";
               }
               result=result+"</tr>";
           }
           result=result+"<tr>";
           result=result+"<td valign='middle' align='center' class='coloumn-yellow'><strong>Total</strong></td>";
           result=result+"<td valign='middle' align='center' class='coloumn-yellow'>"+totalQue+"</td>";
           result=result+"<td valign='middle' align='center' class='coloumn-yellow'>"+correctQue+"/<span>"+incorrectQue+"</span></td>";
           result=result+"<td valign='middle' align='center' class='coloumn-yellow'>"+rightMarks.toFixed(2)+"/<span>"+negativeMarks.toFixed(2)+"</span></td>";
           result=result+"<td valign='middle' align='center' class='coloumn-yellow'>"+leftQue+"/<span>"+leftMarks.toFixed(2)+"</span></td>";
           result=result+"<td valign='middle' align='center' class='coloumn-yellow'>"+Math.floor(testtime/60)+":"+testtime%60+"</td>";
           result=result+"<td valign='middle' align='center' class='coloumn-yellow'>"+(rightMarks-negativeMarks).toFixed(2)+"</td>";
           if(testTypevar== "1" || testTypevar == "2"){
              result=result+"<td valign='middle' align='center' class='coloumn-yellow'>"+data1+"</td>";
           }
           result=result+"</tr>";

        result=result+"</table>";
    } else{
        result=result+"<center><b>This report is not published by admin</b></center>";
    }
    return result;
}
/* function for topic report end here*/

/* function for compare your self report start here*/

function getCompareYourSelfReport(array1){
    var jsondata=JSON.parse(array1);
    var studentArray=jsondata[0];
    var testid=jsondata[1];
    var testname=jsondata[2];
    var studentid=jsondata[3];
    var testTypevar=jsondata[4];
    var arrscript=jsondata[5];
    var filename=jsondata[6];
    var otherTopperList=jsondata[7];
    var publishResult=parseInt(jsondata[9]);
    var reportValidate=parseInt(jsondata[10]);
    var result="",percentage='',percentile="",rank='',i,countRecord=1;
    if(reportValidate==1){
        result=result+"<div class='test-heading'>";
        result=result+"<ul>";
        result=result+"<li><img src='https://gw-mdsy-new.s3-accelerate.amazonaws.com/student/images/all-report.gif' /></li>";
        result=result+"<li class='login-top'><strong>Compare Report For </strong>"+testname+"<br/><div style='font-size:11px;color:gray'>Represent your performance in comparison of toppers.</div></li>";
        result=result+"</ul>";
        result=result+"</div>";

        result=result+"<div class='dropcollapsed'>";
        result=result+"<h2><div class='view-report-status' onclick='yourTestAnalisis("+testid+","+studentid+",6,"+testTypevar+");'><img  id='imgid6' src='https://gw-mdsy-new.s3-accelerate.amazonaws.com/student/images/drop-detail-icon.png' align='top' />&nbsp;&nbsp;View Your Test Analysis</div></h2>";
        result=result+"<div class='dropcontent' id='testAnalysis6'></div>";
        result=result+"</div>";
        result=result+"<div class='ranking-detail'>";
           result=result+"<div class='ranking-detail-left'>";
              /*scorecard1 start*/
              result=result+"<div class='rankink-detail-coloumn'>";
                 /*score card start*/
                 result=result+"<div class='scorecard'>";
                 result=result+"<div class='scorecard-left'>Total Ques. </div>";
                 result=result+"<div class='scorecard-right'>"+studentArray[7]+"</div>";
                 result=result+"<div class='clearboth'></div>";
                 result=result+"</div>";
                 /*score card close*/
                 /*score card start*/
                 result=result+"<div class='scorecard'>";
                 result=result+"<div class='scorecard-left'>Maximum Marks </div>";
                 result=result+"<div class='scorecard-right'>"+studentArray[8]+"</div>";
                 result=result+"<div class='clearboth'></div>";
                 result=result+"</div>";
                 /*score card close*/

                 /*score card start*/
                 result=result+"<div class='scorecard'>";
                 result=result+"<div class='scorecard-left'>Attempted Ques. </div>";
                 result=result+"<div class='scorecard-right'>"+studentArray[6]+"</div>";
                 result=result+"<div class='clearboth'></div>";
                 result=result+"</div>";
                 /*score card close*/

                 /*score card start*/
                 result=result+"<div class='scorecard'>";
                 result=result+"<div class='scorecard-left'>Unattempted Ques. </div>";
                 result=result+"<div class='scorecard-right'>"+studentArray[2]+"</div>";
                 result=result+"<div class='clearboth'></div>";
                 result=result+"</div>";
                 /*score card close*/

                 /*score card start*/
                 result=result+"<div class='scorecard'>";
                 result=result+"<div class='scorecard-left'>Correct Ques. </div>";
                 result=result+"<div class='scorecard-right'>"+studentArray[0]+"</div>";
                 result=result+"<div class='clearboth'></div>";
                 result=result+"</div>";
                 /*score card close*/

                 /*score card start*/
                 result=result+"<div class='scorecard'>";
                 result=result+"<div class='scorecard-left'>Incorrect Ques. </div>";
                 result=result+"<div class='scorecard-right'><span>"+studentArray[1]+"</span></div>";
                 result=result+"<div class='clearboth'></div>";
                 result=result+"</div>";
                 /*score card close*/

              result=result+"</div>";
              /*scorecard1 close*/

              /*scorecard2 start*/
              result=result+"<div class='rankink-detail-coloumn'>";

                 /*score card start*/
                 result=result+"<div class='scorecard'>";
                 result=result+"<div class='scorecard-left'>Total Score </div>";
                 result=result+"<div class='scorecard-right'><strong>"+studentArray[3]+"/"+studentArray[8]+"</strong></div>";
                 result=result+"<div class='clearboth'></div>";
                 result=result+"</div>";
                 /*score card close*/

                 if(studentArray[3]<=0){
                     percentage='0';
                 } else{
                     percentage=((studentArray[3] / studentArray[8]) * 100).toFixed(2);
                 }
                 /*score card start*/
                 result=result+"<div class='scorecard'>";
                 result=result+"<div class='scorecard-left'>Percentage </div>";
                 result=result+"<div class='scorecard-right'>"+percentage+"%"+"</div>";
                 result=result+"<div class='clearboth'></div>";
                 result=result+"</div>";
                 /*score card close*/
                 var rankheader = "",percenheader="";
                 if(studentArray[5]== 0 && studentArray[10]!=0 && studentArray[10]!=null){
                     rankheader = "Predicted Rank";
                     percenheader = "Predicted Percentile";
                     if(studentArray[10]<=3){
                        rank = studentArray[10] + '<sup>'+arrscript[studentArray[10]-1]+'</sup>';
                     } else{
                        rank = studentArray[10] + '<sup>'+arrscript[4]+'</sup>';
                     }
                     percentile = studentArray[11];
                 }else{
                     rankheader = "Rank";
                     percenheader = "Percentile";
                     if (studentArray[5] == 0){
                        rank = '-NA-';
                     } else {
                         if(studentArray[5]<=3){
                            rank = studentArray[5] + '<sup>'+arrscript[studentArray[5]-1]+'</sup>';
                         } else{
                            rank = studentArray[5] + '<sup>'+arrscript[4]+'</sup>';
                         }
                     }
                    
                         percentile = studentArray[4];
                   
                 }

                 /*score card start*/
                 result=result+"<div class='scorecard'>";
                 result=result+"<div class='scorecard-left'>"+percenheader+"</div>";
                 result=result+"<div class='scorecard-right'>"+percentile+"</div>";
                 result=result+"<div class='clearboth'></div>";
                 result=result+"</div>";
                 /*score card close*/

                 /*score card start*/
                 result=result+"<div class='scorecard'>";
                 result=result+"<div class='scorecard-left'>Total Time</div>";
                 result=result+"<div class='scorecard-right'>"+studentArray[9]+"</div>";
                 result=result+"<div class='clearboth'></div>";
                 result=result+"</div>";
                 /*score card close*/

                 /*score card start*/
                 result=result+"<div class='your-ranking'>";
                 result=result+"<div class='your-ranking-left'>";
                 result=result+"<ul>";
                 result=result+"<li>"+rankheader+"</li>";
                 result=result+"<li><strong>"+rank+"</strong></li>";
                 result=result+"</ul>";
                 result=result+"</div>";
                 result=result+"<div class='your-ranking-right'><img style='width:60px;height:70px;' src="+filename+"></div>";
                 result=result+"<div class='clearboth'></div>";
                 result=result+"</div>";
                 /*score card end*/
              result=result+"</div>";

              /*scorecard2 close*/
              result=result+"<div class='clearboth'></div>";
           result=result+"</div>";
           /*student-detail-left close*/
           if(testTypevar ==2 && publishResult==0 ){
               result=result+"<center style='padding:30px 0px 0px 0px;'></br></br></br></br></br></br>Result Is Not Publish</center>";
           } else{
               /*student-detail-right start*/
               result=result+"<form name='compare'>";
               result=result+"<input type='hidden' name='array' id='array' value="+otherTopperList.length+">";
               result=result+"<input type='hidden' name='hiddencount' id='hiddencount' value="+countRecord+">";
               result=result+"</form>";

               result=result+"<div id='slider'>";
                  result=result+"<div id='mask-gallery'>";
                      result=result+"<ul id='gallery1' style='width:1000%;'>";
                        for(i=0;i<otherTopperList.length;i++){
                           var studentArray1=otherTopperList[i][0];                         
                           var filename1=otherTopperList[i][1];
                           var result1="",percentage1='',percentile1="",rank1='';
                           result=result+"<li class='listItem' id='item+"+i+"' style='width:10%;float:left;overflow:hidden;'>";
                              result=result+"<div class='ranking-detail-right'>";

                                 result=result+"<div class='rankink-detail-coloumn1'>";
                                    result=result+"<div class='scorecard'>";
                                    result=result+"<div class='scorecard-left'>Total Ques. </div>";
                                    result=result+"<div class='scorecard-right'>"+studentArray1[7]+"</div>";
                                    result=result+"<div class='clearboth'></div>";
                                    result=result+"</div>";
                                    result=result+"<div class='scorecard'>";
                                    result=result+"<div class='scorecard-left'>Maximum Marks</div>";
                                    result=result+"<div class='scorecard-right'>"+studentArray1[8]+"</div>";
                                    result=result+"<div class='clearboth'></div>";
                                    result=result+"</div>";
                                    result=result+"<div class='scorecard'>";
                                    result=result+"<div class='scorecard-left'>Attempted Ques. </div>";
                                    result=result+"<div class='scorecard-right'>"+studentArray1[6]+"</div>";
                                    result=result+"<div class='clearboth'></div>";
                                    result=result+"</div>";
                                    result=result+"<div class='scorecard'>";
                                    result=result+"<div class='scorecard-left'>Unattempted Ques.  </div>";
                                    result=result+"<div class='scorecard-right'>"+studentArray1[2]+"</div>";
                                    result=result+"<div class='clearboth'></div>";
                                    result=result+"</div>";
                                    result=result+"<div class='scorecard'>";
                                    result=result+"<div class='scorecard-left'>Correct Ques. </div>";
                                    result=result+"<div class='scorecard-right'>"+studentArray1[0]+"</div>";
                                    result=result+"<div class='clearboth'></div>";
                                    result=result+"</div>";
                                    result=result+"<div class='scorecard'>";
                                    result=result+"<div class='scorecard-left'>Incorrect Ques. </div>";
                                    result=result+"<div class='scorecard-right'><span>"+studentArray1[1]+"</span></div>";
                                    result=result+"<div class='clearboth'></div>";
                                    result=result+"</div>";
                                 result=result+"</div>";

                                 result=result+"<div class='rankink-detail-coloumn1'>";
                                    result=result+"<div class='scorecard'>";
                                    result=result+"<div class='scorecard-left'>Total Score</div>";
                                    result=result+"<div class='scorecard-right'><strong>"+studentArray1[3]+"/"+studentArray1[8]+"</strong></div>";
                                    result=result+"<div class='clearboth'></div>";
                                    result=result+"</div>";
                                    if(studentArray1[3]<=0){
                                        percentage1= "0";
                                    } else{
                                        percentage1= ((studentArray1[3] / studentArray1[8]) * 100).toFixed(2);
                                    }
                                    result=result+"<div class='scorecard'>";
                                    result=result+"<div class='scorecard-left'>Percentage </div>";
                                    result=result+"<div class='scorecard-right'>"+percentage1+"%"+"</div>";
                                    result=result+"<div class='clearboth'></div>";
                                    result=result+"</div>";
                                   
                                        percentile1 = studentArray1[4];
                                   
                                    result=result+"<div class='scorecard'>";
                                    result=result+"<div class='scorecard-left'>Percentile </div>";
                                    result=result+"<div class='scorecard-right'>"+percentile1+"</div>";
                                    result=result+"<div class='clearboth'></div>";
                                    result=result+"</div>";
                                    result=result+"<div class='scorecard'>";
                                    result=result+"<div class='scorecard-left'>Total Time</div>";
                                    result=result+"<div class='scorecard-right'>"+studentArray1[9]+"</div>";
                                    result=result+"<div class='clearboth'></div>";
                                    result=result+"</div>";
                                    result=result+"<div class='your-ranking'>";
                                        result=result+"<div class='your-ranking-left' style='width:60%;'>";
                                            if (studentArray1[5] == 0) {
                                                rank1 = "-NA-";
                                            } else {
                                                rank1 = studentArray1[5] +"<sup>"+arrscript[studentArray1[5]-1]+"</sup>";
                                            }
                                            result=result+"<div id='row'>Rank</div>";
                                            result=result+"<div id='rank'><strong>"+rank1+"</strong><br/><span style='width:100%; padding:0px 10px 0px 0px; font-size:7pt; font-weight:bold; margin:5px 0px 0px 0px; float:left;'>"+otherTopperList[i][3]+"</span></div>";
                                        result=result+"</div>";
                                        result=result+"<div class='your-ranking-right'><img style='width:60px;height:70px;' src='"+filename1+"'></div>";
                                        result=result+"<div class='clearboth'></div>";
                                    result=result+"</div>";
                                 result=result+"</div>";
                              if(otherTopperList[i][2] == 'OMR'){
                                 result=result+"<span style='color:red;margin-left: 10px;font-weight: bold'>This Student has given offline Test.</span>";
                              }
                              result=result+"</div>";
                           result=result+"</li>";
                        }
                      result=result+"</ul>";
                  result=result+"</div>";

                  result=result+"<div id='buttons' style='margin-top:5px'>"
                  result=result+"<ul>";
                      result=result+"<li><a href='javascript:void(0)' style='display:none' id='btn-prev' onclick="+"previousStudent()"+">Previous</a></li>";
                      result=result+"<li><a href='javascript:void(0)' style='display:none' id='btn-next' onclick="+"nextStudent()"+">Next</a></li>";
                  result=result+"</ul>";
                  result=result+"</div>";
               result=result+"</div>";
           }

           result=result+"<div class='clearboth'></div>";
        result=result+"</div>";
        result=result+"<div class='chart-heading'><ul><li><span>Compare with Toppers</span></li></ul></div>";
        result=result+"<div class='all-report-map down' >";
           if(testTypevar ==2 && publishResult==0 ){
               result=result+"<center>Result Is Not Publish</center>";
           } else{
               result=result+"<div id='demo-content'>";
                    result=result+"<div id='container21'   ><div class='highcharts-container' id='highcharts-0' style='overflow-x: hidden; overflow-y: hidden; width: 1031px; height: 800px; text-align: left; font-family: &#39;Lucida Grande&#39;, &#39;Lucida Sans Unicode&#39;, Verdana, Arial, Helvetica, sans-serif; font-size: 12px;'></div></div>";
               result=result+"</div>";
           }
        result=result+"</div>";
    } else{
        result=result+"<center><b>This report is not published by admin</b></center>";
    }
    return result;
}


  function getTimeReports(array1) {
    var jsondata=JSON.parse(array1);// alert(jsondata);
    var timearray = jsondata[0];
    var topperTime = jsondata[1];
    var toppertimearray = jsondata[2];
    var testid = jsondata[3];
    var testname = jsondata[4];
    var studentid = jsondata[5];
    var testtype = jsondata[6];
    var reportValidate=parseInt(jsondata[7]);
        var html="",i;
        if(reportValidate==1){
        html = "<div class='test-heading'>";
        html = html + "<ul>";
            html = html + "<li><img src='https://gw-mdsy-new.s3-accelerate.amazonaws.com/student/images/all-report.gif' /></li>";
            html = html + "<li class='login-top'><strong>Time Management Report For </strong>" + testname + "<br /><div style='font-size:11px;color:gray'>Represent conscious control over the amount of time spent on specific activities, especially to increase effectiveness.</div>";
        html = html + "</li> </ul></div>";

        html = html + "<div class='dropcollapsed'>";
            html = html + "<h2><div class='view-report-status' onclick='yourTestAnalisis("+testid+","+studentid+",2,"+testtype+")'><img  id='imgid2' src='https://gw-mdsy-new.s3-accelerate.amazonaws.com/student/images/drop-detail-icon.png' align='top' />&nbsp;&nbsp;View Your Test Analysis</div></h2>";
            html = html + "<div class='dropcontent' id='testAnalysis2'>";
        html = html + "</div></div>";

        html = html + "<table width='100%'  cellpadding='10px' cellspacing='0px' align='center' id='table-coloumn' >";
            html = html + " <tr>";
            html = html + "<td width='20%' valign='middle' align='center' class='coloumn-black'>Subject</td>";
            html = html + "<td valign='middle' align='center' class='coloumn-black'>Attempts[#<span>Incorrect</span>]</td>";/*here Wrong to Incorrect change by navneet*/
            html = html + "<td valign='middle' align='center' class='coloumn-black'>Percentage</td>";
            html = html + "<td valign='middle' align='center' class='coloumn-black'>Score and Time(in min)</td>";
            if(testtype!="3"){
                html = html + "<td valign='middle' align='center' class='coloumn-black'>Topper's Performance</td>";
            }
            html = html + "</tr>";

            for (i = 0; i < timearray.length; i++) {//alert(timearray[i][1]);
                var percentage,data;
                html = html + "<tr>";
                    html = html + "<td valign='middle' align='center' class='coloumn-gray'><strong>"+timearray[i][0]+"</strong></td>";
                    html = html + "<td valign='middle' align='center' class='coloumn-gray'>"+(parseFloat(timearray[i][1])-parseFloat(timearray[i][4]))+"[<span>"+parseFloat(timearray[i][3])+"</span>]</td>";
                    if((parseFloat(timearray[i][5])-parseFloat(timearray[i][6]))<=0){
                        percentage= "0";
                    } else{
                        percentage= (((parseFloat(timearray[i][5])-parseFloat(timearray[i][6]))/parseFloat(timearray[i][9])) * 100).toFixed(2);
                    }
                    html = html + "<td valign='middle' align='center' class='coloumn-gray'>"+percentage+"%"+"</td>";
                    html = html + "<td valign='middle' align='center' class='coloumn-gray'>"+(parseFloat(timearray[i][5])-parseFloat(timearray[i][6])).toFixed(2)+" In "+Math.floor(timearray[i][8]/60)+":"+timearray[i][8]%60+" Min</td>";
                    if(topperTime[0]==1){
                        data="You";
                    } else if(topperTime[0] == 2 && topperTime[1] != undefined){
                        data=(parseFloat(toppertimearray[i][5])-parseFloat(toppertimearray[i][6])).toFixed(2)+" In "+Math.floor(toppertimearray[i][8]/60)+":"+toppertimearray[i][8]%60+"Min";
                    } else
                        data="-NA-";
                    if(testtype!="3"){
                        html = html + "<td valign='middle' align='center' class='coloumn-gray'>"+data+"</td>";
                    }
                html = html + "</tr>";
            }
        html = html + "</table>";
    } else{
        html = html + "<center><b>This report is not published by admin</b></center>";
    }
    return html;
}


function getquestionReports(array1) {//alert(array1);
    var jsondata=JSON.parse(array1);
    var questionReport=jsondata[0];
    var answer=questionReport[0];
    var topperTime=questionReport[1];
    var responsetime=questionReport[2];
    var responsetimeTopper=questionReport[3];
    var testname=questionReport[4];//alert(testname);
    var testid=jsondata[1];
    var studentid=jsondata[2];
    var testType=jsondata[3];
    var reportValidate=parseInt(jsondata[4]);
    var rankCheck=jsondata[5];
    var studentSessionId=jsondata[6];
    var superUserId=jsondata[7];
    var html="";
    if((reportValidate == 1 && rankCheck != 0 && testType == 2) || (reportValidate == 1 && (testType == 1 || testType == 3) ) || studentSessionId==superUserId){
        html = "<div class='test-heading'><ul>";
        html = html + " <li><img src='https://gw-mdsy-new.s3-accelerate.amazonaws.com/student/images/all-report.gif' /></li>";
        html = html + " <li class='login-top'><strong>Questions Report For  </strong>" +testname[15]+"<br /><div style='font-size:11px;color:gray'>Represent your time management, efficiency, question status, score and topper comparison to specify your goals.</div>";
        html = html + " </li></ul></div>";

        html = html + "<div class='dropcollapsed'>";
        html = html + "<h2><div class='view-report-status' onclick='yourTestAnalisis("+testid+","+studentid+",3,"+testType+")'><img id='imgid3' src='https://gw-mdsy-new.s3-accelerate.amazonaws.com/student/images/drop-detail-icon.png' align='top' />&nbsp;&nbsp;View Your Test Analysis</div></h2>";
        html = html + "<div class='dropcontent' id='testAnalysis3'>";
        html = html + "</div></div>";

        html = html + "<table width='100%'  cellpadding='0px' cellspacing='0px' align='center' id='table-coloumn' >";

        html = html + "<tr>";
            html = html + "<td width='8%' valign='middle' align='center' class='coloumn-black'>S. No</td>";
            html = html + "<td   width='7%' valign='middle' align='center' class='coloumn-black'>Question Status</td>";
            html = html + "<td valign='middle' align='center' class='coloumn-black'>Your Answer</td>";
            html = html + "<td valign='middle' align='center' class='coloumn-black'>Correct Answer</td>";
            html = html + "<td valign='middle' align='center' class='coloumn-black'>Your Score</td>";
            html = html + "<td valign='middle' align='center' class='coloumn-black'>Your Time (in min.)</td>";
            if(testType== "1" || testType=="2"){
                html = html + " <td valign='middle' align='center' class='coloumn-black'>Topper's Time (in min.)</td>";
            }
            html = html + "<td    valign='middle' align='center' class='coloumn-black' id='divtext-blanke'>Level</td>";
        html = html + "</tr>";

        var l = 1;
        var m = 0,i;
        for (i = 0; i < answer.length; i++) {
            var serialno = answer[i][5];
            html =html + "<tr>";
            for (var j = 0; j < 8; j++) {
                if(testType== "3"){
                    if(j == 6){
                        continue;
                    }
                }                
                if (j == 1) {
                    html = html + " <td valign='middle' align='center' class='coloumn-gray' id='divtext' >";
                } else {
                    html = html + " <td valign='middle' align='center' class='coloumn-gray' >";
                }
                if (j == 5) {
                    html = html + Math.floor(responsetime[i]/60)+":"+responsetime[i]%60;
                }
                if (j == 6) {
                    if (testType == 1) {
                        if (topperTime[0] == 1) {
                            html = html + 'You';
                        } else if (topperTime[1] != undefined && topperTime[0] == 2) {
                            html = html + Math.floor(responsetimeTopper[i]/60)+":"+responsetimeTopper[i]%60;
                        } else {
                            html = html + '-NA-';
                        }
                    } else {
                        if (topperTime[0] == 1) {
                            html = html + 'You';
                        } else if (topperTime[1] != undefined && topperTime[0] == 2) {
                            html = html + Math.floor(responsetimeTopper[i]/60)+":"+responsetimeTopper[i]%60;
                        } else {
                            html = html + '-NA-';
                        }
                    }
                } else if (j == 0) {
                    html = html + l;
                } else if (j == 1 || j == 2 || j == 3 || j == 4) {
                          if (j == 1) {
                           m = 0;
                          }if (j == 2) {
                           m = 1;
                           }if (j == 3) {
                           m = 2;
                           }
                           if (j == 4) {
                           m = 3;
                           }
                           if (j != 1) {
                           html = html + answer[i][m];
                           }
                } else if (j == 7) {
                     html = html + answer[i][4];
                } else {

                }
                if (j == 1) {
                    if (answer[i][m] == 'R') {
                        html = html + " <a href='#' id='trigger" + i +"'>";//remove mouseover by Saurabh Jaiswal.
                        html = html + " <img id='triggerA" + i +"' src='https://gw-mdsy-new.s3-accelerate.amazonaws.com/student/images/wright.gif" + "' onmouseover='return questionShowFullText("+i+","+testid+","+serialno+","+testType+","+testname[9]+");"+"'/>";//add mouseover and id by Saurabh Jaiswal.
                        html = html + " </a>";
                    }
                    if (answer[i][m] == 'W') {
                        html = html + " <a href='#' id='trigger" + i +  "'>";//remove mouseover by Saurabh Jaiswal.
                        html = html + " <img id='triggerA" + i +"' src='https://gw-mdsy-new.s3-accelerate.amazonaws.com/student/images/wrong.gif"  + "' onmouseover='return questionShowFullText("+i+","+testid+","+serialno+","+testType+","+testname[9]+");"+"' />";//add mouseover and id by Saurabh Jaiswal.
                        html = html + " </a>";
                    }if (answer[i][m] == '') {
                        html = html + "<a href='#' id='trigger" + i + "'>";//remove mouseover by Saurabh Jaiswal.
                        html = html + "<img id='triggerA" + i +"' src='https://gw-mdsy-new.s3-accelerate.amazonaws.com/student/images/left-question.gif"+"' onmouseover='return questionShowFullText("+i+","+testid+","+serialno+","+testType+","+testname[9]+");"+"' />";//add mouseover and id by Saurabh Jaiswal.
                        html = html + "</a>";
                    }
                    html = html + "<div id='pop-up"+ "' style='top: 189px; width:400px; left:767px; display: none; position:absolute;  background-color:#ffffff; z-index:1;' onmouseover='showPopUpDiv()' onmouseout='hidePopUpDiv()'>";//id pop-up replaced "pop-up+ i + " by Saurabh Jaiswal.
                    html = html + "<div  class ='questiondetai2' id='questiondetai2" +"'>";//id questiondetai2 replaced questiondetai2_<?php  //echo $answer[$i][5];?>"> by Saurabh Jaiswal.
                    html = html + "</div>";
                    html = html + "</div>";
                }
                html = html + " </td>";
            }l++;
            html = html +"</tr>";
        }
        html = html + "</table>";
    } else{
        html = html + "<center><b>This report is not published by admin</b></center>";
    }
    return html;
}

function solutionReport(array1){
    var jsondata=JSON.parse(array1);
    var solution=jsondata[0];
    var studentAnswers=jsondata[1];
    var studentStatus=jsondata[20];
    var testname=jsondata[2];
    var getBookmark=jsondata[3];
    var testid=jsondata[4];
    var studentid=jsondata[5];
    var testType=jsondata[6];
    var reportValidate=parseInt(jsondata[9]);
    var rankCheck=jsondata[7];
    var studentSessionId=jsondata[8];
    var superUserId=jsondata[10];
    var title=jsondata[11];var bookmark=jsondata[12];
    var testName=testname[15],j;
    var id=jsondata[13];
    var language=jsondata[14];
    var langSwitcher=testname[11];
    var langNumberSerial= jsondata[17];
    var englishLang = jsondata[19];
    var hindiLang = jsondata[18];
    var qnIdArr = jsondata[21];
    var topicArray=jsondata[22];
    var quizSwitcher = jsondata[16],index;
//    alert(JSON.stringify(jsondata[22]));
    id=id.split("-");
    if(getBookmark==undefined){
       getBookmark = " ";
    }
    if(testType==2 || testType==1){
       quizSwitcher=1;
    }

    var html="";var html11="";
    if ((reportValidate == 1 && rankCheck!=0 &&  testType==2) || (reportValidate == 1  && (testType==1 || testType == 3) ) || studentSessionId==superUserId) {
        html = html + "<div class='test-heading'>";
            html = html + "<ul>";
                html = html + "<li><img src='https://gw-mdsy-new.s3-accelerate.amazonaws.com/student/images/all-report.gif' /></li>";
                html = html + "<li class='login-top'><strong>Solution Report For </strong>"+testname[15]+"<br /><div style='font-size:11px;color:gray'>Represent whole test solution with correct and incorrect answers.</div></li>";
            html = html + "</ul>";
        html = html + "</div>";

        html = html + "<div class='dropcollapsed'>";
            html = html + "<input type='hidden' id='testname' value='"+testName+"'/>";
            html = html + "<input type='hidden' id='title' value='"+title+"'/>";
            html = html + "<h2>";
            html = html + "<div class='view-report-status' onclick='yourTestAnalisis("+testid+","+studentid+",4,"+testType+");'><img  id='imgid4' src='https://gw-mdsy-new.s3-accelerate.amazonaws.com/student/images/drop-detail-icon.png' align='top' />&nbsp;&nbsp;View Your Test Analysis</div>";
          //  alert(title);
           // html = html + "<div class='view-report-status' onclick='printSolution()'><img  id='imgid4' src='https://gw-mdsy-new.s3-accelerate.amazonaws.com/student/images/print.jpg' align='top' />&nbsp;&nbsp;Print</div>";
            if(langSwitcher==1 && quizSwitcher == 1){
                html = html + "<div style='float:right; display:inline-block; width:150px;'><select id='language' onchange='changeLanguage("+testid+","+studentid+","+id[1]+","+reportValidate+","+testType+")' style='float:right; margin:0 0px 0 10px;  font-weight:bold; font-size:11px; color:#3b3b3b; border:0px;background-color:#dfeaf1; padding:8px 3px;'>";
                if(language==1){
                    html = html + "<option id='english' value='English' selected>"+englishLang+"</option><option id='hindi' value='Hindi'>"+hindiLang+"</option>";
                } else{
                    html = html + "<option id='hindi' value='Hindi' selected>"+hindiLang+"</option><option id='english' value='English'>"+englishLang+"</option>";
                }
                html = html + "</select> </div>";
            }
            html = html + "</h2>";
            html = html + "<div class='dropcontent' id='testAnalysis4'>";
            html = html + "</div>";
        html = html + "</div>";

        html = html + "<div class='solution-report solution-reportmark' id='printSolutionScreen'>";
        html = html + "<div class='water-mark'></div>";
            html = html + "<div class='solution-heading'>";
                html = html + "<div class='solution-heading-left'>Q. No</div>";
                html = html + "<div class='solution-heading-right'>Question Status</div>";
                html = html + "<div class='clearboth'></div>";
                html = html + "</ul>";
            html = html + "</div>";
            var l=1;
            for (var i = 0; i < solution.length; i++) {
                var arr=new Array();
                if (solution[i][4] == 5 || solution[i][4] == 7) {
                    var correctanswer1 = solution[i][5];
                    correctanswer1 = correctanswer1.split(",");
                    var temp;
                    for (var i1 = 0; i1 < correctanswer1.length; i1++) {
                        if (correctanswer1[i1] == 'a') {
                            temp = 6;
                        }
                        if (correctanswer1[i1] == 'b') {
                            temp = 7;
                        }if (correctanswer1[i1] == 'c') {
                            temp = 8;
                        }if (correctanswer1[i1] == 'd') {
                            temp = 9;
                        }if (correctanswer1[i1] == 'e') {
                            temp = 10;
                        }if (correctanswer1[i1] == 'f') {
                            temp = 11;
                        }
                        if (correctanswer1[i1] == 'g') {
                            temp = 12;
                        }if (correctanswer1[i1] == 'h') {
                            temp = 13;
                        }
                        arr[i1] = temp;
                    }
                }
                if (solution[i][4] == 7) {
                    var studentNo = studentAnswers[i], studentNo1;
                    if (studentNo == 'a') {
                        studentNo1 = 6;
                    }
                    if (studentNo == 'b') {
                        studentNo1 = 7;
                    }if (studentNo == 'c') {
                        studentNo1 = 8;
                    }if (studentNo == 'd') {
                        studentNo1 = 9;
                    }if (studentNo == 'e') {
                        studentNo1 = 10;
                    }if (studentNo == 'f') {
                        studentNo1 = 11;
                    }
                    if (studentNo == 'g') {
                        studentNo1 = 12;
                    }if (studentNo == 'h') {
                        studentNo1 = 13;
                    }
                }

                html = html + "<div class='solution-question'>";
                    html = html + "<div class='solution-question-left'>Q."+l+"</div>";

                        html = html + "<div class='solution-question-right'>";
                            html = html + "<div class='solution-detail'>"+solution[i][2]+"</div>";
                            if (solution[i][4] == 3 || solution[i][4] == 4) {
                                html = html + "<div class='match-question'>";
                                    html = html + "<div class='match-question-left'>";
                                        html = html + "<ul>";
                                        for (j = 6; j <= 13; j++) {
                                            if (solution[i][j] != "") {
                                                html = html + "<li>"+solution[i][j]+"</li>";
                                            }
                                        }
                                        html = html + "</ul>";
                                    html = html + "</div>";
                                    var alphabet = new Array('p', 'q', 'r', 's', 't', 'u', 'v', 'w');
                                    var alpha = 0;
                                    html = html + "<div class='match-question-right'>";
                                        html = html + "<ul>";
                                        for (j = 6; j <= 13; j++) {
                                            if (solution[i][j] != "") {
                                                html = html + "<li>"+alphabet[alpha] + ".  " + solution[i][j + 8]+"</li>";
                                            }alpha++;
                                        }
                                        html = html + "</ul>";
                                    html = html + "</div>";
                                    html = html + "<div class='clearboth'></div>";
                                html = html + "</div>";
                            } else{
                                html = html + "<div class='solution-list'>";
                                    html = html + "<ul>";
                                        if (solution[i][4] == 2) {

                                        }
                                        if (solution[i][4] == 5 || solution[i][4] == 7 || solution[i][4] == 6) {
                                            for (j = 6; j <= 13; j++) {
                                                if (solution[i][j] != "") {
                                                    var  t = 0;
                                                    var  t1 = 0;
                                                    html = html + "<li>";
                                                    if (solution[i][4] == 5 || solution[i][4] == 7) {
                                                        if (studentStatus[i] == 'w') {
                                                            if (solution[i][4] == 7) {
                                                               for (var k = 0; k < arr.length; k++) {
                                                                  if (j == arr[k]) {
                                                                     t1 = 1;
                                                                  }
                                                                  if (studentNo1 == j) {
                                                                     t1 = 2;
                                                                  }
                                                               }
                                                               if (t1 == 1) {
                                                                  //html = html + "<img src='https://gw-mdsy-new.s3-accelerate.amazonaws.com/student/images/wright.gif'  class='solution-list-image' />";
                                                               }
                                                               if (t1 == 2) {
                                                                  //html = html + "<img src='https://gw-mdsy-new.s3-accelerate.amazonaws.com/student/images/wrong.gif'  class='solution-list-image' />";
                                                               }
                                                            }
                                                            if (solution[i][4] == 5) {

                                                            }
                                                        } else {
                                                            for (k = 0; k < arr.length; k++) {
                                                               if (j == arr[k]) {
                                                                   t = 1;
                                                               }
                                                            }
                                                            if (t == 1) {
                                                               //html = html + "<img src='https://gw-mdsy-new.s3-accelerate.amazonaws.com/student/images/wright.gif'  class='solution-list-image' />";
                                                            }
                                                        }
                                                    }
                                                    if(solution[i][j].trim().indexOf("<p>") == 0){
                                                        html = html + solution[i][j].replace(/<p[^>]*>/, '')+"</li>";
                                                    } else{
                                                        html = html + solution[i][j]+"</li>";
                                                    }
                                                }
                                            }
                                        }
                                        if (solution[i][4] == 8) {
                                            html = html + "<li>";
                                                if(solution[i][5]=="true"){
                                                    //html = html + "<img src='https://gw-mdsy-new.s3-accelerate.amazonaws.com/student/images/wright.gif'  class='solution-list-image' />";
                                                }
                                            html = html + "True"+"</li>";
                                            html = html + "<li>";
                                                if(solution[i][5]=="false"){
                                                    //html = html + "<img src='https://gw-mdsy-new.s3-accelerate.amazonaws.com/student/images/wright.gif'  class='solution-list-image' />";
                                                }
                                            html = html + "False"+"</li>";
                                        }
                                    html = html + "</ul>";
                                html = html + "</div>";
                            }
                            
                            html = html + "<div class='solution-control'>";
                                html = html + "<div class='solution-control-left'>";
                                    html = html + "<ul>";
                                       var str = "";
                                       var notattempt = 0;
                                       var incorrect=0;
                                       var correct=0;
                                       if(studentStatus[i]){
                                            if (studentStatus[i].toLowerCase() == 'r') {
                                                str = "<strong>" + "Correct" + "</strong>";
                                                correct=1;
                                            } else if (studentStatus[i].toLowerCase() == 'l') {
                                                notattempt = 1;
                                                var str1 = "Not Attempt";
                                            } else {
                                                str = "<span>" + "Incorrect" + "</span>";
                                                incorrect=1;
                                            }
                                        }
                                       if(notattempt==1){
                                           html = html + "<li class='sol-left' > Not Attempt</li>";
                                       } else{
                                           html = html + "<li class='sol-left' >Attempt</li>";
                                           html = html + "<li >"+str+"</li>";
                                       }
                                       if(incorrect==1){
                                           html = html + "<li class='sol-left' > Your Ans.</li>";
                                           html = html + "<li class='sol-left'>"+"<span>" +studentAnswers[i]+"</span>"+"</li>";
                                           html = html + "<li class='sol-left' > Correct Ans.</li>";
                                           html = html + "<li class='sol-left' > <strong>"+solution[i][5]+"</strong></li>";
                                       }
                                       if(notattempt==1 || correct==1 ){
                                           html = html + "<li class='sol-left' > Correct Ans.</li>";
                                           html = html + "<li class='sol-left' > <strong>"+solution[i][5]+"</strong></li>";
                                       }
                                       html = html + "<div class='clearboth'></div>";
                                    html = html + "</ul>";
                                html = html + "</div>";

                                html = html + "<div class='solution-control-right'>";
                                    html = html + "<ul>";
                                    if((testType == "1" || testType == "2") && testname[9]!="2"){
                                        if(bookmark==1){
                                          var id1="bookmark"+studentid+"_"+testid+"_"+l;
                                          var id2="unbookmark"+studentid+"_"+testid+"_"+l;
                                          index = $.inArray( l.toString(),getBookmark );
                                          if(index>-1){
                                              html = html + "<li class='sol-right' id='"+id1+"' style='display:none;' onclick='bookmark("+studentid+","+testid+","+l+","+language+")'><a href='javascript:void(0)' ><img src='https://gw-mdsy-new.s3-accelerate.amazonaws.com/student/images/add.jpg' class='sol-image' />bookmark</a></li>";
                                              html = html + "<li class='sol-right' id='"+id2+"' style='display:block' onclick='unbookmark("+studentid+","+testid+","+l+","+language+")'><a href='javascript:void(0)' ><img src='https://gw-mdsy-new.s3-accelerate.amazonaws.com/student/images/add.jpg' class='sol-image' />unbookmark</a></li>";
                                          } else{
                                              html = html + "<li class='sol-right' id='"+id1+"' style='display:block' onclick='bookmark("+studentid+","+testid+","+l+","+language+")'><a href='javascript:void(0)' ><img src='https://gw-mdsy-new.s3-accelerate.amazonaws.com/student/images/add.jpg' class='sol-image' />bookmark</a></li>";
                                              html = html + "<li class='sol-right' id='"+id2+"' style='display:none' onclick='unbookmark("+studentid+","+testid+","+l+","+language+")'><a href='javascript:void(0)' ><img src='https://gw-mdsy-new.s3-accelerate.amazonaws.com/student/images/add.jpg' class='sol-image' />unbookmark</a></li>";
                                          }
                                        }
                                    }
//                                    html = html + "<li class='sol-right'  onclick='popForSolution("+solution[i][1]+","+solution[i][3]+","+solution[i][4]+","+l+","+language+")'>";
//                                        html = html + "<a href='javascript:void(0)' ><img src='https://gw-mdsy-new.s3-accelerate.amazonaws.com/student/images/solution.jpg' class='sol-image'/>Solution</a>";
//                                    html = html + "</li>";
                                    var temp115=0;
                                         for(var qnId=0;qnId<qnIdArr.length;qnId++){
                                    
                                            if((qnIdArr[qnId][0]==solution[i][1]) && (qnIdArr[qnId][1]==solution[i][3])){
                                                if(qnIdArr[qnId][2]==1 || qnIdArr[qnId][3]==1)
                                                temp115=1;
                                            }}
                                        if(temp115==1){
                                               html = html + "<li class='sol-right'  onclick='alertFunction()'>";
                                            
                                        }else{
                                    html = html + "<li class='sol-right'  onclick='popForDoubt("+solution[i][1]+","+solution[i][3]+","+solution[i][4]+","+l+","+language+","+testid+")'>";
                                }
                                        if(qnIdArr.length > 0){
                                           
                                        for(var qnId=0;qnId<qnIdArr.length;qnId++){
                                           
                                            if((qnIdArr[qnId][0]==solution[i][1]) && (qnIdArr[qnId][1]==solution[i][3])){
                                               
                                               html11 = "<a href='javascript:void(0)' style='color:red;font-size:13px;' ><img src='https://gw-mdsy-new.s3-accelerate.amazonaws.com/student/images/doubt.png' width='10' class='sol-image'/>See your Answer</a>"; 
                                               break;
                                            }else{
                                                
                                               html11 = "<a href='javascript:void(0)' style='color:green;font-size:13px;'><img src='https://gw-mdsy-new.s3-accelerate.amazonaws.com/student/images/doubt.png' width='10' class='sol-image'/>Have any doubt?</a>";
                                            }
                                        }
                                    }else{
                                              html11 = "<a href='javascript:void(0)' style='color:green;font-size:13px;'><img src='https://gw-mdsy-new.s3-accelerate.amazonaws.com/student/images/doubt.png' width='10' class='sol-image'/>Have any doubt?</a>";  
                                    }
                                         
                                    html = html + html11;
                                    html = html + "</li>";
					
			                html = html + "<li class='sol-right' onclick='openFaq("+solution[i][1]+","+solution[i][3]+","+solution[i][4]+","+testid+")'>";
                                    html = html + "<a href='javascript:void(0)' style='color:green;font-size:13px;'><img src='student/images/doubt.png' width='10' class='sol-image'/>FAQ?</a>";
                                    html = html + "</li>";
					
//                                  alert(topicArray[i+1]);
                                  if(topicArray[i+1]!=undefined){  
                                     var title=(topicArray[i+1][1].trim()).replaceAll(" ","_");
                                     html = html + "<li class='sol-right' style='cursor:pointer;' onclick=play('"+title+"'\,'"+topicArray[i+1][2]+"')>Video Solution</li>"
                                  }
                                    if(testType!="3"){
                                        if(parseInt(solution[i][0])){
                                            html = html + "<li class='sol-right'  onclick='popForEssay("+solution[i][0]+")'>";
                                                html = html + "<a href='javascript:void(0)' ><img src='https://gw-mdsy-new.s3-accelerate.amazonaws.com/student/images/comment.jpg' class='sol-image'/>Essay</a>";
                                            html = html + "</li>";
                                        }
                                    }
                                    html = html + "<div class='clearboth'></div>";
                                    html = html + "</ul>";
                                html = html + "</div>";

                                html = html + "<div class='clearboth'></div>";
                            html = html + "</div>";
                            
                            html = html + "<div style='width:90%;  margin:20px auto; background-color:#FFF; border:1px #a7d7f9 solid; padding:20px; overflow:hidden;'>";
                            html = html + "<div style='width:auto; background-image:url(https://gw-mdsy-new.s3-accelerate.amazonaws.com/student/images/view-pop-back.jpg); background-repeat:repeat-x; border-bottom:1px #cccccc solid; padding:17px 10px 7px 10px; margin:0 0 10px 0px; color:#0645ad;  font-size:14pt; font-family:Arial, Helvetica, sans-serif; overflow:hidden;'>Solution. "+l+"</div>";
                            if(solution[i][22])
                                html = html + "<div style='width:auto; font-size: 10pt; font-family:arial; line-height: 16pt;'>"+solution[i][22]+"</div></div>";
                            else
                                html = html + "<center>No solution available for this question</center></div>";
//                            html = html + "<div style='padding-left:50px;'>"+solution[i][22]+"</div>";
                        html = html + "</div>";
                    html = html + "<div class='clearboth'></div>";
                 html = html + "</div>";
                 l++;
            }
        html = html + "</div>";
    }else{
        html = html + "<center><b>This report is not published by admin</b></center>";
    }
    return html;
}


function changeLanguage(testid,studentid,id,reportvalidate,testtype){
    var lang=document.getElementById("language").value;
    if(lang=="Hindi"){
        getReport(testid,studentid,'cont-'+id,reportvalidate,testtype,2);
      //  document.getElementById("hindi").select();
    }
    else{
        getReport(testid,studentid,'cont-'+id,reportvalidate,testtype,1);
     //   document.getElementById("english").select();
    }
//  function getReport(testid,studentid,id,reportvalidate,testtype){
//      "+testid+","+studentid+","+id+","+reportValidate+","+tesype+"
//  }
}
function videoReport(array1){//alert(array1);
    var jsondata=JSON.parse(array1);
     var topicArray=jsondata[0];
     var testname=jsondata[1];
     var result="";
    
 result="<div class='test-heading'>";
        result=result+"<ul>";
        result=result+"<li><img src='https://gw-mdsy-new.s3-accelerate.amazonaws.com/student/images/video.png' width='80px'/></li>";
        result=result+"<li class='login-top'><strong>Test Video For</strong>"+" "+testname+"</li>";
        result=result+"</ul>";
        result=result+"</div>";
          result=result+"<table width='100%'  cellpadding='10px' cellspacing='0px' align='center' id='table-coloumn'>";
           if(topicArray!="")
     {
           result=result+"<tr>";
           result=result+"<td width='14%' valign='middle' align='center' class='coloumn-black'>Sr. No.</td>";
           result=result+"<td valign='middle' align='center' class='coloumn-black'>Video Title</td>";
           result=result+"<td valign='middle' align='center' class='coloumn-black'> Play</td>";
            result=result+"</tr>";
            for(var i=0;i<topicArray.length;i++){
             var title=(topicArray[i][1].trim()).replaceAll(" ","_");
              result=result+"<tr>";
               result=result+"<td valign='middle' align='center' class='coloumn-gray' style='margin:0px;padding:0px;'><strong>"+topicArray[i][0]+"</strong></td>";
               result=result+"<td valign='middle' align='center' class='coloumn-gray' style='margin:0px;padding:0px;'><strong>"+topicArray[i][1]+"</strong></td>";
              // result=result+"<td valign='middle' align='center' class='coloumn-gray' style='margin:0px;padding:0px;'><strong><img src='https://gw-mdsy-new.s3-accelerate.amazonaws.com/student/images/play.png' onclick="play("'\'+topicArray[i][1]+'\','\'+topicArray[i][2]+'\')' style="cursor:grab;"/></strong></td>";
               result=result+'<td valign="middle" align="center" class="coloumn-gray" style="margin:0px;padding:0px;"><strong><img src="https://gw-mdsy-new.s3-accelerate.amazonaws.com/student/images/play.png" onclick=play("'+title+'"\,"'+topicArray[i][2]+'") style="cursor:pointer;"/></strong></td>';
             result=result+"</tr>";
    }
     
 }else { result+="<tr><td width=100% style='text-align:center; font-size:14px'>No Test Video Available For this Test</td><tr>";}
 result=result+"</table>";
     return result;
        }
        String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};


function openFaq(qnId,subjectId,quesType,testId){
    location.href = "index.php?pageName=faq&qnId="+qnId+"&subjectId="+subjectId+"&quesType="+quesType+"&testId="+testId;
}
function alertFunction(){
    alert('deleted By Admin');
}