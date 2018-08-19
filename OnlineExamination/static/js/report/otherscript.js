function myTimeoutFunction(){
    urlData="mode=updateSessionTable";
    $.ajax(
        {
        type:"post",
        url:"index.php?pageName=insertAjaxProfile",
        data:urlData,
        error:function(){},
        success:function(result){}
    })
}
setInterval(function(){
    myTimeoutFunction()
},1000*60*10);


function afterLogin(id,getValue,sconfig){
    url2="mode="+'popUpSkip';
    $.ajax({
        type:"post",
        url:"index.php?pageName=dashboard/skipAjax",
        data:url2,
        error:function(){},
        success:function(result){
            if(getValue!=0&&sconfig==0){
                location.href="index.php?pageName=dashboard"
            }else if(sconfig==1)location.href="index.php?pageName=packageBo";
            else{
                location.href="index.php?pageName=test/testSummary&exam=2"}
        }}
    )
}

function saveStream(){
    var stream=document.getElementById('popUpstream').value;
    if(stream=='0'){
        alert("Please select stream");
        return false}
    else{
        var url2="mode=popUpstream&stream="+stream;
        $.ajax({
            type:"post",
            url:"index.php?pageName=dashboard/skipAjax",
            data:url2,
            error:function(){},
            success:function(result){
                location.href="index.php?pageName=dashboard"
            }
        })
    }
}

function notification(){
    var noti=document.getElementById("notification");
    if(noti.style.visibility=="hidden"){
        noti.style.visibility="visible"
    }else{
        noti.style.visibility="hidden"
    }
}

function read(Id){
    url2="mode="+'notification&Id='+Id;
    $.ajax({
        type:"post",
        url:"index.php?pageName=dashboard/skipAjax",
        data:url2,
        error:function(){},
        success:function(result){}})
}

function showPopUp(){
    document.getElementById("help-popUp").style.display="block";
    document.getElementById("popUpInner").style.display="block"
}

function hideMailPopUp(){
    document.getElementById("help-popUp").style.display="none";
    document.getElementById("popUpInner").style.display="none";
    document.getElementById('radio1').checked='true'
}

function sendMail(){
    var message=document.getElementById('description').value;
    var mailId;
    var department;
    if(document.getElementById('radio1').checked){
        mailId=document.getElementById('radio1').value;
        department="Help: Technical Department"
    }
    if(document.getElementById('radio2').checked){
        mailId=document.getElementById('radio2').value;
        department="Help: Administrator"
    }
    if(message){
        while(message.indexOf("+")!=-1){message=message.replace("+","%2B")}
        while(message.indexOf("&")!=-1){message=message.replace("&","%26")}
        var urldata="message="+message+"&mailId="+mailId+"&department="+department;
        $.ajax({
            type:"POST",
            url:'index.php?pageName=layout/helpMail',
            data:urldata,async:false,
            error:function(data){},
            success:function(data){
                hideMailPopUp()}
        })
    }else{
        alert('Please Enter Message');
        return false}
}

function setLogoMargin(){
    if(document.getElementById("left_logo").style.visibility==""){
        var heightOuter=document.getElementById("left_logo").offsetHeight;
        var heightInner=Number(document.getElementById("logo_img").offsetHeight);
        var diff=heightOuter-heightInner;
        diff=parseInt(diff/2);
        document.getElementById("logo_img").style.marginTop=diff+'px';
        document.getElementById("left_logo").style.visibility='visible'}
}

function checkMail(id){
    if(id=="techDepart"){
        document.getElementById("radio1").checked="true"
    }if(id=="administrator"){
        document.getElementById("radio2").checked="true"
    }
}

$("#finalPackIds").val("");
$("#packageId").val("");
$("#totalCost").val(0);
$("#packageShopingids").val("");
$("#finalPackIds").val("");
function getPackage(){
    var urldata="mode=getPackageData";
    $.ajax({
        type:"post",
        url:"index.php?pageName=ajax",
        data:urldata,
        async:false,
        error:function(){},
        success:function(result){
            if(parseInt(result)==0){
                var x="<div class='test-available1'><strong>No Package Available.</strong><br /></div>";
                $(".pkgrightpnl").hide();
                $("#packgeDetail").css("width","100%");
                $("#packgeDetail").html(x)
            }else{
                $("#packgeDetail").html(result);
                $(".pakage_cntr").show()}
        }})
}

