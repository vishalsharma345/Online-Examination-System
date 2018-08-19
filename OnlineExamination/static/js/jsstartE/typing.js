function typingObject(){
	this.words = 0;
	this.row1_string = '';
	this.word_string = '';
	this.spaceCount = 0;
	this.wordCount = 0;
	this.startIndex = 0;
	this.endIndex = 0;
	this.inputArray = '';
	this.currentTypedWord = '';
	this.textAreaValue = '';
	this.wordCountTyped = 0;
	this.correctWordArray = new Array();
	this.wrongWordArray = new Array();
	this.currentWordsTextArea = 0;
	this.totalChar = '';
	this.totalCharLength = 0;
	this.correctWordCount = 0;
	this.wrongWordCount = 0;
	this.keyStrokesCount = 0;
	this.errorKeyStrokesCount = 0;
	this.correctKeyStrokesCount = 0;
	this.backSpaceCount = 0;
	this.cursorPos = 0;
	this.arrayTillCursor = '';
	this.wordsTillCursor = 0;
	this.arrayFromCursorTillLast = 0;
	this.wordsFromCursorTillLast = 0;
	this.totalWordsArea = 0;
	this.allowEdit = 'yes';
	this.allowMultipleSpace = 'no';
	this.typedWordCount = 0;
	this.totalWordCount = 0;
	this.wrongCharCount = 0;
	this.GWPM = 0;
	this.NWPM = 0;
	this.accuracy = 0;
	this.ellapsedTime = 0;

	this.textForRestrictedTyping='';
	this.restrictedPosition = 0;
	this.highlightTextChar = 1;
	this.typedTextCount = 1;
	this.restrictedErrors = 0;
	this.coloredCursorPosition = 0;
	this.coloredTextForTyping = '';
	this.finalLine = 0;
	this.typingTextLength = 0;
	this.paste_utilitzat=0;
	this.charCount = $(".typedAnswer").text().length;
};

function loadTypingContentUnrestricted(){
	mockVar.typingGroup[mockVar.currentGrp].words = mockVar.typingGroup[mockVar.currentGrp].word_string.split(" ");
	var str = fill_line_switcher();
	$(".typedAnswer").focus();
	$("#row1").show();
	$(".totalKeyStrokesCount").html(mockVar.typingGroup[mockVar.currentGrp].keyStrokesCount.toString());
	//$("#correctKeyCount").html(mockVar.typingGroup[mockVar.currentGrp].correctKeyStrokesCount);
	//$("#wrongKeyCount").html(mockVar.typingGroup[mockVar.currentGrp].errorKeyStrokesCount);
	$("#backSpaceCount").html(mockVar.typingGroup[mockVar.currentGrp].backSpaceCount.toString());
	$(".typedWordCountVal").html(mockVar.typingGroup[mockVar.currentGrp].typedWordCount.toString());
	$(".totalWordCountVal").html(mockVar.typingGroup[mockVar.currentGrp].totalWordCount.toString());
	$(".errorCountValue").html(mockVar.typingGroup[mockVar.currentGrp].correctWordCount);
	$(".backspaceCountValue").html(mockVar.typingGroup[mockVar.currentGrp].backSpaceCount.toString());
	$(".remainingWordCountVal").html((mockVar.typingGroup[mockVar.currentGrp].totalWordCount - mockVar.typingGroup[mockVar.currentGrp].typedWordCount).toString());
	return str;
}

