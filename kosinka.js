var vyborka = [	
			["6-p", "7-p", "8-p", "9-p", "10-p", "v-p", "d-p", "k-p", "t-p"],
			["6-k", "7-k", "8-k", "9-k", "10-k", "v-k", "d-k", "k-k", "t-k"],
			["6-b", "7-b", "8-b", "9-b", "10-b", "v-b", "d-b", "k-b", "t-b"],
			["6-ch", "7-ch", "8-ch", "9-ch", "10-ch", "v-ch", "d-ch", "k-ch", "t-ch"]
			];
var arrayForSravnenie = [
			["6-p", "7-p", "8-p", "9-p", "10-p", "v-p", "d-p", "k-p", "t-p"],
			["6-k", "7-k", "8-k", "9-k", "10-k", "v-k", "d-k", "k-k", "t-k"],
			["6-b", "7-b", "8-b", "9-b", "10-b", "v-b", "d-b", "k-b", "t-b"],
			["6-ch", "7-ch", "8-ch", "9-ch", "10-ch", "v-ch", "d-ch", "k-ch", "t-ch"]
			];
var koloda = [];		//массив со случайными картами(вверху слева)
var numberOfCards = 0;		//колличество оставшихся карт в выборке
var g = 0;		//номер обрабатываемого и выводимого элемента в массиве "колода"
var cardOfKol = document.getElementById('koloda');
var openCard = document.getElementById('openKart');
var openKolCard;
var firstRandIndex;		//первый индекс массива "выборка" для случайной карты
var secondRandIndex;		//второй индекс массива "выборка" для случайной карты
var randKarta;		//случайно выбранная карта
var vypolnenie = false;
var w;		//число == (g+3), для вывода не больше трех карт в открытой выборке
var click = 0;		//определяет тип добавления карты
var openKart = document.getElementById('openKart');
var arrCheckCard1 = [];
var checkCardsDiv = document.getElementById('checkedCard1');
var arrayCard = [[], [], [], [], [], [], [], [], [], [], []];		//нижние массивы с картами
var f;		// ID элемента и в то же время номер массива в который добавляется карта
var t;		// ID элемента и в то же время номер массива из которого забирается карта
var h;
var cacR;		//цена карты (определяет масть карты)
var cacD;		//цена карты (определяет саму цену карты)
var perebor;		//поочерёдно записуются элементы выборки, для сравнения с добавляемой картой 
var click5;
var randDownArray;		//случайно выбранный массив
var previousArray;		//массив с которого забирают карту
var open3kard = [];		//массив с 3 картами колоды, которые на данный момент выводятся
var topArrayLength;		//длина одного верхнего массива
var topArrayOver = 0;		//колличество заполненых верхних массивов
var king;			//карта - король


$(kosObol).hide(0);
$(buttonClose).hide(0);