function showAddToCartPackage(cost,packId,cbtId)
 { 
    if(cbtId!='undefined' && cbtId!=undefined ){
        
    $(".shoppinbasketshow").attr("style","display:block");
    $(".pkgrightpnl").removeClass("pop_hide");
    $(".pkgrightpnl").addClass("pop_show");
    $("#noSel").hide();
    var previoushtml=$("#cart").html();
    previoushtml="";
    var name=$("#name"+packId).val();
    var total=parseInt($("#totalCost").val()); 
    var packIds=$("#packageShopingids").val();
    var packfinal=$("#finalPackIds").val();
   
    var flag=0;total=total+cost;
    var gst_amount = total*.18;
    var gst_amount1 = gst_amount.toFixed(2);
    var total_amount = total+gst_amount;
    var total_amount1 = total_amount.toFixed(2);
    if(packfinal!=""){
        alert("You can buy only one Package");
        return false}
    if(packfinal===''){
        packfinal=packId}
    else{
        packfinal=packfinal+","+packId
    }if(packIds==''){packIds=packId
    }else{
        var packageId=packIds.split(",");
        for(var i=0;i<packageId.length;i++){
            if(packId==packageId[i]){flag=1;break}
        }
        if(flag===1){
            var cart='<a href="javascript:void(0)" class="packagebutton green" id="purchase'+packId+'"><i class="packagesprite"></i>BUY NOW</a></td>';
            $("#purchase"+packId).html(cart);
            $("#"+packId).show();
            $("#finalPackIds").val(packfinal);
            $("#packageId").val(packfinal);
            $("#totalCost").val(total);
            $("#totalCost1").html(total);
            $("#grndTotal").html(total);
            $("#gsttotal").html(gst_amount1);
            $("#grndTotal1").html(total_amount1);
            $("#packageCost").val(total_amount1);
            return false
        }else{
            packIds=packIds+","+packId;
        }
    }
    previoushtml+='<div class="bsktprdct" id='+packId+'><div class="prdctname">'+name+'<br> <b>Price: <i class="packagesprite"></i>'+cost+'</b></div> </div>';
    var cart='<a href="javascript:void(0)" class="packagebutton green" id="purchase'+packId+'"><i class="packagesprite"></i>BUY NOW</a></td>';
    $("#cart").html(previoushtml);
    $("#packageShopingids").val(packIds);
    $("#finalPackIds").val(packfinal);
    $("#packageId").val(packfinal);
    $("#purchase"+packId).html(cart);
    $("#totalCost").val(total);
    $("#totalCost1").html(total);
    $("#grndTotal").html(total);
    $("#gsttotal").html(gst_amount1);
    $("#grndTotal1").html(total_amount1);
    $("#packageCost").val(total_amount1);
    $("#cbt_center_id").val($(cbtId).val());
 
    }   else{
      
        showAddToCartPackage2(cost,packId);
    }        
}

function removeItem(id,cost){
   
    var packfinal=$("#finalPackIds").val();
    var total=$("#totalCost").val();
    total=total-cost;var data="";
    var packageIds=new Array();
    packageIds=packfinal.split(",");
    var temp=new Array();
    var x=0;
    for(var i=0;i<packageIds.length;i++){
        if(id!=packageIds[i]){
            temp[x]=packageIds[i];
            x++
        }
    }
    var x=temp.join(",");
    $("#totalCost").val(total);
    $("#totalCost1").html(total);
    $("#grndTotal").html(total);
    $("#"+id).hide();
    var cart='<a href="javascript:void(0)" class="packagebutton red" onclick="showAddToCartPackage('+cost+','+id+')"><i class="packagesprite"></i>BUY NOW</a>';
    $("#purchase"+id).html(cart);
    $("#finalPackIds").val(x);
    $("#packageId").val(x);
    if($("#packageId").val()==''){
        $("#noSel").show()
    }
}