function fill_line_switcher() {
	mockVar.typingGroup[mockVar.currentGrp].row1_string = '';
	mockVar.typingGroup[mockVar.currentGrp].totalWordCount = mockVar.typingGroup[mockVar.currentGrp].words.length;
	for (var i = 0; i < mockVar.typingGroup[mockVar.currentGrp].words.length; i++){
		mockVar.typingGroup[mockVar.currentGrp].row1_string +='<span wordnr=\"'+i+'\" class=\"\" id=\"sp'+i+'\">'+mockVar.typingGroup[mockVar.currentGrp].words[i].replace(/\&/g,'&amp;').replace(/\</g,'&lt;').replace(/\>/g,'&gt;')+'</span>';
		mockVar.typingGroup[mockVar.currentGrp].row1_string += " ";
	}
	var str = '<br/><div id="typingDivs" class="typingQuesDiv"><div id="row1" style="">'+mockVar.typingGroup[mockVar.currentGrp].row1_string+'</div><br/>';
	str +='<div class="textAreaDiv" onpaste="return false">';
	if($(window).width()<581){
		str +='<input spellcheck="false"  class="typedAnswer" placeholder="Type Here" onselectstart="return false;" oninput="javascript:checkPasteFF();" onkeydown="copyDataWithEdit(event);" onkeyup="calculateKeyStrokes(event);" value="'+mockVar.curQuesBean.quesParam.answer+'">';
	}else{
		str +='<textarea spellcheck="false" class="typedAnswer"  onselectstart="return false;" oninput="javascript:checkPasteFF();" onkeydown="copyDataWithEdit(event);" onkeyup="calculateKeyStrokes(event);">'+mockVar.curQuesBean.quesParam.answer+'</textarea>';
	}
	str += '</div></div>';
	if(mockVar.curQuesBean.staticText!==undefined && $.trim(mockVar.curQuesBean.staticText)!==""){
		str += '<span class="infohd">Typing Info</span>';
		str +='<div id="typngStaticTxt" class="staticText">'+mockVar.curQuesBean.staticText+'</div>';
	}
	return str;
}

function calculateKeyStrokes(e){
	var key_code = (window.event) ? event.keyCode : e.which;
	mockVar.typingGroup[mockVar.currentGrp].typedWordCount = $('.typedAnswer').val().split(' ').length;
	/*if($('#typedAnswer').val().length>0 && $('#typedAnswer').val().indexOf(' ')==-1){
		mockVar.typingGroup[mockVar.currentGrp].typedWordCount = 1;
	} else if($('#typedAnswer').val().length==0){
		mockVar.typingGroup[mockVar.currentGrp].typedWordCount = 0;
	} else{
		if(!$('#typedAnswer').val().match(/\S+/g) || $('#typedAnswer').val().split(' ').length-1>$('#typedAnswer').val().match(/\S+/g).length){
			mockVar.typingGroup[mockVar.currentGrp].typedWordCount = $('#typedAnswer').val().split(' ').length-1;
		}else if($('#typedAnswer').val().split(' ').length-1==$('#typedAnswer').val().match(/\S+/g).length && $('#typedAnswer').val().indexOf(' ')==0){
			mockVar.typingGroup[mockVar.currentGrp].typedWordCount = $('#typedAnswer').val().split(' ').length;
		}else{
			mockVar.typingGroup[mockVar.currentGrp].typedWordCount = $('#typedAnswer').val().match(/\S+/g).length;
		}
	}*/
	mockVar.typingGroup[mockVar.currentGrp].cursorPos = getCaretForAlphaNumeric($(".typedAnswer"));
	if(mockVar.typingGroup[mockVar.currentGrp].allowMultipleSpace == "yes"){
		getRequiredArrayswithMultipleSpace();
	}else if(mockVar.typingGroup[mockVar.currentGrp].allowMultipleSpace == 'no'){
		getRequiredArrayswithTrim();
	}
	mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor = mockVar.typingGroup[mockVar.currentGrp].arrayTillCursor.split(" ").length-1;
	if(key_code == 32 || key_code == 8 || key_code == 46 || key_code == 37 || key_code == 39){
		/*if(!((key_code == 37 || key_code == 39) && mockVar.curQuesBean.allowBackspace!==undefined && mockVar.curQuesBean.allowBackspace === "false")){*/
		doCalculations();
		scrollIntoViewDiv(document.getElementById("sp"+mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor),document.getElementById("row1"));
		//}
	}


	mockVar.typingGroup[mockVar.currentGrp].keyStrokesCount = $(".typedAnswer").val().length;
	$(".totalKeyStrokesCount").html(mockVar.typingGroup[mockVar.currentGrp].keyStrokesCount.toString());
//	$("#correctKeyCount").html(mockVar.typingGroup[mockVar.currentGrp].correctKeyStrokesCount);
//	$("#wrongKeyCount").html(mockVar.typingGroup[mockVar.currentGrp].errorKeyStrokesCount);
	$("#backSpaceCount").html(mockVar.typingGroup[mockVar.currentGrp].backSpaceCount.toString());
	$(".backspaceCountValue").html(mockVar.typingGroup[mockVar.currentGrp].backSpaceCount.toString());
	calculateWordCount(e);
	if(mockVar.typingGroup[mockVar.currentGrp].typedWordCount >= mockVar.typingGroup[mockVar.currentGrp].words.length){
		$('#finalTypingSub').removeAttr('disabled');
		$('#finalTypingSub').removeClass().addClass('typingTestButtonEnabled');
		$('.sve_nxt.typing').removeAttr('disabled');
		if(key_code == 32){
			if(mockVar.typingGroup[mockVar.currentGrp].word_string == $(".typedAnswer").val()){
				doCalculations();
				$('#row1 span').removeClass('highlight');
			}else{
				doCalculations();
				$('#row1 span').removeClass('highlight');
			}
		}
	}else{
		$('#finalTypingSub').removeClass().addClass('typingTestButtonDisabled btn btn-primary-blue auditlogButton');
		$('#finalTypingSub').attr('disabled',true);
		$('.sve_nxt.typing').attr('disabled',true);
	}
}

