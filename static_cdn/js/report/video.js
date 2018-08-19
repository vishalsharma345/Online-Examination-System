/********* this js file is added by Shubham ******************/
  
  
/*----multiple delete all video added by Shubham---*/

$(document).ready(function()
{
    $("#video_delete_all").click(function(){

        var i=0;
        var ids=new Array();
        if(document.videoForm.deletevideo!=undefined){//added by shubham for js error
        if(document.videoForm.deletevideo.length==undefined){

            if(document.getElementsByName('deletevideo').item(0).checked==true){

                ids[0]=document.getElementsByName('deletevideo').item(0).value;


            }

        }else{
            for (index=0; index < document.videoForm.deletevideo.length; index++) {
                if(document.videoForm.deletevideo[index].checked){

                    var deletevideo = document.videoForm.deletevideo[index].value;
                    ids[i++]=deletevideo;
                }

            }
        }
        var totalArrayLength=ids.length;
//alert(totalArrayLength);
        if(totalArrayLength>0){

            var urldel="subjectId="+ids+"&mode="+'Dels'+"&type="+'2';

            jConfirm('Are you sure you want to delete this records?','Confirmation Dialog',

                function(confirm) {

                    if(confirm==true){


                        $.ajax({
                            type: "post",
                            url: "index.php?pageName=qb/video/ajax",
                            data: urldel,
                            error:function()
                            {

                            },
                            success: function (result){

                                // alert(result);
                                // displyErrorMassage('1','Record has been Successfuly Deleted');

                                location.reload();
                            //alert("Successfuly Deleted");

                            }

                        });

                    }

                });

        }
        else{

            // displyErrorMassage('0','Checked Item');
            alert("Please select a record to Delete.")

        }
        } else{
            alert("No record found");//added by shubham for js error
        }
    });





    /* To delete single Student from Student Index page and table by using ajax.php*/
    /* To send values of Checked Box (STUDENT_ID), mode to the ajax.php*/
    /* Start*/
    $("a.delete_video").click(function(e)
    {


        var parent =   $(this).parent().parent()
        var subject_id=$(this).attr("id");
        var urldel="subjectId="+subject_id+"&mode="+'Dels'+"&type="+'1';


        jConfirm('Are you sure you want to delete this record?', 'Confirmation Dialog',

            function(r) {


                if(r==true)
                {



                    $.ajax({
                        type: "post",
                        url: "index.php?pageName=qb/video/ajax",
                        data: urldel,
                        error:function(xhr, ajaxOptions, thrownError)
                        {



                        },

                        success: function(result)
                        {
                            // displyErrorMassage('1','Successfuly Deleted');
                            location.reload();
                        //location.href="/examener/index.php?pageName=student/index";



                        }

                    });

                }

            });



    });

    /*********************Select all Check Box for delete*******************************/
    
    $("#videoCheck").click(function()
    {
        if(document.videoForm.deletevideo!=undefined){//added by shubham for js error
        if(document.videoForm.deletevideo.length==undefined){
 
            if(document.getElementsByName('deletevideo').item(0).checked==false && document.getElementsByName('deletevideo').item(0).disabled==false){

                document.getElementsByName('deletevideo').item(0).checked=true;

            }
            else{
                document.getElementsByName('deletevideo').item(0).checked=false;

            }
        }
     
       var l=document.videoForm.deletevideo.length;
       
        if(document.videoForm.videoCheck.checked)
        {
           
            for (var index=0; index < document.videoForm.deletevideo.length; index++) {
                if (!document.videoForm.deletevideo[index].checked && document.videoForm.deletevideo[index].disabled==false) {

                    document.videoForm.deletevideo[index].checked=true;
                }
            }
        }
        else
        {
            if(!document.videoForm.videoCheck.checked)
            {
                for (index=0; index < document.videoForm.deletevideo.length; index++) {
                    if (document.videoForm.deletevideo[index].checked && document.videoForm.deletevideo[index].disabled==false) {

                        document.videoForm.deletevideo[index].checked=false;
                    }
                }
            }
        }
        }
    });

    $("#saveEditVideo").click(function(){
        var objEditName=document.getElementById("editVideoName");
        var objEditTitle=document.getElementById("editTitle");
        var editName=document.getElementById("editVideoName").value;
        var editTitle=document.getElementById("editTitle").value;
        var editVideoId=document.getElementById("editVideoId").value;

        if(trim(objEditName.value)==""){
            alert("Please enter the Video Name");
            objEditName.focus();
        } else if(trim(objEditTitle.value)==""){
            alert("Please enter the Video Title");
            objEditTitle.focus();
        } else {
            var urldata="videoid="+editVideoId+"&editname="+editName+"&edittitle="+editTitle+"&mode=saveEditVideo";
     
            $.ajax({
                type: "post",
                url: "index.php?pageName=qb/video/ajax",
                data: urldata ,
                error: function(data) { //alert(data+"error");
                },
                success: function(data)
                {
                    //document.getElementById("help-popUp").style.display="none";
                    //   document.getElementById("videoEditPopupBox").style.display="none";
                    location.reload();
                // location.href='index.php?pageName=qb/video/index';
                }

            });
        }
    });

    /***************************SELECT ALL FOR DELETE **********************/

    /*****************************Search Click by Shubham*******************/
    $("#searchbtn").click(function(){
        var field=$("#sortfield").val();
        var value=$("#searchvalue").val();
        if($("#sortfield").val()!=0 && $("#searchvalue").val()==''){
            alert("Please enter valid search criteria.");
            return false;
        } else if($("#sortfield").val()==0 && $("#searchvalue").val()!=''){
            alert("Please enter valid search criteria.");
            return false;
        }else if($("#sortfield").val()==0 && $("#searchvalue").val()=='' ){
            location.href="index.php?pageName=qb/video/index&id=All"
        }else if($("#sortfield").val()!=0 && $("#searchvalue").val()!='' ){
            location.href="index.php?pageName=qb/video/index&f="+field+"&v="+value;
        }
    });

    $("#sortfield").change(function(){
        $("#searchvalue").val("");

    });

/***********************Search Click End ***************************/

});
/* End*/
function editVideo(id){
  
    var d;
    var urldata="videoid="+id+"&mode=editVideo";
    $.ajax({
        type: "post",
        url: "index.php?pageName=qb/video/ajax",
        data: urldata ,
        error: function(data) {
//            alert("error");
        },
        success: function(data)
        {
            // alert(data);
            d= JSON.parse(data);
            // alert(d[1]);
            document.getElementById("help-popUp").style.display="block";
            document.getElementById("videoEditPopupBox").style.display="block";
            document.getElementById("editVideoName").value=d[0];
            document.getElementById("editTitle").value=d[1];
            document.getElementById("editVideoId").value=id;

        // $('#videoEditPopupBox').html(data);
           
        }

    });

}