function validateCoupon(){
    var coupon=$.trim($('#couponNo').val());
    var sId=$('#studentId').val();
    var pack=$('#packageId').val();
    var total=$("#totalCost").val(); 
    if($("#cpnapply1").attr("disabled")=="disabled"){
        alert("Coupon has been already applied");
        return false
    }
    if(pack==''){
        alert("Please select the package");
        return false
    }
    if(coupon==""){
        alert("Please Enter Coupon Code");
        return false
    }
    var url="coupon="+coupon+"&mode=validateCoupon&sid="+sId+"&pid="+pack;
    $.ajax({
        type:"post",
        url:"index.php?pageName=insertAjaxProfile",
        data:url,
        async:false,
        error:function(data){},
        success:function(data){
        var arr=$.trim(data).split('#');
        if($.trim(arr[0])=='0'){
            $('#cerror').html("Coupon Code is invalid");
            $('#couponSucces').show();
            $('#couponNo').val('');return false;
        }else if($.trim(arr[0])=='1'){
            $('#cerror').html("Coupon Code is already used");
            $('#couponSucces').show();$('#couponNo').val('');return false
        }else if($.trim(arr[0])=='2'){$('#cerror').html("Coupon Cost does not match");
            $('#couponSucces').show();
            $('#couponNo').val('');return false}else if ($.trim(arr[0]) == '4') {
                $('#cerror').html("Coupon can not apply on this package");
                $('#couponSucces').show();
//                        $('#couponSucces').fadeOut(10000);
//                        $('#couponNo').val('');
                return false;
                }else if($.trim(arr[0])=='5'){
                    $('#cerror').html(arr[1]);
                    $('#couponSucces').show();
                    return false
                }else{
                    if(typeof(arr[2])=="undefined")
                    {
                        alert("It seems your internet is disconnected...");
                        location.reload();
                    }
                    $('#couponCode').val(coupon);
                    if($.trim(arr[3])=='1'){
                        $('#cerror').html("Congratulations! Discount/Promotion Successfully Applied.<a onclick='removeCpn();'  style='cursor: pointer'>Click to remove</a>")}
                    else{
                        $('#cerror').html("Congratulations! Discount/Promotion Successfully Applied.")
                    }
                    $('#couponSucces').show();
                    $("#cpnapply1").attr("disabled","disabled");
                    var cost=total-parseInt(arr[2]);
                    var gst = cost*.18; 
                    var gst1 = gst.toFixed(2); 
                    var gtotal = cost+gst;
                    var gtotal1 = gtotal.toFixed(2);
                    var cCharge=total*0.005;
                    $("#couponDiscount").html(arr[2]);
                    $("#grndTotal").html(cost);
                     $("#gsttotal").html(gst1);
                     $("#grndTotal1").html(gtotal1);
                     $("#packageCost").val(gtotal1);
                    return false
            }
        }
    })
}
function removeCpn(){
    var coupon=$.trim($('#couponNo').val());
    var sId=$('#studentId').val();
    var pack=$('#packageId').val();
    var total=$("#totalCost").val();
    var url="coupon="+coupon+"&mode=validateRmvCpn&sid="+sId+"&pid="+pack;
    $.ajax({
        type:"post",
        url:"index.php?pageName=insertAjaxProfile",
        data:url,
        async:false,
        error:function(data){},
        success:function(data){
            var arr=$.trim(data).split('#');
            if($.trim(arr[0])=='0'||$.trim(arr[0])=='5'){
                $('#cerror').html("Coupon Code is invalid");
                $('#couponSucces').show();
                $('#couponNo').val('');
                return false
            }else if($.trim(arr[0])=='1'){
                $('#cerror').html("Coupon Code is already used");
                $('#couponSucces').show();
                $('#couponNo').val('');
                return false
            }else if($.trim(arr[0])=='2'){
                $('#cerror').html("Coupon Code has been successfully removed.");
                $('#couponSucces').show();
                $('#couponNo').val('');
                $('#couponCode').val('');
                $("#couponDiscount").html('0');
                $("#grndTotal").html($("#totalCost1").html());
                $("#cpnapply1").attr("disabled","false");
                return false}
        }
    })
}
function paymentSubmit(){ 
    $("#gateway_type").val($("#payment_type:checked").val());
    var packId=$("#packageId").val();
    if(packId!=''){
        document.getElementById("pay").disabled=true;
        document.paymentPackage.submit()
    }else{
        alert("Please Select at least One Package");
        return false}
}