function calculateWordCount(e){
	//var key_code = (window.event) ? event.keyCode : e.which;
	if(($(".typedAnswer").val().split(" ").length == mockVar.typingGroup[mockVar.currentGrp].totalWordCount) && $(".typedAnswer").val().split(" ")[mockVar.typingGroup[mockVar.currentGrp].totalWordCount - 1]!=""){
		mockVar.typingGroup[mockVar.currentGrp].typedWordCount = $(".typedAnswer").val().split(" ").length;
	}else{
		mockVar.typingGroup[mockVar.currentGrp].typedWordCount = $(".typedAnswer").val().split(" ").length - 1;
	}
	$(".typedWordCountVal").html(mockVar.typingGroup[mockVar.currentGrp].typedWordCount.toString());
	$(".totalWordCountVal").html(mockVar.typingGroup[mockVar.currentGrp].totalWordCount.toString());
	$(".remainingWordCountVal").html((mockVar.typingGroup[mockVar.currentGrp].totalWordCount - mockVar.typingGroup[mockVar.currentGrp].typedWordCount).toString());
	mockVar.curQuesBean.quesParam.answer = $(".typedAnswer").val();
	if(mockVar.curQuesBean.quesParam.answer.length>0){
		mockVar.curQuesBean.quesParam.status='answered';
	}else{
		mockVar.curQuesBean.quesParam.status='notanswered';
	}
}