function showKosinkaGame() {		//открытие игры
	$(kosObol).css('position','fixed');
	$(kosObol).fadeIn(1000);
	$(buttonStart).fadeOut(0);
	$(buttonClose).fadeIn(1000);
}
function closeKosinkaGame() {			//свертывание игры
	$(kosObol).fadeOut(1000);
	$(buttonStart).fadeIn(1000);
	$(buttonClose).fadeOut(1000);
}
function numberOfCardsInVyborka() {		//считает колличество карт оставшихся в выборке
	numberOfCards = vyborka[0].length +  vyborka[1].length + vyborka[2].length + vyborka[3].length;
}
function random(min, max) {		//задает случайное число
	return Math.floor(Math.random() * (max - min + 1) + min);
}
function randCheckCard() {		//создает массив со случайными картами
		firstRandIndex = random(0, 3);
		secondRandIndex = random(0, vyborka[firstRandIndex].length-1);
		randKarta = vyborka[firstRandIndex][secondRandIndex];
		if (vyborka[0].length==0 && vyborka[1].length==0 && vyborka[2].length==0 && vyborka[3].length==0) {	//если выборка пуста завершает добавление случайных карт
			return;
		}
		if (randKarta==undefined||randKarta==null) {	//рекурсия для исключения добавления пустых элементов
			randCheckCard();
		}
		vyborka[firstRandIndex].splice(secondRandIndex, 1);
}
for (var i=0; i<21; i++) {		//заполняет колоду случайными картами
	randCheckCard();
	koloda[i] = randKarta;
}
numberOfCardsInVyborka();		//подсчитывает колличество оставшихся карт в выборке
for (i=0; i<numberOfCards; i++) {		//случайным образом распределяет оставшиеся карты в выборке по нижним массивам
	randCheckCard();
	if (randKarta==undefined) break;	//если все карты выборки уже распределились по массивам, прекращает цикл
	randDownArray = random(0, 6);
	arrayCard[randDownArray].push(randKarta);
}
for (i=0; i<11; i++) {		//записывает HTML код для картинок в массивах
	var element = document.getElementById(i);
	writeHTML(element, arrayCard[i], 'lastImageKosinka', 'imageKosinka');
}
function vyborkaFromOpenKard() {		//показывает 3 карты из колоды в верхней левой выборке из открытых карт
	if (g==100) {		//скрывает HTML-элемент с открытыми картами колоды, если просмотрены все карты колоды
		$('#openKart').hide(0);
		g = 0;
		return;
	}
	if (koloda.length==0) {		//если колода пустая, закрывает доступ к ней
		openCard.innerHTML = 'Колода пуста';
		cardOfKol.onclick = '';
		openCard.style.background = 'blue';
		openCard.onclick = '';
		return;
	}
	$('#openKart').show(0);
	openCard.innerHTML = '';
	openKolCard = '';
	open3kard.splice(0);
	for (w=g; g<(w+3); g++) {		//создает массив с 3 выводимыми картами
		if (g<0) {
			g = 0;
		}
		if (koloda[g]==undefined){
			break;
		}
		open3kard.push(koloda[g]);
	}
	writeHTML(openCard, open3kard, 'lastIageOpenKard', 'imageOpenKard');		//показывает 3 карты с колоды
	if (g==koloda.length) {		//задает значение (g), что бы при следующем нажатии на колоду, выборка с открытыми картами скрывалась 
		g = 100;
	}
}
function clickOnVyborkaBeforeMove() {		//при клике на колоду изменяет стиль и задает значение click
	if (click==1||click==5) {		//анулирует выбор и выделение обьекта
    	click = 0;
    	openKart.style.border = '1px solid white';
	}
	else {		//выделяет элемент при нажатии на него перед добавлением
    	click = 1;
    	openKart.style.border = '2px solid red';
	}
}
function clickOnCheckCard(elem) {		//действия при нажатии на нижние массивы
if (click==1) {		//действия при добавлении карты с колоды в нижний массив
	f = elem.id;
	if (g==100) {
		g = koloda.length;
	}
	if (g==0) {
		costAddCard(koloda[g]);
		sravnenieKart();
		if (vypolnenie) {
			arrayCard[f].push(koloda[g]);
			koloda.splice(g, 1);
		}
		else {
			return;
		}
	}
	else {
		costAddCard(koloda[g-1]);
		sravnenieKart();
		if (vypolnenie) {
			arrayCard[f].push(koloda[g-1]);
			koloda.splice(g-1, 1);
		}
		else {
			return;
		}
	}
	writeHTML(elem, arrayCard[f], 'lastImageKosinka', 'imageKosinka');
	g -= 3;
	vyborkaFromOpenKard();
	clickOnVyborkaBeforeMove();
	return;
}
else if (click==5) {		//действие при переносе карты с одного нижнего массива в другой нижний массив
		f = elem.id;
		click5.style.border = '1px solid black';
		h = arrayCard[t].length-1;
		costAddCard(arrayCard[t][h]);
		sravnenieKart();
		if (vypolnenie) {
			arrayCard[f].push(arrayCard[t][h]);
			arrayCard[t].splice(h, 1);
			document.getElementById(t).innerHTML = arrayCard[t];
			writeHTML(elem, arrayCard[f], 'lastImageKosinka', 'imageKosinka');
			previousArray = document.getElementById(t);
			writeHTML(previousArray, arrayCard[t], 'lastImageKosinka', 'imageKosinka');
			click = 0;
			t = null;
			return;
		}
		else {
			alert('Не перемещается');
			click = 0;
			t = null;
			return;
		}
}
else {		//выделяет и запоминает нижний массив с которого вы хотите перенести карту 
	t = elem.id;
	if (arrayCard[t].length==0) {
		click = 0;
		return;
	}
	else {
		click = 5;
		click5 = document.getElementById(t);
		click5.style.border = '1px solid red';
		return;
	}
}
}
function writeHTML(elem, array, addclass1, addclass2) {			//универсальная функция для прорисовки карт в массивах
	elem.innerHTML = '';
	for (var z=0; z<array.length; z++) {
		if (z==(array.length-1)) {
			elem.innerHTML += '<img src="' + array[z] + '.jpg" class="' + addclass1 + '"></img>';
			return;
		}
		elem.innerHTML += '<img src="' + array[z] + '.jpg" class="' + addclass2 + '"></img>';
	}
}
function costAddCard(addCard) {			//оценивает добавляемую карту(методом сравнения карты с элементами массива выборки)
	var r;
	var d;
	for (r=0; r<4; r++) {
		for(d=0; d<9; d++) {
			perebor = arrayForSravnenie[r][d];
			if (addCard == perebor) {
				cac_R = r;
				cac_D = d;
				return;
			}
			else {
				continue;
			}
		}
	}
}
function sravnenieKart() {		//сравнивает добавляемую карту и последнюю карту выбранного нижнего массива
	var lastCard = arrayCard[f].length;
	if (lastCard==0&&cac_D==7) {
		vypolnenie = true;
		return;
	}
	var sravnKard = arrayCard[f][lastCard-1];
	var s = 0;
	var e = 0;
	var costLastCard;
	for (s=0; s<4; s++) {
		for(e=0; e<9; e++) {
			perebor = arrayForSravnenie[s][e];
			if (sravnKard == perebor) {
				costLastCard_S = s;
				costLastCard_E = e;
				break;	
			}
		}
	}
	costLastCard_S = Number(costLastCard_S);
	costLastCard_E = Number(costLastCard_E)-1;
	if (costLastCard_S==0||costLastCard_S==1) {
		if (cac_R==2||cac_R==3) {
			if (costLastCard_E == cac_D) {
				vypolnenie = true;
				return;
			}
			else {
				vypolnenie = false;
				alert('Не та карта');
				return;
			}
		}
		else {
			vypolnenie = false;
			alert('Не подходит масть');
			return;
		}
	}
	else if (costLastCard_S==2||costLastCard_S==3) {
		if (cac_R==0||cac_R==1) {
			if (costLastCard_E == cac_D) {
				vypolnenie = true;
				return;
			}
			else {
				vypolnenie = false;
				alert('Не та карта');
				return;
			}
		}
		else {
			vypolnenie = false;
			alert('Не подходит масть');
			return;
		}
	}
	else {
		vypolnenie = false;
		alert('Ошибка');
		return;
	}
}
function addToEndCard(elem) {			//добавляет и выводит карту в верхнем массиве если все условия выполняются
	if(click==1||click==5) {
		if (click==1) {
			f = elem.id;
			if (g==100) {
				g = koloda.length;
			}
			if (g==0) {
				costAddCard(koloda[g]);
				sravnenieForEndCard();
				if (vypolnenie) {
					arrayCard[f].push(koloda[g]);
					koloda.splice(g, 1);
				}
				else {
					return;
				}
			}
			else {
				costAddCard(koloda[g-1]);
				sravnenieForEndCard();
				if (vypolnenie) {
					arrayCard[f].push(koloda[g-1]);
					koloda.splice(g-1, 1);
				}
				else {
					return;
				}
			}
			elem.innerHTML = '<img src="' + arrayCard[f][arrayCard[f].length-1] + '.jpg" class="endKard"></img>';
			g -= 3;
			vyborkaFromOpenKard();
			clickOnVyborkaBeforeMove();
			finishGame();
		}
		if (click==5) {
			f = elem.id;
			h = arrayCard[t].length-1;
			costAddCard(arrayCard[t][h]);
			sravnenieForEndCard();
			if (vypolnenie) {
				arrayCard[f].push(arrayCard[t][h]);
				arrayCard[t].splice(h, 1);
				elem.innerHTML = '<img src="' + arrayCard[f][arrayCard[f].length-1] + '.jpg" class="endKard"></img>';
				previousArray = document.getElementById(t);
				writeHTML(previousArray, arrayCard[t], 'lastImageKosinka', 'imageKosinka');
				click = 0;
				click5 = document.getElementById(t);
				click5.style.border = '1px solid black';
				t = null;
				finishGame();
				return;
			}
			else {
				alert('Не перемещается');
				clickOnVyborkaBeforeMove();
				t = null;
				return;
			}
		}
	}
	else {
		click = 0;
		click5 = document.getElementById(t);
		click5.style.border = '1px solid black';
		return;
	}
}
function finishGame() {			//проверяет верхние массивы, если во всех 4 массивах по девять карт завершает игру и выводит поздравление
	topArrayOver = 0;
	for (var v=0; v<4; v++) {		//проверяет сколько верхних массивов заполнено
		topArrayLength = arrayCard[7+v].length;
		if (topArrayLength==9) {
			topArrayOver++;
		}
	}
	if (topArrayOver==4) {			//если все 4 массива заполнены завершает игру
		alert('Ура, ты выиграл!');
		closeKosinkaGame();
	}
}
function sravnenieForEndCard() {		//сравнивает добавляемую карту и последнюю карту выбранного верхнего массива
	var lastCard = arrayCard[f].length;
	if (lastCard==0&&cac_D==8) {
		vypolnenie = true;
		return;
	}
	var sravnKard = arrayCard[f][lastCard-1];
	var s = 0;
	var e = 0;
	var costLastCard;
	for (s=0; s<4; s++) {
		for(e=0; e<9; e++) {
			perebor = arrayForSravnenie[s][e];
			if (sravnKard == perebor) {
				costLastCard_S = s;
				costLastCard_E = e;
				break;	
			}
		}
	}
	if (costLastCard_E==8) {
		costLastCard_E = (-1);
	}
	costLastCard_S = Number(costLastCard_S);
	costLastCard_E = Number(costLastCard_E)+1;
	if (costLastCard_S==cac_R) {
			if (costLastCard_E == cac_D) {
				vypolnenie = true;
				return;
			}
			else {
				vypolnenie = false;
				alert('Не та карта');
				return;
			}
	}
	else {
		vypolnenie = false;
		alert('Не та масть');
		return;
	}
}