function checkProfile(){
    $('#target').slideDown('slow',function(){duration:2000});
    var h=$('#target').offset().top;
    $(window).scrollTop(h)
}
function tprsvdeosw(id){
    $("#"+id).css("display","block");
    $(".contact_form").removeClass("pop_hide");
    $(".contact_form").addClass("pop_show")
}

function gettouch_hide(id){
    $(".contact_form").addClass("pop_hide");
    setTimeout(function(){$("#"+id).css("display","none")},200)
}
$("#couponNo").bind('paste',function(){
    setTimeout(function(){var data=$('#couponNo').val();
        var dataFull=data.replace(/[^\w\s]/gi,'');
        dataFull=dataFull.replace(/[\s]/gi,"");
        $('#couponNo').val(dataFull)})
});
$("#couponCode").bind('paste',function(){
    setTimeout(function(){
        var data=$('#couponCode').val();
        var dataFull=data.replace(/[^\w\s]/gi,'');
        dataFull=dataFull.replace(/[\s]/gi,"");
        $('#couponCode').val(dataFull)})
});

function alpha(e){
    var k;
    document.all?k=e.keyCode:k=e.which;
    return((k>64&&k<91)||(k>96&&k<123)||k==8||(k>=48&&k<=57))
}
 function showAddToCartPackage2(cost, packId) {

        $(".shoppinbasketshow").css("display", "block");
        $(".pkgrightpnl").removeClass("pop_hide");
        $(".pkgrightpnl").addClass("pop_show");
        $("#noSel").hide();
        var previoushtml = $("#cart").html();
        previoushtml = "";
          
        var name = $("#name" + packId).val();
        var total = parseInt($("#totalCost").val());
        var packIds = $("#packageShopingids").val();
        var packfinal = $("#finalPackIds").val();

        var flag = 0;
        total = total + cost;
        
        var gst_amount = total*.18;
        var gst_amount1 = gst_amount.toFixed(2);
        var total_amount = total+gst_amount;
        var total_amount1 = total_amount.toFixed(2);
        if (packfinal != "")
        {
            alert("You can buy only one Package");
            return false;
        }
        if (packfinal === '') {
            packfinal = packId;
        } else {
            packfinal = packfinal + "," + packId;
        }
        if (packIds == ''){ 
            packIds = packId; 
        }
        else { 
            var packageId = packIds.split(",");
            for (var i = 0; i < packageId.length; i++) {
                if (packId == packageId[i]) {
                    flag = 1;
                    break;
                }
            }
            if (flag === 1) {
                var cart = '<a href="javascript:void(0)" class="packagebutton green" id="purchase' + packId + '">BUY NOW</a></td>';
                $("#purchase" + packId).html(cart);
                $("#" + packId).show();
                $("#finalPackIds").val(packfinal);
                $("#packageId").val(packfinal);
                $("#totalCost").val(total);
                $("#totalCost1").html(total);
                $("#grndTotal").html(total);
                $("#gsttotal").html(gst_amount1);
                $("#grndTotal1").html(total_amount1);
                $("#packageCost").val(total_amount1);
                return false;
            }
            else {
                packIds = packIds + "," + packId;
            }

        }

        previoushtml += '<div class="bsktprdct" id=' + packId + '><div class="prdctname">' + name + '<br> <b>Price: ' + cost + '</b></div> </div>';
        var cart = '<a href="javascript:void(0)" class="packagebutton green" id="purchase' + packId + '">BUY NOW</a></td>';
        $("#cart").html(previoushtml);
        $("#packageShopingids").val(packIds);
        $("#finalPackIds").val(packfinal);
        $("#packageId").val(packfinal);
        $("#purchase" + packId).html(cart);
        $("#totalCost").val(total);
        $("#totalCost1").html(total);
        $("#grndTotal").html(total);
        $("#gsttotal").html(gst_amount1);
        $("#grndTotal1").html(total_amount1);
         $("#packageCost").val(total_amount1);
        
    }