function copyDataWithEdit(e){    //For unrestricted verion, with allowEdit and allowMultipleSpace as yes/no.
	try{
		$(document).unbind('keydown').bind('keydown', function 	(event) {
			var key_code = (window.event) ? event.keyCode : e.which;
			if(key_code == 37 && e.altKey){e.preventDefault();}
			//		mockVar.typingGroup[mockVar.currentGrp].cursorPos = getCaretForAlphaNumeric(document.getElementById("typedAnswer"));

			/*	if($("#typedAnswer").val().split(" ")>mockVar.typingGroup[mockVar.currentGrp].words){	// If Typed Content exceeds Question Content, then only allow left and right arrow keys along with delete and backspace in case of allowEdit is yes.
				if(!(key_code==8 || key_code==46 || key_code==37 || key_code==39))
				(window.event) ? event.preventDefault() : e.preventDefault();
			}else{*/
			var a=0;
			var b=0;

			/*	if(!(key_code == 16 || key_code == 20)){	// Do not count shift and capslock key counts
					mockVar.typingGroup[mockVar.currentGrp].keyStrokesCount++;
				}*/

			if($('.typedAnswer').val().split(' ').length == mockVar.typingGroup[mockVar.currentGrp].words.length){
				//if((key_code == 32 || key_code == 13) && !(mockVar.curQuesBean.allowBackspace === "false"))
				if((key_code == 32 || key_code == 13))
					(window.event) ? event.preventDefault() : e.preventDefault();
			}
			if(mockVar.typingGroup[mockVar.currentGrp].allowEdit == 'yes'){    //If allowEdit is yes then,
				if(mockVar.typingGroup[mockVar.currentGrp].allowMultipleSpace == "yes"){    // If multiple space needs to be considered then,
					//		getRequiredArrayswithMultipleSpace();
					//		mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor = mockVar.typingGroup[mockVar.currentGrp].arrayTillCursor.split(" ").length-1;
					/*if(key_code == 32){		// If keyPressed is space, then calculate the correctness of typed word.
							mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor+=1;
							doCalculationOnSpace(a,b);
							scrollIntoViewDiv(document.getElementById("sp"+mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor),document.getElementById("row1"));
						}else */if(key_code == 8){	// If keyPressed is backspace, then perform calculations.
							//	$("#row1 span").removeClass();
							//	doCalculationOnSpace(a,b);
							if(typeof(mockVar.curQuesBean.allowBackspace)!='undefined' && mockVar.curQuesBean.allowBackspace=='false')
								e.preventDefault();
							mockVar.typingGroup[mockVar.currentGrp].backSpaceCount++;
							//	mockVar.typingGroup[mockVar.currentGrp].correctKeyStrokesCount--;
							//	mockVar.typingGroup[mockVar.currentGrp].errorKeyStrokesCount++;
							//	scrollIntoViewDiv(document.getElementById("sp"+mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor),document.getElementById("row1"));
						}/*else if(key_code==46){		// If keyPressed is delete, then perform calculations.
							$("#row1 span").removeClass();
							doCalculationOnSpace(a,b);
							scrollIntoViewDiv(document.getElementById("sp"+mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor),document.getElementById("row1"));
						}else if(key_code==37 || key_code==39){		// If keyPressed is left/right arrow keys, then perform calculations.
							doCalculationOnSpace(a,b);
							scrollIntoViewDiv(document.getElementById("sp"+mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor),document.getElementById("row1"));
						}*/else if(key_code==27 || key_code==9 || (key_code>=17 && key_code<=19) || key_code==13 || (key_code>=91 && key_code<=93) || (key_code>=33 && key_code<=36) || key_code==38 || key_code==40 || key_code==45 || (key_code>=112 && key_code<=123) || key_code==145){
							//	mockVar.typingGroup[mockVar.currentGrp].correctKeyStrokesCount--;
							//	mockVar.typingGroup[mockVar.currentGrp].errorKeyStrokesCount++;
							(window.event) ? event.preventDefault() : e.preventDefault();
						}
						//		doHighlightNextWord();	
				} else if(mockVar.typingGroup[mockVar.currentGrp].allowMultipleSpace == 'no'){    // If multiple space should not be considered then,
					//	getRequiredArrayswithTrim();
					mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor = mockVar.typingGroup[mockVar.currentGrp].arrayTillCursor.split(" ").length-1;
					if(key_code == 32){
						if(mockVar.typingGroup[mockVar.currentGrp].totalChar.charCodeAt(mockVar.typingGroup[mockVar.currentGrp].cursorPos - 1)!=32 && mockVar.typingGroup[mockVar.currentGrp].totalChar.charCodeAt(mockVar.typingGroup[mockVar.currentGrp].cursorPos)!=32 && mockVar.typingGroup[mockVar.currentGrp].totalChar.charCodeAt(mockVar.typingGroup[mockVar.currentGrp].cursorPos+1)!=32){
							mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor+=1;
							$("#row1 span").removeClass();
							doCalculationOnSpace(a,b);
							scrollIntoViewDiv(document.getElementById("sp"+mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor),document.getElementById("row1"));
						} else {
							(window.event) ? event.preventDefault() : e.preventDefault();
						}
					}else if(key_code == 8){
						if(typeof(mockVar.curQuesBean.allowBackspace)=='undefined'|| mockVar.curQuesBean.allowBackspace=='true'){
							$("#row1 span").removeClass();
							mockVar.typingGroup[mockVar.currentGrp].backSpaceCount++;
							mockVar.typingGroup[mockVar.currentGrp].correctKeyStrokesCount--;
							mockVar.typingGroup[mockVar.currentGrp].errorKeyStrokesCount++;
							doCalculationOnSpace(a,b);
							scrollIntoViewDiv(document.getElementById("sp"+mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor),document.getElementById("row1"));
						}else{
							mockVar.typingGroup[mockVar.currentGrp].backSpaceCount++;
							(window.event) ? event.preventDefault() : e.preventDefault();
						}

					}else if(key_code==46){
						$("#row1 span").removeClass();
						doCalculationOnSpace(a,b);
						scrollIntoViewDiv(document.getElementById("sp"+mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor),document.getElementById("row1"));
					}else if(key_code==37 || key_code==39){
						if(mockVar.curQuesBean.allowBackspace!==undefined && mockVar.curQuesBean.allowBackspace === "false")
							(window.event) ? event.preventDefault() : e.preventDefault();
							else{
								$("#row1 span").removeClass();
								doCalculationOnSpace(a,b);
								scrollIntoViewDiv(document.getElementById("sp"+mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor),document.getElementById("row1"));
							}
					}else if(key_code==27 || key_code==9 || (key_code>=17 && key_code<=19) || key_code==13 || (key_code>=91 && key_code<=93) || (key_code>=33 && key_code<=36) || key_code==38 || key_code==40 || key_code==45 || (key_code>=112 && key_code<=123) || key_code==145){
						mockVar.typingGroup[mockVar.currentGrp].correctKeyStrokesCount--;
						mockVar.typingGroup[mockVar.currentGrp].errorKeyStrokesCount++;
						(window.event) ? event.preventDefault() : e.preventDefault();
					}
					//		doHighlightNextWord();	
				}
			} else if(mockVar.typingGroup[mockVar.currentGrp].allowEdit == 'no'){    //If allowEdit is no then,
				if(mockVar.typingGroup[mockVar.currentGrp].cursorPos<$('.typedAnswer').val().length){
					setCursorPos($(".typedAnswer"), $('.typedAnswer').val().length);
					(window.event) ? event.preventDefault() : e.preventDefault();
				}else if(mockVar.typingGroup[mockVar.currentGrp].allowMultipleSpace == 'yes'){    //If allowEdit is no and if multiple space needs to be considered then,
					//		getRequiredArrayswithMultipleSpace();
					if(key_code == 32){
						doCalculationOnSpaceWithNoEdit(a,b);
						mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor++;
						scrollIntoViewDiv(document.getElementById("sp"+mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor),document.getElementById("row1"));
					} else if(key_code==8){
						mockVar.typingGroup[mockVar.currentGrp].correctKeyStrokesCount--;
						mockVar.typingGroup[mockVar.currentGrp].errorKeyStrokesCount++;
						if(mockVar.typingGroup[mockVar.currentGrp].arrayTillCursor.charCodeAt(mockVar.typingGroup[mockVar.currentGrp].arrayTillCursor.length - 1)!= 32 ){
							mockVar.typingGroup[mockVar.currentGrp].backSpaceCount++;
						}else{
							(window.event) ? event.preventDefault() : e.preventDefault();
						}
					} else if(key_code==27 || key_code==9 || key_code==46 || (key_code>=17 && key_code<=19) || key_code==13 || (key_code>=91 && key_code<=93) || (key_code>=33 && key_code<=40) || key_code==38 || key_code==40 || key_code==45 || (key_code>=112 && key_code<=123) || key_code==145){
						mockVar.typingGroup[mockVar.currentGrp].correctKeyStrokesCount--;
						mockVar.typingGroup[mockVar.currentGrp].errorKeyStrokesCount++;
						(window.event) ? event.preventDefault() : e.preventDefault();
					}
					$("#sp"+(mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor)).removeClass('highlight').addClass('highlight');
				}else if(mockVar.typingGroup[mockVar.currentGrp].allowMultipleSpace == 'no'){    // If allowEdit is no and if multiple space should not be considered then,
					//		getRequiredArrayswithTrim();
					if(key_code == 32){
						if(mockVar.typingGroup[mockVar.currentGrp].totalChar.charCodeAt(mockVar.typingGroup[mockVar.currentGrp].cursorPos - 1)!=32 && mockVar.typingGroup[mockVar.currentGrp].totalChar.charCodeAt(mockVar.typingGroup[mockVar.currentGrp].cursorPos + 1)!=32){
							doCalculationOnSpaceWithNoEdit(a,b);
							mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor++;
							scrollIntoViewDiv(document.getElementById("sp"+mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor),document.getElementById("row1"));
						} else {
							(window.event) ? event.preventDefault() : e.preventDefault();
						}
					} else if(key_code==8){
						mockVar.typingGroup[mockVar.currentGrp].correctKeyStrokesCount--;
						mockVar.typingGroup[mockVar.currentGrp].errorKeyStrokesCount++;
						if(mockVar.typingGroup[mockVar.currentGrp].arrayTillCursor.charCodeAt(mockVar.typingGroup[mockVar.currentGrp].arrayTillCursor.length - 1)!= 32 ){
							mockVar.typingGroup[mockVar.currentGrp].backSpaceCount++;
						}else{
							(window.event) ? event.preventDefault() : e.preventDefault();
						}
					} else if(key_code==27 || key_code==9 || key_code==46 || (key_code>=17 && key_code<=19) || key_code==13 || (key_code>=91 && key_code<=93) || (key_code>=33 && key_code<=40) || key_code==38 || key_code==40 || key_code==45 || (key_code>=112 && key_code<=123) || key_code==145){
						mockVar.typingGroup[mockVar.currentGrp].correctKeyStrokesCount--;
						mockVar.typingGroup[mockVar.currentGrp].errorKeyStrokesCount++;
						(window.event) ? event.preventDefault() : e.preventDefault();
					}
					$("#sp"+(mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor)).removeClass('highlight').addClass('highlight');
				}
			}
			//}
		});
	}catch(e){
		serverLogMessage('Exception in typing.js(copyDataWithEdit) : '+e);
	}
}