function hidePopUp(){
    document.getElementById("help-popUp").style.display="none";
    document.getElementById("videoEditPopupBox").style.display="none";
   
}
function videohidePopUp(){
    document.getElementById("help-popUp").style.display="none";
    document.getElementById("videoChange").innerHTML="";
    document.getElementById("videoContent").style.display="none";
  
}
function videoPerPage(sort){
    location.href='index.php?pageName=qb/video/index'+sort;
}

function addVideo(){
    var addTitle=document.getElementById('addTitle');
    var addFile=document.getElementById('addFile');

    if(trim(addFile.value)==""){
        alert("Please enter the Video Source");
        addFile.focus();
    }
    else if(trim(addTitle.value)==""){
        alert("Please enter the Video Title");
        addTitle.focus();
    } else document.getElementById("videoForm").submit();
        
}

function trim(myString)
{
    return myString.replace(/\s/g,'');
}



function videoPlayer(id,vname){

    document.getElementById("help-popUp").style.display="block";
    

    document.getElementById("videoContent").style.display="block";

    var urldata="subjectCode="+id+"&mode=videoChange";
    $.ajax({
        type: "post",
        url: "index.php?pageName=qb/video/ajax",
        data: urldata ,
        error: function(data) {
        // alert("error");
        },
        success: function(data)
        {
            var st=  JSON.parse(data);

            var Re = new RegExp("3452355d9999999","g");
            st = st.replace(Re,id);

            document.getElementById("videoheading").innerHTML="Video : "+vname;
            $("#videoChange").html(st);


        // $('#videoEditPopupBox').html(data);

        }

    });

}