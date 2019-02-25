/*
添加一个层，来显示加载动画
 */
function setQueryLoadding(targetDoc, message, align) {
	var loaddingBox = targetDoc.getElementById("loaddingBox");
	var loaddingBox_bg = targetDoc.getElementById("loaddingBox_bg");
	if (loaddingBox == null) {
		loaddingBox = document.createElement("div");
		loaddingBox.id = "loaddingBox";
		loaddingBox.className = "loaddingBox";
		loaddingBox.style.textAlign = align;

		loaddingBox.innerHTML = '<img src="../js/common/DivLoading/skin/loading-round.gif"><br /><FONT size=2 style=\'COLOR: #3489ef;\'>'
				+ message + '</FONT>';
		targetDoc.body.appendChild(loaddingBox);
	}

	if (loaddingBox_bg == null) {
		loaddingBox_bg = document.createElement("div");
		loaddingBox_bg.id = "loaddingBox_bg";
		loaddingBox_bg.className = "loaddingBox_bg";
		targetDoc.body.appendChild(loaddingBox_bg);
	}
	loaddingBox_bg.style.display = 'block';
	loaddingBox.style.display = 'block';
}