/*function copyDataWithNoEdit(e){    // For restricted version with allowEdit and allowMultipleSpace as no by default.
	$(document).unbind('keypress').bind('keypress', function 	(event) {
		var key_code = (window.event) ? event.keyCode : e.which;
		mockVar.typingGroup[mockVar.currentGrp].cursorPos = getCaretForAlphaNumeric(document.getElementById("typedAnswer"));
		
		if(mockVar.typingGroup[mockVar.currentGrp].cursorPos>mockVar.typingGroup[mockVar.currentGrp].word_string.length){
			(window.event) ? event.preventDefault() : e.preventDefault();
		}else{

			var a=0;
			var b=0;

			if(!(key_code == 16 || key_code == 20)){
				mockVar.typingGroup[mockVar.currentGrp].keyStrokesCount++;
			}
			$("#totalKeyStrokesCount").html(mockVar.typingGroup[mockVar.currentGrp].keyStrokesCount);
			$("#correctKeyCount").html(mockVar.typingGroup[mockVar.currentGrp].correctKeyStrokesCount);
			$("#wrongKeyCount").html(mockVar.typingGroup[mockVar.currentGrp].errorKeyStrokesCount);
			$("#backSpaceCount").html(mockVar.typingGroup[mockVar.currentGrp].backSpaceCount);
			
			$("#typedAnswer").keydown(function(evt){
				var keyP = (window.event) ? evt.keyCode : evt.which ;
				if(keyP == 8 || keyP==27 || keyP==9 || (keyP>=17 && keyP<=19) || keyP==13 || (keyP>=91 && keyP<=93) || (keyP>=33 && keyP<=40) || keyP==38 || keyP==40 || keyP==45 || (keyP>=112 && keyP<=123) || keyP==145 ){
					evt.preventDefault();
				}
			});
			
			var temp = String.fromCharCode(key_code);
			getRequiredArrayswithMultipleSpace();	
			mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor = mockVar.typingGroup[mockVar.currentGrp].arrayTillCursor.split(" ").length;
			if(temp == mockVar.typingGroup[mockVar.currentGrp].word_string.charAt(mockVar.typingGroup[mockVar.currentGrp].cursorPos)){
				mockVar.typingGroup[mockVar.currentGrp].correctKeyStrokesCount++;
				if(key_code == 32){
					doCalculationOnSpace(a,b);
					$("#sp"+mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor).removeClass('highlight').addClass('highlight');
					scrollIntoViewDiv(document.getElementById("sp"+mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor),document.getElementById("row1"));
				}
			} else {
				mockVar.typingGroup[mockVar.currentGrp].errorKeyStrokesCount++;
				(window.event) ? event.preventDefault() : e.preventDefault();
			}
		}
	});
}
*/
function scrollIntoViewDiv(element, container) {
	try{
		var containerTop = container.offsetTop;
		var elemTop = element.offsetTop;
		$(container).scrollTop(elemTop - containerTop - $(element).height());
	}catch(err){

	}
}

