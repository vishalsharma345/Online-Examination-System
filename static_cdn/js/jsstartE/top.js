 $(document).bind("contextmenu",function(e){
	preventDefault(e);
});
var auditRecordNumber = 1;
var compreGroupDetails = new Object();
var isSubmitButtonClicked = false;
var isPageLoaded = true;
var isGroupAllQuestions = false;
var onlineAttemptId = "";
var onlineAssessmentId = "";
var onlineAssessmentCandidateId = "";
var feedbackdata;
var isPageRedirecting = false;
var authenticationKey = "";
var systemConfigurationParameters;
var isfinalSubmit = false;
var isFinalSubmitStarted=false;
var isRotatableLoaded = false;
var navSection=false;
var navGroup=false;
var jwPlayerDetails = new Object();
var jwPlayerDetailsIndex = new Object();

var explicitClose=false;
var toErrorPage=false;
var xmlFilePath = "";
var errorPageContent="";
var AuditJson=[];
var QPxml;
var isWindowClosed = false;
var zoomIconClass = "";
var currentChildQuestionsNormal = "";
var remainingInterruptions=0;
var MaxNoOfInterruption=0;
var noOfInterruptions=0;
var allowInterruptions='YES';
//var isInterruptionsAllowed='YES';
var consoleVersion='';
var loginId='NA';
var emailId='NA';
var dob='NA';
var photographPath='NA';
var verifiedPhotoPath='NA';
var mobileNum='NA';
var scribeExtraTime='';
var candidateExtraTime='';
var browserRelatedCheck='';
var fileUploadStatus = [];
var showViewQPButton = true;
var checkBackup=0;
var resultPublishDate=0;
var countIframe = 0;
var confXml;
var quizXml;
var validity="Live";
var allowZoom=0;
var iframeCount = 0;
var m_iframeCount = 0;
var oldIE = false;
var globalXmlvar ='';
var hasNavigationBar=false;//added by sai to make navigation bar of usefuldata player hide and show accordingly on exit from full screen
var isLoginIdConfigured=false;
var showHintDiv=false;
var isGrpCompreDiv=false;
var grpCompre =false;
var questionLevelTimeCounter;
var ringTheBell=false;
var ringTheBellTimeLeft=0;
var resumeFirstBackUp=false;

jQuery(document).ready(function(){
var url = document.URL;
var orgId='';
var assessmentId='';
var grpAllMultimediaPlayedAtOnceCount=0;

if(url.indexOf("index.html") >= 0 || url.indexOf("configurationCheck.html") >= 0){
	var params = "";
	if(url.indexOf("index.html") >= 0) {
		params = url.split("index.html?");
		orgId= $.trim(params[1]).split("@@")[0];
		assessmentId= $.trim(params[1]).split("@@")[1];
	} else if(url.indexOf("configurationCheck.html") >= 0){
		del_Online_Cookie('xmlFilePath');
		params = url.split("configurationCheck.html?");
		if(params[1].split("&")[0].split("=")[0] == "orgId"){
			orgId= params[1].split("&")[0].split("=")[1];
		}
		if(params[1].split("&")[1].split("=")[0] == "AsmntId"){
			assessmentId= params[1].split("&")[1].split("=")[1];
		}
//		assessmentId= $.trim(params[1]).split("@@")[1];
	}
	var mockType = "";	
	if(assessmentId.indexOf("M")!=-1){
		assessmentId=assessmentId.split("M")[1];
		mockType = "static";
	} else {
		mockType = "assessment";
	}
	var xmlURL = "/ASM/MockAssessmentAction.do?action=getXMLPath&orgId="+orgId+"&mockId="+assessmentId+"&mockType="+mockType+"&isVersionRequired=true";
	jQuery.ajax({
		url: xmlURL,
		async: false,
		type: 'POST',
		dataType: 'text',
		success: function(data) {
			xmlFilePath = data.indexOf("<Sep>")!=-1?data.split("<Sep>")[0]:data;
			consoleVersion=data.indexOf("<Sep>")!=-1?data.split("<Sep>")[1]:consoleVersion;
			validity=data.indexOf("<Sep>")!=-1?data.split("<Sep>")[2]:validity;
			xmlFilePath=xmlFilePath.replace(/\\/g,"/");
			document.cookie = "xmlFilePath="+xmlFilePath;
			sessionStorage.xmlFilePath = xmlFilePath;
			consoleVersion=consoleVersion.replace(/\\/g,"/");
			document.cookie = "consoleVersion="+consoleVersion;
			getCandIdFromCookie();
			if(validity.toLowerCase()!="live"){
				window.location.href ="error.html?E105"+((document.cookie.indexOf('isApp=true')>= 0)?"isApp":"")+((document.cookie.indexOf('isLauncher=true')>= 0)?"isLauncher":"");
			}
			if(url.indexOf("index.html") >= 0)
				validateIndexPageURL();
		}
	});
} else {
	getCookie(true);
}
}); 
jQuery(document).ready(function(){
	var url = document.URL;
	var orgId;
	var assessmentId;
	$.ajaxSetup({
		async: false
	});
	if(typeof(sessionStorage.cand_master_id) != "undefined"){
		$.removeCookie("cand_master_id");
		$.removeCookie("questionType");
		$.removeCookie("candidate_Id");
		$.removeCookie("consoleVersion");
		$.removeCookie("loginId");
		$.removeCookie("emailId");
		//$.removeCookie("dob");
		$.removeCookie("photographPath");
		//$.removeCookie("mobileNum");
		$.removeCookie("subscribed_for");
		$.removeCookie("app_seq_no");
		$.removeCookie("username");
		$.removeCookie("noOfInterruptions");
		$.removeCookie("qp_id");
		$.removeCookie("scribeExtraTime");
		$.removeCookie("allowZoom");
		$.removeCookie("duration");
		$.removeCookie("questionCount");
		$.removeCookie("qpLanguages");
		$.removeCookie("candidateExtraTime");
		$.removeCookie("orgId");
		$.removeCookie("assessmentId");
		$.removeCookie("attemptId");
		$.removeCookie("authenticationKey");
		$.removeCookie("isResumed");
		$.removeCookie("tokenKey");
		$.removeCookie("enrollmentId");
		$.removeCookie("subscriptionId");
		$.removeCookie("systemParameters");
		$.removeCookie("Latitude");
		$.removeCookie("Longitude");
		$.removeCookie("StateName");
		$.removeCookie("StateShortName");
		$.removeCookie("CountryName");
		$.removeCookie("CountryShortName");
		$.removeCookie("CityName");
		$.removeCookie("CityShortName");
		$.removeCookie("verifiedPhotoPath");
		$.removeCookie("isverified");
		xmlFilePath = sessionStorage.xmlFilePath;
		$.cookie("xmlFilePath",sessionStorage.xmlFilePath);
		$.cookie("cand_master_id",sessionStorage.cand_master_id);
		$.cookie("questionType",sessionStorage.questionType);
		$.cookie("candidate_Id",sessionStorage.candidate_Id);
		$.cookie("consoleVersion",sessionStorage.consoleVersion);
		$.cookie("loginId",sessionStorage.loginId);
		$.cookie("emailId",sessionStorage.emailId);
		//$.cookie("dob",sessionStorage.dob);
		$.cookie("photographPath",sessionStorage.photographPath);
		//$.cookie("mobileNum",sessionStorage.mobileNum);
		$.cookie("subscribed_for",sessionStorage.subscribed_for);
		$.cookie("app_seq_no",sessionStorage.app_seq_no);
		$.cookie("username",sessionStorage.username);
		$.cookie("noOfInterruptions",sessionStorage.noOfInterruptions);
		$.cookie("qp_id",sessionStorage.qp_id);
		$.cookie("scribeExtraTime",sessionStorage.scribeExtraTime);
		$.cookie("allowZoom",sessionStorage.allowZoom);
		$.cookie("duration",sessionStorage.duration);
		$.cookie("questionCount",sessionStorage.questionCount);
		$.cookie("qpLanguages",sessionStorage.qpLanguages);
		$.cookie("candidateExtraTime",sessionStorage.candidateExtraTime);
		$.cookie("orgId",sessionStorage.orgId);
		$.cookie("assessmentId",sessionStorage.assessmentId);
		$.cookie("attemptId",sessionStorage.attemptId);
		$.cookie("authenticationKey",sessionStorage.authenticationKey);
		$.cookie("isResumed",sessionStorage.isResumed);
		$.cookie("tokenKey",sessionStorage.tokenKey);
		$.cookie("enrollmentId",sessionStorage.enrollmentId);
		$.cookie("subscriptionId",sessionStorage.subscriptionId);
		$.cookie("systemParameters",sessionStorage.systemParameters);
		$.cookie("Latitude",sessionStorage.Latitude);
		$.cookie("Longitude",sessionStorage.Longitude);
		$.cookie("StateName",sessionStorage.StateName);
		$.cookie("StateShortName",sessionStorage.StateShortName);
		$.cookie("CountryName",sessionStorage.CountryName);
		$.cookie("CountryShortName",sessionStorage.CountryShortName);
		$.cookie("CityName",sessionStorage.CityName);
		$.cookie("CityShortName",sessionStorage.CityShortName);
		$.cookie("isMagnifyAllowed",sessionStorage.isMagnifyAllowed);
		$.cookie("verifiedPhotoPath",sessionStorage.verifiedPhotoPath);
		$.cookie("isverified",sessionStorage.isverified);
	}
	$.ajaxSetup({
		async: true
	});	
	if(url.indexOf("quiz.html") >=0){
		var tempMockId = "";
		if(url.indexOf("quiz.html?") == -1){
			errorPageContent = ($.cookie("orgId"))+"@@"+($.cookie("assessmentId"))+"@@"+($.cookie("attemptId"))+"@@"+($.cookie("cand_master_id"));
			tempMockId = $.cookie("assessmentId");
		} else {
			var params1 = url.split(".html?");
			var paramsData1 = $.trim(params1[1]).split("@@");
			//orgId= paramsData1[0];
			tempMockId = paramsData1[1];
		}
		if(tempMockId.indexOf("M")==-1){
			var attemptNo = $.cookie("attemptId");
			var candMasterId = $.cookie("cand_master_id");
			orgId = $.cookie("orgId");
			saveSysConfig(orgId,tempMockId,candMasterId,attemptNo);
		}
	}
	if(url.indexOf("quiz.html")>=0 || url.indexOf("instructions.html")>=0 || url.indexOf("FeedBack.html")>=0 ||url.indexOf("close.html")>=0){
		var params="";
		if(url.indexOf(".html?") >= 0){
			params = url.split(".html?");
			orgId= $.trim(params[1]).split("@@")[0];
			assessmentId = $.trim(params[1]).split("@@")[1];
		} else {
			orgId = $.cookie("orgId");
			assessmentId = $.cookie("assessmentId");
		}
		if(assessmentId==null|| assessmentId.length==0 || orgId == null || orgId.length==0){
			window.location.href ="error.html"+((document.cookie.indexOf('isApp=true')>= 0)?"isApp":"")+((document.cookie.indexOf('isLauncher=true')>= 0)?"isLauncher":"");
		}
	}
	$('#proceedToGrp').on('click',function(){
		if(mockVar.currentGrp==0)
			moveToExam();
		else
			moveToGroupFromGrpInst();
		
	 });
});

function avoidKeyPressing(event){
	if(event.ctrlKey){
		alert('Open in new Tab is disabled.');
		if(event.preventDefault)
			event.preventDefault();
		return false;
	}else if(event.shiftKey){
		alert('Open in new Window is disabled.');
		if(event.preventDefault)
			event.preventDefault();
		return false;
	}else if(typeof(event.altKey)=='undefined'?event.originalEvent.altKey:event.altKey){
		alert('Saving this link is disabled.');
		if(event.preventDefault)
			event.preventDefault();
		return false;
	}
	return true;
}

/*function activateAudioPlayer(){
	$(".almAudio .jp-jplayer").each(function(){
		var currentAudioContent = '';
		$($(this).next()).each(function(){
			currentAudioContent = $(this).attr("id");
		});
		$("#"+$(this).attr("id")).jPlayer({
			ready: function () {
				$(this).jPlayer("setMedia", {
					mp3: $(this).attr("title")
				});
			},
			play: function() {
				$(".jp-jplayer").not(this).jPlayer("pause");
			},
			swfPath: "js",
			supplied: "mp3",
			wmode: "window",
			smoothPlayBar: true,
			keyEnabled: true,
			remainingDuration: true,
			toggleDuration: true,
			 cssSelectorAncestor: '#'+currentAudioContent,
			 errorAlerts: false,
			 warningAlerts: false
		});
	});
}*/

/*function activateVideoPlayer(){
	$(".almVideo  .jp-jplayer").each(function(){
		$("#"+$(this).attr("id")).jPlayer({
			ready: function () {
				$(this).jPlayer("setMedia", {
					m4v: $(this).parent().parent().attr("name")
				});
			},
		    play: function() {
		        $(".jp-jplayer").not(this).jPlayer("pause");
		    },
			swfPath: "js",
			supplied: "m4v",
			size: {
				width: "640px",
				height: "360px",
				cssClass: "jp-video-360p"
			},
			smoothPlayBar: true,
			keyEnabled: true,
			remainingDuration: true,
			toggleDuration: true,
			cssSelectorAncestor: '#'+$(this).parent().parent().attr("id"),
			errorAlerts: false,
			warningAlerts: false
			
		});	 
	});
}*/

function editAudioVideoImageFilePath(quesText){
//	Need to be change
	if(mockVar.storeCandResponse==1){
		quesText = quesText.replace(/tkcimages/g, xmlFilePath+ mockVar.availableQpId + '/tkcimages');
	}
	else{
		quesText = quesText.replace(/tkcimages/g, xmlFilePath + 'tkcimages');
	}
	return quesText;
}
function preventDefault(e) {
	e = e || window.event;
	if (e.preventDefault)
		e.preventDefault();
	e.returnValue = false;  
}
function theMouseWheel(e) {
	preventDefault(e);
}
function disable_scroll() {
	if (window.addEventListener) {
		window.addEventListener('DOMMouseScroll', theMouseWheel, false);
	}
	window.onmousewheel = document.onmousewheel = theMouseWheel;
}
/** *************Disable right click*********************** */
function clickIE() {
	if (document.all) {
		return false;
	}
}
function clickNS(e) {
/*console.log(isTextHighlighterEnabled);
console.log(e.target.className)
	if(isTextHighlighterEnabled){
		if((e.target.className).indexOf("highlightext")!= -1){
		console.log("inside");
			return true;
			}
	}*/
	if(document.layers||(document.getElementById&&!document.all)) {
		if (e.which==2||e.which==3) {
			return false;
		}
	}
}
if (document.layers){
	document.captureEvents(Event.MOUSEDOWN);document.onmousedown=clickNS;
}else{
	document.onmouseup=clickNS;document.oncontextmenu=clickIE;
}

var hintDivInnerHtml = '<span class="hintIcon" style="display:none;padding:20px"><span class="hint"><b>Hint :</b></span><img src="images/info.gif" style="-moz-user-select: text; width: 20px" onclick="openHintPopUp(this)"></span><div style="display: none;" class="popUpDiv hintDiv" id=""><div class="popupHeader"><span class="hint">Hint :</span><div class="btnclose" style="-moz-user-select: text;" onclick="closeHintPopup()"><img src="images/btn_close.gif" style="-moz-user-select: text;"></div></div><div class="hintText" style="padding: 5px"></div><div class="tip" style="-moz-user-select: text;"></div></div>';


//var mobhintDiv = '<span class="hintIcon"><img src="images/info.gif" style="-moz-user-select: text; width: 20px" onclick="openHintPopUp(this)"></span><div style="display: none;" class="popUpDiv hintDiv" id=""><div class="popupHeader">Hint<div class="btnclose" style="-moz-user-select: text;" onclick="closeHintPopup()"><img src="images/btn_close.gif" style="-moz-user-select: text;"></div></div><div id="hintText" style="padding: 5px"></div><div class="tip" style="-moz-user-select: text;"><img src="images/tip1.gif" style="-moz-user-select: text;"></div></div>';
Array.prototype.inArray = function(searchFor, property) {
	var retVal = -1;
	$.each(this, function(index, item) {
		if (item.hasOwnProperty(property)) {
			if (item[property].toLowerCase() == searchFor.toLowerCase()) {
				retVal = index;
				return false;
			}
		}
	});
	return retVal;
};

function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}

/** ****************common functions **************************** */

function restoreFromBackup(QPxml,xml,orgId,mockId,isResumed){
	$.ajaxSetup({
		async: false
	});
	var xmlURL = "/ASM/MockAssessmentAction.do?action=getCandidateData&orgId="+orgId+"&mockId="+mockId+"&candMasterId="+onlineAssessmentCandidateId+"&attemptNo="+onlineAttemptId+"&QPId="+($.cookie("qp_id"))+"&keyType=Assessment&tokenKey="+($.cookie("tokenKey"));
	$.ajax({
		url:xmlURL,
		type: 'POST',
		async: false,
		dataType: 'json',
		success: function (data) {
			if(data!=null && data.Error != null){
				window.location.href="error.html?E103"+((document.cookie.indexOf('isApp=true')>= 0)?"isApp":"")+((document.cookie.indexOf('isLauncher=true')>= 0)?"isLauncher":"");
			} else if(data!=null && data.ResponseType == "CAND"){
				getDecryptedText(data.Response,"JSON",orgId,mockId);
				readSysInstructionsXMLQuizPage(QPxml,xml,orgId,mockId,isResumed);
			}
		}
	});
	$.ajaxSetup({
		async: true
	});				

	/*	var txtFilePath = xmlFilePath+"CandResponse/"+onlineAssessmentCandidateId+"/"+onlineAttemptId+"/EncryptedBackup.txt";
	$(document).load(txtFilePath, function(responseTxt, statusTxt, xhr){
        if(statusTxt == "success"){
        		getDecryptedText(responseTxt,"JSON");
        		readSysInstructionsXMLQuizPage(QPxml,xml,orgId,mockId,isResumed);
           } else 
        if(statusTxt == "error"){
            	$.getJSON(xmlFilePath+'CandResponse/'+mockVar.candMasterId+'/'+mockVar.attemptId+'/Backup.json', function(data){
		mockVar = data;
		readSysInstructionsXMLQuizPage(QPxml,xml,orgId,mockId,isResumed);
		$.ajaxSetup({
			async: true
		});
	});
            }
    });*/
}
function checkFileExist(filePath){
	var response=true;
	$.ajax({
		type: "POST",
		url: filePath,
		async : false,
		dataType: navigator.userAgent.indexOf('msie')!=-1 ? "text" : "xml",
				success: function(data) {
					if (typeof data == "string") {
						QPxml = new ActiveXObject("Microsoft.XMLDOM");
						QPxml.async = false;
						QPxml.loadXML(data);
					} else {
						QPxml = data;
					}
				},
				error : function(){
					response =  false;
				}
	});
	return response;
}
function readAndReturnXML(filePath){
	var xml="";
	$.ajax({
		type: "POST",
		url: filePath,
		async : false,
		dataType: ($.browser.msie) ? "text" : "xml",
				success: function(data) {
					if (typeof data == "string") {
						xml = new ActiveXObject("Microsoft.XMLDOM");
						xml.async = false;
						xml.loadXML(data);
					} else {
						xml = data;
					}
				},error : function(){
					setTimeout(function(){
						window.location.href="error.html?E404"+((document.cookie.indexOf('isApp=true')>= 0)?"isApp":"")+((document.cookie.indexOf('isLauncher=true')>= 0)?"isLauncher":"");
					},50);
				}
	});
	return xml;
}
function alignHeight() {
	var height;
	if($(window).width()<1000){
		height = $(window).height() - $("#header").height();
	}else{
		height = $(window).height() - ($("#header").height() + $("#footer").height());
	}
	$('#mainleft').css({ "height": height });
	$('#mainright').css({ "height": height });
	$('#feedbackTableDiv').height($('#mainleft').height() - $('#feedBackHeader').outerHeight(true) - $('#submitBtnDiv').outerHeight(true));
}

function quizPageHeight() {
	var quesLabels=!($.trim(mockVar.mcQName).length>0)&&!($.trim(mockVar.msQName).length>0)&&!($.trim(mockVar.saQName).length>0)&&!($.trim(mockVar.fillBlankQName).length>0)&&
    !($.trim(mockVar.fillSeqQName).length>0)&&!($.trim(mockVar.fillGrpQName).length>0)&&!($.trim(mockVar.fillMatchColQName).length>0)&&!($.trim(mockVar.typingQName).length>0)&&
    !($.trim(mockVar.programingQName).length>0);
	
	if(iOAP.secDetails[iOAP.curSection].groupAllQuestions=="true" || isGrpCompreDiv==true){
		$('.questionTypeCont').height(0);
	}else if(quesLabels){
		if(mockVar.showMarks==false && showHintDiv==false)
			$('.questionTypeCont').height(0);	
	}
	if(mockVar.langCount<2 && mockVar.curQuesBean.quesType != "TYPING TEST"){
		$('#Questn_Innr_Div_section').height(0);
	}	
	var height = $(window).height() - ($("#header").height() + $("#footer").height() + $("#sub-header").height());
	var currQuesHeight ;
	currQuesHeight =  height - $('.profile-grouping-section').outerHeight(true) - $('.buttons-div').outerHeight(true) + 1 ;
	if (mockVar.curQuesBean.quesType == "TYPING TEST") {
		$('#typingInstDiv').height(jQuery(window).height() - (jQuery("#header").outerHeight(true) + jQuery("#sub-header").outerHeight(true) + jQuery("#User_Hldr").outerHeight(true)) - 103);
	}
	var theDiv = jQuery('#question_area');
	var questionpanelheight = jQuery(window).height() - (jQuery("#header").outerHeight(true) + jQuery("#sub-header").outerHeight(true) + jQuery("#User_Hldr").outerHeight(true) + jQuery(".diff_type_notation_area_outer").outerHeight(true) + jQuery(".header").outerHeight(true) + jQuery(".subheader").outerHeight(true) + 55 + jQuery("#footer").outerHeight(true) + parseInt(jQuery(".collapsebel_panel").css("border-left-width")) + parseInt(jQuery(".collapsebel_panel").css('border-top-width')) + 2);
	theDiv.height(questionpanelheight);
	theDiv.nanoScroller();
	/*if (typeof(iOAP.secDetails[iOAP.curSection].displayNumberPanel) == "undefined" || iOAP.secDetails[iOAP.curSection].displayNumberPanel == "" || iOAP.secDetails[iOAP.curSection].displayNumberPanel == "true") {
        $('#quesOuterDiv').css({ 'height': currQuesHeight - $('.questionTypeCont').outerHeight(true) - $('#Questn_Innr_Div_section').outerHeight(true) - 2, overflow: 'auto' });
    } else {
        if (iOAP.secDetails[iOAP.curSection].groupAllQuestions == "false") {
            $('#quesOuterDiv').css({ 'height': currQuesHeight - $('.questionTypeCont').outerHeight(true) - $('#Questn_Innr_Div_section').outerHeight(true) - 2 , overflow: 'auto' });
        } else {
            $('#quesOuterDiv').css({ 'height': (currQuesHeight-2), overflow: 'auto' });
        }
    }*/
	$('#quesOuterDiv').css({ 'height': 'auto' ,overflow: 'hidden' });
	$('.leftDiv').height(currQuesHeight - $('.questionTypeCont').outerHeight(true) - $('#Questn_Innr_Div_section').outerHeight(true)  - 8);
	$('.rightDiv').height(currQuesHeight - $('.questionTypeCont').outerHeight(true) - $('#Questn_Innr_Div_section').outerHeight(true)  - 8);
	//$('.leftRecordingDiv').height(currQuesHeight - $('.questionTypeCont').outerHeight(true) - $('#Questn_Innr_Div_section').outerHeight(true)  - 8);
	//$('.rightRecordingDiv').height(currQuesHeight - $('.questionTypeCont').outerHeight(true) - $('#Questn_Innr_Div_section').outerHeight(true)  - 8);
	$('#sectionSummaryDiv').height(currQuesHeight + 55);
	// $('#instruTimeDiv').height(height);
	$('#instruContentDiv').height( height - $('#instruPrcdBtnDiv').outerHeight(true)-$('.titlepath').outerHeight(true));
	$('#instruright').height(height);
	//$('#typingInstDiv').height($('.numberpanel').height() - ($('.viewSection').height() + $('#typingSubmit').height() + 10));
	$('#breakTimeDiv').height(height);
	$('#scoreCardDiv').height(height);
	$('#progEditorDisplay').height($('#progRightPart').height() - $('#progDescriptionDiv').outerHeight(true) - 2);
	$('#textareaforflip').height($('#progRightPart1').height() - $('#progDescriptionDiv').outerHeight(true) - 27);
	//$('#breakContentDiv').height($('#breakTimeDiv').height() - $('#brkPrcdBtnDiv').outerHeight(true) - $('#col1').outerHeight(true));
	// $('#breakSummaryDiv').height($('#breakContentDiv').height() - $('#breakTimeCountDiv').outerHeight(true));
	$('#break_summary').height($('#breakTimeDiv').height() - $('#brkPrcdBtnDiv').outerHeight(true) - $('#col1').outerHeight(true) - $('#breakTimeCountDiv').outerHeight(true) - 40 - $('.examSummaryHeader').outerHeight(true));
	$('#group_summary').height($('#sectionSummaryDiv').height() - $('#confirmation_buttons').outerHeight(true) - $('.examSummaryHeader').outerHeight(true) - 80);
	$('#sc_group_summary').height($('#scoreCardDiv').outerHeight(true)-$('.titlepath').outerHeight(true)- $('.grayBand').outerHeight(true) -$('#scoreCardBtnDiv').outerHeight(true));	
	setTimeout(function() {
		var scrollBarVisible = $('.leftDiv').hasScrollBar();
		if (scrollBarVisible) {
			$("#scrollToTop").show();
			$("#scrollToBottom").show();
			$('#scrollToTop').attr('title',$(globalXmlvar).find('scrollToTop').text());
			$('#scrollToBottom').attr('title',$(globalXmlvar).find('scrollToBottom').text());
		} else {
			$("#scrollToTop").hide();
			$("#scrollToBottom").hide();
		}
	}, 1000);
}

function quizPageHeight1(){
	$('#textareaforflip').height($('#progRightPart').height()-$('#progDescriptionDiv').outerHeight(true)-27);
}
function parseSysInstructions(page,sysInstrXML,useSystemInstructions,orgId,mockId,isOptionalSectionsAvailable,isMarkedForReviewConsidered,QPxml,xmlForDisclaimer,useDisclaimerInstructions,isInterruptionsAllowed){
	var o,instructionContent,disclaimerContent;
	mockVar.usefuldataLanguages=[];
	if(typeof(sessionStorage.xmlFilePath) != "undefined")
		xmlFilePath = sessionStorage.xmlFilePath;
	var xml = readAndReturnXML(xmlFilePath+'/custInstructions.xml');
	$('#defaultLang').val($(xml).find('LANGID').text());
	o = new Option("-- Select --", "0");
	$(o).html("-- Select --");
	$("#defaultLanguage").append(o);
	if(mockVar.storeCandResponse==1){
		//var qpLang=document.cookie.split("qpLanguages=")[1].split(";")[0];
		var qpLang = $.cookie("qpLanguages");
		var qpLangList=qpLang.split(',');
		for(var i=0;i<qpLangList.length;i++){
			o = new Option(qpLangList[i].split("#")[0], qpLangList[i].split("#")[1]);
			$(o).html(qpLangList[i].split("#")[0]);
			$("#defaultLanguage").append(o);
		}
		if(qpLangList.length>1)
			$('#defaultLangOptions').show();
		else
			$('#defaultLangOptions').hide();
	}
	$(xml).find("INSTRUCTION").each(function(){
		var langName = $(this).find("LANGNAME").text();
		var langId = $(this).find("LANGID").text();
		mockVar.usefuldataLanguages[langId]=langName;
		o = new Option(langName, "cusInstText"+langId);
		$(o).html(langName);
		$('#iframeId').contents().find("#cusInst").append(o);
		o = new Option(langName, "sysInstText"+langId);
		$(o).html(langName);
		$('#iframeId').contents().find("#basInst").append(o);
		if(mockVar.storeCandResponse==0){
			o = new Option(langName, langId);
			$(o).html(langName);
			$("#defaultLanguage").append(o);
		}
		if($.trim($(this).find("INSTRUCTIONTEXT").text())=="" || $.trim($(this).find("INSTRUCTIONTEXT").text()) == null || $.trim($(this).find("INSTRUCTIONTEXT").text())== " "){
			instructionContent =  "The instructions are not available in the chosen language. ";
			/*if(typeof(mockVar.multiplePages)=='undefined'){
				mockVar.multiplePages = "NO";
			}*/
		}
		else{
			//mockVar.multiplePages = "YES";
			instructionContent = $.trim($(this).find("INSTRUCTIONTEXT").text());
		}
		if(page=='inst'){
			//var iframe = document.getElementById('iframeId');
			//var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
			$('#iframeId').contents().find("#secondPagep1").append("<div class='cusInstText"+langId+"' style='display:none;height:91%;width:100%;overflow:auto'>"+instructionContent+"</div>");
			$('#iframeId').contents().find("#firstPage").append("<div class='sysInstText"+langId+"' style='display:none;height:93%;width:100%;overflow:auto'>The instructions are not available in the chosen language.</div>");
			$(xmlForDisclaimer).find("INSTRUCTION").each(function(){
				if(langName.toUpperCase() == $(this).find("LANGNAME").text().toUpperCase()){
					if(mockVar.storeCandResponse==1){
						disclaimerContent = $.trim($(this).find("DISCLAIMERTEXTOA").text());
					}else{
						disclaimerContent = $.trim($(this).find("DISCLAIMERTEXT").text());
					}
					if(	disclaimerContent!==null && 	disclaimerContent!==""){
						if(useDisclaimerInstructions=="YES"){	
							$('#agreementMessageDef').append('<span style="width:90%:float:left;display:none;" class="cusInstText'+langId+'">'+disclaimerContent+'</span>');
							$('#agreementMessageDef').css("display","block");
							$('#agreementMessageCustom').hide();
						}else{
							$('#agreementMessageCustom').append('<span style="width:90%:float:left;display:none;" class="cusInstText'+langId+'">'+disclaimerContent+'</span>');
							$('#agreementMessageCustom').css("display","block");
							$('#agreementMessageDef').hide();
							$('#highlightDisclaimer').removeClass('highlightText');
						}
					}else{
						if(useDisclaimerInstructions=="YES"){
							disclaimerContent= "The instructions are not available in the chosen language. ";
							$('#agreementMessageDef').append('<span style="width:90%:float:left;display:none;" class="cusInstText'+langId+'">'+disclaimerContent+'</span>');
							$('#agreementMessageDef').css("display","block");
							$('#agreementMessageCustom').hide();
						}else{
							disclaimerContent= "The instructions are not available in the chosen language. ";
							$('#agreementMessageCustom').append('<span style="width:90%:float:left;display:none;" class="cusInstText'+langId+'">'+disclaimerContent+'</span>');
							$('#agreementMessageCustom').css("display","block");
							$('#agreementMessageDef').hide();
							$('#highlightDisclaimer').removeClass('highlightText');
						}
					}	
				}
			});
		}else{
			$('#iframeId').contents().find('#secondPagep1').append("<div class='cusInstText"+langId+"' style='display:none;'>"+instructionContent+"</div>");
			$('#iframeId').contents().find('#firstPage').append("<div class='sysInstText"+langId+"' style='display:none;'>The instructions are not available in the chosen language.</div>");
		}
		$(sysInstrXML).find("INSTRUCTION").each(function(){
			if(langName.toUpperCase() == $(this).find("LANGNAME").text().toUpperCase()){
				if($.trim($(this).find("INSTRUCTIONTEXT").text())=="" || $.trim($(this).find("INSTRUCTIONTEXT").text()) == null || 
						$.trim($(this).find("INSTRUCTIONTEXT").text())== " " || $.trim($(this).find("INSTRUCTIONTEXT").text())== "<br>" || $.trim($(this).find("INSTRUCTIONTEXT").text()) == "<br/>"){
					instructionContent =  "The instructions are not available in the chosen language. ";
				}else{
					instructionContent = $.trim($(this).find("INSTRUCTIONTEXT").text());
				}
				$('#iframeId').contents().find(".sysInstText"+langId).html(instructionContent);
				if(isMarkedForReviewConsidered == "YES"){
					$("iframe").contents().find('.review_answered').css({"background-position": "-6px -82px"});
					$("iframe").contents().find('.review_answered').css({"line-height": "34px"});
				}else{
					$("iframe").contents().find('.review_answered').css({"background-position": "-169px -47px"});
					$("iframe").contents().find('.review_answered').css({"line-height": "42px"});
				}
				if($.cookie("isMagnifyAllowed")!=undefined && $.cookie("isMagnifyAllowed") == "YES")
					$("iframe").contents().find('.imageZoom').show();
				else
					$("iframe").contents().find('.imageZoom').hide();
				if(useSystemInstructions=="YES"){
					if(langName.toUpperCase() == "ENGLISH"){
						if(isMarkedForReviewConsidered == "NO"){
							$(".considerMarkedReview").html("NOT");
						}else if(isMarkedForReviewConsidered == "YES"){
							$(".considerMarkedReview2").html("or marked for review");
						}
						if(isOptionalSectionsAvailable == "YES"){
							$('#iframeId').contents().find(".sysInstText"+langId).append($(sysInstrXML).find("OPTIONALTEXTENGLISH").text());
							$("iframe").contents().find(".optional").show();
						}
						if(isInterruptionsAllowed=="NO")
							$("iframe").contents().find(".interruptions").show();
						else
							$("iframe").contents().find(".interruptions").hide();
					}else if(langName.toUpperCase() == "HINDI"){
						if(isMarkedForReviewConsidered == "NO"){
							$(".considerMarkedReviewHindi").html("&#2344;&#2361;&#2368;&#2306;");
						}else if(isMarkedForReviewConsidered == "YES"){
							$(".considerMarkedReviewHindi2").html("&#2351;&#2366; &#2346;&#2369;&#2344;&#2352;&#2381;&#2357;&#2367;&#2330;&#2366;&#2352; &#2325;&#2375; &#2354;&#2367;&#2319; &#2330;&#2367;&#2344;&#2381;&#2361;&#2367;&#2340; &#2361;&#2376;");
						}
						if(isOptionalSectionsAvailable == "YES"){
							$('#iframeId').contents().find(".sysInstText"+langId).append($(sysInstrXML).find("OPTIONALTEXTHINDI").text());
							$(".optional").show();
						}
						if(isInterruptionsAllowed=="NO"){
							$("iframe").contents().find(".interruptions").show();
						}else{
							$("iframe").contents().find(".interruptions").hide();
						}
					}
				}
			}
		});	
	});
	if(mockVar.storeCandResponse==1){
		var totDuration = document.cookie.split("duration=")[1].split(";")[0];
		var quesCount = document.cookie.split("questionCount=")[1].split(";")[0];
		$('#iframeId').contents().find(".completeDuration").html(totDuration);
		$('#iframeId').contents().find(".totalNoOfQues").html(quesCount);

	}else{
		$('#iframeId').contents().find(".completeDuration").html($(QPxml).find('questionPaperXML').attr('questionPaperTotalTime'));
		calcTotalQues(orgId,mockId,QPxml);
		var additionalTools=$(QPxml).find('AdditionalTools').text();
		if(additionalTools.indexOf("MagnifyingGlass")>0)
			$("#iframeId").contents().find('.imageZoom').show();
		else
			$("#iframeId").contents().find('.imageZoom').hide();
	}
}
function changeSysInst(param,value,value2){
	$('#iframeId').contents().find('*[class^="'+value+'"]').hide();
	$('*[class^="'+value+'"]').hide();
	$('#iframeId').contents().find('.'+param).show();
	$('.'+param).show();
	var digits = param.replace(/\D/g, "");
	finalVal=value2.concat(digits);
	$('#iframeId').contents().find('*[class^="'+value2+'"]').hide();
	$('#iframeId').contents().find('.'+finalVal).show();
	if(value2=="cusInstText"){
		$('#iframeId').contents().find("#cusInst").val(finalVal);}
	else
		$('#iframeId').contents().find("#basInst").val(finalVal);
}
function validateExpiry(orgId,mockId){
	if(typeof(sessionStorage.xmlFilePath) != "undefined")
		xmlFilePath = sessionStorage.xmlFilePath;	
	var xml = readAndReturnXML(xmlFilePath+'/confDetails.xml');
	/*var curDate = new Date();
	var startDate;*/
	/*if($.trim($(xml).find("AssessmentStartDate").text())!==null && $.trim($(xml).find("AssessmentStartDate").text()) !== ""){
		 startDate = new Date(parseInt($.trim($(xml).find("AssessmentStartDate").text())));
		if(curDate <= startDate){
			window.location.href="error.html?E110";
		}
	}
	if($.trim($(xml).find("AssessmentEndDate").text())!==null && $.trim($(xml).find("AssessmentEndDate").text()) !== ""){
		 startDate = new Date(parseInt($.trim($(xml).find("AssessmentEndDate").text())));
		if(curDate >= startDate){
			window.location.href="error.html?E105";
		}
	}*/
	//Mock and assessment expriy checked at server side while launch
	if($(xml).find("ReportPublishDate").length>0 && $.trim($(xml).find("ReportPublishDate").text()) !== ""){
		resultPublishDate = parseInt($.trim($(xml).find("ReportPublishDate").text()));
	}
	return xml;
}

/** ****************index page **************************** */
function validateIndexPageURL(){
	var url = document.URL;
	var params = url.split("index.html?");
	var orgId = $.trim(params[1]).split("@@")[0];
	var mockId = $.trim(params[1]).split("@@")[1];
	if(params.length>1 ){
		if(mockId.indexOf("#")>-1){
			mockId = mockId.substring(0,mockId.indexOf("#"));
		}
		if($.trim(params[1]).length>0){
			var xml=validateExpiry(orgId,mockId);
			basicDetails(xml,false,"Index");
			$("#pWait").hide();
		}
	}else{
		window.location.href="error.html"+((document.cookie.indexOf('isApp=true')>= 0)?"isApp":"")+((document.cookie.indexOf('isLauncher=true')>= 0)?"isLauncher":"");
	}
}
function basicDetails(xml,isExtraJSRequired,page){
	var maxAllowedInterruptions,
	i,
	value;
	if(document.URL.indexOf("FeedBack")==-1 && document.URL.indexOf("close")==-1){
		if($(xml).find("Allowinterruptions").text()!=='' && $(xml).find("Allowinterruptions").text()=='NO'){
			maxAllowedInterruptions='';
			maxAllowedInterruptions=$(xml).find("NoOfInterruptions").text();
			MaxNoOfInterruption=parseInt(maxAllowedInterruptions);
			allowInterruptions='NO';
			remainingInterruptions=MaxNoOfInterruption-parseInt(noOfInterruptions+"");
		}else if($(xml).find("Allowinterruptions").text()==''){
			if($(xml).find("NoOfInterruptions").text()==''){
				MaxNoOfInterruption=50;
			}else{
				maxAllowedInterruptions='';
				maxAllowedInterruptions=$(xml).find("NoOfInterruptions").text();
				MaxNoOfInterruption=parseInt(maxAllowedInterruptions);
			}
			allowInterruptions='NO';
			remainingInterruptions=MaxNoOfInterruption-parseInt(noOfInterruptions+"");
		}else{
			MaxNoOfInterruption=9999;
			//remainingInterruptions=9999-parseInt(noOfInterruptions);
			remainingInterruptions=9999;
		}
	}
	
	if($(xml).find("ResultMarks").length>0 && $(xml).find("ResultMarks").text()!==''){
		if($(xml).find("ResultMarks").text()=='YES'){
			mockVar.resultMarks=1;
		}else{
			mockVar.resultMarks=0;
		}
	}else{
		mockVar.resultMarks=1;
	}
	if($(xml).find("ResultStatus").length>0 && $(xml).find("ResultStatus").text()!==''){
		if($(xml).find("ResultStatus").text()=='YES'){
			mockVar.resultStatus=1;
		}else{
			mockVar.resultStatus=0;
		}
	}else{
		mockVar.resultStatus=1;
	}
	if($(xml).find("ResultQuesLevelReport").length>0 && $(xml).find("ResultQuesLevelReport").text()!==''){
		if($(xml).find("ResultQuesLevelReport").text()=='YES'){
			mockVar.resultQuesLevelReport=1;
		}else{
			mockVar.resultQuesLevelReport=0;
		}
	}else{
		mockVar.resultQuesLevelReport=1;
	}
	if($(xml).find("ResultQuesLevelStatus").length>0 && $(xml).find("ResultQuesLevelStatus").text()!==''){
		if($(xml).find("ResultQuesLevelStatus").text()=='YES'){
			mockVar.resultQuesStatus=1;
		}else{
			mockVar.resultQuesStatus=0;
		}
	}else{
		mockVar.resultQuesStatus=1;
	}
	if($(xml).find("ShowHtmlScoreCard").length>0 && $(xml).find("ShowHtmlScoreCard").text()!==''){
		if($(xml).find("ShowHtmlScoreCard").text()=='YES'){
			mockVar.ShowHtmlScoreCard=1;
		}else{
			mockVar.ShowHtmlScoreCard=0;
		}
	}else{
		mockVar.ShowHtmlScoreCard=0;
	}
	if($(xml).find("LockedSubmit").length>0 && $(xml).find("LockedSubmit").text()!==''){
		if($(xml).find("LockedSubmit").text()=='YES'){
			mockVar.lockedSubmit=1;
		}else{
			mockVar.lockedSubmit=0;
		}
	}else{
		mockVar.lockedSubmit=1;
	}
	if($(xml).find("GraceTime").length>0 && $(xml).find("GraceTime").text()!==''){
		mockVar.remainingGraceTime=parseInt($(xml).find("GraceTime").text())*60;
		mockVar.graceTime=mockVar.remainingGraceTime;
	}
	if($(xml).find("submitAllCandidatesOnTime").length>0 && $(xml).find("submitAllCandidatesOnTime").text()!==''){
		if($(xml).find("submitAllCandidatesOnTime").text()=='YES'){
			mockVar.submitAllCandidatesOnTime=1;
		}else{
			mockVar.submitAllCandidatesOnTime=0;
		}
	}
	mockVar.candResponseUrl = $(xml).find("CandidateResponseHandlerURL").text();
	mockVar.mockName = $(xml).find("AssessmentName").text();
	$("#mockName").html(mockVar.mockName);
	if($(xml).find("LoginIDLabel").length>0 && $.trim($(xml).find("LoginIDLabel").text()).length>0){
		mockVar.loginLabel = $(xml).find("LoginIDLabel").text();
		isLoginIdConfigured=true;
	}else{
		mockVar.loginLabel = "Roll No";
	}
	//$("#loginName").prepend(mockVar.loginLabel);
	if($(xml).find('ShowViewQPButton').length>0 && $(xml).find('ShowViewQPButton').text() == 'NO'){
		showViewQPButton = false;
		$('.viewquestion_div').hide();
		$('#submitTD').removeAttr('width');		
		$('#submitTD').attr('colSpan','2');
	}else{
		$('.viewquestion_div').show();
		$('#submitTD').removeAttr('colspan');		
	}
	if($(xml).find('OptionOrientation').length>0 && $(xml).find('OptionOrientation').text() == 'Horizontal'){
		mockVar.showOptionsHorizontally = 1;
	}
	if(isExtraJSRequired && $(xml).find('ShowCalculator').length>0 && ($(xml).find('ShowCalculator').text().toUpperCase() == 'SCIENTIFIC')){
		$("#loadCalc").load("Calculator.html?v='"+jsVersion+"'", function() {
			jQuery("#scientificText").show();
			mockVar.showCalculator = $(xml).find('ShowCalculator').text().toUpperCase();
			$('.calculator-icon-container').show();
		});
	}
	else if(isExtraJSRequired && $(xml).find('ShowCalculator').length>0 && ($(xml).find('ShowCalculator').text().toUpperCase() == 'NORMAL')){
		$("#loadCalc").load("Calculator.html?v='"+jsVersion+"'", function() {
			jQuery("#normalText").show();
			mockVar.showCalculator = $(xml).find('ShowCalculator').text().toUpperCase();
			$('.calculator-icon-container').show();
		});
	}else
		mockVar.showCalculator=$(xml).find('ShowCalculator').text();
	if($(xml).find('ShowScoreCard').length>0 && $(xml).find('ShowScoreCard').text() == 'YES'){
		mockVar.displayScoreCard = 1;
	}
	if($(xml).find('ShowPercentageScore').length>0 && $(xml).find('ShowPercentageScore').text() == 'YES'){
		mockVar.displayPercentageScore = 1;
	}
	if($(xml).find('showOptionInViewQP').length>0 && $(xml).find('showOptionInViewQP').text() == 'YES'){
		mockVar.showOptionInViewQP = 1;
	}
	if($(xml).find('StoreCandResponse').length>0 && $(xml).find('StoreCandResponse').text() == 'YES'){
		mockVar.storeCandResponse = 1;
	}
	if($(xml).find("AssessmentName").length>0 && $(xml).find("AssessmentName").text()!==''){
		$('.test-header').html($(xml).find("AssessmentName").text());
	}
	if(mockVar.storeCandResponse==0){
		$(".loginName").html(mockVar.loginLabel);
		$(".mockLoginIdSpan").show();
	}else{
		$(".CandidateIdText").html("Candidate Id");
		$(".assessmentCandidateIdSpan").show();
	}
	if(mockVar.storeCandResponse==1){
		if(photographPath!='NA' || verifiedPhotoPath!='NA'){
			if(verifiedPhotoPath=='NA'){
				$(".candidateImg").attr("src", photographPath);
			}else if(photographPath=='NA'){
				$(".candidateImg").attr("src", verifiedPhotoPath);
			}else{
				$(".candidateImg").attr("src", photographPath);
				$(".verifiedImg").attr("src", verifiedPhotoPath);
				$(".singleImageDiv").hide();
				$(".verificationImagesDiv").show();
			}
		}else{
			$(".candidateImg").hide();
			$('.pic_box').hide();
		}
	}else{
		if($(xml).find("USEDEFAULTCANDIDATEIMG").length>0 && $(xml).find("USEDEFAULTCANDIDATEIMG").text() == "NO"){
			$(".candidateImg").attr("src",$(xml).find("CANDIDATEIMGPATH").text());
		}else{
			$(".candidateImg").attr("src","images/NewCandidateImage.jpg");
		}
	}
	if(mockVar.storeCandResponse==0){
		if($(xml).find("BannerPath").length>0 && $.trim($(xml).find("BannerPath").text()).length>0){
			$("#bannerImg").html("<img height= '49px' src='"+$(xml).find("BannerPath").text()+"'/>");
		}else{
			if(page=="Quiz")
				$("#header").height(0);
		}
		if($(xml).find("BannerText").length>0 && $.trim($(xml).find("BannerText").text()).length>0){
			$("#header").css('background-color', $(xml).find("BannerText").text());
		}
		if($(xml).find("USEDEFAULTCANDIDATEIMG").length>0 && $(xml).find("USEDEFAULTCANDIDATEIMG").text() == "NO"){
			$(".candidateImg").attr("src",$(xml).find("CANDIDATEIMGPATH").text());
		}else{
			$(".candidateImg").attr("src","images/NewCandidateImage.jpg");
		}
		if($(xml).find("CandidateName").length>0){
			mockVar.mockCandidateName = $(xml).find("CandidateName").text();
			$('.candOriginalName').attr('title',mockVar.mockCandidateName);
		}
		else{
			mockVar.mockCandidateName = "John Smith";
			$('.candOriginalName').attr('title',mockVar.mockCandidateName);
		}
	}
	else if(mockVar.storeCandResponse==1){
		if($(xml).find("ActualBannerPath").length>0 && $.trim($(xml).find("ActualBannerPath").text()).length>0){
			$("#bannerImg").html("<img height= '45px' src='"+$(xml).find("ActualBannerPath").text()+"'/>");
		}else{
			if(page=="Quiz")
				$("#header").height(0);
		}
		if($(xml).find("BannerBackGroundColour").length>0 && $.trim($(xml).find("BannerBackGroundColour").text()).length>0){
			$("#header").css('background-color', $(xml).find("BannerBackGroundColour").text());
		}
	} 
	if($(xml).find('ShowHint').length>0 && $(xml).find('ShowHint').text() == 'YES'){
		mockVar.ShowHint = 1;
	}
	if($(xml).find('ResponseSaveInterval').length>0 && $.trim($(xml).find('ResponseSaveInterval').text()).length>0){
		//mockVar.backupTimeInterval = $(xml).find('ResponseSaveInterval').text()*1000;
		mockVar.backupTimeInterval=30000;
	}
	$("#VersionNo").html("Version " +$(xml).find("Version").text());
	if($(xml).find('SoftwareLanguages').length>0 && $.trim($(xml).find('SoftwareLanguages').text()).length>0){
		for(i=0;i<$(xml).find('SoftwareLanguages').text().split(',').length;i++){
			value = $(xml).find('SoftwareLanguages').text().split(',')[i];
			$('#languageSelect').append($('<option>').text(value).attr('value',value));
			$('.langselect').append($('<span>').text(value).attr('value',value).addClass('mlanguageSelected'));
		}
		if($(xml).find('SoftwareLanguages').text().split(',').length>1){
			$('.multilingualDropdown').show();
		} /*else {
		selLang($(xml).find('SoftwareLanguages').text());
	}*/
	}else{
		$('#languageSelect').append($('<option>').text("English").attr('value',"English"));
		$('.langselect').append($('<span>').text("English").attr('value',"English").addClass('mlanguageSelected'));
	}
	if(isExtraJSRequired && $(xml).find('AdditionalTools').length>0 && $.trim($(xml).find('AdditionalTools').text()).length>0){
		//Added by Boddu Rakesh
		//document.write('<script type="text/javascript" src="js/jquery.ui.touch-punch.min.js?v='+jsVersion+'"\><\/script>');
		if($(window).width()<481) $('.picons_scroll').show();
		for(i=0;i<$(xml).find('AdditionalTools').text().split(',').length;i++){
			value = $(xml).find('AdditionalTools').text().split(',')[i];
			if(value=="textareaPad"){
				mockVar.textAreaPad=1;
				$('.textarea-icon-container').show();
				$('.clearTxt').html($(globalXmlvar).find('clear').text());
			}else if(value=="ScratchPad"){
				$.getScript("js/sketch.js?v='"+jsVersion+"'").done(function( script, textStatus ) {
					scratchPadiON();
					mockVar.ScratchPad=1;
					$('.scratchpad-icon-container').show();
				});
			}else if(value=="Ruler"){
				ionRuler();
				mockVar.ruler=1;
				$('.ruler-icon-container').show();
				if($(window).width()<768)
					$(".ruler-div img").attr('src','images/measure_10.png');
				else
					$(".ruler-div img").attr('src','images/measure_15.png');	
			}
			else if(value=="Protractor"){
				ionProtractor();
				mockVar.protractor=1;
				$('.protactor-icon-container').show();
			}else if(value=="Zoom"){
				mockVar.zoom=1;
				$('.zoomin-icon-container').show();
				$('.zoomout-icon-container').show();
			}
			else if(value=="MagnifyingGlass"){
				mockVar.MagnifyingGlass=1;
			} else if(value=="TextHighlighter"){
				mockVar.TextHighlighter=1;
				$('.selectmark_tool').css('display','inline-block');
				
			} else if(value=="WaterMark"){
				mockVar.WaterMark=1;
				
			}
		}
	}
}
/** ****************instrutions page************************************* */

function getCookie(isMockVarRequired){
	var i,x,y,defLang="",langName="",ARRcookies=document.cookie.split(";");	
	if(ARRcookies !== null && ARRcookies !== ""){
		for (i=0;i<ARRcookies.length;i++){
			x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
			y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
			x=x.replace(/^\s+|\s+$/g,"");
			if (x=="defaultLang"){
				defLang = y;
				if(defLang == "" && typeof(sessionStorage.defaultLang) != "undefined"){
					defLang = sessionStorage.defaultLang;
				}
			}else if (x=="viewLangName"){
				langName = y;
			}else if(x == "xmlFilePath"){
				xmlFilePath = y;
			}else if(x == "consoleVersion"){
				consoleVersion = y;
			}
			else if(isMockVarRequired && x == "systemParameters"){
				//mockVar.systemParameters = y;
				systemConfigurationParameters =$.cookie("systemParameters");
			}
		}
	}else{
		window.location.href="error.html?E103"+((document.cookie.indexOf('isApp=true')>= 0)?"isApp":"")+((document.cookie.indexOf('isLauncher=true')>= 0)?"isLauncher":"");
	}
	if(isMockVarRequired && ((defLang !== null && defLang !== "") || (langName !== null || langName !== ""))){		
		if(defLang == "" && typeof(sessionStorage.defaultLang) != "undefined"){
			defLang = sessionStorage.defaultLang;
		}
		mockVar.defaultLang = unescape(defLang);
		if(mockVar.langName !== null && mockVar.langName !== "")
			langName = mockVar.langName;
		mockVar.langName = (langName !== null && langName !== "")?unescape(langName):"English";
		if(mockVar.storeCandResponse === 0)
			mockVar.defaultLang = (defLang !== null && defLang !== "")?unescape(defLang):"1";
	}else if(isMockVarRequired){		
		window.location.href="error.html?E103"+((document.cookie.indexOf('isApp=true')>= 0)?"isApp":"")+((document.cookie.indexOf('isLauncher=true')>= 0)?"isLauncher":"");
	}
}
function validateQuizPageUrl(isExecutionRequired){
	var url = document.URL;
	var params;
	if(url.indexOf("quiz.html?") >=0)
		params = url.split("quiz.html?");
	else if(url.indexOf("quiz.html") >=0){
		params = [];
		params[0] = "";
		params[1] = (($.cookie("orgId"))+"@@"+($.cookie("assessmentId"))+"@@"+($.cookie("attemptId"))+"@@"+($.cookie("cand_master_id"))+"@@"+($.cookie("isResumed"))+"@@"+($.cookie("authenticationKey")));
	}
	var orgId = $.trim(params[1]).split("@@")[0];
	var mockId = $.trim(params[1]).split("@@")[1];
	var attemptId = $.trim(params[1]).split("@@")[2];
	if(mockId.indexOf("M") == -1){		
		authenticationKey = $.trim(params[1]).split("@@")[5];		
		if(typeof(authenticationKey)!='undefined' && authenticationKey.indexOf("#")>-1){		
			authenticationKey = authenticationKey.substring(0,authenticationKey.indexOf("#"));		
		}		
	}
	else{
		$('#pWait').hide();
	}
	//var isOnlineAssessment = false;
	var isResumed = 0;
	if(mockId.indexOf("M") == -1){
		//isOnlineAssessment = true;
		isResumed = $.trim(params[1]).split("@@")[4];
		if(isResumed.indexOf("#")>0)
			isResumed = isResumed.split("#")[0];
	}
	if(mockId !== null && mockId.length>0){
		if(typeof(attemptId)!='undefined' && attemptId.indexOf("#")>-1){
			attemptId = attemptId.substring(0,attemptId.indexOf("#"));
		}
		if(typeof(mockId)!='undefined' && mockId.indexOf("#")>-1){
			mockId = mockId.substring(0,mockId.indexOf("#"));
		}
		if(params.length>1 && $.trim(params[1]).length>0){
			var xml =validateExpiry(orgId,mockId);
			//var xml = readAndReturnXML(xmlFilePath+'/confDetails.xml');
			mockVar.orgId = orgId;
			mockVar.mockId = mockId;
			mockVar.attemptId = attemptId;
			if(iOAP.defaultLang==null || iOAP.defaultLang ==""){
				getCookie(true);
				getCandIdFromCookie();
			}
			basicDetails(xml,true,"Quiz");
			mockVar.isFeedBackRequired = $(xml).find("ShowFeedback").text();
			mockVar.useDefaultFeedback = $(xml).find("UseDefaultFeedback").text();
			//mockVar.showDefaultFeedBack = $(xml).find("UseDeafultFeedbackFormat").text();
			mockVar.showEmailId = $(xml).find("SHOWEMAILID").text();		
			mockVar.showContactNo = $(xml).find("SHOWCONTACTNO").text();
			if($(xml).find("SHOWEMAILID").text() == "YES"){
				var emailId = mockVar.mockCandidateName.replace(/\s+/g, '.');
				$("#emailId").html(""+emailId+"@gmail.com");
			}
			if($(xml).find("SHOWCONTACTNO").text() == "YES"){
				$("#contactNo").html("9999999999");
			}
			//Need to Change
			if(typeof(sessionStorage.xmlFilePath) != "undefined")
				xmlFilePath = sessionStorage.xmlFilePath;

			if(isExecutionRequired){
				if(mockVar.qpId!=="" && typeof(mockVar.qpId)!='undefined' && checkFileExist(xmlFilePath+mockVar.qpId+'/quiz.xml')){
					mockVar.availableQpId = mockVar.qpId;
				}else{ //Need to change
					if(mockVar.questionType!='QPT'){
						mockVar.availableQpId = '';
						QPxml = readAndReturnXML(xmlFilePath+'/quiz.xml');
					}else{
						window.location.href="error.html"+((document.cookie.indexOf('isApp=true')>= 0)?"isApp":"")+((document.cookie.indexOf('isLauncher=true')>= 0)?"isLauncher":"");
					}
				}
			}
			else{
				if(typeof(mockVar.qpId)!='undefined' &&  mockVar.qpId!="" ){
					mockVar.availableQpId = mockVar.qpId;
					/*if(checkFileExist(xmlFilePath+mockVar.qpId+'/quiz.xml'))
					QPxml = readAndReturnXML(xmlFilePath+'/quiz.xml');*/
				}
			}
			if(parseInt(isResumed) == 0)
				readSysInstructionsXMLQuizPage(QPxml,xml,orgId,mockId,isResumed);
			else {
				//if(isExecutionRequired)
				restoreFromBackup(QPxml,xml,orgId,mockId,isResumed);
				//else
				//readSysInstructionsXMLQuizPage(QPxml,xml,orgId,mockId,isResumed);
			}
		}
	}else{
		window.location.href="error.html"+((document.cookie.indexOf('isApp=true')>= 0)?"isApp":"")+((document.cookie.indexOf('isLauncher=true')>= 0)?"isLauncher":"");
	}
}

function restoreMockOnRefresh(){
	try{
		if(window.name!=="" && (JSON.parse(window.name)).mockId!="undefined"){
			mockVar = JSON.parse(window.name);
		}
	}catch(exc){

	}
}

function readSysInstructionsXMLQuizPage(QPxml,xml,orgId,mockId,isResumed){
	var useSystemInstructions = $(xml).find("UseDefaultSystemInstruction").text();
	var compMockTime=0;
	//var xml;
	if(isResumed == 0)
		compMockTime = $(QPxml).find("questionPaperXML").attr('questionPaperTotalTime');
	else 
		compMockTime = mockVar.completeTime;
	mockVar.completeTime = compMockTime;
	var counter =1;
	//var langId = 1;
	for(counter=1;counter<=27;counter++){
		$(xml).find("UsefulDataFile"+counter).each(function(){
			if($(this).text()!==null && $.trim($(this).text()) !== ""){
				mockVar.helpContent[counter] = $(this).text();
				mockVar.isHelpContentAvailable = true;
			}
		});
	}
	//mockVar.minSubmitTime = $(xml).find("COMPULSORYTIME").text();
	var isOptionalSectionsAvailable = $(xml).find("ISOPTIONALSECTIONSAVAILABLE").text();
	var isMarkedForReviewConsidered = $(xml).find("ConsiderMarkForReview").text();
	//isInterruptionsAllowed =  $(xml).find("Allowinterruptions").text();
	mockVar.isMarkedForReviewConsidered = isMarkedForReviewConsidered;
	if(parseInt(isResumed) == 0){
		if($(QPxml).find('ShowCalculator').length>0 && ($(QPxml).find('ShowCalculator').text().toUpperCase() == 'SCIENTIFIC')){
			$("#loadCalc").load("Calculator.html?v='"+jsVersion+"'", function() {
				jQuery("#scientificText").show();
				mockVar.showCalculator = $(QPxml).find('ShowCalculator').text().toUpperCase();
				$('.calculator-icon-container').show();
			});
		}
		else if($(QPxml).find('ShowCalculator').length>0 && ($(QPxml).find('ShowCalculator').text().toUpperCase() == 'NORMAL')){
			$("#loadCalc").load("Calculator.html?v='"+jsVersion+"'", function() {
				jQuery("#normalText").show();
				mockVar.showCalculator = $(QPxml).find('ShowCalculator').text().toUpperCase();
				$('.calculator-icon-container').show();
			});
		} else
			mockVar.showCalculator=$(QPxml).find('ShowCalculator').text();
	}else{
		if(mockVar.showCalculator!='' && mockVar.showCalculator=='SCIENTIFIC'){
			$("#loadCalc").load("Calculator.html?v='"+jsVersion+"'", function() {
				jQuery("#scientificText").show();
				$('.calculator-icon-container').show();
			});
		}else if(mockVar.showCalculator!='' && mockVar.showCalculator=='NORMAL'){
			$("#loadCalc").load("Calculator.html?v='"+jsVersion+"'", function() {
				jQuery("#normalText").show();
				$('.calculator-icon-container').show();
			});
		}
	}
	if($(xml).find('ShowScoreCard').length>0 && $(xml).find('ShowScoreCard').text() == 'YES'){
		mockVar.displayScoreCard = 1;
	}
	if(parseInt(isResumed) == 0){
		if($(QPxml).find('AdditionalTools').length>0 && $.trim($(QPxml).find('AdditionalTools').text()).length>0){
			//Added by Boddu Rakesh
			//document.write('<script type="text/javascript" src="js/jquery.ui.touch-punch.min.js?v='+jsVersion+'"\><\/script>');
			if($(window).width()<481) $('.picons_scroll').show();
			for(var i=0;i<$(QPxml).find('AdditionalTools').text().split(',').length;i++){
				var value = $(QPxml).find('AdditionalTools').text().split(',')[i];
				if(value=="textareaPad"){
					mockVar.textAreaPad=1;
					$('.textarea-icon-container').show();
					$('.clearTxt').html($(globalXmlvar).find('clear').text());
				}
				else if(value=="ScratchPad"){
					$.getScript("js/sketch.js?v='"+jsVersion+"'")
					.done(function( script, textStatus ) {
						scratchPadiON();
						mockVar.ScratchPad=1;
						$('.scratchpad-icon-container').show();
					});
				}
				else if(value=="Ruler"){
					ionRuler();
					mockVar.ruler=1;
					$('.ruler-icon-container').show();
					if($(window).width()<768)
						$(".ruler-div img").attr('src','images/measure_10.png');
					else
						$(".ruler-div img").attr('src','images/measure_15.png');	
				}
				else if(value=="Protractor"){
					ionProtractor();
					mockVar.protractor=1;
					$('.protactor-icon-container').show();
				} else if(value=="TextHighlighter"){
				mockVar.TextHighlighter=1;
				$('.selectmark_tool').css('display','inline-block');
				
				} else if(value=="WaterMark"){
				mockVar.WaterMark=1;
				
				}
				else if(value=="MagnifyingGlass"){
					mockVar.MagnifyingGlass=1;
				}else if(value=="Zoom"){
					mockVar.zoom=1;
					$('.zoomin-icon-container').show();
					$('.zoomout-icon-container').show();
				}
			}
		}
	}
	else{
		if($(window).width()<481) $('.picons_scroll').show();
		if(mockVar.textAreaPad==1){
			$('.textarea-icon-container').show();
			$('.clearTxt').html($(globalXmlvar).find('clear').text());
		}
		if(mockVar.ScratchPad==1){
			$.getScript("js/sketch.js?v='"+jsVersion+"'")
			.done(function( script, textStatus ) {
				scratchPadiON();
				$('.scratchpad-icon-container').show();
			});
		}
		if(mockVar.ruler==1){
			ionRuler();
			$('.ruler-icon-container').show();
			if($(window).width()<768)
				$(".ruler-div img").attr('src','images/measure_10.png');
			else
				$(".ruler-div img").attr('src','images/measure_15.png');	
		}
		if(mockVar.protractor==1){
			ionProtractor();
			$('.protactor-icon-container').show();
		}
		if(mockVar.TextHighlighter==1){
				$('.selectmark_tool').css('display','inline-block');
				
			}
		if(mockVar.zoom==1){
			$('.zoomin-icon-container').show();
			$('.zoomout-icon-container').show();
		}
	}
	if(mockVar.storeCandResponse==0){
		if($(xml).find("BannerPath").length>0 && $.trim($(xml).find("BannerPath").text()).length>0){
			$("#bannerImg").html("<img height= '49px' src='"+$(xml).find("BannerPath").text()+"'/>");
		}
		if($(xml).find("BannerText").length>0 && $.trim($(xml).find("BannerText").text()).length>0){
			$("#header").css('background-color', $(xml).find("BannerText").text());
		}
	}
	else if(mockVar.storeCandResponse==1){
		if($(xml).find("ActualBannerPath").length>0 && $.trim($(xml).find("ActualBannerPath").text()).length>0){
			$("#bannerImg").html("<img height= '45px' src='"+$(xml).find("ActualBannerPath").text()+"'/>");
		}
		if($(xml).find("BannerBackGroundColour").length>0 && $.trim($(xml).find("BannerBackGroundColour").text()).length>0){
			$("#header").css('background-color', $(xml).find("BannerBackGroundColour").text());
		}
	} 
	$("#footer").html("Version : " +consoleVersion+"</div>");
	quizXml = QPxml;
	confXml = xml;
	if(typeof(sessionStorage.xmlFilePath) != "undefined")
		xmlFilePath = sessionStorage.xmlFilePath;
	if(useSystemInstructions.toUpperCase()=="NO"){
		xml =readAndReturnXML(xmlFilePath+'/sysInstructions.xml');
		parseSysInstructions('quiz',xml,useSystemInstructions.toUpperCase(),orgId,mockId,isOptionalSectionsAvailable.toUpperCase(),isMarkedForReviewConsidered.toUpperCase(),QPxml,allowInterruptions);
	}else{
		xml =readAndReturnXML(xmlFilePath+'/sysInstructions.xml');
		$(xml).find("INSTRUCTION").each(function(){
			if($.trim($(this).find("INSTRUCTIONTEXT").text())=="")
				xml =readAndReturnXML('sysInstructions.xml');
		});
		//var xml = readAndReturnXML('sysInstructions.xml');

		parseSysInstructions('quiz',xml,useSystemInstructions.toUpperCase(),orgId,mockId,isOptionalSectionsAvailable.toUpperCase(),isMarkedForReviewConsidered.toUpperCase(),QPxml,allowInterruptions);
	}
	/*	if(isResumed == 0){
var iframe = document.getElementById('iframeId');
var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
	if(innerDoc.getElementById("basInst").options.length>1){
		$('#iframeId').contents().find('#basInst').parent().show();
		$('#iframeId').contents().find('#cusInst').parent().show();
	}

	if($('#iframeId').contents().find('#basInst option:selected').val().indexOf('sysInstText')>-1)
		langId = $('#iframeId').contents().find('#basInst option:selected').val().split('sysInstText')[1];
	$('#iframeId').contents().find('.sysInstText'+langId).show();
	$('#iframeId').contents().find('.cusInstText'+langId).show();
}*/
	readXMLQuestionPaper(QPxml,isResumed);
}


function renderQuestions(xml,selectorElement){
	var groupCounter = 0;
	mockVar.difficultyValues = [];
	var values =0;
	isGroupAllQuestions = false;
	var noOfTypingQues=0;
	if($(xml).find("difficultyLevelKey").length == 0){
		mockVar.difficultyLevelKey = "Difficulty Level";
	}else{
		mockVar.difficultyLevelKey = $(xml).find("difficultyLevelKey").text();
	}
	$(xml).find(selectorElement).each(function(){
		iOAP = new createNewGroupObj();
		getCurrentGrpSecQuestId(false,0);
		typingGrpObj = new typingObject();
		var secCounter = 0;
		noOfTypingQues=0;
		$(this).find("section").each(function(){
			var questionArrSection = [];
			quesCounter = 0;
			//Added by Boddu Rakesh
			sectionId = $(this).attr("id");
			var secName = $(this).find("sectionDisplayText").text();
			var answered = 0;
			var notanswered = 0;
			var marked = 0;
			var markedAndAnswered = 0;
			var difficultyLevel = [];
			var difficultyLabels = [];
			var count =0;
			var isOptional = $(this).attr("isOptional");
			if(isOptional == 'true'){
				iOAP.noOptSec++;
			}
			var secType = $(this).attr('sectionType')?$(this).attr('sectionType'):"";
			var displayNumberPanel = $(this).attr('displayNumberPanel')?$(this).attr('displayNumberPanel'):"true";
			var groupAllQuestions = $(this).attr('groupAllQuestions')?$(this).attr('groupAllQuestions'):"false";
			/*if(groupAllQuestions == "true")
				isGroupAllQuestions = true;*/
			var hasOptionalQuestion = $(this).attr('hasOptionalQuestions')?$(this).attr('hasOptionalQuestions'):"";

			if(secType.toUpperCase().indexOf("TYPING")!=-1){
				iOAP.isTypingGroup = true;
			} else if(secType.toUpperCase()=="OFFLINE"){
				iOAP.hasOfflineSect = true;
			}
			$(this).find('subsection').each(function(){
				questionArr = new Array();
				var compreQuestionIdArr = new Array();
				var compreQuestionArr = new Array();
				var compQuesCounter = -1;
				var questionShuffling = $(this).attr('questionShuffling') == 'true'?true:false;
				var previousComprehensionId = 0;
				var prevQuestionGroupAll = "false";
				noOfTypingQues=0;
				$(this).find("question").each(function(){
					if(noOfTypingQues==0){
						var comprehensionId = 0, laqId = 0, laqParentId = 0, langId = '';
						var keyboardType = '', typingType = '', answerType = '', isCaseSensitive = false, isEvaluationRequired = false, SARecordingTime='0',OverwritePreviousRecording=true;
						var questionGroupAll = "false";
						var optId = '', optText = '',sequenceId='', optKeyName = '', optKeyVal = '', inputValues = '', outputValues = '', paragraphDisplay = true , programmingSkeletalCode= '', alphaWordLimit='', allowedExtensions='', allowedSize='', allowedType = "", typingEvalMode = "Standard";
						var wordCountVisible = '' , singleLineResponse = '' , rows = '' , columns = '', showTypingDetails='', showErrorCount='', staticText='',keyboardLayout='',showBackspaceCount=false,allowBackspace=true,highlightCorrectIncorrectWord=true;
						var quesLangArr = new Array();
						var quesKeyPair = new Array();
						var options = new Array();
						var correctAnswer = new Array();
						var langBeanArr = new Array();
						var testCasePair = new Array();
						var quesLangBeans = new Array();
						var optIdArr = new Array();
						var allowedProgression = $(this).attr("allowedProgression") || "true";
						var isControlEnable = $(this).attr("isControlEnable") || "true";
						var noOfReplays = $(this).attr("numberOfReplays") || -1;
						var autoplay = $(this).attr("playOnLoad") || "false";
						var quesId = $(this).attr("id");
						var quesType = $(this).attr("type");
						var displayQuestionNo = $(this).attr("displayQuestionNo");
						var singleLineQuestionOption = $(this).attr("singleLineQuestionOption");
						var allottedMarks = eval($(this).attr("allottedMarks"));
						var negMarks = eval($(this).attr("negativeMarks"));
						var displayNegMarks = $(this).attr("displayNegativeMarks");
						var gapId = $(this).find('gapid').text();
						var flag;
						$(this).find('key').each(function(){
							keyName = $(this).attr('name');
							keyVal = $(this).attr('value');
							quesKeyPair.push(new quesKeyBean(keyName,keyVal));
							if(keyName == mockVar.difficultyLevelKey){
								if(keyVal!==null && !(keyVal.toUpperCase() == "")){
									if(difficultyLabels.length == 0){
										difficultyLabels[count++] = keyVal.toUpperCase();
										var obj = { key : keyVal.toUpperCase(),
												quesStatusCount : new quesStatusCount(0,0,0,0,0)};
										difficultyLevel.push(obj);
									}
									else{
										flag = 0;
										for(var val=0; val<difficultyLabels.length; val++){
											if(typeof(difficultyLabels[val])!='undefined'){
												if(difficultyLabels[val] == keyVal.toUpperCase()){
													flag++;
												}
											}
										}
										if(flag == 0){
											difficultyLabels[count++] = keyVal.toUpperCase();
											var obj = { key : keyVal.toUpperCase(),
													quesStatusCount : new quesStatusCount(0,0,0,0,0)};
											difficultyLevel.push(obj);
										}
									}
									if(mockVar.difficultyValues.length == 0){
										mockVar.difficultyValues[values++] = keyVal.toUpperCase();
									}
									else{
										flag = 0;
										for(var val=0; val<mockVar.difficultyValues.length; val++){
											if(typeof(mockVar.difficultyValues[val])!='undefined'){
												if(mockVar.difficultyValues[val] == keyVal.toUpperCase()){
													flag++;
												}
											}
										}
										if(flag == 0){
											mockVar.difficultyValues[values++] = keyVal.toUpperCase();
										}
									}
								}
							}
						});
						if($(this).attr('comprehension')=='true'){
							comprehensionId = $(this).find('comprehensionID').text();
							if(comprehensionId == previousComprehensionId){
								questionGroupAll = prevQuestionGroupAll;
							} else {
								$(mockVar.compreLaqQues).each(function(){
									if(this.quesId == comprehensionId){
										questionGroupAll = this.groupComprehensionLaqQuestions;
										prevQuestionGroupAll = questionGroupAll;
									}
								});
							}
							previousComprehensionId = comprehensionId;
						}
						if($(this).attr('laq')=='true'){
							laqId = $(this).find('laqID').text();
							laqParentId = $(this).find('laqParentID').text();
						}
						if(quesType == "MCQ" || quesType == "MSQ"){
							var languageCounter = 0;
							var sequenceArray;
							$(this).find('languageSpecificData').find('lang').each(function(){
								var optCounter = 0;
								var oldFileCounter = 0;
								//var tempImageTag;
								//var tempImageName;
								sequenceArray = new Array();
								var optLangBeans = new Array();
								langId = $(this).attr('id');
								quesText = $(this).find('questionString').text();
								//console.log(quesText);
								var newQuesText = makQuesAudVidDiv(quesText,oldFileCounter,quesId);
								//console.log(newQuesText[0]);
								//console.log(newQuesText[1]);
								quesText = newQuesText[0];
								oldFileCounter = newQuesText[1];
								errorRectification = $(this).find('errorRectification').text();
								var tempError = makeMediaDiv(errorRectification);
								errorRectification = editAudioVideoImageFilePath(tempError);
								hint = $(this).find('hint').text()!="NA"?$(this).find('hint').text():"";
								if(hint=="" || hint=="NA")
									showHintDiv=showHintDiv || false;
								else 
									showHintDiv= showHintDiv || true;
								var newHint = makeMediaDiv(hint);
								hint =newHint;
								hint = editAudioVideoImageFilePath(hint);
								$(this).find('allOptions').find('option').each(function(){
									var optKeyPair = new Array();
									optId = $(this).attr('optionID');
									optText = $(this).find('optionText').text();
									sequenceId = $(this).attr('sequenceID');
									$(this).find('optionKey').each(function(){
										optKeyName = $(this).attr('name');
										optKeyVal = $(this).text();
										optKeyPair.push(new optKeyBean(optKeyName, optKeyVal));
									});
									if($(this).attr('correct')=='true' && $.inArray(optId, correctAnswer)==-1){
										correctAnswer.push(optId);
									}
									if(optLangBeans[optCounter]==null){
										optLangBeans[optCounter] = new Array();
									}
									optText = optText.replace(/'/g,"\"");
									if(optText.indexOf("tkcimages/")!=-1){
										/*tempImageTag = optText.split("tkcimages/");
									tempImageName=tempImageTag[1].split(".")[0];
									tempImageName=tempImageName.replace(/\s/g, "_");
									optText=tempImageTag[0]+"tkcimages/"+tempImageName+"."+tempImageTag[1].split(".")[1];*/
										tempImageTag = optText.split("tkcimages/");
										for(var k=1;k<tempImageTag.length;k++){
											//var temporaryImageName = "";
											//temporaryImageName = tempImageTag[k];
											tempImageName=tempImageTag[k].split(".")[0];
											var temporaryFileName = tempImageTag[k].split(".")[0];
											tempImageName=tempImageName.replace(/\s/g, '_');
											var temporaryFileExtension = tempImageTag[k].split(".")[1].split("\"")[0];
											if(temporaryFileExtension.indexOf('>')!= -1){
												temporaryFileExtension = tempImageTag[k].split(".")[1].split("'")[0]; 
											}
											temporaryFileName = temporaryFileName+"."+temporaryFileExtension;
											tempImageName = tempImageName+"."+temporaryFileExtension;
											optText = optText.replace(temporaryFileName,tempImageName);
											if(temporaryFileExtension == "mp4"){
												optText = optText + "<div class='jwAudioVideo multiMediaOption' id='jwVideo_"+quesId+"_"+oldFileCounter+"' title='tkcimages/"+tempImageName+"'></div>";
												oldFileCounter++ ;
											}else if(temporaryFileExtension == "mp3"){
												optText = optText + "<div class='jwAudioVideo multiMediaOption' id='jwAudio_"+quesId+"_"+oldFileCounter+"' title='tkcimages/"+tempImageName+"'></div>";
												oldFileCounter++ ;
											}
										}
									}
									if(optText.indexOf("<audio>")!=-1){
										var newAudioFile = new Array();
										newAudioFile = optText.match(/(<audio>.+?<audio>)/g);
										for(var i=0;i<newAudioFile.length;i++){
											while (optText.indexOf(newAudioFile[i])!=-1) {
												optText = optText.replace(newAudioFile[i],"<div class='jwAudioVideo multiMediaOption' id='jwAudio_"+quesId+"_"+oldFileCounter+"' title='tkcimages/"+newAudioFile[i].split("<audio>")[1]+"'></div>");
												oldFileCounter++ ;
											}
										}
									}
									if(optText.indexOf("<video>")!=-1){
										var newVideoFile = new Array();
										newVideoFile = optText.match(/(<video>.+?<video>)/g);
										for(var i=0;i<newVideoFile.length;i++){
											while (optText.indexOf(newVideoFile[i])!=-1) {
												optText = optText.replace(newVideoFile[i],"<div class='jwAudioVideo multiMediaOption' id='jwVideo_"+quesId+"_"+oldFileCounter+"' title='tkcimages/"+newVideoFile[i].split("<video>")[1]+"'></div>");
												oldFileCounter++ ;
											}
										}
									}
									if(mockVar.MagnifyingGlass == 1){
										if(optText.indexOf('<img') != -1) {
											var newImageFile = new Array();
											optText = optText.replace(/'/g,'"');
											newImageFile = optText.match(/(<img.+?src="(.+?)".+?>)/g);
											for (var i = 0; i < newImageFile.length; i++) {
												while (optText.indexOf(newImageFile[i]) != -1) {
													var imageName = newImageFile[i].split('src=')[1].split('/>');
													optText = optText.replace(newImageFile[i], "<span class='ans'><a class='imageZoom' href="+imageName[0]+"><img class='imageZoom' style='max-width:300px;max-height:300px' src="+imageName[0]+"/></a></span>");
													oldFileCounter++;
												}
											}
										}	
									}else{
										if(optText.indexOf('<img') != -1) {
											var newImageFile = new Array();
											optText = optText.replace(/'/g,'"');
											newImageFile = optText.match(/(<img.+?src="(.+?)".+?>)/g);
											for (var i = 0; i < newImageFile.length; i++) {
												while (optText.indexOf(newImageFile[i]) != -1) {
													var imageName = newImageFile[i].split('src=')[1].split('/>');
													optText = optText.replace(newImageFile[i], "<span class='ans'><span class='zoomimage' ><a title='Click the Image to Zoom' target='_blank'><img src="+imageName[0]+" class='max_img_ico' title='Click the Image to Zoom'></a></span></span>");
													oldFileCounter++;
												}
											}
										}
									
									
									}
									optText = editAudioVideoImageFilePath(optText);
									optLangBeans[optCounter] = new optLangBean(langId, optText);
									if($.inArray(optId, optIdArr)==-1){
										optIdArr.push(optId);
										options.push(new optionBean(optId, optKeyPair));
									}
									options[optCounter].optLangBean[languageCounter] = optLangBeans[optCounter];
									sequenceArray.push(new sequenceBean(sequenceId, options[optCounter]));
									optCounter++;
								});
								quesText = editAudioVideoImageFilePath(quesText);
								quesLangBeans.push(new quesLangBean(langId, quesText,hint,errorRectification));

								languageCounter++;
							});
							sequenceArray=sequenceArray.sortBy('seqId');
							options=new Array();
							for(var i=0;i<sequenceArray.length;i++){
								options[i]=sequenceArray[i].optBean;
							}
							if($(this).find('optionShuffling').attr('value')=='true'){
								shuffleArray(options);
							}
						} else if(quesType.indexOf("SA")>-1){
							var oldFileCounter = 0;
							//var tempImageTag;
							//var tempImageName;
							keyboardType = $(this).find('keyboardNumericOrAlphaNumeric').text();
							answerType = $(this).find('possibleAnswer').attr('type');
							isCaseSensitive = $(this).find('possibleAnswer').attr('isCaseSensitive')=='true'?true:false;
							isEvaluationRequired = $(this).find('isEvaluationRequired').attr('value')=='true'?true:false;
							wordCountVisible = $(this).find('wordCountVisible').attr('wordCountVisible')|| "false";
							singleLineResponse = $(this).find('singleLineResponce').attr('singleLineResponce')|| "false";
							rows = $(this).find('rows').attr('rows')>0?$(this).find('rows').attr('rows'):10 || 10;
							columns = $(this).find('columns').attr('columns')>0?$(this).find('columns').attr('columns'):100|| 100;
							alphaWordLimit=$(this).find('alphaWordLimit').attr('alphaWordLimit');
							allowedExtensions=$(this).find('allowedExtensions').attr('allowedExtensions');
							allowedSize=$(this).find('allowedSize').attr('allowedSize');
							allowedType=$(this).find('allowedType').attr('allowedType');
							SARecordingTime=$(this).find('SARecordingTime').attr('SARecordingTime') || '0';
							OverwritePreviousRecording = $(this).find('OverwritePreviousRecording').attr('OverwritePreviousRecording')=='false'?false:true;
							$(this).find('languageSpecificData').find('lang').each(function(){
								langId = $(this).attr('id');
								quesText = $(this).find('questionString').text();
								var newQuesText = makQuesAudVidDiv(quesText,oldFileCounter,quesId);
								quesText = newQuesText[0];
								oldFileCounter = newQuesText[1];
								hint = $(this).find('hint').text()!="NA"?$(this).find('hint').text():"";
								if(hint=="" || hint=="NA")
									showHintDiv=showHintDiv || false;
								else 
									showHintDiv= showHintDiv || true;
								var newHint = makeMediaDiv(hint);
								hint =newHint;
								hint = editAudioVideoImageFilePath(hint);
								errorRectification = $(this).find('errorRectification').text();
								var tempError = makeMediaDiv(errorRectification);
								errorRectification = editAudioVideoImageFilePath(tempError);
								correctAnswer.push($(this).find('answerString').text());
								quesText = editAudioVideoImageFilePath(quesText);
								quesLangBeans.push(new quesLangBean(langId, quesText,hint,errorRectification));
							});
						} 
						else if(quesType == 'TYPING TEST'){
							var oldFileCounter = 0;
							noOfTypingQues++;
							typingType = $(this).find('typingTestParameter').attr('type');
							if($(this).find('typingTestParameter').attr('paragraphDisplay')=='false'){
								paragraphDisplay = false;
							}
							if($(this).find('typingTestParameter').attr('evaluationMode')=='NonStandard'){
								typingEvalMode = "NonStandard";
							}
							showTypingDetails = $(this).find('typingTestParameter').attr('showTypingDetailsPanel') || "true";
							showErrorCount = $(this).find('typingTestParameter').attr('showErrorCount') || "true";
							allowBackspace = $(this).find('typingTestParameter').attr('allowBackspace') || "true";
							showBackspaceCount = $(this).find('typingTestParameter').attr('showBackspaceCount') || "false";
							highlightCorrectIncorrectWord = $(this).find('typingTestParameter').attr('highlightCorrectIncorrectWord') || "true";
							staticText=$(this).find('staticText').text();
							var staticTextNew = makQuesAudVidDiv(staticText,oldFileCounter,quesId);
							staticText = staticTextNew[0];
							oldFileCounter = staticTextNew[1];
							staticText = editAudioVideoImageFilePath(staticText);

							keyboardLayout = $(this).find('typingTestParameter').attr('keyboardLayout') || "false";
							$(this).find('languageSpecificData').find('lang').each(function(){
								langId = $(this).attr('id');
								quesText = $(this).find('questionString').text();
								hint = $(this).find('hint').text()!="NA"?$(this).find('hint').text():"";
								if(hint=="" || hint=="NA")
									showHintDiv=showHintDiv || false;
								else 
									showHintDiv= showHintDiv || true;
								var newHint = makeMediaDiv(hint);
								hint =newHint;
								hint = editAudioVideoImageFilePath(hint);
								errorRectification = $(this).find('errorRectification').text();
								var tempError = makeMediaDiv(errorRectification);
								errorRectification = editAudioVideoImageFilePath(tempError);

								quesText = editAudioVideoImageFilePath(quesText);
								quesLangBeans.push(new quesLangBean(langId, quesText,hint,errorRectification));
							});

						} else if(quesType == 'SUBJECTIVE'){
							$(this).find('languageSpecificData').find('lang').each(function(){
								langId = $(this).attr('id');
								quesText = $(this).find('questionString').text();
								var oldFileCounter = 0;
								var newQuesText = makQuesAudVidDiv(quesText,oldFileCounter,quesId);
								quesText = newQuesText[0];
								oldFileCounter = newQuesText[1];
								hint = $(this).find('hint').text()!="NA"?$(this).find('hint').text():"";
								if(hint=="" || hint=="NA")
									showHintDiv=showHintDiv || false;
								else 
									showHintDiv= showHintDiv || true;
								var newHint = makeMediaDiv(hint);
								hint =newHint;
								hint = editAudioVideoImageFilePath(hint);
								quesText = editAudioVideoImageFilePath(quesText);
								errorRectification = $(this).find('errorRectification').text();
								var tempError = makeMediaDiv(errorRectification);
								errorRectification = editAudioVideoImageFilePath(tempError);
								quesLangBeans.push(new quesLangBean(langId, quesText,hint,errorRectification));
							});
						} else if(quesType == 'PROGRAMMING TEST'){
							programmingSkeletalCode = $(this).find('skeletalCode').text();
							$(this).find('languageSpecificData').find('lang').each(function(){
								langId = $(this).attr('id');
								quesText = $(this).find('questionString').text();
								var oldFileCounter = 0;
								var newQuesText = makQuesAudVidDiv(quesText,oldFileCounter,quesId);
								quesText = newQuesText[0];
								oldFileCounter = newQuesText[1];
								hint = $(this).find('hint').text()!="NA"?$(this).find('hint').text():"";
								if(hint=="" || hint=="NA")
									showHintDiv=showHintDiv || false;
								else 
									showHintDiv= showHintDiv || true;
								var newHint = makeMediaDiv(hint);
								hint =newHint;
								hint = editAudioVideoImageFilePath(hint);
								$(this).find('testCases').find('testCase').each(function(){
									inputValues = $(this).find('inputValues').text();
									outputValues = $(this).find('outputValues').text();
									testCasePair.push(inputValues, outputValues);
								});
								quesText = editAudioVideoImageFilePath(quesText);
								errorRectification = $(this).find('errorRectification').text();
								var tempError = makeMediaDiv(errorRectification);
								errorRectification = editAudioVideoImageFilePath(tempError);
								quesLangBeans.push(new quesLangBean(langId, quesText,hint,errorRectification));
							});
						}
						quesParam =  new quesParams(iOAP.defaultLang,'notAttempted',programmingSkeletalCode,'');
						if(/*questionShuffling && (*/comprehensionId!=0 || laqId!=0/*)*/){
							if(comprehensionId!=0){
								if($.inArray(comprehensionId, compreQuestionIdArr)==-1){
									compQuesCounter++;
									questionArr.push(new questions(comprehensionId));
									compreQuestionIdArr.push(comprehensionId);
									compreQuestionArr[compQuesCounter] = new Array();
									compreQuestionArr[compQuesCounter].compreId = comprehensionId;
									compreQuestionArr[compQuesCounter].quesBean = new Array();
								}
								compreQuestionArr[compQuesCounter].quesBean.push(new questions(quesId, quesType, comprehensionId, laqId, laqParentId, correctAnswer, allottedMarks, negMarks, quesKeyPair, keyboardType, typingType, answerType, isCaseSensitive, isEvaluationRequired, quesParam, quesLangBeans, options, hint, testCasePair , paragraphDisplay, programmingSkeletalCode, alphaWordLimit,mockVar.storeCandResponse,displayQuestionNo,singleLineQuestionOption,allowedExtensions,allowedSize,allowedType,typingEvalMode,allowedProgression,noOfReplays,isControlEnable,autoplay,wordCountVisible,singleLineResponse,rows,columns,gapId,showTypingDetails,showErrorCount,staticText,keyboardLayout,questionGroupAll,allowBackspace,showBackspaceCount,highlightCorrectIncorrectWord,displayNegMarks,SARecordingTime,OverwritePreviousRecording));
							}else if(laqId!=0){
								if($.inArray(laqId, compreQuestionIdArr)==-1){
									compQuesCounter++;
									questionArr.push(new questions(laqId));
									compreQuestionIdArr.push(laqId);
									compreQuestionArr[compQuesCounter] = new Array();
									compreQuestionArr[compQuesCounter].compreId = laqId;
									compreQuestionArr[compQuesCounter].quesBean = new Array();
								}
								compreQuestionArr[compQuesCounter].quesBean.push(new questions(quesId, quesType, comprehensionId, laqId, laqParentId, correctAnswer, allottedMarks, negMarks, quesKeyPair, keyboardType, typingType, answerType, isCaseSensitive, isEvaluationRequired, quesParam, quesLangBeans, options, hint, testCasePair,paragraphDisplay, programmingSkeletalCode, alphaWordLimit,mockVar.storeCandResponse,displayQuestionNo,singleLineQuestionOption,allowedExtensions,allowedSize,allowedType,typingEvalMode,allowedProgression,noOfReplays,isControlEnable,autoplay,wordCountVisible,singleLineResponse,rows,columns,gapId,showTypingDetails,showErrorCount,staticText,keyboardLayout,questionGroupAll,allowBackspace,showBackspaceCount,highlightCorrectIncorrectWord,displayNegMarks,SARecordingTime,OverwritePreviousRecording));
							}
						}else{
							questionArr.push(new questions(quesId, quesType, comprehensionId, laqId, laqParentId, correctAnswer, allottedMarks, negMarks, quesKeyPair, keyboardType, typingType, answerType, isCaseSensitive, isEvaluationRequired, quesParam, quesLangBeans, options, hint, testCasePair,paragraphDisplay, programmingSkeletalCode, alphaWordLimit,mockVar.storeCandResponse,displayQuestionNo,singleLineQuestionOption,allowedExtensions,allowedSize,allowedType,typingEvalMode,allowedProgression,noOfReplays,isControlEnable,autoplay,wordCountVisible,singleLineResponse,rows,columns,gapId,showTypingDetails,showErrorCount,staticText,keyboardLayout,questionGroupAll,allowBackspace,showBackspaceCount,highlightCorrectIncorrectWord,displayNegMarks,SARecordingTime,OverwritePreviousRecording));
						}

					}
				});
				if(questionShuffling){
					shuffleArray(questionArr);
				}
					for(var i=0; i<compreQuestionArr.length; i++){
						compreId = compreQuestionArr[i].compreId;
						quesBean = compreQuestionArr[i].quesBean;
						var compreIdForShuffling=mockVar.compreLaqQues.inArray(compreId,'quesId');
						if(parseInt(compreIdForShuffling)!=-1){
							if(mockVar.compreLaqQues[parseInt(compreIdForShuffling)].subquestionShuffling=='true')
							shuffleArray(quesBean);	
						}
						compreQuesIndex = questionArr.inArray(compreId,'quesId');
						//remove the comprehension quesId from quesArr and add the quesBean to it
						questionArr.splice.apply(questionArr,[compreQuesIndex,1].concat(quesBean));
					}
				
				//merging questions of different subsections
				questionArrSection = questionArrSection.concat(questionArr);
			});
			iOAP.secDetails[secCounter] = new secBean(secName,answered,notanswered,marked,markedAndAnswered,isOptional,secType,questionArrSection, hasOptionalQuestion,sectionId,difficultyLevel,difficultyLabels,displayNumberPanel,groupAllQuestions);
			if($(this).attr("maxQuestionsToBeAttempted")!=null || $(this).attr("maxQuestionsToBeAttempted") != ""){
				iOAP.secDetails[secCounter].maxOptQuesToAns = parseInt($(this).attr("maxQuestionsToBeAttempted"));
			}
			secCounter++;
		});
		mockVar.groups[groupCounter] = iOAP;
		mockVar.typingGroup[groupCounter] = typingGrpObj;
		groupCounter++;
	});
}

function readXMLQuestionPaper(xml,isResumed){
	iOAP.maxNoOptSec = $(xml).find("MAXNOOPTSEC").text();
	if(parseInt(isResumed) == 0){
		mockVar.time = mockVar.time*60;
		var isShowMarks = $(xml).find("questionPaperXML").attr('displayMarks');
		mockVar.showMarks = (isShowMarks=="false")?false:true;
		mockVar.mcQName = $.trim($(xml).find("mcqLabel").text());
		mockVar.msQName = $.trim($(xml).find("msqLabel").text());
		mockVar.compQName = $.trim($(xml).find("comprehensionLabel").text());
		mockVar.laQName = $.trim($(xml).find("laqLabel").text());
		mockVar.subjQName = $.trim($(xml).find("subjectiveLabel").text());
		mockVar.saQName = $.trim($(xml).find("saLabel").text());
		mockVar.typingQName = $.trim($(xml).find("typingTestLabel").text());
		mockVar.programingQName = $.trim($(xml).find("programmingTestLabel").text());
		mockVar.fillBlankQName = $.trim($(xml).find("fitbLabel").text());
		mockVar.fillSeqQName = $.trim($(xml).find("sequenceLabel").text());
		mockVar.fillGrpQName = $.trim($(xml).find("groupLabel").text());
		mockVar.fillMatchColQName = $.trim($(xml).find("mtcLabel").text());
		$(xml).find('language').each(function(){
			mockVar.langCount++;
			langCounter = $(this).attr("id");
			mockVar.languages[langCounter] = $(this).attr("name");
		});
		var compreId = '',laqId = '',langId = '',quesText = '',hint='',groupComprehensionQuestions='',groupLAQQuestions='';
		var allowedProgression = '',noOfReplays='',isControlEnable='',autoplay='',additionalQuesType='',columnType='', subquestionShuffling='';
		$(xml).find('comprehensions').find('comprehension').each(function(){
			compreId = $(this).attr('id');
			var jwPlayerDetailsArray = new Object();
			var jwPlayerDetailsArrayIndex = new Object();
			var tempCountIndex = 0;
			groupComprehensionQuestions = $(this).attr('groupComprehensionQuestions');
			langBeanArr = new Array();
			jwAudioVideo = new Array();
			allowedProgression = $(this).attr('allowedProgression') || "true";
			noOfReplays = $(this).attr('numberOfReplays') || -1;
			autoplay = $(this).attr('playOnLoad') || "false";
			isControlEnable = $(this).attr('isControlEnable') || "true";
			additionalQuesType = $(this).attr('additionalQuesType');
			columnType = $(this).attr('columnType');
			//Added by sai for Shuffling for child questions of Comprehension and LAQ
			if(typeof(additionalQuesType)!='undefined' && additionalQuesType!=null && additionalQuesType!='')
				{
				if(additionalQuesType.toLowerCase()=='fitb')
				subquestionShuffling="false";
				else
					subquestionShuffling=$(this).attr('subquestionShuffling');
				}
			else
				subquestionShuffling=$(this).attr('subquestionShuffling') || "false";
					
			
			$(this).find('lang').each(function(){
				var oldFileCounter = 0;
				langId = $(this).attr('id');
				quesText = $(this).text();
				//quesText = quesText.replace("'","\"");
				if(quesText.indexOf("tkcimages/")!=-1){
					tempImageTag = quesText.split("tkcimages/");
					for(var k=1;k<tempImageTag.length;k++){
						//var temporaryImageName = "";
						//temporaryImageName = tempImageTag[k];
						tempImageName=tempImageTag[k].split(".")[0];
						var temporaryFileName = tempImageTag[k].split(".")[0];
						tempImageName=tempImageName.replace(/\s/g, '_');
						var temporaryFileExtension = tempImageTag[k].split(".")[1].split("\"")[0];
						if(temporaryFileExtension.indexOf('>')!= -1){
							temporaryFileExtension = tempImageTag[k].split(".")[1].split("'")[0]; 
						}
						temporaryFileName = temporaryFileName+"."+temporaryFileExtension;
						tempImageName = tempImageName+"."+temporaryFileExtension;
						quesText = quesText.replace(temporaryFileName,tempImageName);
						if(temporaryFileExtension == "mp4"){
							//Rakesh
							quesText = quesText + "<div class='jwAudioVideo' id='jwVideo_"+compreId+"_Claq_"+oldFileCounter+"' title='tkcimages/"+tempImageName+"'></div>";

							jwPlayerDetailsArray["jwVideo_" + compreId + "_Claq_" + oldFileCounter] = "<div class='jwAudioVideo' id='jwVideo_" + compreId + "_Claq_" + oldFileCounter + "' title='tkcimages/" + tempImageName + "'></div>";
							jwPlayerDetailsArrayIndex[tempCountIndex] = "jwVideo_" + compreId + "_Claq_" + oldFileCounter;
							tempCountIndex++;

							oldFileCounter++ ;
						}else if(temporaryFileExtension == "mp3"){
							//Rakesh
							quesText = quesText + "<div class='jwAudioVideo' id='jwAudio_"+compreId+"_Claq_"+oldFileCounter+"' title='tkcimages/"+tempImageName+"'></div>";
							jwPlayerDetailsArray["jwAudio_" + compreId + "_Claq_" + oldFileCounter] = "<div class='jwAudioVideo' id='jwAudio_" + compreId + "_Claq_" + oldFileCounter + "' title='tkcimages/" + tempImageName + "'></div>";
							jwPlayerDetailsArrayIndex[tempCountIndex] = "jwAudio_" + compreId + "_Claq_" + oldFileCounter;
							tempCountIndex++;
							oldFileCounter++ ;
						};
						//quesText=tempImageTag[0]+"tkcimages/"+tempImageName+temporaryImageName.substring(temporaryImageName.indexOf("."));
					};
				}
				if(quesText.indexOf("<audio>")!=-1){
					var newAudioFile = new Array();
					newAudioFile = quesText.match(/(<audio>.+?<audio>)/g);
					for(var i=0;i<newAudioFile.length;i++){
						while (quesText.indexOf(newAudioFile[i])!=-1) {
							quesText = quesText.replace(newAudioFile[i],"<div class='jwAudioVideo' id='jwAudio_"+compreId+"_Claq_"+oldFileCounter+"' title='tkcimages/"+newAudioFile[i].split("<audio>")[1]+"'></div>");
							jwPlayerDetailsArray["jwAudio_" + compreId + "_Claq_" + oldFileCounter] = "<div class='jwAudioVideo' id='jwAudio_" + compreId + "_Claq_" + oldFileCounter + "' title='tkcimages/" + newAudioFile[i].split("<audio>")[1] + "'></div>";
							jwPlayerDetailsArrayIndex[tempCountIndex] = "jwAudio_" + compreId + "_Claq_" + oldFileCounter;
							tempCountIndex++;
							oldFileCounter++ ;

						}
					}
				}
				if(quesText.indexOf("<video>")!=-1){
					var newVideoFile = new Array();
					newVideoFile = quesText.match(/(<video>.+?<video>)/g);
					for(var i=0;i<newVideoFile.length;i++){
						while (quesText.indexOf(newVideoFile[i])!=-1) {
							quesText = quesText.replace(newVideoFile[i],"<div class='jwAudioVideo' id='jwVideo_"+compreId+"_Claq_"+oldFileCounter+"' title='tkcimages/"+newVideoFile[i].split("<video>")[1]+"'></div>");
							jwPlayerDetailsArray["jwVideo_" + compreId + "_Claq_" + oldFileCounter] = "<div class='jwAudioVideo' id='jwVideo_" + compreId + "_Claq_" + oldFileCounter + "' title='tkcimages/" + newVideoFile[i].split("<video>")[1] + "'></div>";
							jwPlayerDetailsArrayIndex[tempCountIndex] = "jwVideo_" + compreId + "_Claq_" + oldFileCounter;
							tempCountIndex++;
							oldFileCounter++ ;
						}
					}
				}
				if(mockVar.MagnifyingGlass == 1){
					if(quesText.indexOf('<img') != -1) {
						var newImageFile = new Array();	
						quesText = quesText.replace(/'/g,'"');
						newImageFile = quesText.match(/(<img.+?src="(.+?)".+?>)/g);

						for (var i = 0; i < newImageFile.length; i++) {
							while (quesText.indexOf(newImageFile[i]) != -1) {
								var imageName = newImageFile[i].split('src=')[1].split('/>');
								//quesText = quesText.replace(newImageFile[i], "<span class='ans'><a class='imageZoom' href="+imageName[0]+"><img class='imageZoom' style='max-width:300px;max-height:300px' src="+imageName[0]+"/></a></span>");
								quesText = quesText.replace(newImageFile[i], "<span class='ans' id='MGIMG_"+compreId+"_Claq_"+oldFileCounter+"'><a class='imageZoom' href="+imageName[0]+"><img class='imageZoom' style='max-width:300px;max-height:300px' src="+imageName[0]+"/></a></span>");
								jwPlayerDetailsArray["MGIMG_" + compreId + "_Claq_" + oldFileCounter] = "<span class='ans' id='MGIMG_"+compreId+"_Claq_"+oldFileCounter+"'><a class='imageZoom' href="+imageName[0]+"><img class='imageZoom' style='max-width:300px;max-height:300px' src="+imageName[0]+"/></a></span>";
								jwPlayerDetailsArrayIndex[tempCountIndex] = "MGIMG_" + compreId + "_Claq_" + oldFileCounter;
								tempCountIndex++;
								oldFileCounter++;
							}
						}
					}	
				}else{
					if(quesText.indexOf('<img') != -1) {
						var newImageFile = new Array();	
						quesText = quesText.replace(/'/g,'"');
						newImageFile = quesText.match(/(<img.+?src="(.+?)".+?>)/g);

						for (var i = 0; i < newImageFile.length; i++) {
							while (quesText.indexOf(newImageFile[i]) != -1) {
								var imageName = newImageFile[i].split('src=')[1].split('/>');
								quesText = quesText.replace(newImageFile[i], "<span class='ans'><span class='zoomimage' ><a title='Click the Image to Zoom' target='_blank'><img src="+imageName[0]+" class='max_img_ico' title='Click the Image to Zoom'></a></span></span>");
								oldFileCounter++;
							}
						}
					}
				}
				quesText = editAudioVideoImageFilePath(quesText);
				hint = $(this).find('hint').text()!="NA"?$(this).find('hint').text():"";
				if(hint=="" || hint=="NA")
					showHintDiv=showHintDiv || false;
				else 
					showHintDiv= showHintDiv || true;
				var newHint = makeMediaDiv(hint);
				hint =newHint;
				hint = editAudioVideoImageFilePath(hint);
				errorRectification = $(this).find('errorRectification').text();
				var tempError = makeMediaDiv(errorRectification);
				errorRectification = editAudioVideoImageFilePath(tempError);
				langBeanArr.push(new quesLangBean(langId,quesText,hint,errorRectification));
			});
			langBeanArr=langBeanArr.sortBy('langId');
			compreGroupDetails[compreId+""] = groupComprehensionQuestions;
			jwPlayerDetails[compreId+""] = jwPlayerDetailsArray;
			jwPlayerDetailsIndex[compreId+""] = jwPlayerDetailsArrayIndex;
			mockVar.compreLaqQues.push(new compreLaqQuesBean(compreId,langBeanArr,groupComprehensionQuestions,jwAudioVideo,allowedProgression,noOfReplays,isControlEnable,autoplay,additionalQuesType,columnType,subquestionShuffling));
		});
		$(xml).find('laqs').find('laq').each(function(){
			laqId = $(this).attr('id');
			groupLAQQuestions = $(this).attr('groupLAQQuestions');
			var jwPlayerDetailsArray = new Object();
			var jwPlayerDetailsArrayIndex = new Object();
			var tempCountIndex = 0;
			langBeanArr = new Array();
			jwAudioVideo = new Array();
			allowedProgression = $(this).attr('allowedProgression') || "true";
			noOfReplays = $(this).attr('numberOfReplays') || -1;
			autoplay = $(this).attr('playOnLoad') || "false";
			isControlEnable = $(this).attr('isControlEnable') || "true";
			additionalQuesType = $(this).attr('additionalQuesType');
			columnType = $(this).attr('columnType');
			//Added by sai for Shuffling for child questions of Comprehension and LAQ
			subquestionShuffling=$(this).attr('subquestionShuffling') || "false";
			$(this).find('lang').each(function(){
				langId = $(this).attr('id');
				var oldFileCounter = 0;
				quesText = $(this).text();
				//quesText = quesText.replace("'","\"");
				if(quesText.indexOf("tkcimages/")!=-1){
					tempImageTag = quesText.split("tkcimages/");
					for(var k=1;k<tempImageTag.length;k++){
						//var temporaryImageName = "";
						//temporaryImageName = tempImageTag[k];
						tempImageName=tempImageTag[k].split(".")[0];
						var temporaryFileName = tempImageTag[k].split(".")[0];
						tempImageName=tempImageName.replace(/\s/g, '_');
						var temporaryFileExtension = tempImageTag[k].split(".")[1].split("\"")[0];
						if(temporaryFileExtension.indexOf('>')!= -1){
							temporaryFileExtension = tempImageTag[k].split(".")[1].split("'")[0]; 
						}
						temporaryFileName = temporaryFileName+"."+temporaryFileExtension;
						tempImageName = tempImageName+"."+temporaryFileExtension;
						quesText = quesText.replace(temporaryFileName,tempImageName);
						if(temporaryFileExtension == "mp4"){
							quesText = quesText + "<div class='jwAudioVideo' id='jwVideo_"+laqId+"_Claq_"+oldFileCounter+"' title='tkcimages/"+tempImageName+"'></div>";
							jwPlayerDetailsArray["jwVideo_" + laqId + "_Claq_" + oldFileCounter] = "<div class='jwAudioVideo' id='jwVideo_" + laqId + "_Claq_" + oldFileCounter + "' title='tkcimages/" + tempImageName + "'></div>";
							jwPlayerDetailsArrayIndex[tempCountIndex] = "jwVideo_" + laqId + "_Claq_" + oldFileCounter;
							tempCountIndex++;

							oldFileCounter++ ;
						}else if(temporaryFileExtension == "mp3"){
							quesText = quesText + "<div class='jwAudioVideo' id='jwAudio_"+laqId+"_Claq_"+oldFileCounter+"' title='tkcimages/"+tempImageName+"'></div>";
							jwPlayerDetailsArray["jwAudio_" + laqId + "_Claq_" + oldFileCounter] = "<div class='jwAudioVideo' id='jwAudio_" + laqId + "_Claq_" + oldFileCounter + "' title='tkcimages/" + tempImageName + "'></div>";
							jwPlayerDetailsArrayIndex[tempCountIndex] = "jwAudio_" + laqId + "_Claq_" + oldFileCounter;
							tempCountIndex++;
							oldFileCounter++ ;
						}
						//quesText=tempImageTag[0]+"tkcimages/"+tempImageName+temporaryImageName.substring(temporaryImageName.indexOf("."));
					}
				}
				if(quesText.indexOf("<audio>")!=-1){
					var newAudioFile = new Array();
					newAudioFile = quesText.match(/(<audio>.+?<audio>)/g);
					for(var i=0;i<newAudioFile.length;i++){
						while (quesText.indexOf(newAudioFile[i])!=-1) {
							quesText = quesText.replace(newAudioFile[i],"<div class='jwAudioVideo' id='jwAudio_"+laqId+"_Claq_"+oldFileCounter+"' title='tkcimages/"+newAudioFile[i].split("<audio>")[1]+"'></div>");
							jwPlayerDetailsArray["jwAudio_" + laqId + "_Claq_" + oldFileCounter] = "<div class='jwAudioVideo' id='jwAudio_" + laqId + "_Claq_" + oldFileCounter + "' title='tkcimages/" + newAudioFile[i].split("<audio>")[1] + "'></div>";
							jwPlayerDetailsArrayIndex[tempCountIndex] = "jwAudio_" + laqId + "_Claq_" + oldFileCounter;
							tempCountIndex++;

							oldFileCounter++ ;
						}
					}
				}
				if(quesText.indexOf("<video>")!=-1){
					var newVideoFile = new Array();
					newVideoFile = quesText.match(/(<video>.+?<video>)/g);
					for(var i=0;i<newVideoFile.length;i++){
						while (quesText.indexOf(newVideoFile[i])!=-1) {
							quesText = quesText.replace(newVideoFile[i],"<div class='jwAudioVideo' id='jwVideo_"+laqId+"_Claq_"+oldFileCounter+"' title='tkcimages/"+newVideoFile[i].split("<video>")[1]+"'></div>");
							jwPlayerDetailsArray["jwVideo_" + laqId + "_Claq_" + oldFileCounter] = "<div class='jwAudioVideo' id='jwVideo_" + laqId + "_Claq_" + oldFileCounter + "' title='tkcimages/" + newVideoFile[i].split("<video>")[1] + "'></div>";
							jwPlayerDetailsArrayIndex[tempCountIndex] = "jwVideo_" + laqId + "_Claq_" + oldFileCounter;
							tempCountIndex++;
							oldFileCounter++ ;
						}
					}
				}
				if(mockVar.MagnifyingGlass == 1){
					if(quesText.indexOf('<img') != -1) {
						var newImageFile = new Array();	
						quesText = quesText.replace(/'/g,'"');
						newImageFile = quesText.match(/(<img.+?src="(.+?)".+?>)/g);
						for (var i = 0; i < newImageFile.length; i++) {
							while (quesText.indexOf(newImageFile[i]) != -1) {
								var imageName = newImageFile[i].split('src=')[1].split('/>');
								//quesText = quesText.replace(newImageFile[i], "<span class='ans'><a class='imageZoom' href="+imageName[0]+"><img class='imageZoom' style='max-width:300px;max-height:300px' src="+imageName[0]+"/></a></span>");
								quesText = quesText.replace(newImageFile[i], "<span class='ans' id='MGIMG_"+laqId+"_Claq_"+oldFileCounter+"'><a class='imageZoom' href="+imageName[0]+"><img class='imageZoom' style='max-width:300px;max-height:300px' src="+imageName[0]+"/></a></span>");

								jwPlayerDetailsArray["MGIMG_" + laqId + "_Claq_" + oldFileCounter] = "<span class='ans' id='MGIMG_"+laqId+"_Claq_"+oldFileCounter+"'><a class='imageZoom' href="+imageName[0]+"><img class='imageZoom' style='max-width:300px;max-height:300px' src="+imageName[0]+"/></a></span>";
								jwPlayerDetailsArrayIndex[tempCountIndex] = "MGIMG_" + laqId + "_Claq_" + oldFileCounter;
								tempCountIndex++;
								oldFileCounter++;
							}
						}
					}	
				}else{
					if(quesText.indexOf('<img') != -1) {
						var newImageFile = new Array();	
						quesText = quesText.replace(/'/g,'"');
						newImageFile = quesText.match(/(<img.+?src="(.+?)".+?>)/g);
						for (var i = 0; i < newImageFile.length; i++) {
							while (quesText.indexOf(newImageFile[i]) != -1) {
								var imageName = newImageFile[i].split('src=')[1].split('/>');
								quesText = quesText.replace(newImageFile[i], "<span class='ans'><span class='zoomimage' ><a title='Click the Image to Zoom' target='_blank'><img src="+imageName[0]+" class='max_img_ico' title='Click the Image to Zoom'></a></span></span>");
								oldFileCounter++;
							}
						}
					}
				}
				quesText = editAudioVideoImageFilePath(quesText);
				hint = $(this).find('hint').text()!="NA"?$(this).find('hint').text():"";
				if(hint=="" || hint=="NA")
					showHintDiv=showHintDiv || false;
				else 
					showHintDiv= showHintDiv || true;
				var newHint = makeMediaDiv(hint);
				hint =newHint;
				hint = editAudioVideoImageFilePath(hint);
				errorRectification = $(this).find('errorRectification').text();
				var tempError = makeMediaDiv(errorRectification);
				errorRectification = editAudioVideoImageFilePath(tempError);
				langBeanArr.push(new quesLangBean(langId,quesText,hint,errorRectification));

			});
			langBeanArr=langBeanArr.sortBy('langId');
			compreGroupDetails[laqId+""] = groupLAQQuestions;
			jwPlayerDetails[laqId+""] = jwPlayerDetailsArray;
			jwPlayerDetailsIndex[laqId+""] = jwPlayerDetailsArrayIndex;
			mockVar.compreLaqQues.push(new compreLaqQuesBean(laqId,langBeanArr,groupLAQQuestions,jwAudioVideo,allowedProgression,noOfReplays,isControlEnable,autoplay,additionalQuesType,columnType,subquestionShuffling));
		});

		// To handle older mock which do not contain <GROUP> tag in the XML.
		// Backward compatibility
		mockVar.nonTimeBoundTime = 0;
		// Convert total time to seconds
		mockVar.completeTime = mockVar.completeTime*60;
		mockVar.minSubmitTime = mockVar.completeTime*mockVar.minSubmitTime/100;
		if($(xml).find("group").length>0){
			renderQuestions(xml,"group");
			var counter = 0;
			var totTimeBoundTime = 0;
			var firstNonTimeBoundGrp = true;
			$(xml).find("group").each(function(){
				//Added by Boddu Rakesh
				mockVar.groups[counter].groupId = parseInt($(this).attr("id"));
				mockVar.groups[counter].timespent = 0;
				//Completed
				mockVar.groups[counter].maxTime = parseInt($(this).attr("maxDuration")) *60;
				if($(this).attr("maxDuration") >0){
					totTimeBoundTime += parseInt($(this).attr("maxDuration"))*60;
				}else if( firstNonTimeBoundGrp && $(this).attr("maxDuration")==0){
					mockVar.groups[counter].firstNonTimeBoundGrp = true;
					firstNonTimeBoundGrp = false;
				}
				mockVar.groups[counter].minTime = parseInt($(this).attr("minDuration"))*60;
				mockVar.groups[counter].breakTime = parseInt($(this).attr("breakTime"))*60;
				mockVar.groups[counter].isViewable = $(this).attr("revisitAllowedForView");
				mockVar.groups[counter].isEditable = $(this).attr("revisitAllowedForEdit");
				mockVar.groups[counter].groupName = $(this).find("groupDisplayText").text();
				mockVar.groups[counter].maxNoOptSec = eval($(this).attr("groupMaxOptionalSections"));
				mockVar.groups[counter].mandatoryBreak = $(this).attr("breakTimeSkip");

				var grpObject=new Object();
				/*mockVar.groupConfigArray[counter].isViewable = $(this).attr("revisitAllowedForView");
				mockVar.groupConfigArray[counter].isEditable = $(this).attr("revisitAllowedForEdit");
				mockVar.groupConfigArray[counter].maxTime=parseInt($(this).attr("maxDuration"))*60;
				mockVar.groupConfigArray[counter].minTime=parseInt($(this).attr("minDuration"))*60;*/

				grpObject.isViewable = $(this).attr("revisitAllowedForView");
				grpObject.isEditable = $(this).attr("revisitAllowedForEdit");
				grpObject.maxTime=parseInt($(this).attr("maxDuration"))*60;
				grpObject.minTime=parseInt($(this).attr("minDuration"))*60;
				mockVar.groupConfigArray.push(grpObject);
				mockVar.groups[counter].instructionTime = $(this).attr("instructionTime")*60||0;
				mockVar.groups[counter].minInstructionTime = $(this).attr("minInstructionTime")*60||0;
				mockVar.groups[counter].enableInstruView = $(this).attr("revisitAllowedForInstructions");
				mockVar.groups[counter].instru="";
				$(this).find("groupInstructions").each(function(){
					var instruArray = [];
					var instruContent = $(this).text();
					if(typeof(instruContent)!='undefined' && instruContent!=""){
						var instrulangArray = instruContent.split("<langSep>");
						for(var i=0;i<instrulangArray.length;i++){
							langId=instrulangArray[i].split("<instSep>")[0];
							content=instrulangArray[i].split("<instSep>")[1];
							var newHint = makeMediaDiv(content);
							content =newHint;
							content = editAudioVideoImageFilePath(content);
							instruArray.push(new instruBean(langId,content));
						}
					}
					mockVar.groups[counter].instru=instruArray;
				});
				counter++;
			});
			mockVar.nonTimeBoundTime = mockVar.completeTime - totTimeBoundTime;
			var nbTime=parseInt(mockVar.nonTimeBoundTime);
			mockVar.nonTbTime=nbTime;
			mockVar.totalDurationOfAssessment = mockVar.completeTime;
		}else{
			renderQuestions(xml,"SECTIONDETAILS");
			mockVar.groups[0].maxNoOptSec = $(xml).find("MAXNOOPTSEC").text();
			mockVar.groups[0].minTime = mockVar.minSubmitTime;
			mockVar.groups[0].maxTime = mockVar.completeTime;
		}
		mockVar.currentGrp = 0;
		mockVar.MaxGrpEnabled=0;
		mockVar.groups[mockVar.currentGrp].isDisabled = false;
		if(mockVar.groups[mockVar.currentGrp].maxTime>0){
			mockVar.time = mockVar.groups[mockVar.currentGrp].maxTime;
		}else if(mockVar.groups.length>1 && mockVar.groups[mockVar.currentGrp].maxTime ==0){
			mockVar.time = mockVar.nonTimeBoundTime;
		}else{
			mockVar.time = mockVar.completeTime;
		}
		mockVar.minSubmitTime = mockVar.groups[mockVar.currentGrp].minTime;
		//getCandIdFromCookie();
		for(var i=0;i<mockVar.groups.length;i++){
		
		for(var j=0;j<mockVar.groups[i].secDetails.length;j++){
		if(typeof(mockVar.groups[i].secDetails[j].groupAllQuestions)!="undefined" && typeof(mockVar.groups[i].secDetails[j].groupAllQuestions)=="true"){
		mockVar.groups[i].secDetails[j].showMarkedForReview=false;
		}else{
		/*var count=0;*/
		for(var k=0;k<mockVar.groups[i].secDetails[j].questions.length;k++){
		if(mockVar.groups[i].secDetails[j].questions[k].comprehensionId!=0 && (typeof(mockVar.compreLaqQues[mockVar.compreLaqQues.inArray(mockVar.groups[i].secDetails[j].questions[k].comprehensionId+'', 'quesId')].groupComprehensionLaqQuestions)!="undefined" && mockVar.compreLaqQues[mockVar.compreLaqQues.inArray(mockVar.groups[i].secDetails[j].questions[k].comprehensionId+'', 'quesId')].groupComprehensionLaqQuestions!="true")){
		mockVar.groups[i].secDetails[j].showMarkedForReview=true;
		break;
		}
		else if(mockVar.groups[i].secDetails[j].questions[k].comprehensionId==0){
		mockVar.groups[i].secDetails[j].showMarkedForReview=true;
		break;
		}/*else if(mockVar.groups[i].secDetails[j].questions[k].comprehensionId!=0 && (typeof(mockVar.compreLaqQues[mockVar.compreLaqQues.inArray(mockVar.groups[i].secDetails[j].questions[k].comprehensionId+'', 'quesId')].groupComprehensionLaqQuestions)!="undefined" && mockVar.compreLaqQues[mockVar.compreLaqQues.inArray(mockVar.groups[i].secDetails[j].questions[k].comprehensionId+'', 'quesId')].groupComprehensionLaqQuestions=="true")){
		count++;
		}*/
		}
		}
		/*if(count>1){
		mockVar.groups[i].secDetails[j].showMarkedForReview=true;
		}*/
		}
		
		for(var j=0;j<mockVar.groups[i].secDetails.length;j++){
		if(mockVar.groups[i].secDetails[j].showMarkedForReview){
		mockVar.groups[i].showMarkedForReview=true;
		break;
		}
		}
		
		}
		arrangeMockVar();
		//restoreFromBackup();
	} else {
		arrangeMockVar();
	}

}

function arrangeMockVar(){
	loadLabel();
	iOAP = mockVar.groups[mockVar.currentGrp];
	if(checkBackup==0){
		if(typeof(iOAP.instructionTime)!='undefined' && iOAP.instructionTime!=0 && iOAP.instru.length>0){
			mockVar.isInstruPage=1;
			clearTimeout(mockVar.timeCounter);
			mockVar.timeCounter = mockVar.groups[mockVar.currentGrp].instructionTime;
			instruTimeCounter(mockVar.timeCounter);
			showGrpInstructions();
		}else{
			moveToExam();
		}
	}else{
		if(mockVar.isInstruPage==1){
			clearTimeout(mockVar.timeCounter);
			if(mockVar.remainingInstruTime>0 && mockVar.resumedFromInstruPage==1 && mockVar.groupAtInterruption==mockVar.currentGrp ){
				instruTimeCounter(mockVar.remainingInstruTime);
				showGrpInstructions();
			}else{
				moveToExam();
			}
			/*else if(mockVar.remainingInstruTime<=0  && mockVar.resumedFromInstruPage==1 && mockVar.groupAtInterruption==mockVar.currentGrp){
					moveToExam();
				}
				else if(mockVar.resumedFromInstruPage==1 && mockVar.groupAtInterruption!=mockVar.currentGrp){
					moveToExam();
				}*/
		}else{
			moveToExam();
		}
	}
}
function moveToExam(){
	mockVar.isInstruPage=0;
	mockVar.remainingInstruTime=0;
	mockVar.resumedFromInstruPage=0;
	clearTimeout(mockVar.timeCounter);
	if($(window).width()< 1000){
		$('#col2').hide();
		$('.subheader_tab,.grup_components,.q_tab,.btntab').show();
	}else
		$('#col2').show();
	$('#instruTimeDiv').hide();
	$('.preGroupInstR').hide();
	$('#questionContent').show();
	$('.collapsebel_panel').show();
	$('.helpinstruction_div').show();
	$('.nav-container').show();
	$('.section-timepanel').show();
	$('.subject-selection').show();
	$('.viewProfile').show();	
	jQuery(".subject-arrow-right").attr("class","subject-arrow-right-disabled");
	jQuery(".subject-arrow-left").attr("class","subject-arrow-left-disabled");
	$('.subject-section-rightarrow').show();
	if(typeof(mockVar.groups[mockVar.currentGrp].instructionTime)!='undefined'&& mockVar.groups[mockVar.currentGrp].instructionTime !=0 && mockVar.groups[mockVar.currentGrp].instru.length>0){
		$('.viewGrpInstruDiv').show();
	}else
		$('.viewGrpInstruDiv').hide();
	showModule("Questn_Area");
	iOAP = mockVar.groups[mockVar.currentGrp];
	numPanelSec();
	getQuestion(mockVar.defaultLang);
	fillSections();
	fillNumberPanel();
	timer();
	if(scribeExtraTime!=''){
		divideScribeTimeForGroups(true);
	}if(candidateExtraTime!=''){
		divideScribeTimeForGroups(false);
	}
	if(parseInt(allowZoom)==1){
		$('.zoomin-icon-container').css('display','inline-block');
		$('.zoomout-icon-container').css('display','inline-block');
	}
	if(iOAP.noOptSec>0){
		$('#showOptionalSecSummary').show();
		$('#noOptSec').html(iOAP.noOptSec);
		$('#maxOptSec').html(iOAP.maxNoOptSec);
	}
	$('#viewQPButton').removeAttr("disabled"); // View QP button is getting disabled after refresh because of numpad_keyboard.js. Wierd behaviour
	$('#viewProButton').removeAttr("disabled");// View Profile button is getting disabled after refresh because of numpad_keyboard.js. Wierd behaviour
	$('#viewInstructionsButton').removeAttr("disabled");
	if (jQuery(window).width() > 1000) {
		quizPageHeight();
	} else {
		setDIVHeight_resp(); 
	}
	if(mockVar.backupTimeInterval>0){
		if(!isFinalSubmitStarted){
			//saveBackUp();
			if(checkBackup==0){
				onLoadBackup();
			}
			else{
			resumeFirstBackUp=true;
				$("#pWait").hide();
				setTimeout(function(){
					saveBackUp(true);},10000);
			}
		}
	}
	if(mockVar.storeCandResponse==0){
		setTimeout(function(){
					saveBackUp(true);},10000);
	}
	if(mockVar.isBreakPage){
		checkGroupBreakTime();
		removeActiveLinks();
	}

}
/*function getQuestion(langId){
	mockVar.curQuesBean = iOAP.secDetails[iOAP.curSection].questions[iOAP.curQues];
	if(mockVar.curQuesBean.quesParam.status == "notAttempted"){
		mockVar.curQuesBean.quesParam.status = "notanswered";
		iOAP.secDetails[iOAP.curSection].notanswered++;
	}
	fillSections();
	mockVar.langIndex = mockVar.curQuesBean.quesLangBeans.inArray(langId,'langId');
	checkQuesAvailable();
	
	  /*if(iOAP.curQues>11){ var el = document.getElementById(iOAP.curQues);
	  el.scrollIntoView(true); }*/
/*	enableOptButtons();
	chkIfMaxQuesCrossed();
	quizPageHeight();
}*/

function getQuestion(langId){
	isSubmitButtonClicked = false;
	mockVar.curQuesBean = iOAP.secDetails[iOAP.curSection].questions[iOAP.curQues];
	mockVar.curSectionQuestions = iOAP.secDetails[iOAP.curSection].questions;
	var compreLaqCount = 0;
	var compreLaqID = 0;
	if(typeof(iOAP.secDetails[iOAP.curSection].groupAllQuestions) == "undefined" || iOAP.secDetails[iOAP.curSection].groupAllQuestions == "" || iOAP.secDetails[iOAP.curSection].groupAllQuestions == "false"  ){
		for(var j=0;j<mockVar.curSectionQuestions.length;j++){
			if(mockVar.curQuesBean.comprehensionId!=0){
				if(mockVar.curQuesBean.comprehensionId == mockVar.curSectionQuestions[j].comprehensionId){
					compreLaqCount++;
				}
			}else if(mockVar.curQuesBean.laqId!=0){
				if(mockVar.curQuesBean.laqId == mockVar.curSectionQuestions[j].laqId){
					compreLaqCount++;
				}
			}
		}
		for(var k=0;k<mockVar.compreLaqQues.length;k++){
			if(mockVar.curQuesBean.comprehensionId == mockVar.compreLaqQues[k].quesId){
				compreLaqID = k;
				break;
			}else if(mockVar.curQuesBean.laqId == mockVar.compreLaqQues[k].quesId){
				compreLaqID = k;
				break;
			}
		}
		if(typeof(mockVar.compreLaqQues[compreLaqID])!= "undefined"){
			if( typeof(mockVar.compreLaqQues[compreLaqID].groupComprehensionLaqQuestions) != "undefined" && mockVar.compreLaqQues[compreLaqID].groupComprehensionLaqQuestions != "" && ((mockVar.compreLaqQues[compreLaqID].groupComprehensionLaqQuestions == "true") && (mockVar.compreLaqQues[compreLaqID].quesId == mockVar.curQuesBean.laqId  || mockVar.compreLaqQues[compreLaqID].quesId == mockVar.curQuesBean.comprehensionId)) ){
				var curGroupCompreQues = iOAP.curQues;
				var notAnswered='notAttempted';
				for(var l=0;l<compreLaqCount;l++){
					if(iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesParam.status == notAnswered){
						iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesParam.status = "notanswered";
						iOAP.secDetails[iOAP.curSection].notanswered=iOAP.secDetails[iOAP.curSection].notanswered+1;
					}
					curGroupCompreQues=curGroupCompreQues + 1;
				}	
			}else{
				if(mockVar.curQuesBean.quesParam.status == "notAttempted"){
					mockVar.curQuesBean.quesParam.status = "notanswered";
					iOAP.secDetails[iOAP.curSection].notanswered++;
				}
			}
		}else{

			if(mockVar.curQuesBean.quesParam.status == "notAttempted"){
				mockVar.curQuesBean.quesParam.status = "notanswered";
				iOAP.secDetails[iOAP.curSection].notanswered++;
			}
		}
	}else{

		for(var i=0;i<mockVar.curSectionQuestions.length;i++){
			if(mockVar.curSectionQuestions[i].quesParam.status == "notAttempted"){
				mockVar.curSectionQuestions[i].quesParam.status = "notanswered";
				iOAP.secDetails[iOAP.curSection].notanswered++;
			}
		}
	}
	fillSections();
	mockVar.langIndex = mockVar.curQuesBean.quesLangBeans.inArray(langId,'langId');
	checkQuesAvailable();
	/*if(iOAP.curQues>11){ var el = document.getElementById(iOAP.curQues);
	  el.scrollIntoView(true); }*/
	enableOptButtons();
	chkIfMaxQuesCrossed();
	if (jQuery(window).width() > 1000) {
		quizPageHeight();
	} else {
		setDIVHeight_resp(); 
	}
}

function checkQuesAvailable(){
	if(mockVar.langIndex == -1){
		mockVar.langIndex = 0;
		checkQuesAvailable();
	}else{
		fillQuesContent();
		if(flagToRemoveSetTimeOut!=undefined){
			clearTimeout(flagToRemoveSetTimeOut);//toremove timeout set to check recordedDataSize
			isRecording=true;
			timeRecorded=0;
		}
		if(mockVar.curQuesBean.keyboardType=='AudioFile' || mockVar.curQuesBean.keyboardType=='VideoFile'){
			recordingInProgress=false;
			if(mockVar.curQuesBean.quesParam.status =='answered' || mockVar.curQuesBean.quesParam.status=='markedAndAnswered'){
				if(mockVar.curQuesBean.keyboardType=='AudioFile' && mockVar.curQuesBean.quesParam.answer=='audioRecorded'){
					/*
					var audio = document.getElementById("recordedAudio");
					if(mockVar.storeCandResponse == 0 && mockVar.recordedBlobsArrayForMock[mockVar.curQuesBean.quesId]!=null){
					audio.src = window.URL.createObjectURL(mockVar.recordedBlobsArrayForMock[mockVar.curQuesBean.quesId]);
					$('#recordedAudioSpan').show();
					}
					else if(mockVar.storeCandResponse == 1){
					audio.src =xmlFilePath+'/recordedTypeAnswersofAssessment/'+mockVar.candMasterId+'/'+mockVar.attemptId+'/'+mockVar.curQuesBean.quesId+'/'+'Audio_'+mockVar.curQuesBean.quesId+'.webm';
					$('#recordedAudioSpan').show();
					$('#recordingAlreadySaved').show();
					}
					*/
					if(mockVar.curQuesBean.OverwritePreviousRecording==false){
						$('#reRecordingNotAllowed').show();
						$('#reRecordingNotAllowed').css('display', 'inline-block');
						$('#audioRecordingStartClickMessage').hide();
						$('#start-recording').attr('disabled', true);
					}else{
						$('#recordingAlreadySaved').show();
						$('#recordingAlreadySaved').css('display', 'inline-block');
					}
				}else if(mockVar.curQuesBean.keyboardType=='VideoFile' && mockVar.curQuesBean.quesParam.answer=='videoRecorded'){
					/*
					var video = document.getElementById("recordedVideo");
					if(mockVar.storeCandResponse == 0 && mockVar.recordedBlobsArrayForMock[mockVar.curQuesBean.quesId]!=null){
					video.src = window.URL.createObjectURL(mockVar.recordedBlobsArrayForMock[mockVar.curQuesBean.quesId]);
					$('#recordedVideoSpan').show();
					}
					else if(mockVar.storeCandResponse == 1){
					video.src =xmlFilePath+'/recordedTypeAnswersofAssessment/'+mockVar.candMasterId+'/'+mockVar.attemptId+'/'+mockVar.curQuesBean.quesId+'/'+'Video_'+mockVar.curQuesBean.quesId+'.webm';
					$('#recordedVideoSpan').show();
					}
					video.setAttribute('height', '220');
					video.setAttribute('width', 'auto');
					*/
					if(mockVar.curQuesBean.OverwritePreviousRecording==false){
						$('#reRecordingNotAllowed').show();
						$('#reRecordingNotAllowed').css('display', 'inline-block');
						$('#videoRecordingStartClickMessage').hide();
						$('#start-recording').attr('disabled', true);
					}else{
						$('#recordingAlreadySaved').show();
						$('#recordingAlreadySaved').css('display', 'inline-block');
					}
				}
			}
		}
		if(mockVar.WaterMark){
		if(mockVar.storeCandResponse == 0 || mockVar.storeCandResponse == "0")
			waterMark($(".mockCandId").html());
		else
			waterMark(sessionStorage.waterMarkId);
	}
	}
}

function fillQuesContent(){
	grpAllMultimediaPlayedAtOnceCount=0;
	var displayWC;
	var isTempTextHighlighterEnabled = false;
	if(isTextHighlighterEnabled){
		//console.log("Rakesh "+isTextHighlighterEnabled);
		isTempTextHighlighterEnabled = true;
		$(".selectmark").click();
		}
	//var textBoxWidth = "";
	/*if(mockVar.storeCandResponse == 0){*/
	if(jQuery(".Ans_Area").hasClass("ZeroLevelZoom"))
	{
		zoomIconClass = "ZeroLevelZoom";
	}
	else if(jQuery(".Ans_Area").hasClass("FirstLevelZoom"))
	{
		zoomIconClass = "FirstLevelZoom";
	}
	else if(jQuery(".Ans_Area").hasClass("SecondLevelZoom"))
	{
		zoomIconClass = "SecondLevelZoom";
	}
	else if(jQuery(".Ans_Area").hasClass("ThirdLevelZoom"))
	{
		zoomIconClass = "ThirdLevelZoom";
	}
	else if(jQuery(".Ans_Area").hasClass("FourthLevelZoom"))
	{
		zoomIconClass = "FourthLevelZoom";
	}
	/*}*/

	mockVar.curSectionQuestions =  iOAP.secDetails[iOAP.curSection].questions;
	if(typeof(iOAP.secDetails[iOAP.curSection].displayNumberPanel) == "undefined" || iOAP.secDetails[iOAP.curSection].displayNumberPanel == "" || iOAP.secDetails[iOAP.curSection].displayNumberPanel == "true"){
	var tempCompreId = (iOAP.secDetails[iOAP.curSection].questions[iOAP.curQues].comprehensionId != 0 ? iOAP.secDetails[iOAP.curSection].questions[iOAP.curQues].comprehensionId : iOAP.secDetails[iOAP.curSection].questions[iOAP.curQues].laqId);
		var isCompre = tempCompreId != 0 ? compreGroupDetails[tempCompreId+""]:"false";
		if(isCompre == "false"){
			$('#currentQues').html(quesContent(mockVar.curQuesBean));
			
			$('.normalBtn').show();
			$('.groupBtn').hide();
			$('.clearResponse,.underreview,#savenextMbl').show();
			$('.previousBtn').hide();

		}else{
			/*$('#currentQues').html(quesContent(mockVar.curQuesBean));
			$('.normalBtn,.previousBtn').hide();
			$('.groupBtn,.clearResponseGroup').show();*/
			$('.normalBtn,.clearResponse,.underreview,#savenextMbl').show();
			$('.groupBtn').hide();
			$('#currentQues').html(quesContent(mockVar.curQuesBean));

			if(iOAP.curQues == 0){
				$('.previousBtn').hide();
			}else{
				$('.previousBtn').show();
			}
			
		}
	}else{
		if(iOAP.secDetails[iOAP.curSection].groupAllQuestions == "false"){
			$('.normalBtn,.clearResponse,.underreview,#savenextMbl').show();
			$('.groupBtn').hide();
			$('#currentQues').html(quesContent(mockVar.curQuesBean));

			if(iOAP.curQues == 0){
				$('.previousBtn').hide();
			}else{
				$('.previousBtn').show();
			}
		}
		else{
			$('#currentQues').html(quesGroupContent(mockVar.curSectionQuestions));
			$('.normalBtn,.previousBtn').hide();
			$('.groupBtn,.clearResponseGroup').show();
			if(iOAP.secDetails[iOAP.curSection].secType=="OFFLINE" && mockVar.storeCandResponse ==0){
				$('.clearResponseGroup,.savenextGroup').hide();
			}else if(iOAP.secDetails[iOAP.curSection].secType=="OFFLINE" && mockVar.storeCandResponse ==1){
				if(iOAP.secDetails.length>1){
					$('.clearResponseGroup').hide();
				}else{
					$('.clearResponseGroup,.savenextGroup').hide();
				}

			}
		}
	}
	$('.hint').text($(globalXmlvar).find('Hint').text());
	$('#sectionsField').show();
	$('#actionButton').show();
	$('.progrmngBtn').hide();
	$('.typKeybrdLayout').hide();
	$('#legend').show();
	$('#quesPallet').show();
	if(iOAP.secDetails[iOAP.curSection].displayNumberPanel == "false"){
		$(".collapsebel_panel").hide();
		$(".qarea_resp").hide();

	}else{
		$(".collapsebel_panel").show();
		$(".qarea_resp").show();
	}

	$('.numberpanelQues').show();
	$('.questionTypeCont .marking-details').show();
	$('.save_buttoncontainer').show();
	$('.save_buttoncontainer_2').removeClass('saveTyp');
	$('.other_buttoncontainer').show();
	$('.finalSubmit,#finalSubmit').show();
	$('#finalSubmitMbl').show();
	$('.subject-selection').show();
	$('.subject-section-rightarrow').show();
	$('.diff_type_notation_area_outer').show();
	$('#rightSectionDiv2').show();
	$('.sect,.filter_section').show();
	$('.typingSubmit').hide();
	if(showViewQPButton){$('.viewquestion_div').show();}
	if(mockVar.groups[mockVar.currentGrp].enableInstruView=="true"){
		$('.viewGrpInstruDiv').show();
		$('#viewGrpInstruDiv').show();
	}else{
		$('.viewGrpInstruDiv').hide();
		$('#viewGrpInstruDiv').hide();
	}
	
	$('#typingInstDiv').hide();
	var tools = false;
	if(mockVar.showCalculator=="SCIENTIFIC"||mockVar.showCalculator=="NORMAL"){
		$('.calculator-icon-container').show();
		tools = true;
	}
	if(mockVar.textAreaPad){
		$('.textarea-icon-container').show();
		tools = true;
	}
	if(mockVar.ScratchPad){
		$('.scratchpad-icon-container').show();
		tools = true;
	}
	if(mockVar.ruler){
		$('.ruler-icon-container').show();
		tools = true;
	}
	if(mockVar.protractor){
		$('.protactor-icon-container').show();
		tools = true;
	}
	if(mockVar.TextHighlighter){
				tools = true;
				$('.selectmark_tool').css('display','inline-block');
				
			}
	if(mockVar.zoom){
		$('.zoomin-icon-container').css('display','inline-block');
		$('.zoomout-icon-container').css('display','inline-block');
		tools = true;
	}
	if( $(window).width()<481 && tools === true){
		$('.picons_scroll').show();
	}

	if(mockVar.isHelpContentAvailable){

		$('.usefulDataDiv').show();

	}
	if(mockVar.languages.length>1){
		$('#defaultSelectedLanguage').empty();
		for(var i=0;i<mockVar.languages.length;i++){
			if(mockVar.languages[i]!=null && typeof(mockVar.languages[i])!='undefined')
				$('#defaultSelectedLanguage').append($('<option>').text(mockVar.languages[i]).attr('value',i));
		}
		if(mockVar.languages.length>2)
			$('#defaultLangDropdown').show();
		$('#defaultSelectedLanguage').val(mockVar.defaultLang);

	}
	if(iOAP.secDetails[iOAP.curSection].secType=="TYPING"){
		$('#defaultLangDropdown').hide();
	}
	if(mockVar.curQuesBean.wordCountVisible!=undefined && mockVar.curQuesBean.wordCountVisible.toLowerCase() == "true"){
		displayWC = "inline-block";
	}else{
		displayWC = "none";
	}
	if($.trim(mockVar.curQuesBean.quesLangBeans[mockVar.langIndex].hint).length>0){
		$('.hintText').html(mockVar.curQuesBean.quesLangBeans[mockVar.langIndex].hint);
		$('.hintIcon').show();
	}
	if(typeof(mockVar.curQuesBean.quesLangBeans[mockVar.langIndex].hint)=="undefined"){
		if($.trim(mockVar.curQuesBean.hint).length>0){
			$('.hintText').html(mockVar.curQuesBean.hint);
			$('.hintIcon').show();
		}
	}
	if(typeof(iOAP.secDetails[iOAP.curSection].groupAllQuestions) == "undefined" || iOAP.secDetails[iOAP.curSection].groupAllQuestions == "" || iOAP.secDetails[iOAP.curSection].groupAllQuestions == "false"  ){

		if(mockVar.curQuesBean.quesType == "SA" || mockVar.curQuesBean.quesType == "LA@@SA" || mockVar.curQuesBean.quesType == "COMPREHENSION@@SA"){
			// numeric keyboard
			if(mockVar.curQuesBean.comprehensionId == 0 && mockVar.curQuesBean.laqId == 0){
				isGrpCompreDiv=false;
				if(mockVar.curQuesBean.keyboardType == 'Numeric'){
					//$('#numericKeyBoardDiv').remove();
					$('#answerArea').after("<div style='padding-left: 4%;' id='numericKeyBoardDiv'><input type='text' id='answer' class='keyboardInput answer' value='"+mockVar.curQuesBean.quesParam.answer+"'/></div>");
					triggerKeyboard(1);
					if(iOAP.secDetails[iOAP.curSection].isOptional == 'true' && !iOAP.secDetails[iOAP.curSection].isSelected){
						$('#answer').attr('disabled','disabled');
						$('#vKeyboard').remove();
					}
				}
				// alphanumeric textarea
				else if(mockVar.curQuesBean.keyboardType == 'Alphanumeric'){
					if(mockVar.curQuesBean.isEvaluationRequired == true){
						//textBoxWidth = Math.round(27/16*mockVar.curQuesBean.columns);
						$('#answerArea').after('<div style="padding-left: 2%;" id="alpha"><span id="maxalert" name="maxalert"  style="font-size: 10px;color:#FF1919;font-weight: bold;"></span><div> <input type="text" name="option"  autocomplete="off" spellcheck="false" style="height:30px;" id="answer" class="answer SAAnswer" onpaste="return false"; ondrop="return false;" onkeydown="disableTab(event); allowSAInputsForMultiLang(event); alphaWordLimit(event); " onkeyup="word_count();alphaWordLimit(event);" onMouseDown="alphaWordLimit(32);" value="'+mockVar.curQuesBean.quesParam.answer+'"></div> <div id="noOfWords" name="noOfWords" style="font-size: 12px;color:#2F72B7;font-weight: bold;display:'+displayWC+'">'+mockVar.curQuesBean.typedWord+' '+ $(globalXmlvar).find('wordTyped').text()+'</div></div>');
					}else{
						if(mockVar.curQuesBean.singleLineResponse!=undefined && mockVar.curQuesBean.singleLineResponse.toLowerCase() == "true"){
							//textBoxWidth = Math.round(27/16*mockVar.curQuesBean.columns);
							$('#answerArea').after('<div style="padding-left: 2%;" id="alpha"><span id="maxalert" name="maxalert"  style="font-size: 10px;color:#FF1919;font-weight: bold;"></span><div> <input type="text" name="option"  autocomplete="off" spellcheck="false" style="height:30px;" id="answer" class="answer SAAnswer" onpaste="return false"; ondrop="return false;" onkeydown="disableTab(event); allowSAInputsForMultiLang(event); alphaWordLimit(event); " onkeyup="word_count();alphaWordLimit(event);" onMouseDown="alphaWordLimit(32);" value="'+mockVar.curQuesBean.quesParam.answer+'"></div><div id="noOfWords" name="noOfWords" style="font-size: 12px;color:#2F72B7;font-weight: bold;display:'+displayWC+'">'+mockVar.curQuesBean.typedWord+' '+ $(globalXmlvar).find('wordTyped').text()+'</div></div>');
						}else{
							var widthSA="";
							if(mockVar.curQuesBean.rows==undefined || (mockVar.curQuesBean.rows == 10 && mockVar.curQuesBean.columns == 100)){
								mockVar.curQuesBean.rows = 10;
								mockVar.curQuesBean.columns = 100;
								widthSA = "97%";
							}
							$('#answerArea').after('<div style="padding-left: 2%;" id="alpha"><span id="maxalert" name="maxalert"  style="font-size: 10px;color:#FF1919;font-weight: bold;"></span><div><textarea rows='+mockVar.curQuesBean.rows+' cols='+mockVar.curQuesBean.columns+' name="option"  autocomplete="off" id="answer" class="answer SAAnswer" spellcheck="false" onpaste="return false"; ondrop="return false;" onkeydown="disableTab(event); allowSAInputsForMultiLang(event); alphaWordLimit(event); " onkeyup="word_count();alphaWordLimit(event);" onMouseDown="alphaWordLimit(32)" style="width:'+widthSA+'">'+mockVar.curQuesBean.quesParam.answer+'</textarea></div> <div id="noOfWords" name="noOfWords" style="font-size: 12px;color:#2F72B7;font-weight: bold;display:'+displayWC+'">'+mockVar.curQuesBean.typedWord+' '+ $(globalXmlvar).find('wordTyped').text()+'</div></div>');
						}
					}
					wordCountCheck();
					setCursorPos($("#answer"), $('#answer').val().length);
					$('#clearResponse').hide();
					if(iOAP.secDetails[iOAP.curSection].isOptional == 'true' && !iOAP.secDetails[iOAP.curSection].isSelected){
						$('#answer').attr('disabled','disabled');
					}else{
						focusOnDiv();
					}
				}else if(mockVar.curQuesBean.keyboardType == 'AudioFile'){
				
				var textHighlighterGrpSecQuesId = mockVar.currentGrp+"_"+iOAP.curSection+"_"+iOAP.curQues+"_"+mockVar.langIndex+"_TextSelection";
	
				
					$('#answerArea').after('<div id="quesOuterDiv" class="compLaq" style="height: auto; overflow: hidden;"><div class="rightDiv" id="laq_text" style="height: 331px;"><div id="warning"></div><div style="padding:10px" class="compreText textHighlighter '+textHighlighterGrpSecQuesId+' '+(mockVar.curQuesBean.quesId)+'_QuesId" >'+mockVar.curQuesBean.quesLangBeans[mockVar.langIndex].quesText+'</div><span id="recordedAudioSpan"  style="display:none;padding:10px;"><span class="recordedAudioSpan">'+$(globalXmlvar).find('recordedAudioSpan').text()+'</span> <br><audio id="recordedAudio" width="500" controls style="padding-left:10px;"></audio></span><br><span id="recordingAlreadySaved" style="padding-left:10px;display:none;">'+$(globalXmlvar).find('recordingSavedSuccesfully').text()+'</span><span id="reRecordingNotAllowed" style="padding-left:10px;display:none;">'+$(globalXmlvar).find('reRecordingNotAllowed').text()+'</span></div><div id="LAQuesText" class="leftDiv" style="margin-left: 0px; height: 331px;"><div id="quesOuterDiv"></div><span id="audioRecordingStartClickMessage" style="padding:10px;">'+$(globalXmlvar).find('audioRecordingStartClickMessage').text()+'</span><span id="audioRecordingFailureMessage" style="padding:10px;display:none;color:red;">'+$(globalXmlvar).find('audioRecordingFailureMessage').text()+'</span><br><span class="timerText" style="padding-left:10px;">'+$(globalXmlvar).find('timerText').text()+'</span><span class="recordingTimer" style="padding-left: 5px;">00:00</span><span class="recordingLimit">/'+convertTime(parseFloat(mockVar.curQuesBean.SARecordingTime))+'</span><span class="mmssSpan">'+$(globalXmlvar).find('mmssSpan').text()+'</span><br><section class="audioRecordingButtonsPanel" style="padding: 5px;"><button id="start-recording" onclick="startAudioRecording();" class="recordingButtons"><i class="fa fa-microphone" aria-hidden="true"></i>'+' '+'<span class="start-recording">'+$(globalXmlvar).find('startRecording').text()+'</span></button><button id="pause-recording" disabled onclick="pauseAudioRecording();" class="recordingButtons"><i class="fa fa-pause" aria-hidden="true"></i>'+' '+$(globalXmlvar).find('pauseRecording').text()+'</button><button id="resume-recording" disabled onclick="resumeAudioRecording();" class="recordingButtons"><i class="fa fa-eject" style="transform: rotate(90deg);" aria-hidden="true"></i>'+' '+$(globalXmlvar).find('resumeRecording').text()+'</button><button id="stop-recording" disabled onclick="stopAudioRecording(true);" class="recordingButtons"><i class="fa fa-stop" aria-hidden="true"></i>'+' '+$(globalXmlvar).find('stopRecording').text()+'</button><button id="save-recording" disabled onclick="saveAudioRecording();" class="recordingButtons"><i class="fa fa-save" aria-hidden="true"></i>'+' '+$(globalXmlvar).find('saveRecording').text()+'</button></section><div id="audios-container" style="padding:10px;margin-left: auto; margin-right: auto;"></div></div></div>');
				}else if(mockVar.curQuesBean.keyboardType == 'VideoFile'){
				var textHighlighterGrpSecQuesId = mockVar.currentGrp+"_"+iOAP.curSection+"_"+iOAP.curQues+"_"+mockVar.langIndex+"_TextSelection";
	
					$('#answerArea').after('<div id="quesOuterDiv" class="compLaq" style="height: auto; overflow: hidden;"><div class="rightDiv" id="laq_text" style="height: 331px;"><div id="warning"></div><div style="padding:10px" class="compreText textHighlighter '+textHighlighterGrpSecQuesId+' '+(mockVar.curQuesBean.quesId)+'_QuesId">'+mockVar.curQuesBean.quesLangBeans[mockVar.langIndex].quesText+'</div><span id="recordedVideoSpan"  style="display:none;padding:10px;"><span class="recordedVideoSpan">'+$(globalXmlvar).find('recordedVideoSpan').text()+'</span><br><video id="recordedVideo" width="500" controls style="padding:10px;"></video></span><br><span id="recordingAlreadySaved" style="padding-left:10px;display:none;">'+$(globalXmlvar).find('recordingSavedSuccesfully').text()+'</span><span id="reRecordingNotAllowed" style="padding-left:10px;display:none;">'+$(globalXmlvar).find('reRecordingNotAllowed').text()+'</span></div><div id="LAQuesText" class="leftDiv" style="margin-left: 0px; height: 331px;"><div id="quesOuterDiv"></div><span id="videoRecordingStartClickMessage" style="padding-left:10px;">'+$(globalXmlvar).find('videoRecordingStartClickMessage').text()+'</span><span id="videoRecordingFailureMessage" style="padding:10px;display:none;color:red;">'+$(globalXmlvar).find('videoRecordingFailureMessage').text()+'</span><br><span class="timerText" style="padding-left:10px;">'+$(globalXmlvar).find('timerText').text()+'</span><span class="recordingTimer" style="padding-left: 5px;">00:00</span><span class="recordingLimit">/'+convertTime(parseFloat(mockVar.curQuesBean.SARecordingTime))+'</span><span class="mmssSpan">'+$(globalXmlvar).find('mmssSpan').text()+'</span><br><section class="videoRecordingButtonsPanel" style="padding: 5px;"><button id="start-recording" onclick="startVideoRecording();" class="recordingButtons"><i class="fa fa-video-camera" aria-hidden="true"></i>'+' '+'<span class="start-recording">'+$(globalXmlvar).find('startRecording').text()+'</span></button><button id="pause-recording" disabled onclick="pauseVideoRecording();" class="recordingButtons"><i class="fa fa-pause" aria-hidden="true"></i>'+' '+$(globalXmlvar).find('pauseRecording').text()+'</button><button id="resume-recording" disabled onclick="resumeVideoRecording();" class="recordingButtons"><i class="fa fa-eject" style="transform: rotate(90deg);" aria-hidden="true"></i>'+' '+$(globalXmlvar).find('resumeRecording').text()+'</button><button id="stop-recording" disabled onclick="stopVideoRecording(true);" class="recordingButtons"><i class="fa fa-stop" aria-hidden="true"></i>'+' '+$(globalXmlvar).find('stopRecording').text()+'</button><button id="save-recording" disabled onclick="saveVideoRecording();" class="recordingButtons"><i class="fa fa-save" aria-hidden="true"></i>'+' '+$(globalXmlvar).find('saveRecording').text()+'</button></section><div id="videos-container" style="padding:10px;margin-left: auto; margin-right: auto;"></div></div></div>');
				}
				else if(mockVar.curQuesBean.keyboardType == 'FileUpload'){
					var extension=mockVar.curQuesBean.allowedType;
					extension=extension.toLowerCase();	//restrict file upload for allowed file type
					if(extension=="image" || extension=="video" || extension=="audio"){
						extension=extension+"/*";
					}else if(extension=="document"){
						extension=".pdf,.doc,.docx,.xls,.xlsx";
					}else if(extension=="file"){
						extension=".zip,.7z";
					}
					$('#answerArea').after('<form id="data" method="post" enctype="multipart/form-data"><input id="uploadFile'+mockVar.curQuesBean.quesId+'" class= "fileUpdBrowse" placeholder="'+$(globalXmlvar).find('chooseFile').text()+'" disabled="disabled"  /><div class="fileUpload btn " style="line-height:40px"><span id="addFile">'+$(globalXmlvar).find('addFile').text()+'</span><input id="uploadBtn'+mockVar.curQuesBean.quesId+'" type="file" accept="'+extension+'" class="upload" name="myFile" onChange="FileChangeGroup(this,'+mockVar.curQuesBean.quesId+')" /></div><div id="typeAllowed">('+mockVar.curQuesBean.allowedExtensions+'  <span id="fileOnly"> '+$(globalXmlvar).find('fileOnly').text()+'</span><span id= "maxSize">'+$(globalXmlvar).find('maxSize').text()+'</span> '+mockVar.curQuesBean.allowedSize+' MB  )</div></form>');
					answeredFileQuestions("uploadFile"+mockVar.curQuesBean.quesId,mockVar.curQuesBean.quesParam.answer);
					if(iOAP.secDetails[iOAP.curSection].isOptional == 'true' && !iOAP.secDetails[iOAP.curSection].isSelected){
						$('#uploadBtn'+mockVar.curQuesBean.quesId).attr('disabled','disabled');
					}
				}
			}
		} else if(mockVar.curQuesBean.quesType == "PROGRAMMING TEST"){
			isGrpCompreDiv=false;
			if(chkIfMaxQuesCrossed() || iOAP.secDetails[iOAP.curSection].isOptional == 'true' && !iOAP.secDetails[iOAP.curSection].isSelected){
				editor = CodeMirror.fromTextArea(document.getElementById("code"), {
					lineNumbers: true,
					matchBrackets: true,
					readOnly : 'nocursor'
				});
			}else{
				editor = CodeMirror.fromTextArea(document.getElementById("code"), {
					lineNumbers: true,
					styleActiveLine: true,
					matchBrackets: true
				});
			}
			$('.progrmngBtn').show();
			$('.normalBtn').hide();
			if(mockVar.curQuesBean.programingStatus == 'CompiledSuccess'){
				compileSuccessMsg();
			}else if(mockVar.curQuesBean.programingStatus == 'ExecutedSuccess'){
				executionSuccessMsg();
			}
		}else if(mockVar.curQuesBean.quesType == "TYPING TEST"){
			isGrpCompreDiv=false;
			//focusOnDiv1();
			$("#row1 span:first").addClass('highlight');
			$('.questionTypeCont .marking-details').hide();
			$('.save_buttoncontainer').hide();
			$('.other_buttoncontainer').hide();
			$('.finalSubmit').hide();
			$('#finalSubmit').hide();
			$('.save_buttoncontainer_2').addClass('saveTyp');
			$('.subject-selection').hide();
			$('.subject-section-rightarrow').hide();
			$('.diff_type_notation_area_outer').hide();
			$('#rightSectionDiv2').hide();
			$('#quesPallet').hide();
			$('.sect').hide();
			$('.numberpanelQues').hide();
			$('.helpinstruction_div').show();
			$('.viewquestion_div').hide();
			$('.picons_scroll,.filter_section,#finalSubmitMbl,#savenextMbl').hide();
			if(mockVar.storeCandResponse==0)
				$('#viewProButton').show();
			$('.typingSubmit').show();
			$('#typingInstDiv').show();
			$('#showCalc').hide();
			$('.typKeybrdLayout').show();
			if(mockVar.curQuesBean.showErrorCount!==undefined && mockVar.curQuesBean.showErrorCount === "true"){
				$('.errorCount').show();
			}else{
				$('.errorCount').hide();
			}
			if(mockVar.curQuesBean.typingType == "UNRESTRICTED" && mockVar.curQuesBean.showBackspaceCount!==undefined && mockVar.curQuesBean.showBackspaceCount === "true"){
				$('.backspaceCount').show();
			}else{
				$('.backspaceCount').hide();
			}
			/***Temparory change ***/
			if(mockVar.curQuesBean.allowBackspace!==undefined && mockVar.curQuesBean.allowBackspace === "false"){
				$('.errorCount, .backspaceCount, .keyStrokesCount, .totalCount, .typedCount, .remainingCount, .unresInstru2').hide();
			}else{
				$('.keyStrokesCount, .totalCount, .typedCount, .remainingCount, .unresInstru2').show();
			}
			if(mockVar.curQuesBean.highlightCorrectIncorrectWord!==undefined && mockVar.curQuesBean.highlightCorrectIncorrectWord === "false"){
				$('.unresInstru3').hide();	
			}else
				$('.unresInstru3').show();	
			/***Temparory change ends***/
			if(mockVar.curQuesBean.showTypingDetails!==undefined && mockVar.curQuesBean.showTypingDetails === "true"){
				$('.collapsebel_panel').show();
			}else{
				$('.collapsebel_panel').hide();
			}
			if(mockVar.curQuesBean.typingType.toLowerCase() == 'restricted'){
				//$('#errorCount').show();
				$('#restrictedInstr').show();
				$('#unrestrictedInstr').hide();
				$('#stanographyInstr').hide();
				setCursorPos($(".typedAnswer"), $('.typedAnswer').val().length);
			}else if(mockVar.curQuesBean.typingType.toLowerCase() == 'unrestricted'){
				//$('#errorCount').hide();
				$('#restrictedInstr').hide();
				$('#unrestrictedInstr').hide();
				$('#stanographyInstr').hide();
				if(!mockVar.curQuesBean.paragraphDisplay){
					$('#stanographyInstr').show();
					$('#row1').hide();
					$('.typedAnswer').addClass('paragraphDisplay');
				}else{
					$('#unrestrictedInstr').show();
				}
				setCursorPos($(".typedAnswer"), $('.typedAnswer').val().length);
			}
		}else if(mockVar.curQuesBean.quesType == "MCQ"){
			isGrpCompreDiv=false;
			if(iOAP.secDetails[iOAP.curSection].isOptional == 'true' && !iOAP.secDetails[iOAP.curSection].isSelected){
				$(".MCQanswer").attr('disabled', true);
			}else{
				$(".MCQanswer").attr('disabled', false);
			}
		}else if(mockVar.curQuesBean.quesType == "MSQ"){
			isGrpCompreDiv=false;
			if(iOAP.secDetails[iOAP.curSection].isOptional == 'true' && !iOAP.secDetails[iOAP.curSection].isSelected){
				$(".MSQanswer").attr('disabled', true);
			}else{
				$(".MSQanswer").attr('disabled', false);
			}
		}
		if(mockVar.curQuesBean.comprehensionId != 0 || mockVar.curQuesBean.laqId != 0){
			var compreLaqCount= 0;
			var compreLaqID = 0;
			if(typeof(mockVar.compreLaqQues[compreLaqID])!= "undefined"){
				for(var j=0;j<mockVar.curSectionQuestions.length;j++){
					if(mockVar.curQuesBean.comprehensionId!=0){
						if(mockVar.curQuesBean.comprehensionId == mockVar.curSectionQuestions[j].comprehensionId){
							compreLaqCount++;
						}
					}else if(mockVar.curQuesBean.laqId!=0){
						if(mockVar.curQuesBean.laqId == mockVar.curSectionQuestions[j].laqId){
							compreLaqCount++;
						}
					}
				}
				for(var k=0;k<mockVar.compreLaqQues.length;k++){
					if(mockVar.curQuesBean.comprehensionId == mockVar.compreLaqQues[k].quesId){
						compreLaqID = k;
						break;
					}else if(mockVar.curQuesBean.laqId == mockVar.compreLaqQues[k].quesId){
						compreLaqID = k;
						break;
					}
				}
				if( typeof(mockVar.compreLaqQues[compreLaqID].groupComprehensionLaqQuestions) != "undefined" && mockVar.compreLaqQues[compreLaqID].groupComprehensionLaqQuestions != "" && ((mockVar.compreLaqQues[compreLaqID].groupComprehensionLaqQuestions == "true") && (mockVar.compreLaqQues[compreLaqID].quesId == mockVar.curQuesBean.laqId  || mockVar.compreLaqQues[compreLaqID].quesId == mockVar.curQuesBean.comprehensionId)) ){
					var curGroupCompreQues = iOAP.curQues;
					var additionalQuesType = mockVar.compreLaqQues[compreLaqID].additionalQuesType;
					if(additionalQuesType=="")
						isGrpCompreDiv=true;
					else 
						isGrpCompreDiv=false;
					for(var l=0;l<compreLaqCount;l++){
						if(iOAP.secDetails[iOAP.curSection].isOptional == 'true' && !iOAP.secDetails[iOAP.curSection].isSelected){
							if(iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesType == "MCQ")
								$(".MSQanswer").attr('disabled', true);
							else if(iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesType == "MSQ")
								$(".MCQanswer").attr('disabled', true);
							else if(iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesType == "SA"){
								if(iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].keyboardType == 'Alphanumeric'){
									wordCountCheckGroup("",iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesId);
									$("#alpha").remove();
								}else if(iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].keyboardType == 'FileUpload'){
									$('#answerArea'+iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesId).after('<form id="data" method="post" enctype="multipart/form-data"><input id="uploadFile'+iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesId+'" class= "fileUpdBrowse"  placeholder="'+$(globalXmlvar).find('chooseFile').text()+'" disabled="disabled" /><div class="fileUpload btn " style="line-height:40px"><span id="addFile">'+$(globalXmlvar).find('addFile').text()+'</span><input id="uploadBtn'+iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesId+'" type="file" class="upload" name="myFile" onChange="FileChangeGroup(this,'+iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesId+')" /></div><div id="typeAllowed">('+iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].allowedExtensions+ '<span id="fileOnly"> '+$(globalXmlvar).find('fileOnly').text()+'</span><span id= "maxSize">'+$(globalXmlvar).find('maxSize').text()+'</span>'+iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].allowedSize+' MB)</div></form>');
									answeredFileQuestions("uploadFile"+iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesId,iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesParam.answer);
								}
								else{
									$('#numericKeyBoardDiv'+iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesId).remove();
									$('#answerArea'+iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesId).after("<div style='padding-left: 4%;' id='numericKeyBoardDiv"+iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesId+"'><input type='text' id='answer"+iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesId+"' class='keyboardInput answer' value='"+iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesParam.answer+"' onclick='validateKeyboardNumeric(id)' /></div>");
									//triggerKeyboardGroup(1,iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesId);
								}
								$('#answer'+iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesId).attr('disabled','disabled');
								$('#uploadBtn'+iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesId).attr('disabled','disabled');
							}
						}else{
							if(iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesType == "MCQ")
								$(".MSQanswer").attr('disabled', false);
							else if(iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesType == "MSQ")
								$(".MCQanswer").attr('disabled', false);
							else if(iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesType == "SA"){
								if(iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].keyboardType == 'Alphanumeric'){
									wordCountCheckGroup("",iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesId);
									$("#alpha").remove();
								}else if(iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].keyboardType == 'FileUpload'){
									$('#answerArea'+iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesId).after('<form id="data" method="post" enctype="multipart/form-data"><input id="uploadFile'+iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesId+'" class= "fileUpdBrowse"  placeholder="'+$(globalXmlvar).find('chooseFile').text()+'" disabled="disabled" /><div class="fileUpload btn " style="line-height:40px"><span id="addFile">'+$(globalXmlvar).find('addFile').text()+'</span><input id="uploadBtn'+iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesId+'" type="file" class="upload" name="myFile" onChange="FileChangeGroup(this,'+iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesId+')" /></div><div id="typeAllowed" >('+iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].allowedExtensions+' <span id="fileOnly"> '+$(globalXmlvar).find('fileOnly').text()+'</span><span id= "maxSize">'+$(globalXmlvar).find('maxSize').text()+'</span>'+iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].allowedSize+' MB)</div></form>');
									answeredFileQuestions("uploadFile"+iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesId,iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesParam.answer);
								}
								else{
									$('#numericKeyBoardDiv'+iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesId).remove();
									if(additionalQuesType == undefined || additionalQuesType == "" || additionalQuesType !=="FITB"){
									//console.log("Not FITB");
									$('#answerArea'+iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesId).after("<div style='padding-left: 4%;' id='numericKeyBoardDiv"+iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesId+"'><input type='text' id='answer"+iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesId+"' class='keyboardInput answer' value='"+iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesParam.answer+"' onclick='validateKeyboardNumeric(id)' /></div>");
									triggerKeyboardGroup(1,iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesId);
									}
									if(additionalQuesType!==undefined && additionalQuesType!=="" && additionalQuesType=="FITB"){
										//$("#vKeyboard"+iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesId).remove();
										$("#vKeyboard"+iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesId).hide();
										//wordCountCheckGroup("",iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesId);
										}
								}
							}
							//	$('#answer'+mockVar.curQuesBean.quesId).attr('disabled','disabled');
						}
						curGroupCompreQues=curGroupCompreQues + 1;
					}
				}	else{
					isGrpCompreDiv=false;
					if(mockVar.curQuesBean.quesType == "SA" || mockVar.curQuesBean.quesType == "LA@@SA" || mockVar.curQuesBean.quesType == "COMPREHENSION@@SA"){
						// numeric keyboard
						if(mockVar.curQuesBean.keyboardType == 'Numeric'){
							//$('#numericKeyBoardDiv').remove();
							$('#answerArea').after("<div style='padding-left: 4%;' id='numericKeyBoardDiv'><input type='text' id='answer' class='keyboardInput answer' value='"+mockVar.curQuesBean.quesParam.answer+"'/></div>");
							triggerKeyboard(1);
							if(iOAP.secDetails[iOAP.curSection].isOptional == 'true' && !iOAP.secDetails[iOAP.curSection].isSelected){
								$('#answer').attr('disabled','disabled');
								$('#vKeyboard').remove();
							}
						}
						// alphanumeric textarea
						else if(mockVar.curQuesBean.keyboardType == 'Alphanumeric'){
							if(mockVar.curQuesBean.isEvaluationRequired == true){
								//textBoxWidth = Math.round(27/16*mockVar.curQuesBean.columns);
								$('#answerArea').after('<div style="padding-left: 2%;" id="alpha"><span id="maxalert" name="maxalert"  style="font-size: 10px;color:#FF1919;font-weight: bold;"></span><div> <input type="text" name="option"  autocomplete="off" spellcheck="false" style="height:45px;" id="answer" class="answer SAAnswer" onpaste="return false"; ondrop="return false;" onkeydown="disableTab(event); allowSAInputsForMultiLang(event); alphaWordLimit(event); " onkeyup="word_count();alphaWordLimit(event);" onMouseDown="alphaWordLimit(32);" value="'+mockVar.curQuesBean.quesParam.answer+'"></div> <div id="noOfWords" name="noOfWords" style="font-size: 12px;color:#2F72B7;font-weight: bold;display:'+displayWC+'">'+mockVar.curQuesBean.typedWord+' '+ $(globalXmlvar).find('wordTyped').text()+'</div></div>');
							}else{
								if(mockVar.curQuesBean.singleLineResponse!=undefined && mockVar.curQuesBean.singleLineResponse.toLowerCase() == "true"){
									//textBoxWidth = Math.round(27/16*mockVar.curQuesBean.columns);
									$('#answerArea').after('<div style="padding-left: 2%;" id="alpha"> <span id="maxalert" name="maxalert"  style="font-size: 10px;color:#FF1919;font-weight: bold;"></span><div> <input type="text" name="option"  autocomplete="off" spellcheck="false" style="height:45px;" id="answer" class="answer SAAnswer" onpaste="return false"; ondrop="return false;" onkeydown="disableTab(event); allowSAInputsForMultiLang(event); alphaWordLimit(event); " onkeyup="word_count();alphaWordLimit(event);" onMouseDown="alphaWordLimit(32);" value="'+mockVar.curQuesBean.quesParam.answer+'"></div><div id="noOfWords" name="noOfWords" style="font-size: 12px;color:#2F72B7;font-weight: bold;display:'+displayWC+'">'+mockVar.curQuesBean.typedWord+' '+ $(globalXmlvar).find('wordTyped').text()+'</div></div>');
								}else{
									widthSA="";
									if(mockVar.curQuesBean.rows==undefined || (mockVar.curQuesBean.rows == 10 && mockVar.curQuesBean.columns == 100)){
										mockVar.curQuesBean.rows = 10;
										mockVar.curQuesBean.columns = 100;
										widthSA = "97%";
									}
									$('#answerArea').after('<div style="padding-left: 2%;" id="alpha"> <span id="maxalert" name="maxalert"  style="font-size: 10px;color:#FF1919;font-weight: bold;"></span><div><textarea rows='+mockVar.curQuesBean.rows+' cols='+mockVar.curQuesBean.columns+' name="option"  autocomplete="off" id="answer" class="answer SAAnswer" spellcheck="false" onpaste="return false"; ondrop="return false;" onkeydown="disableTab(event); allowSAInputsForMultiLang(event); alphaWordLimit(event); " onkeyup="word_count();alphaWordLimit(event);" onMouseDown="alphaWordLimit(32)" style="width:'+widthSA+'">'+mockVar.curQuesBean.quesParam.answer+'</textarea></div><div id="noOfWords" name="noOfWords" style="font-size: 12px;color:#2F72B7;font-weight: bold;display:'+displayWC+'">'+mockVar.curQuesBean.typedWord+' '+ $(globalXmlvar).find('wordTyped').text()+'</div></div>');
								}
							}
							wordCountCheck();
							setCursorPos($("#answer"), $('#answer').val().length);
							$('#clearResponse').hide();
							if(iOAP.secDetails[iOAP.curSection].isOptional == 'true' && !iOAP.secDetails[iOAP.curSection].isSelected){
								$('#answer').attr('disabled','disabled');
							}else{
								focusOnDiv();
							}
						}else if(mockVar.curQuesBean.keyboardType == 'AudioFile'){
							$('#answerArea').after('<div id="viz"><canvas id="analyser" width="100" height="20"></canvas><canvas id="wavedisplay" width="100" height="20"></canvas></div><div id="controls"><img id="record" src="img/mic128.png" onclick="toggleRecording(this,'+mockVar.curQuesBean.quesId+');"></div><input type="hidden" id="saveAudio'+mockVar.curQuesBean.quesId+'">');
							//	window.addEventListener('load', initAudio );
							initAudio();
						}else if(mockVar.curQuesBean.keyboardType == 'FileUpload'){
							$('#answerArea').after('<form id="data" method="post" enctype="multipart/form-data"><input id="uploadFile'+mockVar.curQuesBean.quesId+'" class= "fileUpdBrowse" placeholder="'+$(globalXmlvar).find('chooseFile').text()+'" disabled="disabled"  /><div class="fileUpload btn " style="line-height:40px"><span id="addFile">'+$(globalXmlvar).find('addFile').text()+'</span><input id="uploadBtn'+mockVar.curQuesBean.quesId+'" type="file" class="upload" name="myFile" onChange="FileChangeGroup(this,'+mockVar.curQuesBean.quesId+')" /></div><div id="typeAllowed">('+mockVar.curQuesBean.allowedExtensions+'<span id="fileOnly"> '+$(globalXmlvar).find('fileOnly').text()+'</span><span id= "maxSize">'+$(globalXmlvar).find('maxSize').text()+'</span> '+mockVar.curQuesBean.allowedSize+' MB)</div></form>');
							answeredFileQuestions("uploadFile"+mockVar.curQuesBean.quesId,mockVar.curQuesBean.quesParam.answer);
							if(iOAP.secDetails[iOAP.curSection].isOptional == 'true' && !iOAP.secDetails[iOAP.curSection].isSelected){
								$('#uploadBtn'+mockVar.curQuesBean.quesId).attr('disabled','disabled');
							}
						}
					} 
				}
			}
		}
	}else{
		for(var k=0;k<mockVar.curSectionQuestions.length;k++){
			if(mockVar.curSectionQuestions[k].quesType == "SA" || mockVar.curSectionQuestions[k].quesType == "LA@@SA" || mockVar.curSectionQuestions[k].quesType == "COMPREHENSION@@SA"){
				if(mockVar.curSectionQuestions[k].keyboardType == 'Numeric'){
					$('#numericKeyBoardDiv'+mockVar.curSectionQuestions[k].quesId).remove();
					$('#answerArea'+mockVar.curSectionQuestions[k].quesId).after("<div style='padding-left: 4%;' id='numericKeyBoardDiv"+mockVar.curSectionQuestions[k].quesId+"'><input type='text' id='answer"+mockVar.curSectionQuestions[k].quesId+"' onfocus='saveActQuesGrp("+mockVar.curSectionQuestions[k].quesId+")' class='keyboardInput answer' value='"+mockVar.curSectionQuestions[k].quesParam.answer+"' onclick='validateKeyboardNumeric(id)' /></div>");
					triggerKeyboardGroup(1,mockVar.curSectionQuestions[k].quesId);
					if(iOAP.secDetails[iOAP.curSection].isOptional == 'true' && !iOAP.secDetails[iOAP.curSection].isSelected){
						$("#answer"+mockVar.curSectionQuestions[k].quesId).attr('disabled','disabled');
						$("#vKeyboard"+mockVar.curSectionQuestions[k].quesId).remove();
					}else{
						$("#vKeyboard"+mockVar.curSectionQuestions[k].quesId).show();
					}
				}else if(mockVar.curSectionQuestions[k].keyboardType == 'Alphanumeric'){
					wordCountCheckGroup("",mockVar.curSectionQuestions[k].quesId);
					word_countGroup(mockVar.curSectionQuestions[k].quesId);
					if(iOAP.secDetails[iOAP.curSection].isOptional == 'true' && !iOAP.secDetails[iOAP.curSection].isSelected){
						$('#answer'+mockVar.curSectionQuestions[k].quesId).attr('disabled','disabled');
					}
				}else if(mockVar.curSectionQuestions[k].keyboardType == 'FileUpload'){
					$('#answerArea'+mockVar.curSectionQuestions[k].quesId).after('<form id="data" method="post" enctype="multipart/form-data"><input id="uploadFile'+mockVar.curSectionQuestions[k].quesId+'" class= "fileUpdBrowse"  placeholder="'+$(globalXmlvar).find('chooseFile').text()+'" disabled="disabled" /><div class="fileUpload btn " style="line-height:40px"><span id="addFile">'+$(globalXmlvar).find('addFile').text()+'</span><input id="uploadBtn'+mockVar.curSectionQuestions[k].quesId+'" type="file" class="upload" name="myFile" onChange="FileChangeGroup(this,'+mockVar.curSectionQuestions[k].quesId+')" /></div><div id="typeAllowed">('+mockVar.curSectionQuestions[k].allowedExtensions+'<span id="fileOnly"> '+$(globalXmlvar).find('fileOnly').text()+'</span><span id= "maxSize">'+$(globalXmlvar).find('maxSize').text()+'</span>'+mockVar.curSectionQuestions[k].allowedSize+' MB)</div></form>'); 
					answeredFileQuestions("uploadFile"+mockVar.curSectionQuestions[k].quesId,mockVar.curSectionQuestions[k].quesParam.answer);
					if(iOAP.secDetails[iOAP.curSection].isOptional == 'true' && !iOAP.secDetails[iOAP.curSection].isSelected){
						$('#uploadBtn'+mockVar.curSectionQuestions[k].quesId).attr('disabled','disabled');
					}
				}
			}else if(mockVar.curSectionQuestions[k].quesType == "MCQ"){
				if(iOAP.secDetails[iOAP.curSection].isOptional == 'true' && !iOAP.secDetails[iOAP.curSection].isSelected){
					$(".MCQanswer").attr('disabled', true);
				}else{
					$(".MCQanswer").attr('disabled', false);
				}
			}else if(mockVar.curSectionQuestions[k].quesType == "MSQ"){
				if(iOAP.secDetails[iOAP.curSection].isOptional == 'true' && !iOAP.secDetails[iOAP.curSection].isSelected){
					$(".MSQanswer").attr('disabled', true);
				}else{
					$(".MSQanswer").attr('disabled', false);
				}
			}
		}
	}
	$(".almVideo").remove();
	$(".almAudio").remove();
	//activateAudioPlayer();
	//activateVideoPlayer();
	palyVideo();
	grpAllMultimediaPlayedAtOnceCount=0;
	if(isTempTextHighlighterEnabled){
	//console.log("Rakesh--"+isTempTextHighlighterEnabled);
	setTimeout(function(){$(".selectmark").click();},50);
	}

}

function scrollIntoView(element, container) {
	try{
		// var containerTop = $(container).scrollTop();
		// var containerBottom = containerTop + $(container).height();
		var elemTop = element.offsetTop;
		$(container).scrollTop(elemTop - $(element).height());
	}catch(err){

	}
}

function scrollHorizontalView(element, container) {
	try{
		// var containerTop = $(container).scrollTop();
		// var containerBottom = containerTop + $(container).height();
		var elemTop = element.offsetLeft;
		$(container).scrollLeft(elemTop - $(element).width());
	}catch(err){

	}
}

/*function isScrolledIntoView(elem){
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}*/

/*function chkIfMaxQuesCrossed(){
	var proceed = false;
	//var ques=iOAP.sections[iOAP.curSection][iOAP.viewLang[iOAP.curSection][iOAP.curQues].langID][iOAP.curQues];
//	for(var i=0;i<mockVar.curSectionQuestions;i++){
	var questionStatus = mockVar.curQuesBean.quesParam.status ;
	var quesAnswer = mockVar.curQuesBean.quesParam.answer ;
	var section = iOAP.secDetails[iOAP.curSection];
	var quesToBeConsidered = parseInt(section.answered);
	var hasOptionalQuestion = section.hasOptionalQuestion;
	if(section.maxOptQuesToAns != "" && section.maxOptQuesToAns!=iOAP.secDetails[iOAP.curSection].questions.length){
		if(mockVar.isMarkedForReviewConsidered == "YES"){
			var counter = 0;
			for(i=0;i<iOAP.secDetails[iOAP.curSection].questions.length;i++){
				var quesStatus=iOAP.secDetails[iOAP.curSection].questions[i].quesParam.status ;
				var answer = iOAP.secDetails[iOAP.curSection].questions[i].quesParam.answer;
				if(quesStatus=="markedAndAnswered" && !(answer == null || answer == '')){
					counter++;
				}
			}
			quesToBeConsidered += counter;
		}
		var markedAnsQuesStatus = mockVar.isMarkedForReviewConsidered == "YES" && questionStatus=="markedAndAnswered" && !(quesAnswer == null || quesAnswer == '');
		if(hasOptionalQuestion=='true' && quesToBeConsidered==section.maxOptQuesToAns && !(questionStatus=="answered" || markedAnsQuesStatus)){
			fillMaxOptQuesCrossed(quesToBeConsidered,iOAP.secDetails[iOAP.curSection].questions.length);
			proceed = true;
		}
	}
	return proceed;
	//}
}*/

function chkIfMaxQuesCrossed(){
	var proceed = false;
	//var ques=iOAP.sections[iOAP.curSection][iOAP.viewLang[iOAP.curSection][iOAP.curQues].langID][iOAP.curQues];
//	for(var i=0;i<mockVar.curSectionQuestions;i++){
	var questionStatus = mockVar.curQuesBean.quesParam.status ;
	var quesAnswer = mockVar.curQuesBean.quesParam.answer ;
	var section = iOAP.secDetails[iOAP.curSection];
	var quesToBeConsidered = parseInt(section.answered);
	var hasOptionalQuestion = section.hasOptionalQuestion;
	if(section.maxOptQuesToAns != "" && section.maxOptQuesToAns!=iOAP.secDetails[iOAP.curSection].questions.length){
		if(mockVar.isMarkedForReviewConsidered == "YES"){
			var counter = 0;
			for(var i=0;i<iOAP.secDetails[iOAP.curSection].questions.length;i++){
				var quesStatus=iOAP.secDetails[iOAP.curSection].questions[i].quesParam.status ;
				var answer = iOAP.secDetails[iOAP.curSection].questions[i].quesParam.answer;
				if(quesStatus=="markedAndAnswered" && !(answer == null || answer == '')){
					counter++;
				}
			}
			quesToBeConsidered += counter;
		}
		var markedAnsQuesStatus = mockVar.isMarkedForReviewConsidered == "YES" && questionStatus=="markedAndAnswered" && !(quesAnswer == null || quesAnswer == '');
		if(iOAP.secDetails[iOAP.curSection].groupAllQuestions != "undefined" && iOAP.secDetails[iOAP.curSection].groupAllQuestions != "" && iOAP.secDetails[iOAP.curSection].groupAllQuestions == "true" ){
			if(hasOptionalQuestion=='true' && quesToBeConsidered==section.maxOptQuesToAns){
				fillMaxOptQuesCrossedGroup(quesToBeConsidered,iOAP.secDetails[iOAP.curSection].questions.length);
				proceed = true;
			}
		}else{
			if(hasOptionalQuestion=='true' && quesToBeConsidered==section.maxOptQuesToAns && !(questionStatus=="answered" || markedAnsQuesStatus)){
				fillMaxOptQuesCrossed(quesToBeConsidered,iOAP.secDetails[iOAP.curSection].questions.length);
				proceed = true;
			}
		}
	}
	return proceed;
	//}
}

function bindCharCode(){
	$('input').bind('keydown',function(event){
		var code = (event.keyCode ? event.keyCode : event.which); 
		if(code == 8){
			$(this).val($(this).val().substring(0,$(this).val().length -1));
		}else if(!((code > 44 && code < 58) || (code > 64 && code < 91) || (code>94 && code<123) || code==43 || code == 16 || code == 32)){
			return false;
		}
	});
}

function applyKeyboard(){
	var div = document.getElementById('currentQues');
	var input = div.getElementsByTagName('input');
	if (input.length) {
		VKI_attach(input[0]);
	}
}

function fillMCQQuesGroup(quesTxt,quesOpts,answer,curQuestion,qNo,quesId){
    var textHighlighterGrpSecQuesId = mockVar.currentGrp+"_"+iOAP.curSection+"_"+qNo+"_"+mockVar.langIndex+"_TextSelection";
	var str = "<div id='quesAnsContent"+curQuestion.quesId+"' class='Ans_Area' style='clear:both;'>";
	if(typeof(curQuestion.singleLineQuestionOption) == "undefined" || curQuestion.singleLineQuestionOption == "" || curQuestion.singleLineQuestionOption == "false" ){
		str += "<div class='groupQuestion textHighlighter "+textHighlighterGrpSecQuesId+" "+quesId+"_QuesId '  style='width:98%;margin-left:5px;font-family:Arial,verdana,helvetica,sans-serif;padding-bottom:10px;padding-top:10px;'>";
		if(typeof(curQuestion.displayQuestionNo) == "undefined" || curQuestion.displayQuestionNo == "" ||  curQuestion.displayQuestionNo == "true" )
			str +="<span>"+(qNo+1)+"</span>.";
		str += quesTxt+ "</div>";
		str += "<div style='width:100%;font-family:Arial,verdana,helvetica,sans-serif;margin-top:5px;'>";
		var answers = answer.split(",");
		if(mockVar.showOptionsHorizontally)
			str+= '<div style="padding:2px 10px;white-space:nowrap">';
		for(var i=0;i<quesOpts.length;i++){
			if(!mockVar.showOptionsHorizontally)
				str+= '<label>';
				else
				str += '<label style="clear:none">';
			str += "<span><input type='radio' onMouseDown='this.check = this.checked'  onclick='radioCheckUncheck(this,"+curQuestion.quesId+")' class='answer MCQanswer' name='answers"+curQuestion.quesId+"' value='"+quesOpts[i].optId+"' ";
			for(var j=0;j<answers.length;j++){
				if(answers[j]!="" && quesOpts[i].optId==answers[j])
					str += "checked";
			}
			str +="/> </span><span style='font-family:Arial,verdana,helvetica,sans-serif;width:95%;vertical-align:middle;'>"+quesOpts[i].optLangBean[mockVar.langIndex].optText+" </span>";
			//if(!mockVar.showOptionsHorizontally)
				str+= '</label>';
		}
		if(mockVar.showOptionsHorizontally)
			str+= '</div>';
		str += "</div>";
	}else{
		str += "<div class='groupQuestion textHighlighter "+textHighlighterGrpSecQuesId+" "+quesId+"_QuesId'  style='width:98%;margin-left:5px;font-family:Arial,verdana,helvetica,sans-serif;padding-bottom:10px;padding-top:10px;white-space:nowrap;'>";
		if(curQuestion.displayQuestionNo == "true" || curQuestion.displayQuestionNo == "" || typeof(curQuestion.displayQuestionNo) == "undefined")
			str +="<span>"+(qNo+1)+"</span>.";
		str +=quesTxt;
		var answers = answer.split(",");
		str+= ' <span class="singleLineOptions">';
		for(var i=0;i<quesOpts.length;i++){
			str += "<label style='float:none;display:inline'><span><input type='radio' onclick='radioCheckUncheck(this,"+curQuestion.quesId+")' class='answer MCQanswer' name='answers"+curQuestion.quesId+"' value='"+quesOpts[i].optId+"' ";
			for(var j=0;j<answers.length;j++){
				if(answers[j]!="" && quesOpts[i].optId==answers[j])
					str += "checked";
			}
			str +="/> </span><span style='font-family:Arial,verdana,helvetica,sans-serif;width:95%;vertical-align:middle;'>"+quesOpts[i].optLangBean[mockVar.langIndex].optText+" </span></label>";
			//if(!mockVar.showOptionsHorizontally)
			str+= "<label style='float:none;display:inline' class='normalCursor'><span>&nbsp;</span></label>";
		}
		str += "</span></div>";
	}
	str +="</div>";
	return str;
}

function fillMCQQues(quesTxt,quesOpts,answer){
	var textHighlighterGrpSecQuesId = mockVar.currentGrp+"_"+iOAP.curSection+"_"+iOAP.curQues+"_"+mockVar.langIndex+"_TextSelection";
	var str = '<div id="quesAnsContent" class="Ans_Area">';
	if(mockVar.curQuesBean.singleLineQuestionOption == "false" || mockVar.curQuesBean.singleLineQuestionOption == "" || typeof(mockVar.curQuesBean.singleLineQuestionOption) == "undefined"){
		str += "<div class='textHighlighter "+textHighlighterGrpSecQuesId+" "+(mockVar.curQuesBean.quesId)+"_QuesId'  style='width:98%;margin-left:5px;font-family:Arial,verdana,helvetica,sans-serif;padding-bottom:10px;padding-top:10px;'> "+quesTxt+ "</div>";
		str += "<div style='width:100%;font-family:Arial,verdana,helvetica,sans-serif;margin-top:5px;'><div>";
		var answers = answer.split(",");
		if(mockVar.showOptionsHorizontally)
			str+= '<div style="padding:2px 10px;white-space:nowrap">';
		for(var i=0;i<quesOpts.length;i++){
			if(!mockVar.showOptionsHorizontally)
				str+= '<label>';
				else
				str += '<label style="clear:none">';
			str += "<span><input type='radio'  onclick='radioCheckUncheck(this)' class='answer MCQanswer' name='answers' value='"+quesOpts[i].optId+"' ";
			for(var j=0;j<answers.length;j++){
				if(answers[j]!="" && quesOpts[i].optId==answers[j])
					str += "checked";
			}
			str +="/> </span><span style='font-family:Arial,verdana,helvetica,sans-serif;width:95%;vertical-align:middle;'>"+quesOpts[i].optLangBean[mockVar.langIndex].optText+" </span>";
			//if(!mockVar.showOptionsHorizontally)
				str+= '</label>';
		}
		if(mockVar.showOptionsHorizontally)
			str+= '</div>';
		str += "</div></div>";
		//$(".leftDiv").css("white-space","");
	}else{
		str += "<div class='textHighlighter "+textHighlighterGrpSecQuesId+" "+(mockVar.curQuesBean.quesId)+"_QuesId'  style='width:98%;margin-left:5px;font-family:Arial,verdana,helvetica,sans-serif;padding-bottom:10px;padding-top:10px;white-space:nowrap'> "+quesTxt;
		var answers = answer.split(",");
		str+= ' <span class="singleLineOptions">';
		for(var i=0;i<quesOpts.length;i++){
			str += "<label style='float:none;display:inline'><span><input type='radio' onclick='radioCheckUncheck(this)' class='answer MCQanswer' name='answers' value='"+quesOpts[i].optId+"' ";
			for(var j=0;j<answers.length;j++){
				if(answers[j]!="" && quesOpts[i].optId==answers[j])
					str += "checked";
			}
			str +="/> </span><span style='font-family:Arial,verdana,helvetica,sans-serif;width:95%;vertical-align:middle;'>"+quesOpts[i].optLangBean[mockVar.langIndex].optText+" </span></label>";
			//if(!mockVar.showOptionsHorizontally)
			str+= "<label style='float:none;display:inline' class='normalCursor'><span>&nbsp;</span></label>";
		}
		str += "</span></div>";
		//	$(".leftDiv").css("white-space","nowrap");
	}
	str +='</div>';
	return str;

}

function fillMSQQuesGroup(quesTxt,quesOpts,answer,curQuestion,qNo,quesId){
	var textHighlighterGrpSecQuesId = mockVar.currentGrp+"_"+iOAP.curSection+"_"+qNo+"_"+mockVar.langIndex+"_TextSelection";
	var answers = answer.split(",");
	var str = "<div id='quesAnsContent"+curQuestion.quesId+"' class='Ans_Area' style='clear:both;'>";
	if(curQuestion.singleLineQuestionOption == "false" || curQuestion.singleLineQuestionOption == "" || typeof(curQuestion.singleLineQuestionOption) == "undefined"){
		str += "<div class='groupQuestion textHighlighter "+textHighlighterGrpSecQuesId+" "+quesId+"_QuesId'  style='width:98%;margin-left:5px;font-family:Arial,verdana,helvetica,sans-serif;padding-bottom:10px;padding-top:10px'>";
		if(curQuestion.displayQuestionNo == "true" || curQuestion.displayQuestionNo == "" || typeof(curQuestion.displayQuestionNo) == "undefined")
			str +="<span>"+(qNo+1)+"</span>.";
		str += quesTxt+ "</div>";
		str += "<div style='width:100%;font-family:Arial,verdana,helvetica,sans-serif;margin-top:5px;'>";
		if(mockVar.showOptionsHorizontally)
			str += '<div style="padding:2px 10px;white-space:nowrap">';
		for(var i=0;i<quesOpts.length;i++){
			if(!mockVar.showOptionsHorizontally)
				str += '<label>';
				else
				str += '<label style="clear:none">';
			str += "<span><input type='checkbox' class='answer MSQanswer' name='answers"+curQuestion.quesId+"' onclick='saveActQuesGrp("+curQuestion.quesId+")' value='"+quesOpts[i].optId+"' ";
			for(var j=0;j<answers.length;j++){
				if(answers[j]!="" && quesOpts[i].optId==answers[j])
					str += "checked";
			}
			str += "/> </span><span style='font-family:Arial,verdana,helvetica,sans-serif;width:95%;vertical-align:middle;'>"+quesOpts[i].optLangBean[mockVar.langIndex].optText+" </span>";
			//if(!mockVar.showOptionsHorizontally)
				str+= '</label>';
		}
		if(mockVar.showOptionsHorizontally)
			str+= '</div>';
		str += "</div>";
	}else {
		str += "<div class='groupQuestion textHighlighter "+textHighlighterGrpSecQuesId+" "+quesId+"_QuesId'  style='width:98%;margin-left:5px;font-family:Arial,verdana,helvetica,sans-serif;padding-bottom:10px;padding-top:10px;white-space:nowrap'>";
		if(curQuestion.displayQuestionNo == "true" || curQuestion.displayQuestionNo == "" || typeof(curQuestion.displayQuestionNo) == "undefined")
			str +="<span>"+(qNo+1)+"</span>.";
		str +=quesTxt;
		str += ' <span class="singleLineOptions">';
		for(var i=0;i<quesOpts.length;i++){
			str += "<label style='float:none;display:inline'><span><input type='checkbox' class='answer MSQanswer' onclick='saveActQuesGrp("+curQuestion.quesId+")' name='answers"+curQuestion.quesId+"' value='"+quesOpts[i].optId+"' ";
			for(var j=0;j<answers.length;j++){
				if(answers[j]!="" && quesOpts[i].optId==answers[j])
					str += "checked";
			}
			str += "/> </span><span style='font-family:Arial,verdana,helvetica,sans-serif;width:95%;vertical-align:middle;'>"+quesOpts[i].optLangBean[mockVar.langIndex].optText+" </span></label>";
			//if(!mockVar.showOptionsHorizontally)
			str+= "<label style='float:none;display:inline' class='normalCursor'><span>&nbsp;</span></label>";
		}
		str+= '</span></div>';
	}
	str +="</div>";
	return str;
}
function fillMSQQues (quesTxt,quesOpts,answer){
	var textHighlighterGrpSecQuesId = mockVar.currentGrp+"_"+iOAP.curSection+"_"+iOAP.curQues+"_"+mockVar.langIndex+"_TextSelection";
	var answers = answer.split(",");
	var str = "<div id='quesAnsContent' class='Ans_Area' >";
	if(mockVar.curQuesBean.singleLineQuestionOption == "false" || mockVar.curQuesBean.singleLineQuestionOption == "" || typeof(mockVar.curQuesBean.singleLineQuestionOption) == "undefined"){
		str += "<div class='textHighlighter "+textHighlighterGrpSecQuesId+" "+(mockVar.curQuesBean.quesId)+"_QuesId'  style='width:98%;margin-left:5px;font-family:Arial,verdana,helvetica,sans-serif;padding-bottom:10px;padding-top:10px;'> "+quesTxt+ "</div>";
		str += "<div style='width:100%;font-family:Arial,verdana,helvetica,sans-serif;margin-top:5px;'><div>";
		if(mockVar.showOptionsHorizontally)
			str += '<div style="padding:2px 10px;white-space:nowrap">';
		for(var i=0;i<quesOpts.length;i++){
			if(!mockVar.showOptionsHorizontally)
				str += '<label>';
			else
				str += '<label style="clear:none">';
			str += "<span><input type='checkbox' class='answer MSQanswer' name='answers' value='"+quesOpts[i].optId+"' ";
			for(var j=0;j<answers.length;j++){
				if(answers[j]!="" && quesOpts[i].optId==answers[j])
					str += "checked";
			}
			str += "/> </span><span style='font-family:Arial,verdana,helvetica,sans-serif;width:95%;vertical-align:middle;'>"+quesOpts[i].optLangBean[mockVar.langIndex].optText+" </span>";
			//if(!mockVar.showOptionsHorizontally)
				str+= '</label>';
		}
		if(mockVar.showOptionsHorizontally)
			str+= '</div>';
		str += "</div></div>";
		//$(".leftDiv").css("white-space","");
	}else{
		str += "<div class='textHighlighter "+textHighlighterGrpSecQuesId+" "+(mockVar.curQuesBean.quesId)+"_QuesId'  style='width:98%;margin-left:5px;font-family:Arial,verdana,helvetica,sans-serif;padding-bottom:10px;padding-top:10px;white-space:nowrap'> "+quesTxt;
		str += ' <span class="singleLineOptions">';
		for(var i=0;i<quesOpts.length;i++){
			str += "<label style='float:none;display:inline'><span><input type='checkbox' class='answer MSQanswer' name='answers' value='"+quesOpts[i].optId+"' ";
			for(var j=0;j<answers.length;j++){
				if(answers[j]!="" && quesOpts[i].optId==answers[j])
					str += "checked";
			}
			str += "/> </span><span style='font-family:Arial,verdana,helvetica,sans-serif;width:95%;vertical-align:middle;'>"+quesOpts[i].optLangBean[mockVar.langIndex].optText+" </span></label>";
			//if(!mockVar.showOptionsHorizontally)
			str+= "<label style='float:none;display:inline' class='normalCursor'><span>&nbsp;</span></label>";

		}
		str+= '</span></div>';
		//$(".leftDiv").css("white-space","nowrap");
	}
	str +="</div>";
	return str;

}

function fillSAQuesGroup(quesTxt,answer,curQuestion,qNo,quesId){
	var textHighlighterGrpSecQuesId = mockVar.currentGrp+"_"+iOAP.curSection+"_"+qNo+"_"+mockVar.langIndex+"_TextSelection";
	var displayWCG = "", widthSAG = "";
	//var textBoxWidth = "";

	if(curQuestion.wordCountVisible!=undefined && curQuestion.wordCountVisible.toLowerCase() == "true"){
		displayWCG = "block";
	}else{
		displayWCG = "none";
	}
	if(curQuestion.rows==undefined || (curQuestion.rows === 10 && curQuestion.columns === 100)){
		curQuestion.rows = 10;
		curQuestion.columns = 100;
		widthSAG = "97%";
	}
	var str = "<div id='quesAnsContent"+curQuestion.quesId+"' class='Ans_Area' style='clear:both;'>";
	str += "<div class='groupQuestion textHighlighter "+textHighlighterGrpSecQuesId+" "+quesId+"_QuesId'   style='width:98%;margin-left:5px;font-family:Arial,verdana,helvetica,sans-serif;padding-bottom:10px;padding-top:10px'>";
	if(curQuestion.displayQuestionNo == "true" || curQuestion.displayQuestionNo == "" || typeof(curQuestion.displayQuestionNo) == "undefined")
		str +="	<span>"+(qNo+1)+"</span>.";
	str +=quesTxt+ "</div>";
	if(curQuestion.keyboardType == 'Numeric'){
		str += "<div id='answerArea"+curQuestion.quesId+"' style='width:100%;font-family:Arial,verdana,helvetica,sans-serif;'></div></div>";
		/*$('#numericKeyBoardDiv'+curQuestion.quesId).remove();
			str += "<div style='padding-left: 4%;' id='numericKeyBoardDiv"+curQuestion.quesId+"'><input type='text' id='answerNum"+curQuestion.quesId+"' class='keyboardInput answer' value='"+curQuestion.quesParam.answer+"'/></div>";
			triggerKeyboard(1,"answerNum"+curQuestion.quesId);*/
	}else if(curQuestion.keyboardType == 'Alphanumeric'){
		str += "<div id='answerArea' style='width:100%;font-family:Arial,verdana,helvetica,sans-serif;'></div>";
		if(curQuestion.isEvaluationRequired == true){
			//textBoxWidth = Math.round(27/16*curQuestion.columns)
			str += '<div style="padding-left: 2%;padding-bottom:1em;"><span id="maxalert'+curQuestion.quesId+'" name="maxalert"  style="font-size: 10px;color:#FF1919;font-weight: bold;"></span><div> <input type="text" name="option"  autocomplete="off" spellcheck="false" id="answer'+curQuestion.quesId+'" class="answer SAAnswer" style="height:30px;" onpaste="return false"; ondrop="return false;" onfocus="saveActQuesGrp('+curQuestion.quesId+')" onkeydown="disableTab(event); allowSAInputsForMultiLang(event); alphaWordLimitGroup(event,'+curQuestion.quesId+'); " onkeyup="word_countGroup('+curQuestion.quesId+');alphaWordLimitGroup(event,'+curQuestion.quesId+');" value="'+curQuestion.quesParam.answer+'"></div> <div id="noOfWords'+curQuestion.quesId+'" name="noOfWords" style="font-size: 12px;color:#2F72B7;font-weight: bold;display:'+displayWCG+'">'+curQuestion.typedWord+' '+ $(globalXmlvar).find('wordTyped').text()+'</div></div></div>';
		}else{
			if(curQuestion.singleLineResponse!=undefined && curQuestion.singleLineResponse.toLowerCase() == "true"){
				//textBoxWidth = Math.round(27/16*curQuestion.columns)
				str += '<div style="padding-left: 2%;padding-bottom:1em;"><span id="maxalert'+curQuestion.quesId+'" name="maxalert"  style="font-size: 10px;color:#FF1919;font-weight: bold;"></span><div> <input type="text" name="option" spellcheck="false" autocomplete="off" id="answer'+curQuestion.quesId+'" class="answer SAAnswer" style="height:30px;" onpaste="return false"; onfocus="saveActQuesGrp('+curQuestion.quesId+')" ondrop="return false;" onkeydown="disableTab(event); allowSAInputsForMultiLang(event); alphaWordLimitGroup(event,'+curQuestion.quesId+'); " onkeyup="word_countGroup('+curQuestion.quesId+');alphaWordLimitGroup(event,'+curQuestion.quesId+');" value="'+curQuestion.quesParam.answer+'"></div><div id="noOfWords'+curQuestion.quesId+'" name="noOfWords" style="font-size: 12px;color:#2F72B7;font-weight: bold;display:'+displayWCG+'">'+curQuestion.typedWord+' '+ $(globalXmlvar).find('wordTyped').text()+'</div></div></div>';
			}else{
				str += '<div style="padding-left: 2%;padding-bottom:1em;"> <span id="maxalert'+curQuestion.quesId+'" name="maxalert"  style="font-size: 10px;color:#FF1919;font-weight: bold;"></span><div> <textarea rows='+curQuestion.rows+' cols='+curQuestion.columns+' name="option"  autocomplete="off" id="answer'+curQuestion.quesId+'" class="answer SAAnswer" spellcheck="false" onpaste="return false" onfocus="saveActQuesGrp('+curQuestion.quesId+')" ondrop="return false;" onkeydown="disableTab(event); allowSAInputsForMultiLang(event); alphaWordLimitGroup(event,'+curQuestion.quesId+'); " onkeyup="word_countGroup('+curQuestion.quesId+');alphaWordLimitGroup(event,'+curQuestion.quesId+');" style="width:'+widthSAG+'">'+curQuestion.quesParam.answer+'</textarea></div><div id="noOfWords'+curQuestion.quesId+'" name="noOfWords" style="font-size: 12px;color:#2F72B7;font-weight: bold;display:'+displayWCG+'">'+curQuestion.typedWord+' '+ $(globalXmlvar).find('wordTyped').text()+'</div></div></div>';
			}

		}
	}else{
		str += "<div id='answerArea"+curQuestion.quesId+"' style='width:100%;font-family:Arial,verdana,helvetica,sans-serif;margin-top:5px;'></div></div>";

	}
	return str;
}
function fillSAQues(quesTxt,answer){
	var textHighlighterGrpSecQuesId = mockVar.currentGrp+"_"+iOAP.curSection+"_"+iOAP.curQues+"_"+mockVar.langIndex+"_TextSelection";
	var str = "<div id='quesAnsContent' class='Ans_Area'>";
	if(mockVar.curQuesBean.keyboardType != "AudioFile" && mockVar.curQuesBean.keyboardType != "VideoFile")
	str += "<div class='textHighlighter "+textHighlighterGrpSecQuesId+" "+(mockVar.curQuesBean.quesId)+"_QuesId'  style='width:98%;margin-left:5px;font-family:Arial,verdana,helvetica,sans-serif;padding-bottom:10px;padding-top:10px'> "+quesTxt+ "</div>";
	str += "<div id='answerArea' style='width:100%;font-family:Arial,verdana,helvetica,sans-serif;margin-top:5px;'></div></div>";
	return str;
}

function fillSEQQues(compQues){
	var curQues = iOAP.curQues,
	str='',
	curSection = iOAP.secDetails[iOAP.curSection],
	compQuesText = compQues.langData[mockVar.langIndex].quesText,
	quesOpts = curSection.questions[curQues].options,
	opnIdFound = false,opnIdValue=0;
	var textHighlighterGrpSecQuesId = mockVar.currentGrp+"_"+iOAP.curSection+"_"+(mockVar.compreLaqQues.inArray(compQues.quesId, 'quesId'))+"_"+mockVar.langIndex+"_CompreTextSelection";
	
	str += '<div id="quesOuterDiv" style="clear:both">';
	str += '<div class="leftDiv" style="width:99.6%">';
	str +='<div align="right" style="float:right;"><a  href="javascript:;" id="scrollToBottom" title="Scroll Down" onclick="scrollToBottom()"><img width="28" height="28" align="right" alt="Scroll Down" src="images/Down.png" style=""></a></div>';
	str += "<div class='Ans_Area' style='clear:both;padding:5px'>";
	str += '<div class="compreText textHighlighter '+textHighlighterGrpSecQuesId+' '+(compQues.quesId)+'_QuesId">'+compQuesText+'</div>';
	str +='<div class="que no-sec"><div class="que-col-full que-drag"><ol id="sortable" class="ui-sortable">';
	for(var i=0;i<quesOpts.length;i++){
		str += '<li class="ui-state-default" id="answers'+curSection.questions[curQues].quesId+'">';
		slectedOpnId = curSection.questions[curQues].quesParam.selectedOptId;
		for(var j=0;j<quesOpts.length;j++){
			if(slectedOpnId!="" && quesOpts[j].optId==slectedOpnId){
				opnIdFound = true;
				opnIdValue = j;
				break;
			}
		}
		if(opnIdFound === true){
			str += '<span value="'+quesOpts[opnIdValue].optId+'">'+quesOpts[opnIdValue].optLangBean[mockVar.langIndex].optText+'</span></li>';
			opnIdFound = false;  
		}else{
			str += '<span value="'+quesOpts[i].optId+'">'+quesOpts[i].optLangBean[mockVar.langIndex].optText+'</span></li>';
		}
		curQues++;	
	}
	str += '</ol></div></div></div><div align="right" style="float:right;clear:both"><a onclick="scrollToTop()" title="Scroll Up" id="scrollToTop"><img width="30" height="30" alt="Scroll Up" style="" src="images/Up.png"></a></div>';
	str +='</div></div>';
	return str;
}

function fillMTCQues(compQues,columnType,childQues){
	var curQues = iOAP.curQues,
	str='',
	curSection = iOAP.secDetails[iOAP.curSection],
	opnIdFound = false,opnIdValue='0',
	compQuesText = compQues.langData[mockVar.langIndex].quesText,
	quesOpts = curSection.questions[curQues].options;
	var textHighlighterGrpSecQuesId = mockVar.currentGrp+"_"+iOAP.curSection+"_"+(mockVar.compreLaqQues.inArray(compQues.quesId, 'quesId'))+"_"+mockVar.langIndex+"_CompreTextSelection";
	var otherOptCount=0;
	var tempOpnIdValArray = [];
	var regex = /(.+?)<left_column_tag>(.+?)<left_column_tag>.*<right_column_tag>(.+?)<right_column_tag>/g;
	var MTCParam = regex.exec(compQuesText);
	var compQuesText = MTCParam[1];
	var leftColName = MTCParam[2];
	var rightColName = MTCParam[3];
	str += '<div id="quesOuterDiv" style="clear:both">';
	str += '<div class="leftDiv" style="width:99.6%">';
	str +='<div align="right" style="float:right;"><a  href="javascript:;" id="scrollToBottom" title="Scroll Down" onclick="scrollToBottom()"><img width="28" height="28" align="right" alt="Scroll Down" src="images/Down.png" style=""></a></div>';
	str += "<div class='Ans_Area' style='clear:both;padding:5px'>";
	str += '<div class="compreText MTCQuestion textHighlighter '+textHighlighterGrpSecQuesId+' '+compQues.quesId+'_QuesId">'+compQuesText+'</div>';
	str += '<div class="que"><div class="que-col"><h4 class="left_column_tag">'+leftColName+'</h4><ol>';
	for(var i=0;i<childQues;i++){
		str += '<li class="MTC'+compQues.quesId+'">'+curSection.questions[curQues].quesLangBeans[mockVar.langIndex].quesText+'</li>';
		curQues++;	
	}
	curQues = iOAP.curQues;
	str += '</ol></div>';
	if(columnType === "drag"){
		str += '<div class="que-col  que-drag"><h4 class="right_column_tag">'+rightColName+'</h4><ul id="sortable" class="ui-sortable">';
		for(var i=0;i<childQues;i++){
			str += '<li class="ui-state-default" id="answers'+curSection.questions[curQues].quesId+'">';
			slectedOpnId = curSection.questions[curQues].quesParam.selectedOptId;
			for(var j=0;j<quesOpts.length;j++){
				if(slectedOpnId!="" && quesOpts[j].optId==slectedOpnId){
					opnIdFound = true;
					opnIdValue = j;

					break;
				}
			}
			if(opnIdFound === true){
				str += '<span value="'+quesOpts[opnIdValue].optId+'">'+quesOpts[opnIdValue].optLangBean[mockVar.langIndex].optText+'</span></li>';
				opnIdFound = false;  
				tempOpnIdValArray.push(quesOpts[opnIdValue].optId);
			}else{
				str += '<span value="'+quesOpts[i].optId+'">'+quesOpts[i].optLangBean[mockVar.langIndex].optText+'</span></li>';
				tempOpnIdValArray.push(quesOpts[i].optId);
			}
			curQues++;
			otherOptCount = i;		   
		}
		otherOptCount++;
		var extraOptions = true;
		for(var i=0;i<quesOpts.length;i++){
			for(var j=0;j<tempOpnIdValArray.length;j++){
				if(quesOpts[i].optId==tempOpnIdValArray[j]){
					extraOptions = false;
					break;
				}else{
					extraOptions = true;
				}
			}
			if(extraOptions){
				str += '<li class="ui-state-default" >';
				str += '<span value="'+quesOpts[i].optId+'">'+quesOpts[i].optLangBean[mockVar.langIndex].optText+'</span></li>';
			}
		}
		str += '</ul></div></div></div><div align="right" style="float:right;clear:both"><a onclick="scrollToTop()" title="Scroll Up" id="scrollToTop"><img width="30" height="30" alt="Scroll Up" style="" src="images/Up.png"></a></div>';
		str +='</div></div>';
	}else if(columnType === "dropdown"){
		str += '<div class="que-col  que-dd"><h4 class="right_column_tag">'+rightColName+'</h4><ul>';
		str += fillSeqMCQ(quesOpts,curSection,curQues,childQues);
		str += '</ul></div></div></div><div align="right" style="float:right;clear:both"><a onclick="scrollToTop()" title="Scroll Up" id="scrollToTop"><img width="30" height="30" alt="Scroll Up" style="" src="images/Up.png"></a></div>';
		str +='</div></div>';
	}
	return str;
}


function fillSeqMCQ(quesOpts,curSection,curQues,childQues){
	var str ="";
	for(var count=0;count<childQues;count++){
		str += '<li><span class="select-style"><select id="answers'+curSection.questions[curQues].quesId+'">';
		var answers = curSection.questions[curQues].quesParam.selectedOptId.split(",");
		str +='<option class="answer MCQanswer" name="answers'+curSection.questions[curQues].quesId+'" value="select">'+$(globalXmlvar).find('selectOption').text()+'</option>';
		for(var i=0;i<quesOpts.length;i++){
			str +='<option class="answer MCQanswer"  name="answers'+curSection.questions[curQues].quesId+'"value="'+quesOpts[i].optId+'"';
			for(var j=0;j<answers.length;j++){
				if(answers[j]!="" && quesOpts[i].optId==answers[j])
					str += 'selected="selected"';
			}
			str +=">"+quesOpts[i].optLangBean[mockVar.langIndex].optText+"</option>";
		}
		str += '</select></span></li>';
		curQues++;
	}
	return str;
}

function fillBucketQues(compQues,childQues){
	var curQues = iOAP.curQues,
	str='',
	curSection = iOAP.secDetails[iOAP.curSection],
	opnIdFound = false,
	compQuesText = compQues.langData[mockVar.langIndex].quesText,
	quesOpts = curSection.questions[curQues].options,
	crctOpnIds = [], optionBucketLabel='Options';
	var regex = /(.*?)<option_bucket_label>(.+?)<option_bucket_label>/g;
	var optBucketParams = regex.exec(compQuesText);
	var textHighlighterGrpSecQuesId = mockVar.currentGrp+"_"+iOAP.curSection+"_"+(mockVar.compreLaqQues.inArray(compQues.quesId, 'quesId'))+"_"+mockVar.langIndex+"_CompreTextSelection";
	
	if(compQuesText.indexOf('<option_bucket_label>')!=-1 && optBucketParams!=null && optBucketParams.length>2){
	compQuesText = optBucketParams[1];
	optionBucketLabel = optBucketParams[2];
	}else if(optBucketParams==null && compQuesText.indexOf('<option_bucket_label>')!=-1 && compQuesText.split('<option_bucket_label>').length>1){
	compQuesText=compQuesText.split('<option_bucket_label>')[0];
	optionBucketLabel=compQuesText.split('<option_bucket_label>')[1];
	}

	str += '<div id="quesOuterDiv" style="clear:both">';
	str += '<div class="leftDiv" style="width:99.6%">';
	str +='<div align="right" style="float:right;"><a  href="javascript:;" id="scrollToBottom" title="Scroll Down" onclick="scrollToBottom()"><img width="28" height="28" align="right" alt="Scroll Down" src="images/Down.png" style=""></a></div>';
	str += "<div class='Ans_Area' style='clear:both;padding:5px'>";
	str += '<div class="compreText textHighlighter BucketQuestion '+textHighlighterGrpSecQuesId+' '+(compQues.quesId)+'_QuesId">'+compQuesText+'</div>';
	str += '<div class="que" style="margin:20px;"><div class="que-col-1">';
	for(var i=0;i<childQues;i++){
		var answers = curSection.questions[curQues].quesParam.selectedOptId.split(",");
		str += '<div class="drop-sec" id="answers'+curSection.questions[curQues].quesId+'"><h4>'+curSection.questions[curQues].quesLangBeans[mockVar.langIndex].quesText+'</h4><ul class="droptrue dropTarget droppableContainer dragSource ui-sortable" data-content="'+$(globalXmlvar).find('dropHere').text()+'">';
		for(var j=0;j<quesOpts.length;j++){
			for(var k=0;k<answers.length;k++){
				if(answers[k]!="" && quesOpts[j].optId==answers[k]){
					str += '<li class="ui-state-default" style="position:relative;left:0px;top:0px;"><span value="'+quesOpts[j].optId+'">'+quesOpts[j].optLangBean[mockVar.langIndex].optText+'</span></li>'; 
					crctOpnIds.push(quesOpts[j].optId);
				}
			}  
		}
		str += '</ul></div>';
		curQues++;	
	}
	curQues = iOAP.curQues;
	str += '</div>';
	str += '<div class="que-col-2 que-drag dragSource"><h4 class="opt option_bucket_label">'+optionBucketLabel+'</h4><ul class="droptrue dropTarget ui-sortable" data-content="'+$(globalXmlvar).find('dropHere').text()+'">';
	for(var i=0;i<quesOpts.length;i++){
		for(var j=0;j<crctOpnIds.length;j++){
			if(crctOpnIds[j] === quesOpts[i].optId){
				opnIdFound = true;
			}
		}
		if(opnIdFound!==true){
			str += '<li class="ui-state-default" style="position:relative;left:0px;top:0px;"><span value="'+quesOpts[i].optId+'">'+quesOpts[i].optLangBean[mockVar.langIndex].optText+'</span></li>'; 
		}else{
			opnIdFound = false;
		}
	}
	str += '</ul></div></div></div><div align="right" style="float:right;clear:both"><a onclick="scrollToTop()" title="Scroll Up" id="scrollToTop"><img width="30" height="30" alt="Scroll Up" style="" src="images/Up.png"></a></div>';
	str +='</div></div>';
	return str;
}
function fillFITBQues(compQues){
	var str = '',gapId,gapType,replaceStr;
	var compQuesText = compQues.langData[mockVar.langIndex].quesText;
	compQuesText = compQuesText.replace(/'/g,'"');
	var regex = /<gaptype="(.+?)" gapid="(\d+)">/g;
	var compTempQues = compQuesText;
	var FITBParam = regex.exec(compQuesText);
	var curQues = iOAP.curQues,
	curSection = iOAP.secDetails[iOAP.curSection];
	while(FITBParam!==null){
		replaceStr = FITBParam[0];
		gapType = FITBParam[1];
		gapId = FITBParam[2];
		if(gapType.toUpperCase() === "MCQ" && gapId === curSection.questions[curQues].gapId){
			compTempQues = fillBlankMCQ(compTempQues,replaceStr,curSection.questions[curQues].options,curSection.questions[curQues].quesParam.selectedOptId,curSection.questions[curQues],gapId);
		}else if(gapType.toUpperCase() === "SA" && gapId === curSection.questions[curQues].gapId){
			compTempQues = fillBlankSA(compTempQues,replaceStr,curSection.questions[curQues].answer,curSection.questions[curQues],gapId);
		}
		FITBParam = regex.exec(compQuesText);
		curQues++;
	}
	str += '<div id="quesOuterDiv" style="clear:both">';
	str += '<div class="leftDiv" style="width:99.6%">';
	str +='<div align="right" style="float:right;"><a  href="javascript:;" id="scrollToBottom" title="Scroll Down" onclick="scrollToBottom()"><img width="28" height="28" align="right" alt="Scroll Down" src="images/Down.png" style=""></a></div>';
	str += "<div class='Ans_Area' style='clear:both;padding:5px'>";
	var textHighlighterGrpSecQuesId = mockVar.currentGrp+"_"+iOAP.curSection+"_"+(mockVar.compreLaqQues.inArray(compQues.quesId, 'quesId'))+"_"+mockVar.langIndex+"_CompreTextSelection";
	str += '<div class="que textHighlighter FITBQuestion '+textHighlighterGrpSecQuesId+' '+(compQues.quesId)+'_QuesId">'+compTempQues+'</div></div>';
	str += '<div align="right" style="float:right;clear:both"><a onclick="scrollToTop()" title="Scroll Up" id="scrollToTop"><img width="30" height="30" alt="Scroll Up" style="" src="images/Up.png"></a></div>';
	str +='</div></div>';
	return str;
}

function fillBlankMCQ(compQuesStr,replaceStr,quesOpts,answer,curQuestion,gapId){
	var str ="";
	str += '<span class="select-style  FITBQuestionList '+gapId+'_FITBM"><select id="answers'+curQuestion.quesId+'">';
	var answers = answer.split(",");
	str +='<option class="answer MCQanswer" name="answers'+curQuestion.quesId+'" value="select">'+$(globalXmlvar).find('selectOption').text()+'</option>';
	for(var i=0;i<quesOpts.length;i++){
		str +='<option class="answer MCQanswer"  name="answers'+curQuestion.quesId+'"value="'+quesOpts[i].optId+'"';
		for(var j=0;j<answers.length;j++){
			if(answers[j]!="" && quesOpts[i].optId==answers[j])
				str += 'selected="selected"';
		}
		str +=">"+quesOpts[i].optLangBean[mockVar.langIndex].optText+"</option>";
	}
	str += '</select></span>';
	compQuesStr = compQuesStr.replace(replaceStr,str);
	return compQuesStr;
}
function isNumberKeyEvent(evt)
      {
         var code = (evt.which) ? evt.which : event.keyCode;
		 //charCode > 31 &&
         if ( (code > 47 && code < 58) || code==46 || code==45 || code==8 || code==37 || code==39)
            return true;

         return false;
      }
function fillBlankSA(compQuesStr,replaceStr,answer,curQuestion,gapId){
	var str = '<span class="BlankSA FITBQuestionList '+gapId+'_FITBS">';
	if(curQuestion.rows=='undefined' || curQuestion.columns=='undefined' ||(curQuestion.rows == 10 && curQuestion.columns == 100)|| (curQuestion.rows == 10 && curQuestion.columns == 70)){
		str += '<input class="keyboardInput" type="text" id="answer'+curQuestion.quesId+'" class="answer SAAnswer" onpaste="return false;" ondrop="return false;" onkeydown="disableTab(event); allowSAInputsForMultiLang(event); alphaWordLimitGroup(event,'+curQuestion.quesId+'); " onkeyup="word_countGroup('+curQuestion.quesId+');alphaWordLimitGroup(event,'+curQuestion.quesId+');" onmousedown="alphaWordLimitGroup(32,'+curQuestion.quesId+')"  value="'+curQuestion.quesParam.answer+'" ';
		if(curQuestion.keyboardType == "Numeric"){
		str += ' onkeypress="return isNumberKeyEvent(event)" ';
		}
		str += '>';	
	}else{
	var widthSA = "";
	str +='<textarea rows='+curQuestion.rows+' cols='+curQuestion.columns+' name="option"  autocomplete="off" id="answer'+curQuestion.quesId+'" class="answer SAAnswer" spellcheck="false" onpaste="return false;" ondrop="return false;" onkeydown="disableTab(event); allowSAInputsForMultiLang(event); alphaWordLimitGroup(event,'+curQuestion.quesId+'); " onkeyup="word_countGroup('+curQuestion.quesId+');alphaWordLimitGroup(event,'+curQuestion.quesId+');" onMouseDown="alphaWordLimitGroup(32,'+curQuestion.quesId+')" style="width:'+widthSA+'" ';
	if(curQuestion.keyboardType == "Numeric"){
		str += ' onkeypress="return isNumberKeyEvent(event)" ';
		}
		str += '>'+curQuestion.quesParam.answer+'</textarea>';
	}
	//str +='<img src="images/keyboard.png" alt="Display virtual keyboard interface" class="keyboardInputInitiator" title="Select keyboard layout">';
	str = str+"</span>";
	var compQuesString = compQuesStr.replace(replaceStr,str);
	return compQuesString;
} 

function fillRestrictedTypingQues(quesTxt){
	$('#dataDisplayDiv').html(quesTxt.replace(/\&/g,'&amp;').replace(/\</g,'&lt;').replace(/\>/g,'&gt;'));
	mockVar.typingGroup[mockVar.currentGrp].textForRestrictedTyping = $('#dataDisplayDiv').text();
	var str = loadTypingContentRestricted();		// in restrictedTyping.js
	return str;
}

function fillUnrestrictedTypingQues(quesTxt){
	$('#dataDisplayDiv').html(quesTxt.replace(/\&/g,'&amp;').replace(/\</g,'&lt;').replace(/\>/g,'&gt;'));
	mockVar.typingGroup[mockVar.currentGrp].word_string = $('#dataDisplayDiv').text();
	var str = loadTypingContentUnrestricted();
	return str;
}

function fillProgramingQues(ques){
	var str ='<div>';
	str += '<div id="compreText" class="rightDiv">';
	if(ques.displayQuestionNo == "true" || ques.displayQuestionNo == "" || typeof(ques.displayQuestionNo) == "undefined"){
		str += '<div class="divHeader">';
		str +='<b><span class="questionNumber">'+mockLabels.questionNo+'</span>. '+eval(iOAP.curQues+1)+'</b>';
		str +='</div>';
	}
	str += '<div id="quesAnsContent" class="Ans_Area" style="padding:10px;">'+ques.quesLangBeans[mockVar.langIndex].quesText + ' </div>';
	str += '<div id="progStatusDisplay" style="margin: auto;display:none;margin-bottom:0.1%;height:40%;border-top:1px solid">';
	str += '<div style="text-align:left;float:left;color:green;font-weight:bold;width:99.5%">';
	str += '<span id="statusText"></span>';
	str += '<div id="maximizeIcon" style="float:right;display:block;"><img src="images/icon_maximum.png" id="maximg" style="cursor:pointer;" title="Maximize" onclick="showMaxVersion();"></div>';
	str += '</div><br/>This section displays the result of public test cases';
	str += '<div id="TestCaseReport" style="display:none;border-top:1px solid"><table id="testCaseDisplayTable" width="99.5%" border="1" cellSpacing="0" style="border-color:#2F72B7;" class="testCaseTable"><thead><tr style="background:#2F72B7;color:white;text-align:center"><th style="width:10%;">TestCase No</th><th style="width:40%;">Inputs</th><th style="width:25%;">Expected output</th><th style="width:25%;">Result</th></tr></thead><tbody><tr><td>1</td><td>Inputs for TestCase 1</td><td>Output</td><td style="font-weight: bold;"><span style="color:green;font-weight: bold;">Pass</span> / <span style="color:red;font-weight: bold;">Fail</span></td></tr><tr><td>2</td><td>Inputs for TestCase 2</td><td>Output</td><td style="font-weight: bold;"><span style="color:green;font-weight: bold;">Pass</span> / <span style="color:red;font-weight: bold;">Fail</span></td></tr></tbody></table></div>';
	str += '</div></div>';
	str += "<div id='programingAnsContent' class='leftDiv' style=''>";
	str += '<div id="progRightPart"><div id="progDescriptionDiv">'+mockLabels.typeCodeMsg+'</div>';
	str += '<div style="float:right;margin-top:-26px;margin-right:38px;"><img alt="" src="images/Prog_copy.png" onclick="copyCode();" style="cursor:pointer;width:20px;" id= "copyContent"  title="'+$(globalXmlvar).find('copyContent').text()+'"  class="progImg"></div>';
	str +='<div  style="float:right;margin-top:-26px;margin-right:12px;"><img alt="" src="images/ChangeEditor.png" onclick="changeEditor();" style="cursor:pointer;width:20px;" id="changeEditor" title="'+$(globalXmlvar).find('changeEditor').text()+'"  class="progImg"></div>';
	str += '<div id="progEditorDisplay" style="overflow : auto;">';
	str += '<div id="progEditorDisplayDiv" style="margin:auto;"><textarea style="display: none;" id="code" name="code">'+ques.quesParam.answer+'</textarea></div></div></div>';
	str +='<div id="progRightPart1" style="display:none;"><div id="progDescriptionDiv1"><strong>'+mockLabels.typeCodeMsg+'</strong></div>';;
	str += '<div  style="float:right;margin-top:-26px;margin-right:38px;"><img alt="" src="images/Prog_copy.png" onclick="copyCode();" style="cursor:pointer;width:20px;" id="copyContent" title="'+$(globalXmlvar).find('copyContent').text()+'"  class="progImg"></div>';
	str +='<div  style="float:right;margin-top:-26px;margin-right:12px;"><img alt="" src="images/ChangeTextArea.png" onclick="changeTextArea();" style="cursor:pointer;width:20px;" id="changeTextArea" title="'+$(globalXmlvar).find('changeTextArea').text()+'" class="progImg"></div>';
	str += '<div id="progEditorDisplay1" style="overflow : auto;">';
	str += '<div id="progEditorDisplayDiv1" style="margin:auto;">';
	str +='<textarea id="textareaforflip" name="textareaforflip" wrap="off" autocapitalize="off" onselect="return false;" onkeydown="programmingTxtCode(event);";autocorrect="off" spellcheck="false"overflow:scroll;  style="width: 100%;resize:none"></textarea></div></div></div>';
	str +='<div id="maxMinTestCases1" style="margin: auto;display: none;"><img src="images/icon_minimum.png" id="minimg" style="cursor:pointer;display:inline;" title="Minimize" onclick="maxToMin()"><table id="testCaseDisplayTable" width="99.5%" border="1" cellSpacing="0" style="border-color:#2F72B7;" class="testCaseTable"><thead><tr style="background:#2F72B7;color:white;text-align:center"><th style="width:10%;">TestCase No</th><th style="width:40%;">Inputs</th><th style="width:25%;">Expected output</th><th style="width:25%;">Result</th></tr></thead><tbody><tr><td>1</td><td>Inputs for TestCase 1</td><td>Output</td><td style="font-weight: bold;"><span style="color:green;font-weight: bold;">Pass</span> / <span style="color:red;font-weight: bold;">Fail</span></td></tr><tr><td>2</td><td>Inputs for TestCase 2</td><td>Output</td><td style="font-weight: bold;"><span style="color:green;font-weight: bold;">Pass</span> / <span style="color:red;font-weight: bold;">Fail</span></td></tr></tbody></table></div>';
	return str;
}

function showMaxVersion(){
//isfinalSubmit = true;
	var url =".TB_inline2?height=auto&max-height=100%&min-height=100&width=400&inlineId=maxMinTestCases1&modal=true";
	tb_show("Server URL", url);
	$('#maxMinTestCases1').css("z-index","150000");	
	$('#minimg').css("margin-left","95%");	
}

function maxToMin() {
	tb_remove();	
}

function changeEditor(){
	quizPageHeight1();
	$('#progRightPart1').show();
	$('#progRightPart').hide();
	$firstTextArea=editor.getValue();
	$('#textareaforflip').val($firstTextArea);
	$('#textareaforflip').focus();
}

function changeTextArea()
{	$('progEditorDisplayDiv1').html("");
	$("#progRightPart").show();
	$("#progRightPart1").hide();
	$secondTextArea=$("#textareaforflip").val();
	editor.setValue($secondTextArea);
	if (jQuery(window).width() > 1000) {
        quizPageHeight();
    } else {
         setDIVHeight_resp(); 
     }
	//align_page();
}

function programmingTxtCode(event){
//	document.getElementById("textareaforflip").onkeydown = function(e) {
	if ( event.keyCode == 9){
		event.returnValue = false;
		insertAtCursor(document.getElementById("textareaforflip"), "    ");
	}
	else if(event.keyCode == 9){
		event.preventDefault();
		insertAtCursor(document.getElementById("textareaforflip"), "    ");
	}
	//	};
}
function insertAtCursor(myField, myValue) {
	//this is for IE Support
	if (document.selection) {
		var temp;
		myField.focus();
		sel = document.selection.createRange();
		temp = sel.text.length;
		sel.text = myValue;
		if (myValue.length == 0) {
			sel.moveStart('character', myValue.length);
			sel.moveEnd('character', myValue.length);
		} else {
			sel.moveStart('character', -myValue.length + temp);
		}
		sel.select();
	}
	//this is for Mozilla and Chrome 
	else if (myField.selectionStart || myField.selectionStart =='0'){
		var startPos = myField.selectionStart;
		var endPos = myField.selectionEnd;
		myField.value = myField.value.substring(0,startPos)+myValue+myField.value.substring(endPos, myField.value.length);
		myField.focus();
		myField.selectionStart = startPos + myValue.length;
		myField.selectionEnd = startPos + myValue.length;
	} else {
		myField.value += myValue;
		myField.focus();
	}
}
										
function fillCompQues(ques){
var textHighlighterGrpSecQuesId = mockVar.currentGrp+"_"+iOAP.curSection+"_"+(mockVar.compreLaqQues.inArray(ques.quesId, 'quesId'))+"_"+mockVar.langIndex+"_CompreTextSelection";
	var str ='';
	if(iOAP.secDetails[iOAP.curSection].groupAllQuestions == "false" || typeof(iOAP.secDetails[iOAP.curSection].groupAllQuestions) == "undefined" || iOAP.secDetails[iOAP.curSection].groupAllQuestions == ""){
		str ='<div id="quesOuterDiv" class="compLaq">';
		str +='<div id="compreText" class="rightDiv">';
		str += (mockVar.compQName.length>0)?('<div style="border-bottom:1px solid #dbdbdb;height:24px;margin-top:4px"><b style="margin-left:10px">'+mockVar.compQName+'</b></div>') : "";
		str += '<div id="warning"></div>';
	}else{
		str ='<div id="quesOuterDiv" class="compLaq" style="width:100%;">';
		str +='<div id="compreText">';
		str += (mockVar.compQName.length>0)?('<div style="border-bottom:1px solid #dbdbdb;height:24px;margin-top:4px"><b>'+mockVar.compQName+'</b></div>') : "";
		str += '<div id="warning"></div>';
	}
	str +='<div style="padding:10px" class="textHighlighter  '+textHighlighterGrpSecQuesId+' '+ques.quesId+'_QuesId">'+ques.langData[mockVar.langIndex].quesText+'</div></div>';
	return str;
}

function fillLAQues(laQues, parentQuesIndex){
var textHighlighterGrpSecQuesId = mockVar.currentGrp+"_"+iOAP.curSection+"_"+(mockVar.compreLaqQues.inArray(laQues.quesId, 'quesId'))+"_"+mockVar.langIndex+"_CompreTextSelection";
	var str ='<div id="quesOuterDiv" class="compLaq">';
	if(iOAP.secDetails[iOAP.curSection].groupAllQuestions == "false" || typeof(iOAP.secDetails[iOAP.curSection].groupAllQuestions) == "undefined" || iOAP.secDetails[iOAP.curSection].groupAllQuestions == ""){
		str += '<div class="rightDiv" id="laq_text">';
		str += (mockVar.laQName.length>0)?('<div  style="border-bottom:1px solid #dbdbdb;height:24px;margin-top:4px"><b style="margin-left:10px">'+mockVar.laQName+'</b></div>'):'';
		str +='<div id="warning"></div>';
	}else{
		str +='<div>';
		str += (mockVar.laQName.length>0)?('<div  style="border-bottom:1px solid #dbdbdb;height:24px;margin-top:4px"><b>'+mockVar.laQName+'</b></div>'):'';
		str +='<div id="warning"></div>';
	}
	str += '<div style="padding:10px" class="textHighlighter '+textHighlighterGrpSecQuesId+'">'+laQues.langData[mockVar.langIndex].quesText+'</div>' ;
	if(parentQuesIndex != -1){
		parentQues = iOAP.secDetails[iOAP.curSection].questions[parentQuesIndex];
		if($.trim(parentQues.quesParam.answer) != ""){
			str += "<p><i>Selected answer(s) of the previous question is :";
			if(parentQues.quesType.indexOf("SA") ==-1){
				var answers = parentQues.quesParam.selectedOptId.split(",");
				var quesLangIndex = parentQues.quesLangBeans.inArray(parentQues.quesParam.langID,'langId');
				var optIndex = -1;
				for(var j=0;j<answers.length;j++){
					optIndex = parentQues.options.inArray(answers[answers.length-j-1],'optId');
					str += parentQues.options[optIndex].optLangBean[quesLangIndex].optText + ",";
				}
				str = str.substring(0,str.length-1);
			}else{
				str += parentQues.quesParam.answer;
			}

			str += "</i></p>";
		}
	}
	str += ' </div>';
	return str;
}

function fillSubjectiveQues(quesTxt){
var textHighlighterGrpSecQuesId = mockVar.currentGrp+"_"+iOAP.curSection+"_"+iOAP.curQues+"_"+mockVar.langIndex+"_TextSelection";
	var str = "<div id='quesAnsContent' class='Ans_Area' style='width:98%; margin-left:5px; font-family:Arial,verdana,helvetica,sans-serif;'> <div class='textHighlighter "+textHighlighterGrpSecQuesId+" "+(mockVar.curQuesBean.quesId)+"_QuesId'>"+quesTxt + "</div></div>";
	return str;
}
function fillSubjectiveQuesGroup(quesTxt,curQuestion,qNo,quesId){
var textHighlighterGrpSecQuesId = mockVar.currentGrp+"_"+iOAP.curSection+"_"+qNo+"_"+mockVar.langIndex+"_TextSelection";
	var str = "<div id='quesAnsContent"+curQuestion.quesId+"' class='Ans_Area' style='clear:both;'>";
	str += "<div style='width:98%;margin-left:5px;font-family:Arial,verdana,helvetica,sans-serif;padding-bottom:10px;'>";
	if(curQuestion.displayQuestionNo == "true" || curQuestion.displayQuestionNo == "" || typeof(curQuestion.displayQuestionNo) == "undefined")
		str +="	<span>"+(qNo+1)+"</span>.";
	str +="<div class='groupQuestion textHighlighter "+textHighlighterGrpSecQuesId+" "+quesId+"_QuesId'>"+quesTxt+ "</div></div>";
	return str;
}

var allowedChars = new Array("+","-");

function numPadValidate(text) {
	var proceed = true;
	for(var i=0;i<allowedChars.length;i++){
		if(text.indexOf(allowedChars[i])>0){
			proceed=false;
		}
		if(text.split(allowedChars[i]).length>2){
			proceed = false;
		}
	}
	if(text.indexOf('.') > -1){
		var afterDot = text.split(".");
		if(afterDot.length==2){
			if(afterDot[1].length>2)
				proceed=false;
		}else if(afterDot.length>2){
			proceed=false;
		}
	}
	return proceed;
}

function fillQuesNumber(ques){
	var str = '<div id="Questn_Innr_Div_section"><div id="Subjt_Div"></div>';
	if(ques.keyboardLayout !== undefined && ques.keyboardLayout !== "" && ques.keyboardLayout!== "false"){
		str += '<span class="typKeybrdLayout" id="keybrdLayt">Keyboard Layout:'+ques.keyboardLayout+'</span>';
		$('#mKeybrdLayt').html('Keyboard Layout : '+ques.keyboardLayout);
		$('#mKeybrdLayt').show();
	}
	str += '<div id="Subdetail_Div"><div style="float:right;margin-right:5px;">';
	if(ques.quesType != 'PROGRAMMING TEST' && ques.quesType != 'TYPING TEST' && mockVar.langCount>1){
		str += "<div class='chooseLang'> <span class='viewLang'>"+mockLabels.viewIn+"&nbsp</span><select class='choose_lang auditlogSelect' onchange='changeLang(this.value)'> ";
		for(var i=0;i<mockVar.languages.length;i++){
			if(mockVar.languages[i]!=null && typeof(mockVar.languages[i])!='undefined'){
				str +="<option";
				if(i==mockVar.curQuesBean.quesLangBeans[mockVar.langIndex].langId)
					str += " selected='selected'";
				str +=  " value='"+i+"'>"+mockVar.languages[i]+"</option>";
			}
		}
		str +="</select></div>";
	}
	str += '</div></div></div>';
	return str;
}

function fillLAQuesNumber(ques){
	var str = '<div id="Questn_Innr_Div_section"><div id="Subjt_Div"><b>';
	if(ques.displayQuestionNo == "true" || ques.displayQuestionNo == "" || typeof(ques.displayQuestionNo) == "undefined")
		str += '<span class="questionNumber">'+mockLabels.questionNo+'</span>. '+eval(iOAP.curQues+1);
	str +=  ($.trim(ques.quesText.split("@@&&")[0]).length <= 0 && mockVar.laQName.length >0 )?(" ("+mockVar.laQName+")"):"";
	str +='</b></div><div id="Subdetail_Div"><div style="float:right;margin-right:5px;">';
	if(mockVar.langCount>1){
		str += "<div class='chooseLang'><span class='viewLang'> "+mockLabels.viewIn+"&nbsp<select class='choose_lang auditlogSelect' onchange='changeLang(this.value)'> ";
		for(var i=0;i<mockVar.languages.length;i++){
			if(mockVar.languages[i]!=null && typeof(mockVar.languages[i])!='undefined'){
				str +="<option";
				if(i==mockVar.curQuesBean.quesLangBeans[mockVar.langIndex].langId)
					str += " selected='selected'";
				str +=  " value='"+i+"'>"+mockVar.languages[i]+"</option>";
			}
		}
		str +="</select></div>";
	}
	str += '</div></div></div>';
	return str;
}
function changeDefaultLang(langID){
	changeLang(langID);
	mockVar.defaultLang=langID;
	$('#defaultSelectedLanguage').val(langID);
	document.cookie = 'defaultLang=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT';
	document.cookie = "defaultLang="+langID;
	sessionStorage.defaultLang = langID;
	var AuditJsonObject = new Object();
	AuditJsonObject.ActionName = "Default Language Change";
	var auditDesc = "Default language changes to "+mockVar.languages[langID];
	AuditJsonObject.ActionDesc = auditDesc;
	AuditJsonObject.GroupId = "NA";
	AuditJsonObject.SectionId = "NA";
	AuditJsonObject.QuestionId = "NA";
	AuditJsonObject.candidateName = $.cookie("username");
	AuditJsonObject.loginId = $.cookie("loginId");
	AuditJsonObject.OptionSequence = "NA";

	var currentDate = new Date();
	AuditJsonObject.Time = currentDate.yyyymmddHHmmss();
	AuditJsonObject.SelectedOptionId = "NA";
	AuditJson.push(AuditJsonObject);
}
function changeLang(langID){
	// iOAP.viewLang[iOAP.curSection][iOAP.curQues].langID = langID;
	var langId = jQuery(".auditlogSelect option:selected").val();
	var auditDesc = "Default language changes to "+mockVar.languages[langId];
	var currentSectionDetails = mockVar.groups[currentGroupIndex].secDetails[currentSectionIndex];
	var currentQuestionDetails = currentSectionDetails.questions[currentQuestionIndex];
	var optionSequence = "";
	var AuditJsonObject = new Object();
	AuditJsonObject.ActionName = "Language Change";
	AuditJsonObject.ActionDesc = auditDesc;
	AuditJsonObject.GroupId = mockVar.groups[currentGroupIndex].groupId;
	AuditJsonObject.SectionId = currentSectionDetails.secId;
	AuditJsonObject.QuestionId = currentQuestionDetails.quesId;
	AuditJsonObject.candidateName = $.cookie("username");
	AuditJsonObject.loginId = $.cookie("loginId");
	var currentDate = new Date();
	AuditJsonObject.Time = currentDate.yyyymmddHHmmss();
	if(currentQuestionDetails.quesType == "MCQ" || currentQuestionDetails.quesType == "MSQ" ){
		var length = currentQuestionDetails.options.length;
		for(var i=0;i<length;i++){
			k = i + 1;
			optionSequence = optionSequence + k + ")"+ currentQuestionDetails.options[i].optId+" ";
			AuditJsonObject.OptionSequence = optionSequence;
		}
	}
	if(currentQuestionDetails.quesParam.status != "notanswered"){
		AuditJsonObject.SelectedOptionId = currentQuestionDetails.quesParam.selectedOptId.replace(/,/g , "@_@");
	} else {
		AuditJsonObject.SelectedOptionId = "NA";
	}
	AuditJson.push(AuditJsonObject);
	var quesLangIndex = mockVar.curQuesBean.quesLangBeans.inArray(langID.toString(),"langId");
	if(quesLangIndex == -1){
		isfinalSubmit = true;
		cnfPop('InfoPopup');
		$("#infoMsg2").html(mockLabels.quesNotAvailable.replace('@@langName@@',mockVar.languages[langID]));
		fillQuesContent();
		//	chkIfMaxQuesCrossed();
		if (jQuery(window).width() > 1000) {
			quizPageHeight();
		} else {
			setDIVHeight_resp(); 
		}
	}
	else{
		mockVar.langIndex = quesLangIndex;
		saveJwplayerParam();
		getQuestion(langID);
		fillNumberPanel();
	}
	if(mockVar.WaterMark){
		if(mockVar.storeCandResponse == 0 || mockVar.storeCandResponse == "0")
			waterMark($(".mockCandId").html());
		else
			waterMark(sessionStorage.waterMarkId);
	}
}

function fillQuesDetailsCont(ques){
	var str = "";
	var respStr="";
	if(iOAP.showQType){
		str +="<span class='questiontype-details'>";
		if(ques.quesType=="MCQ" && $.trim(mockVar.mcQName).length>0 && grpCompre==false){
			str +='<span class="questionType">'+mockLabels.questionType+'</span>' +mockVar.mcQName;
			respStr += '<span class="questionType">'+mockLabels.questionType+'</span><span>&nbsp<b>' +mockVar.mcQName+'</b></span>';
		}else if(ques.quesType=="MSQ" && $.trim(mockVar.msQName).length>0 && grpCompre==false){
			str +='<span class="questionType">'+mockLabels.questionType+'</span>' +mockVar.msQName;
			respStr += '<span class="questionType">'+mockLabels.questionType+'</span><span>&nbsp<b>' +mockVar.msQName+'</b></span>';
		}else if(ques.quesType=="SA" && $.trim(mockVar.saQName).length>0 && grpCompre==false){
			str +='<span class="questionType">'+mockLabels.questionType+'</span>' +mockVar.saQName;
			respStr += '<span class="questionType">'+mockLabels.questionType+'</span><span>&nbsp<b>' +mockVar.saQName+'</b></span>';
		}else if(ques.quesType == "SUBJECTIVE" && $.trim(mockVar.subjQName).length>0){
			str +='<span class="questionType">'+mockLabels.questionType+'</span>' +mockVar.subjQName;
			respStr += '<span class="questionType">'+mockLabels.questionType+'</span><span>&nbsp<b>' +mockVar.subjQName+'</b></span>';
		} else if(ques === "FITB" && mockVar.fillBlankQName!==undefined && $.trim(mockVar.fillBlankQName).length>0){
			str +='<span class="questionType">'+mockLabels.questionType+'</span>' +mockVar.fillBlankQName;
			respStr += '<span class="questionType">'+mockLabels.questionType+'</span><span>&nbsp<b>' +mockVar.fillBlankQName+'</b></span>';
		}else if(ques === "SEQUENCE" && mockVar.fillSeqQName!==undefined && $.trim(mockVar.fillSeqQName).length>0){
			str +='<span class="questionType">'+mockLabels.questionType+'</span>' +mockVar.fillSeqQName;
			respStr += '<span class="questionType">'+mockLabels.questionType+'</span><span>&nbsp<b>' +mockVar.fillSeqQName+'</b></span>';
		}else if(ques === "GROUP" && mockVar.fillGrpQName!==undefined && $.trim(mockVar.fillGrpQName).length>0){
			str +='<span class="questionType">'+mockLabels.questionType+'</span>' +mockVar.fillGrpQName;
			respStr += '<span class="questionType">'+mockLabels.questionType+'</span><span>&nbsp<b>' +mockVar.fillGrpQName+'</b></span>';

		}else if(ques === "MTC" && mockVar.fillMatchColQName!==undefined && $.trim(mockVar.fillMatchColQName).length>0){
			str +='<span class="questionType">'+mockLabels.questionType+'</span>' +mockVar.fillMatchColQName;
			respStr += '<span class="questionType">'+mockLabels.questionType+'</span><span>&nbsp<b>' +mockVar.fillMatchColQName+'</b></span>';
		}else if(ques.quesType == "TYPING TEST" && $.trim(mockVar.typingQName).length>0){
			str +='<span class="questionType">'+mockLabels.questionType+'</span>' +mockVar.typingQName;
			respStr += '<span class="questionType">'+mockLabels.questionType+'</span><span>&nbsp<b>' +mockVar.typingQName+'</b></span>';
		}else if(ques.quesType == "PROGRAMMING TEST" && $.trim(mockVar.programingQName).length>0){
			str +='<span class="questionType">'+mockLabels.questionType+'</span>' +mockVar.programingQName;
			respStr += '<span class="questionType">'+mockLabels.questionType+'</span><span>&nbsp<b>' +mockVar.programingQName+'</b></span>';
		}

		str	+= "</span>";
	}
	if(mockVar.ShowHint==1){
		str += hintDivInnerHtml;
		//respStr += hintDivInnerHtml;
	}
	if(mockVar.showMarks && ques !== "FITB" && ques !== "MTC" && ques !== "SEQUENCE" && ques !== "GROUP" && grpCompre==false){
		str +="<span class='questiontype-markpanel'>";
		str += "<span class='marking-details'><span class='correctAnswer'>"+mockLabels.correctAnswerMarks+"</span>	<font style='color:green'>"+ques.allottedMarks+"</font>";
		if(typeof(ques.displayNegMarks)!='undefined'&&ques.displayNegMarks!=null&&ques.displayNegMarks!="NA"&&ques.displayNegMarks!="")
			str += " |<span class='negativeMarks'> "+mockLabels.negativeMarks+" </span><font style='color:red'>"+ques.displayNegMarks+"</font></span></span>";
		else
			str += " |<span class='negativeMarks'> "+mockLabels.negativeMarks+" </span><font style='color:red'>"+ques.negMarks+"</font></span></span>";
		respStr += "<span class='correctAnswer'>"+mockLabels.correctAnswerMarks+"</span><span>&nbsp:&nbsp<font style='color:green'>"+ques.allottedMarks+"</font></span>";
		if(typeof(ques.displayNegMarks)!='undefined'&&ques.displayNegMarks!=null&&ques.displayNegMarks!="NA"&&ques.displayNegMarks!="")
			respStr += " <span class='negativeMarks'> "+mockLabels.negativeMarks+" </span><span>&nbsp:&nbsp<font style='color:red'>"+ques.displayNegMarks+"</font></span>";
		else
			respStr += " <span class='negativeMarks'> "+mockLabels.negativeMarks+" </span><span>&nbsp:&nbsp<font style='color:red'>"+ques.negMarks+"</font></span>";
	}
	if(ques.quesType != 'PROGRAMMING TEST' && ques.quesType != 'TYPING TEST' && mockVar.langCount>1){
		respStr += "<span class='chooseLang'> <span class='viewLang'>"+mockLabels.viewIn+"&nbsp</span><select class='choose_lang auditlogSelect' onchange='changeLang(this.value)'> ";
		for(var i=0;i<mockVar.languages.length;i++){
			if(mockVar.languages[i]!=null && typeof(mockVar.languages[i])!='undefined'){
				respStr +="<option";
				if(i==mockVar.curQuesBean.quesLangBeans[mockVar.langIndex].langId)
					respStr += " selected='selected'";
				respStr +=  " value='"+i+"'>"+mockVar.languages[i]+"</option>";
			}
		}
		respStr +="</select></div>";
	}
	if(ques.quesType === 'TYPING TEST'){
		respStr +='<div style="clear:both"><span class="keyStrokesCountTd">Keystrokes Count</span><span>&nbsp:&nbsp</span><span class="totalKeyStrokesCount"></span></div>';
		respStr +='<div class="errorCount" style="clear:both"><span class="errorCountTd">Error Count</span><span>&nbsp:&nbsp</span><span class="errorCountValue">0</span></div>';
		respStr +='<div class="backspaceCount" style="clear:both"><span class="backspaceCountTd">BackSpace Count</span><span>&nbsp:&nbsp</span><span class="backspaceCountValue">0</span></div>';
		respStr +='<div><span class="totalWordCount" style="clear:both">Total Word Count</span><span>&nbsp:&nbsp</span><span class="totalWordCountVal"></span></div>';
		respStr +='<div><span class="typedWordCount">Typed Word Count</span><span>&nbsp:&nbsp</span><span class="typedWordCountVal">0</span></div>';
		respStr +='<div><span class="remainingWordCount">Pending Word Count</span><span>&nbsp:&nbsp</span><span class="remainingWordCountVal"></span></div>';
	}
	$("#resp_mrks_info").html(respStr);
	return str;
}

function quesContent(ques){
	var str='' ;
	grpCompre=false;
	$(".savenext").val(mockLabels.savenext) ;
	if(mockVar.showMarks || iOAP.showQType){
		var compreQuesIndex,additionalQuesType="";
		//var compreQues;
		if(mockVar.compreLaqQues!==undefined){
			if(ques.comprehensionId!=0){
				compreQuesIndex = mockVar.compreLaqQues.inArray(ques.comprehensionId, 'quesId');
				compreQues = mockVar.compreLaqQues[compreQuesIndex];
				additionalQuesType = mockVar.compreLaqQues[compreQuesIndex].additionalQuesType;
				grpCompre=mockVar.compreLaqQues[compreQuesIndex].groupComprehensionLaqQuestions!=undefined?mockVar.compreLaqQues[compreQuesIndex].groupComprehensionLaqQuestions:false;
			}
		}
		if(additionalQuesType!==undefined && additionalQuesType!==""){
			if(additionalQuesType === "FITB" || additionalQuesType === "SEQUENCE" || additionalQuesType === "MTC" || additionalQuesType === "GROUP"){
				str = "<div class='questionTypeCont'>";
				str += fillQuesDetailsCont(additionalQuesType);
				str += "</div>";
			}/*else if(additionalQuesType === "SEQUENCE"){
				str = "<div class='questionTypeCont'>";
				str += fillQuesDetailsCont(additionalQuesType);
				str += "</div>";
			}else if(additionalQuesType === "MTC"){
				str = "<div class='questionTypeCont'>";
				str += fillQuesDetailsCont(additionalQuesType);
				str += "</div>";
			}else if(additionalQuesType === "GROUP"){
				str = "<div class='questionTypeCont'>";
				str += fillQuesDetailsCont(additionalQuesType);
				str += "</div>";
			} */
			str += fillQuesNumber(ques);
		}else{
			if(ques.quesType=="MCQ" || ques.quesType=="MSQ" || ques.quesType=="SA" || ques.quesType == "SUBJECTIVE" || ques.quesType == "TYPING TEST" || ques.quesType == "PROGRAMMING TEST"){
				str = "<div class='questionTypeCont'>";
				str += fillQuesDetailsCont(ques);
				str += "</div>";
				str += fillQuesNumber(ques);
			}/*else if(ques.quesType=="MSQ"){
				str = "<div class='questionTypeCont'>";
				str += fillQuesDetailsCont(ques);
				str += "</div>";
				str += fillQuesNumber(ques);
			}else if(ques.quesType=="SA"){
				str = "<div class='questionTypeCont'>";
				str += fillQuesDetailsCont(ques);
				str += "</div>";
				str += fillQuesNumber(ques);
			}else if(ques.quesType == "SUBJECTIVE"){
				str = "<div class='questionTypeCont'>";
				str += fillQuesDetailsCont(ques);
				str += "</div>";
				str += fillQuesNumber(ques);
			}*/
			/*else if(ques.quesType == "COMPREHENSION@@MCQ"){
			str = "<div class='questionTypeCont'>";
			str += fillQuesDetailsCont(ques);
			str += "</div>";
			str += fillQuesNumber(ques);
		}else if(ques.quesType == "COMPREHENSION@@MSQ"){
			str = "<div class='questionTypeCont'>";
			str += fillQuesDetailsCont(ques);
			str += "</div>";
		}else if(ques.quesType == "COMPREHENSION@@SA"){
			str = "<div class='questionTypeCont'>";
			str += fillQuesDetailsCont(ques);
			str += "</div>";
			str += fillQuesNumber(ques);
		}else if(ques.quesType == "LA@@MCQ"){
			str = "<div class='questionTypeCont'>";
			str += fillQuesDetailsCont(ques);
			str += "</div>";
			str += fillQuesNumber(ques);
		}else if(ques.quesType == "LA@@MSQ"){
			str = "<div class='questionTypeCont'>";
			str += fillQuesDetailsCont(ques);
			str += "</div>";
			str += fillQuesNumber(ques);
		}else if(ques.quesType == "LA@@SA"){
			str = "<div class='questionTypeCont'>";
			str += fillQuesDetailsCont(ques);
			str += "</div>";
			str += fillQuesNumber(ques); 
		}*/
			/*else if(ques.quesType == "TYPING TEST"){
				str = "<div class='questionTypeCont'>";
				str += fillQuesDetailsCont(ques);
				str += "</div>";
				str += fillQuesNumber(ques);
			}else if(ques.quesType == "PROGRAMMING TEST"){
				str = "<div class='questionTypeCont'>";
				str += fillQuesDetailsCont(ques);
				str += "</div>";
				str += fillQuesNumber(ques);
			}*/
		}
	}
	if(ques.quesType == "MCQ" && ques.comprehensionId == 0 && ques.laqId == 0){
		str += "<div  id='quesOuterDiv'>";
		str += "<div  class='leftDiv' style='width:99.6%'>";
		str +='<div align="right" style="float:right;"><a id="scrollToBottom" title="Scroll Down" onclick="scrollToBottom()"><img width="28" height="28" align="right" alt="Scroll Down" src="images/Down.png" style=""></a></div>';
		if(ques.displayQuestionNo == "true" || ques.displayQuestionNo == "" || typeof(ques.displayQuestionNo) == "undefined"){
			str += '<div class="divHeader">';
			str +='<b><span class="questionNumber">'+mockLabels.questionNo+'</span>. '+eval(iOAP.curQues+1)+'</b>';
			str +='</div>';
		}
		str += fillMCQQues(ques.quesLangBeans[mockVar.langIndex].quesText,ques.options,ques.quesParam.selectedOptId);
		str += '<div align="right" style="float:right;clear:both"><a onclick="scrollToTop()" title="Scroll Up" id="scrollToTop" ><img width="30" height="30" alt="Scroll Up" style="" src="images/Up.png"></a></div>';
		str +="</div></div>";
	}else if(ques.quesType == "MSQ" && ques.comprehensionId == 0 && ques.laqId == 0){
		str += "<div id='quesOuterDiv'>";
		str += "<div  class='leftDiv' style='width:99.6%'>";
		str +='<div align="right" style="float:right;"><a id="scrollToBottom" title="Scroll Down" onclick="scrollToBottom()"><img width="28" height="28" align="right" alt="Scroll Down" src="images/Down.png" style=""></a></div>';
		if(ques.displayQuestionNo == "true" || ques.displayQuestionNo == "" || typeof(ques.displayQuestionNo) == "undefined"){
			str += '<div class="divHeader">';
			str +='<b><span class="questionNumber">'+mockLabels.questionNo+'</span>. '+eval(iOAP.curQues+1)+'</b>';
			str +='</div>';
		}
		str += fillMSQQues(ques.quesLangBeans[mockVar.langIndex].quesText,ques.options,ques.quesParam.selectedOptId);
		str += '<div align="right" style="float:right;clear:both"><a onclick="scrollToTop()" title="Scroll Up" id="scrollToTop"><img width="30" height="30" alt="Scroll Up" style="" src="images/Up.png"></a></div>';
		str += '</div></div>';
	}else if(ques.quesType == "SA" && ques.comprehensionId == 0 && ques.laqId == 0){
		str += "<div id='quesOuterDiv'>";
		str += "<div  class='leftDiv' style='width:99.6%'>";
		str +='<div align="right" style="float:right;"><a id="scrollToBottom" title="Scroll Down" onclick="scrollToBottom()"><img width="28" height="28" align="right" alt="Scroll Down" src="images/Down.png" style=""></a></div>';
		if(ques.displayQuestionNo == "true" || ques.displayQuestionNo == "" || typeof(ques.displayQuestionNo) == "undefined"){
			str += '<div class="divHeader">';
			str +='<b><span class="questionNumber">'+mockLabels.questionNo+'</span>. '+eval(iOAP.curQues+1)+'</b>';
			str +='</div>';
		}
		str += fillSAQues(ques.quesLangBeans[mockVar.langIndex].quesText,ques.quesParam.answer);
		str += '<div align="right" style="float:right;clear:both"><a onclick="scrollToTop()" title="Scroll Up" id="scrollToTop" ><img width="30" height="30" alt="Scroll Up" style="" src="images/Up.png"></a></div>';
		str += "</div></div>";
	}else if(ques.quesType == "SUBJECTIVE"){
		$(".savenext").val(mockLabels.markAsAnswered).css("font-size","14px") ;
		$(".savenext").attr("title",mockLabels.markAsAnswered);
		str += "<div style='height:92%;' id='quesOuterDiv'>";
		//	str += fillQuesNumber(ques);
		str += "<div  class='leftDiv' style='width:99.6%'>";
		str +='<div align="right" style="float:right;"><a  id="scrollToBottom" title="Scroll Down" onclick="scrollToBottom()"><img width="28" height="28" align="right" alt="Scroll Down" src="images/Down.png" style=""></a></div>';
		if(ques.displayQuestionNo == "true" || ques.displayQuestionNo == "" || typeof(ques.displayQuestionNo) == "undefined"){
			str += '<div class="divHeader">';
			str +='<b><span class="questionNumber">'+mockLabels.questionNo+'</span>. '+eval(iOAP.curQues+1)+'</b>';
			str +='</div>';
		}
		str += fillSubjectiveQues(ques.quesLangBeans[mockVar.langIndex].quesText);
		str += '<div align="right" style="float:right;clear:both"><a onclick="scrollToTop()" title="Scroll Up" id="scrollToTop" ><img width="30" height="30" alt="Scroll Up" style="" src="images/Up.png"></a></div>';
		str += "</div></div>";
	}else if(ques.quesType == "TYPING TEST"){
		str += "<div style='width:99.6%;' class='leftDiv'>";
		// str += fillQuesNumber(ques);
		if(ques.typingType.toLowerCase() == 'restricted'){		// for Restricted Typing
			str += fillRestrictedTypingQues(ques.quesLangBeans[mockVar.langIndex].quesText);
		}else if(ques.typingType.toLowerCase() == 'unrestricted'){		// for Unrestricted typing
			str += fillUnrestrictedTypingQues(ques.quesLangBeans[mockVar.langIndex].quesText);
		}
		str += "</div>";
	}else if(ques.quesType == "PROGRAMMING TEST"){
		str += "<div style='height:92%;' id='quesOuterDiv'>";
		//str += fillQuesNumber(ques);
		str += fillProgramingQues(ques);
		str += "</div>";
	}else if(ques.comprehensionId != 0){
		var compreQuesIndex = mockVar.compreLaqQues.inArray(ques.comprehensionId, 'quesId');
		var compreQues = mockVar.compreLaqQues[compreQuesIndex];
		var endQ = '',currentChildQuestionsNormal = 0;
		//var groupComprehensionLaqQuestions = '';
		var groupComprehensionQuestions = mockVar.compreLaqQues[compreQuesIndex].groupComprehensionLaqQuestions;
		var additionalQuesType = mockVar.compreLaqQues[compreQuesIndex].additionalQuesType;
		var columnType = mockVar.compreLaqQues[compreQuesIndex].columnType;

		for(var k=0;k<mockVar.curSectionQuestions.length;k++){
			if(mockVar.curSectionQuestions[k].comprehensionId ==  mockVar.compreLaqQues[compreQuesIndex].quesId){
				currentChildQuestionsNormal++;
			}
		}
		if(additionalQuesType!==undefined && additionalQuesType!==""){
			if(additionalQuesType === "FITB"){
				str += fillFITBQues(compreQues);
			}else if(additionalQuesType === "SEQUENCE"){
				str += fillSEQQues(compreQues);
			}else if(additionalQuesType === "MTC"){
				str += fillMTCQues(compreQues,columnType,currentChildQuestionsNormal);
			}else if(additionalQuesType === "GROUP"){
				str += fillBucketQues(compreQues,currentChildQuestionsNormal);
			}
			$('.normalBtn,.underreview,.clearResponse,.clearResponseGroup').hide();
			$('.groupBtn').show();
		}else{
			str += fillCompQues(compreQues);
			str += '<div id="compreQuesText" class="leftDiv" style="margin-left:0px;">';
			str +='<div align="right" style="float:right;"><a  href="javascript:;" id="scrollToBottom" title="Scroll Down" onclick="scrollToBottom()"><img width="28" height="28" align="right" alt="Scroll Down" src="images/Down.png" style=""></a></div>';
			str += "<div id='quesOuterDiv'>";

			if(groupComprehensionQuestions == "false" || groupComprehensionQuestions == "" || typeof(groupComprehensionQuestions) == "undefined"){
				if(ques.displayQuestionNo == "true" || ques.displayQuestionNo == "" || typeof(ques.displayQuestionNo) == "undefined"){
					str +="<div class='divHeader'>";
					str +="<b><span class='questionNumber'>"+mockLabels.questionNo+"</span>. "+eval(iOAP.curQues+1)+"</b>";
					str +="</div>";
				}
				if(ques.quesType == "MCQ"){
					str += fillMCQQues(ques.quesLangBeans[mockVar.langIndex].quesText,ques.options,ques.quesParam.selectedOptId);
				}else if(ques.quesType == "MSQ"){
					str += fillMSQQues(ques.quesLangBeans[mockVar.langIndex].quesText,ques.options,ques.quesParam.selectedOptId);
				}else if(ques.quesType == "SA"){
					str += fillSAQues(ques.quesLangBeans[mockVar.langIndex].quesText,ques.quesParam.answer);
				}
			}else{
				//for(var l=0;l<currentChildQuestions;l++){
				if(ques.displayQuestionNo == "true" || ques.displayQuestionNo == "" || typeof(ques.displayQuestionNo) == "undefined"){
					str +="<div class='divHeader'>";
					str +="<b><span class='questionNumber'>"+mockLabels.questionNo+"</span>.<span id='startQ'><span> - <span class='questionNumber'>"+mockLabels.questionNo+"</span>.<span id='endQ'><span></b>";
					str +="</div>";
				}
				for(var m=0;m<mockVar.curSectionQuestions.length;m++){
					if(mockVar.curSectionQuestions[m].comprehensionId ==  mockVar.compreLaqQues[compreQuesIndex].quesId){
						str = str.replace("<span id='startQ'><span>",m + 1);
						if(mockVar.curSectionQuestions[m].quesType == "MCQ"){
							str += fillMCQQuesGroup(mockVar.curSectionQuestions[m].quesLangBeans[mockVar.langIndex].quesText,mockVar.curSectionQuestions[m].options,mockVar.curSectionQuestions[m].quesParam.selectedOptId,mockVar.curSectionQuestions[m],m,mockVar.curSectionQuestions[m].quesId);
							endQ = m;
						}else if(mockVar.curSectionQuestions[m].quesType == "MSQ"){
							str += fillMSQQuesGroup(mockVar.curSectionQuestions[m].quesLangBeans[mockVar.langIndex].quesText,mockVar.curSectionQuestions[m].options,mockVar.curSectionQuestions[m].quesParam.selectedOptId,mockVar.curSectionQuestions[m],m,mockVar.curSectionQuestions[m].quesId);
							endQ = m;
						}else if(mockVar.curSectionQuestions[m].quesType == "SA"){
							str += fillSAQuesGroup(mockVar.curSectionQuestions[m].quesLangBeans[mockVar.langIndex].quesText,mockVar.curSectionQuestions[m].quesParam.answer,mockVar.curSectionQuestions[m],m,mockVar.curSectionQuestions[m].quesId);
							endQ = m;
						}
					}
				}
				str = str.replace("<span id='endQ'><span>",endQ + 1);	
				$('.normalBtn,.underreview,.clearResponse,.clearResponseGroup').hide();
				$('.groupBtn').show();
				//	}
			}
		}
		str += '<div align="right" style="float:right;clear:both"><a onclick="scrollToTop()" title="Scroll Up" id="scrollToTop"><img width="30" height="30" alt="Scroll Up" style="" src="images/Up.png"></a></div>';
		str += "</div>";
	}else if(ques.laqId != 0){
		compreQuesIndex = mockVar.compreLaqQues.inArray(ques.laqId, 'quesId');
		parentQuesIndex = iOAP.secDetails[iOAP.curSection].questions.inArray(ques.laqParentId, 'quesId');
		var laqQues = mockVar.compreLaqQues[compreQuesIndex];
		var groupLaqQuestions = '';
		var endQ = '';
		groupLaqQuestions = mockVar.compreLaqQues[compreQuesIndex].groupComprehensionLaqQuestions;
		/*	for(var k=0;k<mockVar.curSectionQuestions.length;k++){
				if(mockVar.curSectionQuestions[k].laqId ==  mockVar.compreLaqQues[compreQuesIndex].quesId){
					currentChildQuestions++;
				}
			}*/
		if($.trim(laqQues.langData[mockVar.langIndex].quesText).length >0){
			str += fillLAQues(laqQues, parentQuesIndex);
			str += '<div id="LAQuesText" class="leftDiv" style="margin-left:0px;">';
			str +='<div align="right" style="float:right;"><a  href="javascript:;" id="scrollToBottom" title="Scroll Down" onclick="scrollToBottom()"><img width="28" height="28" align="right" alt="Scroll Down" src="images/Down.png" style=""></a></div>';
			str += "<div id='quesOuterDiv'>";
			if(groupLaqQuestions == "false" || groupLaqQuestions == "" || typeof(groupLaqQuestions) == "undefined"){
				if(ques.displayQuestionNo == "true" || ques.displayQuestionNo == "" || typeof(ques.displayQuestionNo) == "undefined"){
					str +="<div class='divHeader'>";
					str +="<b><span class='questionNumber'>"+mockLabels.questionNo+"</span>. "+eval(iOAP.curQues+1)+"</b>";
					str +="</div>";
				}
				if(ques.quesType == "MCQ"){
					str += fillMCQQues(ques.quesLangBeans[mockVar.langIndex].quesText,ques.options,ques.quesParam.selectedOptId);
				}else if(ques.quesType == "MSQ"){
					str += fillMSQQues(ques.quesLangBeans[mockVar.langIndex].quesText,ques.options,ques.quesParam.selectedOptId);
				}else if(ques.quesType == "SA"){
					str += fillSAQues(ques.quesLangBeans[mockVar.langIndex].quesText,ques.quesParam.answer);
				}
			}else{
				//for(var l=0;l<currentChildQuestions;l++){

				if(ques.displayQuestionNo == "true" || ques.displayQuestionNo == "" || typeof(ques.displayQuestionNo) == "undefined"){
					str +="<div class='divHeader'>";
					str +="<b><span class='questionNumber'>"+mockLabels.questionNo+"</span>.<span id='startQ'><span> - <span class='questionNumber'>"+mockLabels.questionNo+"</span>.<span id='endQ'><span></b>";
					str +="</div>";
				}
				for(var m=0;m<mockVar.curSectionQuestions.length;m++){
					if(mockVar.curSectionQuestions[m].laqId ==  mockVar.compreLaqQues[compreQuesIndex].quesId){
						str = str.replace("<span id='startQ'><span>",m + 1);
						if(mockVar.curSectionQuestions[m].quesType == "MCQ"){
							str += fillMCQQuesGroup(mockVar.curSectionQuestions[m].quesLangBeans[mockVar.langIndex].quesText,mockVar.curSectionQuestions[m].options,mockVar.curSectionQuestions[m].quesParam.selectedOptId,mockVar.curSectionQuestions[m],m,mockVar.curSectionQuestions[m].quesId);
							endQ = m;
						}else if(mockVar.curSectionQuestions[m].quesType == "MSQ"){
							str += fillMSQQuesGroup(mockVar.curSectionQuestions[m].quesLangBeans[mockVar.langIndex].quesText,mockVar.curSectionQuestions[m].options,mockVar.curSectionQuestions[m].quesParam.selectedOptId,mockVar.curSectionQuestions[m],m,mockVar.curSectionQuestions[m].quesId);
							endQ = m;
						}else if(mockVar.curSectionQuestions[m].quesType == "SA"){
							str += fillSAQuesGroup(mockVar.curSectionQuestions[m].quesLangBeans[mockVar.langIndex].quesText,mockVar.curSectionQuestions[m].quesParam.answer,mockVar.curSectionQuestions[m],m,mockVar.curSectionQuestions[m].quesId);
							endQ = m;
						}
					}
				}
				str = str.replace("<span id='endQ'><span>",endQ + 1);	
				$('.normalBtn,.underreview,.clearResponse,.clearResponseGroup').hide();
				$('.groupBtn').show();
			}
			str += '<div align="right" style="float:right;clear:both"><a onclick="scrollToTop()" title="Scroll Up" id="scrollToTop"><img width="30" height="30" alt="Scroll Up" style="" src="images/Up.png"></a></div>';
			str += "</div>";
		}else{
			str += "<div id='LAQuesText' class='leftDiv' style='margin-left:0px;'>";
			str +='<div align="right" style="float:right;"><a  href="javascript:;" id="scrollToBottom" title="Scroll Down" onclick="scrollToBottom()"><img width="28" height="28" align="right" alt="Scroll Down" src="images/Down.png" style=""></a></div>';
			str += "<div id='quesOuterDiv'>";
			if(groupLaqQuestions == false || groupLaqQuestions == "" || typeof(groupLaqQuestions) == "undefined" ){
				if(ques.displayQuestionNo == "true" || ques.displayQuestionNo == "" || typeof(ques.displayQuestionNo) == "undefined"){
					str +="<div class='divHeader'>";
					str +="<b><span class='questionNumber'>"+mockLabels.questionNo+"</span>. "+eval(iOAP.curQues+1)+"</b>";
					str +="</div>";
				}
				if(ques.quesType == "MCQ"){
					str += fillMCQQues(ques.quesLangBeans[mockVar.langIndex].quesText,ques.options,ques.quesParam.selectedOptId);
				}else if(ques.quesType == "MSQ"){
					str += fillMSQQues(ques.quesLangBeans[mockVar.langIndex].quesText,ques.options,ques.quesParam.selectedOptId);
				}else if(ques.quesType == "SA"){
					str += fillSAQues(ques.quesLangBeans[mockVar.langIndex].quesText,ques.quesParam.answer);
				}
			}else{
				if(ques.displayQuestionNo == "true" || ques.displayQuestionNo == "" || typeof(ques.displayQuestionNo) == "undefined"){
					str +="<div class='divHeader'>";
					str +="<b><span class='questionNumber'>"+mockLabels.questionNo+"</span>.<span id='startQ'><span> - <span class='questionNumber'>"+mockLabels.questionNo+"</span>.<span id='endQ'><span></b>";
					str +="</div>";
				}
				for(var l=0;l<currentChildQuestions;l++){
					for(var m=0;m<mockVar.curSectionQuestions.length;m++){
						if(mockVar.curSectionQuestions[m].laqId ==  mockVar.compreLaqQues[compreQuesIndex].quesId){
							str = str.replace("<span id='startQ'><span>",m + 1);
							if(mockVar.curSectionQuestions[m].quesType == "MCQ"){
								str += fillMCQQuesGroup(mockVar.curSectionQuestions[m].quesLangBeans[mockVar.langIndex].quesText,mockVar.curSectionQuestions[m].options,mockVar.curSectionQuestions[m].quesParam.selectedOptId,mockVar.curSectionQuestions[m],l,mockVar.curSectionQuestions[m].quesId);
								endQ = m;
							}else if(mockVar.curSectionQuestions[m].quesType == "MSQ"){
								str += fillMSQQuesGroup(mockVar.curSectionQuestions[m].quesLangBeans[mockVar.langIndex].quesText,mockVar.curSectionQuestions[m].options,mockVar.curSectionQuestions[m].quesParam.selectedOptId,mockVar.curSectionQuestions[m],l,mockVar.curSectionQuestions[m].quesId);
								endQ = m;
							}else if(mockVar.curSectionQuestions[m].quesType == "SA"){
								str += fillSAQuesGroup(mockVar.curSectionQuestions[m].quesLangBeans[mockVar.langIndex].quesText,mockVar.curSectionQuestions[m].quesParam.answer,mockVar.curSectionQuestions[m],l,mockVar.curSectionQuestions[m].quesId);
								endQ = m;
							}

						}
					}
				}
				str = str.replace("<span id='endQ'><span>",endQ + 1);
				$('.normalBtn,.underreview,.clearResponse,.clearResponseGroup').hide();
				$('.groupBtn').show();
			}
			str += '<div align="right" style="float:right;clear:both"><a onclick="scrollToTop()" title="Scroll Up" id="scrollToTop"><img width="30" height="30" alt="Scroll Up" style="" src="images/Up.png"></a></div>';
			str += "</div>";
		}
	}
	return str;
}

function quesGroupContent(ques){
	grpAllMultimediaPlayedAtOnceCount=0;
	var str='' ;
	str += "<div class='questionTypeCont'></div>";
	str += '<div id="Questn_Innr_Div_section"><div id="Subjt_Div"></div><div id="Subdetail_Div"><div style="float:right;margin-right:5px;">';
	if(ques.quesType != 'PROGRAMMING TEST' && mockVar.langCount>1){
		str += "<div class='chooseLang'> <span class='viewLang'>"+mockLabels.viewIn+"&nbsp</span><select class='choose_lang auditlogSelect' onchange='changeLang(this.value)'> ";
		for(var i=0;i<mockVar.languages.length;i++){
			if(mockVar.languages[i]!=null && typeof(mockVar.languages[i])!='undefined'){
				str +="<option";
				if(i==mockVar.curQuesBean.quesLangBeans[mockVar.langIndex].langId)
					str += " selected='selected'";
				str +=  " value='"+i+"'>"+mockVar.languages[i]+"</option>";
			}
		}
		str +="</select></div>";
	}
	str += '</div></div></div>';
	str += "<div  class='leftDiv groupQuestionsDiv' style='width:99.6%'>";
	str +="<div id='groupWarning' style='display:none'></div>";
	$(".savenext").val(mockLabels.savenext) ;
	for(i=0;i<ques.length;i++)	{
		if(ques[i].quesType == "MCQ" && ques[i].comprehensionId == 0 && ques[i].laqId == 0){
			str += fillMCQQuesGroup(ques[i].quesLangBeans[mockVar.langIndex].quesText,ques[i].options,ques[i].quesParam.selectedOptId,ques[i],i,ques[i].quesId);
		}else if(ques[i].quesType == "MSQ" && ques[i].comprehensionId == 0 && ques[i].laqId == 0){
			str += fillMSQQuesGroup(ques[i].quesLangBeans[mockVar.langIndex].quesText,ques[i].options,ques[i].quesParam.selectedOptId,ques[i],i,ques[i].quesId);
		}else if(ques[i].quesType == "SA" && ques[i].comprehensionId == 0 && ques[i].laqId == 0){
			str += fillSAQuesGroup(ques[i].quesLangBeans[mockVar.langIndex].quesText,ques[i].quesParam.answer,ques[i],i,ques[i].quesId);
		}else if( ques[i].comprehensionId != 0){
			compreQuesIndex = mockVar.compreLaqQues.inArray(ques[i].comprehensionId, 'quesId');
			var compreQues = mockVar.compreLaqQues[compreQuesIndex];
			var currentChildQuestions = 0;
			for(var k=0;k<ques.length;k++){
				//	for(var j=0;j<mockVar.compreLaqQues.length;j++){
				if(ques[k].comprehensionId ==  mockVar.compreLaqQues[compreQuesIndex].quesId)
					currentChildQuestions++;
				//	}
			}
			str += fillCompQues(compreQues);
			str += '<div id="compreQuesText" >';
			str += "<div  id='quesOuterDiv'>";
			for(var l=0;l<currentChildQuestions;l++){
				if(ques[i].quesType == "MCQ")
					str += fillMCQQuesGroup(ques[i].quesLangBeans[mockVar.langIndex].quesText,ques[i].options,ques[i].quesParam.selectedOptId,ques[i],i,ques[i].quesId);
				else if(ques[i].quesType == "MSQ")
					str += fillMSQQuesGroup(ques[i].quesLangBeans[mockVar.langIndex].quesText,ques[i].options,ques[i].quesParam.selectedOptId,ques[i],i,ques[i].quesId);
				else if(ques[i].quesType == "SA")
					str += fillSAQuesGroup(ques[i].quesLangBeans[mockVar.langIndex].quesText,ques[i].quesParam.answer,ques[i],i,ques[i].quesId);
				if(l!=currentChildQuestions-1)
					i++;
			}
			str += "</div></div></div>";
		}else if(ques[i].laqId != 0){
			compreQuesIndex = mockVar.compreLaqQues.inArray(ques[i].laqId, 'quesId');
			parentQuesIndex = iOAP.secDetails[iOAP.curSection].questions.inArray(ques[i].laqParentId, 'quesId');
			var laqQues = mockVar.compreLaqQues[compreQuesIndex];
			var currentChildQuestions = 0;
			//var groupLaqQuestions = '';
			//groupLaqQuestions = mockVar.compreLaqQues[compreQuesIndex].groupComprehensionLaqQuestions;
			for(var k=0;k<ques.length;k++){
				//	for(var j=0;j<mockVar.compreLaqQues.length;j++){
				if(ques[k].laqId == mockVar.compreLaqQues[compreQuesIndex].quesId)
					currentChildQuestions++;
				//	}
			}
			if($.trim(laqQues.langData[mockVar.langIndex].quesText).length >0){
				str += fillLAQues(laqQues, parentQuesIndex);
				str += '<div id="LAQuesText">';
				str += "<div  id='quesOuterDiv'>";
				for(var l=0;l<currentChildQuestions;l++){
					if(ques[i].quesType == "MCQ")
						str += fillMCQQuesGroup(ques[i].quesLangBeans[mockVar.langIndex].quesText,ques[i].options,ques[i].quesParam.selectedOptId,ques[i],i,ques[i].quesId);
					else if(ques[i].quesType == "MSQ")
						str += fillMSQQuesGroup(ques[i].quesLangBeans[mockVar.langIndex].quesText,ques[i].options,ques[i].quesParam.selectedOptId,ques[i],i,ques[i].quesId);
					else if(ques[i].quesType == "SA")
						str += fillSAQuesGroup(ques[i].quesLangBeans[mockVar.langIndex].quesText,ques[i].quesParam.answer,ques[i],i,ques[i].quesId);
					if(l!=currentChildQuestions-1)
						i++;
				}
				str += "</div></div></div>";}
			else{
				str += '<div id="LAQuesText">';
				str += "<div  id='quesOuterDiv'>";
				for(var l=0;l<currentChildQuestions;l++){
					if(ques[i].quesType == "MCQ")
						str += fillMCQQuesGroup(ques[i].quesLangBeans[mockVar.langIndex].quesText,ques[i].options,ques[i].quesParam.selectedOptId,ques[i],i,ques[i].quesId);
					else if(ques[i].quesType == "MSQ")
						str += fillMSQQuesGroup(ques[i].quesLangBeans[mockVar.langIndex].quesText,ques[i].options,ques[i].quesParam.selectedOptId,ques[i],i,ques[i].quesId);
					else if(ques[i].quesType == "SA")
						str += fillSAQuesGroup(ques[i].quesLangBeans[mockVar.langIndex].quesText,ques[i].quesParam.answer,ques[i],i,ques[i].quesId);
					if(l!=currentChildQuestions-1)
						i++;
				}
				str += "</div></div></div>";
			}
		}else if(ques[i].quesType == "SUBJECTIVE"){
			str+=fillSubjectiveQuesGroup(ques[i].quesLangBeans[mockVar.langIndex].quesText,ques[i],i,ques[i].quesId);
		}
	}
	str +='</div>';
	return str;
}


function changeHelpLang(langId){
	var str = '', useFulString='', useFulStringListString='', langDivString='';
	if(mockVar.usefuldataLanguages.length>2){
		str += "<div style='width:100%'>";
		str += "<span class='usefulDataLang'> "+mockLabels.viewIn+" <select onchange='changeHelpLang(this.value)'> ";
		for(var i=0;i<mockVar.usefuldataLanguages.length;i++){
			if(mockVar.usefuldataLanguages[i]!=null && typeof(mockVar.usefuldataLanguages[i])!='undefined'){
				str +="<option";
				if(i==langId)
					str += " selected='selected'";
				str +=  " value='"+i+"'>"+mockVar.usefuldataLanguages[i]+"</option>";
			}
		}
		str +="</select></span></div>";
		langDivString=str;
		if(langDivString!=''){
			$('.usefulDataLangDiv').html(langDivString);
		}
	}
	//str += '<div class="usefulDataContent">';
	if(mockVar.helpContent[langId]!= null && $.trim(mockVar.helpContent[langId]) != ""){
		var strng;
		strng=mockVar.helpContent[langId];
		if(strng.indexOf(".pdf")!=-1){
			if(strng.indexOf("UploadedPDF_")==-1){
				isUsefullDataMedia = true;
				//useFulString+="<ul class='clearfixcls'>";
				//useFulString +="<li><embed src='"+mockVar.helpContent[langId]+"#toolbar=0'  height=100% width=100% ></embed></li>";
				useFulString +="<embed src='"+mockVar.helpContent[langId]+"#toolbar=0'  height=100% width=100% ></embed>";
				//useFulString+="</ul>";
				useFulStringListString+="<ul>";
				useFulStringListString += "<li>1</li>";
				useFulStringListString+="</ul>";
				$('.navigation').hide();
				$('.navigationArrowPrev').hide();
				$('.navigationArrowNext').hide();
				$('.maximizeicon').hide();
				hasNavigationBar=false;
			}else{
				var noOfPages=0;
				isUsefullDataMedia = false;
				noOfPages=parseInt(strng.split("UploadedPDF_")[1].split("_")[1].split(".pdf")[0]);
				/*for(var i=0;i<noOfPages;i++){
							var path=xmlFilePath+"/usefulDataFiles/usefulDataFile_"+mockVar.defaultLang+"/"+(i+1)+".jpg";
							str += "<img src='"+path+"' width=100% /><br>";
						}*/
				if(noOfPages>1){
					$('.navigation').show();
					$('.navigationArrowPrev').show();
					$('.navigationArrowNext').show();
					hasNavigationBar=true;
				}
				else{
					$('.navigation').hide();
					$('.navigationArrowPrev').hide();
					$('.navigationArrowNext').hide();
					hasNavigationBar=false;
				}
				useFulString+="<ul class='clearfixcls'>";
				for(var i=0;i<noOfPages;i++){
					var path=xmlFilePath+"/usefulDataFiles/usefulDataFile_"+langId+"/"+(i+1)+".jpg";
					useFulString += "<li><img  src='"+path+"' alt='' id='imgzoom0'></li>";
				}
				useFulString+="</ul>";

				useFulStringListString+="<ul>";
				for(var i=0;i<noOfPages;i++){
					useFulStringListString += "<li>"+(i+1)+"</li>";
				}
				useFulStringListString+="</ul>";
				$('.maximizeicon').show();
			}
		}else if(strng.indexOf(".jpg")!=-1||strng.indexOf(".jpeg")!=-1){
			isUsefullDataMedia = false;
			useFulString+="<ul class='clearfixcls'>";
			useFulString +="<li><img src='"+mockVar.helpContent[langId]+"' width=100% /></li>";
			useFulString+="</ul>";
			useFulStringListString+="<ul>";
			useFulStringListString += "<li>1</li>";
			useFulStringListString+="</ul>";
			$('.navigation').hide();
			$('.navigationArrowPrev').hide();
			$('.navigationArrowNext').hide();
			$('.maximizeicon').show();
			hasNavigationBar=false;
		}else if(strng.indexOf(".mp4")!=-1){
		isUsefullDataMedia = true;
			//useFulString+="<ul class='clearfixcls'>";
			//useFulString +="<li><div class='UsefuljwAudioVideo' id='jwVideo_"+langId+"' title='"+mockVar.helpContent[langId]+"'></div></li>";
			useFulString +="<div class='UsefuljwAudioVideo' id='jwVideo_"+langId+"' title='"+mockVar.helpContent[langId]+"'></div>";
			//useFulString+="</ul>";
			useFulStringListString+="<ul>";
			useFulStringListString += "<li>1</li>";
			useFulStringListString+="</ul>";
			$('.navigation').hide();
			$('.navigationArrowPrev').hide();
			$('.navigationArrowNext').hide();
			$('.maximizeicon').hide();
			hasNavigationBar=false;
		}else if(strng.indexOf(".mp3")!=-1){
			isUsefullDataMedia = true;
			//useFulString+="<ul class='clearfixcls'>";
			useFulString +="<div class='UsefuljwAudioVideo' id='jwAudio_"+langId+"' title='"+mockVar.helpContent[langId]+"'></div>";
			//useFulString+="</ul>";
			useFulStringListString+="<ul>";
			useFulStringListString += "<li>1</li>";
			useFulStringListString+="</ul>";
			$('.navigation').hide();
			$('.navigationArrowPrev').hide();
			$('.navigationArrowNext').hide();
			$('.maximizeicon').hide();
			hasNavigationBar=false;
		}else{
			isUsefullDataMedia = false;
			useFulString+="<ul class='clearfixcls'>";
			useFulString +="<li><span>"+mockVar.helpContent[langId]+"</span></li>";
			useFulString+="</ul>";
			useFulStringListString+="<ul>";
			useFulStringListString += "<li>1</li>";
			useFulStringListString+="</ul>";
			$('.navigation').hide();
			$('.navigationArrowPrev').hide();
			$('.navigationArrowNext').hide();
			$('.maximizeicon').show();
			hasNavigationBar=false;
		}
	}else{
		isUsefullDataMedia = true;
		useFulString+="<ul class='clearfixcls'>";
		useFulString +="<li><span>Help content is not available in the language selected</li>";
		useFulString+="</ul>";
		useFulStringListString+="<ul>";
		useFulStringListString += "<li>1</li>";
		useFulStringListString+="</ul>";
		$('.navigation').hide();
		$('.navigationArrowPrev').hide();
		$('.navigationArrowNext').hide();
		$('.maximizeicon').hide();
		hasNavigationBar=false;
	}

	$('.useFulImagesImages').html(useFulString);
	if(useFulStringListString!='')
		$('.useFulImagesListing').html(useFulStringListString);
	$('#modal-content').popUpWindow({
		action: "open", // open or close
		modal: true, // modal mode
		size: "large" // large, medium or large
	});
	/*str += "</div>";
	str +="<div style='overflow : hidden;'><table align='center'>";

	str +='</table></div>';
	if($(window).width()<1000){
		$('.mContent').html(str);
		$(".mpop").fadeIn('slow');
		$('.overlay').show();
		$(".mpop table").css({'text-align':'left'});
	}else{
		$('#sectionSummary').html(str);
	}*/
	playUsefulDataVideo();
}


function showHelpContent(event){
	if(avoidKeyPressing(event)){
		var str = '', useFulString='', useFulStringListString='', langDivString='';
		if(mockVar.usefuldataLanguages.length>2){
			str += "<div class='usefulDataLang'> "+mockLabels.viewIn+" <select onchange='changeHelpLang(this.value)'> ";
			for(var i=1;i<mockVar.usefuldataLanguages.length;i++){
				if(mockVar.usefuldataLanguages[i]!=null && typeof(mockVar.usefuldataLanguages[i])!='undefined'){
					str +="<option";
					if(i==mockVar.defaultLang)
						str += " selected='selected'";
					str +=  " value='"+i+"'>"+mockVar.usefuldataLanguages[i]+"</option>";
				}
			}
			str +="</select></div>";
			langDivString=str;
			if(langDivString!=''){
				$('.usefulDataLangDiv').html(langDivString);
			}
		}
		//str += '<div class="usefulDataContent" >';
		if(mockVar.helpContent[mockVar.defaultLang]!= null && $.trim(mockVar.helpContent[mockVar.defaultLang]) != ""){
			var strng;
			langId=mockVar.defaultLang;
			strng=mockVar.helpContent[mockVar.defaultLang];
			if(strng.indexOf(".pdf")!=-1){
				if(strng.indexOf("UploadedPDF_")==-1){
					isUsefullDataMedia = true;
					//useFulString+="<ul class='clearfixcls'>";
					//useFulString +="<li><embed src='"+mockVar.helpContent[langId]+"#toolbar=0'  height=100% width=100% ></embed></li>";
					useFulString +="<embed src='"+mockVar.helpContent[langId]+"#toolbar=0'  height=100% width=100% ></embed>";
					//useFulString+="</ul>";
					useFulStringListString+="<ul>";
					useFulStringListString += "<li>1</li>";
					useFulStringListString+="</ul>";
					$('.navigation').hide();
					$('.navigationArrowPrev').hide();
					$('.navigationArrowNext').hide();
					$('.maximizeicon').hide();
					hasNavigationBar=false;
				}else{
					var noOfPages=0;
					isUsefullDataMedia = false;
					noOfPages=parseInt(strng.split("UploadedPDF_")[1].split("_")[1].split(".pdf")[0]);
					/*for(var i=0;i<noOfPages;i++){
							var path=xmlFilePath+"/usefulDataFiles/usefulDataFile_"+mockVar.defaultLang+"/"+(i+1)+".jpg";
							str += "<img src='"+path+"' width=100% /><br>";
						}*/
					if(noOfPages>1){
						$('.navigation').show();
						$('.navigationArrowPrev').show();
						$('.navigationArrowNext').show();
						hasNavigationBar=true;
					}
					else{
						$('.navigation').hide();
						$('.navigationArrowPrev').hide();
						$('.navigationArrowNext').hide();
						hasNavigationBar=false;
					}
					useFulString+="<ul class='clearfixcls'>";
					for(var i=0;i<noOfPages;i++){
						var path=xmlFilePath+"/usefulDataFiles/usefulDataFile_"+mockVar.defaultLang+"/"+(i+1)+".jpg";
						useFulString += "<li><img  src='"+path+"' alt='' id='imgzoom0'></li>";
					}
					useFulString+="</ul>";

					useFulStringListString+="<ul>";
					for(var i=0;i<noOfPages;i++){
						useFulStringListString += "<li>"+(i+1)+"</li>";
					}
					useFulStringListString+="</ul>";
					$('.maximizeicon').show();
				}
			}else if(strng.indexOf(".jpg")!=-1||strng.indexOf(".jpeg")!=-1){
				isUsefullDataMedia = false;
				useFulString+="<ul class='clearfixcls'>";
				useFulString +="<li><img src='"+mockVar.helpContent[langId]+"' width=100% /></li>";
				useFulString+="</ul>";
				useFulStringListString+="<ul>";
				useFulStringListString += "<li>1</li>";
				useFulStringListString+="</ul>";
				$('.navigation').hide();
				$('.navigationArrowPrev').hide();
				$('.navigationArrowNext').hide();
				$('.maximizeicon').show();
				hasNavigationBar=false;
			}else if(strng.indexOf(".mp4")!=-1){
				isUsefullDataMedia = true;
				//useFulString+="<ul class='clearfixcls'>";
				//useFulString +="<li><div class='UsefuljwAudioVideo' id='jwVideo_"+langId+"' title='"+mockVar.helpContent[langId]+"'></div></li>";
				useFulString +="<div class='UsefuljwAudioVideo' id='jwVideo_"+langId+"' title='"+mockVar.helpContent[langId]+"'></div>";
				//useFulString+="</ul>";
				useFulStringListString+="<ul>";
				useFulStringListString += "<li>1</li>";
				useFulStringListString+="</ul>";
				$('.navigation').hide();
				$('.navigationArrowPrev').hide();
				$('.navigationArrowNext').hide();
				$('.maximizeicon').hide();
				hasNavigationBar=false;
			}else if(strng.indexOf(".mp3")!=-1){
				isUsefullDataMedia = true;
				//useFulString+="<ul class='clearfixcls'>";
				//useFulString +="<li><div class='UsefuljwAudioVideo' id='jwAudio_"+langId+"' title='"+mockVar.helpContent[langId]+"'></div></li>";
				useFulString +="<div class='UsefuljwAudioVideo' id='jwAudio_"+langId+"' title='"+mockVar.helpContent[langId]+"'></div>";
				//useFulString+="</ul>";
				useFulStringListString+="<ul>";
				useFulStringListString += "<li>1</li>";
				useFulStringListString+="</ul>";
				$('.navigation').hide();
				$('.navigationArrowPrev').hide();
				$('.navigationArrowNext').hide();
				$('.maximizeicon').hide();
				hasNavigationBar=false;
			}else{
				useFulString+="<ul class='clearfixcls'>";
				useFulString +="<li><span>"+mockVar.helpContent[langId]+"</span></li>";
				useFulString+="</ul>";
				useFulStringListString+="<ul>";
				useFulStringListString += "<li>1</li>";
				useFulStringListString+="</ul>";
				$('.navigation').hide();
				$('.navigationArrowPrev').hide();
				$('.navigationArrowNext').hide();
				$('.maximizeicon').hide();
				hasNavigationBar=false;
			}
		}else{
			for(var i=1;i<mockVar.usefuldataLanguages.length;i++){
				if(mockVar.usefuldataLanguages[i]!=null && typeof(mockVar.usefuldataLanguages[i])!='undefined'){
					changeHelpLang(i);
					break;
				}
			}
			/*
			useFulString+="<ul class='clearfixcls'>";
			useFulString +="<li><span>Help content is not available in the language selected</li>";
			useFulString+="</ul>";
			useFulStringListString+="<ul>";
			useFulStringListString += "<li>1</li>";
			useFulStringListString+="</ul>";
			$('.navigation').hide();
			$('.navigationArrowPrev').hide();
			$('.navigationArrowNext').hide();
			hasNavigationBar=false;
		*/}
		/*str += "</div>";
		str +="<div style='overflow : hidden;'><table align='center'>";

		str +='</table></div>';*/
		$('.useFulImagesImages').html(useFulString);
		if(useFulStringListString!='')
			$('.useFulImagesListing').html(useFulStringListString);
		$('#modal-content').popUpWindow({
			action: "open", // open or close
			modal: true, // modal mode
			size: "large" // large, medium or large
		});
		/*if($(window).width()<1000){
			$('.mContent').html(str);
			$(".mpop").fadeIn('slow');
			$('.overlay').show();
			$(".mpop table").css({'text-align':'left'});
		}else{
			$('#sectionSummary').html(str);
		}
		showModule('sectionSummary');*/
		playUsefulDataVideo();
	}
}

function fillGroups(){
	iOAP=mockVar.groups[mockVar.currentGrp];
	$("#groups").empty();
	$("#groupsResp").empty();
	var tempstr= "" ;
	var respStr = "";
	$("#groups").html(tempstr);
	if(mockVar.groups.length>0){
		str="<div>";
		if(mockVar.groups[mockVar.currentGrp].groupName.length>20)
			respStr += '<div class="grup_head" title="'+mockVar.groups[mockVar.currentGrp].groupName+'">'+mockVar.groups[mockVar.currentGrp].groupName.substring(0,15)+'...<div class="arw_drpdown"></div> <span class="crumb">/</span></div><i class="bx_arrow"></i><div class="grupbox2"><div class="subbox">'; 
		else
			respStr += '<div class="grup_head"> '+mockVar.groups[mockVar.currentGrp].groupName+'<div class="arw_drpdown"></div> <span class="crumb">/</span></div><i class="bx_arrow"></i><div class="grupbox2"><div class="subbox">'; 
		var tempiOAP ;
		for(var i=0;i< mockVar.groups.length ;i++){
			tempiOAP = mockVar.groups[i];
			var answeredQuestions = 0; 
			var notAnsweredQuestions =0;
			var markedQuestions =0;
			var noOfQuestions =0;
			var notAttemptedQuestions = 0;
			var grossKeyStrokesCount = 0;
			//var backSpaceCount = 0;
			var markedAndAnsweredQuestions=0;
			if(tempiOAP.secDetails[0].secType == 'Typing Test'){
				grossKeyStrokesCount = mockVar.typingGroup[i].keyStrokesCount;
				backSpaceCount = mockVar.typingGroup[i].backSpaceCount;
				ellapsedTime = mockVar.typingGroup[i].ellapsedTime;
			}
			for(var j=0;j<tempiOAP.secDetails.length;j++){
				answeredQuestions += tempiOAP.secDetails[j].answered;
				notAnsweredQuestions += tempiOAP.secDetails[j].notanswered;
				markedQuestions += tempiOAP.secDetails[j].marked;
				markedAndAnsweredQuestions += tempiOAP.secDetails[j].markedAndAnswered;
				noOfQuestions += tempiOAP.secDetails[j].questions.length;
				notAttemptedQuestions += tempiOAP.secDetails[j].questions.length - tempiOAP.secDetails[j].marked - tempiOAP.secDetails[j].notanswered - tempiOAP.secDetails[j].answered- tempiOAP.secDetails[j].markedAndAnswered;
			}
			/*var normGrpSec =(function(){
				var normGrpPrsnt = false;
				for(var k=0;k<tempiOAP.secDetails.length;k++){
					if(tempiOAP.secDetails[k].groupAllQuestions!=undefined && tempiOAP.secDetails[k].groupAllQuestions=="false"){
						normGrpPrsnt = true;
						break;
					}else if( typeof tempiOAP.secDetails[k].groupAllQuestions=="undefined" && tempiOAP.secDetails[k].groupAllQuestions==""){
						normGrpPrsnt = true;
						break;
					}
				}
				return normGrpPrsnt;
			})();*/
			if(typeof(mockVar.groups[i].showMarkedForReview)=="undefined"){
			mockVar.groups[i].showMarkedForReview=true;
			}
			if(mockVar.groups[i].showMarkedForReview){
				respStr += '<div class="subjectsResp subjects" id="gResp'+i+'" data-normGrpSec="true" ><span>'+mockVar.groups[i].groupName+'</span></div>';
				str+='<div class="allSections" id="g'+i+'" data-normGrpSec="true" title="'+mockVar.groups[i].groupName+'">';
			}else{
				respStr += '<div class="subjectsResp subjects" id="gResp'+i+'" data-normGrpSec="false" ><span>'+mockVar.groups[i].groupName+'</span></div>';
				str+='<div class="allSections" data-normGrpSec="false" id="g'+i+'" title="'+mockVar.groups[i].groupName+'">';
			}

			if(mockVar.groups[i].groupName.length>20)
				str += '<span style="vertical-align:middle">'+mockVar.groups[i].groupName.substring(0,20)+'...</span>';
			else
				str += '<span style="vertical-align:middle">'+mockVar.groups[i].groupName+'<span>';
			str+='<a class="tooltip1';
			/*if(mockVar.groups[i].isDisabled){
				str += " disabled ";commented to make grp summary always available on hover irrespective of that particular grp is visited or not
			}*/
			str+='">';
			if(!mockVar.groups[i].isTypingGroup){
				str+=' <div class="subject_instruction_icon1">';
				str += '</div>';}
			/*if(!mockVar.groups[i].isDisabled){commented to make grp summary always available on hover irrespective of that particular grp is visited or not*/
				if(!(i==mockVar.MaxGrpEnabled  && mockVar.groups[i].isTypingGroup)){
					str += '<div class="subject_information_div1" style="margin-top:5px;"><div class="subject_name" style="text-align:left" >';
					if(mockVar.groups[i].groupName.length>25)
						groupNameIcon = mockVar.groups[i].groupName.substring(0,25)+"...";
					else
						groupNameIcon = mockVar.groups[i].groupName;
					str += '<div><span><b>'+groupNameIcon+'</b></span></div>';
					str += '</div>';
					if(mockVar.groups[i].isTypingGroup){
						str += '<div class="notation_type_description diff_type_notation_area_inner" >';
						str += '<div><span style="text-align:left;padding-top:10px" width="80%">'+mockLabels.keyStrokesCount+': </td><td valign="top">'+grossKeyStrokesCount+'</span></div>';
						//str += '<tr><td style="text-align:left;padding-top:10px" width="80%">'+mockLabels.backspaceCount+': </td><td valign="top">'+backSpaceCount+'</td></tr>';
						//str += '<tr><td style="text-align:left;padding-top:10px" width="80%">'+mockLabels.elapsedTime+': </td><td valign="top">'+(ellapsedTime/60).toFixed(2)+'</td></tr>';
						str += '</div></center></div>';
					}else{
						str += '<div class="notation_type_description diff_type_notation_area_inner" style="background:#e5f6fc none repeat scroll 0 0;text-align:left;" >';
						str += '<div class="notation_typeDiv" title="'+mockLabels.answered+'"><span><span class="answered">'+answeredQuestions+'</span></span><span  class="type_title grpAnswered" style="text-align:left">'+mockLabels.answered+'</span></div>';
						str += '<div class="notation_typeDiv" title="'+mockLabels.notAnswered+'"><span><span  class="not_answered">'+notAnsweredQuestions+'</span></span><span class="type_title grpNotAnswered"  style="text-align:left">'+mockLabels.notAnswered+'</span></div>';
						if(mockVar.groups[i].showMarkedForReview){
							$('.mMarkReview,.mReviewAnswered,.mReviewMarked').show();
							str += '<div class="notation_typeDiv" title="'+mockLabels.notAttempted+'"><span><span class="not_visited">'+notAttemptedQuestions+'</span></span><span class="type_title grpNotAttempted" style="text-align:left" >'+mockLabels.notAttempted+'</span></div>';
							str += '<div class="notation_typeDiv" title="'+mockLabels.markReview+'"><span><span class="review">'+markedQuestions+'</span></span><span class="type_title grpMarkReview" style="text-align:left" >'+mockLabels.markReview+'</span></div>';
							if(mockVar.isMarkedForReviewConsidered=="YES"){
								str += '<div class="notation_typeDiv" title="'+mockLabels.markAnsTitle+'"><span ><span class="review_answered">'+markedAndAnsweredQuestions+'</span></span><span  class=\"type_title grpMarkedAndAnswered\" style="text-align:left"  >'+mockLabels.markAnsTitle+'</span></div>';
							}else{
								str += '<div class="notation_typeDiv" title="'+mockLabels.markAnsTitle+'"><span ><span class="review_marked">'+markedAndAnsweredQuestions+'</span></span><span  class=\"type_title grpMarkedAndAnswered\" style="text-align:left"  >'+mockLabels.markAnsTitle+'</span></div>';
							}
						}else if(mockVar.groups[i].showMarkedForReview == false && tempiOAP.secDetails.length>1){
							$('.mMarkReview,.mReviewAnswered,.mReviewMarked').hide();
							str += '<div class="notation_typeDiv" title="'+mockLabels.notAttempted+'"><span><span class="not_visited">'+notAttemptedQuestions+'</span></span><span class="type_title grpNotAttempted" style="text-align:left" >'+mockLabels.notAttempted+'</span></div>';

						}else{
							$('.mMarkReview,.mReviewAnswered,.mReviewMarked,mNotVisited').hide();
						}
						str += '</div></div>';
					}
				}
			/*}*/
			str += '</a></div>';
		}
		str +="</div></div>";
		respStr +="</div></div>";
		$('#groups').html(str);
		$('#groupsResp').html(respStr);
		// align
		$("#g"+mockVar.currentGrp).addClass("currentSectionSelected");
		if(!mockVar.groups[mockVar.MaxGrpEnabled].isTypingGroup){
			$("#g"+mockVar.currentGrp+" a").addClass("tooltipSelected1");
		} else{
			$("#g"+mockVar.currentGrp+" a").addClass("tooltipSelected1");
		}
		$("#groups .allSections").click(function (event){
			if(event.target.type!="checkbox"){
				//var groupIndex = this.id.split("g")[1];//Added by Boddu Rakesh
				if(this.id.split("g")[1]!=mockVar.currentGrp)
				changeGroup(this.id.split("g")[1]);
			}
		});
		$("#groupsResp .subjects").click(function (event){
			if(event.target.type!="checkbox"){
				//var groupIndex = this.id.split("gResp")[1];//Added by Boddu Rakesh
				if(this.id.split("gResp")[1]!=mockVar.currentGrp)
				changeGroup(this.id.split("gResp")[1]);
			}
		});
		if(jQuery(window).width()>1000){	
			var calculategroupwidth = $(window).width() - 275 - $('.components-section').width();
			//jQuery(".group-panel").css("width",calculategroupwidth);
			var calculateinnerwidth=0;
			if(navGroup==false){
				jQuery("#groups .allSections").each(function(){
					calculateinnerwidth = calculateinnerwidth + jQuery(this).outerWidth(true) + 10;
					if(calculateinnerwidth>calculategroupwidth){
						jQuery(this).hide();
						jQuery(this).nextAll().hide();
						jQuery(".components-section .group-arrow-right-disabled").attr("class","group-arrow-right");
					}
				});
			}
		}
	}
}		
function checkGroupBreakTime(){
	if(mockVar.curQuesBean.keyboardType == "AudioFile"){
		var audioElementsArray = document.getElementsByTagName('Audio');
	for(var i=0;i<audioElementsArray.length;i++){
		if(audioElementsArray[i].id=='recordedAudio'){
			audioElementsArray[i].pause();
			break;
		}
		}
		if(recordingInProgress){
		stopAudioRecording(false);
		//saveAudioRecording();
		}
	}else if(mockVar.curQuesBean.keyboardType == "VideoFile"){
		var videoElementsArray = document.getElementsByTagName('Video');
		for(var i=0;i<videoElementsArray.length;i++){
		if(videoElementsArray[i].id=='recordedVideo'){
			videoElementsArray[i].pause();
			break;
		}
		}
		if(recordingInProgress){
		stopVideoRecording(false);
		//saveVideoRecording();
		}
	}
	if(mockVar.currentGrp < mockVar.groups.length-1){
		if(!(mockVar.groups[mockVar.currentGrp].breakTime == 0)){
			mockVar.isBreakPage=1;
			if(mockVar.storeCandResponse){
				if(!isFinalSubmitStarted){
					saveBackUp(false);
				}
			}
			clearTimeout(mockVar.timeCounter);
			mockVar.timeCounter = mockVar.groups[mockVar.currentGrp].breakTime;
			if(mockVar.remainingBreakTime>0 && mockVar.resumedFromBreakPage==1 && mockVar.groupAtInterruption==mockVar.currentGrp ){
				breakTimeCounter(mockVar.remainingBreakTime);
				submitConfirmation('break');
			}
			else if(mockVar.remainingBreakTime<=0  && mockVar.resumedFromBreakPage==1 && mockVar.groupAtInterruption==mockVar.currentGrp){
				saveQuestionAutomatically();
				submitGroup();
			}
			else if(mockVar.resumedFromBreakPage==1 && mockVar.groupAtInterruption!=mockVar.currentGrp){
				//alert('Interrupted in break but current group is not the same');
			}
			else{
				breakTimeCounter(mockVar.timeCounter);
				submitConfirmation('break');
			}
		}else{
			saveQuestionAutomatically();
			submitGroup();
		}
	}else{
		submitMock("");
	}
}
function submitGroup(){
	mockVar.isBreakPage=0;
	mockVar.remainingBreakTime=0;
	mockVar.resumedFromBreakPage=0;

//	if(mockVar.currentGrp < mockVar.groups.length-1){
	if($('.typedAnswer')[0]){
		fnSubmit('NEXT');
		//$('#typedAnswer').attr('disabled',true);
		$('#finalTypingSub').attr('disabled',true);
		$('.typing').attr('disabled',true);//Mobile
		$('#finalTypingSub').removeClass().addClass('typingTestButtonDisabled btn btn-primary-blue');
	}
	$('#breakTimeDiv').hide();
	if(mockVar.groups[mockVar.currentGrp].maxTime == 0){
		mockVar.nonTimeBoundTime = mockVar.time ;
	}
	mockVar.currentGrp++;
	if(typeof(mockVar.groups[mockVar.currentGrp].instructionTime)!='undefined'&& mockVar.groups[mockVar.currentGrp].instructionTime !=0 && mockVar.groups[mockVar.currentGrp].instru.length>0){
		mockVar.isInstruPage=1;
		if(mockVar.storeCandResponse){
			if(!isFinalSubmitStarted){
				saveBackUp(false);
			}
		}
		clearTimeout(mockVar.timeCounter);
		mockVar.timeCounter = mockVar.groups[mockVar.currentGrp].instructionTime;
		if(mockVar.remainingInstruTime>0 && mockVar.resumedFromInstruPage==1 && mockVar.groupAtInterruption==mockVar.currentGrp ){
			instruTimeCounter(mockVar.remainingInstruTime);
			showGrpInstructions();
		}
		else if(mockVar.remainingInstruTime<=0  && mockVar.resumedFromInstruPage==1 && mockVar.groupAtInterruption==mockVar.currentGrp){
			moveToGroupFromGrpInst();
		}
		else if(mockVar.resumedFromInstruPage==1 && mockVar.groupAtInterruption!=mockVar.currentGrp){
		}
		else{
			instruTimeCounter(mockVar.timeCounter);
			showGrpInstructions();
		}
	}else{
		moveToGroupFromGrpInst();
	}
}
function showGrpInstructions(){
	var content="",o="";
	//$('#iframeGrp').contents().find("#grpInst").empty();
	$("#grpInst").empty();
	for(var i=0;i<mockVar.groups[mockVar.currentGrp].instru.length;i++){
		langId=mockVar.groups[mockVar.currentGrp].instru[i].langId;
		if(mockVar.languages[langId]!=null && typeof(mockVar.languages[langId])!='undefined'){
			o = new Option(mockVar.languages[langId], langId);
			$(o).html(mockVar.languages[langId]);
			//$('#iframeGrp').contents().find("#grpInst").append(o);
			$("#grpInst").append(o);
		}
	}
	if(mockVar.groups[mockVar.currentGrp].instru.length>1)
		$("#instView").show();
	//$('#iframeGrp').contents().find("#instView").show();
	//$('#iframeGrp').contents().find('#InstruContent').empty();
	$('#InstruContent').empty();
	for(var i=0; i<mockVar.groups[mockVar.currentGrp].instru.length;i++){
		content = mockVar.groups[mockVar.currentGrp].instru[i].content;
		langId = mockVar.groups[mockVar.currentGrp].instru[i].langId;
		//$('#iframeGrp').contents().find('#InstruContent').append("<div class='GrpInst"+langId+"' style='display:none;'>"+content+"</div>");	
		$('#InstruContent').append("<div class='GrpInst"+langId+"' style='display:none;'>"+content+"</div>");	
	}
	//$('#iframeGrp').contents().find('.GrpInst'+mockVar.groups[mockVar.currentGrp].instru[0].langId).show();
	$('.GrpInst'+mockVar.groups[mockVar.currentGrp].instru[0].langId).show();
	$('#instruTimeDiv').show();
	if($(window).width()>768){
		$('.preGroupInstR').show();
	}
	$('.Questn_Area').hide();
	$('#col2').hide();
	$("#sectionSummaryDiv").hide();
	$('.helpinstruction_div').hide();
	$('.nav-container').hide();
	$('.section-timepanel').hide();
	$('.subject-selection').hide();
	$('.viewProfile').hide();
	$('.collapsebel_panel').hide();
	$('.expand_icon').hide();
	$('.subject-section-rightarrow').hide();
	$('#loadCalc').hide();
	$('.protactor-div').hide();
	$('.scratch-pad-container').hide();
	$('.textarea-div').hide();
	$('.courseInfoPop').hide();
	$('.subject-section-rightarrow').hide();
	$('.subheader_tab,.grup_components,.q_tab,.btntab,.hamburgerBar').hide();
	$("#pWait").hide();
	playUsefulDataVideo();
	if (jQuery(window).width() > 1000) {
		quizPageHeight();
	} else {
		setDIVHeight_resp(); 
	}
	tb_remove();
}

function changeGrpInst(value){
	//$('#iframeGrp').contents().find('*[class^=GrpInst]').hide();
	//$('#iframeGrp').contents().find('.GrpInst'+value).show();
	$('*[class^=GrpInst]').hide();
	$('.GrpInst'+value).show();
}
function moveToGroupFromGrpInst(){
	mockVar.isInstruPage=0;
	mockVar.remainingInstruTime=0;
	mockVar.resumedFromInstruPage=0;
	navSection =false;
	if($(window).width()< 1000){
		$('#col2').hide();
		$('.subheader_tab,.grup_components,.q_tab,.btntab').show();
	}else
		$('#col2').show();
	$('#instruTimeDiv').hide();
	$('.preGroupInstR').hide();
	$('#questionContent').show();
	$('.collapsebel_panel').show();
	$('.helpinstruction_div').show();
	$('.nav-container').show();
	$('.section-timepanel').show();
	$('.subject-selection').show();
	$('.viewProfile').show();	
	jQuery(".subject-arrow-right").attr("class","subject-arrow-right-disabled");
	jQuery(".subject-arrow-left").attr("class","subject-arrow-left-disabled");
	$('.subject-section-rightarrow').show();
	if(typeof(mockVar.groups[mockVar.currentGrp].instructionTime)!='undefined'&& mockVar.groups[mockVar.currentGrp].instructionTime !=0 && mockVar.groups[mockVar.currentGrp].instru.length>0){
		$('.viewGrpInstruDiv').show();
	}else
		$('.viewGrpInstruDiv').hide();
	mockVar.MaxGrpEnabled=mockVar.currentGrp;
	if(ringTheBell){
		if(mockVar.groups[mockVar.currentGrp].maxTime > 0 && mockVar.groups[mockVar.currentGrp].maxTime < ringTheBellTimeLeft){
			mockVar.time = mockVar.groups[mockVar.currentGrp].maxTime;
		}else
			mockVar.time = ringTheBellTimeLeft;
	}else{
		if(mockVar.groups[mockVar.currentGrp].maxTime > 0){
			mockVar.time = mockVar.groups[mockVar.currentGrp].maxTime;
		}else{
			mockVar.time = mockVar.nonTimeBoundTime;
		}
	}
	mockVar.groups[mockVar.currentGrp].isDisabled = false;
	//Added by sai for extra time 
	if(mockVar.groupConfigArray!=undefined && mockVar.groupConfigArray.length>0){
		mockVar.groups[mockVar.currentGrp].isEditable=mockVar.groupConfigArray[mockVar.currentGrp].isEditable=="true"?"true":"false";
		mockVar.groups[mockVar.currentGrp].isViewable=mockVar.groupConfigArray[mockVar.currentGrp].isViewable=="true"?"true":"false";
	}
	//ends
	mockVar.minSubmitTime = mockVar.groups[mockVar.currentGrp].minTime;
	showModule("Questn_Area");
	//fillGroups();
	iOAP=mockVar.groups[mockVar.currentGrp];
	getQuestion(mockVar.defaultLang);
	numPanelSec();
	fillSections();
	enableOptButtons();
	fillNumberPanel();
	clearTimeout(mockVar.timeCounter);
	mockVar.timeCounter = setTimeout(function(){startCounter(mockVar.time-1);},1000);
	/*
	 * }else{ submitMock(); //submit exam }
	 */	if(iOAP.noOptSec>0){
		 $('#noOptSec').html(iOAP.noOptSec);
		 $('#maxOptSec').html(iOAP.maxNoOptSec);
		 $("#showOptionalSecSummary").show();
	 }else{
		 $("#showOptionalSecSummary").hide();
	 }
	 if (jQuery(window).width() > 1000) {
		 quizPageHeight();
	 } else {
		 setDIVHeight_resp(); 
	 }
	 if(mockVar.storeCandResponse){
		 if(!isFinalSubmitStarted){
			 saveBackUp(false);
		 }
	 }
}
function changeGroup(id){
	if(mockVar.curQuesBean.keyboardType == "AudioFile" || mockVar.curQuesBean.keyboardType == "VideoFile"){
		if(recordingInProgress){
			cnfPop('groupNavigationRecordingPopup');
			$('#groupNavigationRecordingPopupMsg').html($(globalXmlvar).find('groupNavigationRecordingPopupMsg').text());
			$('.info').html($(globalXmlvar).find('info').text());
			$('.popClose').html($(globalXmlvar).find('close').text());
			$('.Yes').html($(globalXmlvar).find('Yes').text());
			$('.No').html($(globalXmlvar).find('No').text());
			$('#grpNumber').val(id);
		return;
		}else{
			navigateToGroup(id);
		}
	}else{
		navigateToGroup(id);
	}
}

var incr=0;
function fillSections(){
	if($('.collapsebel_panel').css('display') != 'none'){
		jQuery(".expand_icon").css("display","none");
	}
	fillGroups();
	var str="";
	var respStr = "";
	if(iOAP.secDetails[iOAP.curSection].secName.length>20){
		respStr += '<div class="grup_head" title="'+iOAP.secDetails[iOAP.curSection].secName+'"><div class="astrk"> * </div>'+iOAP.secDetails[iOAP.curSection].secName.substring(0,15)+'...<div class="arw_drpdown"></div></div><i class="bx_arrow"></i><div class="grupbox2"><div class="subbox">';
	}else{
		respStr += '<div class="grup_head"><div class="astrk"> * </div>'+iOAP.secDetails[iOAP.curSection].secName+' <div class="arw_drpdown"></div></div><i class="bx_arrow"></i><div class="grupbox2"><div class="subbox">';
	}
	var secNameIcon;
	for(var i=0;i<iOAP.secDetails.length ;i++){
		var isGroupAllQuestionsText = iOAP.secDetails[i].groupAllQuestions == 'undefined' || iOAP.secDetails[i].groupAllQuestions == '' ? "false":iOAP.secDetails[i].groupAllQuestions;
		if(isGroupAllQuestionsText == 'false')
			isGroupAllQuestions = false;
		else
			isGroupAllQuestions = true;
		var answeredQuestions = iOAP.secDetails[i].answered;
		var notAnsweredQuestions = iOAP.secDetails[i].notanswered;
		var markedQuestions = iOAP.secDetails[i].marked;
		var noOfQuestions = iOAP.secDetails[i].questions.length;
		var markedAndAnsweredQuestions= iOAP.secDetails[i].markedAndAnswered;
		var notAttemptedQuestions = noOfQuestions  - notAnsweredQuestions - answeredQuestions - markedQuestions - markedAndAnsweredQuestions;
		str+='<div class="subject-name" id="s'+i+'" title="'+iOAP.secDetails[i].secName+'">';
		respStr += '<div class="subjects" id="sResp'+i+'" >';
		if(iOAP.secDetails[i].isOptional == 'true'){
			str += '<input name="optSec" id="opt'+i+'"';
			respStr += '<input name="optSec" id="optResp'+i+'"';
			//respStr += '<div class="tickCheckedDefault"></div>';
			if(iOAP.secDetails[i].isSelected == true){
				str += ' checked ';
				respStr += ' checked ';
			}
			if(mockVar.currentGrp != mockVar.MaxGrpEnabled && mockVar.groups[mockVar.currentGrp].isEditable == "false"){
				str += " disabled ";
				respStr += ' disabled ';
			}
			str += 'type="checkbox"></input>';
			respStr += 'type="checkbox"></input>';
		}
		if(iOAP.secDetails[i].secName.length>20){
			str += '<span style="vertical-align:middle">'+iOAP.secDetails[i].secName.substring(0,20)+'...</span>';

		}else{
			str += '<span style="vertical-align:middle">'+iOAP.secDetails[i].secName+'</span>';
			// respStr += iOAP.secDetails[i].secName;
		}
		respStr += iOAP.secDetails[i].secName;
		respStr += '</div>';
		str += '<a  class="tooltip1"> <div class="subject_instruction_icon1" id="icon'+i+'" ></div>';
		//str +='</div>';
		str += '<div class="subject_information_div1" ><div>';
		//str += '<span class="subject_information_div1"><table class="subject_name" style="text-align:left" >';
		if(iOAP.secDetails[i].secName.length>25)
			secNameIcon = iOAP.secDetails[i].secName.substring(0,25)+"...";
		else
			secNameIcon = iOAP.secDetails[i].secName;
		str += '<div class="subject_name" style="text-align:left">'+secNameIcon+'</div>';
		str += '</div>';
		str += '<div class="notation_type_description diff_type_notation_area_inner" style="background:#e5f6fc none repeat scroll 0 0;text-align:left" >';
		str += '<div class="notation_typeDiv" title="'+mockLabels.answered+'"><span class="answered">'+answeredQuestions+'</span><span class=\"type_title secAnswered\"  style="text-align:left">'+mockLabels.answered+'</span></div>';
		str += '<div class="notation_typeDiv" title="'+mockLabels.notAnswered+'"><span  class="not_answered">'+notAnsweredQuestions+'</span><span class=\"type_title secNotAnswered\"  style="text-align:left" >'+mockLabels.notAnswered+'</span></div>';
		
		if(typeof(iOAP.secDetails[i].showMarkedForReview)=="undefined"){
		iOAP.secDetails[i].showMarkedForReview=true;
		}
		
		if(iOAP.secDetails[i].showMarkedForReview){
			str += '<div class="notation_typeDiv" title="'+mockLabels.notAttempted+'"><span class="not_visited">'+notAttemptedQuestions+'</span><span class=\"type_title secNotAttempted\"  style="text-align:left" >'+mockLabels.notAttempted+'</span></div>';
			str += '<div class="notation_typeDiv" title="'+mockLabels.markReview+'"><span class="review">'+markedQuestions+'</span><span class=\"type_title secMarkReview\"  style="text-align:left" >'+mockLabels.markReview+'</span></div>';
			if(mockVar.isMarkedForReviewConsidered=="YES"){
				$(".review_mark").hide();
				str += '<div class="notation_typeDiv review_answer" id="" title="'+mockLabels.markAnsTitle+'"><span class="review_answered">'+markedAndAnsweredQuestions+'</span><span class=\"type_title secMarkedAndAnswered\"  style="text-align:left" >'+mockLabels.markAnsTitle+' </span></div>';
			}else{
				$(".review_answer").hide();
				str += '<div class="notation_typeDiv review_mark" id="" title="'+mockLabels.markAnsTitle+'"><span class="review_marked">'+markedAndAnsweredQuestions+'</span><span class=\"type_title secMarkedAndAnswered\"  style="text-align:left">'+mockLabels.markAnsTitle+' </span></div>';
			}
		}else{
		$(".review_mark").hide();
		$(".review_answer").hide();
		$(".MarkForReviewDiv").hide();
		}
		/*else if(iOAP.secDetails[i].showMarkedForReview){
			str += '<div class="notation_typeDiv" title="'+mockLabels.markReview+'"><span class="review">'+markedQuestions+'</span><span class=\"type_title secMarkReview\"  style="text-align:left" >'+mockLabels.markReview+'</span></div>';
			str += '<div class="notation_typeDiv" title="'+mockLabels.notAttempted+'"><span class="not_visited">'+notAttemptedQuestions+'</span><span class=\"type_title secNotAttempted\"  style="text-align:left" >'+mockLabels.notAttempted+'</span></div>';
			if(mockVar.isMarkedForReviewConsidered=="YES"){
				str += '<div class="notation_typeDiv" title="'+mockLabels.markAnsTitle+'"><span class="review_answered">'+markedAndAnsweredQuestions+'</span><span class=\"type_title secMarkedAndAnswered\"  style="text-align:left" >'+mockLabels.markAnsTitle+' </span></div>';
			}else{
				str += '<div class="notation_typeDiv" title="'+mockLabels.markAnsTitle+'"><span class="review_marked">'+markedAndAnsweredQuestions+'</span><span class=\"type_title secMarkedAndAnswered\"  style="text-align:left" >'+mockLabels.markAnsTitle+' </span></div>';
			}
		}*/
		str += '</div></div>';
		//document.getElementById('id'+i).style='block';
		$('.answeredCount').text(iOAP.secDetails[iOAP.curSection].answered);
		$('.notAnsweredCount').text(iOAP.secDetails[iOAP.curSection].notanswered);
		$('.markedCount').text(iOAP.secDetails[iOAP.curSection].marked);
		$('.markedReviewCount').text(iOAP.secDetails[iOAP.curSection].markedAndAnswered);
		$('.markedAnsweredCount').text(iOAP.secDetails[iOAP.curSection].markedAndAnswered);
		//markedAnsweredCount
		var noOfQuestions1 = iOAP.secDetails[iOAP.curSection].questions.length;
		var notAttemptedQuestions1 = noOfQuestions1  - iOAP.secDetails[iOAP.curSection].answered - iOAP.secDetails[iOAP.curSection].notanswered - iOAP.secDetails[iOAP.curSection].marked - iOAP.secDetails[iOAP.curSection].markedAndAnswered;
		$('.notVisitedCount').text(notAttemptedQuestions1);
		str +='</a></div>';
	}
	//str +="</div>"
	respStr += "</div></div>";
	$('#sections').html(str);
	$('#secResp').html(respStr);
	$("#s"+iOAP.curSection).addClass("selectedsubject");
	$("#s"+iOAP.curSection+" a").addClass("tooltipSelected1");
	/*if($(".subject-name").hasClass("selectedsubject")){
		$('#icon'+iOAP.curSection).hide();
		}*/
	/*if( iOAP.secDetails.length>4 && ($.browser.msie) ){
		for(var i=4;i<iOAP.secDetails.length;i=i+5){
			$('  .tooltip").hover(
				function(){ $(this).find(".classic").css({"margin-left":"-60px"});}
				, function(){$(this).find(".classic").css({"margin-left":"-999px"});});
		}
	}*/
	//document.getElementById('id'+i).style='block';

	$("#sections .subject-name input").click(function(event){
		if(this.checked){
			optSecCheck(this.id.split("opt")[1],event);
		}
		else{
			optSecUncheck(this.id.split("opt")[1],event);
		}
	});
	$("#sections .subject-name").click(function (event){
		if(event.target.type!="checkbox"){
			//if()
			if(this.id.split("s")[1]!=iOAP.curSection)
				changeSection(this.id.split("s")[1]);
		}
	});
	$("#secResp .subjects input").click(function(event){
		if(this.checked){
			optSecCheck(this.id.split("optResp")[1],event);
		}
		else{
			optSecUncheck(this.id.split("optResp")[1],event);
		}
	});
	$("#secResp .subjects").click(function (event){
		if(event.target.type!="checkbox"){
			//if()
			if(this.id.split("sResp")[1]!=iOAP.curSection)
				changeSection(this.id.split("sResp")[1]);
		}
	});

	/*	var getoffsetpos = jQuery("#s"+iOAP.curSection).offset();
		var gettopsubject= getoffsetpos.top+jQuery("#s"+iOAP.curSection).height();
				$(".subject_information_div").css({"margin-left":getoffsetpos.left,"top":gettopsubject});	*/

	sectionWidthCalculate();
	$("#sections .allSections input").click(function(event){
		//Added by Boddu Rakesh
		var previousSection = iOAP.curSection;
		var previousSectionId = mockVar.groups[currentGroupIndex].secDetails[previousSection].secId;
		var currentSection = this.id.split("opt")[1];
		var currentSectionId = mockVar.groups[mockVar.currentGrp].secDetails[currentSection].secId;
		var actionDesc = "";
		if(previousSectionId == currentSectionId){
			if(this.checked){
				actionDesc = "Optional section "+currentSectionId+" selected";
			}
			else{
				actionDesc = "Optional section "+currentSectionId+" discarded";
			}
		} else {
			actionDesc = "Optional section "+previousSectionId+" changes to "+currentSectionId;
		}

		var AuditJsonObject = new Object();
		AuditJsonObject.ActionName = "Section Tab";
		AuditJsonObject.RecordNumber = auditRecordNumber++;
		AuditJsonObject.ActionDesc = actionDesc;
		AuditJsonObject.GroupId = "NA";
		AuditJsonObject.SectionId = "NA";
		AuditJsonObject.QuestionId = "NA";
		AuditJsonObject.SelectedOptionId = "NA";
		AuditJsonObject.OptionSequence = "NA";
		AuditJsonObject.candidateName = $.cookie("username");
		AuditJsonObject.loginId = $.cookie("loginId");
		var currentDate = new Date();
		AuditJsonObject.Time = currentDate.yyyymmddHHmmss();
		AuditJson.push(AuditJsonObject);
		if(this.checked){
			optSecCheck(this.id.split("opt")[1],event);
		}
		else{
			optSecUncheck(this.id.split("opt")[1],event);
		}
	});
	$("#sections .allSections").click(function (event){
		//Added by Boddu Rakesh
		var previousSection = iOAP.curSection;
		var previousSectionId = mockVar.groups[currentGroupIndex].secDetails[previousSection].secId;
		var currentSecId = this.id.split("s")[1];
		//var currentSectionId = this.id.split("opt")[1];
		var currentSectionId = mockVar.groups[mockVar.currentGrp].secDetails[currentSecId].secId;
		var actionDesc = "";
		if(currentSecId == previousSectionId){
			actionDesc = "Section "+currentSectionId+" selected";
		} else {
			actionDesc = "Section "+previousSectionId+" changes to "+currentSectionId;
		}
		if(event.target.type!="checkbox"){
			//Added by Boddu Rakesh
			if(this.id.split("s")[1]!=iOAP.curSection){
			var AuditJsonObject = new Object();
			AuditJsonObject.ActionName = "Section Tab";
			AuditJsonObject.RecordNumber = auditRecordNumber++;
			AuditJsonObject.ActionDesc = actionDesc;
			AuditJsonObject.GroupId = "NA";
			AuditJsonObject.SectionId = "NA";
			AuditJsonObject.QuestionId = "NA";
			AuditJsonObject.SelectedOptionId = "NA";
			AuditJsonObject.OptionSequence = "NA";
			AuditJsonObject.candidateName = $.cookie("username");
			AuditJsonObject.loginId = $.cookie("loginId");
			var currentDate = new Date();
			AuditJsonObject.Time = currentDate.yyyymmddHHmmss();
			AuditJson.push(AuditJsonObject);
			//Completed

			changeSection(this.id.split("s")[1]);
			}
		}
	});
	$("#secResp .subjects input").click(function(event){//Added by Boddu Rakesh
		var previousSection = iOAP.curSection;
		var previousSectionId = mockVar.groups[currentGroupIndex].secDetails[previousSection].secId;
		var currentSection = this.id.split("opt")[1];
		var currentSectionId = mockVar.groups[mockVar.currentGrp].secDetails[currentSection].secId;
		var actionDesc = "";
		if(previousSectionId == currentSectionId){
			if(this.checked){
				actionDesc = "Optional section "+currentSectionId+" selected";
			}
			else{
				actionDesc = "Optional section "+currentSectionId+" discarded";
			}
		} else {
			actionDesc = "Optional section "+previousSectionId+" changes to "+currentSectionId;
		}
		var AuditJsonObject = new Object();
		AuditJsonObject.ActionName = "Section Tab";
		AuditJsonObject.RecordNumber = auditRecordNumber++;
		AuditJsonObject.ActionDesc = actionDesc;
		AuditJsonObject.GroupId = "NA";
		AuditJsonObject.SectionId = "NA";
		AuditJsonObject.QuestionId = "NA";
		AuditJsonObject.SelectedOptionId = "NA";
		AuditJsonObject.OptionSequence = "NA";
		AuditJsonObject.candidateName = $.cookie("username");
		AuditJsonObject.loginId = $.cookie("loginId");
		var currentDate = new Date();
		AuditJsonObject.Time = currentDate.yyyymmddHHmmss();
		AuditJson.push(AuditJsonObject);
		if(this.checked){
			optSecCheck(this.id.split("opt")[1],event);
		}
		else{
			optSecUncheck(this.id.split("opt")[1],event);
		}
	});
	$("#secResp .subjects").click(function (event){//Added by Boddu Rakesh
		var previousSection = iOAP.curSection;
		var previousSectionId = mockVar.groups[currentGroupIndex].secDetails[previousSection].secId;
		var currentSecId = this.id.split("s")[1];
		//var currentSectionId = this.id.split("opt")[1];
		var currentSectionId = mockVar.groups[mockVar.currentGrp].secDetails[currentSecId].secId;
		var actionDesc = "";
		if(currentSecId == previousSectionId){
			actionDesc = "Section "+currentSectionId+" selected";
		} else {
			actionDesc = "Section "+previousSectionId+" changes to "+currentSectionId;
		}
		if(event.target.type!="checkbox"){
			//Added by Boddu Rakesh
			if(this.id.split("s")[1]!=iOAP.curSection){
			var AuditJsonObject = new Object();
			AuditJsonObject.ActionName = "Section Tab";
			AuditJsonObject.RecordNumber = auditRecordNumber++;
			AuditJsonObject.ActionDesc = actionDesc;
			AuditJsonObject.GroupId = "NA";
			AuditJsonObject.SectionId = "NA";
			AuditJsonObject.QuestionId = "NA";
			AuditJsonObject.SelectedOptionId = "NA";
			AuditJsonObject.OptionSequence = "NA";
			AuditJsonObject.candidateName = $.cookie("username");
			AuditJsonObject.loginId = $.cookie("loginId");
			var currentDate = new Date();
			AuditJsonObject.Time = currentDate.yyyymmddHHmmss();
			AuditJson.push(AuditJsonObject);
			//Completed
			changeSection(this.id.split("s")[1]);
			}
		}
	});

}
/*function a(id)
{
	//alert(id);
	idGbl='';
	//document.getElementById('id'+id).style='block';
	incr=incr+1;
	idGbl="id"+id;
}*/

function sectionWidthCalculate(){
	if(jQuery(window).width()>1000)
		var calculatesubjectwidth = $(window).width() - 275;
	//jQuery(".subject-selection").css("width",calculatesubjectwidth-4);
	var calculatesubjectinnerwidth=0;
	jQuery("#sections .subject-name").each(function(){
		calculatesubjectinnerwidth = calculatesubjectinnerwidth + 11 + jQuery(this).outerWidth(true);
		if(calculatesubjectinnerwidth>=calculatesubjectwidth && navSection==false){
			jQuery(this).hide();
			jQuery(this).nextAll().hide();
			jQuery(".subject-arrow-right-disabled").attr("class","subject-arrow-right");
		}
		else{		
			if(navSection==true ){
				if($(this).css('display') != 'none' && calculatesubjectinnerwidth<calculatesubjectwidth){
					$(this).hide();
				}
				else{
					$(this).show();
				}
			}
		}
	});
}


function optSecCheck(secId,event){
	var counter = 0;
	for(var i=0;i<iOAP.secDetails.length;i++){
		if(iOAP.secDetails[i].isSelected){
			counter++;
		}
	}
	counter++;
	if(counter>iOAP.maxNoOptSec){
		event.preventDefault();
		if(event.stopPropagation){
			event.stopPropagation();
		}else
			event.returnValue=false;
		secChangeConfirmation();
	}else{
		iOAP.secDetails[secId].isSelected = true;
		enableOptButtons();
		changeSection(secId);
	}
}

function optSecUncheck(secId,event){
	event.preventDefault();
	if(event.stopPropagation){
		event.stopPropagation();
	}else{
		event.returnValue=false;
	}
	var str= "";
	str ="<center><p style='margin-top:5%'><i>"+mockLabels.deselectOptSect+"</i></p><br/>";
	str +="<table align='center' style='margin-top:5%'>";
	str +='<tr><td style="text-align:right;padding-right:2px"><input onclick="resetSection('+secId+');afterResetSection();" type="button" class="btn btn-primary btn-primary-blue" style="margin-right:20px" title="'+mockLabels.reset+'" value="'+mockLabels.reset+'"/></td><td  style="text-align:left;padding-left:2px"><input onclick="showModule(';
	str +="'Questn_Area'";
	str +=')" type="button" class="btn btn-primary btn-primary-blue" style="margin-left:20px" title="'+mockLabels.back+'" value="'+mockLabels.back+'"/></td></tr></table></center>';
	$("#sectionSummaryDiv").html(str);
	showModule('sectionSummaryDiv');
	if($(window).width()<1000){
		$('#sectionSummaryDiv').height($(window).height() - jQuery("#header").outerHeight(true));
		$('.subheader_tab,.grup_components,.q_tab,.btntab').hide();
	}
}

function resetSection(secId){
	var counter = 0;
	//var langIdCount=0;
	/*for(var langId=0;langId<mockVar.languages.length;langId++){
		if(mockVar.languages[langId]!=null && typeof(mockVar.languages[langId])!='undefined'){
			langIdCount++;*/
	for(var j=0;j<iOAP.secDetails[secId].questions.length;j++){
		iOAP.secDetails[secId].questions[j].quesParam.answer = '';
		iOAP.secDetails[secId].questions[j].quesParam.selectedOptId = '';
		iOAP.secDetails[secId].questions[j].typedWord = '';
		if(iOAP.secDetails[secId].questions[j].quesParam.status != 'notAttempted'){
			iOAP.secDetails[secId].questions[j].quesParam.status="notanswered";
			counter++;
		}
	}
	/*}
	}*/
	$('#code').val('');
	$('#answer').val('');
	$("#noOfWords").text('');
	iOAP.secDetails[secId].answered = 0;
	// we are dividing here because the counter counts in all the languages.
	iOAP.secDetails[secId].notanswered = counter; 
	iOAP.secDetails[secId].marked = 0;
	iOAP.secDetails[secId].markedAndAnswered= 0;
	iOAP.secDetails[secId].isSelected = false;
}

function afterResetSection(){
	showModule('Questn_Area');
	getQuestion(mockVar.defaultLang);
	fillSections();
	enableOptButtons();
	fillNumberPanel();
}

function enableOptButtons(){
	if((iOAP.secDetails.length == 1 && iOAP.secDetails[iOAP.curSection].questions.length == 1) || ((iOAP.secDetails[iOAP.curSection].groupAllQuestions != "undefined" && iOAP.secDetails[iOAP.curSection].groupAllQuestions != "" && iOAP.secDetails[iOAP.curSection].groupAllQuestions == "true") && iOAP.secDetails.length == 1)){
		$(".underreview").attr("title",mockLabels.btnMarkForReview);
		$("savenext").attr("title",mockLabels.btnSave);
		$(".savenextGroup").attr("title",mockLabels.btnSave).val(mockLabels.btnSave);
	}
	else if(iOAP.secDetails[iOAP.curSection].secType.toUpperCase()=="OFFLINE"){
		$(".savenextGroup").attr("title",mockLabels.nextQ).val(mockLabels.nextQ);
	}
	else{
		$(".underreview").attr("title",mockLabels.btnMarkForReviewAndNext);
		$(".savenext").attr("title",mockLabels.btnSaveNext);
		$(".savenextGroup").attr("title",mockLabels.btnSaveNext).val(mockLabels.btnSaveNext);
	}
	$(".clearResponse,.clearResponseGroup").attr("title",mockLabels.btnClearResponse);
//	$("#clearResponseGroup").attr("title",mockLabels.btnClearResponse);
	$(".compileCodeBtn,.saveProgram,.submitCodeBtn,.savenext,.previousBtn,.underreview,.clearResponse,.savenextGroup,.clearResponseGroup").removeAttr("disabled");
	/*$("#saveProgram").removeAttr("disabled");
	$("#submitCodeBtn").removeAttr("disabled");
	$("#savenext").removeAttr("disabled");
	$("#previousBtn").removeAttr("disabled");
	$("#underreview").removeAttr("disabled");
	$("#clearResponse").removeAttr("disabled");
	$("#savenextGroup").removeAttr("disabled");
	$("#clearResponseGroup").removeAttr("disabled");*/
	if(mockVar.currentGrp == mockVar.MaxGrpEnabled){
		if(iOAP.secDetails[iOAP.curSection].isOptional == 'true' && !iOAP.secDetails[iOAP.curSection].isSelected){
			$(".savenext,.previousBtn,.underreview,.clearResponse,.clearResponseGroup,.savenextGroup").attr("title",mockLabels.optSectTitle);
			/*$("savenext").attr("title",mockLabels.optSectTitle);
			$("#underreview").attr("title",mockLabels.optSectTitle);
			$("#clearResponse").attr("title",mockLabels.optSectTitle);
			$("#clearResponseGroup").attr("title",mockLabels.optSectTitle);
			$("#savenextGroup").attr("title",mockLabels.optSectTitle);*/
			$(".compileCodeBtn,.saveProgram,.submitCodeBtn,.savenext,.previousBtn,.underreview,.clearResponse,.savenextGroup,.clearResponseGroup").attr("disabled","disabled");
			/*$("#saveProgram").attr("disabled","disabled");
			$("#savenext").attr("disabled","disabled");
			$("#previousBtn").attr("disabled","disabled");
			$("#submitCodeBtn").attr("disabled","disabled");
			$("#underreview").attr("disabled","disabled");
			$("#clearResponse").attr("disabled","disabled");
			$("#clearResponseGroup").attr("disabled","disabled");
			$("#savenextGroup").attr("disabled","disabled");*/
		}
	}else if(mockVar.groups[mockVar.currentGrp].isEditable == "false"){
		$(".savenext,.previousBtn,.underreview,.clearResponse,.clearResponseGroup,.savenextGroup").attr("title",mockLabels.grpEditNotAllowedTitle);
		/*$("#savenext").attr("title",mockLabels.grpEditNotAllowedTitle);
		$("#previousBtn").attr("title",mockLabels.grpEditNotAllowedTitle);
		$("#underreview").attr("title",mockLabels.grpEditNotAllowedTitle);
		$("#clearResponse").attr("title",mockLabels.grpEditNotAllowedTitle);
		$("#clearResponseGroup").attr("title",mockLabels.grpEditNotAllowedTitle);
		$("#savenextGroup").attr("title",mockLabels.grpEditNotAllowedTitle);*/
		$(".compileCodeBtn,.saveProgram,.submitCodeBtn,.savenext,.previousBtn,.underreview,.clearResponse,.savenextGroup,.clearResponseGroup").attr("disabled","disabled");
		/*$("#compileCodeBtn").attr("disabled","disabled");
		$("#saveProgram").attr("disabled","disabled");
		$("#savenext").attr("disabled","disabled");
		$("#previousBtn").attr("disabled","disabled");
		$("#submitCodeBtn").attr("disabled","disabled");
		$("#underreview").attr("disabled","disabled");
		$("#clearResponse").attr("disabled","disabled");
		$('#answer').attr('disabled','disabled');
		$("#clearResponseGroup").attr("disabled","disabled");
		$("#savenextGroup").attr("disabled","disabled");*/
	}
	if($(".savenext").attr('disabled') || $(".submitCodeBtn").attr('disabled') || $(".previousBtn").attr('disabled') || $(".savenextGroup").attr('disabled')){
		$(".savenext,.savenextGroup,.previousBtn,.submitCodeBtn").removeClass('btnEnabled').addClass('btnDisabled');
		/*$("#savenextGroup").removeClass('btnEnabled').addClass('btnDisabled');
		$("#previousBtn").removeClass('btnEnabled').addClass('btnDisabled');
		$("#submitCodeBtn").removeClass('btnEnabled').addClass('btnDisabled');*/
	}else{
		$(".savenext,.savenextGroup,.previousBtn,.submitCodeBtn").removeClass('btnDisabled').addClass('btnEnabled');
		/*$("#savenext").removeClass('btnDisabled').addClass('btnEnabled');
		$("#savenextGroup").removeClass('btnDisabled').addClass('btnEnabled');
		$("#submitCodeBtn").removeClass('btnDisabled').addClass('btnEnabled');
		$("#previousBtn").removeClass('btnDisabled').addClass('btnEnabled');*/
	}
}

function secChangeConfirmation(){
	//var langId=0;
	var str= "";
	str +="<center><p style='margin-top:5em;width:75%;text-align:left'><font color='red'>"+mockLabels.optSectResetMsg;
	str += "</p><center><b>"+mockLabels.optSectSummary+"</b></center>";
	str += "<table class='score_card_table' cellspacing=0 width='60%' align='center' >";
	str += "<thead><tr><th>"+mockLabels.optSectName+"</th><th>"+mockLabels.noOfQues+"</th><th>"+mockLabels.answered+"</th><th>"+mockLabels.notAnswered+"</th><th>"+mockLabels.markReview+"</th><th>"+mockLabels.markAnsTitle+"</th><th>"+mockLabels.notAttempted+"</th><th>"+mockLabels.reset+"</th></tr></thead>";
	for(var i=0;i<iOAP.secDetails.length;i++){
		if(iOAP.secDetails[i].isOptional=='true'){
			if(iOAP.secDetails[i].isSelected){
				str += "<tbody><tr><td>"+iOAP.secDetails[i].secName+"</td><td>"+(iOAP.secDetails[i].questions.length)+"</td><td>"+iOAP.secDetails[i].answered+"</td><td>"+iOAP.secDetails[i].notanswered+"</td><td>"+iOAP.secDetails[i].marked+"</td><td>" +iOAP.secDetails[i].markedAndAnswered +"</td><td>"+(iOAP.secDetails[i].questions.length-iOAP.secDetails[i].answered-iOAP.secDetails[i].notanswered-iOAP.secDetails[i].marked-iOAP.secDetails[i].markedAndAnswered)+"</td><td><input type='checkbox' ";
				str += " value="+i+" name='confSec'/></td></tr></tbody>";
			}
		}
	}
	str += "</table></center>";
	str +="<center><div align='center' style='margin-top:1em' ><span id='errorMsg'>&nbsp;</span></div>";
	str +='<div><span style="text-align:right;padding-right:2px"><input onclick="confirmChangeSec()" style="margin-right:20px" type="button" class="btn btn-primary btn-primary-blue" title="'+mockLabels.reset+'" value="'+mockLabels.reset+'"/></span><span  style="text-align:left;padding-left:2px;"><input onclick="showModule(';
	str +="'Questn_Area'";
	str +=')" type="button" class="btn btn-primary btn-primary-blue" style="margin-left:20px" title="'+mockLabels.back+'" value="'+mockLabels.back+'"/></span></div></center>';
	$("#sectionSummaryDiv").html(str);
	tableResp();
	showModule('sectionSummaryDiv');
	if($(window).width()<1000){
	    $('#sectionSummaryDiv').height($(window).height() - jQuery("#header").outerHeight(true));
		$('.subheader_tab,.grup_components,.q_tab,.btntab').hide();
	}
}

function finalSecChangeConf(secIds){
	if($.trim(secIds) != ""){
		var sections = secIds.split(",");
		for(var i = 0;i<sections.length-1;i++){
			resetSection(sections[i]);
		}
	}
	afterResetSection();
}

function confirmChangeSec(){
	var allCheckedSections = document.getElementsByName("confSec");
	var secIds = "";
	for(var i = 0;i<allCheckedSections.length;i++){
		if(allCheckedSections[i].checked)
			secIds += allCheckedSections[i].value+",";
	}
	var sections = secIds.split(',');
	var AuditJsonObject = new Object();
	AuditJsonObject.RecordNumber = auditRecordNumber++;
	AuditJsonObject.ActionName = "Section Reset";
	AuditJsonObject.RecordNumber = auditRecordNumber++;
	AuditJsonObject.ActionDesc = "Section Reset button clicked";
	AuditJsonObject.GroupId = mockVar.groups[currentGroupIndex].groupId;
	AuditJsonObject.candidateName = $.cookie("username");
	AuditJsonObject.loginId = $.cookie("loginId");
	var secId = "";
	if(sections.length>1){
		for(var i =0 ; i<sections.length-1 ; i++){
			if(i !=0)
				secId = secId + ",";
			secId = secId+mockVar.groups[currentGroupIndex].secDetails[currentSectionIndex].secId;
			AuditJsonObject.SectionId = secId;
		}
	} else {
		AuditJsonObject.SectionId = "NA";
	}


	AuditJsonObject.QuestionId = "NA";
	AuditJsonObject.SelectedOptionId = "NA";
	AuditJsonObject.OptionSequence = "NA";
	var currentDate = new Date();
	AuditJsonObject.Time = currentDate.yyyymmddHHmmss();
	AuditJson.push(AuditJsonObject);
	if(sections.length>1){
		var str = "", innerHtml = "";
		str = "<center><table cellspacing=0 width='60%' align='center' style='margin-top:5em'>";
		str += "<tr><td colspan=2 style='text-align:center'>"+mockLabels.resetSect;
		for(var i =0 ; i<sections.length-1 ; i++){
			if(i>0)
				innerHtml += " , ";
			innerHtml += iOAP.secDetails[sections[i]].secName;
		}
		str  = str.substring(0,str.length-2);
		str += "</td></tr><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2>&nbsp;</td></tr>";
		str +='<tr><td style="text-align:right;padding-right:2px"><input onclick="finalSecChangeConf(';
		str += "'"+secIds+"'";
		str += ')" type="button" style="margin-right:20px" class="btn btn-primary btn-primary-blue" title="'+mockLabels.reset+'" value="'+mockLabels.reset+'"/></td><td  style="text-align:left;padding-left:2px"><input onclick="showModule(';
		str +="'Questn_Area'";
		str +=')" type="button" style="margin-left:20px" class="btn btn-primary btn-primary-blue" title="'+mockLabels.back+'" value="'+mockLabels.back+'"/></td></tr></table></center>';
		$("#sectionSummaryDiv").html(str);
		$('#resetSections').html(innerHtml);
	}else{
		$('#errorMsg').html('<center><font style="color:red;font-weight:bold">'+mockLabels.selSectToReset+'</font></center>');
	}
}

function changeSection (sectionID){
	if(mockVar.curQuesBean.keyboardType == "AudioFile" || mockVar.curQuesBean.keyboardType == "VideoFile"){
		if(recordingInProgress){
			cnfPop('sectionNavigationRecordingPopup');
			$('#sectionNavigationRecordingPopupMsg').html($(globalXmlvar).find('sectionNavigationRecordingPopupMsg').text());
			$('.info').html($(globalXmlvar).find('info').text());
			$('.popClose').html($(globalXmlvar).find('close').text());
			$('.Yes').html($(globalXmlvar).find('Yes').text());
			$('.No').html($(globalXmlvar).find('No').text());
			$('#secNumber').val(sectionID);
		return;
		}else{
			navigateToSection(sectionID);
		}
	}else{
		navigateToSection(sectionID);
	}
}

function fillNumberPanel(){
	var quesStatus;
	if(iOAP.secDetails[iOAP.curSection].groupAllQuestions == "false" || iOAP.secDetails[iOAP.curSection].groupAllQuestions == "" || typeof(iOAP.secDetails[iOAP.curSection].groupAllQuestions) == "undefined"){
		$('.underreview').val(mockLabels.markForReviewNext);
	}else{
		$('.underreview').hide();
		$('.underreview').val(mockLabels.markForReviewNext);
	}
	var str = '<div>';
	var isCompre = "false";
	var tempCompreId = 0;
	var tempQuestNo = 0;
	var previousCompreQuesId = 0;
	for(var i=0;i<iOAP.secDetails[iOAP.curSection].questions.length;i++){
		/*if((i+1)%4==1){
			str+='</div>';
			str+='<div>';
		}*/
		
		tempCompreId = (iOAP.secDetails[iOAP.curSection].questions[i].comprehensionId != 0 ? iOAP.secDetails[iOAP.curSection].questions[i].comprehensionId : iOAP.secDetails[iOAP.curSection].questions[i].laqId);
		isCompre = tempCompreId != 0 ? compreGroupDetails[tempCompreId+""] : "false";
		quesStatus = iOAP.secDetails[iOAP.curSection].questions[i].quesParam.status ;
		quesAnswer = iOAP.secDetails[iOAP.curSection].questions[i].quesParam.answer ;
		if(isCompre == "true"){
		if(previousCompreQuesId != tempCompreId)
			tempQuestNo = i;
		} else {
			tempQuestNo = i;
		}
		previousCompreQuesId = tempCompreId;
		if(quesStatus=="answered"){
			str+='<div id="qtd'+tempQuestNo+'"><span title ="'+mockLabels.answered+'" class="answered auditlog" id="'+tempQuestNo+'" onclick="javascript:changeQues('+tempQuestNo+');"> '+(i+1)+'</span></div>';
		}else if(quesStatus=="notanswered"){
			str+='<div id="qtd'+tempQuestNo+'"><span title ="'+mockLabels.notAnswered+'" class="not_answered auditlog" id="'+tempQuestNo+'" onclick="javascript:changeQues('+tempQuestNo+');"> '+(i+1)+'</span></div>';
		}else if(quesStatus=="marked"){
			str+='<div id="qtd'+tempQuestNo+'"><span title ="'+mockLabels.markNotAnsTitle+'" class="review auditlog" id="'+tempQuestNo+'" onclick="javascript:changeQues('+tempQuestNo+');"> '+(i+1)+'</span></div>';
		}else if(quesStatus=="markedAndAnswered"){
			if(mockVar.isMarkedForReviewConsidered=="YES"){
				str+='<div id="qtd'+tempQuestNo+'"><span title ="'+mockLabels.markAnsTitle+'" class="review_answered auditlog" id="'+tempQuestNo+'" onclick="javascript:changeQues('+tempQuestNo+');"> '+(i+1)+'</span></div>';
			}else{
				str+='<div id="qtd'+tempQuestNo+'"><span title ="'+mockLabels.markAnsTitle+'" class="review_marked auditlog" id="'+tempQuestNo+'" onclick="javascript:changeQues('+tempQuestNo+');"> '+(i+1)+'</span></div>';
			}
		}
		else{
			str+='<div id="qtd'+tempQuestNo+'"><span title ="'+mockLabels.notAttempted+'" class="not_visited auditlog" id="'+tempQuestNo+'" onclick="javascript:changeQues('+tempQuestNo+');"> '+(i+1)+'</span></div>';
		}
	}
	str+='</div>';
	if($(window).width()>1000)
		$('.numberpanelQues').html(str);
	else{
		$('.qarea_resp').html('<div class="qcontainer numberpanelQues">'+str+'</div>');
	}
	var totalWidth = 0;
	$('.qcontainer').children().children().each(function(){
		totalWidth += $(this).children().outerWidth() + 10;
	});
	$('.qcontainer').css('width',totalWidth);
	//var ques = iOAP.sections[iOAP.curSection][iOAP.viewLang[iOAP.curSection][iOAP.curQues].langID][iOAP.curQues]
	if(iOAP.secDetails.length == 1 && iOAP.secDetails[iOAP.curSection].questions.length == 1){
		$('.underreview').val(mockLabels.markForReview);
		if(mockVar.curQuesBean.quesType != 'SUBJECTIVE'){
			$('.savenext').val(mockLabels.save);
		}
	}
	if(mockVar.curQuesBean.quesType=='PROGRAMMING TEST'){
		$('.underreview').hide();
		$('.saveProgram').val(mockLabels.nextQ);
	}
	if(typeof(iOAP.secDetails[iOAP.curSection].displayNumberPanel) != "undefined" && iOAP.secDetails[iOAP.curSection].displayNumberPanel != "" && iOAP.secDetails[iOAP.curSection].displayNumberPanel == "false"){
		if(iOAP.secDetails[iOAP.curSection].groupAllQuestions == "false"){
			if(iOAP.secDetails.length == 1){
				if(mockVar.curQuesBean.comprehensionId !=0 || mockVar.curQuesBean.laqId !=0){
					var mockCompreLaqIndex='';
					if(mockVar.curQuesBean.comprehensionId !=0 ){
						mockCompreLaqIndex = mockVar.compreLaqQues.inArray(mockVar.curQuesBean.comprehensionId, 'quesId');
					}else if(mockVar.curQuesBean.laqId !=0 ){
						mockCompreLaqIndex = mockVar.compreLaqQues.inArray(mockVar.curQuesBean.laqId, 'quesId');
					}
					if(mockVar.compreLaqQues[mockCompreLaqIndex].groupComprehensionLaqQuestions == "true"){
						var quesCount = 0;
						for(var i=0;i<mockVar.curSectionQuestions.length;i++){
							if(mockVar.curSectionQuestions[i].comprehensionId == mockVar.compreLaqQues[mockCompreLaqIndex].quesId){
								quesCount++;
							}
						}
						if(quesCount == mockVar.curSectionQuestions.length){
							$(".savenextGroup").attr("title",mockLabels.btnSave);
							$('.savenextGroup').val(mockLabels.btnSave);
						}
					}
				}
			}
		}
	}
	$('.ruler-div').hide();
	$('#loadCalc').hide();
	$('.protactor-div').hide();
	$('.scratch-pad-container').hide();
	$('.textarea-div').hide();
	$('.courseInfoPop').hide();
	jQuery(".Ans_Area,.divHeader").addClass(zoomIconClass);
	jQuery(".rightDiv").addClass(zoomIconClass);
	if(jQuery(".Ans_Area").hasClass("ZeroLevelZoom")){
		//jQuery(".leftDiv").css("font-size","1.2em !important");
		//jQuery(".rightDiv").css("font-size","1.2em !important");
		jQuery(".SAAnswer").css("font-size","16px");
		setTimeout(function(){
			$(".leftDiv img").each(function(){
				if(mockVar.MagnifyingGlass!= undefined && mockVar.MagnifyingGlass != 1){
					$(this).css("width",$(this).width());
				}
			});
			$(".rightDiv img").each(function(){
				if(mockVar.MagnifyingGlass!= undefined && mockVar.MagnifyingGlass != 1){
					$(this).css("width",$(this).width());
				}
			});
			$(".progImg").css("width",20);
		},500);
		//jQuery(".leftDiv img").css("width",$(".leftDiv img").width());
		//jQuery(".rightDiv img").css("width",$(".rightDiv img").width());
		if(typeof(iOAP.secDetails[iOAP.curSection].groupAllQuestions) != "undefined" && iOAP.secDetails[iOAP.curSection].groupAllQuestions != "" && iOAP.secDetails[iOAP.curSection].groupAllQuestions == "true"  ){
			//jQuery(".zoomout-icon-container").show();
			//jQuery("#quesOuterDiv").css("font-size","1.2em !important");
			$("#quesOuterDiv img").each(function(){
				if(mockVar.MagnifyingGlass!= undefined && mockVar.MagnifyingGlass != 1){
					$(this).css("width",$(this).width());
				}
			});
			//	jQuery("#quesOuterDiv").css("width",$("#quesOuterDiv img").width());
		}
	}
	else if(jQuery(".Ans_Area").hasClass("FirstLevelZoom")){
		//jQuery(".leftDiv").css("font-size","1.4em !important");
		//jQuery(".rightDiv").css("font-size","1.4em !important");
		jQuery(".SAAnswer").css("font-size","20px");
		//jQuery(".leftDiv img").css("width",$(".leftDiv img").width() +10);
		//jQuery(".rightDiv img").css("width",$(".rightDiv img").width() +10);
		setTimeout(function(){
			$(".leftDiv img").each(function(){
				if(mockVar.MagnifyingGlass!= undefined && mockVar.MagnifyingGlass != 1){
					$(this).css("width",$(this).width() + 10);
				}
			});
			$(".rightDiv img").each(function(){
				if(mockVar.MagnifyingGlass!= undefined && mockVar.MagnifyingGlass != 1){
					$(this).css("width",$(this).width() + 10);
				}
			});
			$(".progImg").css("width",20);
		},500);
		if(typeof(iOAP.secDetails[iOAP.curSection].groupAllQuestions) != "undefined" && iOAP.secDetails[iOAP.curSection].groupAllQuestions != "" && iOAP.secDetails[iOAP.curSection].groupAllQuestions == "true"  ){
			//jQuery(".zoomout-icon-container").show();
			//jQuery("#quesOuterDiv").css("font-size","1.4em !important");
			$("#quesOuterDiv img").each(function(){
				if(mockVar.MagnifyingGlass!= undefined && mockVar.MagnifyingGlass != 1){
					$(this).css("width",$(this).width() + 10);
				}
			});
			//	jQuery("#quesOuterDiv").css("width",$("#quesOuterDiv img").width() + 10);
		}
	}
	else if(jQuery(".Ans_Area").hasClass("SecondLevelZoom")){
		//jQuery(".leftDiv").css("font-size","1.5em !important");
		//jQuery(".rightDiv").css("font-size","1.5em !important");
		jQuery(".SAAnswer").css("font-size","22px");
		//jQuery(".leftDiv img").css("width",$(".leftDiv img").width() +20);
		//jQuery(".rightDiv img").css("width",$(".rightDiv img").width() +20);
		setTimeout(function(){
			$(".leftDiv img").each(function(){
				if(mockVar.MagnifyingGlass!= undefined && mockVar.MagnifyingGlass != 1){
					$(this).css("width",$(this).width() + 20);
				}
			});
			$(".rightDiv img").each(function(){
				if(mockVar.MagnifyingGlass!= undefined && mockVar.MagnifyingGlass != 1){
					$(this).css("width",$(this).width() + 20);
				}
			});
			$(".progImg").css("width",20);
		},500);
		if(typeof(iOAP.secDetails[iOAP.curSection].groupAllQuestions) != "undefined" && iOAP.secDetails[iOAP.curSection].groupAllQuestions != "" && iOAP.secDetails[iOAP.curSection].groupAllQuestions == "true"  ){
			//jQuery(".zoomout-icon-container").show();
			//jQuery("#quesOuterDiv").css("font-size","1.5em !important");
			$("#quesOuterDiv img").each(function(){
				if(mockVar.MagnifyingGlass!= undefined && mockVar.MagnifyingGlass != 1){
					$(this).css("width",$(this).width() + 20);
				}
			});
			//	jQuery("#quesOuterDiv").css("width",$("#quesOuterDiv img").width() + 20);
		}
	}
	else if(jQuery(".Ans_Area").hasClass("ThirdLevelZoom")){
		//jQuery(".leftDiv").css("font-size","1.6em !important");
		//jQuery(".rightDiv").css("font-size","1.6em !important");
		jQuery(".SAAnswer").css("font-size","24px");
		//jQuery(".leftDiv img").css("width",$(".leftDiv img").width() +30);
		//jQuery(".rightDiv img").css("width",$(".rightDiv img").width() +30);
		setTimeout(function(){
			$(".leftDiv img").each(function(){
				if(mockVar.MagnifyingGlass!= undefined && mockVar.MagnifyingGlass != 1){
					$(this).css("width",$(this).width() + 30);
				}
			});
			$(".rightDiv img").each(function(){
				if(mockVar.MagnifyingGlass!= undefined && mockVar.MagnifyingGlass != 1){
					$(this).css("width",$(this).width() + 30);
				}
			});
			$(".progImg").css("width",20);
		},500);
		if(typeof(iOAP.secDetails[iOAP.curSection].groupAllQuestions) != "undefined" && iOAP.secDetails[iOAP.curSection].groupAllQuestions != "" && iOAP.secDetails[iOAP.curSection].groupAllQuestions == "true"  ){
			//jQuery(".zoomout-icon-container").show();
			//jQuery("#quesOuterDiv").css("font-size","1.6em !important");
			$("#quesOuterDiv img").each(function(){
				if(mockVar.MagnifyingGlass!= undefined && mockVar.MagnifyingGlass != 1){
					$(this).css("width",$(this).width() + 30);
				}
			});
			//	jQuery("#quesOuterDiv").css("width",$("#quesOuterDiv img").width() + 30);
		}
	}
	scrollIntoView(document.getElementById(iOAP.curQues),document.querySelectorAll('.nano-content'));
	if($('.qarea_resp').is(':visible'))
		scrollHorizontalView(document.getElementById(iOAP.curQues),document.querySelectorAll('.qarea_resp')); 
	if(mockVar.MagnifyingGlass!= undefined && mockVar.MagnifyingGlass == 1){
		$('.imageZoom').jqzoom();
		var options = {  
				zoomType: 'reverse',  
				lens:true,  
				preloadImages: true,  
				title:false,
				alwaysOn:false,  
				zoomWidth: 400,  
				zoomHeight:450,  
				xOffset:10,  
				yOffset:0,  
				position:'right'   
		};
		$('.imageZoom').jqzoom(options).click(function(){
			var parentImageSrc = $(this).attr('src');
			var tempImageSrc = $(this).attr('href');
			if(parentImageSrc==undefined || parentImageSrc=="")
				parentImageSrc=tempImageSrc;		
			$(".popup_image").attr('src',parentImageSrc);
			var imgContainer = new Image();
			imgContainer.src = parentImageSrc;
			var imgContainerWidth = imgContainer.width;
			var imgContainerHeight = imgContainer.height;
			var containerWidth = $(window).width()-115;
			var containerHeight = $(window).height()-115;	
			var imgContainerActualHeight = (containerHeight > imgContainerHeight) ? parseInt(imgContainerHeight) : parseInt(containerHeight);
			$(".imgpop_container").css("height",imgContainerActualHeight+2);
			maximgpopup();
			
		}); 
		//magnifyingGlass();
		/* $('.jqzoom').jqzoom({
                zoomType: 'standard',
                lens: true,
                preloadImages: false,
                alwaysOn: false
            });
            $('.jqzoom').hover(function(){
                $(this).nextAll().closest('.jqzoom').css('opacity',0);
            }, function(){
                $(this).nextAll().closest('.jqzoom').css('opacity',1);
            });*/
	}
	scrollIntoView(document.getElementById(iOAP.curQues),document.querySelectorAll('.nano-content')); 
	$(".almVideo").remove();
	$(".almAudio").remove();
	resumeJwAudioVideo();
	resumeActQuesGrp();
	if (jQuery(window).width() > 1000) {
		quizPageHeight();
	} else {
		setDIVHeight_resp(); 
	}
	//&& iOAP.secDetails[iOAP.curSection].displayNumberPanel == "false"
	if(iOAP.secDetails[iOAP.curSection].displayNumberPanel != "undefined" && iOAP.secDetails[iOAP.curSection].displayNumberPanel != ""  && iOAP.secDetails[iOAP.curSection].groupAllQuestions == "false"){
		setTimeout(function(){
			if($('#sortable').is(':visible')){
				$(function() {
					$("#sortable").sortable({
						start: function() {},
						drag: function() {},
						stop: function() {
							var l = $('#sortable li').size();
						}
					});
					$("#sortable").disableSelection();
					var $start_counter = $("#event-start"),
					$drag_counter = $("#event-drag"),
					$stop_counter = $("#event-stop");
				});
				var max = -1;
				$("li").each(function() {
					var h = $(this).height(); 
					max = h > max ? h : max;
				});
			}
			if($(".que").is(':visible')){
				var max = -1;
				$(".que li").each(function() {
					var h = $(this).height(); 
					max = h > max ? h : max;
				});
				$(".que-col li").height(max);
				var   dropDownHeight = max + 24;
				$(".que-dd li").height(dropDownHeight);

				//if(max>300)$(".que-col img").height(300);
				// $(".que-col .jwplayer").width('50%');
			}
			if($(".que-col-1").is(':visible') && $(".que-col-2").is(':visible')){
				$( function() {
					$( "ul.droptrue" ).sortable({
						connectWith: "ul"
					});
					$( "ul.dropfalse" ).sortable({
						connectWith: "ul",
						dropOnEmpty: false
					});
				});

			}
		},2000);
	}
}

function changeQues(quesNo){
	if(quesNo!=iOAP.curQues){
		if(mockVar.curQuesBean.keyboardType == "AudioFile" || mockVar.curQuesBean.keyboardType == "VideoFile"){
			if(recordingInProgress){
				cnfPop('numberPanelRecordingPopup');
				$('#numberPanelRecordingPopupMsg').html($(globalXmlvar).find('numberPanelRecordingPopupMsg').text());
				$('.info').html($(globalXmlvar).find('info').text());
				$('.popClose').html($(globalXmlvar).find('close').text());
				$('.Yes').html($(globalXmlvar).find('Yes').text());
				$('.No').html($(globalXmlvar).find('No').text());
				$('#quesNo').val(quesNo);
			return;
			}else{
				navigateThroughNumberPanel(quesNo);
			}
		}else{
			navigateThroughNumberPanel(quesNo);
		}
	}
}

function showModule(moduleName){
	for(var i=0;i<mockVar.modules.length;i++){
		if(mockVar.modules[i]==moduleName){
			$("#"+mockVar.modules[i]).show();
		}else{
			$("#"+mockVar.modules[i]).hide();
		}
		if(moduleName=='profileDiv'||moduleName=='instructionsDiv'||moduleName=='QPDiv'||moduleName=='sectionSummary'){
			$('.Questn_Area').show();
		}
		if(moduleName=='sectionSummaryDiv'){
			$('.Questn_Area').hide();
		}
		if(moduleName=='Questn_Area'){
			$('.helpinstruction_div').show();
			$('.nav-container').show();
			$('.section-timepanel').show();
			$('.subject-selection').show();
			$('.viewProfile').show();
			$('.subject-section-rightarrow').show();
			$('.Questn_Area').show();
			if(iOAP.secDetails[iOAP.curSection].displayNumberPanel == "true" || iOAP.secDetails[iOAP.curSection].displayNumberPanel == "" || typeof(iOAP.secDetails[iOAP.curSection].displayNumberPanel) == "undefined"){
				$('.collapsebel_panel').show();
				$('.qarea_resp').show();

			}else{
				$('.collapsebel_panel').hide();
				$('.qarea_resp').hide();
			}
			if(mockVar.curQuesBean.quesType==="TYPING TEST"){
				$('.subject-selection').hide();
				if(mockVar.curQuesBean.showTypingDetails === "false"){
					$('.collapsebel_panel').hide();
				}else{
					$('.collapsebel_panel').show();
				}
			}
			if (jQuery(window).width() > 1000) {
				quizPageHeight();
			} else {
				$('.subheader_tab,.grup_components,.q_tab,.btntab,.hamburgerBar').show();
				setDIVHeight_resp(); 
			}
		}
	}
	focusOnDiv();
}

function numPanelSec(){
	var str="";
	if(iOAP.secDetails[iOAP.curSection].secName.length>22)
		str += iOAP.secDetails[iOAP.curSection].secName.substring(0,22)+"...";
	else
		str += iOAP.secDetails[iOAP.curSection].secName;
	$('.viewSection b').html(str);
	$('.viewSection b').attr('title',iOAP.secDetails[iOAP.curSection].secName);
}

function resetOption(){
	mockVar.curQuesBean.quesParam.answer = '';
	mockVar.curQuesBean.quesParam.selectedOptId = '';
	if(mockVar.curQuesBean.quesType =="SA" || mockVar.curQuesBean.quesType =="COMPREHENSION@@SA" || mockVar.curQuesBean.quesType =="LA@@SA" ){
		$('#answer').val('');
		$("#noOfWords").text('');
	}else{
		var answers = document.getElementsByName('answers');
		for(var i=0;i<answers.length;i++)
		{
			if(answers[i].checked==true)
				answers[i].checked=false;
		}
	}
	fnSubmit('RESET');
}
function resetOptionGroup(){
	if(iOAP.secDetails[iOAP.curSection].groupAllQuestions != "undefined" && iOAP.secDetails[iOAP.curSection].groupAllQuestions != "" && iOAP.secDetails[iOAP.curSection].groupAllQuestions == "true"){
		for(var i=0;i<mockVar.curSectionQuestions.length;i++){
			mockVar.curSectionQuestions[i].quesParam.answer = '';
			mockVar.curSectionQuestions[i].quesParam.selectedOptId = '';
			if(mockVar.curSectionQuestions[i].quesType =="SA" || mockVar.curSectionQuestions[i].quesType =="COMPREHENSION@@SA" || mockVar.curSectionQuestions[i].quesType =="LA@@SA" ){
				$('#answer'+mockVar.curSectionQuestions[i].quesId).val('');
				$("#noOfWords"+mockVar.curSectionQuestions[i].quesId).text('');
			}else{
				var answers = document.getElementsByName('answers'+mockVar.curSectionQuestions[i].quesId);
				for(var j=0;j<answers.length;j++){
					if(answers[j].checked==true)
						answers[j].checked=false;
				}
			}
		}
	}else{
		compreQuesIndex = mockVar.compreLaqQues.inArray(mockVar.curQuesBean.comprehensionId, 'quesId');
		var compreQues = mockVar.compreLaqQues[compreQuesIndex];
		for(var i=0;i<mockVar.curSectionQuestions.length;i++){
			if(mockVar.curSectionQuestions[i].comprehensionId == compreQues.quesId){
				mockVar.curSectionQuestions[i].quesParam.answer = '';
				mockVar.curSectionQuestions[i].quesParam.selectedOptId = '';
				if(mockVar.curSectionQuestions[i].quesType =="SA" || mockVar.curSectionQuestions[i].quesType =="COMPREHENSION@@SA" || mockVar.curSectionQuestions[i].quesType =="LA@@SA" ){
					$('#answer'+mockVar.curSectionQuestions[i].quesId).val('');
					$("#noOfWords"+mockVar.curSectionQuestions[i].quesId).text('');
				}else{
					var answers = document.getElementsByName('answers'+mockVar.curSectionQuestions[i].quesId);
					for(var j=0;j<answers.length;j++)
					{
						if(answers[j].checked==true)
							answers[j].checked=false;
					}
				}
			}
		}
	}
	fnsubmitGroupQuestion('RESET');
}
function resetProgramming(){
	var programmingSkeletalCode=mockVar.curQuesBean.programmingSkeletalCode;
	mockVar.curQuesBean.quesParam.answer=programmingSkeletalCode;
	mockVar.curQuesBean.quesParam.status = 'notanswered';
	editor.setValue(mockVar.curQuesBean.quesParam.answer);
	$('#textareaforflip').val(mockVar.curQuesBean.quesParam.answer);
}

function saveQuestionAutomatically(){
	if(iOAP.secDetails[iOAP.curSection].groupAllQuestions == "true" ){
		/*for(var i=0;i<mockVar.curSectionQuestions.length;i++){
		if((mockVar.curSectionQuestions[i].quesType =="SA" || mockVar.curSectionQuestions[i].quesType =="COMPREHENSION@@SA" || mockVar.curSectionQuestions[i].quesType =="LA@@SA") && mockVar.curSectionQuestions[i].keyboardType == 'Alphanumeric'){
		fnsubmitGroupQuestion('saveSA');
		}
		}*/
	}else{
		if((mockVar.curQuesBean.quesType =="SA" || mockVar.curQuesBean.quesType =="COMPREHENSION@@SA" || mockVar.curQuesBean.quesType =="LA@@SA") && mockVar.curQuesBean.keyboardType == 'Alphanumeric'){
			if(mockVar.curQuesBean.comprehensionId != 0 || mockVar.curQuesBean.laqId != 0){
				//var compreLaqCount= 0;
				var compreLaqID = 0;
				if(typeof(mockVar.compreLaqQues[compreLaqID])!= "undefined"){
					/*for(var j=0;j<mockVar.curSectionQuestions.length;j++){
				if(mockVar.curQuesBean.comprehensionId!=0){
				if(mockVar.curQuesBean.comprehensionId == mockVar.curSectionQuestions[j].comprehensionId){
							compreLaqCount++;
					}
				}else if(mockVar.curQuesBean.laqId!=0){
					if(mockVar.curQuesBean.laqId == mockVar.curSectionQuestions[j].laqId){
							compreLaqCount++;
					}
				}
		}*/
					for(var k=0;k<mockVar.compreLaqQues.length;k++){
						if(mockVar.curQuesBean.comprehensionId == mockVar.compreLaqQues[k].quesId){
							compreLaqID = k;
							break;
						}else if(mockVar.curQuesBean.laqId == mockVar.compreLaqQues[k].quesId){
							compreLaqID = k;
							break;
						}
					}
					if( typeof(mockVar.compreLaqQues[compreLaqID].groupComprehensionLaqQuestions) != "undefined" && mockVar.compreLaqQues[compreLaqID].groupComprehensionLaqQuestions != "" && ((mockVar.compreLaqQues[compreLaqID].groupComprehensionLaqQuestions == "true") && (mockVar.compreLaqQues[compreLaqID].quesId == mockVar.curQuesBean.laqId  || mockVar.compreLaqQues[compreLaqID].quesId == mockVar.curQuesBean.comprehensionId)) ){
						//fnsubmitGroupQuestion('saveSA');
					}
					//fnSubmit('saveSA');
					else{
						fnSubmit('saveSA');
					}
				}
			}else{
				fnSubmit('saveSA');
			}
		}else if(mockVar.curQuesBean.quesType =="PROGRAMMING TEST"){
			fnSubmit('savePrograming');
		}
	}
}


function submitConfirmation(param){
	var ques = mockVar.curQuesBean;
	isSubmitButtonClicked = true;
	//var noOfAns=0,noOfNtAns=0,noOfReview=0,noOfNtAttemp=0,totalQues=0;
	var wrongCharCount = 0, ellapsedTime = 0;
	var str= "", timeOutStr = "", typingStr = "";
	saveQuestionAutomatically();
	str = "<div class='examSummaryHeader titlepath' style='background:none'><span class='header'>"+mockLabels.examSummary+"</span></div>";
	if(param == "break"){
		str += "<div id='break_summary' style='overflow:auto;text-align:center;padding:20px;'>";
	}else if(param=='submit'){
		str += "<div id='group_summary' style='overflow:auto;text-align:center;padding:20px;border-bottom:1px solid #c3c3c1'>";
	} else if(param=='timeout'){
		timeOutStr = "<div class='examSummaryHeader titlepath'><span class='header'>"+mockLabels.examSummary+"</span></div>";
		timeOutStr += "<div id='group_summary' style='overflow:auto;text-align:center;padding:20px;border-bottom:1px solid #c3c3c1'>";
	}
	if(mockVar.groups.length==1){
		timeOutStr += "<table class='score_card_table' cellspacing=0 width='80%' align='center' style='margin-top:5%'>";
		if(iOAP.secDetails[0].secType.toUpperCase().indexOf("TYPING")!=-1){
			timeOutStr += "<thead><tr><th>"+mockLabels.secName+"</th><th>"+mockLabels.keyStrokesCount+"</th><th>"+mockLabels.elapsedTime+"</th></tr><thead>";
		}else{
			if($("#g"+(mockVar.currentGrp)).attr('data-normgrpsec')==="true"){
				timeOutStr += "<thead><tr><th>"+mockLabels.secName+"</th><th>"+mockLabels.noOfQues+"</th><th>"+mockLabels.answered+"</th><th>"+mockLabels.notAnswered+"</th><th>"+mockLabels.markReview+"</th><th>"+mockLabels.markAnsTitle+"</th><th>"+mockLabels.notAttempted+"</th></tr><thead>";
			}else{
				/*timeOutStr += "<thead><tr><th>"+mockLabels.secName+"</th><th>"+mockLabels.noOfQues+"</th><th>"+mockLabels.answered+"</th><th>"+mockLabels.notAnswered+"</th><th>"+mockLabels.notAttempted+"</th></tr><thead>";*/
				timeOutStr += "<thead><tr><th>"+mockLabels.secName+"</th><th>"+mockLabels.noOfQues+"</th><th>"+mockLabels.answered+"</th><th>"+mockLabels.notAnswered+"</th></tr><thead>";
			}
		}
		for(var i=0;i<iOAP.secDetails.length;i++){
			if(iOAP.secDetails[i].secType.toUpperCase().indexOf("TYPING")!=-1){
				wrongCharCount = (mockVar.curQuesBean.typingType.toLowerCase()=='restricted')?0:getWrongCharCount();
				//wrongCharCount = (mockVar.curQuesBean.typingType.toLowerCase()=='restricted')?0:(mockVar.curQuesBean.typingEvalMode.toLowerCase()=='standard'?getCorrectCharCountforStandard():getWrongCharCount());
				ellapsedTime = mockVar.typingGroup[0].ellapsedTime;
				timeOutStr += "<tbody><tr><td width='25%'>"+iOAP.secDetails[i].secName+"</td><td width='25%'>"+mockVar.typingGroup[mockVar.currentGrp].keyStrokesCount+"</td><td width='25%'>"+(ellapsedTime/60).toFixed(2)+"</td></tr><tbody>";
				mockVar.typingGroup[0].wrongCharCount = wrongCharCount;
			}else{
				if(iOAP.secDetails[i].isOptional=='false'){
					timeOutStr += getSummaryBody(i,iOAP,mockVar.currentGrp);
				}else if(iOAP.secDetails[i].isOptional=='true' && iOAP.secDetails[i].isSelected){
					timeOutStr += getSummaryBody(i,iOAP,mockVar.currentGrp);
				}
			}
		}
		timeOutStr += "</table></div>";
	}else{
		str += "<div style='text-align:left'><b>"+mockVar.groups[mockVar.currentGrp].groupName+"</b>"+mockLabels.curGrp+"</div>";
		str += "<table class='score_card_table' cellspacing=0 width='80%' align='center'>";
		if(iOAP.secDetails[0].secType.toUpperCase().indexOf("TYPING")!=-1){
			str += "<thead><tr><th>"+mockLabels.secName+"</th><th>"+mockLabels.keyStrokesCount+"</th><th>"+mockLabels.elapsedTime+"</th></tr><thead>";
		}else{
			if($("#g"+(mockVar.currentGrp)).attr('data-normgrpsec')==="true"){
				str += "<thead><tr><th>"+mockLabels.secName+"</th><th>"+mockLabels.noOfQues+"</th><th>"+mockLabels.answered+"</th><th>"+mockLabels.notAnswered+"</th><th>"+mockLabels.markReview+"</th><th>"+mockLabels.markAnsTitle+"</th><th>"+mockLabels.notAttempted+"</th></tr><thead>";
			}else{
				/*str += "<thead><tr><th>"+mockLabels.secName+"</th><th>"+mockLabels.noOfQues+"</th><th>"+mockLabels.answered+"</th><th>"+mockLabels.notAnswered+"</th><th>"+mockLabels.notAttempted+"</th></tr><thead>";*/
				str += "<thead><tr><th>"+mockLabels.secName+"</th><th>"+mockLabels.noOfQues+"</th><th>"+mockLabels.answered+"</th><th>"+mockLabels.notAnswered+"</th></tr><thead>";
			}
		}
		for(var i=0;i<iOAP.secDetails.length;i++){
			if(iOAP.secDetails[i].secType.toUpperCase().indexOf("TYPING")!=-1){
				wrongCharCount = (mockVar.curQuesBean.typingType.toLowerCase()=='restricted')?0:getWrongCharCount();
				//wrongCharCount = (mockVar.curQuesBean.typingType.toLowerCase()=='restricted')?0:mockVar.curQuesBean.typingEvalMode.toLowerCase()=="standard"?getCorrectCharCountforStandard():getWrongCharCount();
				ellapsedTime = mockVar.typingGroup[mockVar.currentGrp].ellapsedTime;
				str += "<tbody><tr><td width='25%'>"+iOAP.secDetails[i].secName+"</td><td width='25%'>"+mockVar.typingGroup[mockVar.currentGrp].keyStrokesCount+"</td><td width='25%'>"+(ellapsedTime/60).toFixed(2)+"</td></tr><tbody>";
				mockVar.typingGroup[mockVar.currentGrp].wrongCharCount = wrongCharCount;
			}else{
				if(iOAP.secDetails[i].isOptional=='false'){
					str += getSummaryBody(i,iOAP,mockVar.currentGrp);
				}else if(iOAP.secDetails[i].isOptional=='true' && iOAP.secDetails[i].isSelected){
					str += getSummaryBody(i,iOAP,mockVar.currentGrp);
				}
			}
		}
		str += "</table>";
		for(var j=0;j<mockVar.groups.length;j++){
			var temp_iOAP = mockVar.groups[j];
			if(mockVar.currentGrp >j || param == "timeout"){
				if(temp_iOAP.secDetails[0].secType.toUpperCase().indexOf("TYPING")!=-1){
					typingStr += "<br/><div style='text-align:left''><b>"+mockVar.groups[j].groupName+"</b> :</div>";
					typingStr += "<table class='score_card_table' cellspacing=0 width='80%' align='center'>";
					typingStr += "<thead><tr><th>"+mockLabels.secName+"</th><th>"+mockLabels.keyStrokesCount+"</th><th>"+mockLabels.elapsedTime+"</th></tr><thead>";
				}else{
					if(param == "timeout"){
						timeOutStr +=  "<br/><div style='text-align:left'><b>"+mockVar.groups[j].groupName+"</b> :</div>";
					}else{
						timeOutStr +=  "<br/><div style='text-align:left'><b>"+mockVar.groups[j].groupName+"</b> : ( "+mockLabels.attemptedGrp;
						if(mockVar.groups[j].isViewable=="true"){
							timeOutStr += mockLabels.canView;
						}else{
							timeOutStr += mockLabels.canNotView;
						}
						if(mockVar.groups[j].isEditable=="true"){
							timeOutStr += mockLabels.canEdit;
						}else{
							timeOutStr += mockLabels.canNotEdit;
						}
						timeOutStr += ")</div>";
					}
					timeOutStr += "<table class='score_card_table' cellspacing=0 width='80%' align='center'>";
					if($("#g"+(/*mockVar.currentGrp*/j)).attr('data-normgrpsec')==="true"){
						timeOutStr += "<thead><tr><th>"+mockLabels.secName+"</th><th>"+mockLabels.noOfQues+"</th><th>"+mockLabels.answered+"</th><th>"+mockLabels.notAnswered+"</th><th>"+mockLabels.markReview+"</th><th>"+mockLabels.markAnsTitle+"</th><th>"+mockLabels.notAttempted+"</th></tr><thead>";
					}else{
						/*timeOutStr += "<thead><tr><th>"+mockLabels.secName+"</th><th>"+mockLabels.noOfQues+"</th><th>"+mockLabels.answered+"</th><th>"+mockLabels.notAnswered+"</th><th>"+mockLabels.notAttempted+"</th></tr><thead>";*/
						timeOutStr += "<thead><tr><th>"+mockLabels.secName+"</th><th>"+mockLabels.noOfQues+"</th><th>"+mockLabels.answered+"</th><th>"+mockLabels.notAnswered+"</th></tr><thead>";
					}
				}
				for(var i=0;i<temp_iOAP.secDetails.length;i++){
					if(temp_iOAP.secDetails[i].secType.toUpperCase().indexOf("TYPING")!=-1){
						typingStr += "<tbody><tr><td width='25%'>"+temp_iOAP.secDetails[i].secName+"</td><td width='25%'>"+mockVar.typingGroup[j].keyStrokesCount+"</td><td width='25%'>"+(mockVar.typingGroup[j].ellapsedTime/60).toFixed(2)+"</td></tr><tbody>";
					}else{
						if(temp_iOAP.secDetails[i].isOptional=='false'){

							timeOutStr += getSummaryBody(i,temp_iOAP,j);

						}else if(temp_iOAP.secDetails[i].isOptional=='true' && temp_iOAP.secDetails[i].isSelected){

							timeOutStr += getSummaryBody(i,temp_iOAP,j);
						}
					}
				}
				typingStr += "</table>";
				timeOutStr += "</table>";
			}else if(mockVar.currentGrp<j){
				timeOutStr +=  "<br/><div style='text-align:left'><b>"+mockVar.groups[j].groupName+"</b>"+mockLabels.yetToAttempt+"</div>";
			}
		}
		timeOutStr += typingStr;
		timeOutStr += "</div>";
	}
	str += timeOutStr;
	if(param == 'submit'){
		str +="<div id='confirmation_buttons' class='btnsection' style='text-align:center;padding:10px'>";
		str += mockLabels.submitGrp;
		if(mockVar.groups[mockVar.currentGrp].isEditable=="false" && mockVar.groups[mockVar.currentGrp].isViewable=="false")
			str +="<br>"+$(globalXmlvar).find('grpSubmitMsg1').text();
		else if(mockVar.groups[mockVar.currentGrp].isEditable=="false" && mockVar.groups[mockVar.currentGrp].isViewable=="true")
			str +="<br>"+$(globalXmlvar).find('grpSubmitMsg2').text();
		else if(mockVar.groups[mockVar.currentGrp].isEditable=="true" && mockVar.groups[mockVar.currentGrp].isViewable=="true")
			str +="<br>"+$(globalXmlvar).find('grpSubmitMsg3').text();
		str +=' <div><input onclick="finalSubmit(';
		str += "'group'";
		str +=')" type="button" id="#yesbtn" class="btn btn-primary" style="margin-right:10px;"  value="'+mockLabels.yes+'"/><input onclick="showModule(';
		str +="'Questn_Area'";
		str +=');doCalculations(0,0);removeActiveLinks();" type="button" id="#nobtn" class="btn btn-primary"  value="'+mockLabels.no+'"/></div></div>';
		$("#sectionSummaryDiv").html(str);
		$('.Questn_Area').hide();
		$('.collapsebel_panel').hide();
		$('.expand_icon').hide();
		$('.helpinstruction_div').hide();
		$('.nav-container').hide();
		$('.section-timepanel').hide();
		$('.subject-selection').hide();
		$('.viewProfile').hide();
		$('.ruler-div,.hamburgerBar').hide();
		$('#loadCalc').hide();
		$('.protactor-div').hide();
		$('.scratch-pad-container').hide();
		$('.textarea-div').hide();
		$('.courseInfoPop').hide();
		$('.subject-section-rightarrow').hide();
		$('.subheader_tab,.grup_components,.q_tab,.btntab').hide();
		$('#curGrpName').html(mockVar.groups[mockVar.currentGrp].groupName);
		showModule('sectionSummaryDiv');
	}else if(param == 'timeout'){
		timeOutStr += "<div class='btnsection' align='center'>";
		timeOutStr +="<div  onclick='submitMock()' type='button' class='btn btn-primary nextbtn'><span><span id='timeoutSummaryNextBtnDiv '><strong>Next</span><img id='forwordImage' src='images/Forward-25.png' width='25' height='25' /></strong></span></div></div>";
		return timeOutStr;
	}else if(param == 'break'){
//		for(var j=0;j<mockVar.groups.length;j++)
		if(mockVar.groups[mockVar.currentGrp].mandatoryBreak == "true"){
			$('#brkPrcdBtnDiv').hide();
		}
		else
			$('#brkPrcdBtnDiv').show();
		$('#questionContent').show();
		$('.Questn_Area').hide();
		$("#sectionSummaryDiv").hide();
		$('.helpinstruction_div').hide();
		$('.nav-container,.hamburgerBar').hide();
		$('.section-timepanel').hide();
		$('.subject-selection').hide();
		$('.viewProfile').hide();
		$('.collapsebel_panel').hide();
		$('.expand_icon').hide();
		$('.subject-section-rightarrow').hide();
		$("#breakSummaryDiv").html(str);
		$('#breakTimeDiv').show();
		$('#loadCalc').hide();
		$('.protactor-div').hide();
		$('.scratch-pad-container').hide();
		$('.textarea-div').hide();
		$('.courseInfoPop').hide();
		$('.subject-section-rightarrow').hide();
		$('.subheader_tab,.grup_components,.q_tab,.btntab').hide();
		if($('.canvasmenu').is(':visible')){
			$("#minwidth").removeClass("animatewidth");
			$(".hamburgerBar").removeClass("hambg");
			$(".canvasmenu").css({ "right": "-315px", "width": "0px" });
			$("#minwidth").animate({
				right: 0
			}, 400, function() {});

			$(".overlaymenu").css("display", "none");
			$('.mpop').hide();
			$('.overlay').hide();
		}
		tb_remove();
		//$('#breakContentDiv').height($('#breakTimeDiv').height()-$('#brkPrcdBtnDiv').outerHeight(true)-$('#col1').outerHeight(true));
		//$('#breakSummaryDiv').height($('#breakContentDiv').height()-$('#breakTimeCountDiv').outerHeight(true));
		//$('#break_summary').height($('#breakSummaryDiv').height()-40-$('.examSummaryHeader').outerHeight(true));
	}
//	$("#group_summary").css({"height":($(document).height()*.40)+"px"});
	tableResp();
	if (jQuery(window).width() > 1000) {
		quizPageHeight();
	} else {
		setDIVHeight_resp(); 
	}
//	$('#group_summary').height($('#sectionSummaryDiv').height()-$('#confirmation_buttons').outerHeight(true)-$('.examSummaryHeader').outerHeight(true)-110);
}


function submitMock(action){
	if(mockVar.storeCandResponse == 1){
		saveCandResponse(action);
	}else{
		isFinalSubmitStarted = true;
		mockScoreCalc();
		moveToScoreCardDisplay();
	}
}

function moveToScoreCardDisplay(){
	if(typeof(mockVar.displayScoreCard)!='undefined' && mockVar.displayScoreCard == 1){
		showScoreCard();
	}else{
		moveToFeedback();
	}
}

function moveToFeedback(){
	setCookie(mockVar.langName);
	document.cookie = "defLangName=" + mockVar.languages[mockVar.defaultLang] + ";";
	if(mockVar.isFeedBackRequired == "NO"){
		window.location.href = "close.html?"+mockVar.orgId +"@@"+mockVar.mockId+"@@"+mockVar.subscribedFor+"#"+((document.cookie.indexOf('isApp=true')>= 0)?"isApp":"")+((document.cookie.indexOf('isLauncher=true')>= 0)?"isLauncher":"");
	}else{
		window.location.href = "FeedBack.html?"+mockVar.orgId +"@@"+mockVar.mockId+"@@"+mockVar.subscribedFor+"@@"+mockVar.candMasterId+"@@"+mockVar.attemptId+"@@"+mockVar.useDefaultFeedback;
	}
}

function finalSubmit(type){
	var str ="<table style='margin-top:5%; text-align:center'><tr><td colspan='2' style='font-size:14px'>";
	if(mockVar.storeCandResponse==1){
		if(mockVar.groups.length<=(parseInt(mockVar.currentGrp)+1)){
			str += mockLabels.SubmitGroupFinal;
			str +='</td></tr><tr><td style="text-align:right;width:50%"><input type="button" onclick="this.disabled=true;';
			if(type=="submit"){
				str += 'fnSubmit(';
				str += "'SUBMIT'";
				str += ')"';
			}else{
				str +="checkGroupBreakTime();removeActiveLinks();";
			}
			str	+= '"  id="#nobtn" class="btn btn-primary" style="margin-right:10px;min-width:76px"  value="'+mockLabels.ok+'"/></td><td  style="text-align:left"><input onclick="showModule(';
			str +="'Questn_Area'";
			str +=');doCalculations(0,0);removeActiveLinks();" type="button" id="#nobtn" style="margin-left:10px;" class="btn btn-primary" value="'+mockLabels.cancel+'" /></td></tr></table>';
			$("#sectionSummaryDiv").html(str);
			$('#curGrpName').html(mockVar.groups[mockVar.currentGrp].groupName);
		}
		else{
			if(type=="submit"){
				fnSubmit('SUBMIT');
			}else{
				checkGroupBreakTime();removeActiveLinks();
			}
		}
	}
	else{	
		if(mockVar.groups.length<=(parseInt(mockVar.currentGrp)+1)){
			//	str += "Thank you,your exam is about to be submitted.Click OK to proceed.<br>Are you sure of submitting the exam?";;
			str += mockLabels.sectionSummary+ '<br>'+mockLabels.sectionSummary1;
			str +='</td></tr><tr><td style="text-align:right;width:50%"><input type="button" onclick="this.disabled=true;';
			if(type=="submit"){
				str += 'fnSubmit(';
				str += "'SUBMIT'";
				str += ')"';
			}else{
				str +="checkGroupBreakTime();removeActiveLinks();";
			}
			str	+= '"  id="#nobtn" class="btn btn-primary" style="margin-right:10px;min-width:76px"  value="'+mockLabels.ok+'"/></td><td  style="text-align:left"><input onclick="showModule(';
			str +="'Questn_Area'";
			str +=');doCalculations(0,0);removeActiveLinks();" type="button" id="#nobtn" style="margin-left:10px;" class="btn btn-primary" value="'+mockLabels.cancel+'" /></td></tr></table>';
			$("#sectionSummaryDiv").html(str);
			$('#curGrpName').html(mockVar.groups[mockVar.currentGrp].groupName);
		}
		else{
			str += mockLabels.submitExam;
			str +='</td></tr><tr><td style="text-align:right;width:50%"><input onclick="';
			if(type=="submit"){
				str += 'fnSubmit(';
				str += "'SUBMIT'";
				str += ')"';
			}else{
				str +="checkGroupBreakTime();removeActiveLinks();";
			}
			str	+= '" type="button" id="#nobtn" class="btn btn-primary" style="margin-right:10px;"  value="'+mockLabels.yes+'"/></td><td  style="text-align:left"><input onclick="showModule(';
			str +="'Questn_Area'";
			str +=');doCalculations(0,0);removeActiveLinks();" type="button" id="#nobtn" style="margin-left:10px;" class="btn btn-primary" value="'+mockLabels.no+'" /></td></tr></table>';
			$("#sectionSummaryDiv").html(str);
			$('#curGrpName').html(mockVar.groups[mockVar.currentGrp].groupName);
		}
	}
}
function fnsubmitGroupQuestion(action){
	saveJwplayerParam();
	getCurrentGrpSecQuestId(false,0);
	var selectedAnswer="";
	var groupAnswers = new Array();
	//var wordCountForSA = "";
	var proceed = true;
	var section = iOAP.secDetails[iOAP.curSection];
	var hasOptionalQuestion = section.hasOptionalQuestion;
	var quesToBeConsidered = 0;
	var count = 0;
	var selectedOptId = '';
	/*var myFile = new Array();
	var myFileQuesId = new Array();
	var myFileType = new Array();
	var myFileSize = new Array();
	var myFileList = new Array();*/
	var formData =  mockVar.storeCandResponse == 1 ? new FormData():$('');
//	var counter = 0;
	if(iOAP.secDetails[iOAP.curSection].groupAllQuestions == "true"){
		if(action != "SKIP"){ 
			for(var i=0;i<section.questions.length;i++){
				if(section.questions[i].quesType =="SA" || section.questions[i].quesType =="COMPREHENSION@@SA" || section.questions[i].quesType =="LA@@SA"){
					if(section.questions[i].keyboardType == "FileUpload"){
						var fileTypeList = '';
						var fileInput = document.getElementById("uploadBtn"+section.questions[i].quesId);
						if(action != "RESET" && action!="PREVIOUS"){
							if(fileInput.type == "file"){
								var fileName = 	fileInput.value;
								if(fileName.length>0){
									for(var j=0;j<section.questions[i].allowedExtensions.split(",").length;j++){
										allowedExtension = section.questions[i].allowedExtensions.split(",")[j];
										if((fileName.substr(fileName.length - allowedExtension.length ,allowedExtension.length)).toLowerCase() != allowedExtension.toLowerCase()){
											//proceed = false;
											//alert("Please upload only "+mockVar.curQuesBean.allowedExtensions+" file" );
										}else{
											proceed = true;
											break;
										}
									}
									for(var k=0;k<section.questions[i].allowedExtensions.split(",").length;k++){
										allowedExtension = section.questions[i].allowedExtensions.split(",")[k];
										fileTypeList = fileTypeList+allowedExtension+"_";
									}
									fileTypeList = fileTypeList.slice(0, -1);
									//var size= (fileInput.files[0].size/1048576).toFixed(2);
									/*	if(size > section.questions[i].allowedSize){
						cnfPop('InfoPopup');
						$("#infoMsg2").html("Maximum size of a file should be "+section.questions[i].allowedSize+" MB only" );
						proceed = false;
					}


							if(proceed == false && size <= section.questions[i].allowedSize){
								cnfPop('InfoPopup');
								$("#infoMsg2").html("Please upload only "+section.questions[i].allowedExtensions+" files" );
							}	*/
								}
							}
							if (fileInput.files.length != 0) {
								formData.append("myFile["+count+"]", document.getElementById("uploadBtn"+section.questions[i].quesId).files[0]);
								formData.append("myFileQuesId["+count+"]",section.questions[i].quesId);
								formData.append("myFileType["+count+"]",fileTypeList.toLowerCase());
								formData.append("myFileSize["+count+"]",section.questions[i].allowedSize);
								formData.append("myFileList["+count+"]",section.questions[i].allowedType);
								selectedAnswer = document.getElementById("uploadBtn"+section.questions[i].quesId).value;
								//mockVar.curSectionQuestions[i].quesParam.answer = selectedAnswer;
								groupAnswers.push(new groupAnswerBean(section.questions[i].quesId,selectedAnswer));
								mockVar.curSectionQuestions[i].quesParam.langID = mockVar.curSectionQuestions[i].quesLangBeans[mockVar.langIndex].langId;
								count++;
							}
						}	
					}else{
						selectedAnswer = document.getElementById('answer'+section.questions[i].quesId).value;
						selectedOptionsAndAnswersList(mockVar.currentGrp,iOAP.curSection,i,selectedAnswer,"");
						//mockVar.curSectionQuestions[i].quesParam.answer = selectedAnswer;
						/*if(mockVar.groups[mockVar.currentGrp].secDetails[iOAP.curSection].questions[i].selectedAnswerList != 'undefined')
						mockVar.groups[mockVar.currentGrp].secDetails[iOAP.curSection].questions[i].selectedAnswerList = mockVar.groups[mockVar.currentGrp].secDetails[iOAP.curSection].questions[i].selectedAnswerList +"@"+selectedAnswer;*/
						groupAnswers.push(new groupAnswerBean(section.questions[i].quesId,selectedAnswer));
						mockVar.curSectionQuestions[i].quesParam.langID = mockVar.curSectionQuestions[i].quesLangBeans[mockVar.langIndex].langId;
						//	selectedAnswer.push(new answerKeyBean(keyName,keyVal));
						//wordCountForSA = $("#noOfWords"+section.questions[i].quesId).text();
						mockVar.curSectionQuestions[i].typedWord = $('#noOfWords'+section.questions[i].quesId).html()==undefined?($('#noOfWords').html()!=undefined ? $('#noOfWords').html().split(' ')[0]:'0'):$('#noOfWords'+section.questions[i].quesId).html().split(' ')[0];
					}
				}
				else if(section.questions[i].quesType =="MCQ" || section.questions[i].quesType =="COMPREHENSION@@MCQ" || section.questions[i].quesType =="LA@@MCQ" || section.questions[i].quesType =="MSQ" || section.questions[i].quesType =="COMPREHENSION@@MSQ" || section.questions[i].quesType =="LA@@MSQ"){
					selectedAnswer = "";
					selectedOptId ="";
					var answers = document.getElementsByName('answers'+section.questions[i].quesId);
					//keyName =section.questions[i].quesId;
					for(var j=0;j<answers.length;j++){
						if(answers[j].checked==true){   
							selectedAnswer = answerTxt(j,answers,selectedAnswer);
							//selectedAnswer = ($(answers[j]).parent().next('span').text()) + "<ANS_SEP>" + selectedAnswer;
							selectedOptId = (answers[j].value) + "," + selectedOptId;
						}
					}
					if(selectedAnswer !=""){
						selectedAnswer = selectedAnswer.substring(0,selectedAnswer.length-9);
					}
					if(selectedOptId!=''){
						selectedOptId = selectedOptId.substring(0,selectedOptId.length-1);
					}
					selectedOptionsAndAnswersList(mockVar.currentGrp,iOAP.curSection,i,selectedOptId,"id");
					//mockVar.curSectionQuestions[i].quesParam.answer = selectedAnswer;
					groupAnswers.push(new groupAnswerBean(section.questions[i].quesId,selectedAnswer,selectedOptId));
					//mockVar.curSectionQuestions[i].quesParam.selectedOptId = selectedOptId;
					mockVar.curSectionQuestions[i].quesParam.langID = mockVar.curSectionQuestions[i].quesLangBeans[mockVar.langIndex].langId;
				}
				/*	if(selectedAnswer!=null && selectedAnswer!=""){
			counter++;
		}*/
			}
		}
	}else{
		//var compreLaqID = '';
		var	compreQuesIndex = '';
		var	laqQuesIndex = '';
		var additionalType='',columnType="";
		//var laqQues ;
		var compreQues="";
		if(mockVar.curQuesBean.comprehensionId !=0){
			compreQuesIndex = mockVar.compreLaqQues.inArray(section.questions[iOAP.curQues].comprehensionId, 'quesId');
			compreQues = mockVar.compreLaqQues[compreQuesIndex].quesId;
			additionalType = mockVar.compreLaqQues[compreQuesIndex].additionalQuesType;
			columnType = mockVar.compreLaqQues[compreQuesIndex].columnType;
		}
		else if(mockVar.curQuesBean.laqId !=0){
			laqQuesIndex = mockVar.compreLaqQues.inArray(section.questions[iOAP.curQues].laqId, 'quesId');
			compreQues = mockVar.compreLaqQues[laqQuesIndex].quesId;
		}
		for(var i=0;i<section.questions.length;i++){
			if(section.questions[i].comprehensionId==compreQues || section.questions[i].laqId==compreQues ){
				if(section.questions[i].quesType =="SA" || section.questions[i].quesType =="COMPREHENSION@@SA" || section.questions[i].quesType =="LA@@SA"){
					if(section.questions[i].keyboardType == "FileUpload"){
						var fileTypeList = '';
						var fileInput = document.getElementById("uploadBtn"+section.questions[i].quesId);
						if(action != "RESET" && action!="PREVIOUS"){
							if(fileInput.type == "file"){
								var fileName = 	fileInput.value;
								if(fileName.length>0){
									for(var j=0;j<section.questions[i].allowedExtensions.split(",").length;j++){
										allowedExtension = section.questions[i].allowedExtensions.split(",")[j];
										if((fileName.substr(fileName.length - allowedExtension.length ,allowedExtension.length)).toLowerCase() != allowedExtension.toLowerCase()){
											//	proceed = false;
											//alert("Please upload only "+mockVar.curQuesBean.allowedExtensions+" file" );
										}else{
											proceed = true;
											break;
										}
									}
									for(var k=0;k<section.questions[i].allowedExtensions.split(",").length;k++){
										allowedExtension = section.questions[i].allowedExtensions.split(",")[k];
										fileTypeList = fileTypeList+allowedExtension+"_";
									}
									fileTypeList = fileTypeList.slice(0, -1);
									var size= (fileInput.files[0].size/1048576).toFixed(2);
									if(size > section.questions[i].allowedSize){
										cnfPop('InfoPopup');
										//$("#infoMsg2").html("Maximum size of a file should be "+section.questions[i].allowedSize+" MB only" );
										$("#infoMsg2").html($(globalXmlvar).find('fileUploadSizeError').text());
										$(".fileSize").html(section.questions[i].allowedSize);
										proceed = false;
									}
									if(proceed == false && size <= section.questions[i].allowedSize){
										cnfPop('InfoPopup');
										//$("#infoMsg2").html("Please upload only "+section.questions[i].allowedExtensions+" files" );
										$("#infoMsg2").html($(globalXmlvar).find('fileUploadTypeError').text());
										$(".fileType").html(section.questions[i].allowedExtensions);
									}	
								}
							}
							if (fileInput.files.length != 0) {
								formData.append("myFile["+count+"]", document.getElementById("uploadBtn"+section.questions[i].quesId).files[0]);
								formData.append("myFileQuesId["+count+"]",section.questions[i].quesId);
								formData.append("myFileType["+count+"]",fileTypeList.toLowerCase());
								formData.append("myFileSize["+count+"]",section.questions[i].allowedSize);
								formData.append("myFileList["+count+"]",section.questions[i].allowedType);
								selectedAnswer = document.getElementById("uploadBtn"+section.questions[i].quesId).value;
								//mockVar.curSectionQuestions[i].quesParam.answer = selectedAnswer;
								groupAnswers.push(new groupAnswerBean(section.questions[i].quesId,selectedAnswer));
								mockVar.curSectionQuestions[i].quesParam.langID = mockVar.curSectionQuestions[i].quesLangBeans[mockVar.langIndex].langId;
								count++;
							}
						}	
					}else{
						if(action != "PREVIOUS"){
							selectedAnswer = document.getElementById('answer'+section.questions[i].quesId).value;
							if(selectedAnswer.indexOf('"')>-1){
								selectedAnswer=selectedAnswer.replace(/\"/g,'&quot;');
							}
							groupAnswers.push(new groupAnswerBean(section.questions[i].quesId,selectedAnswer));
							//mockVar.curSectionQuestions[i].quesParam.answer = selectedAnswer;
							mockVar.curSectionQuestions[i].quesParam.langID = mockVar.curSectionQuestions[i].quesLangBeans[mockVar.langIndex].langId;
							//wordCountForSA = $("#noOfWords"+section.questions[i].quesId).text();
							//mockVar.curSectionQuestions[i].typedWord = $('#noOfWords'+section.questions[i].quesId).html().split(' ')[0];
							//mockVar.curSectionQuestions[i].typedWord = $('#noOfWords'+section.questions[i].quesId).html()==undefined?$('#noOfWords'+section.questions[i].quesId).html():$('#noOfWords'+section.questions[i].quesId).html().split(' ')[0];
							mockVar.curSectionQuestions[i].typedWord = $('#noOfWords'+section.questions[i].quesId).html()==undefined?($('#noOfWords').html()!=undefined ? $('#noOfWords').html().split(' ')[0]:'0'):$('#noOfWords'+section.questions[i].quesId).html().split(' ')[0];
							selectedOptionsAndAnswersList(mockVar.currentGrp,iOAP.curSection,i,selectedAnswer,"");
						}
					}
				}else if(section.questions[i].quesType =="MCQ" || section.questions[i].quesType =="COMPREHENSION@@MCQ" || section.questions[i].quesType =="LA@@MCQ" || section.questions[i].quesType =="MSQ" || section.questions[i].quesType =="COMPREHENSION@@MSQ" || section.questions[i].quesType =="LA@@MSQ"){
					selectedAnswer = "";
					selectedOptId ="";
					if(additionalType!==undefined  && additionalType!==""){    
						var answerId = '';
						if(additionalType=="FITB"){
							answerId = "#answers"+section.questions[i].quesId+" option:selected";
							if($(answerId).val()!=="select"){
								selectedAnswer = $(answerId).text();
								if(selectedAnswer.indexOf('"')>-1){
									selectedAnswer=selectedAnswer.replace(/\"/g,'&quot;');
								}
							}
							selectedOptId = $(answerId).val();
							selectedOptionsAndAnswersList(mockVar.currentGrp,iOAP.curSection,i,selectedOptId,"id");
						}else if(additionalType === "SEQUENCE"){
							if($("#answers"+section.questions[i].quesId).is(':visible')){
								var listItems = $("#sortable li");
								listItems.each(function(idx, li) {
									selectedAnswer = answerTxtForAdditionalQues(selectedAnswer,$(li),additionalType);
									selectedOptId = $(li).children().attr('value');
									groupAnswers.push(new groupAnswerBean(section.questions[i].quesId,selectedAnswer,selectedOptId));
									mockVar.curSectionQuestions[i].quesParam.langID = mockVar.curSectionQuestions[i].quesLangBeans[mockVar.langIndex].langId;
									selectedOptionsAndAnswersList(mockVar.currentGrp,iOAP.curSection,i,selectedOptId);
									i++;
								});
								continue;
							}
						}else if(additionalType === "MTC" && columnType === "dropdown"){
							answerId = "#answers"+section.questions[i].quesId+" option:selected";
							if($(answerId).val()!=="select"){
								selectedAnswer = $(answerId).text();
							}
							selectedOptId = $(answerId).val();
							selectedOptionsAndAnswersList(mockVar.currentGrp,iOAP.curSection,i,selectedOptId,"id");
						}else if(additionalType === "MTC" && columnType === "drag"){
							if($("#answers"+section.questions[i].quesId).is(':visible')){
								var MTCId = ".MTC"+mockVar.curQuesBean.comprehensionId;
								var MTClength = $(MTCId).length;
								var x=0;
								var listItems = $("#sortable li");
								listItems.each(function(idx, li) {
									if(x<MTClength){
										selectedAnswer = answerTxtForAdditionalQues(selectedAnswer,$(li),additionalType);
										selectedOptId = $(li).children().attr('value');
										if(section.questions[i].quesId!=undefined)
											groupAnswers.push(new groupAnswerBean(section.questions[i].quesId,selectedAnswer,selectedOptId));
										mockVar.curSectionQuestions[i].quesParam.langID = mockVar.curSectionQuestions[i].quesLangBeans[mockVar.langIndex].langId;
										selectedOptionsAndAnswersList(mockVar.currentGrp,iOAP.curSection,i,selectedOptId,"id");
										i++;
										x++;
									}	
								});
								continue;
							}
						}else if(additionalType === "GROUP"){
							answerId = "#answers"+section.questions[i].quesId+" li";
							var listItems = $(answerId);
							listItems.each(function(idx, li) {
								selectedAnswer = answerTxtForAdditionalQues(selectedAnswer,$(li),additionalType);
								selectedOptId = $(li).children().attr('value') + "," + selectedOptId;
							});
							if(selectedAnswer !=""){
								selectedAnswer = selectedAnswer.substring(0,selectedAnswer.length-9);
							}
							if(selectedOptId!=''){
								selectedOptId = selectedOptId.substring(0,selectedOptId.length-1);
							}
							selectedOptionsAndAnswersList(mockVar.currentGrp,iOAP.curSection,i,selectedOptId,"id");
						}
					}else{
						var answers = document.getElementsByName('answers'+section.questions[i].quesId);
						for(var j=0;j<answers.length;j++){
							if(answers[j].checked==true){   
								selectedAnswer = answerTxt(j,answers,selectedAnswer);
								//selectedAnswer = ($(answers[j]).parent().next('span').text()) + "<ANS_SEP>" + selectedAnswer;
								selectedOptId = (answers[j].value) + "," + selectedOptId;
							}
						}
						if(selectedAnswer !=""){
							selectedAnswer = selectedAnswer.substring(0,selectedAnswer.length-9);
						}
						if(selectedOptId!=''){
							selectedOptId = selectedOptId.substring(0,selectedOptId.length-1);
						}
						selectedOptionsAndAnswersList(mockVar.currentGrp,iOAP.curSection,i,selectedOptId,"id");
						//mockVar.curSectionQuestions[i].quesParam.answer = selectedAnswer;
						//mockVar.curSectionQuestions[i].quesParam.selectedOptId = selectedOptId;
					}
					groupAnswers.push(new groupAnswerBean(section.questions[i].quesId,selectedAnswer,selectedOptId));
					mockVar.curSectionQuestions[i].quesParam.langID = mockVar.curSectionQuestions[i].quesLangBeans[mockVar.langIndex].langId;
				}
			}	
		}
	}
	/*if(section.maxOptQuesToAns != ""){
	if(hasOptionalQuestion=='true' && counter > section.maxOptQuesToAns){
	proceed = false;
	alert("No of questions answered are more than maximum questions to be answered");
	}
}*/
	if(proceed){		
		if(action!='SUBMIT') {
			if(action!='RESET' && action!="PREVIOUS"){
				var url = document.URL;
				var orgId;
				var assessmentId;
				var attemptId;
				var candMasterId;
				if(url.indexOf("quiz.html")>=0){
					if(url.indexOf("quiz.html?") >=0){
						var params = url.split(".html?");
						var paramsData = $.trim(params[1]).split("@@");
						orgId= paramsData[0];
						assessmentId = paramsData[1];
						attemptId = paramsData[2];
						candMasterId = paramsData[3];
					} else {
						orgId = $.cookie("orgId");
						assessmentId = $.cookie("assessmentId");
						attemptId = $.cookie("attemptId");
						candMasterId = $.cookie("cand_master_id");
					}
					if(assessmentId.indexOf("M") == -1){
						var xmlURL = "/ASM/MockAssessmentAction.do?action=saveFileUpload&orgId="+orgId+"&mockId="+assessmentId+"&candMasterId="+candMasterId+"&attemptNo="+attemptId;
						$.ajax({
							url:xmlURL,
							type: 'POST',
							data: formData,
							async: false,
							success: function (data) {
								if(data!=null && data!="success" && data!="Some error occured while uploading file.Please upload again"){
									var str = '';
									str += "<div id='fileUploadStatus'>";
									fileUploadStatus = $.parseJSON(data);
									for(var k=0;k<fileUploadStatus.length;k++){
										proceed = false;
										//var quesId = fileUploadStatus[k].quesID;
										var fileName = fileUploadStatus[k].fileName;
										var maxLimitSize = fileUploadStatus[k].maxSizeLimit;
										var mimeType = fileUploadStatus[k].mimeType;
										//var quesText = "";
										//var index = 0;
										/*for(var l=0;l<section.questions.length;l++){
											if(section.questions[l].quesId == quesId){
												for(var m=0;m<section.questions[l].quesLangBeans.length;m++){
													if(section.questions[l].quesLangBeans[m].langId == mockVar.curSectionQuestions[l].quesParam.langID){
														index = m;
														break;
													}
												}
												quesText = section.questions[l].quesLangBeans[index].quesText;
											}
									}*/
										str += "<div>Uploaded File : "+fileName+"</div><div> Max Limit Error : "+maxLimitSize+"</div><div>File Type Error : "+mimeType+"</div><br>";
									}
									str += "</div>";
									//$('#minimg').css("margin-left","95%");	
									cnfPop('fileUploadPopup');
									$("#infoMsg3").html(str);
								}else if(data == "Some error occured while uploading file.Please upload again"){
									cnfPop('InfoPopup');
									$("#infoMsg2").html($(globalXmlvar).find('fileUploadError').text());
									proceed = false;
								}
							},
							cache: false,
							contentType: false,
							processData: false
						});
					}
				}
			}
			if(proceed){
				for(var m=0;m<section.questions.length;m++){
					for(var n=0;n<groupAnswers.length;n++){
						if(groupAnswers[n].quesId == section.questions[m].quesId){
							mockVar.curSectionQuestions[m].quesParam.answer = groupAnswers[n].answer;
							if(section.questions[m].quesType == "MCQ" || section.questions[m].quesType == "MSQ"){
								mockVar.curSectionQuestions[m].quesParam.selectedOptId = groupAnswers[n].optionId;
							}
						}
					}
				}
				if(section.maxOptQuesToAns != ""){
					//if(mockVar.isMarkedForReviewConsidered == "YES"){
					var counter = 0;
					for(var i=0;i<iOAP.secDetails[iOAP.curSection].questions.length;i++){
						//var quesStatus = iOAP.secDetails[iOAP.curSection].questions[i].quesParam.status ;
						if(iOAP.secDetails[iOAP.curSection].questions[i].quesType!= "PROGRAMMING TEST"){
							if( !(iOAP.secDetails[iOAP.curSection].questions[i].quesParam.answer == null 
									||  iOAP.secDetails[iOAP.curSection].questions[i].quesParam.answer == '' )){
								counter++;
							}
						}
					}
					quesToBeConsidered += counter;
//					}
					if(hasOptionalQuestion=='true' && quesToBeConsidered>section.maxOptQuesToAns ){
						proceed = false;
						cnfPop('InfoPopup');
						//$("#infoMsg2").html("You have attempted "+quesToBeConsidered+" question, which is more than the  maximum limit ("+section.maxOptQuesToAns+") of this section.  Please reset the questions which are already answered");
						$("#infoMsg2").html($(globalXmlvar).find('maxQuestionsAlert').text());
						$(".quesToBeConsidered").html(quesToBeConsidered);
						$(".maxOptQuesToAns").html(section.maxOptQuesToAns);
					}
				}
				if(mockVar.storeCandResponse == 1)
					saveBackUp(false);
				if(proceed)
					saveGroup(selectedAnswer, action,mockVar.curQuesBean.quesType);
			}
		}
		else{
			for(var m=0;m<section.questions.length;m++){
				for(var n=0;n<groupAnswers.length;n++){
					if(groupAnswers[n].quesId == section.questions[m].quesId){
						mockVar.curSectionQuestions[m].quesParam.answer = groupAnswers[n].answer;
						if(section.questions[m].quesType == "MCQ" || section.questions[m].quesType == "MSQ"){
							mockVar.curSectionQuestions[m].quesParam.selectedOptId = groupAnswers[n].optionId;
						}
					}
				}
			}
			if(section.maxOptQuesToAns != ""){
				//if(mockVar.isMarkedForReviewConsidered == "YES"){
				var counter = 0;
				for(var i=0;i<iOAP.secDetails[iOAP.curSection].questions.length;i++){
					//var quesStatus = iOAP.secDetails[iOAP.curSection].questions[i].quesParam.status ;
					if(iOAP.secDetails[iOAP.curSection].questions[i].quesType!= "PROGRAMMING TEST"){
						if( !(iOAP.secDetails[iOAP.curSection].questions[i].quesParam.answer == null ||  iOAP.secDetails[iOAP.curSection].questions[i].quesParam.answer == '' )){
							counter++;
						}
					}
				}
				quesToBeConsidered += counter;
//				}
				if(hasOptionalQuestion=='true' && quesToBeConsidered>section.maxOptQuesToAns ){
					proceed = false;
					cnfPop('InfoPopup');
					//$("#infoMsg2").html("You have attempted "+quesToBeConsidered+" question, which is more than the  maximum limit ("+section.maxOptQuesToAns+") of this section.  Please reset the questions which are already answered");
					$("#infoMsg2").html($(globalXmlvar).find('maxQuestionsAlert').text());
					$(".quesToBeConsidered").html(quesToBeConsidered);
					$(".maxOptQuesToAns").html(section.maxOptQuesToAns);
				}
			}
			if(proceed)
				submitMock("");
		}
	}
}
function fnSubmit(action){
	//var ques=iOAP.sections[iOAP.curSection][iOAP.viewLang[iOAP.curSection][iOAP.curQues].langID][iOAP.curQues];
	$('.courseInfoPop').css({ display: 'none' }); 
	if(action == "MARK" || action == "NEXT"){
		if(jQuery(".subject-selection").find(".subject-name:visible:last").hasClass('selectedsubject') && jQuery(".subject-arrow-right").is(":visible")){
			navSection=true;
			jQuery(".subject-arrow-right").attr("class","subject-arrow-right-disabled");
			jQuery(".subject-arrow-left-disabled").attr("class","subject-arrow-left");
		}
		else if(jQuery(".subject-selection").find(".subject-name:visible:last").hasClass('selectedsubject') && jQuery(".subject-arrow-left").is(":visible")){
			navSection=false;
			jQuery(".subject-arrow-left").attr("class","subject-arrow-left-disabled");
		}
	}
	saveJwplayerParam();
	getCurrentGrpSecQuestId(false,0);
	var selectedAnswer="",wrongCharCount=0;
	//var wordCountForSA = "";
	var proceed = true;
	var section = iOAP.secDetails[iOAP.curSection];
	var hasOptionalQuestion = section.hasOptionalQuestion;
	var quesToBeConsidered = parseInt(section.answered);
	var selectedOptId = '';
	var count=0;
	//var myFile = new Array();
	var fileTypeList = '';
	//var myFileQuesId = new Array();
	var formData =  mockVar.storeCandResponse == 1 ? new FormData():$('');
	//var myFileType = new Array();
	//var myFileSize = new Array();
	//var myFileList = new Array();
	if(action != "SKIP"){
		if(mockVar.curQuesBean.quesType =="SA" || mockVar.curQuesBean.quesType =="COMPREHENSION@@SA" || mockVar.curQuesBean.quesType =="LA@@SA"){
			if(mockVar.curQuesBean.keyboardType == "FileUpload"){
				var fileInput = document.getElementById("uploadBtn"+mockVar.curQuesBean.quesId);
				if(action != "RESET" && action !="PREVIOUS"){
					if(fileInput.type == "file"){
						var fileName = 	fileInput.value;
						if(fileName.length>0){
							for(var j=0;j<mockVar.curQuesBean.allowedExtensions.split(",").length;j++){
								allowedExtension = mockVar.curQuesBean.allowedExtensions.split(",")[j];
								if(fileName.substr(fileName.length - allowedExtension.length ,allowedExtension.length).toLowerCase() != allowedExtension.toLowerCase()){
									proceed = false;
								}else{
									proceed = true;
									break;
								}
							}
							for(var k=0;k<mockVar.curQuesBean.allowedExtensions.split(",").length;k++){
								allowedExtension = mockVar.curQuesBean.allowedExtensions.split(",")[k];
								fileTypeList = fileTypeList+allowedExtension+"_";
							}
							fileTypeList = fileTypeList.slice(0, -1);
							var size= (fileInput.files[0].size/1048576).toFixed(2);
							if(size > mockVar.curQuesBean.allowedSize){
								cnfPop('InfoPopup');
								$("#infoMsg2").html($(globalXmlvar).find('fileUploadSizeError').text());
								$(".fileSize").html(mockVar.curQuesBean.allowedSize);
								proceed = false;
							}
							if(proceed == false && size <= mockVar.curQuesBean.allowedSize){
								cnfPop('InfoPopup');
								$("#infoMsg2").html($(globalXmlvar).find('fileUploadTypeError').text());
								$(".fileType").html(mockVar.curQuesBean.allowedExtensions);
							}	
						}
					}
					if (fileInput.files.length != 0) {
						formData.append("myFile["+count+"]", document.getElementById("uploadBtn"+mockVar.curQuesBean.quesId).files[0]);
						formData.append("myFileQuesId["+count+"]",mockVar.curQuesBean.quesId);
						formData.append("myFileType["+count+"]",fileTypeList.toLowerCase());
						formData.append("myFileSize["+count+"]",mockVar.curQuesBean.allowedSize);
						formData.append("myFileList["+count+"]",mockVar.curQuesBean.allowedType);
						//mockVar.curQuesBean.quesParam.answer = selectedAnswer;
						count++;
					}
					selectedAnswer = document.getElementById("uploadFile"+mockVar.curQuesBean.quesId).value;
				}
			}else if(mockVar.curQuesBean.keyboardType == "AudioFile"){
				if(recordingInProgress && action!="RESET" && action!="PREVIOUS"){
					cnfPop('saveAndNextRecordingPopup');
					$('#saveAndNextRecordingPopupMsg').html($(globalXmlvar).find('saveAndNextRecordingPopupMsg').text());
					$('.info').html($(globalXmlvar).find('info').text());
					$('.popClose').html($(globalXmlvar).find('close').text());
					$('.Yes').html($(globalXmlvar).find('Yes').text());
					$('.No').html($(globalXmlvar).find('No').text());
				return;
				}
				else{
					if(mockVar.curQuesBean.quesParam.answer=='recordingSaved')
						selectedAnswer = 'audioRecorded';
					else if(mockVar.curQuesBean.quesParam.answer=='recordingStarted'|| mockVar.curQuesBean.quesParam.answer=='recordingStopped')
						selectedAnswer = '';
					else if(mockVar.curQuesBean.quesParam.answer=='audioRecorded')
						selectedAnswer = 'audioRecorded';
				}
					
			}
			else if(mockVar.curQuesBean.keyboardType == "VideoFile"){
				if(recordingInProgress && action!="RESET" && action!="PREVIOUS"){
					cnfPop('saveAndNextRecordingPopup');
					$('#saveAndNextRecordingPopupMsg').html($(globalXmlvar).find('saveAndNextRecordingPopupMsg').text());
					$('.info').html($(globalXmlvar).find('info').text());
					$('.popClose').html($(globalXmlvar).find('close').text());
					$('.Yes').html($(globalXmlvar).find('Yes').text());
					$('.No').html($(globalXmlvar).find('No').text());
				return;
				}
			else{
				if(mockVar.curQuesBean.quesParam.answer=='recordingSaved')
						selectedAnswer = 'videoRecorded';
					else if(mockVar.curQuesBean.quesParam.answer=='recordingStarted'|| mockVar.curQuesBean.quesParam.answer=='recordingStopped')
						selectedAnswer = '';
					else if(mockVar.curQuesBean.quesParam.answer=='videoRecorded')
						selectedAnswer = 'videoRecorded';
				}
					
			}
			else{
				if(action !="PREVIOUS"){
					selectedAnswer = document.getElementById('answer').value;
					if(selectedAnswer.indexOf('"')>-1){
						selectedAnswer=selectedAnswer.replace(/\"/g,'&quot;');
					}
					//wordCountForSA = $("#noOfWords").text();
					/*if(mockVar.groups[mockVar.currentGrp].secDetails[iOAP.curSection].questions[iOAP.curQues].selectedAnswerList != 'undefined')
							mockVar.groups[mockVar.currentGrp].secDetails[iOAP.curSection].questions[iOAP.curQues].selectedAnswerList = mockVar.groups[mockVar.currentGrp].secDetails[iOAP.curSection].questions[iOAP.curQues].selectedAnswerList +"@"+selectedAnswer;*/
					selectedOptionsAndAnswersList(mockVar.currentGrp,iOAP.curSection,iOAP.curQues,selectedAnswer,"");
				}
			}
		}else if(mockVar.curQuesBean.quesType =="TYPING TEST"){
			selectedAnswer = $('.typedAnswer').val();
			wrongCharCount = (mockVar.curQuesBean.typingType.toLowerCase()=='restricted')?0:getWrongCharCount();
			//wrongCharCount = (mockVar.curQuesBean.typingType.toLowerCase()=='restricted')?0:mockVar.curQuesBean.typingEvalMode.toLowerCase()=="standard"?getCorrectCharCountforStandard():getWrongCharCount();
			mockVar.typingGroup[mockVar.currentGrp].wrongCharCount = wrongCharCount;
			mockVar.typingGroup[mockVar.currentGrp].typedWordCount = selectedAnswer.trim().split(" ").length;
		}else if(mockVar.curQuesBean.quesType =="PROGRAMMING TEST"){
			selectedAnswer2 = editor.getValue();
			selectedAnswer1 = document.getElementById('textareaforflip').value;
			if(selectedAnswer2.length>selectedAnswer1.length){
				if(selectedAnswer != mockVar.curQuesBean.programmingSkeletalCode ){
					mockVar.curQuesBean.programingStatus = 'saveProgram';
					selectedAnswer = editor.getValue();
				}
			}
			else{
				if(selectedAnswer1 != mockVar.curQuesBean.programmingSkeletalCode ){
					mockVar.curQuesBean.programingStatus = 'saveProgram';
					editor.setValue(selectedAnswer1);
					selectedAnswer=selectedAnswer1;
				}
			}}else if(mockVar.curQuesBean.quesType != "SUBJECTIVE"){
				var answers = document.getElementsByName('answers');
				//var tempQuestionId = 0;
				//var previousOptionId = 0;
				for(var i=0;i<answers.length;i++){
					if(answers[i].checked==true){   
						selectedAnswer = answerTxt(i,answers,selectedAnswer);
						//selectedAnswer = ($(answers[i]).parent().next('span').text()) + "<ANS_SEP>" + selectedAnswer;
						selectedOptId = (answers[i].value) + "," + selectedOptId;
					}
				}
				if(selectedAnswer !=""){
					selectedAnswer = selectedAnswer.substring(0,selectedAnswer.length-9);
				}
				selectedOptionsAndAnswersList(mockVar.currentGrp,iOAP.curSection,iOAP.curQues,selectedAnswer,"");
				if(selectedOptId!=''){
					selectedOptId = selectedOptId.substring(0,selectedOptId.length-1);
				}
				selectedOptionsAndAnswersList(mockVar.currentGrp,iOAP.curSection,iOAP.curQues,selectedOptId,"id");
			}
	}
	if(section.maxOptQuesToAns != ""){
		if(mockVar.isMarkedForReviewConsidered == "YES"){
			var counter = 0;
			for(i=0;i<iOAP.secDetails[iOAP.curSection].length;i++){
				var quesStatus = iOAP.secDetails[iOAP.curSection].questions[i].status ;
				if(quesStatus=="marked" && !(iOAP.secDetails[iOAP.curSection].questions[i].quesParam.answer == null ||  iOAP.secDetails[iOAP.curSection].questions[i].quesParam.answer == '')){
					counter++;
				}
			}
			quesToBeConsidered += counter;
		}
		var curQuesStatus = mockVar.curQuesBean.quesParam.status;
		if(!(action=="SKIP" || action=="RESET" || action=="SUBMIT") && !(curQuesStatus=="answered" || (curQuesStatus == "marked" && mockVar.curQuesBean.quesParam.answer!=""))){
			if(hasOptionalQuestion=='true' && quesToBeConsidered==section.maxOptQuesToAns && selectedAnswer!="" ){
				if(mockVar.curQuesBean.quesType != "PROGRAMMING TEST")
					proceed = false;
				else{
					if(mockVar.curQuesBean.quesParam.status == "answered")
						proceed = false;
				}
			}
		}
	}
	if(proceed){
		if(action!='PREVIOUS'){
			mockVar.curQuesBean.quesParam.answer = selectedAnswer;
			mockVar.curQuesBean.quesParam.selectedOptId = selectedOptId;
			mockVar.curQuesBean.quesParam.langID = mockVar.curQuesBean.quesLangBeans[mockVar.langIndex].langId;
			if(mockVar.curQuesBean.quesType =="SA" || mockVar.curQuesBean.quesType =="COMPREHENSION@@SA" || mockVar.curQuesBean.quesType =="LA@@SA")
				//mockVar.curQuesBean.typedWord =  $('#noOfWords'+mockVar.curQuesBean.quesId).html()==undefined?$('#noOfWords'+mockVar.curQuesBean.quesId).text():$('#noOfWords'+mockVar.curQuesBean.quesId).html().split(' ')[0];
				mockVar.curQuesBean.typedWord = $('#noOfWords'+mockVar.curQuesBean.quesId).html()==undefined?($('#noOfWords').html()!=undefined ? $('#noOfWords').html().split(' ')[0]:'0'):$('#noOfWords'+mockVar.curQuesBean.quesId).html().split(' ')[0];
		}
		if(action!='SUBMIT') {
			if(action!='RESET' && action!='PREVIOUS'){
				if(mockVar.curQuesBean.quesType =="SA" || mockVar.curQuesBean.quesType =="COMPREHENSION@@SA" || mockVar.curQuesBean.quesType =="LA@@SA"){
					if(mockVar.curQuesBean.keyboardType == "FileUpload"){
						var url = document.URL;
						var orgId;
						var assessmentId;
						if(url.indexOf("quiz.html")>=0){
							if(url.indexOf("quiz.html?") >=0){
								var params = url.split(".html?");
								var paramsData = $.trim(params[1]).split("@@");
								orgId= paramsData[0];
								assessmentId = paramsData[1];
								attemptId = paramsData[2];
								candMasterId = paramsData[3];
							} else {
								orgId = $.cookie("orgId");
								assessmentId = $.cookie("assessmentId");
								attemptId = $.cookie("attemptId");
								candMasterId = $.cookie("cand_master_id");
							}
							if(assessmentId.indexOf("M") == -1){
								var xmlURL = "/ASM/MockAssessmentAction.do?action=saveFileUpload&orgId="+orgId+"&mockId="+assessmentId+"&candMasterId="+candMasterId+"&attemptNo="+attemptId;
								$.ajax({
									url:xmlURL,
									type: 'POST',
									data: formData,
									async: false,
									success: function (data) {
										if(data!=null && data!="success" && data!="Some error occured while uploading file.Please upload again"){
											var str = '';
											str += "<div>";
											fileUploadStatus = $.parseJSON(data);
											proceed = false;
											//var quesId = fileUploadStatus[0].quesID;
											var maxLimitSize = fileUploadStatus[0].maxSizeLimit;
											var mimeType = fileUploadStatus[0].mimeType;
											if(mimeType!="" || mimeType != undefined ){
												str +="File Type Error : "+ mimeType;
											}else if(maxLimitSize!="" || maxLimitSize != undefined ){
												str +="Maximum Size Limit Error : "+ maxLimitSize;
											}
											str += "</div>";
											cnfPop('InfoPopup');
											$("#infoMsg2").html(str);
										}else if(data == "Some error occured while uploading file.Please upload again"){
											cnfPop('InfoPopup');
											$("#infoMsg2").html($(globalXmlvar).find('fileUploadError').text());
											proceed = false;
										}
									},
									cache: false,
									contentType: false,
									processData: false
								});
							}
						}
					}
				}
			}
			if(proceed){
				if(mockVar.storeCandResponse == 1 && mockVar.curQuesBean.keyboardType == "FileUpload")
					saveBackUp(false);
				save(selectedAnswer, action,mockVar.curQuesBean.quesType);
			}
		}
		else {
			submitMock("");
		}
	}
}

function fillMaxOptQuesCrossed(quesToBeConsidered,totalQuestions){
	var str= "",alertMsg = "";
	if(mockVar.isMarkedForReviewConsidered == "YES"){
		alertMsg = mockLabels.maxQuesCrossedWithMarkReview;
	}else{
		alertMsg = mockLabels.maxQuesCrossedWithoutMarkReview;
	}
	str = '<div id="warningMsgDiv" style="background-color:#F5F6CE; border:1px solid #FE9A2E; padding: 1%; margin: 1%; font-size: 12px">';
	str += '<table><tr><td style="vertical-align:middle"><img src="images/warning-icon.png" /></td>';
	str += '<td style="text-align: justify;"><div style="margin-left:10px"><b>Note : </b>';
	str += alertMsg.replace('@@quesToBeConsidered@@',quesToBeConsidered).replace('@@totalQuestions@@',totalQuestions);
	str += '</div></td></tr></table></div>';
	$('#warningMsgDiv').remove();
	if( mockVar.curQuesBean.comprehensionId != 0 ||mockVar.curQuesBean.laqId != 0){
		$("#warning").prepend(str);
	}
	else
		$("#quesAnsContent").prepend(str);
	$('.answer').attr('disabled','disabled');
	$('.vKeyboard').remove();
	$('.upload').attr('disabled','disabled');
}
function fillMaxOptQuesCrossedGroup(quesToBeConsidered,totalQuestions){
	var str= "",alertMsg = "";
	if(mockVar.isMarkedForReviewConsidered == "YES"){
		alertMsg = mockLabels.maxQuesCrossedWithMarkReview;
	}else{
		alertMsg = mockLabels.maxQuesCrossedWithoutMarkReview;
	}
	str = '<div id="warningMsgDiv" style="background-color:#F5F6CE; border:1px solid #FE9A2E; padding: 1%; margin: 1%; font-size: 12px">';
	str += '<table><tr><td style="vertical-align:middle"><img src="images/warning-icon.png" /></td>';
	str += '<td style="text-align: justify;"><div style="margin-left:10px"><b>Note : </b>';
	str += alertMsg.replace('@@quesToBeConsidered@@',quesToBeConsidered).replace('@@totalQuestions@@',totalQuestions);
	str += '</div></td></tr></table></div>';
	$('#warningMsgDiv').remove();
	/*if( mockVar.curQuesBean.comprehensionId != 0 ||mockVar.curQuesBean.laqId != 0){
		$("#warning").prepend(str);
	}
	else
	$("#quesAnsContent").prepend(str);*/
	$("#groupWarning").append(str);
	$("#groupWarning").show();
	$('.answer').attr('disabled','disabled');
	$('.upload').attr('disabled','disabled');
	$('.vKeyboard').remove();
}

function save(ansID, action,quesType){
	var quesStatus = mockVar.curQuesBean.quesParam.status;
	var quesAnswer = mockVar.curQuesBean.quesParam.answer;
	//var isMarked=mockVar.curQuesBean.quesParam.isMarked;
	if(typeof(mockVar.curQuesBean.quesParam.RecordNumber) != "undefined"){
		mockVar.curQuesBean.quesParam.RecordNumber = mockVar.curQuesBean.quesParam.RecordNumber + 1;
	}
	if(ansID == "" && quesType != "SUBJECTIVE")
		ansID = null;
	if(action=="MARK"){
		if(quesStatus=="answered"){
			iOAP.secDetails[iOAP.curSection].answered--;					
		}else if(quesStatus=="notanswered"){
			iOAP.secDetails[iOAP.curSection].notanswered--;
		}
		/*if(quesStatus!="marked" && quesStatus!="markedAndAnswered"){
			if(quesAnswer == null || quesAnswer == ''){
				iOAP.secDetails[iOAP.curSection].marked++;
				mockVar.curQuesBean.quesParam.status="marked";
				mockVar.curQuesBean.quesParam.isMarked=1;
			}
			else{
				iOAP.secDetails[iOAP.curSection].markedAndAnswered++;
				mockVar.curQuesBean.quesParam.status="markedAndAnswered";
			}
		}
		if(quesStatus=="marked" && (!(quesAnswer == null || quesAnswer == ''))){
			mockVar.curQuesBean.quesParam.status="markedAndAnswered";
			mockVar.curQuesBean.quesParam.isMarked=1;
		}
		if(mockVar.curQuesBean.quesParam.status=="markedAndAnswered" && mockVar.curQuesBean.quesParam.isMarked==1){
			iOAP.secDetails[iOAP.curSection].marked--;
			iOAP.secDetails[iOAP.curSection].markedAndAnswered++;
		}
		mockVar.curQuesBean.quesParam.isMarked=0;*/
		else if(quesStatus=="marked"){
			iOAP.secDetails[iOAP.curSection].marked--;
			}
		else if(quesStatus=="markedAndAnswered"){
			iOAP.secDetails[iOAP.curSection].markedAndAnswered--;
			}
		if(quesAnswer != null && quesAnswer != ''){
			iOAP.secDetails[iOAP.curSection].markedAndAnswered++;
			mockVar.curQuesBean.quesParam.status="markedAndAnswered";
		}else{
			iOAP.secDetails[iOAP.curSection].marked++;
			mockVar.curQuesBean.quesParam.status="marked";
		}
	}else if(action=="RESET"){
		if(quesStatus=="marked"){
			iOAP.secDetails[iOAP.curSection].marked--;
			iOAP.secDetails[iOAP.curSection].notanswered++;
		}
		else if(quesStatus=="markedAndAnswered"){
			iOAP.secDetails[iOAP.curSection].markedAndAnswered--;
			iOAP.secDetails[iOAP.curSection].notanswered++;
		}
		else if(quesStatus=="answered"){
			iOAP.secDetails[iOAP.curSection].answered--;
			iOAP.secDetails[iOAP.curSection].notanswered++;
		}
		mockVar.curQuesBean.quesParam.status="notanswered";
	}else if((action=="NEXT" && quesType != "PROGRAMMING TEST") || action == "saveSA" || action == "submitPrograming"){
		if(ansID==null){
			if(quesStatus=="answered"){
				iOAP.secDetails[iOAP.curSection].notanswered++;
				iOAP.secDetails[iOAP.curSection].answered--;
			}else if(quesStatus=="marked"){
				iOAP.secDetails[iOAP.curSection].notanswered++;
				iOAP.secDetails[iOAP.curSection].marked--;
			}else if(quesStatus=="markedAndAnswered"){
				iOAP.secDetails[iOAP.curSection].notanswered++;
				iOAP.secDetails[iOAP.curSection].markedAndAnswered--;
			}
			mockVar.curQuesBean.quesParam.status="notanswered";
		}else{
			if(quesStatus!="answered"){
				if(quesStatus=="marked"){
					iOAP.secDetails[iOAP.curSection].marked--;
				}
				if(quesStatus=="markedAndAnswered"){
					iOAP.secDetails[iOAP.curSection].markedAndAnswered--;
				}
				if(quesStatus=="notanswered")
					iOAP.secDetails[iOAP.curSection].notanswered--;
				iOAP.secDetails[iOAP.curSection].answered++;
			}
			mockVar.curQuesBean.quesParam.status="answered";
		}
	}
	if(action=="NEXT" || action=="MARK" || action=="SKIP"){
		var secQuesLength= iOAP.secDetails[iOAP.curSection].questions.length ;     	
		if(iOAP.curQues<secQuesLength-1){
			iOAP.curQues = iOAP.curQues + 1;
			iOAP.secDetails[iOAP.curSection].curQues = iOAP.curQues;
			getQuestion(mockVar.defaultLang);
			numPanelSec();
			fillNumberPanel();
		}
		else{
			if(iOAP.curSection==iOAP.secDetails.length-1){
				iOAP.curSection = 0;
			}else{
				iOAP.curSection++;
			}
			iOAP.curQues = 0;
			getQuestion(mockVar.defaultLang);
			numPanelSec();
			fillNumberPanel();
		}
	}else if(action=="PREVIOUS"){
		//var secQuesLength= iOAP.secDetails[iOAP.curSection].questions.length ;     	
		var compreLaqCount= 0;
		var compreLaqID = 0;
		iOAP.curQues = iOAP.curQues - 1;
		iOAP.secDetails[iOAP.curSection].curQues = iOAP.curQues;
		if(typeof(mockVar.compreLaqQues !="undefined" && mockVar.compreLaqQues.length>0)){
			if(typeof(mockVar.compreLaqQues[compreLaqID])!= "undefined"){
				//iOAP.curQues = iOAP.curQues - 1;
				for(var j=0;j<iOAP.secDetails[iOAP.curSection].questions.length;j++){
					if(iOAP.secDetails[iOAP.curSection].questions[iOAP.curQues].comprehensionId!=0){
						if(iOAP.secDetails[iOAP.curSection].questions[iOAP.curQues].comprehensionId == iOAP.secDetails[iOAP.curSection].questions[j].comprehensionId){
							compreLaqCount++;
						}
					}else if(iOAP.secDetails[iOAP.curSection].questions[iOAP.curQues].laqId!=0){
						if(iOAP.secDetails[iOAP.curSection].questions[iOAP.curQues].laqId == iOAP.secDetails[iOAP.curSection].questions[j].laqId){
							compreLaqCount++;
						}
					}
				}
				for(var k=0;k<mockVar.compreLaqQues.length;k++){
					if(iOAP.secDetails[iOAP.curSection].questions[iOAP.curQues].comprehensionId == mockVar.compreLaqQues[k].quesId){
						compreLaqID = k;
						break;
					}else if(iOAP.secDetails[iOAP.curSection].questions[iOAP.curQues].laqId == mockVar.compreLaqQues[k].quesId){
						compreLaqID = k;
						break;
					}
				}
			}
		}
		if(typeof(mockVar.compreLaqQues !="undefined") && mockVar.compreLaqQues.length>0){
			if( typeof(mockVar.compreLaqQues[compreLaqID].groupComprehensionLaqQuestions) != "undefined" && mockVar.compreLaqQues[compreLaqID].groupComprehensionLaqQuestions != "" && ((mockVar.compreLaqQues[compreLaqID].groupComprehensionLaqQuestions == "true") && (mockVar.compreLaqQues[compreLaqID].quesId == iOAP.secDetails[iOAP.curSection].questions[iOAP.curQues].laqId  || mockVar.compreLaqQues[compreLaqID].quesId == iOAP.secDetails[iOAP.curSection].questions[iOAP.curQues].comprehensionId)) ){
				iOAP.curQues = iOAP.curQues - compreLaqCount;
				iOAP.curQues = iOAP.curQues + 1;
				iOAP.secDetails[iOAP.curSection].curQues = iOAP.curQues;
				getQuestion(mockVar.defaultLang);
				numPanelSec();
				fillNumberPanel();
			}else{
				//if(iOAP.curQues>0){
				getQuestion(mockVar.defaultLang);
				numPanelSec();
				fillNumberPanel();
			}
		}else{
			getQuestion(mockVar.defaultLang);
			numPanelSec();
			fillNumberPanel();
		}
	}else{
		if(action!=='saveSA' && action!=='savePrograming'){
			getQuestion(mockVar.defaultLang);
			numPanelSec();
			fillNumberPanel();
		}
	}

}

function saveGroup(ansID, action,quesType){
	var compreLaqCount = 0;
	for(var i=0;i<mockVar.curSectionQuestions.length;i++){
		var quesStatus = mockVar.curSectionQuestions[i].quesParam.status;
		var quesAnswer = mockVar.curSectionQuestions[i].quesParam.answer;
		if(typeof(mockVar.curSectionQuestions[i].quesParam.RecordNumber) != "undefined"){
			mockVar.curSectionQuestions[i].quesParam.RecordNumber = mockVar.curSectionQuestions[i].quesParam.RecordNumber + 1;
		}
		if(quesAnswer == "" && mockVar.curSectionQuestions[i].quesType != "SUBJECTIVE")
			quesAnswer = null;
		if(action=="RESET"){
			if(quesStatus=="answered"){
				iOAP.secDetails[iOAP.curSection].answered--;
				iOAP.secDetails[iOAP.curSection].notanswered++;
			}
			mockVar.curSectionQuestions[i].quesParam.status="notanswered";
		}else if((action=="NEXT" && mockVar.curSectionQuestions[i].quesType != "PROGRAMMING TEST") || action == "saveSA" || action == "SAVE"){
			if(iOAP.secDetails[iOAP.curSection].groupAllQuestions == "true"){
				if(quesAnswer==null){
					if(quesStatus=="answered"){
						iOAP.secDetails[iOAP.curSection].notanswered++;
						iOAP.secDetails[iOAP.curSection].answered--;
					}
					mockVar.curSectionQuestions[i].quesParam.status="notanswered";
				}else{
					if(quesStatus!="answered"){
						if(quesStatus=="notanswered")
							iOAP.secDetails[iOAP.curSection].notanswered--;
						iOAP.secDetails[iOAP.curSection].answered++;
					}
					mockVar.curSectionQuestions[i].quesParam.status="answered";
				}
			}
		}
	}
	if(iOAP.secDetails[iOAP.curSection].groupAllQuestions == "false"){
		if(action=="NEXT" || action=="MARK" || action=="SKIP"){
			var secQuesLength= iOAP.secDetails[iOAP.curSection].questions.length ;
			for(var i=0;i<mockVar.curSectionQuestions.length;i++){
				var quesStatus = mockVar.curSectionQuestions[i].quesParam.status;
				var quesAnswer = mockVar.curSectionQuestions[i].quesParam.answer;
				if(quesAnswer == "" && mockVar.curSectionQuestions[i].quesId != "SUBJECTIVE")
					quesAnswer = null;
				if(mockVar.curQuesBean.comprehensionId !=0){
					if(mockVar.curQuesBean.comprehensionId == mockVar.curSectionQuestions[i].comprehensionId){
						compreLaqCount++;
						if(quesAnswer==null){
							if(quesStatus=="answered"){
								iOAP.secDetails[iOAP.curSection].notanswered++;
								iOAP.secDetails[iOAP.curSection].answered--;
							}
							mockVar.curSectionQuestions[i].quesParam.status="notanswered";
						}else{
							if(quesStatus!="answered"){
								if(quesStatus=="notanswered")
									iOAP.secDetails[iOAP.curSection].notanswered--;
								iOAP.secDetails[iOAP.curSection].answered++;
							}
							mockVar.curSectionQuestions[i].quesParam.status="answered";
						}
					}
				}else if(mockVar.curQuesBean.laqId !=0){
					if(mockVar.curQuesBean.laqId == mockVar.curSectionQuestions[i].laqId){
						compreLaqCount++;
						if(quesAnswer==null){
							if(quesStatus=="answered"){
								iOAP.secDetails[iOAP.curSection].notanswered++;
								iOAP.secDetails[iOAP.curSection].answered--;
							}
							mockVar.curSectionQuestions[i].quesParam.status="notanswered";
						}else{
							if(quesStatus!="answered"){
								if(quesStatus=="notanswered")
									iOAP.secDetails[iOAP.curSection].notanswered--;
								iOAP.secDetails[iOAP.curSection].answered++;
							}
							mockVar.curSectionQuestions[i].quesParam.status="answered";
						}
					}
				}
			}
			iOAP.curQues = iOAP.curQues + (compreLaqCount-1);
			if(iOAP.curQues<secQuesLength-1){
				iOAP.curQues = iOAP.curQues + 1;
				iOAP.secDetails[iOAP.curSection].curQues = iOAP.curQues;
			}
			else{
				if(iOAP.curSection==iOAP.secDetails.length-1){
					iOAP.curSection = 0;
				}else{
					iOAP.curSection++;
				}
				iOAP.curQues = 0;
			}
		}
		getQuestion(mockVar.defaultLang);
		numPanelSec();
		fillNumberPanel();
	}else{
		if(action=="NEXT" || action=="MARK" || action=="SKIP"){
			if(iOAP.curSection==iOAP.secDetails.length-1){
				iOAP.curSection = 0;
			}else{
				iOAP.curSection++;
			}
			iOAP.curQues = 0;
		}
		var LangId = mockVar.curQuesBean.quesParam.langID;
		getQuestion(LangId);
		//getQuestion(mockVar.defaultLang);
		numPanelSec();
		fillNumberPanel();
	}	
}


function timer(){
	if(iOAP.secWiseTimer==0){
		startCounter(mockVar.time);
	}
}

function startCounter(time){
	$("#showTime").html( "<b>"+mockLabels.timeLeft+"<span id='timeInMins'>"+convertTime(time)+"</span></b>");
	$("#timeResp").html( "<div class='timelabel'>"+mockLabels.timeLeft+"</div><div class='timebx' id='timeInMins'>"+convertTime(time)+"</div>");
	if(mockVar.groups[mockVar.currentGrp].maxTime>0){
		if(mockVar.groups[mockVar.currentGrp].maxTime - time >= mockVar.minSubmitTime && mockVar.currentGrp == mockVar.MaxGrpEnabled){
			$("#finalSubmit").removeAttr("disabled");
			$("#finalSubmitMbl").removeAttr("disabled");
			$("#finalSubmit").attr("title",$(globalXmlvar).find('Submit').text());
		}else{
			$("#finalSubmit").attr("disabled","true");
			$("#finalSubmitMbl").attr("disabled","true");
			if(mockVar.groups[mockVar.currentGrp].maxTime==mockVar.minSubmitTime)
			$("#finalSubmit").attr("title",$(globalXmlvar).find('NeverEnableGroupSubmit').text());
			else
			$("#finalSubmit").attr("title",$(globalXmlvar).find('SubmitEnabledAfter').text()+' '+convertTime(parseInt(mockVar.minSubmitTime - (mockVar.groups[mockVar.currentGrp].maxTime-time)))+' '+$(globalXmlvar).find('mmssSpan').text());
		}
	}else{
		if(mockVar.nonTimeBoundTime - time >= mockVar.minSubmitTime && mockVar.currentGrp == mockVar.MaxGrpEnabled){
			$("#finalSubmit").removeAttr("disabled");
			$("#finalSubmitMbl").removeAttr("disabled");
			$("#finalSubmit").attr("title",$(globalXmlvar).find('Submit').text());
		}else{
			$("#finalSubmit").attr("disabled","true");
			$("#finalSubmitMbl").attr("disabled","true");
			$("#finalSubmit").attr("title",$(globalXmlvar).find('SubmitEnabledAfter').text()+' '+convertTime(parseInt(mockVar.minSubmitTime - (mockVar.nonTimeBoundTime-time)))+' '+$(globalXmlvar).find('mmssSpan').text());
		}
	}
	mockVar.time = time-1;
	if(ringTheBell && ringTheBellTimeLeft>0){
		ringTheBellTimeLeft=ringTheBellTimeLeft-1;
	}
	if(time<=300){
		$('#timeInMins').css('color','red');
	}
	if(time>0){
		mockVar.timeCounter = setTimeout(function(){startCounter(time-1);},1000);
		mockVar.timeLeft = mockVar.time - mockVar.timeCounter;
		window.name = JSON.stringify(mockVar);
	}else{
	if(ringTheBell && ringTheBellTimeLeft<=0){
	timeOutSubmit();
	}else{
		mockVar.typingGroup[mockVar.currentGrp].ellapsedTime = mockVar.groups[mockVar.currentGrp].maxTime;	// required for typing group
		if(mockVar.currentGrp < mockVar.groups.length-1 ){
			checkGroupBreakTime();
			// changeGroup(mockVar.currentGrp);
		}else{
			// window.location.href="FeedBack.html";
			timeOutSubmit();
		}
		}
	}
}

function breakTimeCounter(time){
	mockVar.remainingBreakTime=time;
	if(ringTheBell && ringTheBellTimeLeft>0){
		ringTheBellTimeLeft=ringTheBellTimeLeft-1;
	}
	if(ringTheBell && ringTheBellTimeLeft<=0){
		timeOutSubmit();
	}else{
		$("#breakTimeCounter").html( "<b>"+mockLabels.breakTimeLeft+convertTime(time)+"</b>");
		if(time>0){
			mockVar.timeCounter = setTimeout(function(){breakTimeCounter(time-1);},1000);

		}else{
			submitGroup();
		}
	}
}
function instruTimeCounter(time){
	mockVar.remainingInstruTime=time;
	if(ringTheBell && ringTheBellTimeLeft>0){
		ringTheBellTimeLeft=ringTheBellTimeLeft-1;
	}
	if(ringTheBell && ringTheBellTimeLeft<=0){
		timeOutSubmit();
	}else{
		$(".instruTimeCounter").html( "<b><span id='grpInstruTimer'>"+mockLabels.grpInstruTimer+"</span> "+convertTime(time)+"</b>");
		if(time>0){
			mockVar.timeCounter = setTimeout(function(){instruTimeCounter(time-1);},1000);
			if(mockVar.groups[mockVar.currentGrp].minInstructionTime!=0){
				if(mockVar.groups[mockVar.currentGrp].instructionTime-time>=mockVar.groups[mockVar.currentGrp].minInstructionTime){
					$('#proceedToGrp').attr('disabled',false);
					$("#proceedToGrp").attr("title",$(globalXmlvar).find('ProceedtoNext').text());
				}else{
					$('#proceedToGrp').attr('disabled',true);
					$("#proceedToGrp").attr("title",$(globalXmlvar).find('enabledAfter').text()+convertTime(parseInt(mockVar.groups[mockVar.currentGrp].minInstructionTime - (mockVar.groups[mockVar.currentGrp].instructionTime-time)))+' '+$(globalXmlvar).find('mmssSpan').text());
				}
			}
		}else{
			if(mockVar.currentGrp==0)
				moveToExam();
			else
				moveToGroupFromGrpInst();
		}
	}
}

function timeOutSubmit(){
	var str = submitConfirmation('timeout');
	$("#pWait").hide();
	$("#col1").hide();
	$("#User_Hldr").hide();
	$("#sectionSummaryDiv").hide();
	$("#sub-header").hide();
	$('.Questn_Area').hide();
	$('.preGroupInstR').hide();
	$("#rightDivision").hide();
	$('#loadCalc').hide();
	$('.protactor-div,.ruler-div,.TB_modal').hide();
	$('.scratch-pad-container').hide();
	$('.textarea-div').hide();
	$('.courseInfoPop').hide();
	//$('#rightDivision').css({"background":"#fff","border-left":"1px #000 solid","height":"100%"});
	$('#group_summary').height($('#sectionSummaryDiv').height()-$('#confirmation_buttons').outerHeight(true)-$('.examSummaryHeader').outerHeight(true)-80);
	//$("#group_summary").css({"height":($(document).height()*.60)+"px"});
	//$('#rightDivision').html('<div style="top:25%;position:relative"><img src="images/NewCandidateImage.jpg"  /></div>');
	isfinalSubmit = true;
	if($('.canvasmenu').is(':visible')){
		$("#minwidth").removeClass("animatewidth");
		$(".hamburgerBar").removeClass("hambg");
		$(".canvasmenu").css({ "right": "-315px", "width": "0px" });

		$("#minwidth").animate({
			right: 0
		}, 400, function() {});

		$(".overlaymenu").css("display", "none");
		$('.mpop').hide();
		$('.overlay').hide();
	}
	$('.subheader_tab,.grup_components,.q_tab,.btntab,.hamburgerBar').hide();
	if(mockVar.storeCandResponse == 1){
		//alert("Time out submit");
		if(!isFinalSubmitStarted){
			submitMock($(globalXmlvar).find('TimeOut').text());
		}
	}else{
		if(!isFinalSubmitStarted){
			cnfPop('SubmitPopup');
			$("#submitMsg").html(mockLabels.timeOutSubmitMsg);
		}
		//submitMock("");
	}
}

function convertTime(time){
	return showMin(time)+":"+showSec(time);
}

function showMin(time){
	var min = 0;
//	time = time%3600;
	min = parseInt(time/60);
	return min;
}

function showSec(time){
	var sec="";
	if((time%60)>9)
		sec = time%60;
	else
		sec = "0"+time%60;
	return sec;	
}

function convertInterruptionTime(time){
	return showInterruptionSec(time);
}
function showInterruptionSec(time){
	var sec="";
	sec = time%60;
	return sec;	
}


/*
 * Time in hours function convertTime(time){ return
 * showHr(time)+":"+showMin(time)+":"+showSec(time); }
 * 
 * function showHr(time){ return "0"+parseInt(time/3600); }
 * 
 * function showMin(time){ var min = ""; time = time%3600; if((time/60)>9) min =
 * parseInt(time/60); else min = "0"+parseInt(time/60); return min; }
 * 
 * function showSec(time){ var sec=""; if((time%60)>9) sec = time%60; else sec =
 * "0"+time%60; return sec; }
 */
function imgMagnifyInc( img,percentage){
	var width = img.width;
	var height = img.height;
	height= height + height*percentage/100;
	width = width+ width*percentage/100;
	var zindex=1;
	if(percentage>0)
		zindex = 999;
	$(img).css({"height":height,"width":width,"z-index":zindex,"position":"relative"});	
}

function showQP(){
	var i,j,c;
	var str = "", additionalType="";
	var noOfQues = new Array();
	var quesCounter=0;
	var counter =0;
	var prevcompQuesId=0;
	var addQuesGroupCounter = false;
	for(i=0;i<iOAP.secDetails.length;i++){
		for(j=0;j<iOAP.secDetails[i].questions.length;j++){
			ques = iOAP.secDetails[i].questions[j];
			if(ques.comprehensionId>0 || ques.laqId>0){
				for(c=0;c<mockVar.compreLaqQues.length;c++){
					if(mockVar.compreLaqQues[c].quesId==ques.comprehensionId){
						if(prevcompQuesId==ques.comprehensionId){
							addQuesGroupCounter=true;
							counter++;
							noOfQues[quesCounter]=counter;
						}else{
							if(addQuesGroupCounter)
								quesCounter++;
							addQuesGroupCounter=false;
							prevcompQuesId=mockVar.compreLaqQues[c].quesId;
							counter =1;
							noOfQues[quesCounter]=counter;
						}
					}
					if(mockVar.compreLaqQues[c].quesId==ques.laqId){
						if(prevcompQuesId==ques.laqId){
							addQuesGroupCounter=true;
							counter++;
							noOfQues[quesCounter]=counter;
						}else{
							if(addQuesGroupCounter)
								quesCounter++;
							addQuesGroupCounter=false;	
							prevcompQuesId=mockVar.compreLaqQues[c].quesId;
							counter =1;
							noOfQues[quesCounter]=counter;
						}
					}
				}
				/*if(ques.quesType.indexOf("@@") !=-1 ){
				if(ques.isParent){
					if(!addQuesGroupCounter){
						addQuesGroupCounter = true;
					}else{
						noOfQues[quesCounter]= counter;
						quesCounter++;
					}
					counter=1;
				}else{
					counter++;
				}*/
			}else{
				if(counter>1){
					noOfQues[quesCounter]= counter;
					quesCounter++;
				}
				counter=1;
				addQuesGroupCounter=false;
			}
		}
	}
	quesCounter=0;
	if(mockVar.groups.length>1){
		str+=str +="<h2><font color='#2F72B7'> "+mockVar.groups[mockVar.currentGrp].groupName+"</font></h2>" ;
	}
	for(i=0;i<iOAP.secDetails.length;i++){
		prevcompQuesId=0;
		str +="<h2><font color='#2F72B7'>"+iOAP.secDetails[i].secName+"</font></h2>" ;
		for(j=0;j<iOAP.secDetails[i].questions.length;j++){
			ques = iOAP.secDetails[i].questions[j];
			if(ques.quesType.indexOf("@@") !=-1 ){
				str += "<p style='padding-left:5px'>";
				if(ques.isParent){
					if(ques.quesType.split("@@")[0] == "COMPREHENSION" ){
						str += "<b>"+mockVar.compQName ;
					}
					else if(ques.quesType.split("@@")[0] == "LA"){
						str += "<b>"+mockVar.laQName ;
					}
					str += "(Question Number "+j+" - "+(j+noOfQues[quesCounter]-1)+") :</b> <br/> "+ques.quesLangBeans[mockVar.langIndex].quesText.split("@@&&")[0] + "<br/>";
					quesCounter++;
				}
				str += "<table><tr><td style='vertical-align:top'>Q."+(j+1)+") </td><td>"+ ques.quesLangBeans[mockVar.langIndex].quesText.split("@@&&")[1]+"</td>";
			}else{
				if(ques.comprehensionId>0){
					if(prevcompQuesId!=ques.comprehensionId){
						for(c=0;c<mockVar.compreLaqQues.length;c++){
							if(mockVar.compreLaqQues[c].quesId==ques.comprehensionId){
								prevcompQuesId=ques.comprehensionId;
								str+="<i style='font-size:1em;'><b>";
								if(typeof(mockVar.compreLaqQues[c].additionalQuesType)!='undefined'&&mockVar.compreLaqQues[c].additionalQuesType!=''){
									additionalType=mockVar.compreLaqQues[c].additionalQuesType;
									if(additionalType=='SEQUENCE')
										str +=mockVar.fillSeqQName+"</i>";
									else if(additionalType=='GROUP')
										str +=mockVar.fillGrpQName+"</i>";
									else if(additionalType=='FITB')
										str +=mockVar.fillBlankQName+"</i>";
									else if(additionalType=='MTC')
										str +=mockVar.fillMatchColQName+"</i>";
								}else{
									additionalQuesType="";
									str +=mockVar.compQName+"</i>";
								}
								str += "(<span class='QuestionNumber'>"+mockLabels.QuestionNumber+"</span>&nbsp "+(j+1)+" &nbsp<span> - </span>&nbsp"+(j+noOfQues[quesCounter])+") :</b> <br> ";
								str+=mockVar.compreLaqQues[c].langData[mockVar.langIndex].quesText.replace(/<gaptype='(mcq|sa)' gapid='[0-9]*'>/g,'______');
								if(additionalType=='SEQUENCE'){
									str+='<br>';
									str += "<p style='padding-left:5px'><table>";
									for(var k=0;k<ques.options.length;k++){
										str += "<tr><td><span>";
										str += (k+1)+'</td>';
										//str +=+(k+1)+":";
										str +='<td>'+ques.options[k].optLangBean[mockVar.langIndex].optText.replace(/JPlayeropt/g, 'QPJPlayeropt').replace(/Containeropt/g, 'QPContaineropt');
										str += "</td></tr>";
									}
									str += "</table></p><hr style='color:#ccc'/>";
								}else if(additionalType=='FITB')
									str += "</b><hr style='color:#ccc'/>";

								quesCounter++;
							}
						}
					}
				}else{
					additionalQuesType="";
				}
				if(ques.laqId>0){
					if(prevcompQuesId!=ques.laqId){
						for(c=0;c<mockVar.compreLaqQues.length;c++){
							if(mockVar.compreLaqQues[c].quesId==ques.laqId){
								prevcompQuesId=ques.laqId;
								str+="<i style='font-size:1em;'><b>"+mockVar.laQName+"</i>";
								str += "(<span class='QuestionNumber'>"+mockLabels.QuestionNumber+"</span>&nbsp "+(j+1)+" - "+(j+noOfQues[quesCounter])+") :</b> <br> ";
								str+=mockVar.compreLaqQues[c].langData[mockVar.langIndex].quesText;
								quesCounter++;
							}
						}
					}
				}
				if(typeof(ques.quesLangBeans[mockVar.langIndex])!='undefined' && additionalType!='SEQUENCE' && additionalType!='FITB')
					str += "<p style='padding-left:5px'><table><tr><td style='vertical-align:top'>Q."+(j+1)+") </td><td>"+ ques.quesLangBeans[mockVar.langIndex].quesText.replace(/JPlayerques/g, 'QPJPlayerques').replace(/Containerques/g, 'QPContainerques')+"</td></tr>";
			}
			//str += "<tr><td width='50px'></td><td><i style='font-size:1em;'>";
			if(additionalType!='SEQUENCE' && additionalType!='FITB'){
				if(ques.quesType.indexOf("MCQ")>-1 ){
					str += "<tr><td width='50px'></td><td><i style='font-size:1em;'>";
					if(mockVar.mcQName.length>0){
						str += mockLabels.questionType+" <b> ";
						str += mockVar.mcQName;
						str += "</b>  ";
					}
					if(mockVar.showMarks && mockVar.mcQName.length>0){
						str += "; "+mockLabels.correctAnswerMarks+" <font color='green'><b> "+ ques.allottedMarks +"</b></font>";
						if(typeof(ques.displayNegMarks)!='undefined'&&ques.displayNegMarks!=null&&ques.displayNegMarks!="NA"&&ques.displayNegMarks!="")
							str += " ;  "+mockLabels.negativeMarks+" </span><font color='red'><b> "+ ques.displayNegMarks +"</b></font>";
						else
							str += " ;  "+mockLabels.negativeMarks+" </span><font color='red'><b> "+ ques.negMarks +"</b></font>";
						str += "</b>   ";
					}
					else if(mockVar.showMarks && !mockVar.mcQName.length>0){
						str += mockLabels.correctAnswerMarks+" <font color='green'><b> "+ ques.allottedMarks +"</b></font>";
						if(typeof(ques.displayNegMarks)!='undefined'&&ques.displayNegMarks!=null&&ques.displayNegMarks!="NA"&&ques.displayNegMarks!="")
							str += " ;  "+mockLabels.negativeMarks+" </span><font color='red'><b> "+ ques.displayNegMarks +"</b></font>";
						else
							str += " ;  "+mockLabels.negativeMarks+" </span><font color='red'><b> "+ ques.negMarks +"</b></font>";
						str += "</b>   ";
					}
					if(mockVar.showOptionInViewQP==1){
						for(var k=0;k<ques.options.length;k++){
							str += "<tr><td><span style='font-weight:bold'>";
							str += (k+1)+'</td>';
							//str +=+(k+1)+":";
							str +='<td>'+ques.options[k].optLangBean[mockVar.langIndex].optText.replace(/JPlayeropt/g, 'QPJPlayeropt').replace(/Containeropt/g, 'QPContaineropt');

							str += "</td></tr>";
						} 
					}
					str += "</i><td></tr>";
				}
				else if(ques.quesType.indexOf("MSQ")>-1){
					str += "<tr><td width='50px'></td><td><i style='font-size:1em;'>";
					if( mockVar.msQName.length > 0){
						str += mockLabels.questionType+"<b>";
						str += mockVar.msQName;
						str += "</b>  ";
					}
					if(mockVar.showMarks && mockVar.msQName.length > 0){
						str += "; "+mockLabels.correctAnswerMarks+" <font color='green'><b> "+ ques.allottedMarks +"</b></font>";
						if(typeof(ques.displayNegMarks)!='undefined'&&ques.displayNegMarks!=null&&ques.displayNegMarks!="NA"&&ques.displayNegMarks!="")
							str += " ;  "+mockLabels.negativeMarks+" </span><font color='red'><b> "+ ques.displayNegMarks +"</b></font>";
						else
							str += " ;  "+mockLabels.negativeMarks+" </span><font color='red'><b> "+ ques.negMarks +"</b></font>";
						str += "</b> ";
					}
					else if(mockVar.showMarks && !mockVar.msQName.length > 0){
						str += mockLabels.correctAnswerMarks+" <font color='green'><b> "+ ques.allottedMarks +"</b></font>";
						if(typeof(ques.displayNegMarks)!='undefined'&&ques.displayNegMarks!=null&&ques.displayNegMarks!="NA"&&ques.displayNegMarks!="")
							str += " ;  "+mockLabels.negativeMarks+" </span><font color='red'><b> "+ ques.displayNegMarks +"</b></font>";
						else
							str += " ;  "+mockLabels.negativeMarks+" </span><font color='red'><b> "+ ques.negMarks +"</b></font>";
						str += "</b> ";
					}
					if(mockVar.showOptionInViewQP==1){
						for(var k=0;k<ques.options.length;k++){
							str += "<tr><td><span style='font-weight:bold'>";
							str += (k+1)+'</td>';
							//str +=+(k+1)+":";
							str +='<td>'+ques.options[k].optLangBean[mockVar.langIndex].optText.replace(/JPlayeropt/g, 'QPJPlayeropt').replace(/Containeropt/g, 'QPContaineropt');
							str += "</td></tr>";
						} 
					}
					str += "</i><td></tr>";				
				}else if(ques.quesType.indexOf("SA")>-1 ){
					str += "<tr><td width='50px'></td><td><i style='font-size:1em;'>";
					if(mockVar.saQName.length>0){
						str += mockLabels.questionType+"<b>";
						str += mockVar.saQName;
						str += "</b>  ";
					}
					if(mockVar.showMarks && mockVar.saQName.length>0){
						str += "; "+mockLabels.correctAnswerMarks+" <font color='green'><b> "+ ques.allottedMarks +"</b></font>";
						if(typeof(ques.displayNegMarks)!='undefined'&&ques.displayNegMarks!=null&&ques.displayNegMarks!="NA"&&ques.displayNegMarks!="")
							str += " ;  "+mockLabels.negativeMarks+" </span><font color='red'><b> "+ ques.displayNegMarks +"</b></font>";
						else
							str += " ;  "+mockLabels.negativeMarks+" </span><font color='red'><b> "+ ques.negMarks +"</b></font>";
						str += "</b> ";
					}
					else if(mockVar.showMarks && !mockVar.saQName.length>0){
						str += mockLabels.correctAnswerMarks+" <font color='green'><b> "+ ques.allottedMarks +"</b></font>";
						if(typeof(ques.displayNegMarks)!='undefined'&&ques.displayNegMarks!=null&&ques.displayNegMarks!="NA"&&ques.displayNegMarks!="")
							str += " ;  "+mockLabels.negativeMarks+" </span><font color='red'><b> "+ ques.displayNegMarks +"</b></font>";
						else
							str += " ;  "+mockLabels.negativeMarks+" </span><font color='red'><b> "+ ques.negMarks +"</b></font>";
						str += "</b> ";
					}	
					str += "</i><td></tr>";
				}else if(ques.quesType.indexOf("SUBJECTIVE")>-1){
					str += "<tr><td width='50px'></td><td><i style='font-size:1em;'>";
					if(mockVar.subjQName.length>0){
						str += mockLabels.questionType+"<b>";
						str += mockVar.subjQName;
						str += "</b>";
					}
					if(mockVar.showMarks && mockVar.subjQName.length>0){
						str += "; "+mockLabels.correctAnswerMarks+" <font color='green'><b> "+ ques.allottedMarks +"</b></font>";
						if(typeof(ques.displayNegMarks)!='undefined'&&ques.displayNegMarks!=null&&ques.displayNegMarks!="NA"&&ques.displayNegMarks!="")
							str += " ;  "+mockLabels.negativeMarks+" </span><font color='red'><b> "+ ques.displayNegMarks +"</b></font>";
						else
							str += " ;  "+mockLabels.negativeMarks+" </span><font color='red'><b> "+ ques.negMarks +"</b></font>";
						str += "</b> ; ";
					}		
					else if(mockVar.showMarks && mockVar.subjQName.length>0){
						str += mockLabels.correctAnswerMarks+" <font color='green'><b> "+ ques.allottedMarks +"</b></font>";
						if(typeof(ques.displayNegMarks)!='undefined'&&ques.displayNegMarks!=null&&ques.displayNegMarks!="NA"&&ques.displayNegMarks!="")
							str += " ;  "+mockLabels.negativeMarks+" </span><font color='red'><b> "+ ques.displayNegMarks +"</b></font>";
						else
							str += " ;  "+mockLabels.negativeMarks+" </span><font color='red'><b> "+ ques.negMarks +"</b></font>";
						str += "</b>";
					}					
					str += "</i><td></tr>";
				}
				//	str += "</i><td></tr>";
				str += "</table></p><hr style='color:#ccc'/>";
			}
		}
		str +="<br/>";
	}
	//activateAudioPlayer();
	//activateVideoPlayer();
	//palyVideo();
	if($(window).width()<1000){
		$(".mContent").html(str);
		$(".almVideo").remove();
		$(".almAudio").remove();
		$(".mpop").fadeIn('slow');
		$('.overlay').show();
		$(".mpop table").css({'text-align':'left'});
	}else{
		$(".viewQPDiv").html(str);
		$(".almVideo").remove();
		$(".almAudio").remove();
		showModule('QPDiv');
		$('#QPDiv').css({height:(($(window).height()-($(window).height()*0.2))-25)+'px',width:(($(window).width()-($(window).width()*0.2))-5)+'px'});
	}
	removingImageHref();
}

/* removing href of image so onclicking will not have any effect and remains in same window
*/
function removingImageHref() {
	if($('.viewQPDiv a.imageZoom').length > 0){
		$('.viewQPDiv a.imageZoom').removeAttr("href");
		$('.viewQPDiv a.imageZoom').removeAttr("class");
	}
}


function multiLangInstru(){
	$('#iframeId').contents().find("#basInst option[value='instEnglish']").attr("selected", "selected");
	if(document.getElementById("multiLangDD")!=null){
		$("#multiLangDD option").each(function(){
			if($(this).text().toUpperCase() == 'HINDI'){
				$('#iframeId').contents().find('#basInst').parent().show();
			}
		});
		$("#multiLangDD").change(function (){ 
			var select = this.value;
			$("#multiLangDD option").each(function(){

				if(select == this.value){
					$("#instLang" + select).show();
				}else{
					$("#instLang" + this.value).hide();
				}
			});
		});
	}
}


/** *************************************FeedBack page ******************** */




/** *************************************close page ******************** */

function activeLink(linkId){
	$('.courseInfoPop').css({ display: 'none' }); 
	for(var i=0;i<mockVar.activeLinkList.length;i++){
		if(mockVar.activeLinkList[i]==linkId){
			//$("#"+mockVar.activeLinkList[i]).css("background","#2F72B7");
			$("#"+mockVar.activeLinkList[i]).css("color","white");
		}else{
			$("#"+mockVar.activeLinkList[i]).removeAttr('style');
		}
	}
	if(linkId == "VPT"){
		var url =".TB_inline2?height=auto&max-height=100%&min-height=100&width=200&inlineId=hiddenModal2&modal=true";
		tb_show("Server URL", url);
	}else if(linkId == "VI"){
		if(iframeCount === 0){
			$('<iframe />');  // Create an iframe element
			$('<iframe />', {
				name: 'frame1',
				id: 'iframeId',
				src: 'iframesQuiz.html'
			}).appendTo('#quizInstruDiv');
			iframeCount = 1;
		}
		showModule('instructionsDiv');
		$('#instructionsDiv').css({height:(($(window).height()-($(window).height()*0.2))-25)+'px',width:(($(window).width()-($(window).width()*0.2))-5)+'px'});
		var url =".TB_inline2?height=auto&max-height=100%&min-height=100&width=520&height=475&inlineId=hiddenModal1&modal=true";
		tb_show("Server URL", url);

		//$('#instructionsDiv').append('Some text')
	}else if(linkId == "viewQPButton"){
		var url =".TB_inline2?height=auto&max-height=100%&min-height=100&width=520&height=475&inlineId=hiddenModal3&modal=true";
		tb_show("Server URL", url);
	}else if(linkId == "viewGrpInstru"){
		var url =".TB_inline2?height=auto&max-height=100%&min-height=100&width=520&height=475&inlineId=hiddenModal5&modal=true";
		tb_show("Server URL", url);
	}
}

function removeActiveLinks(){
	for(var i=0;i<mockVar.activeLinkList.length;i++){
		$("#"+mockVar.activeLinkList[i]).removeAttr('style');
	}
}
function showGrpInstructionsQuiz(){
	var str="";
	if($(window).width()<1000){
		if(mockVar.groups[mockVar.currentGrp].instru.length>2){
			str += "<div class='instView'> <span class='viewIn'>"+mockLabels.viewIn+"</span>&nbsp; <select onchange='changeGrpInst(this.value)'> ";
			for(var i=0;i<mockVar.groups[mockVar.currentGrp].instru.length;i++){
				langId=mockVar.groups[mockVar.currentGrp].instru[i].langId;
				if(mockVar.languages[langId]!=null && typeof(mockVar.languages[langId])!='undefined'){
					str +="<option";
					if(langId==mockVar.defaultLang)
						str += " selected='selected'";
					str +=  " value='"+langId+"'>"+mockVar.languages[langId]+"</option>";
				}
			}
			str +="</select></div>";
		}
		$('#InstruContent').empty();
		$('.viewInstructionsDiv').empty();
		str+="<div class='viewInstructionsDiv preGrpinstruContent'>";
		for(var i=0; i<mockVar.groups[mockVar.currentGrp].instru.length;i++){
			content = mockVar.groups[mockVar.currentGrp].instru[i].content;
			langId = mockVar.groups[mockVar.currentGrp].instru[i].langId;

			str+="<div class='GrpInst"+langId+"' style='display:none;'>"+content+"</div>";
		}
		str+="</div>";
		$(".mContent").html(str);
		$(".mpop").fadeIn('slow');
		$('.overlay').show();
		$(".mpop table").css({'text-align':'left'});

	}else{
		$(".grpInst").empty();
		for(var i=0;i<mockVar.groups[mockVar.currentGrp].instru.length;i++){
			langId=mockVar.groups[mockVar.currentGrp].instru[i].langId;
			if(mockVar.languages[langId]!=null && typeof(mockVar.languages[langId])!='undefined'){
				o = new Option(mockVar.languages[langId], langId);
				$(o).html(mockVar.languages[langId]);
				$(".grpInst").append(o);
			}
		}
		if(mockVar.groups[mockVar.currentGrp].instru.length>1)
			$(".instView").show();
		$('#InstruContent').empty();
		$('.viewInstructionsDiv').empty();
		for(var i=0; i<mockVar.groups[mockVar.currentGrp].instru.length;i++){
			content = mockVar.groups[mockVar.currentGrp].instru[i].content;
			langId = mockVar.groups[mockVar.currentGrp].instru[i].langId;

			$('.viewInstructionsDiv').append("<div class='GrpInst"+langId+"' style='display:none;'>"+content+"</div>");	
		}

	}
	playUsefulDataVideo();
	$('.GrpInst'+mockVar.groups[mockVar.currentGrp].instru[0].langId).show();
}
function calcTotalQues(orgId,mockId,QPxml){
	var quesCount = 0;
	//var langArr = new Array();
	// $(QPxml).find('LANGID').each(function(){
	// if($.inArray($(this).text(), langArr)==-1){
	// langArr.push($(this).text());
	// }
	// })
	$(QPxml).find('question').each(function(){
		quesCount++;
	});
	$('#iframeId').contents().find(".totalNoOfQues").html(quesCount);

}

function loadCalculator(){
	if(mockVar.showCalculator=="NORMAL"){
		$('#keyPad a').css('margin-right','3px');
		$('.degree_radian').css('display','none');
		$('.keyPad_TextBox').attr('style', 'width: 188px !important;');
		$('.keyPad_TextBox1').attr('style', 'width: 188px !important;');
		$('.keyPad_TextBox').css("font-size", "17px");
		$('.keyPad_TextBox1').css("font-size", "17px");   
		jQuery('.memoryhide').css('right','192px');
		$('#Pi').hide();
		$('#dr').removeClass('degree_radian');
		$('.degree_radian').hide(); 
		$('.keyPad_btnConst').hide();
		$('.keyPad_btnConst').hide();
		$('#keyPad_btnMod').hide();
		$('#keyPad_btnFact').hide();
		$('#keyPad_btnSinH').hide();
		$('#keyPad_btnCosinH').hide();
		$('#keyPad_btnTgH').hide();
		$('#keyPad_EXP').hide();
		$('#keyPad_btnOpen').hide();
		$('#keyPad_btnClose').hide();
		$('#keyPad_btnAsinH').hide();
		$('#keyPad_btnAcosH').hide();
		$('#keyPad_btnAtanH').hide();
		$('#keyPad_btnLogBase2').hide();
		$('#keyPad_btnLn').hide();
		$('#keyPad_btnLg').hide();
		$('#keyPad_btnExp').hide();
		$('#keyPad_btnYlogX').hide();	
		$('#keyPad_btn10X').hide();
		$('#keyPad_btnSin').hide();
		$('#keyPad_btnCosin').hide();
		$('#keyPad_btnTg').hide();
		$('#keyPad_btnYpowX').hide();
		$('#keyPad_btnCube').hide();
		$('#keyPad_btnSquare').hide();
		$('#keyPad_btnAsin').hide();
		$('#keyPad_btnAcos').hide();
		$('#keyPad_btnAtan').hide();
		$('#keyPad_btnYrootX').hide();
		$('#keyPad_btnCubeRoot').hide();
		$('#keyPad_btnAbs').css('display','none');
		if(checkIEVersion()&&!(!!navigator.userAgent.match(/Trident\/7\./))){
			$('#keyPad_btnEnter').addClass('importantRule');
			$('#keyPad_btnEnter').attr('style', 'height: 53px !important;');
			$('#memory').addClass('importantRuleMemory');
			jQuery('.calc_container').css('width','214px');
		}
		else{
			$('#keyPad_btnEnter').addClass('importantRule1');
			$('#keyPad_btnEnter').attr('style', 'height: 53px !important;');
			$('#memory').addClass('importantRuleMemory1');
			$('#keyPad_btn0').attr('style', 'width: 72px !important;');
			$('#keyPad_btnBack').attr('style', 'width: 72px !important;');
			jQuery('.calc_container').css('width','214px');
		}
		$('#keyPad_btn0').attr('style', 'width: 72px !important;');
		$('#keyPad_btnBack').attr('style', 'width: 72px !important;');
		jQuery("#keyPad").css("top",0).css("left",0);
		$('#keyPad_Help').hide();
		$('#normalText').show();
	}
	if(mockVar.showCalculator=="SCIENTIFIC"){
		$('#memory').addClass('importantRuleMemoryScientific');
		$('.keyPad_TextBox').attr('style', 'width: 434px !important;');
		$('.keyPad_TextBox1').attr('style', 'width: 434px !important;');
		$('#keyPad_btn0').attr('style', 'width: 76px !important;');
		$('.degree_radian').attr('style', 'width: 80px !important;');
		$('#scientificText').show();
	}
	var pLft = ( $(window).width() - $("#loadCalc").width() );
	//pLft = pLft + 430;
	jQuery("#loadCalc").css("top",121).css("left",pLft);
	$('#loadCalc').show();
}

function getIEVersion() {
	try{
		var rv = -1;
		if (navigator.appName == 'Microsoft Internet Explorer') {
			var MSIEOffset = window.navigator.userAgent.indexOf("MSIE ");
			if (MSIEOffset == -1) {
				rv = -1;
			} else {
				rv = parseFloat(window.navigator.userAgent.substring(MSIEOffset + 5, window.navigator.userAgent.indexOf(";", MSIEOffset)));
			}
		}
		return rv;
	}catch(e) {
		return false;
	}
}

//This function is used to check Browser is Compatible or not for Candidate Machine.
function checkIEVersion(){
	try{
		var currentIEVersion = getIEVersion();
		if((currentIEVersion >=7 && currentIEVersion != -1) || (($.browser.msie || navigator.userAgent.indexOf("Trident")!=-1) && $.browser.version>=7)) {
			return true;
		}else {
			return false;
		}
	}catch(e) {
		return false;
	}
}

/*function alphaWordLimit(event){
	//$("textarea").keydown(function(e) {
	var number = 0;
	var matches = $("#answer").val().match(/\S+/g);
	
	if(matches) {
		number = matches.length;
	}
	
        if (number > mockVar.curQuesBean.alphaWordLimit) {
            // Split the string on first 200 words and rejoin on spaces
            var trimmed = $("#answer").val().split(/\s+/, mockVar.curQuesBean.alphaWordLimit).join(" ");
            // Add a space at the end to keep new typing making new words
            $("#answer").val(trimmed);
			}
	//var key_code = (window.event) ? event.keyCode : event.which; 
	//if(mockVar.curQuesBean.alphaWordLimit==number && (key_code==32||key_code==13)){
	//	event.preventDefault();
	//}
	//});
}*/
function wordCountCheckGroup(e,questionID){
	//var questionID = questionID;
	var number = 0;
	var matches = $('#answer'+questionID).val().match(/\S+/g);
	var curSectionQuesNo = 0;
	if(matches) {
		number = matches.length;
	}
	for(var i=0;i<mockVar.curSectionQuestions.length;i++){
		if(mockVar.curSectionQuestions[i].quesId ==  questionID){
			curSectionQuesNo = i;
		}
	}
	if (number+1 > mockVar.curSectionQuestions[curSectionQuesNo].alphaWordLimit ){
		if(!(mockVar.curSectionQuestions[curSectionQuesNo].alphaWordLimit==0)){
			$("#maxalert"+questionID).html($(globalXmlvar).find('maxalert').text());
			$('#answer'+questionID).keypress(function(e){
				if (e.keyCode != 8){
					e.preventDefault();
				}
			});
		}
	}
	else{
		$('#answer'+questionID).unbind('keypress');
		$("#maxalert"+questionID).text("");
	}
}

function wordCountCheck(e){
	//var questionID = questionID;
	var number = 0;
	var matches = $('#answer').val().match(/\S+/g);
	if(matches) {
		number = matches.length;
	}
	if (number+1 > mockVar.curQuesBean.alphaWordLimit ){
		if(!(mockVar.curQuesBean.alphaWordLimit==0)){
			$("#maxalert").html($(globalXmlvar).find('maxalert').text());
			$('#answer').keypress(function(e){
				if (e.keyCode != 8){
					e.preventDefault();
				}
			});
		}
	}
	else{
		$('#answer').unbind('keypress');
		$("#maxalert").text("");
	}
}

function alphaWordLimitGroup(e,questionID){
	if(e.keyCode == 32|| e.keyCode==8 ||e.keyCode== 13 || e.keyCode== 37 || e.keyCode== 38 || e.keyCode== 39 || e.keyCode== 40){
		wordCountCheckGroup(e,questionID);
	}
}
function alphaWordLimit(e){
	if(e.keyCode == 32|| e.keyCode==8 ||e.keyCode== 13 || e.keyCode== 37 || e.keyCode== 38 || e.keyCode== 39 || e.keyCode== 40 ||e==32){
		wordCountCheck(e);
	}		
}

function disableTab(event){
	$("textarea").keydown(function(e) {
		var key_code = (window.event) ? event.keyCode : e.which; 
		if(key_code==9){
			e.preventDefault();
		}
	});
}

function allowSAInputsForMultiLang(event){
	var key_code = (window.event)? event.keyCode : event.which;
	if(key_code==27 || key_code==17 || key_code==19 || key_code == 9 || (key_code>=91 && key_code<=93) || (key_code>=33 && key_code<=36) || key_code==38 || key_code==40 || key_code==45 || (key_code>=112 && key_code<=123) || key_code==145){
		return false;
	}else{
		return true;
	}
}

function validateKeyBoardInputAlphaNumeric(evt, textAreaObj){
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if(!(evt.ctrlKey||evt.altKey) && ((charCode>=97 && charCode<=122) 
			||(charCode>=65 && charCode<=90) || (charCode>=48 && charCode<=57) 
			|| (charCode==43)|| (charCode==44) || (charCode==45) || (charCode==46) || (charCode==32) 
			|| (charCode==59)|| (charCode==42)|| (charCode==13)|| (charCode==33)|| (charCode==64)
			|| (charCode==35)|| (charCode==36)|| (charCode==37) || (charCode==94) || (charCode==38) 
			|| (charCode==42)|| (charCode==40)|| (charCode==41)|| (charCode==95)|| (charCode==61) 
			|| (charCode==20)|| (charCode==123)|| (charCode==125)|| (charCode==91)|| (charCode==93) 
			|| (charCode==124)|| (charCode==92)|| (charCode==126)|| (charCode==96)
			|| (charCode==58)|| (charCode==34)|| (charCode==39)|| (charCode==60)|| (charCode==62) 
			|| (charCode==63)|| (charCode==47)|| (charCode==106)|| (charCode==111)|| (charCode==12)
			|| (charCode==8)|| (charCode==190)|| (charCode==191)|| (charCode==188)|| (charCode==222))){ 
		return true;
	}else{
		return false;
	}  
}

function word_countGroup(a) {
	var number = 0;
	var matches = $("#answer"+a).val().match(/\S+/g);
	if(matches) {
		number = matches.length;
	}
	if(number>1) {
	$("#noOfWords"+a).html(number+' '+$(globalXmlvar).find('wordsTyped').text());
	
	}
	else
	$("#noOfWords"+a).html(number+' '+$(globalXmlvar).find('wordTyped').text());
	//$("#noOfWords"+a).text(number+' word'+(number > 1 ? 's' : '')+' typed');.text(number+' ').html($(globalXmlvar).find('wordTyped').text());
}
function word_count() {
	var number = 0;
	var matches = $("#answer").val().match(/\S+/g);
	if(matches) {
		number = matches.length;
	}
	if(number>1) {
	$("#noOfWords").html(number+' '+$(globalXmlvar).find('wordsTyped').text());
	
	}
	else
	$("#noOfWords").html(number+' '+$(globalXmlvar).find('wordTyped').text());
	//$("#noOfWords").text(number+' word'+(number > 1 ? 's' : '')+' typed');
}

function calculateEllapsedTime(){
	var ellapsedTime = mockVar.groups[mockVar.currentGrp].maxTime - mockVar.time;
	mockVar.typingGroup[mockVar.currentGrp].ellapsedTime = ellapsedTime;
}
function focusOnDiv(){}
function focusOnDiv1(){
	var divId="";
	if($('.typedAnswer')!==undefined && $('.typedAnswer')[0])
		divId = 'typedAnswer';
	else if(document.getElementById('answer'))
		divId = 'answer';
	//setTimeout(function() {
	if(document.URL.indexOf("quiz.html") > 0){
		if(typeof(iOAP.secDetails[iOAP.curSection].groupAllQuestions) == "undefined" || iOAP.secDetails[iOAP.curSection].groupAllQuestions == "" || iOAP.secDetails[iOAP.curSection].groupAllQuestions == "false")
			if(divId!==""){
				if($('.'+divId)!==undefined && $('.'+divId)[0]!==undefined)
					$('.'+divId).focus();
				else
					$('#'+divId).focus();
			}
	}
	//}, 0);
	/*$('#'+divId).bind("blur", function() {
		setTimeout(function() {
			$('#'+divId).focus();
		}, 0);
	});*/
}

$(document).click(function(e) {
	$(".iconRemoveSign").click(
			function() {   
				$(".mpop").fadeOut('fast');
				$('.overlay').hide();
				$(".mContent").empty();
			}
	);
	var target = $(e.target);
	//var article;
	if(target.attr("class") == "jwpreview jwuniform" || target.attr("class") == "jwdisplay" || target.attr("class") == "jwicon" || 
			target.attr("class") == "jwdisplayIcon" || target.attr("class") == "jwtimeSliderCapRight" || target.attr("class") == "jwtext jwduration jwhidden" || 
			target.attr("class") == "jwtext jwelapsed jwhidden" || target.attr("class") == "jwtimeSliderThumb jwthumb" || target.attr("class") == "jwtimeSliderRail"
				|| target.attr("class") == "jwtimeSliderProgress" || target.attr("class") == "jwtimeSliderBuffer"){ 
		e.stopPropagation(); 
		return false;
	}
	if(!target.is('select')) {
		//  focusOnDiv1();
	}
});



function mockScoreCalc(){
	var totalQues = 0, ques = '', isParentLAQCorrect = false;
	for(var groupNo=0;groupNo<mockVar.groups.length;groupNo++){
		var temp_iOAP = mockVar.groups[groupNo], grpSectCounter = 0;
		for(var i=0;i<temp_iOAP.secDetails.length;i++){
			if(temp_iOAP.secDetails[i].isOptional == 'false' || (temp_iOAP.secDetails[i].isOptional == 'true' && temp_iOAP.secDetails[i].isSelected)){
				grpSectCounter++;
				var sectionScore=0,evaluatedQues=0,correctCount=0,totalSecMarks=0;
				totalQues = temp_iOAP.secDetails[i].questions.length;
				hasOptionalQuestion = temp_iOAP.secDetails[i].hasOptionalQuestion;
				for(var j=0;j<totalQues;j++){
					var questionStatus = temp_iOAP.secDetails[i].questions[j].quesParam.status;
					//var quesLangId = temp_iOAP.secDetails[i].questions[j].quesParam.langID;
					ques = temp_iOAP.secDetails[i].questions[j];
					if(j==0 && hasOptionalQuestion=='true' && temp_iOAP.secDetails[i].maxOptQuesToAns<totalQues){
						totalSecMarks += eval(ques.allottedMarks*temp_iOAP.secDetails[i].maxOptQuesToAns);
					}else if(!(hasOptionalQuestion=='true' && temp_iOAP.secDetails[i].maxOptQuesToAns<totalQues)){
						totalSecMarks += eval(ques.allottedMarks);
					}
					if(questionStatus=="answered" || (questionStatus == "marked" && ques.quesParam.answer!="" && mockVar.isMarkedForReviewConsidered=="YES")){
						if(ques.quesType =="SA" || ques.quesType =="COMPREHENSION@@SA" || ques.quesType =="LA@@SA"){
							evaluateSAQues(ques);
						}else if(ques.quesType =="TYPING TEST"){
							evaluateTypingQues(ques,groupNo);
						}else if(ques.quesType != "SUBJECTIVE"){
							if(ques.quesType.indexOf("@@") !=-1 ){
								if(ques.quesType.split('@@')[0]=='LA'){
									if(ques.isParent){
										evaluateLAnCompreQues(ques);
										isParentLAQCorrect = ques.isCorrect;
									}
									if(isParentLAQCorrect)
										evaluateLAnCompreQues(ques);
								}else if(ques.quesType.split('@@')[0]=='COMPREHENSION'){
									evaluateLAnCompreQues(ques);
								}
							}else if(ques.quesType == 'MCQ'){
								evaluateMCQ(ques);
							}else if(ques.quesType == 'MSQ'){
								evaluateMSQ(ques);
							}
						}
						sectionScore +=  eval(calculateScore(ques,questionStatus));
						if(ques.isEvaluated){
							evaluatedQues++;
						}else{
							ques.quesAnsStatus = 'Not Evaluated';
						}
						if(ques.isCorrect){
							correctCount++;
							ques.quesAnsStatus = 'Correct';
						}else{
							if(ques.isEvaluated){
								ques.quesAnsStatus = 'Incorrect';
							}
						}
					}
				}
				if(!temp_iOAP.isTypingGroup){
					temp_iOAP.secDetails[i].totalSecMarks = totalSecMarks;
					temp_iOAP.secDetails[i].sectionScore = sectionScore;
					temp_iOAP.secDetails[i].totalEvaluatedQues = evaluatedQues;
					temp_iOAP.secDetails[i].totalCorrectQues = correctCount;
				}
			}
		}
	}
}

function showScoreCard(){
	$('.overlay').hide();
	$('.confrmPopup').hide();
	var str = "<div class='examSummaryHeader' id='scoreCardHeader'><div class='titlepath'>"+mockVar.mockName+"</div>", typingStr = '';
	str += "<div class='grayBand'><div class='scoreCandName'>"+mockLabels.candName+"&nbsp;"+mockLabels.candidate+"</div><div class='scoreCandId'>"+mockVar.loginLabel+"&nbsp;: "+mockVar.candId+"</div></div>";
	str+="<div class='clear'></div>";
		str += "<div id='sc_group_summary' style='padding:10px;overflow:auto;text-align:left;font-size:14px;'>";
	for(var groupNo=0;groupNo<mockVar.groups.length;groupNo++){
		var totalGrpQues = 0, totalGrpAttempted = 0, totalGrpCorrect = 0, totalGrpIncorrect = 0, totalGrpScore = 0, totalGrpNotEvaluated = 0, totalGrpMarks = 0, grpSectCounter = 0;
		var temp_iOAP = mockVar.groups[groupNo], typing_iOAP = mockVar.typingGroup[groupNo];
		if(temp_iOAP.isTypingGroup){
			if(mockVar.groups.length>1)
				typingStr += "<div class='score_group_name'>"+mockVar.groups[groupNo].groupName+"</div>";
			typingStr += "<table class='score_card_table' cellspacing=0 width='80%' align='center'>";
			typingStr += "<thead><tr><th width='20%'>"+mockLabels.secName+"</th><th width='10%'>"+mockLabels.keyStrokesCount+"</th><th width='10%'>"+mockLabels.elapsedTime+"</th><th width='10%'>"+mockLabels.nwpm+"</th><th width='10%'>"+mockLabels.accuracy+"<div style='text-align:center'>(%)</div></div></th></tr></thead>";
		}else{
			if(mockVar.groups.length>1)
				str += "<div class='score_group_name'>"+mockVar.groups[groupNo].groupName+"</div>";
			str += "<table class='score_card_table' cellspacing=0  align='center'>";
			str += "<thead><tr><th>"+mockLabels.secName+"</th><th>"+mockLabels.noOfQues+"</th><th>"+mockLabels.attempted+"</th><th>"+mockLabels.correct+"</th><th>"+mockLabels.incorrect+"</th>";
			if(temp_iOAP.hasOfflineSect)
				str += "<th>"+mockLabels.notEvaluated+"</th>";
			str += "<th>"+mockLabels.secScore+"</th>";
			if(typeof(mockVar.displayPercentageScore)!='undefined' && mockVar.displayPercentageScore)
				str += "<th>"+mockLabels.secPercent+"</th>";
			str += "</tr></thead>";
		}
		for(var i=0;i<temp_iOAP.secDetails.length;i++){
			if(temp_iOAP.secDetails[i].isOptional == 'false' || (temp_iOAP.secDetails[i].isOptional == 'true' && temp_iOAP.secDetails[i].isSelected) || temp_iOAP.isTypingGroup == 'true'){
				grpSectCounter++;
				if(temp_iOAP.isTypingGroup){
					typingStr += "<tbody><tr><td>"+temp_iOAP.secDetails[i].secName+"</td><td>"+typing_iOAP.keyStrokesCount+"</td><td width='10%'>"+(typing_iOAP.ellapsedTime/60).toFixed(2)+"</td><td width='10%'>"+typing_iOAP.NWPM+"</td><td width='10%'>"+typing_iOAP.accuracy+"</td></tr></tbody>";
				}else{
					str += "<tbody><tr><td width='20%'>"+temp_iOAP.secDetails[i].secName+"</td><td width='10%'>"+(temp_iOAP.secDetails[i].questions.length)+"</td><td width='10%'>"+temp_iOAP.secDetails[i].answered+"</td><td width='10%'>"+temp_iOAP.secDetails[i].totalCorrectQues+"</td><td width='10%'>"+(temp_iOAP.secDetails[i].totalEvaluatedQues-temp_iOAP.secDetails[i].totalCorrectQues)+"</td>";
					if(temp_iOAP.hasOfflineSect)
						str += "<td width='10%'>"+(temp_iOAP.secDetails[i].answered-temp_iOAP.secDetails[i].totalEvaluatedQues)+"</td>";
					str += "<td width='10%'>"+temp_iOAP.secDetails[i].sectionScore.toFixed(2)+"/"+temp_iOAP.secDetails[i].totalSecMarks.toFixed(2)+"</td>";
					if(typeof(mockVar.displayPercentageScore)!='undefined' && mockVar.displayPercentageScore)
						str += "<td width='10%'>"+((temp_iOAP.secDetails[i].sectionScore/temp_iOAP.secDetails[i].totalSecMarks)*100).toFixed(2)+"</td>";
					str += "</tr></tbody>";
					totalGrpQues += temp_iOAP.secDetails[i].questions.length;
					totalGrpAttempted += temp_iOAP.secDetails[i].answered;
					totalGrpCorrect += temp_iOAP.secDetails[i].totalCorrectQues;
					totalGrpIncorrect += temp_iOAP.secDetails[i].totalEvaluatedQues-temp_iOAP.secDetails[i].totalCorrectQues;
					totalGrpNotEvaluated += temp_iOAP.secDetails[i].answered-temp_iOAP.secDetails[i].totalEvaluatedQues;
					totalGrpScore += temp_iOAP.secDetails[i].sectionScore;
					totalGrpMarks += temp_iOAP.secDetails[i].totalSecMarks;
				}
			}
		}
		//if(grpSectCounter>1){
		if(!temp_iOAP.isTypingGroup){
			str += "<tbody><tr><td width='20%'>"+$(globalXmlvar).find('total').text()+"</td><td width='10%'>"+totalGrpQues+"</td><td width='10%'>"+totalGrpAttempted+"</td><td width='10%'>"+totalGrpCorrect+"</td><td width='10%'>"+totalGrpIncorrect+"</td>";
			if(temp_iOAP.hasOfflineSect)
				str += "<td width='10%'>"+totalGrpNotEvaluated+"</td>";
			str += "<td wiave" +"dth='10%'>"+totalGrpScore.toFixed(2)+"/"+totalGrpMarks.toFixed(2)+"</td>";
			if(typeof(mockVar.displayPercentageScore)!='undefined' && mockVar.displayPercentageScore)
				str += "<td width='10%'>"+((totalGrpScore/totalGrpMarks)*100).toFixed(2)+"</td>";
			str += "</tr></tbody>";
			//	}
		}
		str += "</table>";
		typingStr += "</table>";
	}
	str = str + typingStr + "</div></center>";
	$('#questionContent').hide();
	$('#sub-header').hide();
	$("#scoreSummaryDiv").html(str);
	$('#scoreCardDiv').show();
	$('#scoreCardPrcdBtn').val(mockLabels.proceedBtnLabel);
	if($(window).width()>1000){
		$('#scoreCardDiv').height($(window).height() - $('#header').height()  - $('#footer').outerHeight(true));
	}else{
		$('#scoreCardDiv').height($(window).height() - $('#header').height() );
	}
	$('#sc_group_summary').height($('#scoreCardDiv').outerHeight(true)-$('.titlepath').outerHeight(true)- $('.grayBand').outerHeight(true) -$('#scoreCardBtnDiv').outerHeight(true) - 20);	
}

/*function viewScoreCardReport(URL){
	var reportwindow = window.open(URL,"_blank");
	}*/
function hideReportLink(){
	$('#scoreCardReportLink').hide();
}
function showScoreCardForOnlineAssessment(scoreCardJson,cutOffMarks,totalMarks,tokenkey){
	var totalObtainedMarks=0;
	//var result;
	var groups = scoreCardJson.Groups;
	$('.overlay').hide();
	$('.confrmPopup').hide();
	var str = "<div class='examSummaryHeader' id='scoreCardHeader'><div class='titlepath'>"+mockVar.mockName+"</div>";
	var	typingStr = '';
	str += "<div class='grayBand'>";
	str +="<div class='scoreCandName'>"+mockLabels.candName+"&nbsp;"+mockLabels.candidate+"</div><div class='scoreCandId'>"+mockVar.loginLabel+" : "+mockVar.candId+"</div><div class='clear'></div><div style='float:left'>"+mockLabels.score+":<b>&nbsp;<span id='totalScore'></span></div>";
	str +="<div style='float:right'><b>"+mockLabels.cutOffMarks+":</b>&nbsp;"+cutOffMarks+"</div><div class='clear'></div>";
	if(mockVar.resultStatus==1){
		str +="<div style='float:left'><b>"+mockLabels.result+" : </b><span id='Result'></span></div>";
	}
	if(mockVar.ShowHtmlScoreCard==1){
		//var w=screen.width;
		//var h=screen.height;
		var enrollmentId = document.cookie.split("enrollmentId=")[1].split(";")[0];
		var subscriptionId = document.cookie.split("subscriptionId=")[1].split(";")[0];
		var app_seq_no = document.cookie.split("app_seq_no=")[1].split(";")[0];
		var paramsDetails = 'top=0, left=0';
		paramsDetails += ',statusbar=no,toolbar=no,location=no,directories=no,menubar=no,resizable=no';
		paramsDetails += ', scrollbars=yes, status=no, fullscreen=yes';
		var URL='/ASM/LaunchCandidateReport?orgId='+mockVar.orgId+'&AsmntId='+mockVar.mockId+'&subscriptionFor='+mockVar.subscribedFor+'&enrollment_id='+enrollmentId+'&subscriptionId='+subscriptionId+'&app_seq_no='+mockVar.candidate_Id+'&attemptId='+mockVar.attemptId+'&launch_key='+tokenkey;
		str +="<div id='scoreCardReportLink' style='float:right'> <a target='_blank' href="+URL+"><span class='auditlogButton' title='"+$(globalXmlvar).find('ClickToViewReport').text()+"'  onclick='hideReportLink()'>"+$(globalXmlvar).find('ClickToViewReport').text()+"</span></a></div>";
	}
	str += "</div><div class='clear'></div><div id='sc_group_summary' style='margin:0 4px;overflow:auto;text-align:left;font-size:14px;'>";
	jQuery(groups).each(function(){
		var totalGrpQues = 0, totalGrpAttempted = 0, totalGrpCorrect = 0, totalGrpIncorrect = 0, totalGrpScore = 0, totalGrpNotEvaluated = 0, totalGrpMarks = 0, grpSectCounter = 0;
		var temp_iOAP = this;
		if(this.isTypingGroup==1){
			//if(groups.length>1)
			typingStr += "<div class='score_group_name'>"+this.GroupName+"</div>";
			typingStr += "<table class='score_card_table' cellspacing=0  align='center'>";
			typingStr += "<thead><tr><th>"+mockLabels.secName+"</th><th>"+mockLabels.keyStrokesCount+"</th><th>"+mockLabels.elapsedTime+"</th><th>"+mockLabels.gwpm+"</th><th>"+mockLabels.nwpm+"</th><th>"+mockLabels.accuracy+"<div style='text-align:center'>(%)</div></th></tr></thead>";
		}else{
			//if(groups.length>1)
			str += "<div class='score_group_name'>"+this.GroupName+"</div>";
			str += "<table class='score_card_table' cellspacing=0  align='center'>";
			str += "<thead><tr><th>"+mockLabels.secName+"</th><th>"+mockLabels.noOfQues+"</th><th>"+mockLabels.attempted+"</th><th>"+mockLabels.correct+"</th><th>"+mockLabels.incorrect+"</th>";
			//if(temp_iOAP.hasOfflineSect)
			//str += "<th width='10%'>"+mockLabels.notEvaluated+"</th>";
			str += "<th>"+mockLabels.secScore+"</th>";
			if(typeof(mockVar.displayPercentageScore)!='undefined' && mockVar.displayPercentageScore)
				str += "<th>"+mockLabels.secPercent+"</th>";
			str += "</tr></thead><tbody>";
		}
		var sections = this.Sections;
		jQuery(sections).each(function(){
			//if(temp_iOAP.secDetails[i].isOptional == 'false' || (temp_iOAP.secDetails[i].isOptional == 'true' && temp_iOAP.secDetails[i].isSelected)){
			grpSectCounter++;
			if(temp_iOAP.isTypingGroup == 1){
				if(parseFloat(temp_iOAP.Accuracy)<0)
					temp_iOAP.Accuracy = "NA";
				typingStr += "<tbody><tr><td>"+this.SectionName+"</td><td>"+temp_iOAP.keyStrokesCount+"</td><td>"+(temp_iOAP.ElapsedTime/60).toFixed(2)+"</td><td width='10%'>"+temp_iOAP.GWPM+"</td><td width='10%' align='right'>"+temp_iOAP.NWPM+"</td><td width='10%' align='right'>"+temp_iOAP.Accuracy+"</td></tr></tbody>";
				typingStr += "</table>";
			}else{
				str += "<tr><td>"+this.SectionName+"</td><td>"+(this.SectionTotalQuestions)+"</td><td>"+this.TotalQuestionAttempted+"</td><td>"+this.CorrectQuestions+"</td><td>"+this.inCorrectQuestions+"</td>";
				//if(temp_iOAP.hasOfflineSect)
				//str += "<td width='10%'>"+(temp_iOAP.secDetails[i].answered-temp_iOAP.secDetails[i].totalEvaluatedQues)+"</td>";
				if(this.ObtainedMarks=='NA' && this.SectionMaxScore=='NA'){
					str += "<td>NA</td>";
				}
				else{
					str += "<td>"+this.ObtainedMarks.toFixed(2)+"/"+this.SectionMaxScore.toFixed(2)+"</td>";
				}
				if(typeof(mockVar.displayPercentageScore)!='undefined' && mockVar.displayPercentageScore){
					if(this.ObtainedMarks=='NA' && this.SectionMaxScore=='NA'){
						str += "<td>NA</td>";
					}
					else{
						if(this.SectionMaxScore!=0){
							var percentage=((this.ObtainedMarks/this.SectionMaxScore)*100).toFixed(2);
							if(percentage>=0)
								str += "<td>"+((this.ObtainedMarks/this.SectionMaxScore)*100).toFixed(2)+"</td>";
							else
								str += "<td>NA</td>";
						}
						else{
							str += "<td>NA</td>";
						}
					}
				}
				str += "</tr>";
				if(this.SectionTotalQuestions!='NA'){
					totalGrpQues += this.SectionTotalQuestions;
				}
				if(this.TotalQuestionAttempted!='NA'){
					totalGrpAttempted += this.TotalQuestionAttempted;
				}
				if(this.CorrectQuestions!='NA'){
					totalGrpCorrect += this.CorrectQuestions;
				}
				if(this.inCorrectQuestions!='NA'){
					totalGrpIncorrect += this.inCorrectQuestions;
				}
				if(this.TotalQuestionAttempted!='NA' && this.evaluatedQuestions!='NA'){
					totalGrpNotEvaluated += this.TotalQuestionAttempted-this.evaluatedQuestions;
				}
				if(this.ObtainedMarks!='NA'){
					totalGrpScore += this.ObtainedMarks;
					totalObtainedMarks=totalObtainedMarks+this.ObtainedMarks;
				}
				if(this.SectionMaxScore!='NA'){
					totalGrpMarks += this.SectionMaxScore;
				}
			}
			//}
		});
		if(grpSectCounter!=0 && this.isTypingGroup!=1){
			str += "<tr><td>"+$(globalXmlvar).find('total').text()+"</td><td>"+totalGrpQues+"</td><td>"+totalGrpAttempted+"</td><td>"+totalGrpCorrect+"</td><td>"+totalGrpIncorrect+"</td>";
			//if(temp_iOAP.hasOfflineSect)
			//str += "<td width='10%'>"+totalGrpNotEvaluated+"</td>";
			str += "<td>"+totalGrpScore.toFixed(2)+"/"+totalGrpMarks.toFixed(2)+"</td>";
			if(typeof(mockVar.displayPercentageScore)!='undefined' && mockVar.displayPercentageScore){
				if(totalGrpMarks!=0){
					var percent=((totalGrpScore/totalGrpMarks)*100).toFixed(2);
					if(percent>=0)
						str += "<td>"+percent+"</td>";
					else
						str += "<td>NA</td>";
				}
				else{
					str += "<td>NA</td>";
				}
			}
			str += "</tr>";
		}
		str += "</tbody></table>";
		//typingStr += "</table>";
	});
	str = str + typingStr + "</div></div></center>";
	$('#questionContent').hide();
	$('#sub-header').hide();
	$("#scoreSummaryDiv").html(str);
	$('#scoreCardDiv').show();
	$('#scoreCardPrcdBtn').val(mockLabels.proceedBtnLabel);
	setTimeout(function(){
		$('#totalScore').html(totalObtainedMarks.toFixed(2)+"/"+parseFloat(totalMarks).toFixed(2));
		if(mockVar.resultStatus==1){
			if(cutOffMarks<=totalObtainedMarks){
				result ="PASS";
				$('#Result').html('<font size="4" color="green">'+mockLabels.pass+'</font>');
			}
			else{
				result="FAIL";
				$('#Result').html('<font size="4" color="red">'+mockLabels.fail+'</font>');
			}
		}
	},2000);
	if($(window).width()>1000){
		$('#scoreCardDiv').height($(window).height() - $('#header').height()  - $('#footer').outerHeight(true));
	}else{
		$('#scoreCardDiv').height($(window).height() - $('#header').height() );
	}
	$('#sc_group_summary').height($('#scoreCardDiv').outerHeight(true)-$('.titlepath').outerHeight(true)- $('.grayBand').outerHeight(true) -$('#scoreCardBtnDiv').outerHeight(true) );
}
function evaluateSAQues(ques){
	var possibleAnswers = new Array();
	var lowerLimit = 0,upperLimit = 0,splitedAnswer = '', proceed = true;
	if(ques.quesParam.answer.indexOf('.')!=-1){
		if(ques.quesParam.answer.split('.').length>2)
			proceed = false;
	}
	if(ques.answerType.toUpperCase() == 'SET' || ques.answerType.toUpperCase() == 'EQUALS' || ques.answerType.toUpperCase() == 'REGEX'){
		possibleAnswers = ques.correctAnswer[0].split('<sa_ans_sep>');
	}else if(ques.answerType.toUpperCase() == 'RANGE'){
		splitedAnswer = ques.correctAnswer[0].split('<sa_ans_sep>');
		lowerLimit = splitedAnswer[0]<splitedAnswer[1]?splitedAnswer[0]:splitedAnswer[1];
		upperLimit = splitedAnswer[0]<splitedAnswer[1]?splitedAnswer[1]:splitedAnswer[0];
	}
	// numeric keyboard
	if(ques.keyboardType.toUpperCase() == 'NUMERIC'){
		ques.isEvaluated = true;
		if(ques.answerType.toUpperCase() == 'RANGE'){
			if(proceed && ques.quesParam.answer>lowerLimit && ques.quesParam.answer<upperLimit){
				ques.isCorrect = true;
			}
		}else{
			for(var i=0;i<possibleAnswers.length;i++){
				if(ques.answerType.toUpperCase() == 'EQUALS'){
					if(parseFloat(ques.quesParam.answer) == parseFloat(possibleAnswers[i])){
						ques.isCorrect = true;
					}
				}else if(ques.answerType.toUpperCase() == 'SET'){
					if(proceed && parseFloat(ques.quesParam.answer) == parseFloat(possibleAnswers[i])){
						ques.isCorrect = true;
						break;
					}
				}
			}
		}
	}
	// alphanumeric keyboard
	if(ques.isEvaluationRequired && ques.keyboardType.toUpperCase() == 'ALPHANUMERIC'){
		ques.isEvaluated = true;
		for(var i=0;i<possibleAnswers.length;i++){
			if(ques.answerType.toUpperCase() == 'EQUALS'){
				if(ques.isCaseSensitive && ques.correctAnswer[0] == ques.quesParam.answer){
					ques.isCorrect = true;
				}else if(!ques.isCaseSensitive && ques.correctAnswer[0].toUpperCase() == ques.quesParam.answer.toUpperCase()){
					ques.isCorrect = true;
				}
			}else if(ques.answerType.toUpperCase() == 'SET'){
				if(proceed && ques.isCaseSensitive && ques.quesParam.answer == possibleAnswers[i]){
					ques.isCorrect = true;
					break;
				}else 
					if(proceed && !ques.isCaseSensitive && ques.quesParam.answer.toUpperCase() == possibleAnswers[i].toUpperCase()){
						ques.isCorrect = true;
						break;
					}
			}else if(ques.answerType.toUpperCase() == 'REGEX'){
			try{
			if(possibleAnswers[i].indexOf("/")!=-1 && possibleAnswers[i].split("/").length>1){
			var givenRegex = new RegExp(possibleAnswers[i].substring(possibleAnswers[i].indexOf("/")+1, possibleAnswers[i].lastIndexOf("/")));
    		if(givenRegex.test(ques.quesParam.answer)){
 					ques.isCorrect = true;
					break;
    		}
    		}
    		}
    		catch(e){
    		
    		}
    		}
		}
	}
}

function evaluateLAnCompreQues(ques){
	if(ques.quesType.split('@@')[1]=='SA')
		evaluateSAQues(ques);
	if(ques.quesType.split('@@')[1]=='MSQ')
		evaluateMSQ(ques);
	if(ques.quesType.split('@@')[1]=='MCQ')
		evaluateMCQ(ques);	
}

function evaluateMCQ(ques){
	ques.isEvaluated = true;
	if(ques.correctAnswer == ques.quesParam.selectedOptId)
		ques.isCorrect = true;
}

function evaluateMSQ(ques){
	ques.isEvaluated = true;
	var proceed = true;
	var MSQAnswers = ques.correctAnswer;
	var givenMSQAnswers = ques.quesParam.selectedOptId.split(',');
	proceed = checkMSQ(givenMSQAnswers,MSQAnswers);
	if(proceed){
		proceed = checkMSQ(MSQAnswers,givenMSQAnswers);
	}
	if(proceed){
		ques.isCorrect = true;
	}
}

function checkMSQ(array1,array2){
	var proceed = true;
	for(var i=0; i<array1.length;i++){
		if($.inArray(array1[i], array2)==-1){
			proceed = false;
			break;
		}
	}
	return proceed;
}

function calculateScore(ques,questionStatus){
	var score = 0;
	if(ques.isCorrect){
		score += ques.allottedMarks;
	}else if(ques.isEvaluated){
		score -= ques.negMarks;
	}
	return score;
}

function evaluateTypingQues(ques, groupId){
	var grossWords=0, netWords=0, elapsedTime ,typeAccuracy;
	temp_iOAP = mockVar.typingGroup[groupId];
	elapsedTime = temp_iOAP.ellapsedTime;
	// restricted typing
	if(ques.typingType.toLowerCase() == 'restricted'){
		if(mockVar.curQuesBean.typingEvalMode == "Standard"){
			grossWords = (temp_iOAP.keyStrokesCount + temp_iOAP.restrictedErrors)/5;
			netWords = temp_iOAP.keyStrokesCount/5;
		}else{
			grossWords = temp_iOAP.typedWordCount + (temp_iOAP.restrictedErrors/5);
			netWords = temp_iOAP.typedWordCount;
		}
	} // unrestricted typing
	else if(ques.typingType.toLowerCase() == 'unrestricted'){
		if(mockVar.curQuesBean.typingEvalMode == "NonStandard"){
			grossWords = temp_iOAP.typedWordCount;
			netWords = temp_iOAP.typedWordCount - temp_iOAP.wrongCharCount;
		}else{
			grossWords = temp_iOAP.keyStrokesCount/5;
			netWords = (temp_iOAP.keyStrokesCount/5) - temp_iOAP.wrongCharCount;
		}
	}
	temp_iOAP.GWPM = ((grossWords/elapsedTime)*60).toFixed(2);
	temp_iOAP.NWPM = ((netWords/elapsedTime)*60).toFixed(2);	
	typeAccuracy = ((temp_iOAP.NWPM/temp_iOAP.GWPM)*100).toFixed(2);
	if(typeAccuracy > 0)
		temp_iOAP.accuracy = ((temp_iOAP.NWPM/temp_iOAP.GWPM)*100).toFixed(2);
	else 
		temp_iOAP.accuracy = "NA";
}

function loadLabel(){
	var xmlFileName="",xml;
	$('#languageSelect').val(mockVar.langName);
	$('#mLangName').html(mockVar.langName);
	xmlFileName = mockVar.langName;
	xml = readAndReturnXML('LangXML/'+xmlFileName+'.xml');
	globalXmlvar=xml;
	$('#showOptionalSecSummary').html($(xml).find('OptionSectionInfo').text());
	if(iOAP.noOptSec>0){
		$('#noOptSec').html(iOAP.noOptSec);
		$('#maxOptSec').html(iOAP.maxNoOptSec);
		$("#showOptionalSecSummary").show();
	}else{
		$("#showOptionalSecSummary").hide();
	}
	$('.calculator-icon-container').attr('title',$(xml).find('Calculator').text());
	$('.textarea-icon-container').attr('title',$(xml).find('NotePad').text());
	$('.scratchpad-icon-container').attr('title',$(xml).find('ScratchPad').text());
	$('.ruler-icon-container').attr('title',$(xml).find('Ruler').text());
	$('.protactor-icon-container').attr('title',$(xml).find('Protractor').text());
	$('.selectmark_tool').attr('title',$(xml).find('textHighlighter').text());
	$('.zoomin-icon-container').attr('title',$(xml).find('ZoomIn').text());
	$('.zoomout-icon-container').attr('title',$(xml).find('ZoomOut').text());
	
	
	mockLabels.nextQ = $(xml).find('Next').text();
	$('#saveProgram').attr('title',$(xml).find('Next').text());
	$('#saveProgram').val(mockLabels.nextQ);
	$('.UF').text($(xml).find('UsefulData').text());
	$('.UF').attr('title',$(xml).find('UsefulData').text());
	//New UsefulData Player labels
	$('.usefullDataHeader').text($(xml).find('UsefulData').text());
	mockLabels.timeLeft = $(xml).find('TimeLeft').text();
	$('.hint').text($(xml).find('Hint').text());
	//$('#candidateName').text($(xml).find('Candidate').text());
	if(mockVar.storeCandResponse==1){
		if(mockVar.candName.length<12){
			$('.candOriginalName').html(mockVar.candName);
			$('.candOriginalName').attr('title',mockVar.candName);
		}else{
			var onlineCandName = mockVar.candName.substring(0,11)+'...';
			$('.candOriginalName').html(onlineCandName);
			$('.candOriginalName').attr('title',mockVar.candName);

		}
		mockLabels.candidate = mockVar.candName;
		mockLabels.SubmitGroupFinal = $(xml).find('SubmitGroupFinalOA').text();
		document.title = 'Assessment Center';
		$('.candOrigName').html(mockVar.candName);
	}
	else{
		if(mockVar.mockCandidateName.length<12){
			$('.candOriginalName').html(mockVar.mockCandidateName);
			$('.candOriginalName').attr('title',mockVar.mockCandidateName);
			$('.candOrigName').html(mockVar.mockCandidateName);
		}
		else{
			var mockCandName = mockVar.mockCandidateName.substring(0,11)+'...';
			$('.candOriginalName').html(mockCandName);
			$('.candOriginalName').attr('title',mockVar.mockCandidateName);
			$('.candOrigName').html(mockVar.mockCandidateName);
		}
		mockLabels.candidate = mockVar.mockCandidateName;
		mockLabels.SubmitGroupFinal = $(xml).find('SubmitGroupFinal').text();
		document.title = 'Assessment Examination Center';
	}
	$('.instruction_div').attr('title',$(xml).find('InstructionHover').text());
	$('.candId').html(mockVar.candId);
	$('.sect').text($(xml).find('Section').text());
	mockLabels.usefulData = $(xml).find('UsefulData').text();
	mockLabels.correctAnswerMarks = $(xml).find('MarksForCorrectAnswer').text();
	mockLabels.negativeMarks = $(xml).find('NegativeMarks').text();
	$('.correctAnswer').text(mockLabels.correctAnswerMarks);
	$('.negativeMarks').text(mockLabels.negativeMarks);
	mockLabels.questionType = $(xml).find('QuestionType').text();
	$('.questionType').text(mockLabels.questionType);
	mockLabels.questionNo = $(xml).find('QuestionNum').text();
	$('.questionNumber').text(mockLabels.questionNo);
	mockLabels.viewIn = $(xml).find('ViewIn').text();
	$('#iframeId').contents().find('.viewIn').text($(xml).find('ViewIn').text());
	mockLabels.markForReview = $(xml).find('MarkForReview').text();

	$('.clearResponse').val($(xml).find('ClearResponse').text());
	$('#clearResponseGroup').val($(xml).find('ClearResponse').text());
	if($(xml).find('SaveAndNext').text().length<14){
		mockLabels.savenext = $(xml).find('SaveAndNext').text();
		mockLabels.markForReviewNext = $(xml).find('MarkForReviewNext').text();
	}
	else{
		mockLabels.savenext = $(xml).find('SaveAndNext').text().substring(0,14)+'..';
		mockLabels.markForReviewNext = $(xml).find('MarkForReviewNext').text().substring(0,14)+'..';
	}
	mockLabels.save = $(xml).find('Save').text();
	mockLabels.markAsAnswered=$(xml).find('MarkAsAnswered').text();
	$('#viewingSect').html($(xml).find('YouAreViewing').text());
	$('#quesPallet').text($(xml).find('QuestionPalette').text());
	$('#legendLabel').text($(xml).find('Legend').text());
	$('.answeredLabel').text($(xml).find('Answered').text());
	$('.notAnsweredLabel').text($(xml).find('NotAnswered').text());
	$('.markedLabel').text($(xml).find('Marked').text());
	$('.answeredLabel').attr('title',$(xml).find('Answered').text());
	$('.notAnsweredLabel').attr('title',$(xml).find('NotAnswered').text());
	$('.markedLabel').attr('title',$(xml).find('Marked').text());
	$('.notVisitedLabel').attr('title',$(xml).find('NotVisited').text());
	if(mockVar.isMarkedForReviewConsidered=="YES"){
		$('.markedAndAnsweredLabel').text($(xml).find('MarkedAndAnsweredForEvaluation').text());
		$('.markedAndAnsweredLabel').attr('title',$(xml).find('MarkedAndAnsweredForEvaluation').text());
	} else {
		$('.markedAndAnsweredLabel').text($(xml).find('MarkedAndAnswered').text());
		$('.markedAndAnsweredLabel').attr('title',$(xml).find('MarkedAndAnswered').text());
	}
	$('.notVisitedLabel').text($(xml).find('NotVisited').text());
	$('.viewProfile').text($(xml).find('Profile').text());
	$('#VI').text($(xml).find('Instructions').text());
	$('#viewQPButton').text($(xml).find('QuestionPaper').text());
	// Button Labels
	if($(xml).find('Submit').text().length<7){
		$('#finalSubmit').val($(xml).find('Submit').text());
		$('#finalSubmitMbl').val($(xml).find('Submit').text());
	}
	else{
		$('#finalSubmit').val($(xml).find('Submit').text().substring(0,7)+'..');
		$('#finalSubmitMbl').val($(xml).find('Submit').text().substring(0,7)+'..');
	}

	$('#finalTypingSub').val($(xml).find('Submit').text());
	$('.typing').val($(xml).find('Submit').text());
	$('.submitCodeBtn').val($(xml).find('SubmitCode').text()).attr('title',$(xml).find('SubmitCode').text());
	$('.compileCodeBtn').val($(xml).find('Compile').text()).attr('title',$(xml).find('Compile').text());
	$('.underreview').val(mockLabels.markForReviewNext).attr("title",$(xml).find('MarkForReviewNext').text());
	$('.savenext').val(mockLabels.savenext).attr("title",$(xml).find('SaveAndNext').text());
	$(".clearResponse,.clearResponseGroup").attr("title",$(xml).find('ClearResponse').text());

	//$('#savenextGroup').val(mockLabels.savenext);
	//$("#savenextGroup").attr("title",$(xml).find('SaveAndNext').text());
	//$("#clearResponseGroup").attr("title",$(xml).find('ClearResponse').text());
	$('.viewLang').text(mockLabels.viewIn);
	mockLabels.yes = $(xml).find('Yes').text();
	mockLabels.no = $(xml).find('No').text();
	mockLabels.ok = $(xml).find('Ok').text();
	mockLabels.cancel = $(xml).find('Cancel').text();
	mockLabels.back = $(xml).find('Back').text();
	mockLabels.reset = $(xml).find('Reset').text();
	$('#reset').val($(xml).find('Reset').text());
	$('#reset').attr('title',$(xml).find('Reset').text());
	mockLabels.resetSect = $(xml).find('ResettingMessage1').text();
	mockLabels.submitGrp = $(xml).find('SubmitGroup').text();
	mockLabels.submitExam = $(xml).find('SubmitExam').text();
	$('.back').text($(xml).find('Back').text());
	$('.keyStrokesCountTd').html($(xml).find('KeyStrokesCount').text());
	$('.backspaceCountTd').html($(xml).find('BackSpaceCount').text());
	$('.errorCountTd').html($(xml).find('ErrorCount').text());
	$('.totalWordCount').html($(xml).find('TotalWordCount').text());
	$('.typedWordCount').html($(xml).find('TypedWordCount').text());
	$('.remainingWordCount').html($(xml).find('PendingWordCount').text());
	$('#typingInstruSpan b').html($(xml).find('Instructions').text());
	$('#resInstru1').html($(xml).find('TypingInstructionRestricted1').text());
	$('#resInstru2').html($(xml).find('TypingInstructionRestricted2').text());
	$('#resInstru3').html($(xml).find('TypingInstructionCommon1').text());
	$('#resInstru4').html($(xml).find('TypingInstructionCommon2').text());
	$('#unresInstru1').html($(xml).find('TypingInstructionUnrestricted1').text());
	$('#unresInstru2').html($(xml).find('TypingInstructionUnrestricted2').text());
	$('#unresInstru3').html($(xml).find('TypingInstructionUnrestricted3').text());
	$('#unresInstru4').html($(xml).find('TypingInstructionCommon1').text());
	$('#unresInstru5').html($(xml).find('TypingInstructionCommon2').text());
	$('#stanographyInstr1').html($(xml).find('TypingInstructionUnrestricted2').text());
	$('#stanographyInstr2').html($(xml).find('TypingInstructionCommon1').text());
	$('#stanographyInstr3').html($(xml).find('TypingInstructionCommon2').text());
	mockLabels.optSectResetMsg = $(xml).find('OptionalSectionWarningMessage').text();
	mockLabels.selSectToReset = $(xml).find('SectionSelectionToReset').text();
	$(xml).find('OptionalSectionSummary').each(function(){
		mockLabels.optSectSummary = $(this).text();
		mockLabels.optSectName = $(this).attr('OptionalSectionName');
		mockLabels.secName = $(this).attr('SectionName');
		mockLabels.noOfQues = $(this).attr('NoOfQuestions');
		mockLabels.answered = $(this).attr('Answered');
		mockLabels.notAnswered = $(this).attr('NotAnswered');
		mockLabels.markReview = $(this).attr('MarkForReview');
		mockLabels.notAttempted = $(this).attr('NotVisited');
	});
	$(xml).find('ExamSummary').each(function(){
		if(mockVar.storeCandResponse==0)
			mockLabels.examSummary = $(this).text();
		else
			mockLabels.examSummary =$(xml).find('OASummary').text();
		mockLabels.curGrp = $(this).attr('CurrentGroup');
		mockLabels.keyStrokesCount = $(this).attr('GrossKeyStrokesCount');
		//	mockLabels.backspaceCount = $(this).attr('BackSpaceCount');
		mockLabels.elapsedTime = $(this).attr('ElapsedTime');
		mockLabels.yetToAttempt = $(this).attr('YetToAttempt');
		mockLabels.attemptedGrp = $(this).attr('AttemptedGroup');
		mockLabels.canView = $(this).attr('ViewAllowed');
		mockLabels.canNotView = $(this).attr('ViewNotAllowed');
		mockLabels.canEdit = $(this).attr('EditAllowed');
		mockLabels.canNotEdit = $(this).attr('EditNotAllowed');
	});
	mockLabels.deselectOptSect = $(xml).find('DeselectingMessage').text();
	mockLabels.breakTimeLeft = $(xml).find('BreakTimeLeft').text();
	if(mockVar.isMarkedForReviewConsidered=="YES"){
		mockLabels.markAnsTitle = $(xml).find('MarkedAndAnsweredForEvaluation').text();
	} else {
		mockLabels.markAnsTitle = $(xml).find('MarkedAndAnswered').text();
	}
	mockLabels.markNotAnsTitle = $(xml).find('MarkedAndNotAnswered').text();
	mockLabels.optSectTitle = $(xml).find('ActionButtonHoverMessage2').text();
	mockLabels.grpEditNotAllowedTitle = $(xml).find('ActionButtonHoverMessage1').text();
	mockLabels.maxQuesCrossedWithMarkReview = $(xml).find('QuestionLimitMessageWithMarkedForReview').text();
	mockLabels.maxQuesCrossedWithoutMarkReview = $(xml).find('QuestionLimitMessageOnlyAnswered').text();
	mockLabels.btnSaveNext= $(xml).find('SaveAndNext').text();
	mockLabels.btnSave= $(xml).find('Save').text();
	mockLabels.btnMarkForReviewAndNext= $(xml).find('MarkForReviewNext').text();
	mockLabels.btnMarkForReview= $(xml).find('MarkForReview').text();
	mockLabels.btnClearResponse= $(xml).find('ClearResponse').text();
	$(xml).find('ScoreCard').each(function(){
		mockLabels.candName = $(this).attr('CandidateName');
		mockLabels.secScore = $(this).attr('SectionScore');
		mockLabels.secPercent = $(this).attr('SectionPercentage');
		mockLabels.gwpm = $(this).attr('GrossWPM');
		mockLabels.nwpm = $(this).attr('NetWPM');
		mockLabels.accuracy = $(this).attr('Accuracy');
		mockLabels.attempted = $(this).attr('Attempted');
		mockLabels.correct = $(this).attr('Correct');
		mockLabels.incorrect = $(this).attr('Incorrect');
		mockLabels.notEvaluated = $(this).attr('NotEvaluated');
		mockLabels.proceedBtnLabel = $(this).attr('Proceed');
		mockLabels.cutOffMarks=$(this).attr('cutOffMarks');
		mockLabels.score=$(this).attr('score');
		mockLabels.result=$(this).attr('result');
		mockLabels.pass=$(this).attr('pass');
		mockLabels.fail=$(this).attr('fail');
	});
	$('#proceedToNextGrp').val($(xml).find('ProceedToNextGroup').text());
	$('#iframeId').contents().find('.sysInstruLabel').html($(xml).find('Instructions').text());
	$('#iframeId').contents().find('.otherInstruLabel').html($(xml).find('OtherImportantInstructions').text());
	$('#profileDetails').html($(xml).find('CandidateDetails').text());
	$('.candName').html($(xml).find('CandidateName').text());
	$('.cngLang').html($(xml).find('ChangeLanguage').text());
	$('.cngDefLang').html($(xml).find('ChangeQPLanguage').text());
	$('#candDateOfBirth').html($(xml).find('CandDateOfBirth').text());
	
	
	//if(mockVar.showEmailId == 'YES'){
	if(emailId != 'NA'){
		$(".emailId").html(emailId);
		$('.EmailIdSpan').show();
	}
	//}
	//if(mockVar.showContactNo == 'YES'){
	/*if(mobileNum!='NA'){
		$(".contactNo").html(mobileNum);
		$('.ContactNumSpan').show();
	}*/
	//}
	if(loginId != 'NA'){
		$(".loginId").html(loginId);
		$(".loginIdText").html(mockVar.loginLabel);
		$('.LoginIdSpan').show();
	}
	/*if(dob != 'NA'){
		$(".dob").html(dob);
		$('.DOBSpan').show();
	}*/
	
	
	
	$('.dobText').html($(xml).find('CandDateOfBirth').text());
	$('.emailIdText').html($(xml).find('CandidateEmailId').text());
	$('.contactNoText').html($(xml).find('CandidateMobileNo').text());
	$('.CandidateIdText').html($(xml).find('CandidateId').text());
	$('.loginIdText').html($(xml).find('LoginId').text());
	$('#viewProButton').attr('title',$(xml).find('ProfileHover').text());
	$('#viewQPButton').attr('title',$(xml).find('QuestionPaperHover').text());
	$('#finalSubmit').attr('title',$(xml).find('GroupSubmitTitle1').text());
	$('#finalSubmitMbl').attr('title',$(xml).find('GroupSubmitTitle1').text());
	$('#finalTypingSub').attr('title',$(xml).find('GroupSubmitTitle1').text());
	$('.typing').attr('title',$(xml).find('GroupSubmitTitle1').text());
	mockLabels.quesNotAvailable = $(xml).find('AnswerSubmissionRequest6').text();
	mockLabels.timeOutSubmitMsg = $(xml).find('SummaryAlert1').text();
	mockLabels.typeCodeMsg = $(xml).find('CodeTypeMsg').text();
	$('#progDescriptionDiv').text(mockLabels.typeCodeMsg);
	mockLabels.compileAlertMsg = $(xml).find('CompileAlertMsg').text();
	mockLabels.executionAlertMsg = $(xml).find('ExecutionAlertMsg').text();
	mockLabels.compileSuccess = $(xml).find('CompileSuccessStatus').text();
	mockLabels.executionSuccess = $(xml).find('ExecutionSuccessStatus').text();
	$('.grpAnswered').text(mockLabels.answered);
	$('.grpNotAnswered').text(mockLabels.notAnswered);
	$('.grpMarkReview').text(mockLabels.markReview);
	$('.grpNotAttempted').text(mockLabels.notAttempted);
	$('.grpMarkedAndAnswered').text(mockLabels.markAnsTitle);
	$('.secAnswered').text(mockLabels.answered);
	$('.secNotAnswered').text(mockLabels.notAnswered);
	$('.secMarkReview').text(mockLabels.markReview);
	$('.secNotAttempted').text(mockLabels.notAttempted);
	$('.secMarkedAndAnswered').text(mockLabels.markAnsTitle);
	//Grp Instruction Labels
	$('.preGrpInst').text($(xml).find('GroupInstructions').text());
	$('#proceedToGrp').val($(xml).find('ProceedtoNext').text()).attr('title',$(xml).find('ProceedtoNext').text());
	$('.viewIn').text(mockLabels.viewIn);
	mockLabels.grpInstruTimer=$(xml).find('InstructionTimer').text();
	mockLabels.QuestionNumber=$(xml).find('QuestionNumber').text();
	$('#grpInstruTimer').text(mockLabels.grpInstruTimer);
	$('.QuestionNumber').text(mockLabels.QuestionNumber);
	$('#name').html($(xml).find('Name').text());
	$('#profilePop').html($(xml).find('Profile').text());
	$('#profileClose').html($(xml).find('close').text());	
	$('.popCloseSubmitWarning').text($(xml).find('close').text());
	$('#login').html($(xml).find('Login').text());
	$('.previousBtn').val($(xml).find('Previous').text());
	$('#Instruction1').html($(xml).find('Instructions').text());
	$('#closeInstru').html($(xml).find('close').text());
	mockLabels.sectionSummary = $(xml).find('SubmitGroupFinal').text();
	mockLabels.sectionSummary1 = $(xml).find('ConfirmofSubmittingExam').text();
	if(!isLoginIdConfigured){
		$('.loginName').html($(xml).find('Login').text());
	}else{
		$('.loginName').html(mockVar.loginLabel);
	}
	$('#questionP').html($(xml).find('QuestionPaper').text());
	$('#questionPclose').html($(xml).find('close').text());
	$('#chooseQuestion').html($(xml).find('ChooseaQuestion').text());	
	
	//Recording Labels
	$('.recordedAudioSpan').html($(globalXmlvar).find('recordedAudioSpan').text());
	$('#audioRecordingStartClickMessage').html($(globalXmlvar).find('audioRecordingStartClickMessage').text());
	$('#audioRecordingFailureMessage').html($(globalXmlvar).find('audioRecordingFailureMessage').text());
	$('.timerText').html($(globalXmlvar).find('timerText').text());
	$('.mmssSpan').html($(globalXmlvar).find('mmssSpan').text());
	$('.start-recording').html($(globalXmlvar).find('startRecording').text());
	$('#stop-recording').html($(globalXmlvar).find('stopRecording').text());
	$('#pause-recording').html($(globalXmlvar).find('pauseRecording').text());
	
	$('#resume-recording').html($(globalXmlvar).find('resumeRecording').text());
	$('#save-recording').html($(globalXmlvar).find('saveRecording').text());
	$('.recordedVideoSpan').html($(globalXmlvar).find('recordedVideoSpan').text());
	$('#videoRecordingStartClickMessage').html($(globalXmlvar).find('videoRecordingStartClickMessage').text());
	$('#videoRecordingFailureMessage').html($(globalXmlvar).find('videoRecordingFailureMessage').text());
	$('#recordingSavedSuccesfully').html($(globalXmlvar).find('recordingSavedSuccesfully').text());
	//new 
	$('#scrollToTop').attr('title',$(xml).find('scrollToTop').text());
	$('#scrollToBottom').attr('title',$(xml).find('scrollToBottom').text());
    //$('#maxalert').html($(xml).find('maxalert').text());
    $('#copyContent').attr('title',$(xml).find('copyContent').text());
    $('#changeEditor').attr('title',$(xml).find('changeEditor').text());
    $('#changeTextArea').attr('title',$(xml).find('changeTextArea').text());
    $('.maximizeicon').attr('title',$(xml).find('maximizeIcon').text());
    $('.clickToSelectMarker').attr('title',$(xml).find('clickToSelectMarker').text());
    $('.clickToSelectEraser').attr('title',$(xml).find('clickToSelectEraser').text());
    $('.clearTxt').html($(xml).find('clear').text());
    $('.clickToSelectMarker').html($(xml).find('marker').text());
    $('.clickToSelectEraser').html($(xml).find('eraser').text());
    $('.selectWidthOfTool').attr('title',$(xml).find('widthOfTool').text());
    $('.fileUpdBrowse').attr('placeholder',$(xml).find('chooseFile').text());
    $('#addFile').html($(globalXmlvar).find('addFile').text());
    $('#fileOnly').html($(globalXmlvar).find('fileOnly').text());
    $('#maxSize').html($(globalXmlvar).find('maxSize').text());
    $('#scientificText').html($(globalXmlvar).find('scientificText').text());
    $('#normalText').html($(globalXmlvar).find('normalText').text());
    $('#nextImage').attr('title',$(xml).find('nextImage').text());
    $('#prevImage').attr('title',$(xml).find('prevImage').text());
    $('.infoLabel').html($(globalXmlvar).find('info').text());
    $('.popClose').html($(xml).find('close').text());
    $('.Ok').html($(xml).find('Ok').text());
    $('.processing').html($(xml).find('processing').text());
    $('#warning').html($(xml).find('warning').text());
}

function loadIndexLabels(){
	var xmlFileName = 'English';
	if($('#languageSelect').val()!=null)
		xmlFileName = $('#languageSelect').val();
	xml = readAndReturnXML('LangXML/'+xmlFileName+'.xml');
	mockLabels.notMySystem = $(xml).find('NotMySystem').text();
	$('#LoginPageHeader').html($(xml).find('TestExpire3').text());
	$('#passwordLabel').html($(xml).find('GuestMode2').text());
	$('#changeLang').html($(xml).find('ChangeLanguage').text());
	$('#signInLabel').html($(xml).find('LoginPage4').text());
	$('#notMySystem').html($(xml).find('NameNotYours').text());
	$('#sysName').html($(xml).find('SystemName').text());
	$('#indexCandName').html($(xml).find('CandName').text());
	$('#subName').html($(xml).find('Subject').text());
	if(mockVar.storeCandResponse==1){	
		$('.candOriginalName').html(mockVar.candName);
		$('.candOriginalName').attr('title',mockVar.candName);
	}else{ 
		$('.candOriginalName').html(mockVar.mockCandidateName);
		$('.candOriginalName').attr('title',mockVar.mockCandidateName);

	}
}

function loadInstruLabels(){
	getCookie(true);
	var assessmentId;
	if(document.URL.indexOf("instructions.html?") >= 0){
		assessmentId = document.URL.split("instructions.html?")[1].split("@@")[1];
	} else {
		assessmentId = $.cookie("assessmentId");
	}
	//if(document.URL.split("instructions.html?")[1].split("@@")[1].indexOf("M") == -1)
	if(assessmentId.indexOf("M") == -1)
		getCandIdFromCookie();
	var xmlFileName="",xml;
	$('#languageSelect').val(mockVar.langName);
	xmlFileName = mockVar.langName;
	xml = readAndReturnXML('LangXML/'+xmlFileName+'.xml');
	$('#nextTxt').text($(xml).find('Next').text());
	mockLabels.next = $(xml).find('Next').text();
	mockLabels.previous = $(xml).find('Previous').text();
	$('#readylink font').text($(xml).find('ReadyToBegin').text());
	$('#defLang').text($(xml).find('ChooseYourDefaultLanguage').text());
	$('#multiLangInstru').text($(xml).find('DefaultLanguageMessage').text());
	$('#iframeId').contents().find('.viewIn').html($(xml).find('ViewIn').text());
	$('.sysInstruLabel').html($(xml).find('Instructions').text());
	$('.otherInstruLabel').html($(xml).find('OtherImportantInstructions').text());
	$('#iframeId').contents().find('.otherInstruLabel').html($(xml).find('OtherImportantInstructions').text());
	$("#footer").html("Version : " +consoleVersion+"</div>");
	if(assessmentId.indexOf("M") == -1){
		$('.candOriginalName').html(mockVar.candName);
		document.title = 'Instructions - Assessment Center';
	}
	else{
		document.title = 'Instructions - Assessment Examination Center';
	}
	mockLabels.chooseDefaultLangErr = $(xml).find('defaultLanguageAlert').text();
	mockLabels.acceptDisclaimerMessage = $(xml).find('acceptDisclaimerMessage').text();
	$('#readylink').html($(xml).find('ReadyToBegin').text());
	$('.popClose').html($(xml).find('close').text());
    $('.infoLabel').html($(xml).find('info').text());
	$('.info').html($(xml).find('info').text());
	$('.Ok').html($(xml).find('Ok').text());
}

function feedbackPageLabel(){
	getCookie(true);
	var xmlFileName="",xml;
	$('#languageSelect').val(mockVar.langName);
	xmlFileName = mockVar.langName;
	xml = readAndReturnXML('LangXML/'+xmlFileName+'.xml');
	globalXmlvar=xml;
	$('#feedbackDiv h2 u').html($(xml).find('CandidateFeedbackForm').attr('Header'));
	$('#feedbackText').html($(xml).find('CandidateFeedbackForm').text());
	$('#header1').html($(xml).find('CandidateFeedbackForm').attr('TableHeader1'));
	$('#header2').html($(xml).find('CandidateFeedbackForm').attr('TableHeader2'));
	$('#header3').html($(xml).find('CandidateFeedbackForm').attr('TableHeader3'));
	$('#ques1').html($(xml).find('CandidateFeedbackQuestion1').text());
	$('#ques2').html($(xml).find('CandidateFeedbackQuestion2').text());
	$('#ques3').html($(xml).find('CandidateFeedbackQuestion3').text());
	$('#ques31').html($(xml).find('CandidateFeedbackQuestion3a').text());
	$('#ques32').html($(xml).find('CandidateFeedbackQuestion3b').text());
	$('#ques33').html($(xml).find('CandidateFeedbackQuestion3c').text());
	$('#ques34').html($(xml).find('CandidateFeedbackQuestion3d').text());
	$('#ques35').html($(xml).find('CandidateFeedbackQuestion3e').text());
	$('#ques36').html($(xml).find('CandidateFeedbackQuestion3f').text());
	$('#ques4').html($(xml).find('CandidateFeedbackQuestion4').text());
	$('.exceedExpect').text($(xml).find('CandidateFeedBackOptions').attr('CandidateFeedBackOption1'));
	$('.metExpect').text($(xml).find('CandidateFeedBackOptions').attr('CandidateFeedBackOption2'));
	$('.needImprove').text($(xml).find('CandidateFeedBackOptions').attr('CandidateFeedBackOption3'));
	$('.failedExpect').text($(xml).find('CandidateFeedBackOptions').attr('CandidateFeedBackOption4'));
	$('#submit').text($(xml).find('Submit').text());
	$('.info').text($(xml).find('info').text());
	$('#feedBackHeader').text($(xml).find('CandidateFeedbackForm').attr('Header'));
	if(mockVar.storeCandResponse==1){
		$('.candOriginalName').html(mockVar.candName);
		$('.candOrigName').html(mockVar.candName);
		$('.candOriginalName').attr('title',mockVar.candName);
		document.title = 'Feed Back - Assessment Center';
	}
	else{
		$('.candOriginalName').html(mockVar.mockCandidateName);
		$('.candOrigName').html(mockVar.mockCandidateName);
		document.title = 'Feed Back - Assessment Examination Center';
	}
	$("#footer").html("Version : " +consoleVersion+"</div>");
	$('#feedbackClose').html($(xml).find('close').text());
	$('.Ok').html($(xml).find('Ok').text());
	mockLabels.sectionSummary = $(xml).find('SubmitGroupFinal').text();
	mockLabels.feedbackSubmitMsgExam=$(xml).find('FeedBackThanks').text();

}

function loadClosePageLabel(){
	getCookie(true);
	var xmlFileName="",xml;
	$('#languageSelect').val(mockVar.langName);
	xmlFileName = mockVar.langName;
	xml = readAndReturnXML('LangXML/'+xmlFileName+'.xml');
	globalXmlvar=xml;
	if(mockVar.storeCandResponse==0){
		$('#closeMsg').html($(xml).find('ClosePageMessage').text());
		$('#closeBtn').val($(xml).find('ClosePageMessage').attr('CloseBtnText'));
		$("#closeBtn").attr("title",$(xml).find('ClosePageMessage').attr('CloseBtnText'));
		document.title = 'Exit Page - Assessment Examination Center';
	}
	else{
		document.title = 'Exit Page - Assessment Center';
		$('#closeMsg').html($(xml).find('ClosePageMessageOA').text());
		$('#closeBtn').val($(xml).find('ClosePageMessageOA').attr('CloseBtnText'));
		$("#closeBtn").attr("title",$(xml).find('ClosePageMessageOA').attr('CloseBtnText'));
	}
	$("#footer").html("Version : " +consoleVersion+"</div>");
	$('.noteToCloseWindowMessage').html($(xml).find('noteshiftEsc').text());
	//$('.noteToCloseWindow').html($(xml).find('Note').text());
}

function selIndexLang(langVal){
	mockVar.langName = langVal;
	loadIndexLabels();
}

function selLang(langVal){
	mockVar.langName = langVal;
	loadIndexLabels();
	loadLabel();
	if(mockVar.curQuesBean.quesType == "SA" && mockVar.curQuesBean.keyboardType=="Alphanumeric"){
		word_count();
		wordCountCheck();
		word_countGroup();
		wordCountCheckGroup();
	}
	var AuditJsonObject = new Object();
	AuditJsonObject.ActionName = "Screen Label Language Change";
	var auditDesc = "Screen Label language changes to "+langVal;
	AuditJsonObject.ActionDesc = auditDesc;
	AuditJsonObject.GroupId = "NA";
	AuditJsonObject.SectionId = "NA";
	AuditJsonObject.QuestionId = "NA";
	AuditJsonObject.candidateName = $.cookie("username");
	AuditJsonObject.loginId = $.cookie("loginId");
	AuditJsonObject.OptionSequence = "NA";
	var currentDate = new Date();
	AuditJsonObject.Time = currentDate.yyyymmddHHmmss();
	AuditJsonObject.SelectedOptionId = "NA";
	AuditJson.push(AuditJsonObject);
	if((iOAP.secDetails.length == 1 && iOAP.secDetails[iOAP.curSection].questions.length == 1) || ((iOAP.secDetails[iOAP.curSection].groupAllQuestions != "undefined" && iOAP.secDetails[iOAP.curSection].groupAllQuestions != "" && iOAP.secDetails[iOAP.curSection].groupAllQuestions == "true") && iOAP.secDetails.length == 1)){
		$(".underreview").attr("title",mockLabels.btnMarkForReview);
		$(".savenext").attr("title",mockLabels.btnSave);
		$(".savenextGroup").attr("title",mockLabels.btnSave).val(mockLabels.btnSave);
	}
	else if(iOAP.secDetails[iOAP.curSection].secType.toUpperCase()=="OFFLINE"){
		$(".savenextGroup").attr("title",mockLabels.nextQ).val(mockLabels.nextQ);
	}else{
		$(".underreview").attr("title",mockLabels.btnMarkForReviewAndNext);
		$(".savenext").attr("title",mockLabels.btnSaveNext);
		$(".savenextGroup").attr("title",mockLabels.btnSaveNext).val(mockLabels.btnSaveNext);
	}
	showModule('profileDiv');
	activeLink('viewProButton');
	if (jQuery(window).width() > 1000) {
		quizPageHeight();
	} else {
		setDIVHeight_resp(); 
	}
}

function selViewLang(langVal){
	mockVar.langName = langVal;
}

function setCookie(viewInLang){
	var date = new Date();
	date.setTime(date.getTime()+(5*60*1000));
	var expires = "; expires="+date.toGMTString();
	document.cookie = "viewLangName="+viewInLang+expires+"; path=/";
}

function setCandCookie(){
	var entityId = "1";
	var candId = "123456";
	var checkSum = "password";
	var candName = "Candidate Name";
	document.cookie = "entityId="+entityId;
	document.cookie = "app_seq_no="+candId;
	document.cookie = "checksum="+checkSum;
	document.cookie = "username="+candName;
	document.cookie = "path=/";
}

function getCandIdFromCookie(){
	//setCandCookie();
	var i,x,y,defLang="",langName="",candId="11111",candMasterId="",qpId="",candName = " ",candidate_Id="",subscribedFor = '',questionType = "",ARRcookies=document.cookie;
	if(ARRcookies != null && ARRcookies!=""){
		ARRcookies = ARRcookies.split(";");
		for (i=0;i<ARRcookies.length;i++){
			x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
			y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
			x=x.replace(/^\s+|\s+$/g,"");
			if (x=="defaultLang"){
				defLang = y;
				if(typeof(sessionStorage.defaultLang) != "undefined"){
					defLang = sessionStorage.defaultLang;
				}
			}else if (x=="viewLangName"){
				langName = y;
			}else if (x=="app_seq_no"){
				candId = y;
			}else if (x=="cand_master_id"){
				candMasterId = y;
			}else if (x=="qp_id"){
				qpId = y;
			}else if (x=="username"){
				candName = y;
			}else if (x=="subscribed_for"){
				subscribedFor = y;
			}  else if(x == "xmlFilePath"){
				xmlFilePath = y;
			}
			else if (x=="candidate_Id"){
				candidate_Id = y;
			}
			else if (x=="consoleVersion"){
				consoleVersion = y;
			}else if (x=="noOfInterruptions"){
				noOfInterruptions = y;
			}else if (x=="questionType"){
				questionType = y;
			}
			else if (x=="loginId"){
				loginId = $.cookie("loginId");
			}
			else if (x=="emailId"){
				emailId =$.cookie("emailId");
			}
			else if (x=="dob"){
				dob = $.cookie("dob");
			}
			else if (x=="photographPath"){
				photographPath = $.cookie("photographPath");
			}
			else if (x=="mobileNum"){
				mobileNum = $.cookie("mobileNum");
			}
			else if (x=="scribeExtraTime"){
				scribeExtraTime = y;
			}
			else if (x=="allowZoom"){
				allowZoom = y;
			}
			else if (x=="candidateExtraTime"){
				candidateExtraTime = y;
			}
			else if (x=="verifiedPhotoPath"){
				verifiedPhotoPath = $.cookie("verifiedPhotoPath");
			}
		}
	}else{
		window.location.href="error.html?E103"+((document.cookie.indexOf('isApp=true')>= 0)?"isApp":"")+((document.cookie.indexOf('isLauncher=true')>= 0)?"isLauncher":"");
	}
	if((defLang != null && defLang != "") || (langName != null || langName != "") || (candId != null || candId != "")){
		//delete_cookie('qp_id');
		iOAP.defaultLang = unescape(defLang);
		mockVar.langName = (langName != null && langName != "")?unescape(langName):"English";
		mockVar.candId = unescape(candId);
		mockVar.candidate_Id=unescape(candidate_Id);
		mockVar.version=consoleVersion;
		mockVar.candMasterId = unescape(candMasterId);
		mockVar.qpId = unescape(qpId);
		if(typeof(sessionStorage.username) != "undefined"){
			mockVar.candName = sessionStorage.username;
		}else{
			mockVar.candName = (unescape(candName).replace(/\"/g, ''));
		}
		mockVar.subscribedFor = typeof(subscribedFor)=='undefined'?"":unescape(subscribedFor);
		mockVar.questionType = unescape(questionType);
	}else{		
		window.location.href="error.html?E103"+((document.cookie.indexOf('isApp=true')>= 0)?"isApp":"")+((document.cookie.indexOf('isLauncher=true')>= 0)?"isLauncher":"");
	}
	if(mockVar.storeCandResponse==1 && (typeof(mockVar.qpId)=='undefined' || mockVar.qpId=='')){
		window.location.href="error.html?E103"+((document.cookie.indexOf('isApp=true')>= 0)?"isApp":"")+((document.cookie.indexOf('isLauncher=true')>= 0)?"isLauncher":"");
	}
}

var delete_cookie = function(name) {
	var date = new Date();
	date.setTime(date.getTime()+(5*60*1000));
    document.cookie = name + '=;expires='+date+';';
};

function getCandName(){
	//setCandCookie();
	//var defLang="",langName="",candId="";
	var i,x,y,candName = "",ARRcookies=document.cookie;
	if(ARRcookies != null && ARRcookies!=""){
		ARRcookies = ARRcookies.split(";");
		for (i=0;i<ARRcookies.length;i++){
			x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
			y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
			x=x.replace(/^\s+|\s+$/g,"");
			if (x=="username" && y!=null && y!=""){
				candName = y;
			}
		}
	}
	mockVar.candName = unescape(candName);
	//if(mockVar.storeCandResponse == 1 && (mockVar.candName == null || mockVar.candName == "" || mockVar.candName == "John Smith")){		
	//	window.location.href="error.html?E111";
	//}
}

function saveCandResponse(action){
	var defaultLanguage = '';
	for(var i=0;i<mockVar.languages.length;i++){
		if(mockVar.languages[i]!=null && typeof(mockVar.languages[i])!='undefined'){
			defaultLanguage = i;
			break;
		}
	}
	result.mockId = mockVar.mockId;
	result.orgId = mockVar.orgId;
	result.candidateId = mockVar.candMasterId;
	result.candMasterId = mockVar.candMasterId;
	result.qpId = mockVar.qpId;
	result.attemptId = mockVar.attemptId;
	result.useDefaultReportFormat=mockVar.useDefaultReportFormat;
	result.mockName=mockVar.mockName;
	result.subscribedFor = mockVar.subscribedFor;
	result.isMarkedForReviewConsidered=mockVar.isMarkedForReviewConsidered;
	//result.systemParameters=mockVar.systemParameters;var queno=0,quesStatus = "";
	var quesLangId=0,totalQues = 0,currentGroup=0,obtainedMarks=0;
	var ques = "",  GWPM = 0, NWPM = 0, accuracy = 0;
	for(var groupNo=0;groupNo<mockVar.groups.length;groupNo++){
		GWPM = 0, NWPM = 0, accuracy = 0;
		currentGroup = mockVar.groups[groupNo];
		if(currentGroup.isTypingGroup){
			typingGrpObj = mockVar.typingGroup[groupNo];
			GWPM = typingGrpObj.GWPM;
			NWPM = typingGrpObj.NWPM;
			accuracy = typingGrpObj.accuracy;
		}
		for(var i=0;i<currentGroup.secDetails.length;i++){
			totalQues = currentGroup.secDetails[i].questions.length;
			for(var j=0;j<totalQues;j++){
				ques = currentGroup.secDetails[i].questions[j];
				quesLangId = typeof(eval(ques.quesParam.langID))=='undefined' ? defaultLanguage : eval(ques.quesParam.langID);
				obtainedMarks = eval(calculateScore(ques,ques.quesParam.status));
				result.questions.push(new QuestionResultBean(ques.quesId,ques.quesType,quesLangId,ques.quesParam.selectedOptId,ques.quesParam.answer,obtainedMarks,ques.quesAnsStatus,GWPM,NWPM,accuracy));
			}
			result.secDetails.push(currentGroup.secDetails[i]);
		}
		result.groups.push(currentGroup);
		if(groupNo + 1 == mockVar.groups.length){
			if(!isFinalSubmitStarted){
				sendResponseToServlet(action);
			}
		}
	}
}

/*function sendResponseToServlet(){
	var jsonString = JSON.stringify(result);
	$('#pWait').show();
	$.post(
		mockVar.candResponseUrl,
		{para : "storeMockResult@#param_sep#@"+jsonString},
		function(data) {
			alert(data.ERROR);
			$('#pWait').hide();
			if(data.ERROR.toString().indexOf('Exam has been submitted successfully.')!=-1){
				moveToScoreCardDisplay();
			}else{
				window.close();
			}
		}
	,"json");
}*/
var DataError;
function sendResponseToServlet(action){
	//var jsonString = JSON.stringify(result);
	isfinalSubmit = true;
	isFinalSubmitStarted=true;
	isPageRedirecting = true;
	var jsonString = JSON.stringify(mockVar);
	$('#pWait').show();
	$.post(
			mockVar.candResponseUrl,
			{para : "storeBackup@#param_sep#@"+jsonString+"@#param_sep#@"+"true@#param_sep#@"+authenticationKey},
			/*{para : "storeBackup@#param_sep#@"+jsonString+"@#param_sep#@true"},*/
			function(data) {
				isfinalSubmit = true;
				DataError = data;
				cnfPop('submitOnlineAssessment');
				if(typeof(globalXmlvar) != "undefined" && globalXmlvar!=''){
					mockLabels.submitMsg = $(globalXmlvar).find('AssessmentSubmittedSuccessfully').text();
					if(DataError.ERROR.indexOf('Assessment has been submitted successfully.')!=-1){
						$("#submitOnlineMsg").html(action+" "+mockLabels.submitMsg);
					}else{
						$("#submitOnlineMsg").html(action+" "+DataError.ERROR);
					}
				}
				else{
					$("#submitOnlineMsg").html(action+" "+DataError.ERROR);
				}

				$('#pWait').hide();
			}
			,"json")
			.fail(function(){
				$('#pWait').hide();
				cnfPop('backupAlerts');
				$("#backupAlertMsg").html("Assessment is not submitted because of network failure. Check your internet connectivity ");
				$('#backupAlertMsgWindowClose').hide();
			});
}

function submitOnlineAssessment(){
	if(DataError.ERROR.indexOf('Assessment has been submitted successfully.')!=-1){
		if(mockVar.displayScoreCard){
			var curDate=new Date();
			if(resultPublishDate!=0){
				var ResultDate=new Date(resultPublishDate);
				if(curDate>=ResultDate){
					showScoreCardForOnlineAssessment(DataError.scoreCardJson, DataError.CutOFFMarks, DataError.TotalMarks,DataError.launchKey);
				}
				else{
					moveToFeedback();	
				}
			}
			else{
				showScoreCardForOnlineAssessment(DataError.scoreCardJson, DataError.CutOFFMarks, DataError.TotalMarks,DataError.launchKey);
			}
		}
		else{
			moveToFeedback();	
		}
	}else{
		
		if((document.cookie.indexOf('isApp=true')>= 0) ? true : false){
			window.location.href = "close.html?"+mockVar.orgId +"@@"+mockVar.mockId+"@@"+mockVar.subscribedFor+"#isApp"+(document.cookie.indexOf('isLauncher=true')>= 0) ? "isLauncher" : "";
		}else
		window.close();
	
	}
	DataError="";
}

var missedCount = 0;
function saveBackUp(isRecursionRequired){
	saveJwplayerParam();
	if(iOAP.secDetails[iOAP.curSection].groupAllQuestions!==undefined && iOAP.secDetails[iOAP.curSection].groupAllQuestions!=="" && iOAP.secDetails[iOAP.curSection].groupAllQuestions == "true")
		saveGrpAllAns();
	var jsonString = JSON.stringify(mockVar);
	var extraString="";
	if(resumeFirstBackUp)
	extraString="@#param_sep#@true";
	//$('#pWait').show();
	if(!isFinalSubmitStarted){
	if(mockVar.storeCandResponse==1){
		$.post(
				mockVar.candResponseUrl,
				{para : "storeBackup@#param_sep#@"+jsonString+"@#param_sep#@"+"false@#param_sep#@"+authenticationKey+extraString},
				//{para : "storeBackup@#param_sep#@"+jsonString+"@#param_sep#@"+"false"},
				function(data) {
					if(resumeFirstBackUp && data != null && data.RingTheBellTimeLeft !=null  && data.RingTheBell!=null){
						ringTheBellTimeLeft=parseInt(data.RingTheBellTimeLeft);
						ringTheBell=data.RingTheBell+''=='Yes'?true:false;
						
						if(ringTheBell && mockVar.time>ringTheBellTimeLeft){
						clearTimeout(mockVar.timeCounter);
						mockVar.time=ringTheBellTimeLeft;
						timer();
						}
						
					}
					//Added for extra time and zoom by sai 
					if(data!=null && data.scribeExtraTime!=null){
						scribeExtraTime=data.scribeExtraTime;
						if(parseFloat(scribeExtraTime)>0){
							divideScribeTimeForGroups(true);
						}
					}
					if(data!=null && data.candidateExtraTime!=null){
						candidateExtraTime=data.candidateExtraTime;
						if(parseFloat(candidateExtraTime)>0){
							divideScribeTimeForGroups(false);
						}
					}
					if(data!=null && data.allowZoom!=null){
						allowZoom=data.allowZoom;
						if(parseInt(allowZoom)==1){
							$('.zoomin-icon-container').css('display','inline-block');
							$('.zoomout-icon-container').css('display','inline-block');
						}else if (mockVar.zoom==0){
							$('.zoomin-icon-container').hide();
							$('.zoomout-icon-container').hide();
						}
					}
					//ends
					if(data!=null && data.submitAllCandidatesOnTime != null && data.submitAllCandidatesOnTime != 'no'){
						isfinalSubmit = true;
						isFinalSubmitStarted = true;
						DataError = data;
						cnfPop('submitOnlineAssessment');
						$("#submitOnlineMsg").html(data.submitMessage);
					}
					else  if(data != null && data.ERROR != null){
						isfinalSubmit = true;
						cnfPop('backupAlerts');
						$("#backupAlertMsg").html(data.ERROR);
						$('#backupAlertMsgWindowClose').hide();
					}
					else if(data!=null && data.Fail != null && data.Fail != '') {
						missedCount++;
					}
					else{
						missedCount = 0;
					}
					resumeFirstBackUp=false;
				}
				,"json")
				.fail(function(){
					missedCount++;
				});
		if(missedCount==2){
			isfinalSubmit = true;
			cnfPop('backupAlerts');
			$("#backupAlertMsg").html($(globalXmlvar).find('CouldNotConnectToServer').text());
			$('#backupAlertMsgWindowClose').hide();
		}
}
		if((mockVar.backupTimeInterval>0 && isRecursionRequired) || mockVar.storeCandResponse==0 ){
			setTimeout(function(){
				if(!isFinalSubmitStarted)
					saveBackUp(isRecursionRequired);},30000);
		}
	}
}
function onLoadBackup(){
	var jsonString = JSON.stringify(mockVar);
	var URL = '/ASM/MockCandResponseHandler';
	$('#pWait').show();	
	if(!isFinalSubmitStarted){
		$.ajaxSetup({
			async: false
		});
		$.post(
				URL,
				{para : "storeBackup@#param_sep#@"+jsonString+"@#param_sep#@"+"false@#param_sep#@"+authenticationKey+"@#param_sep#@true"},
				/*{para : "storeBackup@#param_sep#@"+jsonString+"@#param_sep#@true"},*/
				function(data) {
					$.ajaxSetup({
						async: true
					});
					if(data != null && data.RingTheBellTimeLeft !=null  && data.RingTheBell!=null){
						ringTheBellTimeLeft=parseInt(data.RingTheBellTimeLeft);
						ringTheBell=data.RingTheBell+''=='Yes'?true:false;
						
						if(ringTheBell && mockVar.time>ringTheBellTimeLeft){
						clearTimeout(mockVar.timeCounter);
						mockVar.time=ringTheBellTimeLeft;
						timer();
						}
						
					}
					if(data != null && data.ERROR != null){
						isfinalSubmit = true;
						$('#pWait').hide();
						cnfPop('backupAlerts');
						$("#backupAlertMsg").html(data.ERROR);
						$('#backupAlertMsgWindowClose').hide();
					}
					else if(data!=null && data.Fail != null && data.Fail != '') {
						$('#pWait').hide();
						cnfPop('backupAlerts');
						$("#backupAlertMsg").html($(globalXmlvar).find('PleaseRelaunchTheAssessment').text());
						$('#backupAlertMsgWindowClose').hide();

					}
					else if(data!=null && data.BackUpStatus != null && data.BackUpStatus != 'success') {
						$('#pWait').hide();
						cnfPop('backupAlerts');
						$("#backupAlertMsg").html($(globalXmlvar).find('PleaseRelaunchTheAssessment').text());
						$('#backupAlertMsgWindowClose').hide();
					}
					else if(data!=null && data.candidateExtraTime!=null){
						$('#pWait').hide();	
						candidateExtraTime=data.candidateExtraTime;
						if(parseFloat(candidateExtraTime)>0){
							divideScribeTimeForGroups(false);
						}
					}
					else{
						$('#pWait').hide();	
					}
					if(mockVar.backupTimeInterval>0){
						setTimeout(function(){
							if(!isFinalSubmitStarted)
								saveBackUp(true);},10000);
					}
				}
				,"json")
				.fail(function(){
					$('#pWait').hide();
					cnfPop('backupAlerts');
					$("#backupAlertMsg").html($(globalXmlvar).find('PleaseRelaunchTheAssessment').text());
					$('#backupAlertMsgWindowClose').hide();
				});
	}
} 


function compileCode(){
	if($.trim(editor.getValue()).length!=0){
	//isfinalSubmit = true;
	cnfPop('InfoPopup');
	$("#infoMsg2").html(mockLabels.compileAlertMsg);
		mockVar.curQuesBean.programingStatus = 'CompiledSuccess';
		compileSuccessMsg();
		if (jQuery(window).width() > 1000) {
        quizPageHeight();
    } else {
         setDIVHeight_resp(); 
     }
	}
}

function executeCode(){
	if($.trim(editor.getValue()).length!=0){
//	isfinalSubmit = true;
	cnfPop('InfoPopup');
	$("#infoMsg2").html(mockLabels.executionAlertMsg);
		fnSubmit('submitPrograming');
		mockVar.curQuesBean.programingStatus = 'ExecutedSuccess';
		executionSuccessMsg();
		if (jQuery(window).width() > 1000) {
        quizPageHeight();
    } else {
         setDIVHeight_resp(); 
     }
	}
}

function executionSuccessMsg(){
	$("#progStatusDisplay").show();
	$("#statusText").html(mockLabels.executionSuccess);
	$("#TestCaseReport").show();
	$("#maximg").show();
}
function compileSuccessMsg(){
	$("#progStatusDisplay").show();
	$("#statusText").html(mockLabels.compileSuccess);
	$("#maximg").hide();
}

function copyCode(){
	if($.trim(editor.getValue()).length!=0){
	cnfPop('InfoPopup');
	$("#infoMsg2").html("In actual exam you will be able to copy the content in the editor to paste in the debugger");
		if (jQuery(window).width() > 1000) {
        quizPageHeight();
    } else {
         setDIVHeight_resp(); 
     }
	}
}

function openHintPopUp(obj){
	$('.hintDiv').css('left', $(obj).position().left-5);
	$('.hintDiv').css('top', $(obj).position().top+32);
	playUsefulDataVideo();
	$('.hintDiv').show();
}

function closeHintPopup(){
	$('.hintDiv').hide();
}
//** Audit Log **//
var currentGroupIndex = 0;
var currentSectionIndex = 0;
var currentQuestionIndex = 0;

function getCurrentGrpSecQuestId(isAudilogRequired,quesNo){
	var auditDesc = "";
	currentGroupIndex = mockVar.currentGrp;
	currentSectionIndex = iOAP.curSection;
	currentQuestionIndex = iOAP.curQues;
	if(isPageLoaded){
		isPageLoaded = false;
		//timeSpentOnQuestionLevel();
	}
	if(isAudilogRequired){
		auditDesc = "Question "+(quesNo + 1)+" visited from question pallete";
		currentQuestionIndex = quesNo;
		auditlogCreation("Question Pallete",auditDesc,"");
	}
}

jQuery(document).ready(function(){
	jQuery(".auditlog").click(function(event) {
		var id = event.target.id;
		var value = jQuery("#"+id).val();
		auditlogCreation(value,"",id);

	});
	jQuery(".auditlogButton").click(function(event){
		var id = event.target.id;
		var value = jQuery("#"+id).text();
		if(value == "")
			value = jQuery("#"+id).val();
		if(id=="finalTypingSub"){
			try{
				if(mockVar.groups[mockVar.currentGrp].secDetails[iOAP.curSection].secType == "TYPING"){
					auditlogCreation(value,value+" button clicked",value);
				}
			} catch(err){
			}
		}	
		var AuditJsonObject = new Object();
		var orgId = 0;
		var attemptId = 0;
		var mockId = 0;
		var candMasterId = 0;
		var buttonStatus = false;
		AuditJsonObject.ActionName = value;
		AuditJsonObject.RecordNumber = auditRecordNumber++;
		AuditJsonObject.candidateName = $.cookie("username");
		AuditJsonObject.loginId = $.cookie("loginId");
		if(id == "submit"){
			var url = document.URL;
			AuditJsonObject.ActionDesc = "Feedback submit button clicked";
			var params = url.split("FeedBack.html?");
			orgId = $.trim(params[1]).split("@@")[0];
			mockId = $.trim(params[1]).split("@@")[1];
			candMasterId = $.trim(params[1]).split("@@")[2];
			attemptId = $.trim(params[1]).split("@@")[3];
			if(attemptId.indexOf("#") > 0 )
				attemptId = attemptId.substring(0,attemptId.indexOf("#"));
			buttonStatus = true;
		}
		else {
			AuditJsonObject.ActionDesc = value+" button clicked";
			orgId = mockVar.orgId;
			mockId = mockVar.mockId;
			candMasterId =mockVar.candMasterId;
			attemptId = mockVar.attemptId;
			buttonStatus = false;
		}
		if(value == "Submit")
			AuditJsonObject.GroupId = mockVar.groups[mockVar.currentGrp].groupId;
		else
			AuditJsonObject.GroupId = "NA";
		AuditJsonObject.SectionId = "NA";
		AuditJsonObject.QuestionId = "NA";
		AuditJsonObject.SelectedOptionId = "NA";
		AuditJsonObject.OptionSequence = "NA";
		var currentDate = new Date();
		AuditJsonObject.Time = currentDate.yyyymmddHHmmss();
		AuditJson.push(AuditJsonObject);
		if(id == "submit" || value == "Submit"){
			buttonStatus = true;
			auditLogBackUp(buttonStatus,candMasterId,attemptId,mockId,orgId);
		}
	});
	/*jQuery(".allSections").click(function(event){
	});*/
});

function auditlogCreation(id,auditDesc,idName){
	var k = 0;
	if(auditDesc == ""){
		auditDesc = id+" button clicked";
	} else {
	}
	//isGroupAllQuestions
	var currentSectionDetails = mockVar.groups[currentGroupIndex].secDetails[currentSectionIndex];
	//var	currentQuestionDetails = currentSectionDetails.questions[currentQuestionIndex];
	var	currentQuestionDetails;
	var questionParamData;
	var groupSecQuesIndex = 0;
	if(isGroupAllQuestions)
		groupSecQuesIndex = 0;
	else
		groupSecQuesIndex = currentQuestionIndex;
	var prevcomprehensionId = 0;
	for( groupSecQuesIndex;groupSecQuesIndex < currentSectionDetails.questions.length;groupSecQuesIndex++){
		currentQuestionDetails = currentSectionDetails.questions[groupSecQuesIndex];
		questionParamData = currentQuestionDetails.quesParam;
		var optionSequence = "";
		if((!isGroupAllQuestions) && (typeof(currentQuestionDetails.questionGroupAll) != "undefined" && (currentQuestionDetails.questionGroupAll == "true" && (prevcomprehensionId != 0 && currentQuestionDetails.comprehensionId != prevcomprehensionId)))){
			break;
		}
		var AuditJsonObject = new Object();
		if(typeof(questionParamData.RecordNumber) != "undefined")
			AuditJsonObject.RecordNumber = questionParamData.RecordNumber;
		AuditJsonObject.ActionName = idName;
		AuditJsonObject.ActionValue = id;
		AuditJsonObject.ActionDesc = auditDesc;
		AuditJsonObject.GroupId = mockVar.groups[currentGroupIndex].groupId;
		AuditJsonObject.SectionId = currentSectionDetails.secId;
		AuditJsonObject.QuestionId = currentQuestionDetails.quesId;
		AuditJsonObject.GroupIndex = currentGroupIndex;
		AuditJsonObject.SectionIndex = currentSectionIndex;
		AuditJsonObject.QuestionIndex = groupSecQuesIndex;
		AuditJsonObject.IsGroupALL = currentSectionDetails.groupAllQuestions;
		AuditJsonObject.candidateName = $.cookie("username");
		AuditJsonObject.loginId = $.cookie("loginId");
		var currentDate = new Date();
		AuditJsonObject.Time = currentDate.yyyymmddHHmmss();
		AuditJsonObject.quesType = currentQuestionDetails.quesType;
		AuditJsonObject.langID = questionParamData.langID;
		AuditJsonObject.status = questionParamData.status;
		AuditJsonObject.answer = questionParamData.answer;
		AuditJsonObject.isMarked=questionParamData.isMarked;
		if(typeof(currentQuestionDetails.timespent) != "undefined")
			AuditJsonObject.timespent = currentQuestionDetails.timespent;
		if(currentQuestionDetails.quesType == "MCQ" || currentQuestionDetails.quesType == "MSQ" ){
			var length = currentQuestionDetails.options.length;
			if(typeof(currentQuestionDetails.timespent) != "undefined"){
				AuditJsonObject.selectedAnswerList = currentQuestionDetails.selectedAnswerList;
				AuditJsonObject.selectedOptIdsList = currentQuestionDetails.selectedOptIdsList;
			}
			for(var i=0;i<length;i++){
				k = i + 1;
				optionSequence = optionSequence + k + ")"+ currentQuestionDetails.options[i].optId+" ";
				AuditJsonObject.OptionSequence = optionSequence;
			}
		}  else {
			AuditJsonObject.OptionSequence = "NA";	
		}
		AuditJsonObject.Status = currentQuestionDetails.quesParam.status;
		if(currentQuestionDetails.quesParam.status != "notanswered"){
			//AuditJsonObject.answer = currentQuestionDetails.quesParam.answer.replace(/,/g , "@_@");
			AuditJsonObject.answer = currentQuestionDetails.quesParam.answer;
			if(currentQuestionDetails.quesType == "MCQ" || currentQuestionDetails.quesType == "MSQ")
				AuditJsonObject.SelectedOptionId = currentQuestionDetails.quesParam.selectedOptId.replace(/,/g , "@_@");
			else {
				AuditJsonObject.SelectedOptionId = "NA";
			}
		} else {
			AuditJsonObject.SelectedOptionId = "NA";
		}
		AuditJson.push(AuditJsonObject);
		if((!isGroupAllQuestions) && (typeof(currentQuestionDetails.questionGroupAll) != "undefined" && (currentQuestionDetails.questionGroupAll == "false" && (currentQuestionDetails.comprehensionId  == 0 || currentQuestionDetails.comprehensionId != prevcomprehensionId)))){
			break;
		}
		else if((!isGroupAllQuestions) && (typeof(currentQuestionDetails.questionGroupAll) == "undefined" || currentQuestionDetails.questionGroupAll == "false")){
			break;
		}
		prevcomprehensionId = currentQuestionDetails.comprehensionId;
	}
}			


Date.prototype.yyyymmddHHmmss = function() {
	var yyyy = this.getFullYear().toString();
	var mm = (this.getMonth()+1).toString(); 
	var dd  = this.getDate().toString();
	var timeValue = this.getHours() +":"+this.getMinutes()+":"+this.getSeconds();
	return yyyy +"-"+ (mm[1]?mm:"0"+mm[0]) +"-"+ (dd[1]?dd:"0"+dd[0])+" "+timeValue; // padding
};			

jQuery(document).ready(function(){
	if(document.URL.indexOf("quiz.html") > 0){ 
		setTimeout(function(){
			auditLogBackUp(false,mockVar.candMasterId,mockVar.attemptId,mockVar.mockId,mockVar.orgId);
		},5000);
	}
});
function auditLogBackUp(isFinal,candMasterId,attemptId,mockId,orgId){
	var timeout = 0;
	if(!isFinal){
		timeout = 30000;
	}
	if(candMasterId == ""){
	}
	setTimeout(function(){
		dummyAuditJson = AuditJson;
		AuditJson = null;
		AuditJson = new Array();
		if(dummyAuditJson.length > 0 && mockVar.storeCandResponse == 1 ){
			var paramsvalue = {};
			getCookie(true);
			paramsvalue["auditJson"] = JSON.stringify(dummyAuditJson);
			paramsvalue["candMasterId"] = candMasterId;
			paramsvalue["attemptNo"] = attemptId;
			paramsvalue["orgId"] = orgId ;
			paramsvalue["mockId"] = mockId;
			if(typeof(sessionStorage.xmlFilePath) != "undefined")
				xmlFilePath = sessionStorage.xmlFilePath;
			paramsvalue["xmlFilePath"] = xmlFilePath;
			var URL = "/ASM/MockAssessmentAction.do?action=saveAuditLog";
			jQuery.ajax({
				url: URL,
				async: true,
				type: 'POST',
				data: paramsvalue,
				dataType: 'text',
				success: function(data) {
					if(data != "true"){
						cnfPop('backupAlerts');
						$("#backupAlertMsg").html(data);
						$('#backupAlertMsgWindowClose').hide();
					}			 
				}
			});
		} else {
			dummyAuditJson = null;
		}
		if(timeout != 0){
			auditLogBackUp(false,candMasterId,attemptId,mockId,orgId);
		}
	},timeout);
}


function maintainReadyAudit(){
	var url = document.URL;
	var AuditJsonObject = new Object();
	AuditJsonObject.ActionName = "I am ready to begin";
	AuditJsonObject.ActionDesc = "Selected "+jQuery("#defaultLanguage option:selected").text()+" as default language";
	AuditJsonObject.GroupId = "NA";
	AuditJsonObject.SectionId = "NA";
	AuditJsonObject.QuestionId = "NA";
	AuditJsonObject.SelectedOptionId = "NA";
	AuditJsonObject.OptionSequence = "NA";
	AuditJsonObject.candidateName = $.cookie("username");
	AuditJsonObject.loginId = $.cookie("loginId");
	var currentDate = new Date();
	AuditJsonObject.Time = currentDate.yyyymmddHHmmss();
	AuditJson.push(AuditJsonObject);
	var orgId="", mockId='',attemptId='', candMasterId='';
	if(url.indexOf("instructions.html?") >= 0){
		var params = url.split("instructions.html?");
		orgId = $.trim(params[1]).split("@@")[0];
		mockId = $.trim(params[1]).split("@@")[1];
		attemptId = $.trim(params[1]).split("@@")[2];
		candMasterId = $.trim(params[1]).split("@@")[3];
	} else if(url.indexOf("instructions.html") >= 0){
		orgId = $.cookie("orgId");
		mockId = $.cookie("assessmentId");
		attemptId = $.cookie("attemptId");
		candMasterId = $.cookie("cand_master_id");
	}
	if(candMasterId.indexOf("#") > 0)
		candMasterId = candMasterId.substring(0,candMasterId.indexOf("#"));
	auditLogBackUp(true,candMasterId,attemptId,mockId,orgId);
}


function saveSysConfig(orgId,mockId,candMasterId,attemptNo){
	//var systemParameters = systemConfigurationParameters;
	var systemParameters = $.cookie("systemParameters");
	var URL = "/ASM/MockAssessmentAction.do?action=saveSysConfig";
	var paramsvalue = {};
	paramsvalue["candMasterId"] = candMasterId;
	paramsvalue["attemptNo"] = attemptNo;
	paramsvalue["orgId"] = orgId ;
	paramsvalue["mockId"] = mockId;
	var systemConfigParameters = systemParameters;
	var x,y;
	var cookieValues = document.cookie.split(";");	
	if(cookieValues != null && cookieValues != ""){
		for (var i=0;i<cookieValues.length;i++){
			x=cookieValues[i].substr(0,cookieValues[i].indexOf("="));
			y=cookieValues[i].substr(cookieValues[i].indexOf("=")+1);
			x=x.replace(/^\s+|\s+$/g,"");
			if (x=="StateName"){
				systemConfigParameters.StateName = y;
			}else if (x=="StateShortName"){
				systemConfigParameters.StateShortName =  y;
			}else if (x=="CountryName"){
				systemConfigParameters.CountryName = y;
			}else if (x=="CountryShortName"){
				systemConfigParameters.CountryShortName =  y;
			}else if (x=="CityName"){
				systemConfigParameters.CityName = y;
			}else if (x=="CityShortName"){
				systemConfigParameters.CityShortName =  y;
			}
		}
	}
	//systemConfigParameters.ipAddress = ipAddress;
	paramsvalue["systemParameters"] = systemConfigParameters;
	jQuery.ajax({
		url: URL,
		async: true,
		type: 'POST',
		data: paramsvalue,
		dataType: 'text',
		success: function(data) {		 
		}
	});
} 

//var isOkClicked = false;
var focused = true;
var interruptionTimer = 10;
window.onblur = function(e) {
	if(allowInterruptions == "NO"){
		var AuditJsonObject = new Object();
		AuditJsonObject.ActionName = "Interruption Warning Message";
		AuditJsonObject.ActionDesc = "Assessment is interrupted";
		AuditJsonObject.GroupId = "NA";
		AuditJsonObject.SectionId = "NA";
		AuditJsonObject.QuestionId = "NA";
		AuditJsonObject.SelectedOptionId = "NA";
		AuditJsonObject.OptionSequence = "NA";
		AuditJsonObject.candidateName = $.cookie("username");
		AuditJsonObject.loginId = $.cookie("loginId");
		var currentDate = new Date();
		AuditJsonObject.Time = currentDate.yyyymmddHHmmss();
		AuditJson.push(AuditJsonObject);
		// var className = $(e.target).attr('class');
		//className = "."+className;
		e = e || window.event;
		var isPlayer = false;
		var className = $(e.target).attr('class');
		if(typeof(className) != 'undefined' && className.indexOf("jp-") >=0){
			isPlayer = true;
			isfinalSubmit = true;
		}
		var url = document.URL;
		setTimeout(function(){
			if(url.indexOf("quiz.html") > 0 && !isfinalSubmit && !isPlayer && mockVar.storeCandResponse == 1 && mockVar.curQuesBean.keyboardType != 'AudioFile' && mockVar.curQuesBean.keyboardType != 'VideoFile' && mockVar.curQuesBean.keyboardType != 'FileUpload'){
				focused = (e || event).type == "focus";
				isPlayer = false;
				isfinalSubmit = false;
				if(!focused){
					noOfInterruptions=parseInt(noOfInterruptions+"")+1;
					remainingInterruptions=remainingInterruptions-1;
					if(remainingInterruptions>=0 && allowInterruptions=='NO'){
						saveBackUp(false);
						InterruptionTimer(interruptionTimer);
						displayPopup('warningPopup');
						$("#seterror").html($(globalXmlvar).find('interruptionPopupMsg').text());
						tenSecInterruptionTimeOut=setTimeout(function(){
							/*if(isOkClicked){
								isOkClicked = false;
							}
							else{*/
								/*				var params = url.split("quiz.html?");
				var orgId = $.trim(params[1]).split("@@")[0];
				var mockId = $.trim(params[1]).split("@@")[1];
				var attemptId = $.trim(params[1]).split("@@")[2];
				var candMasterId = $.trim(params[1]).split("@@")[3];*/
								if(url.indexOf(".html?") >= 0){
									var params = url.split(".html?");
									var paramsData = $.trim(params[1]).split("@@");
									orgId= paramsData[0];
									assessmentId = paramsData[1];
									attemptId = paramsData[2];
									candMasterId = paramsData[3];
								} else {
									orgId= $.cookie("orgId");
									assessmentId = $.cookie("assessmentId");
									attemptId = $.cookie("attemptId");
									candMasterId = $.cookie("cand_master_id");
								}
								if(candMasterId.indexOf("#") > 0)
									candMasterId = candMasterId.substring(0,candMasterId.indexOf("#"));
								auditLogBackUp(true,candMasterId,attemptId,assessmentId,orgId);
								updateInterruptions(parseInt(noOfInterruptions+""),"");
								explicitClose=true;
								// window.close();
								window.location.href ="error.html?E125"+((document.cookie.indexOf('isApp=true')>= 0)?"isApp":"")+((document.cookie.indexOf('isLauncher=true')>= 0)?"isLauncher":"");
							/*}*/
						},10000);
					}	else if(allowInterruptions=='NO'){
						updateInterruptions(parseInt(noOfInterruptions+""),"Locked");
						toErrorPage=true;
						window.location.href ="error.html?E116#"+errorPageContent+"@@"+mockVar.lockedSubmit+"@@"+((document.cookie.indexOf('isApp=true')>= 0)?"isApp":" ")+((document.cookie.indexOf('isLauncher=true')>= 0)?"isLauncher":"");
					}
				}
			} else {
				isPlayer = false;
				isfinalSubmit = false;
			}
		},15);
	}	
};
var interruptionTimeout;
var tenSecInterruptionTimeOut;

function InterruptionTimer(interruptionTimer){
	$("#interruptionTimer").html(convertInterruptionTime(interruptionTimer));
	interruptionTimeout = setTimeout(function(){InterruptionTimer(interruptionTimer-1);},1000);
}

function isOkClickedWarning(){
	//isOkClicked = true;
	$('.overlayForInterruption').hide();
	$('.warningPopup').hide();
	clearTimeout(interruptionTimeout);
	clearTimeout(tenSecInterruptionTimeOut);
	var AuditJsonObject = new Object();
	AuditJsonObject.ActionName = "Assessment resumed after interruption";
	AuditJsonObject.ActionDesc = "Interruption Ok button Clicked";
	AuditJsonObject.GroupId = "NA";
	AuditJsonObject.SectionId = "NA";
	AuditJsonObject.QuestionId = "NA";
	AuditJsonObject.SelectedOptionId = "NA";
	AuditJsonObject.OptionSequence = "NA";
	AuditJsonObject.candidateName = $.cookie("username");
	AuditJsonObject.loginId = $.cookie("loginId");
	var currentDate = new Date();
	AuditJsonObject.Time = currentDate.yyyymmddHHmmss();
	AuditJson.push(AuditJsonObject);
	updateInterruptions(parseInt(noOfInterruptions+""),"");
}
jQuery(document).ready(function(){
	$('#closeButton').click(function(){
		$('#loadCalc').hide();
	});
	$("input").on("drop", function(event) {
		event.preventDefault();  
		event.stopPropagation();
	});
//	$("#quesOuterDiv").on("click", function(event) {
//	$( "#answer" ).trigger('blur');
//	});
	$("textarea").on("drop", function(event) {
		event.preventDefault();  
		event.stopPropagation();
	}); 
	$(document).on('mousedown',function (){
		$(".jp-full-screen").hide();
	});
	$(document).on('keydown',function (){
		$(".jp-full-screen").hide();
	});
	if ($('html').is('.ie8, .ie9')) {
		oldIE = true;
	}
	if(!oldIE){
		if(Element.prototype.addEventListener!=undefined){
			Element.prototype._addEventListener = Element.prototype.addEventListener;
			Element.prototype.addEventListener = function(a,b,c) {
				if(a=='keydown') return;
				if(Element.prototype._addEventListener!=undefined)
					this._addEventListener(a,b,c||false);
			};
		}
	}
});
Array.prototype.sortBy = function(p) {
	return this.slice(0).sort(function(a,b) {
		return (parseFloat(a[p]) > parseFloat(b[p])) ? 1 : (parseFloat(a[p]) < parseFloat(b[p])) ? -1 : 0;
	});
};

function cnfPop(id){
	$('.overlay').show();
	$('#'+id).show();
	var pLft = ( $(window).width() - $('#'+id).width() )/2;
	var pTop = ( $(window).height() - $('#'+id).height() )/2;
	$('#'+id).css({'left':pLft+'px'});
	$('#'+id).css({'top':pTop+'px'});
}
function displayPopup(id){
	$('.overlay').hide();
	$('.confrmPopup').hide();
	$('.overlayForInterruption').show();
	$('#'+id).show();
	var pLft = ( $(window).width() - $('#'+id).width() )/2;
	var pTop = ( $(window).height() - $('#'+id).height() - 200 )/2;
	$('#'+id).css({'left':pLft+'px'});
	$('#'+id).css({'top':pTop+'px'});
}
	
$(function(){
	$('.popClose, .cnfPopNo').click(function(){
		$('.overlay').hide();
		$('.confrmPopup').hide();
	});
});


$(document).on("dragstart", function(e) {
    if (e.target.nodeName.toUpperCase() == "IMG" || e.target.nodeName.toUpperCase() == "A") {
        return false;
    }
});
 
$(document).on("keydown", function (e) {
    if ((e.which == 8 && !$(e.target).is("input, textarea")) || (e.which == 37 && e.altKey) || (e.which == 39 && e.altKey) ) {
        e.preventDefault();
    }
});
	/*KeyboarLock Started*/
	
	/*KeyboarLock Completed*/
	
window.onbeforeunload = function(event) {
	var url = document.URL;
	if((url.indexOf("quiz.html")>=0) && (mockVar.mockId.indexOf("M") == -1)){
		//mockVar.closingTime=Math.round((new Date().getTime() / 1000));
		saveBackUp(false);
		if(explicitClose){
			updateInterruptions(parseInt(noOfInterruptions+""),"");
		}
		else{
			//parseInt(noOfInterruptions)=parseInt(noOfInterruptions)+1;
			remainingInterruptions=remainingInterruptions-1;
			if(remainingInterruptions>=0){
				updateInterruptions((parseInt(noOfInterruptions+"")+1),"");
			}
			else if(remainingInterruptions==-1){
				updateInterruptions((parseInt(noOfInterruptions+"")+1),"Locked");
			}
			else if(toErrorPage){
				updateInterruptions((parseInt(noOfInterruptions+"")),"Locked");
			}
			else{
				updateInterruptions((parseInt(noOfInterruptions+"")+1),"Locked");
			}
		}
		authenticationFileDeleted();
	}
	if(mockVar.mockId!=0 && mockVar.mockId.indexOf("M") == -1){
		opener.postMessage('refreshFWDashboardAssessment@~@'+mockVar.mockId, '*');
	}
};	
	
function authenticationFileDeleted(){
	var url = document.URL;
	var orgId;
	var assessmentId;
	var attemptId;
	var candMasterId;
	if(url.indexOf("quiz.html")>=0 && !isPageRedirecting){
		if(url.indexOf("html?")>=0){ 
			var params = url.split(".html?");
			var paramsData = $.trim(params[1]).split("@@");
			orgId= paramsData[0];
			assessmentId = paramsData[1];
			attemptId = paramsData[2];
			candMasterId = paramsData[3];
		} else {
			orgId = $.cookie("orgId");
			assessmentId = $.cookie("assessmentId");
			attemptId = $.cookie("attemptId");
			candMasterId = $.cookie("cand_master_id");
		}
		if(assessmentId.indexOf("M") == -1){
			var xmlURL = "/ASM/MockAssessmentAction.do?action=deleteAuthenticationFile&orgId="+orgId+"&mockId="+assessmentId+"&candMasterId="+candMasterId+"&attemptNo="+attemptId;
			jQuery.ajax({
				url: xmlURL,
				async: false,
				type: 'POST',
				dataType: 'text',
				success: function(data) {
				}
			});
		}
	}
}	

function submitLockedAttempt(){
	var url = document.URL;
	var orgId;
	var assessmentId;
	var attemptId ;
	var candMasterId ;
	var paramsData= url.split("#");
	var params="";
	if(paramsData.length>1){
		params =paramsData[1];
	}
	var paramValues=params.split("@@");
	orgId= paramValues[0];
	assessmentId = paramValues[1];
	attemptId = paramValues[2];
	candMasterId = paramValues[3];
	if(assessmentId.indexOf("M") == -1){
		$("#pWait").show();
		var xmlURL = "/ASM/MockAssessmentAction.do?action=CandidateSubmit&orgId="+orgId+"&mockId="+assessmentId+"&candMasterId="+candMasterId+"&attemptNo="+attemptId;
		jQuery.ajax({
			url: xmlURL,
			async: false,
			type: 'POST',
			dataType: 'text',
			success: function(data) {
				if(typeof(data)!='undefined' && data!=''){
					$("#pWait").hide();
					cnfPop('submitOnlineAssessment');

					$("#submitOnlineMsg").html(data);
				}
			}
		});
	}
} 

function updateInterruptions(noOfInterruptions,status){
	if(allowInterruptions=='NO'){
		var url = document.URL;
		var orgId;
		var assessmentId;
		var attemptId;
		var candMasterId;
		if(url.indexOf(".html?") >= 0){
			var params = url.split(".html?");
			var paramsData = $.trim(params[1]).split("@@");
			orgId= paramsData[0];
			assessmentId = paramsData[1];
			attemptId = paramsData[2];
			candMasterId = paramsData[3];
		} else {
			orgId= $.cookie("orgId");
			assessmentId = $.cookie("assessmentId");
			attemptId = $.cookie("attemptId");
			candMasterId = $.cookie("cand_master_id");
		}
		if(assessmentId.indexOf("M") == -1){
			var xmlURL = "/ASM/MockAssessmentAction.do?action=updateInterruptions&orgId="+orgId+"&mockId="+assessmentId+"&candMasterId="+candMasterId+"&attemptNo="+attemptId+"&noOfInterruptions="+noOfInterruptions+"&status="+status;
			jQuery.ajax({
				url: xmlURL,
				async: false,
				type: 'POST',
				dataType: 'text',
				success: function(data) {
				}
			});
		}
	}
}
	
$(document).bind('keydown', function(e) {	
	if(e.which == 116 || e.keycode == 116) {			
		e.preventDefault();		
		return false;		
	}		
	if(e.which == 82 && e.ctrlKey) {	
		e.preventDefault();		
		return false;		
	}	
});

function windowClose(){
	window.close();
}

function validateKeyboardNumeric(idnum){
	vKeyboard.saTypeQuesID = idnum;
}

/*function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah').attr('src', e.target.result);
			//$('#videoTag').attr('src', e.target.result);
			var player = document.getElementById('videoPlayer');

			var mp4Vid = document.getElementById('mp4Source');

			player.pause();
			mp4Vid.src = e.target.result;

			player.load();
			player.play();
        }

        reader.readAsDataURL(input.files[0]);
    }
}*/
function readURLGroup(input,quesId) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		//e = load;
		reader.onload = function (e) {
			//$('#blah'+quesId).attr('src', e.target.result);
			$('#PDF'+quesId).attr('src', e.target.result);
			$('#PDF'+quesId).show();
			//$('#videoTag').attr('src', e.target.result);
		};
		reader.readAsDataURL(input.files[0]);
	}
}


function FileChangeGroup(NewFile,quesId) {
	document.getElementById("uploadFile"+quesId).value = NewFile.value;
	//readURLGroup(NewFile,quesId);
}


function answeredFileQuestions(uploadFiles,value){
	document.getElementById(uploadFiles).value = value;
}
function audioDownload(url,fileName){
		

}

//Added by Boddu Rakesh

jQuery(function() {
	var url = document.URL;
	if(url.indexOf("quiz.html") > 0){
		var mockId = "";
		var tempQpId = "";
		var qpId = "";
		var params ;
		var orgId = "";
		if(url.indexOf("quiz.html?") > 0){
			params = url.split("quiz.html?");
			orgId = $.trim(params[1]).split("@@")[0];
			mockId = $.trim(params[1]).split("@@")[1];
			tempQpId = document.cookie.split("qp_id=")[1];
		} else {
			mockId = $.cookie("assessmentId");
			tempQpId = $.cookie("qp_id");
			orgId = $.cookie("orgId");
			params = [];
			params[0] = "";
			params[1] = (($.cookie("orgId"))+"@@"+($.cookie("assessmentId"))+"@@"+($.cookie("attemptId"))+"@@"+($.cookie("cand_master_id"))+"@@"+($.cookie("isResumed"))+"@@"+($.cookie("authenticationKey")));
		}
		//document.cookie.split("qp_id=")[1].split(";")[0];
		xmlFilePath = document.cookie.split("xmlFilePath=")[1].split(";")[0];
		if(typeof(sessionStorage.xmlFilePath) != "undefined")
			xmlFilePath = sessionStorage.xmlFilePath;
		if(mockId.indexOf("M") == -1){	
			$('#pWait').show();
			//loadScript(xmlFilePath+"/"+mockVar.qpId+"/quiz.js",myPrettyCode);
			//jQuery(document).load(xmlFilePath+"/"+mockVar.qpId+"/quiz.txt");
			if(tempQpId.indexOf(";") == -1)
				qpId = tempQpId;
			else
				qpId = document.cookie.split("qp_id=")[1].split(";")[0];
			onlineAttemptId = $.trim(params[1]).split("@@")[2];
			onlineAssessmentId = $.trim(params[1]).split("@@")[1];
			onlineAssessmentCandidateId = $.trim(params[1]).split("@@")[3];
			var isResumed = 0;
			isResumed = $.trim(params[1]).split("@@")[4];
			checkBackup=isResumed;
			if(isResumed.indexOf("#")>0)
				isResumed = isResumed.split("#")[0];
			if(isResumed == '0'){
				var xmlURL = "/ASM/MockAssessmentAction.do?action=getCandidateData&orgId="+orgId+"&mockId="+mockId+"&candMasterId="+onlineAssessmentCandidateId+"&attemptNo="+onlineAttemptId+"&QPId="+qpId+"&keyType=Assessment&tokenKey="+($.cookie("tokenKey"));
				$.ajax({
					url:xmlURL,
					type: 'POST',
					async: false,
					dataType: 'json',
					success: function (data) {
						if(data!=null && data.Error != null){
							window.location.href="error.html?E103"+((document.cookie.indexOf('isApp=true')>= 0)?"isApp":"")+((document.cookie.indexOf('isLauncher=true')>= 0)?"isLauncher":"");
						} else if(data!=null && data.ResponseType == "QUESE"){
							getDecryptedText(data.Response,"XML",orgId,mockId);
							$('#pWait').hide();
						} else {
							QPxml = jQuery.parseXML(data.Response);
							validateQuizPageUrl(false);
							$('#pWait').hide();
						}
					},
					error : function(){
						$('#pWait').hide();
						cnfPop('backupAlerts');
						$("#backupAlertMsg").html($(globalXmlvar).find('PleaseRelaunchTheAssessment').text());
						$('#backupAlertMsgWindowClose').hide();
					}
				});
				/*var txtFilePath = xmlFilePath+qpId+"/EncryptedQuestionPaper.txt";
	$(document).load(txtFilePath, function(responseTxt, statusTxt, xhr){
        if(statusTxt == "success"){
        		getDecryptedText(responseTxt,"XML");
           } else 
        if(statusTxt == "error"){
            	validateQuizPageUrl(true);
            }
    }); */
			} else {
				validateQuizPageUrl(false);
				$('#pWait').hide();
			}
		}
	}
});

function getDecryptedText(encryptedText,fileType,orgId,mockId){
//	var decryptedText = "";
	try{
		var decryptedObject ;
		var xData = encryptedText;
		var encryptedArrayData = xData.split("@ED");
		var tempArrayCount = encryptedArrayData[0];
		if(tempArrayCount.length > 2)
			tempArrayCount = tempArrayCount.substring(tempArrayCount.length - 2);
		var arraysCount = parseInt(tempArrayCount);
		var firstArraySize = parseInt(encryptedArrayData[1]);
		var encryptedQuizData = encryptedArrayData[2];
		var emptyStringCount = (encryptedQuizData.match(new RegExp("ABC", "g")) || []).length;
		var encryptedBytesData = encryptedQuizData.split("@");
		var encryptedLength  = (encryptedBytesData.length - 1) / 2;
		var evenData = [];
		var oddData = [];
		for(var i=0;i< encryptedLength ; i++){
			evenData[i] = encryptedBytesData[i];
			oddData[i] = encryptedBytesData[encryptedLength + i];
		}
		var k = 0;
		var count = 0;
		//var noOfArrays = encryptedLength;
		var byteCode = new Array(arraysCount);
		for(var i=0;i< arraysCount ; i++){
			byteCode[i] = new Array(firstArraySize);
		}
		for(var i=0;i< arraysCount ; i++){
			k = i;
			for(var j=0;j<firstArraySize;j++){
				status = count+"";
				if(count < evenData.length){
					k = i*2;
					byteCode[k][j] = evenData[count];
					byteCode[k+1][j] = oddData[count];
					count++;
				}
			}
		}
		count = 0;
		var result = "";
		var tempString = "";
		var byteCodeData = new Array(encryptedBytesData.length - 1 - emptyStringCount);
		for(var i=0;i< firstArraySize ; i++){
			for(var j=0;j<arraysCount;j++){
				tempString = byteCode[j][i];
				if(typeof(tempString) != 'undefined' && tempString != "--" && tempString!= ""){
					byteCodeData[count++] = parseInt(tempString);
				} else {
				}
			}
		}
		count--;
		var c = "";
		//var char2 = "";
		//var char3 = "";
		for (var i = 0; i < byteCodeData.length; i++) {
			c = byteCodeData[i];
			if(c < 256){
				result += String.fromCharCode(c);
			} else {
				var newArray = [];
				var k = 0;
				for(;i< byteCodeData.length; i++){
					c = byteCodeData[i];
					if(c > 255)
						newArray[k++] = byteCodeData[i];
					else{
						newArray[k++] = byteCodeData[i];
						result += String.fromCharCode.apply(null,newArray);
						break;
					}
				}
			}
		}
		if(fileType == "XML"){		 
			result = result.substring(0,result.lastIndexOf("questionPaperXML")+ "questionPaperXML".length + 1);
			decryptedObject = result;
			QPxml = jQuery.parseXML(result);
			validateQuizPageUrl(false);
		} else {
			result = result.substring(0,result.lastIndexOf('}')+1);
			mockVar = JSON.parse(result);
			for(var comp = 0;comp < mockVar.compreLaqQues.length;comp++){
				compreGroupDetails[(mockVar.compreLaqQues[comp].quesId)+""] = (mockVar.compreLaqQues[comp].groupComprehensionLaqQuestions);
			}
			//timeSpentOnQuestionLevel();
			//validateQuizPageUrl(false);	
		}
	} catch(exe){
		if(fileType == "XML"){
			var xmlURL = "/ASM/MockAssessmentAction.do?action=issueWithEncryptedFile&orgId="+orgId+"&mockId="+mockId+"&QPId="+($.cookie("qp_id"));
			$.ajax({
				url:xmlURL,
				type: 'POST',
				async: false,
				dataType: 'text',
				success: function (data) {
					if(data != ""){
						getDecryptedText(data,fileType,orgId,mockId);
					} 
				}
			});
		}		
	}
	return decryptedObject;
}

function isAssessmentMock(){
	var URL =document.URL;
	var mockId = "";
	if(URL.indexOf("quiz.html?") >=0){
		var params = URL.split("quiz.html?");
		mockId = $.trim(params[1]).split("@@")[1];
	} else if(URL.indexOf("quiz.html") >=0){
		mockId = $.cookie("assessmentId");
	}
	if(mockId.indexOf("M")!=-1){
		validateQuizPageUrl(true);
	}
}
function isOnSelectStart(){
	if(!isTextHighlighterEnabled)
		return false;
}
function iframeInstQuiz(){
	var url =document.URL;
	var orgId="";
	var mockId="";
	if(url.indexOf("quiz.html?")>=0){
		var params = url.split("quiz.html?");
		orgId = $.trim(params[1]).split("@@")[0];
		mockId = $.trim(params[1]).split("@@")[1];
	}  else if(url.indexOf("quiz.html")>=0) {
		orgId = $.cookie("orgId");
		mockId = $.cookie("assessmentId");
	}
	var isOptionalSectionsAvailable = $(confXml).find("ISOPTIONALSECTIONSAVAILABLE").text();
	var isMarkedForReviewConsidered = $(confXml).find("ConsiderMarkForReview").text();
	mockVar.isMarkedForReviewConsidered = isMarkedForReviewConsidered;
	var useSystemInstructions = $(confXml).find("UseDefaultSystemInstruction").text();
	if(typeof(sessionStorage.xmlFilePath) != "undefined")
		xmlFilePath = sessionStorage.xmlFilePath;
	if(useSystemInstructions.toUpperCase()=="NO"){
		var xml =readAndReturnXML(xmlFilePath+'/sysInstructions.xml');
		parseSysInstructions('quiz',xml,useSystemInstructions.toUpperCase(),orgId,mockId,isOptionalSectionsAvailable.toUpperCase(),isMarkedForReviewConsidered.toUpperCase(),quizXml,allowInterruptions);
	}else{
		var xml =readAndReturnXML(xmlFilePath+'/sysInstructions.xml');
		$(xml).find("INSTRUCTION").each(function(){
			if($.trim($(this).find("INSTRUCTIONTEXT").text())=="")
				xml =readAndReturnXML('sysInstructions.xml');
		});
		parseSysInstructions('quiz',xml,useSystemInstructions.toUpperCase(),orgId,mockId,isOptionalSectionsAvailable.toUpperCase(),isMarkedForReviewConsidered.toUpperCase(),quizXml,allowInterruptions);
	}
	var iframe = document.getElementById('iframeId');
	var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
	if(innerDoc.getElementById("basInst").options.length>1){
		$('#iframeId').contents().find('#basInst').parent().show();
		$('#iframeId').contents().find('#cusInst').parent().show();
	}
	if($('#iframeId').contents().find('#basInst option:selected').val().indexOf('sysInstText')>-1)
		langId = $('#iframeId').contents().find('#basInst option:selected').val().split('sysInstText')[1];
	$('#iframeId').contents().find('.sysInstText'+langId).show();
	$('#iframeId').contents().find('.cusInstText'+langId).show();
	loadLabel();
	if((iOAP.secDetails.length == 1 && iOAP.secDetails[iOAP.curSection].questions.length == 1) || ((iOAP.secDetails[iOAP.curSection].groupAllQuestions != "undefined" && iOAP.secDetails[iOAP.curSection].groupAllQuestions != "" && iOAP.secDetails[iOAP.curSection].groupAllQuestions == "true") && iOAP.secDetails.length == 1)){
		$(".underreview").attr("title",mockLabels.btnMarkForReview).val(mockLabels.btnMarkForReview);
		$(".savenext,.savenextGroup").attr("title",mockLabels.btnSave).val(mockLabels.btnSave);
		//$('#savenextGroup').val(mockLabels.btnSave);
		//$('#savenext').val(mockLabels.btnSave);
	}
	else if(iOAP.secDetails[iOAP.curSection].secType.toUpperCase()=="OFFLINE"){
		$(".savenextGroup").attr("title",mockLabels.nextQ).val(mockLabels.nextQ);
		$(".savenext").attr("title",mockLabels.markAsAnswered).val(mockLabels.markAsAnswered);
	} 
	else{
		$(".underreview").attr("title",mockLabels.btnMarkForReviewAndNext);
		$(".savenext").attr("title",mockLabels.btnSaveNext);
		$(".savenextGroup").attr("title",mockLabels.btnSaveNext).val(mockLabels.btnSaveNext);
	}
}

function palyVideo() {
$(".jwAudioVideo").each(function() {
		checkAndAdd($(this).attr("id"));
		if (($(this).attr("id").indexOf("jwAudio_"))) {
			// VIDEO PLAYER SETTINGS SETUP
			var cLaq = $(this).attr("id").split("_")[2];
			var that = this;
			var jwp = jwplayer($(this).attr("id")).setup({
				file: $(this).attr("title"),
				aspectratio: "16:9",
				primary: 'html5',
				mute: 'false',
				autostart: (function() {
					if(!($(that).hasClass("multiMediaOption"))){
					if (cLaq !== "Claq"){
						for (var i = 0; i < mockVar.curSectionQuestions.length; i++) {
							if (mockVar.curSectionQuestions[i].jwAudioVideo.length != 0) {
								for (var j = 0; j < mockVar.curSectionQuestions[i].jwAudioVideo.length; j++) {
									if (mockVar.curSectionQuestions[i].jwAudioVideo[j].jwplayerId == $(that).attr('id')) {
									
										if (mockVar.curSectionQuestions[i].autoplay.toLowerCase() == "true") {
											if(grpAllMultimediaPlayedAtOnceCount==0){
											grpAllMultimediaPlayedAtOnceCount++;
											return true;
											}else
											return false;
											
										}
									}
								}
							}
						}
					}else{
						for (var i = 0; i < mockVar.compreLaqQues.length; i++) {
							for(var j=0;j<mockVar.compreLaqQues[i].jwAudioVideo.length;j++){
								if(mockVar.compreLaqQues[i].jwAudioVideo[j].jwplayerId == $(that).attr('id')){
									if (mockVar.compreLaqQues[i].jwAudioVideo[j].jwplayerId == $(that).attr('id')) {
										if (mockVar.compreLaqQues[i].autoplay.toLowerCase() == "true") {
										
											if(grpAllMultimediaPlayedAtOnceCount==0){
											grpAllMultimediaPlayedAtOnceCount++;
											return true;
											}else
											return false;
											
										}
									}
								}
							}   
						}
					}
					}
				}()),
				//width:"50%",
				events: {
					onComplete: function() {
					if(!($(that).hasClass("multiMediaOption"))){
						var cLaq = $(this).attr("id").split("_")[2];
						if (cLaq !== "Claq"){
							for (var i = 0; i < mockVar.curSectionQuestions.length; i++) {
								if (mockVar.curSectionQuestions[i].jwAudioVideo.length != 0) {
									for (var j = 0; j < mockVar.curSectionQuestions[i].jwAudioVideo.length; j++) {
										if (mockVar.curSectionQuestions[i].jwAudioVideo[j].jwplayerId == $(this).attr('id')) {
											mockVar.curSectionQuestions[i].jwAudioVideo[j].noOfReplays++;
											break;
										}
									}
								}
							}
						}else{
							for (var i = 0; i < mockVar.compreLaqQues.length; i++) {
								for(var j=0;j<mockVar.compreLaqQues[i].jwAudioVideo.length;j++){
									if(mockVar.compreLaqQues[i].jwAudioVideo[j].jwplayerId == $(this).attr('id')){
										if (mockVar.compreLaqQues[i].jwAudioVideo[j].jwplayerId == $(this).attr('id')) {
											mockVar.compreLaqQues[i].jwAudioVideo[j].noOfReplays++;
										}
									}
								}   
							}
						}
						}
					},
					onPlay: function(event) {
					if(!($(that).hasClass("multiMediaOption"))){
						//jwplayer($(this).attr("id")).setVolume(100);
						//resumeJwAudioVideo();
						var cLaq = $(this).attr("id").split("_")[2];
						if (cLaq !== "Claq"){
							for (var i = 0; i < mockVar.curSectionQuestions.length; i++) {
								if (mockVar.curSectionQuestions[i].jwAudioVideo.length != 0) {
									for (var j = 0; j < mockVar.curSectionQuestions[i].jwAudioVideo.length; j++) {
										if (  mockVar.curSectionQuestions[i].jwAudioVideo[j].jwplayerId == $(this).attr('id')) {
											if (mockVar.curSectionQuestions[i].noOfReplays >=0 && mockVar.curSectionQuestions[i].jwAudioVideo[j].noOfReplays == mockVar.curSectionQuestions[i].noOfReplays) {
												jwplayer($(this).attr('id')).stop();
												cnfPop('InfoPopup');
												$("#infoMsg2").html($(globalXmlvar).find('videoReplaysExceeded').text());
											} else if (mockVar.curSectionQuestions[i].allowedProgression.toLowerCase() == "false") {
												var jwpId = $(this).attr('id');
												if (is_ie10 == false)
													$("#" + jwpId + " .jwgroup.jwcenter").css({ "pointer-events": "none" });
												else
													$("#" + jwpId + " .jwgroup.jwcenter").hide();
											}
											break;
										}
									}
								}
							}
						}else{
							for (var i = 0; i < mockVar.compreLaqQues.length; i++) {
								if (mockVar.compreLaqQues[i].jwAudioVideo.length != 0) {
									for (var j = 0; j < mockVar.compreLaqQues[i].jwAudioVideo.length; j++) {
										if (mockVar.compreLaqQues[i].jwAudioVideo[j].jwplayerId == $(this).attr('id')) {
											if (mockVar.compreLaqQues[i].noOfReplays >=0 && mockVar.compreLaqQues[i].jwAudioVideo[j].noOfReplays == mockVar.compreLaqQues[i].noOfReplays) {
												jwplayer($(this).attr('id')).stop();
												cnfPop('InfoPopup');
												$("#infoMsg2").html($(globalXmlvar).find('videoReplaysExceeded').text());

											} else if (mockVar.compreLaqQues[i].allowedProgression.toLowerCase() == "false") {

												var jwpId = $(this).attr('id');
												if (is_ie10 == false)
													$("#" + jwpId + " .jwgroup.jwcenter").css({ "pointer-events": "none" });
												else
													$("#" + jwpId + " .jwgroup.jwcenter").hide();
											}
											break;
										}
									}
								}
							}
						}
						}
					},
					onReady: function(event) {
						//Element.prototype.addEventListener = Element.prototype._addEventListener;
						//resumeJwAudioVideo();
						//jwplayer($(this).attr("id")).setVolume(100);
						//alert();
						//$('[id^=jwAudio]').css({"height":"30px"});
						//$('[id^=jwAudio]').css({"height":"20px"});
					},
					onPause: function(event) {
					if(!($(that).hasClass("multiMediaOption"))){
						var cLaq = $(this).attr("id").split("_")[2];
						if (cLaq !== "Claq"){
							for (var i = 0; i < mockVar.curSectionQuestions.length; i++) {
								if (mockVar.curSectionQuestions[i].jwAudioVideo.length != 0) {
									for (var j = 0; j < mockVar.curSectionQuestions[i].jwAudioVideo.length; j++) {
										if (mockVar.curSectionQuestions[i].jwAudioVideo[j].jwplayerId == $(this).attr('id')) {
											if (mockVar.curSectionQuestions[i].isControlEnable == "false") {
												jwplayer($(this).attr('id')).play();
											}
										}
									}
								}
							}
						}else{
							for (var i = 0; i < mockVar.compreLaqQues.length; i++) {
								if (mockVar.compreLaqQues[i].jwAudioVideo.length != 0) {
									for (var j = 0; j < mockVar.compreLaqQues[i].jwAudioVideo.length; j++) {
										if (mockVar.compreLaqQues[i].jwAudioVideo[j].jwplayerId == $(this).attr('id')) {
											if (mockVar.compreLaqQues[i].isControlEnable == "false") {
												jwplayer($(this).attr('id')).play();
											}
										}
									}
								}
							}
						}
						}
					}
				},
				startparam: 'starttime'
			});
		} else {
			var cLaq = $(this).attr("id").split("_")[2];
			var that = this;
			// AUDIO PLAYER SETTINGS SETUP
			var jwp = jwplayer($(this).attr("id")).setup({
				file: $(this).attr("title"),
				aspectratio: "16:9",
				autostart: (function() {
				if(!($(that).hasClass("multiMediaOption"))){
					if (cLaq !== "Claq"){
						for (var i = 0; i < mockVar.curSectionQuestions.length; i++) {
							if (mockVar.curSectionQuestions[i].jwAudioVideo.length != 0) {
								for (var j = 0; j < mockVar.curSectionQuestions[i].jwAudioVideo.length; j++) {
									if (mockVar.curSectionQuestions[i].jwAudioVideo[j].jwplayerId == $(that).attr('id')) {
										if (mockVar.curSectionQuestions[i].autoplay.toLowerCase() == "true") {
											
											if(grpAllMultimediaPlayedAtOnceCount==0){
											grpAllMultimediaPlayedAtOnceCount++;
											return true;
											}else
											return false;
											
										}
									}
								}
							}
						}
					}else{
						for (var i = 0; i < mockVar.compreLaqQues.length; i++) {
							for(var j=0;j<mockVar.compreLaqQues[i].jwAudioVideo.length;j++){
								if(mockVar.compreLaqQues[i].jwAudioVideo[j].jwplayerId == $(that).attr('id')){
									if (mockVar.compreLaqQues[i].jwAudioVideo[j].jwplayerId == $(that).attr('id')) {
										if (mockVar.compreLaqQues[i].autoplay.toLowerCase() == "true") {
											
											if(grpAllMultimediaPlayedAtOnceCount==0){
											grpAllMultimediaPlayedAtOnceCount++;
											return true;
											}else
											return false;
											
										}
									}
								}
							}   
						}
					}
					}
				}()),
				height: "30",
				events: {
					onComplete: function() {
					if(!($(that).hasClass("multiMediaOption"))){
						var cLaq = $(this).attr("id").split("_")[2];
						if (cLaq !== "Claq"){
							for (var i = 0; i < mockVar.curSectionQuestions.length; i++) {
								if (mockVar.curSectionQuestions[i].jwAudioVideo.length != 0) {
									for (var j = 0; j < mockVar.curSectionQuestions[i].jwAudioVideo.length; j++) {
										if (mockVar.curSectionQuestions[i].jwAudioVideo[j].jwplayerId == $(this).attr('id')) {
											mockVar.curSectionQuestions[i].jwAudioVideo[j].noOfReplays++;
											break;
										}
									}
								}
							}
						}else{
							for (var i = 0; i < mockVar.compreLaqQues.length; i++) {
								for(var j=0;j<mockVar.compreLaqQues[i].jwAudioVideo.length;j++){
									if(mockVar.compreLaqQues[i].jwAudioVideo[j].jwplayerId == $(this).attr('id')){
										if (mockVar.compreLaqQues[i].jwAudioVideo[j].jwplayerId == $(this).attr('id')) {
											mockVar.compreLaqQues[i].jwAudioVideo[j].noOfReplays++;
											break;
										}
									}
								}   
							}
						}
						}
					},
					onPlay: function(event) {
					if(!($(that).hasClass("multiMediaOption"))){
						//jwplayer($(this).attr("id")).setVolume(100);
						//resumeJwAudioVideo();
						var cLaq = $(this).attr("id").split("_")[2];
						if (cLaq !== "Claq"){
							for (var i = 0; i < mockVar.curSectionQuestions.length; i++) {
								if (mockVar.curSectionQuestions[i].jwAudioVideo.length != 0) {
									for (var j = 0; j < mockVar.curSectionQuestions[i].jwAudioVideo.length; j++) {
										if (mockVar.curSectionQuestions[i].jwAudioVideo[j].jwplayerId == $(this).attr('id')) {
											if (mockVar.curSectionQuestions[i].noOfReplays >=0 && mockVar.curSectionQuestions[i].jwAudioVideo[j].noOfReplays == mockVar.curSectionQuestions[i].noOfReplays) {
												jwplayer($(this).attr('id')).stop();
												cnfPop('InfoPopup');
												$("#infoMsg2").html($(globalXmlvar).find('audioReplaysExceeded').text());
											} else if (mockVar.curSectionQuestions[i].allowedProgression.toLowerCase() == "false") {
												var jwpId = $(this).attr('id');
												if (is_ie10 == false)
													$("#" + jwpId + " .jwgroup.jwcenter").css({ "pointer-events": "none" });
												else
													$("#" + jwpId + " .jwgroup.jwcenter").hide();
											}
											break;
										}
									}
								}
							}
						}else{
							for (var i = 0; i < mockVar.compreLaqQues.length; i++) {
								if (mockVar.compreLaqQues[i].jwAudioVideo.length != 0) {
									for (var j = 0; j < mockVar.compreLaqQues[i].jwAudioVideo.length; j++) {
										if (mockVar.compreLaqQues[i].jwAudioVideo[j].jwplayerId == $(this).attr('id')) {
											if (mockVar.compreLaqQues[i].noOfReplays >=0 && mockVar.compreLaqQues[i].jwAudioVideo[j].noOfReplays == mockVar.compreLaqQues[i].noOfReplays) {
												jwplayer($(this).attr('id')).stop();
												cnfPop('InfoPopup');
												$("#infoMsg2").html($(globalXmlvar).find('audioReplaysExceeded').text());

											} else if (mockVar.compreLaqQues[i].allowedProgression.toLowerCase() == "false") {

												var jwpId = $(this).attr('id');
												if (is_ie10 == false)
													$("#" + jwpId + " .jwgroup.jwcenter").css({ "pointer-events": "none" });
												else
													$("#" + jwpId + " .jwgroup.jwcenter").hide();
											}
											break;
										}
									}
								}
							}
						}
						}
					},
					onReady: function(event) {
						//Element.prototype.addEventListener = Element.prototype._addEventListener;
						//resumeJwAudioVideo();
						//jwplayer($(this).attr("id")).setVolume(100);
						//$('[id^=jwAudio]').css({"height":"30px"});
						//$('[id^=jwAudio]').css({"height":"20px"});
					},
					onPause: function(event) {
					if(!($(that).hasClass("multiMediaOption"))){
						var cLaq = $(this).attr("id").split("_")[2];
						if (cLaq !== "Claq"){
							for (var i = 0; i < mockVar.curSectionQuestions.length; i++) {
								if (mockVar.curSectionQuestions[i].jwAudioVideo.length != 0) {
									for (var j = 0; j < mockVar.curSectionQuestions[i].jwAudioVideo.length; j++) {
										if (mockVar.curSectionQuestions[i].jwAudioVideo[j].jwplayerId == $(this).attr('id')) {
											if (mockVar.curSectionQuestions[i].isControlEnable.toLowerCase() == "false") {
												jwplayer($(this).attr('id')).play();
												break;
											}
										}
									}
								}
							}
						}else{
							for (var i = 0; i < mockVar.compreLaqQues.length; i++) {
								if (mockVar.compreLaqQues[i].jwAudioVideo.length != 0) {
									for (var j = 0; j < mockVar.compreLaqQues[i].jwAudioVideo.length; j++) {
										if (mockVar.compreLaqQues[i].jwAudioVideo[j].jwplayerId == $(this).attr('id')) {
											if (mockVar.compreLaqQues[i].isControlEnable.toLowerCase() == "false") {
												jwplayer($(this).attr('id')).play();
												break;
											}
										}
									}
								}
							}
						}
						}
					}
				}
			});
		}
	});
	
}

function checkAndAdd(name) {
	if (!Array.prototype.some) {
		Array.prototype.some = function(func) {
			for (var i in this) {
				if (func(i)) return true;
			}
			return false;
		};
	}
	//var curSec = iOAP.secDetails[iOAP.curSection];
	var jwQuesId = name.split("_")[1];
	var cLaq = name.split("_")[2];
	if (cLaq !== "Claq") {
		for (var i = 0; i < mockVar.curSectionQuestions.length; i++) {
			if (mockVar.curSectionQuestions[i].quesId == jwQuesId) {
				var found = mockVar.curSectionQuestions[i].jwAudioVideo.some(function(el) {
					return el.jwplayerId == name;
				});
				if (!found) { mockVar.curSectionQuestions[i].jwAudioVideo.push({ jwplayerId: name, jwplayerPosn: "", noOfReplays: -1 }); }
				break;
			}
		}
	} else {
		if (mockVar.compreLaqQues.length != 0) {
			for (var i = 0; i < mockVar.compreLaqQues.length; i++) {
				if (mockVar.compreLaqQues[i].quesId == jwQuesId) {
					var found = mockVar.compreLaqQues[i].jwAudioVideo.some(function(el) {
						return el.jwplayerId == name;
					});
					if (!found) { mockVar.compreLaqQues[i].jwAudioVideo.push({ jwplayerId: name, jwplayerPosn: "", noOfReplays: -1 }); }
					break;
				}
			}
		}
	}
}
function playUsefulDataVideo(){
	$(".UsefuljwAudioVideo").each(function() {
		jwplayer($(this).attr("id")).setup({
			file: $(this).attr("title"),
			aspectratio: "16:9",
			primary: 'html5',
			mute: 'false'
			//height: "100%",
			//width: "100%"
				//skin:'vapor.xml'
		});
	});
}
function scrollToTop(){
	$('.leftDiv').animate({ scrollTop: 0 }, 1200);
	return false;
}	
function scrollToBottom(){
	$('.leftDiv').animate({ scrollTop: $(".leftDiv").get(0).scrollHeight }, 1200);
	return false;
}

  
(function($) {
	$.fn.hasScrollBar = function() {
		if(this.get(0)!=undefined){
			return this.get(0).scrollHeight > this.get(0).clientHeight;
		}
	};
})(jQuery);


$(document).ready(function() {
	var url = document.URL;
	if(url.indexOf("quiz.html")>=0){
		timeSpentOnQuestionLevel();
	}
});
var previousGroupId = 0;
function timeSpentOnQuestionLevel(){
	var isRecursionRequired = false;
	//var isCompreLaqGroupAll = "false";
	var groupIndex = mockVar.currentGrp;
	var sectionIndex = iOAP.curSection;
	var questionIndex = iOAP.curQues;
	if(previousGroupId != groupIndex){
		sectionIndex = 0;
		questionIndex = 0;
		if(typeof(mockVar.isInstruPage) != "undefined" && mockVar.isInstruPage != 1)
			previousGroupId = groupIndex;
		else if(typeof(mockVar.isInstruPage) == "undefined")
			previousGroupId = groupIndex;
	} else {
		if(typeof(mockVar.isInstruPage) != "undefined" && mockVar.isInstruPage != 1)
			previousGroupId = groupIndex;
		else if(typeof(mockVar.isInstruPage) == "undefined")
			previousGroupId = groupIndex;
	}
	questionLevelTimeCounter=setTimeout(function(){
		if(typeof(mockVar.isInstruPage) == "undefined" || mockVar.isInstruPage == 1){
			isRecursionRequired = true;
		} else if(typeof(groupIndex)!='undefined' && typeof(sectionIndex)!='undefined' && typeof(questionIndex)!='undefined'){
			if(isSubmitButtonClicked){
				isRecursionRequired = true;
			} else if((!isSubmitButtonClicked) && mockVar.groups[groupIndex].timespent != 'undefined'){
				isRecursionRequired = true;
				if(typeof(mockVar.groups[groupIndex].secDetails[sectionIndex].questions[questionIndex].timespent) == "undefined"){
				} else if(mockVar.groups[groupIndex].secDetails[sectionIndex].groupAllQuestions != 'undefined' && mockVar.groups[groupIndex].secDetails[sectionIndex].groupAllQuestions == 'true'){
					mockVar.groups[groupIndex].timespent = (mockVar.groups[groupIndex].timespent) + 1;
					mockVar.groups[groupIndex].secDetails[sectionIndex].timespent = (mockVar.groups[groupIndex].secDetails[sectionIndex].timespent) + 1;
				} else {
					mockVar.groups[groupIndex].timespent = (mockVar.groups[groupIndex].timespent) + 1;
					mockVar.groups[groupIndex].secDetails[sectionIndex].timespent = (mockVar.groups[groupIndex].secDetails[sectionIndex].timespent) + 1;
					mockVar.groups[groupIndex].secDetails[sectionIndex].questions[questionIndex].timespent = (mockVar.groups[groupIndex].secDetails[sectionIndex].questions[questionIndex].timespent) + 1;

					/*if(mockVar.groups[groupIndex].secDetails[sectionIndex].questions[questionIndex].comprehensionId != 0 || mockVar.groups[groupIndex].secDetails[sectionIndex].questions[questionIndex].laqId != 0 ){
					for(var k=0;k<mockVar.compreLaqQues.length;k++){
						if(mockVar.compreLaqQues[k].groupComprehensionLaqQuestions == 'undefined'){
							isCompreLaqGroupAll = 'false';
							break;
						}
						else if(mockVar.curQuesBean.comprehensionId == mockVar.compreLaqQues[k].quesId){
							isCompreLaqGroupAll = mockVar.compreLaqQues[k].groupComprehensionLaqQuestions;
							break;
						}else if(mockVar.curQuesBean.laqId == mockVar.compreLaqQues[k].quesId){
							isCompreLaqGroupAll = mockVar.compreLaqQues[k].groupComprehensionLaqQuestions;
							break;
						}
					}
					if(isCompreLaqGroupAll != 'true')
						mockVar.groups[groupIndex].secDetails[sectionIndex].questions[questionIndex].timespent = (mockVar.groups[groupIndex].secDetails[sectionIndex].questions[questionIndex].timespent) + 1;
				} else {
					mockVar.groups[groupIndex].secDetails[sectionIndex].questions[questionIndex].timespent = (mockVar.groups[groupIndex].secDetails[sectionIndex].questions[questionIndex].timespent) + 1;
				}*/
				}
			} else {
				isRecursionRequired = true;
			}
		} else {
			isRecursionRequired = true;
		}
		if(isRecursionRequired)
			timeSpentOnQuestionLevel();
	},1000);
}

function saveJwplayerParam(){
	var mode = jwplayer().renderingMode == "flash"?"jwswf":"jwplayer";
	$('.'+mode).each(function(){
		var cLaq = $(this).attr('id').split("_")[2];
		if(cLaq!=="Claq"){
			for(var i=0;i<mockVar.curSectionQuestions.length;i++){
				if(mockVar.curSectionQuestions[i].jwAudioVideo.length!=0){
					for(var j=0;j<mockVar.curSectionQuestions[i].jwAudioVideo.length;j++){
						if(mockVar.curSectionQuestions[i].jwAudioVideo[j].jwplayerId == $(this).attr('id')){
							mockVar.curSectionQuestions[i].jwAudioVideo[j].jwplayerPosn = jwplayer($(this).attr('id')).getPosition();
							break;
						}
					}
				}
			}
		}else{
			if(mockVar.compreLaqQues.length!=0){
				for (var i = 0; i < mockVar.compreLaqQues.length; i++) {
					for(var j=0;j<mockVar.compreLaqQues[i].jwAudioVideo.length;j++){
						if(mockVar.compreLaqQues[i].jwAudioVideo[j].jwplayerId == $(this).attr('id')){
							mockVar.compreLaqQues[i].jwAudioVideo[j].jwplayerPosn = jwplayer($(this).attr('id')).getPosition();
							break;
						}
					}   
				}
			}
		}
	});
}

function resumeJwAudioVideo(){
	var mode = jwplayer().renderingMode == "flash" ? "jwswf" : "jwplayer";
	$('.' + mode).each(function() {
		var cLaq = $(this).attr('id').split("_")[2];
		if (cLaq !== "Claq") {
			for (var i = 0; i < mockVar.curSectionQuestions.length; i++) {
				if (mockVar.curSectionQuestions[i].jwAudioVideo.length != 0) {
					for (var j = 0; j < mockVar.curSectionQuestions[i].jwAudioVideo.length; j++) {
						if (mockVar.curSectionQuestions[i].jwAudioVideo[j].jwplayerId == $(this).attr('id')) {
							if (mockVar.curSectionQuestions[i].jwAudioVideo[j].jwplayerPosn != undefined && mockVar.curSectionQuestions[i].jwAudioVideo[j].jwplayerPosn != 0 && mockVar.curSectionQuestions[i].jwAudioVideo[j].jwplayerPosn != "") {
								jwplayer($(this).attr('id')).seek(mockVar.curSectionQuestions[i].jwAudioVideo[j].jwplayerPosn);
								break;
							}
						}
					}
				}
			}
		}else{
			for (var i = 0; i < mockVar.compreLaqQues.length; i++) {
				if (mockVar.compreLaqQues[i].jwAudioVideo.length != 0) {
					for (var j = 0; j < mockVar.compreLaqQues[i].jwAudioVideo.length; j++) {
						if (mockVar.compreLaqQues[i].jwAudioVideo[j].jwplayerId == $(this).attr('id')) {
							if (mockVar.compreLaqQues[i].jwAudioVideo[j].jwplayerPosn != undefined && mockVar.compreLaqQues[i].jwAudioVideo[j].jwplayerPosn != 0 && mockVar.compreLaqQues[i].jwAudioVideo[j].jwplayerPosn != "") {
								jwplayer($(this).attr('id')).seek(mockVar.compreLaqQues[i].jwAudioVideo[j].jwplayerPosn);
								break;
							}
						}
					}
				}
			}
		}
	});
}

function getIEVersion(){
	var agent = navigator.userAgent;
	var reg = /MSIE\s?(\d+)(?:\.(\d+))?/i;
	var matches = agent.match(reg);
	if (matches != null) {
		return { major: matches[1], minor: matches[2] };
	}
	return { major: "-1", minor: "-1" };
}

var ie_version =  getIEVersion();
var is_ie10 = ie_version.major == 10;

function makQuesAudVidDiv(quesText, oldFileCounter, quesId) {
	var tempImageTag;
	var tempImageName;
	var jwPlayerDetailsArray = new Object();
	var jwPlayerDetailsArrayIndex = new Object();
	var tempCountIndex = 0;
	if (quesText.indexOf("tkcimages/") != -1) {
		tempImageTag = quesText.split("tkcimages/");
		for (var k = 1; k < tempImageTag.length; k++) {
			//var temporaryImageName = "";
			//temporaryImageName = tempImageTag[k];
			tempImageName = tempImageTag[k].split(".")[0];
			var temporaryFileName = tempImageTag[k].split(".")[0];
			tempImageName = tempImageName.replace(/\s/g, '_');
			var temporaryFileExtension = tempImageTag[k].split(".")[1].split("\"")[0];
			if(temporaryFileExtension.indexOf('>')!= -1){
				temporaryFileExtension = tempImageTag[k].split(".")[1].split("'")[0]; 
			}
			temporaryFileName = temporaryFileName + "." + temporaryFileExtension;
			tempImageName = tempImageName + "." + temporaryFileExtension;
			quesText = quesText.replace(temporaryFileName, tempImageName);
			if (temporaryFileExtension == "mp4") {
				quesText = quesText + "<div class='jwAudioVideo' id='jwVideo_" + quesId + "_" + oldFileCounter + "' title='tkcimages/" + tempImageName + "'></div>";
				jwPlayerDetailsArray["jwVideo_" + quesId + "_" + oldFileCounter] = "<div class='jwAudioVideo' id='jwVideo_" + quesId + "_" + oldFileCounter + "' title='tkcimages/" + tempImageName + "'></div>";
				jwPlayerDetailsArrayIndex[tempCountIndex] = "jwVideo_" + quesId + "_" + oldFileCounter;
				tempCountIndex++;
				oldFileCounter++;
			} else if (temporaryFileExtension == "mp3") {
				quesText = quesText + "<div class='jwAudioVideo' id='jwAudio_" + quesId + "_" + oldFileCounter + "' title='tkcimages/" + tempImageName + "'></div>";
				jwPlayerDetailsArray["jwAudio_" + quesId + "_" + oldFileCounter] = "<div class='jwAudioVideo' id='jwAudio_" + quesId + "_" + oldFileCounter + "' title='tkcimages/" + tempImageName + "'></div>";
				jwPlayerDetailsArrayIndex[tempCountIndex] = "jwAudio_" + quesId + "_" + oldFileCounter;
				tempCountIndex++;
				oldFileCounter++;
			}
		}
	}
	if (quesText.indexOf("<audio>") != -1) {
		var newAudioFile = new Array();
		newAudioFile = quesText.match(/(<audio>.+?<audio>)/g);
		for (var i = 0; i < newAudioFile.length; i++) {
			while (quesText.indexOf(newAudioFile[i]) != -1) {
				quesText = quesText.replace(newAudioFile[i], "<div class='jwAudioVideo' id='jwAudio_" + quesId + "_" + oldFileCounter + "' title='tkcimages/" + newAudioFile[i].split("<audio>")[1] + "'></div>");
				jwPlayerDetailsArray["jwAudio_" + quesId + "_" + oldFileCounter] = "<div class='jwAudioVideo' id='jwAudio_" + quesId + "_" + oldFileCounter + "' title='tkcimages/" + newAudioFile[i].split("<audio>")[1] + "'></div>";
				jwPlayerDetailsArrayIndex[tempCountIndex] = "jwAudio_" + quesId + "_" + oldFileCounter;
				tempCountIndex++;
				oldFileCounter++;
			}
		}
	}
	if (quesText.indexOf("<video>") != -1) {
		var newVideoFile = new Array();
		newVideoFile = quesText.match(/(<video>.+?<video>)/g);
		for (var i = 0; i < newVideoFile.length; i++) {
			while (quesText.indexOf(newVideoFile[i]) != -1) {
				quesText = quesText.replace(newVideoFile[i], "<div class='jwAudioVideo' id='jwVideo_" + quesId + "_" + oldFileCounter + "' title='tkcimages/" + newVideoFile[i].split("<video>")[1] + "'></div>");
				jwPlayerDetailsArray["jwVideo_" + quesId + "_" + oldFileCounter] = "<div class='jwAudioVideo' id='jwVideo_" + quesId + "_" + oldFileCounter + "' title='tkcimages/" + newVideoFile[i].split("<video>")[1] + "'></div>";
				jwPlayerDetailsArrayIndex[tempCountIndex] = "jwVideo_" + quesId + "_" + oldFileCounter;
				tempCountIndex++;
				oldFileCounter++;
			}
		}
	}
	if(mockVar.MagnifyingGlass == 1){
		if(quesText.indexOf('<img') != -1) {
			var newImageFile = new Array();	
			quesText = quesText.replace(/'/g,'"');
			newImageFile = quesText.match(/(<img.+?src="(.+?)".+?>)/g);
			for (var i = 0; i < newImageFile.length; i++) {
				while (quesText.indexOf(newImageFile[i]) != -1) {
					var imageName = newImageFile[i].split('src=')[1].split('/>');
					quesText = quesText.replace(newImageFile[i], "<span class='ans' id='MGIMG_"+quesId+"_"+oldFileCounter+"'><a class='imageZoom' href="+imageName[0]+"><img class='imageZoom' style='max-width:300px;max-height:300px' src="+imageName[0]+"/></a></span>");
					
					jwPlayerDetailsArray["MGIMG_" + quesId + "_" + oldFileCounter] = "<span class='ans' id='MGIMG_"+quesId+"_"+oldFileCounter+"'><a class='imageZoom' href="+imageName[0]+"><img class='imageZoom' style='max-width:300px;max-height:300px' src="+imageName[0]+"/></a></span>";
					jwPlayerDetailsArrayIndex[tempCountIndex] = "MGIMG_" + quesId + "_" + oldFileCounter;
					tempCountIndex++;
					oldFileCounter++;
				}
			}
		}	
	}else{
		if(quesText.indexOf('<img') != -1) {
			var newImageFile = new Array();	
			quesText = quesText.replace(/'/g,'"');
			newImageFile = quesText.match(/(<img.+?src="(.+?)".+?>)/g);
			for (var i = 0; i < newImageFile.length; i++) {
				while (quesText.indexOf(newImageFile[i]) != -1) {
					var imageName = newImageFile[i].split('src=')[1].split('/>');
					quesText = quesText.replace(newImageFile[i], "<span class='ans'><span class='zoomimage' ><a title='Click the Image to Zoom' target='_blank'><img src="+imageName[0]+" class='max_img_ico' title='Click the Image to Zoom'></a></span></span>");
					oldFileCounter++;
				}
			}
		}	
	}
	jwPlayerDetails[quesId+""] = jwPlayerDetailsArray;
	jwPlayerDetailsIndex[quesId+""] = jwPlayerDetailsArrayIndex;
	return [quesText, oldFileCounter];
}

function makeMediaDiv(content){
	if (content.indexOf("<audio>") != -1) {
		var newAudioFile = new Array();
		newAudioFile = content.match(/(<audio>.+?<audio>)/g);
		if(newAudioFile!=null){
			for (var i = 0; i < newAudioFile.length; i++) {
				while (content.indexOf(newAudioFile[i]) != -1) {
					content = content.replace(newAudioFile[i], "<div class='UsefuljwAudioVideo' id='jwAudio"+counter.value()+"' title='tkcimages/" + newAudioFile[i].split("<audio>")[1] + "'></div>");
					counter.increment();
				}
			}
		}
	}
	if (content.indexOf("<video>") != -1) {
		var newVideoFile = new Array();
		newVideoFile = content.match(/(<video>.+?<video>)/g);
		if(newVideoFile!=null){
			for (var i = 0; i < newVideoFile.length; i++) {
				while (content.indexOf(newVideoFile[i]) != -1) {
					content = content.replace(newVideoFile[i], "<div class='UsefuljwAudioVideo' id='jwVideo"+counter.value()+"' title='tkcimages/" + newVideoFile[i].split("<video>")[1] + "'></div>");
					counter.increment();
				}
			}
		}
	}
	return content;
}



//Added by sai for extra time 
function divideScribeTimeForGroups(flag){
	if(flag){
		clearTimeout(mockVar.timeCounter);
		for(var i=0;i<mockVar.groups.length;i++){
			mockVar.groups[i].minTime=Math.round(mockVar.groups[i].minTime+((mockVar.groups[i].minTime*parseFloat(scribeExtraTime))/100));
			mockVar.groups[i].breakTime = Math.round(mockVar.groups[i].breakTime+((mockVar.groups[i].breakTime*parseFloat(scribeExtraTime))/100));
			mockVar.groups[i].maxTime=Math.round(mockVar.groups[i].maxTime+((mockVar.groups[i].maxTime*parseFloat(scribeExtraTime))/100));
			if(i<mockVar.currentGrp){
				mockVar.groups[i].isViewable=true;
				mockVar.groups[i].isEditable=true;
			}
		}
		mockVar.nonTimeBoundTime=Math.round(mockVar.nonTimeBoundTime+((mockVar.nonTimeBoundTime*parseFloat(scribeExtraTime))/100));
		mockVar.time=Math.round(mockVar.time+((mockVar.time*parseFloat(scribeExtraTime))/100));
		mockVar.completeTime=Math.round(mockVar.completeTime+((mockVar.completeTime*parseFloat(scribeExtraTime))/100));
		mockVar.scribeExtraTimeConsumed=1;
		timer();
	}
	else{
		if(mockVar.groupConfigArray!=undefined && mockVar.groupConfigArray.length>0 && mockVar.nonTbTime!=undefined && mockVar.nonTbTime>=0){
			divideCandExtraTime();
		}
	}
}
function divideCandExtraTime(){
	var timeForCurrentGrp=0;
	clearTimeout(mockVar.timeCounter);
	for(var i=0;i<mockVar.groups.length;i++){
		mockVar.groups[i].minTime=Math.round(mockVar.groups[i].minTime+((mockVar.groupConfigArray[i].minTime*parseFloat(candidateExtraTime))/100));
		mockVar.groups[i].maxTime=Math.round(mockVar.groups[i].maxTime+((mockVar.groupConfigArray[i].maxTime*parseFloat(candidateExtraTime))/100));
		if(i<mockVar.currentGrp){
			mockVar.groups[i].isViewable=true;
			mockVar.groups[i].isEditable=true;
		}
	}
	if(parseInt(mockVar.groupConfigArray[mockVar.currentGrp].maxTime)!=0){
		timeForCurrentGrp=Math.round((mockVar.groupConfigArray[mockVar.currentGrp].maxTime*parseFloat(candidateExtraTime))/100);
	}else{
		timeForCurrentGrp=Math.round((mockVar.nonTbTime*parseFloat(candidateExtraTime))/100);
	}
	mockVar.nonTimeBoundTime=Math.round(mockVar.nonTimeBoundTime+(mockVar.nonTbTime*parseFloat(candidateExtraTime))/100);
	mockVar.time=Math.round(mockVar.time+timeForCurrentGrp);
	if(mockVar.totalDurationOfAssessment!=undefined)
	mockVar.completeTime=Math.round(mockVar.completeTime+((mockVar.totalDurationOfAssessment*parseFloat(candidateExtraTime))/100));
	else
	mockVar.completeTime=Math.round(mockVar.completeTime+((mockVar.completeTime*parseFloat(candidateExtraTime))/100));
	mockVar.candidateExtraTimeConsumed=1;
	timer();
}

(function() {
	var params = {},
	r = /([^&=]+)=?([^&]*)/g;
	function d(s) {
		return decodeURIComponent(s.replace(/\+/g, ' '));
	}
	var match, search = window.location.search;
	while (match = r.exec(search.substring(1))) {
		params[d(match[1])] = d(match[2]);

		if(d(match[2]) === 'true' || d(match[2]) === 'false') {
			params[d(match[1])] = d(match[2]) === 'true' ? true : false;
		}
	}
	window.params = params;
})();

function addStreamStopListener(stream, callback) {
	var streamEndedEvent = 'ended';
	if ('oninactive' in stream) {
		streamEndedEvent = 'inactive';
	}
	stream.addEventListener(streamEndedEvent, function() {
		callback();
		callback = function() {};
	}, false);
	stream.getAudioTracks().forEach(function(track) {
		track.addEventListener(streamEndedEvent, function() {
			callback();
			callback = function() {};
		}, false);
	});
	stream.getVideoTracks().forEach(function(track) {
		track.addEventListener(streamEndedEvent, function() {
			callback();
			callback = function() {};
		}, false);
	});
}

var prevRadioValue,curRadQuesId = -1; 
function radioCheckUncheck(_this,quesId){
	if(prevRadioValue!=$(_this).attr('value')){
		$(_this).removeClass("checked");		

	}else if(quesId != curRadQuesId && prevRadioValue==$(_this).attr('value')){
		$(_this).removeClass("checked");
	}
	curRadQuesId = quesId;
	prevRadioValue = $(_this).attr('value');
	if ($(_this).hasClass("checked")) {
		// Remove the placeholder.
		$(_this).removeClass("checked");
		// And remove the selection.
		$(_this).removeAttr("checked");
		// If the button is not selected.
	} else {
		// Remove the placeholder from the other buttons.
		$("input[type='radio']").each(function () {
			$(_this).removeClass("checked");
		});
		// And add the placeholder to the button.
		$(_this).addClass("checked");
	}
	if(quesId!==undefined && quesId!==null && quesId!=="")
		saveActQuesGrp(quesId);
}

function saveGrpAllAns(){
	getCurrentGrpSecQuestId(false,0);
	var selectedAnswer="";
	var groupAnswers = new Array();
	//var wordCountForSA = "";
	var proceed = true;
	var section = iOAP.secDetails[iOAP.curSection];
	var hasOptionalQuestion = section.hasOptionalQuestion;
	var quesToBeConsidered = 0;
	var selectedOptId = '';
	for(var i=0;i<section.questions.length;i++){
		if(section.questions[i].quesType =="SA" && section.questions[i].keyboardType != "FileUpload"){
			selectedAnswer = document.getElementById('answer'+section.questions[i].quesId).value;
			//mockVar.curSectionQuestions[i].quesParam.answer = selectedAnswer;
			/*if(mockVar.groups[mockVar.currentGrp].secDetails[iOAP.curSection].questions[i].selectedAnswerList != 'undefined')
							mockVar.groups[mockVar.currentGrp].secDetails[iOAP.curSection].questions[i].selectedAnswerList = mockVar.groups[mockVar.currentGrp].secDetails[iOAP.curSection].questions[i].selectedAnswerList +"@"+selectedAnswer;*/
			selectedOptionsAndAnswersList(mockVar.currentGrp,iOAP.curSection,i,selectedAnswer,"");
			groupAnswers.push(new groupAnswerBean(section.questions[i].quesId,selectedAnswer));
			mockVar.curSectionQuestions[i].quesParam.langID = mockVar.curSectionQuestions[i].quesLangBeans[mockVar.langIndex].langId;
			//	selectedAnswer.push(new answerKeyBean(keyName,keyVal));
			//wordCountForSA = $("#noOfWords"+section.questions[i].quesId).text();
			//mockVar.curSectionQuestions[i].typedWord =  $('#noOfWords'+section.questions[i].quesId).html()==undefined?$('#noOfWords'+section.questions[i].quesId).text():$('#noOfWords'+section.questions[i].quesId).html().split(' ')[0];
			mockVar.curSectionQuestions[i].typedWord = $('#noOfWords'+section.questions[i].quesId).html()==undefined?($('#noOfWords').html()!=undefined ? $('#noOfWords').html().split(' ')[0]:'0'):$('#noOfWords'+section.questions[i].quesId).html().split(' ')[0];
		}
		else if(section.questions[i].quesType =="MCQ" || section.questions[i].quesType =="MSQ"){
			selectedAnswer = "";
			selectedOptId ="";
			var answers = document.getElementsByName('answers'+section.questions[i].quesId);
			//keyName =section.questions[i].quesId;
			for(var j=0;j<answers.length;j++){
				if(answers[j].checked==true){   
					selectedAnswer = answerTxt(j,answers,selectedAnswer);
					//selectedAnswer = ($(answers[j]).parent().next('span').text()) + "<ANS_SEP>" + selectedAnswer;
					selectedOptId = (answers[j].value) + "," + selectedOptId;
				}
			}
			if(selectedAnswer !=""){
				selectedAnswer = selectedAnswer.substring(0,selectedAnswer.length-9);
			}
			//Added by Boddu Rakesh
			if(selectedOptId!=''){
				selectedOptId = selectedOptId.substring(0,selectedOptId.length-1);
			}
			selectedOptionsAndAnswersList(mockVar.currentGrp,iOAP.curSection,i,selectedOptId,"id");
			//mockVar.curSectionQuestions[i].quesParam.answer = selectedAnswer;
			groupAnswers.push(new groupAnswerBean(section.questions[i].quesId,selectedAnswer,selectedOptId));
			//mockVar.curSectionQuestions[i].quesParam.selectedOptId = selectedOptId;
			mockVar.curSectionQuestions[i].quesParam.langID = mockVar.curSectionQuestions[i].quesLangBeans[mockVar.langIndex].langId;
		}
	} 
	if(proceed){
		for(var m=0;m<section.questions.length;m++){
			for(var n=0;n<groupAnswers.length;n++){
				if(groupAnswers[n].quesId == section.questions[m].quesId){
					mockVar.curSectionQuestions[m].quesParam.answer = groupAnswers[n].answer;
					if(section.questions[m].quesType == "MCQ" || section.questions[m].quesType == "MSQ"){
						mockVar.curSectionQuestions[m].quesParam.selectedOptId = groupAnswers[n].optionId;
					}
				}
			}
		}
		if(section.maxOptQuesToAns != ""){
			//if(mockVar.isMarkedForReviewConsidered == "YES"){
			var counter = 0;
			for(var i=0;i<iOAP.secDetails[iOAP.curSection].questions.length;i++){
				//var quesStatus = iOAP.secDetails[iOAP.curSection].questions[i].quesParam.status ;
				if(iOAP.secDetails[iOAP.curSection].questions[i].quesType!= "PROGRAMMING TEST"){
					if( !(iOAP.secDetails[iOAP.curSection].questions[i].quesParam.answer == null 
							||  iOAP.secDetails[iOAP.curSection].questions[i].quesParam.answer == '' )){
						counter++;
					}
				}
			}
			quesToBeConsidered += counter;
			//	}
			if(hasOptionalQuestion=='true' && quesToBeConsidered>section.maxOptQuesToAns ){
				proceed = false;
				cnfPop('InfoPopup');
				//$("#infoMsg2").html("You have attempted "+quesToBeConsidered+" question, which is more than the  maximum limit ("+section.maxOptQuesToAns+") of this section.  Please reset the questions which are already answered");
				$("#infoMsg2").html($(globalXmlvar).find('maxQuestionsAlert').text());
				$(".quesToBeConsidered").html(quesToBeConsidered);
				$(".maxOptQuesToAns").html(section.maxOptQuesToAns);
			}
		}
		if(proceed)
			saveCurGroup();
	}
	var idValue = jQuery("#savenextGroup").val();
	auditlogCreation(idValue,"","savenextGroup");
}

function saveCurGroup(){
	for(var i=0;i<mockVar.curSectionQuestions.length;i++){
		var quesStatus = mockVar.curSectionQuestions[i].quesParam.status;
		var quesAnswer = mockVar.curSectionQuestions[i].quesParam.answer;
		if(quesAnswer == "" && mockVar.curSectionQuestions[i].quesType != "SUBJECTIVE")
			quesAnswer = null;
		if(iOAP.secDetails[iOAP.curSection].groupAllQuestions == "true"){
			if(quesAnswer==null){
				if(quesStatus=="answered"){
					iOAP.secDetails[iOAP.curSection].notanswered++;
					iOAP.secDetails[iOAP.curSection].answered--;
				}
				mockVar.curSectionQuestions[i].quesParam.status="notanswered";
			}else{
				if(quesStatus!="answered"){
					if(quesStatus=="notanswered")
						iOAP.secDetails[iOAP.curSection].notanswered--;
					iOAP.secDetails[iOAP.curSection].answered++;
				}
				mockVar.curSectionQuestions[i].quesParam.status="answered";
			}
		}
	}
	fillSections();
}

function saveActQuesGrp(quesId){
	if(iOAP.secDetails[iOAP.curSection].groupAllQuestions == "true"){
		if (typeof(Storage) !== "undefined"){
			if(sessionStorage.getItem( 'groupAllSec'+iOAP.groupId+iOAP.curSection )==null){
				sessionStorage.setItem( 'groupAllSec'+iOAP.groupId+iOAP.curSection , quesId);
			}else{
				sessionStorage.setItem( 'groupAllSec'+iOAP.groupId+iOAP.curSection , quesId)  ;
			}
		}
	}
}

function resumeActQuesGrp(){
	if(iOAP.secDetails[iOAP.curSection].groupAllQuestions == "true"){
		if (typeof(Storage) !== "undefined"){
			if(sessionStorage.getItem( 'groupAllSec'+iOAP.groupId+iOAP.curSection )!=null){
				var curQues = sessionStorage.getItem( 'groupAllSec'+iOAP.groupId+iOAP.curSection);
				var offset = 0;
				offset = document.getElementById('quesAnsContent'+curQues).offsetTop - $('.leftDiv').offset().top;
				$(".leftDiv").animate({
					scrollTop: offset
				}, 'slow');
			}
		}
	}
}

function getSummaryBody(i,tempIOAP,j){
	if($("#g"+(j)).attr('data-normgrpsec')==="true"){
		timeOutStr = "<tbody><tr><td width='25%'>"+tempIOAP.secDetails[i].secName+"</td><td width='12%'>"+tempIOAP.secDetails[i].questions.length+"</td><td width='12%'>"+tempIOAP.secDetails[i].answered+"</td><td width='12%'>"+tempIOAP.secDetails[i].notanswered+"</td><td width='12%'>"+tempIOAP.secDetails[i].marked+"</td><td width='12%'>"+tempIOAP.secDetails[i].markedAndAnswered+"</td><td width='15%'>"+(tempIOAP.secDetails[i].questions.length-tempIOAP.secDetails[i].answered-tempIOAP.secDetails[i].notanswered-tempIOAP.secDetails[i].marked - tempIOAP.secDetails[i].markedAndAnswered )+"</td></tr><tbody>";
	}else{
		/*timeOutStr = "<tbody><tr><td width='25%'>"+tempIOAP.secDetails[i].secName+"</td><td width='15%'>"+tempIOAP.secDetails[i].questions.length+"</td><td width='15%'>"+tempIOAP.secDetails[i].answered+"</td><td width='15%'>"+tempIOAP.secDetails[i].notanswered+"</td><td width='15%'>"+(tempIOAP.secDetails[i].questions.length-tempIOAP.secDetails[i].answered-tempIOAP.secDetails[i].notanswered-tempIOAP.secDetails[i].marked - tempIOAP.secDetails[i].markedAndAnswered )+"</td></tr><tbody>";*/
		timeOutStr = "<tbody><tr><td width='25%'>"+tempIOAP.secDetails[i].secName+"</td><td width='15%'>"+tempIOAP.secDetails[i].questions.length+"</td><td width='15%'>"+tempIOAP.secDetails[i].answered+"</td><td width='15%'>"+tempIOAP.secDetails[i].notanswered+"</td></tr><tbody>";
		
	}
	return timeOutStr;
}

// Responsive js   ------------------------------------------------------------ Responsive js 
$(document).on('click', '.hamburgerBar', function() {
	var x = $(window).height();
	$(this).addClass("hambg");
	$(this).hide();
	$(".canvasmenu").css("height", x);
	$(".overlaymenu").css("display", "block");
	$("#minwidth").css("position", "relative");
	$("#minwidth").css("height", x);
	$("#minwidth").animate({
		right: 315
	}, 800, function() {});
	$(".canvasmenu").animate({
		width: 315,
		right: -315
	}, 400, function() {});

});

$(document).on('click', '.hamburgerBar.canvas', function() {
	$("#minwidth").removeClass("animatewidth");
	$(".hamburgerBar").removeClass("hambg");
	$(".hamburgerBar").show();
	$(".canvasmenu").css({ "right": "-315px", "width": "0px" });
	//$("#minwidth").css("height", 'auto');
	$("#minwidth").animate({
		right: 0
	}, 400, function() {});

	$(".overlaymenu").css("display", "none");
	//setDIVHeight_resp();
});


$(document).ready(function() {
	$("ul.user_select li").each(function(e) {
		$(this).click(function() {
			$('.sections').hide().eq(e).show();
			$('.user_select li .menubx').removeClass('selected').eq(e).addClass('selected');
		});
	});

	$(document).on('click', '.setngico', function() {
		$(this).parent(".stngsection").find(".setngbx").toggle();
		$(this).next(".setng_arrow").toggle();
		$('.ui-state-default,.dragSource ul,.select-style select,.jwplayer').css('z-index','-1');
	});

	$(document).on('click touchstart',function(e) {
		if (!$(e.target).parents().children().hasClass('setngico')) {
			$(".setngbx").hide();
			$(".setng_arrow").hide();
			$('.ui-state-default,.dragSource ul,.select-style select,.jwplayer').css('z-index','1');
		}
	});

	$(document).on('click', '.grup_head', function() {
		$(".bx_arrow").hide();
		$(".grupbox2").hide();
		$(this).parent(".grups").find(".grupbox2").toggle();
		$(this).next(".bx_arrow").toggle();
	});

	$(document).on('click touchstart',function(e) {
		if (!$(e.target).parents().children().hasClass('grup_head')) {
			$(".grupbox2").hide();
			$(".bx_arrow").hide();
		}
	});

	/* For Checkbox */
	$(".subbox .subticks").click(function() {

		if ($(this).hasClass('activeClicked')) {
			$(this).removeClass("activeClicked");
			$(this).find("div.tickChecked").remove();
		} else {
			$(this).addClass("activeClicked");
			$(this).append("<div class='tickChecked'></div>");
		}
	}, function() {

		if (!($(this).hasClass('activeClicked'))) {
			$(this).addClass("activeClicked");
			$(this).append("<div class='tickChecked'></div>");
		} else {
			$(this).removeClass("activeClicked");
			$(this).find("div.tickChecked").remove();
		}

	});



	/* For Horizontal Scroll */
	/*var qpanelwidth=$(window).width()- $(".stngsection").width();
    $(".qarea_resp").width(qpanelwidth - 50);*/

	var spanwidth = $(".qcontainer span").width();
	var spanlength = $(".qcontainer span").length;

	var totwidth = (spanwidth * spanlength) + (10 * spanlength);
	$(".qcontainer").width(totwidth);

	$(document).on('click', '.icncont', function() {
		$(this).next(".piconsscroll_box").toggle();
	});


	/* Script For Selection of 6 Panel Icons */

	$(document).on('click touchstart', '.scroll_bars', function() {

		$(".scroll_bars .sel_icon").removeClass("sactive");
		$(this).find(".sel_icon").addClass("sactive");
		var className = $(this).find('span').attr('class');
		$(".icncont span").removeClass().addClass(className);
		//$(".piconsscroll_box").hide();
	});

	$(document).on('click touchstart',function(e) {
		if (!$(e.target).parents().children().hasClass('icncont')) {
			$(".piconsscroll_box").hide();
		}
	});

	/* Script for Select Language Accordian */

	$(document).on('click', '.lang', function() {
		$(this).toggleClass("langbg");
		$(this).find('i').toggleClass("dwnarw");
		$(".langselect").slideToggle(400);

	});

	$(document).on('click', '.picons', function() {
		$('.picons').removeClass("pactive");
		$(this).toggleClass("pactive");
		$(".langselect").slideToggle(400);

	});

	/*  $(document).on('click', '.qstn_zoom', function() {
        //$(".overlaymenu").css("display", "block");
        $(".zoompopup").show();

        var i = document.getElementById("quesOuterDiv");

        // go full-screen
        if (i.requestFullscreen) {
            i.requestFullscreen();
        } else if (i.webkitRequestFullscreen) {
            i.webkitRequestFullscreen();
        } else if (i.mozRequestFullScreen) {
            i.mozRequestFullScreen();
        } else if (i.msRequestFullscreen) {
            i.msRequestFullscreen();
        }
    });

    $(document).on('click', '.closeicon', function() {
        $(".overlaymenu").css("display", "none");
        $(".zoompopup").hide();
    });*/

	// align_popup();



	$(window).resize(function() {
		//window.moveTo(0,0);
		//window.resizeTo(screen.width,screen.height);
		var url = document.URL;
		if(url.indexOf("quiz.html") >=0){
			if (jQuery(window).width() > 1000) {
				$("#minwidth").removeClass("animatewidth");
				$(".hamburgerBar").removeClass("hambg");
				$(".hamburgerBar").hide();
				$('.subheader_tab,.grup_components,.q_tab,.btntab').hide();
				$(".canvasmenu").css({ "right": "-315px", "width": "0px" });
				$("#minwidth").animate({
					right: 0
				}, 4, function() {});

				$(".overlaymenu").css("display", "none");
				$('.mpop').hide();
				$('.overlay').hide();
				if(!($('.preGrpInstruL').is(':visible')))
					$('#col2').show();
				else
					$('.preGroupInstR').show();			
				$("#minwidth").css("height", 'auto');
				quizPageHeight();
			} else {
				var x = $(window).height();
				$("#minwidth").css("height", x);
				$('#col2').hide();
				if(!($('#sectionSummaryDiv').is(':visible') || $('#breakTimeDiv').is(':visible') || $('#scoreCardDiv').is(':visible') || $('.preGrpInstruL').is(':visible')) ){
					$(".hamburgerBar").show();
					$('.subheader_tab,.grup_components,.q_tab').show();
				}
				var orientation = screen.width > screen.height ? "Landscape" : "Portrait";
				setDIVHeight_resp(orientation); 
				// align_popup();
				// setDIVHeight_resp_scroll();
			}
		}
	});
	browserRelatedCheck = (function(){
		var ua = navigator.userAgent.toLowerCase();
		return { 
			isAndroid : ua.indexOf("android") > -1,
			initialHeight : window.innerHeight
		};
	}());
	/* function align_popup() {

        var window_height = jQuery(window).height();
        var window_width = jQuery(window).width();

        $(".zoompopup").width(window_width);
        $(".zoompopup").height(window_height);

        var popup_height = jQuery('.zoompopup').height();
        var popup_width = jQuery('.zoompopup').width();
        // var marginTop = (window_height - popup_height) / 2;
        // var marginLeft = (window_width - popup_width) / 2;
        jQuery('.zoompopup').css({ left: 0, top: 0 });
    }*/

});


/*function setDIVHeight_resp_scroll() {
    var xnew1 = jQuery(window).height() - (jQuery(".grup_components").outerHeight(true) + jQuery(".q_tab.question_area").outerHeight(true) + jQuery(".btntab").outerHeight(true));
    jQuery(".leftDiv").css("height", xnew1);
}*/

$(document).on('click', '.mlanguageSelected', function(event) {
	event.preventDefault();
	/* Act on the event */
	selLang(this.value);
	$('.picons').removeClass("pactive");
	$(this).toggleClass("pactive");
	$(".langselect").slideToggle(400);
});

function setDIVHeight_resp(orientation){
	var xnew = 0;
	if(!(browserRelatedCheck.isAndroid == true && orientation == "Portrait" && (browserRelatedCheck.initialHeight > window.innerHeight))){
		if(!($('#sectionSummaryDiv').is(':visible') || $('#breakTimeDiv').is(':visible') || $('#scoreCardDiv').is(':visible') || $('.preGrpInstruL').is(':visible')) ){
			$('.btntab').show();
			$('#currentQues').css('position','initial');
		}
		var height = $(window).height() - (jQuery("#header").outerHeight(true)+jQuery(".subheader_tab").outerHeight(true));
		if ($(window).width() > 701){
			xnew=jQuery(window).height()-(jQuery("#header").outerHeight(true)+jQuery(".subheader_tab").outerHeight(true)+jQuery(".grup_components").outerHeight(true)+jQuery(".q_tab.question_area").outerHeight(true)+jQuery('.btntab').outerHeight(true) + 5);
		}
		else if($(window).width() > 481 && $(window).width() < 701){	
			xnew=jQuery(window).height()-(jQuery("#header").outerHeight(true)+jQuery(".subheader_tab").outerHeight(true)+jQuery(".grup_components").outerHeight(true)+jQuery(".q_tab.question_area").outerHeight(true)+jQuery('.btntab').outerHeight(true) + 42);
		}else{
			xnew=jQuery(window).height()-(jQuery("#header").outerHeight(true)+jQuery(".subheader_tab").outerHeight(true)+jQuery(".grup_components").outerHeight(true)+jQuery(".q_tab.question_area").outerHeight(true)+jQuery('.btntab').outerHeight(true)+25);
		}
		if($(window).width()<560 && (typeof(iOAP.secDetails[iOAP.curSection].groupAllQuestions) == "undefined" || iOAP.secDetails[iOAP.curSection].groupAllQuestions == "" || iOAP.secDetails[iOAP.curSection].groupAllQuestions == "false"  ) &&
				($('#compreText').is(':visible')|| $('#laq_text').is(':visible'))){
			jQuery(".leftDiv").css("height",'auto');
			jQuery("#programingAnsContent").css("height",'100%');
			jQuery(".rightDiv").css("height",'auto');
			jQuery(".rightDiv").addClass('mRightComp');
			jQuery(".leftDiv").addClass('mLeftComp');
			//jQuery(".rightRecordingDiv").addClass('mRightComp');
			//jQuery(".leftRecordingDiv").addClass('mLeftComp');
			jQuery(".divHeader").addClass('mdivHeader');
			jQuery("#quesOuterDiv").css({"height":xnew,'overflow':'auto'});
		}else{
			jQuery(".leftDiv").css("height",xnew);
			jQuery(".rightDiv").css("height",xnew);
			jQuery(".leftDiv").removeClass('mLeftComp');
			jQuery(".rightDiv").removeClass('mRightComp');
			//jQuery(".rightRecordingDiv").removeClass('mRightComp');
			//jQuery(".leftRecordingDiv").removeClass('mLeftComp');
			jQuery("#quesOuterDiv").css({"height":"auto",'overflow':'hidden'});
			$('#progEditorDisplay').height($('#progRightPart').height() - $('#progDescriptionDiv').outerHeight(true) - 2);
		}
		$('#sectionSummaryDiv').height($(window).height() - jQuery("#header").outerHeight(true));
		$('#instruContentDiv').height( height - $('#instruPrcdBtnDiv').outerHeight(true) - $('.titlepath').outerHeight(true));
		$('#instruright').height(height + jQuery(".subheader_tab").outerHeight(true));
		$('#breakTimeDiv').height($(window).height() - jQuery("#header").outerHeight(true));
		$('#scoreCardDiv').height($(window).height() - jQuery("#header").outerHeight(true));
		if($('.setngbx').height()>xnew)
			$('.setngbx').height(xnew);
		$('#textareaforflip').height($('#progRightPart1').height() - $('#progDescriptionDiv').outerHeight(true) - 27);
		//$('#breakContentDiv').height($('#breakTimeDiv').height() - $('#brkPrcdBtnDiv').outerHeight(true) - $('#col1').outerHeight(true));
		//$('#breakSummaryDiv').height($('#breakContentDiv').height() - $('#breakTimeCountDiv').outerHeight(true));
		$('#break_summary').height($('#breakTimeDiv').height() - $('#brkPrcdBtnDiv').outerHeight(true) - $('#col1').outerHeight(true) - $('#breakTimeCountDiv').outerHeight(true) - 40 - $('.examSummaryHeader').outerHeight(true));
		$('#group_summary').height($('#sectionSummaryDiv').height() - $('#confirmation_buttons').outerHeight(true) - $('.examSummaryHeader').outerHeight(true) - 100);
		$('#sc_group_summary').height($('#scoreCardDiv').outerHeight(true)-$('.titlepath').outerHeight(true)- $('.grayBand').outerHeight(true) -$('#scoreCardBtnDiv').outerHeight(true));	
	}else{
		if(!($('#sectionSummaryDiv').is(':visible') || $('#breakTimeDiv').is(':visible') || $('#scoreCardDiv').is(':visible') || $('.preGrpInstruL').is(':visible')) ){
			$('.btntab').hide();
			$('#currentQues').css('position','absolute');
		}
	}	
}

function tableResp(){
	if ($(window).width() < 660 ){
		$('.generated_for_mobile').remove();
		$('table').each(function() {
			var table = $(this); // cache table object
			var head = table.find('thead th');
			var rows = table.find('tbody tr').clone(); // appending afterwards does not break original table
			// create new table
			var newtable = $(
					'<table class="generated_for_mobile">' +
					'  <tbody>' +
					'  </tbody>' +
					'</table>'
			);
			// cache tbody where we'll be adding data
			var newtable_tbody = newtable.find('tbody');
			rows.each(function(i) {
				var cols = $(this).find('td');
				cols.each(function(k) {
					var new_tr = $('<tr></tr>').appendTo(newtable_tbody);
					new_tr.append(head.clone().get(k));
					new_tr.append($(this));
				});
			});
			$(this).after(newtable);
		});
		$('.score_card_table').remove();
	}
}

// responsive js code ends


function showInstruction(){
	$('<iframe />');  // Create an iframe element
	$('<iframe />', {
		name: 'frame1',
		id: 'iframeId',
		src: 'iframesQuiz.html'
	}).appendTo('.mContent');
	//$('.mContent').html('<iframe id="frame1" src="iframesQuiz.html" style="height:95%;width:100%;border:none;border-bottom:1px #CCC solid;"></iframe>')
	$(".mpop").fadeIn('slow');
	$('.overlay').show();
	$(".mpop table").css({'text-align':'left'});
}

var counter = (function() {
	var privateCounter = 1;
	function changeBy(val) {
		privateCounter += val;
	}
	return {
		increment: function() {
			changeBy(1);
		},
		value: function() {
			return privateCounter;
		}
	};   
})();
$(function(){
	if (/iPhone|iPod|iPad/.test(navigator.userAgent)){
		$('.mContent,#commonPageInstruction').css({overflow: 'auto','-webkit-overflow-scrolling': 'touch' });
	}
});

function selectedOptionsAndAnswersList(grpId,secId,questionId,values,type){
	if(type == "id"){
		if(values!=''){
			/*selectedOptId = selectedOptId.substring(0,selectedOptId.length-1);*/
			if(mockVar.groups[grpId].secDetails[secId].questions[questionId].selectedOptIdsList != 'undefined')
				mockVar.groups[grpId].secDetails[secId].questions[questionId].selectedOptIdsList = mockVar.groups[grpId].secDetails[secId].questions[questionId].selectedOptIdsList +"@"+values;
		} else {
			if(mockVar.groups[grpId].secDetails[secId].questions[questionId].selectedOptIdsList != 'undefined')
				mockVar.groups[grpId].secDetails[secId].questions[questionId].selectedOptIdsList = mockVar.groups[grpId].secDetails[secId].questions[questionId].selectedOptIdsList +"@--";
		}
	} else {
		if(mockVar.groups[grpId].secDetails[secId].questions[questionId].selectedAnswerList != 'undefined'){
			if(values!='')
				mockVar.groups[grpId].secDetails[secId].questions[questionId].selectedAnswerList = mockVar.groups[grpId].secDetails[secId].questions[questionId].selectedAnswerList +"@"+values;
			else
				mockVar.groups[grpId].secDetails[secId].questions[questionId].selectedAnswerList = mockVar.groups[grpId].secDetails[secId].questions[questionId].selectedAnswerList +"@--";
		}
	}
}

function magnifyingGlass() {
	$('.jqzoom').jqzoom({
		zoomType: 'standard',
		lens: true,
		preloadImages: false,
		alwaysOn: false
	});
	$('.jqzoom').hover(function(){
		$(this).nextAll().closest('.jqzoom').css('opacity',0);
	}, function(){
		$(this).nextAll().closest('.jqzoom').css('opacity',1);
	});
}
function answerTxt(i,answers,selectedAnswer){
	var str = $(answers[i]).parent().next('span')[0].innerHTML;
	str = str.replace(/'/g,"\"");
	var answerTxt = filterMediaAns(str);
	//answerTxt += $(answers[i]).parent().next('span').text();
	answerTxt = addMediaFiles(answerTxt,str,answers,i);
	selectedAnswer = $.trim(answerTxt.replace(/00:00/g,"")) + "<ANS_SEP>" + selectedAnswer;
	return selectedAnswer;
}
	
function answerTxtForAdditionalQues(selectedAnswer,answerDiv,additionalType){
	//var str = answerDiv.html();
	var str = answerDiv.children('span').html();
	str = str.replace(/'/g,"\"");
	var answerTxt = filterMediaAns(str);
	//answerTxt += answerDiv.text();
	answerTxt = addMediaFiles(answerTxt,str,answerDiv,"add");
	if(additionalType == "GROUP")
		selectedAnswer = $.trim(answerTxt.replace(/00:00/g,"")) + "<ANS_SEP>" + selectedAnswer;
	else
		selectedAnswer = $.trim(answerTxt.replace(/00:00/g,""));
	return selectedAnswer;
}

function filterMediaAns(str){
	var answerTxt = '';		
	if(str.indexOf("imageZoom")>-1){
		var regex=/(.*?)<span class="ans.*?<\/a><\/span>(.*)/g;
		var m='';
		while ((m = regex.exec(str)) !== null) {
			if (m.index === regex.lastIndex) {
				regex.lastIndex++;
			}
			answerTxt += m[1]+"<IMAGE>"+m[2]; 
		}
	}else if(str.indexOf("zoomimage")>-1){
		var regex=/(.*?)<span class="ans.*?<\/a><\/span><\/span>(.*)/g;
		var m='';
		while ((m = regex.exec(str)) !== null) {
			if (m.index === regex.lastIndex) {
				regex.lastIndex++;
			}
			answerTxt += m[1]+"<IMAGE>"+m[2]; 
		}
	}else if(str.indexOf("<img")>-1){
		var regex = /(.*?)<img .*?src=".*? ">(.*)/g;
		var m = '';
		answerTxt=str;
		while(answerTxt.indexOf("<img src")>-1){
			if((m = regex.exec(answerTxt)) !== null)
				answerTxt = m[1]+"<IMAGE>"+m[2]; 
		}	
	}
	if(str.indexOf("jwplayer")>-1){
		var regex = /(.*?)<div class="jwplayer.*?jwplaylistcontainer"><\/span><\/div>(.*?)/g;
		var m='';
		if(answerTxt!="")
			str=answerTxt;
		answerTxt="";
		while ((m = regex.exec(str)) !== null) {
			if (m.index === regex.lastIndex) {
				regex.lastIndex++;
			}
			answerTxt += m[1]+"<Media>"; 
		}
	}
	if(answerTxt.trim()=="")
		answerTxt=str;
	return answerTxt;
}
/*function filterMediaAns(str){
	var answerTxt = '';
	if(str.indexOf("<img")>-1){
		var regex = /<img src=".*?tkcimages(.*?)\s/g;
		var m = '';
		while ((m = regex.exec(str)) !== null) {
			if (m.index === regex.lastIndex) {
				regex.lastIndex++;
			}
			answerTxt += "<image>"+m[1].substring(1)+"<image>"; 
		} 
	}
	if(str.indexOf("jwplayer")>-1){
		var regex = /".*?((?:jwAudio|jwVideo)_\d_\d)_caption/g;
		var m = '';
		var mediaFile = '';
		while ((m = regex.exec(str)) !== null) {
			if (m.index === regex.lastIndex) {
				regex.lastIndex++;
			}
			mediaFile = jwplayer(m[1]).getPlaylist()[0]['file'];
			var x = mediaFile.indexOf("tkcimages");
			var mediaName = mediaFile.substring(x + 10);
			answerTxt += "<Media>"+mediaName+"<Media>"; 
		}
	}
	return answerTxt;
}*/
function addMediaFiles(answerTxt,str1,answers,i){
	var images="";
	var imageCount=0;
	if(str1.indexOf("imageZoom")>-1){
		if(i=="add"){
			$(answers[0]).children('span').children('span').each(function(){
				images=images+jQuery(this).children('a').attr('href').split('tkcimages/')[1]+",";
				imageCount++;
			});
		}else{
			$(answers[i]).parent().next('span').children('span').each(function(){
				images=images+jQuery(this).children('a').attr('href').split('tkcimages/')[1]+",";
				imageCount++;
			});
		}
		images=images.split(",");
		for(var i=0;i<imageCount;i++){
			answerTxt=answerTxt.replace("<IMAGE>","<image>"+images[i]+"<image>");
		}
	}else if(str1.indexOf("zoomimage")>-1){
		if(i=="add"){
			$(answers[0]).children('span').children('span').each(function(){
				images=images+jQuery(this).children('span').children('a').children('img').attr('src').split('tkcimages/')[1]+",";
				imageCount++;
			});
		}else{
			$(answers[i]).parent().next('span').children('span').each(function(){
				images=images+jQuery(this).children('span').children('a').children('img').attr('src').split('tkcimages/')[1]+",";
				imageCount++;
			});
		}
		images=images.split(",");
		for(var i=0;i<imageCount;i++){
			answerTxt=answerTxt.replace("<IMAGE>","<image>"+images[i]+"<image>");
		}
	}else if(str1.indexOf("img ")>-1){
		var regex = /<img .*?src=".*?tkcimages(.*?)\s/g;
		var m = '';
		while ((m = regex.exec(str1)) !== null) {
			if (m.index === regex.lastIndex) {
				regex.lastIndex++;
			}
			answerTxt = answerTxt.replace("<IMAGE>","<image>"+m[1].substring(1)+"<image>"); 
		} 
	}
	if(str1.indexOf("jwplayer")>-1){
		images="",imageCount=0;
		var regex = /".*?((?:jwAudio|jwVideo)_\d+_\d+)_caption/g;
		var m = '';
		var mediaFile = '';
		while ((m = regex.exec(str1)) !== null) {
			if (m.index === regex.lastIndex) {
				regex.lastIndex++;
			}
			mediaFile = jwplayer(m[1]).getPlaylist()[0]['file'];
			var x = mediaFile.indexOf("tkcimages");
			var mediaName = mediaFile.substring(x + 10);
			images += mediaName+","; 
		}
		images=images.split(",");
		for(var i=0;i<images.length-1;i++){
			answerTxt=answerTxt.replace("<Media>","<media>"+images[i]+"<media>");
		}
	}
	return answerTxt;
}
function navigateThroughNumberPanel(quesNo){
	var tempQuesNo;
	if(quesNo==null || typeof(quesNo)=='undefined'){
		tempQuesNo=$('#quesNo').val();
	}else{
		tempQuesNo=quesNo;
	}
	tempQuesNo=parseInt(tempQuesNo);
	getCurrentGrpSecQuestId(true,tempQuesNo);
	saveJwplayerParam();
	saveQuestionAutomatically();
	removeActiveLinks();
	iOAP.curQues = tempQuesNo;
	showModule("Questn_Area");
	var quesLangId = iOAP.secDetails[iOAP.curSection].questions[iOAP.curQues].quesParam.langID==""?mockVar.defaultLang:iOAP.secDetails[iOAP.curSection].questions[iOAP.curQues].quesParam.langID;
	getQuestion(quesLangId);
	if($('.typedAnswer')){
		//$('#typedAnswer').attr('disabled',true);
		$('#finalTypingSub').attr('disabled',true);
		$('#finalTypingSub').removeClass().addClass('typingTestButtonDisabled btn btn-primary-blue');
	}
	doCalculations(0,0);
	fillNumberPanel();

}
function navigateToSection(secNumber){
	var sectionID;
	if(secNumber==null || typeof(secNumber)=='undefined'){
		sectionID=$('#secNumber').val();
	}else{
		sectionID=secNumber;
	}
	sectionID=parseInt(sectionID);
	saveJwplayerParam();
	saveQuestionAutomatically();
	if(sectionID!=iOAP.curSection){
		iOAP.secDetails[iOAP.curSection].curQues = iOAP.curQues;
		iOAP.curQues = iOAP.secDetails[sectionID].curQues;
		iOAP.curSection = sectionID;
	}
	enableOptButtons();
	var quesLangId = iOAP.secDetails[iOAP.curSection].questions[iOAP.curQues].quesParam.langID==""?mockVar.defaultLang:iOAP.secDetails[iOAP.curSection].questions[iOAP.curQues].quesParam.langID;
	getQuestion(quesLangId);
	//changeQues(iOAP.curQues);
	numPanelSec();
	fillNumberPanel();

}
function navigateToGroup(grpNumber){
	var id;
	if(grpNumber==null || typeof(grpNumber)=='undefined'){
		id=$('#grpNumber').val();
	}else{
		id=grpNumber;
	}
	id=parseInt(id);
	if(mockVar.MaxGrpEnabled >= id && !mockVar.groups[mockVar.MaxGrpEnabled].isTypingGroup){
		if((!mockVar.groups[id].isDisabled && mockVar.groups[id].isViewable=="true")||mockVar.MaxGrpEnabled == id){
			mockVar.currentGrp = id;
			saveJwplayerParam();
			saveQuestionAutomatically();
			//fillGroups();
			iOAP=mockVar.groups[mockVar.currentGrp];
			var quesLangId = iOAP.secDetails[iOAP.curSection].questions[iOAP.curQues].quesParam.langID==""?mockVar.defaultLang:iOAP.secDetails[iOAP.curSection].questions[iOAP.curQues].quesParam.langID;
			getQuestion(quesLangId);
			if($('.typedAnswer')){
				$('.typedAnswer').attr('disabled',true);
				$('#finalTypingSub').attr('disabled',true);
				$('.typing').attr('disabled',true);//Mobile
				$('#finalTypingSub').removeClass().addClass('typingTestButtonDisabled btn btn-primary-blue');
			}
			doCalculations(0,0);
			numPanelSec();
			fillSections();
			enableOptButtons();
			fillNumberPanel();
			if(iOAP.noOptSec>0){
				$('#noOptSec').html(iOAP.noOptSec);
				$('#maxOptSec').html(iOAP.maxNoOptSec);
				$("#showOptionalSecSummary").show();
			}else{
				$("#showOptionalSecSummary").hide();
			}
			removeActiveLinks();
			showModule('Questn_Area');
			if (jQuery(window).width() > 1000) {
				quizPageHeight();
			} else {
				setDIVHeight_resp(); 
			}
		}else{
			var str = "<br/><center>"+$(globalXmlvar).find('grpAlreadyAttempted').text()+"</center>";
			str += "<table class='bordertable' cellspacing=0 width='80%' align='center' style='margin-top:10px'>";
			str += "<tr><th>Section Name</th><th>No. of Questions</th><th>Answered</th><th>Not Answered</th><th>Marked for Review</th><th>Not Visited</th></tr>";
			var temp_iOAP = mockVar.groups[id];
			var noOfAns = 0,noOfNtAns=0,noOfReview=0,totalQues=0,noOfNtAttemp=0;
			for(var i=0;i<temp_iOAP.secDetails.length;i++){
				if(temp_iOAP.secDetails[i].isOptional=='false'){
					str += "<tr><td>"+temp_iOAP.secDetails[i].secName+"</td><td>"+(temp_iOAP.secDetails[i].questions.length)+"</td><td>"+temp_iOAP.secDetails[i].answered+"</td><td>"+temp_iOAP.secDetails[i].notanswered+"</td><td>"+temp_iOAP.secDetails[i].marked+"</td><td>"+(temp_iOAP.secDetails[i].questions.length-temp_iOAP.secDetails[i].answered-temp_iOAP.secDetails[i].notanswered-temp_iOAP.secDetails[i].marked)+"</td></tr>";
					noOfAns = noOfAns + temp_iOAP.secDetails[i].answered;
					noOfNtAns = noOfNtAns + temp_iOAP.secDetails[i].notanswered;
					noOfReview = noOfReview + temp_iOAP.secDetails[i].marked;
					totalQues = totalQues + temp_iOAP.secDetails[i].questions.length;
					noOfNtAttemp = noOfNtAttemp + temp_iOAP.secDetails[i].questions.length.length-temp_iOAP.secDetails[i].answered-temp_iOAP.secDetails[i].notanswered-temp_iOAP.secDetails[i].marked;
				}else if(temp_iOAP.secDetails[i].isOptional=='false' && temp_iOAP.secDetails[i].isSelected){
					noOfAns = noOfAns + temp_iOAP.secDetails[i].answered;
					noOfNtAns = noOfNtAns + temp_iOAP.secDetails[i].notanswered;
					noOfReview = noOfReview + temp_iOAP.secDetails[i].marked;
					totalQues = totalQues + temp_iOAP.secDetails[i].questions.length;
					noOfNtAttemp = noOfNtAttemp + temp_iOAP.secDetails[i].questions.length.length-temp_iOAP.secDetails[i].answered-temp_iOAP.secDetails[i].notanswered-temp_iOAP.secDetails[i].marked;
					str += "<tr><td>"+temp_iOAP.secDetails[i].secName+"</td><td>"+(temp_iOAP.secDetails[i].questions.length)+"</td><td>"+temp_iOAP.secDetails[i].answered+"</td><td>"+temp_iOAP.secDetails[i].notanswered+"</td><td>"+temp_iOAP.secDetails[i].marked+"</td><td>"+(temp_iOAP.secDetails[i].questions.length.length-temp_iOAP.secDetails[i].answered-temp_iOAP.secDetails[i].notanswered-temp_iOAP.secDetails[i].marked)+"</td></tr>";
				}
			}
			str += "</table>";
			$(".viewQPDiv").html(str);
			$(".attemptedGroupName").html(mockVar.groups[id].groupName);
			showModule('QPDiv');
		}
	}
}

function showProfile(){
	if($('.courseInfoPop').css("display")=='none') {
		$('.courseInfoPop').css({ opacity: 1, display: 'block', 'z-index': '9999' });
		$('.textarea-div').css({ display: 'none' }); 
		$('.protactor-div').css({ display: 'none' }); 
		$('.ruler-div').css({ display: 'none' });
		$('#loadCalc').hide();
		$('.scratch-pad-container').hide();	
	}
	else { 
		$('.courseInfoPop').css({ display: 'none' }); 
	}
}
function closeWindowOrRedirect(){
	/*try{*/
	window.close();
	/*}catch(e){*/
	if(document.cookie.indexOf('isApp=true')== -1)
		$('#backupAlertMsgWindowClose').show();
	else
		$('#backupAlertMsgWindowClose').hide();
	/*}*/
}

$(document).on('click', '.max_img_ico', function(e){	
	var parentImageSrc = $(this).attr('src');
	$(".popup_image").attr('src',parentImageSrc);
	var imgContainer = new Image();
	imgContainer.src = parentImageSrc;
	var imgContainerWidth = imgContainer.width;
	var imgContainerHeight = imgContainer.height;
	var containerWidth = $(window).width()-115;
	var containerHeight = $(window).height()-115;	
	var imgContainerActualHeight = (containerHeight > imgContainerHeight) ? parseInt(imgContainerHeight) : parseInt(containerHeight);
	//console.log(imgContainerActualHeight);
	$(".imgpop_container").css("height",imgContainerActualHeight+2);
	//console.log($(".imgpop_container").css("height"));
	maximgpopup();
});


$(document).on('click','.overlaypopup',function(){
	  $(this).fadeOut();
	  $(".maximg_popup").fadeOut();
});

$(document).on('click','.overlaypopup',function(){
	  $(this).fadeOut();
	  $(".maximg_popup").fadeOut();
});

$(document).on('click','.close_ico_img',function(){
	  $(".overlaypopup").fadeOut();
	  $(".maximg_popup").fadeOut();	
});

$(document).resize(function() {
	var winH=$(window).height();
	var winW=$(window).width();
	$(".maximg_popup").css("max-height", winH - 50);
	$(".imgpop_container").css("height",winH - 115);
	$('body').addClass("hidescroll");
	var popuptop = (winH - $(".maximg_popup").height())/2;
	var popupleft = (winW - $(".maximg_popup").width())/2;		
	$(".maximg_popup").css({"left": popupleft , "top": popuptop });
});
function maximgpopup(){
	$(".maximg_popup").fadeIn();
	$(".overlaypopup").fadeIn();
	var winH=$(window).height();
	var winW=$(window).width();
	$(".maximg_popup").css("max-height", winH - 50);
	//$(".imgpop_container").css("height",winH - 115);
	var popuptop = (winH - $(".maximg_popup").height())/2;
	var popupleft = (winW - $(".maximg_popup").width())/2;
	$('body').addClass("hidescroll");	
	$(".maximg_popup").css({"left": popupleft , "top": popuptop });
}
function waterMark(text){
//	var text = 'LoremLoremNir';
	//console.log(text);
	var canvas = document.createElement("canvas");
	var fontSize = 15;
	canvas.setAttribute('height', '150px');
	// canvas.setAttribute('height', fontSize*(text.length/3));
	canvas.setAttribute('width', '200px');
	var context = canvas.getContext('2d');
	context.setTransform(1,-0.90, 1, 2, 0,120);
	//	context.setTransform(1,-0.90, 1, 2, 0,(fontSize*(text.length/6)));
	context.fillStyle    = '#e0e0e0';
	context.font         = 'bold '+fontSize + 'px sans-serif';
	context.fillText(text, 0, fontSize);   
	//context.restore();
	if(iOAP.secDetails[iOAP.curSection].secType != "TYPING"){
		$('#quesOuterDiv').css({'background-image':"url("+ canvas.toDataURL("image/png")+ ")" });
		$('.groupQuestionsDiv').css({'background-image':"url("+ canvas.toDataURL("image/png")+ ")" });
	} else {
		$('.leftDiv').css({'background-image':"url("+ canvas.toDataURL("image/png")+ ")" });
		
	}
	}