function getCaretForAlphaNumeric(el) {
	try{
		if (el[0].selectionStart) { 
			   return el[0].selectionStart; 
			} else if (document.selection) { 
			   el[0].focus(); 
			   var r = document.selection.createRange(); 
			   if (r == null) {  
			     return 0; 
			   } 
			   var re = el[0].createTextRange(), 
			   rc = re.duplicate(); 
			   re.moveToBookmark(r.getBookmark()); 
			   rc.setEndPoint('EndToStart', re); 
			   return rc.text.length; 
			}  
			return 0;
	}catch(e){
		
	}
}

function getRequiredArrayswithMultipleSpace(){
	try{
		mockVar.typingGroup[mockVar.currentGrp].totalChar = $(".typedAnswer").val();
		mockVar.typingGroup[mockVar.currentGrp].totalCharLength = mockVar.typingGroup[mockVar.currentGrp].totalChar.length;
		mockVar.typingGroup[mockVar.currentGrp].arrayTillCursor = $(".typedAnswer").val().substring(0,mockVar.typingGroup[mockVar.currentGrp].cursorPos);
		if($(".typedAnswer").val().length>0){
			mockVar.typingGroup[mockVar.currentGrp].totalWordsArea = mockVar.typingGroup[mockVar.currentGrp].totalChar.split(" ");
		}else{
			mockVar.typingGroup[mockVar.currentGrp].totalWordsArea = '';
		}
	}catch(e){
		
	}
}

function getRequiredArrayswithTrim(){
	try{
		mockVar.typingGroup[mockVar.currentGrp].totalChar = $(".typedAnswer").val().replace(/\s+/g, ' ');
		mockVar.typingGroup[mockVar.currentGrp].totalCharLength = mockVar.typingGroup[mockVar.currentGrp].totalChar.length;
		mockVar.typingGroup[mockVar.currentGrp].arrayTillCursor = mockVar.typingGroup[mockVar.currentGrp].totalChar.substring(0,mockVar.typingGroup[mockVar.currentGrp].cursorPos).replace(/\s+/g, ' ');
		mockVar.typingGroup[mockVar.currentGrp].totalWordsArea = mockVar.typingGroup[mockVar.currentGrp].totalChar.split(" ");
	}catch(e){
		
	}
}

function doCalculations(){
	try{
		var a =0, b=0;
		var arraySize = 0;
		/*if(mockVar.typingGroup[mockVar.currentGrp].totalWordsArea.length > mockVar.typingGroup[mockVar.currentGrp].words.length){
			arraySize = mockVar.typingGroup[mockVar.currentGrp].words.length;
		}else{
			arraySize = mockVar.typingGroup[mockVar.currentGrp].totalWordsArea.length;
		}*/
		arraySize = mockVar.typingGroup[mockVar.currentGrp].totalWordsArea.length;
		$('#row1 span').removeClass();
		for(var k=0;k<arraySize;k++){
			if(!(k==arraySize-1 && mockVar.typingGroup[mockVar.currentGrp].totalWordsArea[k]=='')){ 
				if(k!=mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor + 1){
					if($.trim(mockVar.typingGroup[mockVar.currentGrp].totalWordsArea[k])==$.trim(mockVar.typingGroup[mockVar.currentGrp].words[k])){
						if(typeof(mockVar.curQuesBean.highlightCorrectIncorrectWord)=='undefined' || mockVar.curQuesBean.highlightCorrectIncorrectWord=='true')
							$("#sp"+k).removeClass().addClass('correct');
						mockVar.typingGroup[mockVar.currentGrp].correctWordArray[a++]=mockVar.typingGroup[mockVar.currentGrp].totalWordsArea[k];
					}else{
						if(typeof(mockVar.curQuesBean.highlightCorrectIncorrectWord)=='undefined' || mockVar.curQuesBean.highlightCorrectIncorrectWord=='true')
							$("#sp"+k).removeClass().addClass('wrong');
						mockVar.typingGroup[mockVar.currentGrp].wrongWordArray[b++]=mockVar.typingGroup[mockVar.currentGrp].totalWordsArea[k];
					}
				}
			}
		}
		mockVar.typingGroup[mockVar.currentGrp].correctWordCount = a;
		mockVar.typingGroup[mockVar.currentGrp].wrongWordCount = b;
		doHighlightNextWord();
		$(".errorCountValue").html(b);

	}catch(e){

	}
}

function doCalculationOnSpace(a,b){
	try{
		var arraySize = 0;
		if(mockVar.typingGroup[mockVar.currentGrp].totalWordsArea.length > mockVar.typingGroup[mockVar.currentGrp].words.length){
			arraySize = mockVar.typingGroup[mockVar.currentGrp].words.length;
		}else{
			arraySize = mockVar.typingGroup[mockVar.currentGrp].totalWordsArea.length;
		}
		for(var k=0;k<arraySize;k++){
			if(k!=mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor){
				if($.trim(mockVar.typingGroup[mockVar.currentGrp].totalWordsArea[k])==$.trim(mockVar.typingGroup[mockVar.currentGrp].words[k])){
					if(typeof(mockVar.curQuesBean.highlightCorrectIncorrectWord)=='undefined' || mockVar.curQuesBean.highlightCorrectIncorrectWord=='true'){
						$("#sp"+k).removeClass().addClass('correct');
						}
					mockVar.typingGroup[mockVar.currentGrp].correctWordArray[a++]=mockVar.typingGroup[mockVar.currentGrp].totalWordsArea[k];
				}else{
					if(typeof(mockVar.curQuesBean.highlightCorrectIncorrectWord)=='undefined' || mockVar.curQuesBean.highlightCorrectIncorrectWord=='true')
						$("#sp"+k).removeClass().addClass('wrong');
					mockVar.typingGroup[mockVar.currentGrp].wrongWordArray[b++]=mockVar.typingGroup[mockVar.currentGrp].totalWordsArea[k];
				}
			}
		}
		mockVar.typingGroup[mockVar.currentGrp].correctWordCount = a;
		mockVar.typingGroup[mockVar.currentGrp].wrongWordCount = b;
		doHighlightNextWord();
		//	$("#correctWordCount").html(a);
		//	$("#wrongWordCount").html(b);
	}catch(e){

	}
}

function doHighlightNextWord(){
	try{
		$('#row1 span').removeClass('highlight');
		
		$("#sp"+(mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor)).removeClass('highlight').addClass('highlight');
		
	}catch(e){
		
	}
}

function doCalculationOnSpaceWithNoEdit(a,b){
	try{
		if($.trim(mockVar.typingGroup[mockVar.currentGrp].totalWordsArea[mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor]) == $.trim(mockVar.typingGroup[mockVar.currentGrp].words[mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor])){
		if(typeof(mockVar.curQuesBean.highlightCorrectIncorrectWord)=='undefined' || mockVar.curQuesBean.highlightCorrectIncorrectWord=='true')
			$("#sp"+mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor).removeClass().addClass('correct');
			mockVar.typingGroup[mockVar.currentGrp].correctWordArray[a++] = mockVar.typingGroup[mockVar.currentGrp].words[mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor];
		}else{
		if(typeof(mockVar.curQuesBean.highlightCorrectIncorrectWord)=='undefined' || mockVar.curQuesBean.highlightCorrectIncorrectWord=='true')
			$("#sp"+mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor).removeClass().addClass('wrong');
			mockVar.typingGroup[mockVar.currentGrp].wrongWordArray[b++] = mockVar.typingGroup[mockVar.currentGrp].words[mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor];
		}
		$("#correctWordCount").html(a);
		$("#wrongWordCount").html(b);
	}catch(e){
		
	}
}

function setCursorPos(input, start, end) {
	try{
		if (arguments.length < 3) end = start;
	    if ("selectionStart" in input) {
	        setTimeout(function() {
	            input[0].selectionStart = start;
	            input[0].selectionEnd = start+1;
	        }, 1);
	    }
	    else if (input[0].createTextRange) {
	        var rng = input[0].createTextRange();
	        rng.moveStart("character", start);
	        rng.collapse();
	        rng.moveEnd("character", end - start);
	        rng.select();
	    }
	}catch(e){
		
	}
} 

function getWrongCharCount(){
	var wrongCharCount = 0;
	var wordsInArea = $(".typedAnswer").val().trim().split(" ");
	for(var k=0;k<wordsInArea.length;k++){
		if($.trim(wordsInArea[k])!=$.trim(mockVar.typingGroup[mockVar.currentGrp].words[k])){
			//wrongCharCount += wordsInArea[k].length>mockVar.typingGroup[mockVar.currentGrp].words[k].length?wordsInArea[k].length:mockVar.typingGroup[mockVar.currentGrp].words[k].length;
			wrongCharCount++;
		}
	}
	return wrongCharCount;
}

function getCorrectCharCountforStandard(){
	var wrongCharCount = 0;
	var wordsInArea = $(".typedAnswer").val().trim().split(" ");
	for(var k=0;k<wordsInArea.length;k++){
		if($.trim(wordsInArea[k])!=$.trim(mockVar.typingGroup[mockVar.currentGrp].words[k])){
			wrongCharCount += wordsInArea[k].length>mockVar.typingGroup[mockVar.currentGrp].words[k].length?wordsInArea[k].length:mockVar.typingGroup[mockVar.currentGrp].words[k].length;
		}
	}
	return wrongCharCount;
}

function getNetW(){
	return ((mockVar.typingGroup[mockVar.currentGrp].keyStrokesCount/5) - getWrongCharCount());
}