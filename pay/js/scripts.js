$(document).ready(function(){
                              // Инициализируем плагин для стилизации селектов
  $('select').selecter({
    cover: true
  });
  var selectMonth = document.querySelector('.date');
  selectMonth.children[0].style.width = '70px';

                              // Обрабатываем нажатие на кнопку мобильного меню
  $('.buttonMenu').click(function(){
    $(this).toggleClass('buttonMenuActive');
    if($('.bgButtonMenu').is(':visible')){
      $('.bgButtonMenu').fadeOut(400);
      $('.description').fadeIn(400);
    } else{
      $('.bgButtonMenu').fadeIn(400);
      $('.description').fadeOut(400);
    };
  });

  $('.minMenuString').click(function(){
    $('.bgButtonMenu').fadeOut(400);
    $('.buttonMenu').removeClass('buttonMenuActive');
  });
              // Убираем мобильное меню если пользователь растянет ширину окна браузера при активном мобильном меню
  if(matchMedia){
    var screenWindow = window.matchMedia('(min-width:680px)');
    screenWindow.addListener(changes);
    changes(screenWindow);
  }
  function changes(screenWindow){
    if(screenWindow.matches){
      $('.bgButtonMenu').fadeOut(400);
      $('.buttonMenu').removeClass('buttonMenuActive');
    }
  }

                                                // Подсказка на вопрос cvc кода
  var question = document.querySelector('.question');
  question.addEventListener('mouseover', showHelpText);
  question.addEventListener('mouseout', hideHelpText);
  var helpText = document.querySelector('.helpText');
  function showHelpText(){
    helpText.style.opacity = 1;
  }
  function hideHelpText(){
    helpText.style.opacity = 0;
  }


                                                  // Анимируем логотип
  var logo = document.querySelector('.logoLink');
  logo.addEventListener('mouseover', changeLogo);
  logo.addEventListener('mouseout', changeLogoBack);

  function changeLogo(){
    this.children[0].style.backgroundColor = '#1f2229';
    this.children[0].style.color = 'white';
    this.children[1].style.backgroundColor = 'white';
    this.children[1].style.color = '#1f2229';
  }
  function changeLogoBack(){
    this.children[0].style.backgroundColor = 'white';
    this.children[0].style.color = '#1f2229';
    this.children[1].style.backgroundColor = '#1f2229';
    this.children[1].style.color = 'white';
  }




                                            // Проверяем на валидность номер карты

  var partNumbersCard = document.querySelectorAll('.boxItem');
  for(var i = 0; i < partNumbersCard.length; i++){
    partNumbersCard[i].addEventListener('change', makeValidateNumbersCard);
  }

  function makeValidateNumbersCard(){
    validate(this, /^\d{4}$/, name);
  }
                                              // Проверяем на валидность cvc код

  var cvcCode = document.querySelector('.cvcCodeInput');
  cvcCode.addEventListener('change', makeValidateCvcCode);

  function makeValidateCvcCode(){
    validate(this, /^\d{3}$/);
  }
                                                // Проверяем на валидность инициалы клиента

  var cardHolder = document.querySelector('.cardHolder');
  cardHolder.addEventListener('change', makeValidateCardHolder);

  function makeValidateCardHolder(){
    validate(this, /^[a-z]{2,35}[\ ][a-z]{2,35}$/i);
  }

                                      //  Более детально проверяем на валидность всю форму перед отправкой на сервер

    var buttonForSubmit = document.querySelector('.buttonForSubmitForm');
    buttonForSubmit.addEventListener('click', makeValidateAllForm);

    function makeValidateAllForm(e){
      if(cvcCode.classList.contains('error')){
        alert('Вы не корректно заполнили cvc код\nЗаполняйте в соответствии с образцом');
        e.preventDefault();
        return;
      }
            // Защита от умников которые знают html, от умников которые знают js поможет только проверка на сервере
      if(cvcCode.value == ''){
        cvcCode.style.border = '2px solid red';
        alert('Вы не заполнили cvc код');
        e.preventDefault();
        return;
      }
      if(cardHolder.classList.contains('error')){
        alert('Вы не корректно заполнили поле с инициалами\nЗаполняйте в соответствии с образцом');
        e.preventDefault();
        return;
      }
      if(cardHolder.value == ''){
        cardHolder.style.border = '2px solid red';
        alert('Вы не заполнили поле с инициалами');
        e.preventDefault();
        return;
      }
      for(i = 0; i < partNumbersCard.length; i++){
        if(partNumbersCard[i].classList.contains('error')){
          alert('Вы не корректно заполнили поле с номером карты\nЗаполняйте в соответствии с образцом');
          e.preventDefault();
          return;
        }
        if(partNumbersCard[i].value == ''){
          partNumbersCard[i].style.border = '2px solid red';
          alert('Вы не заполнили поле с номером карты');
          e.preventDefault();
          return;
        }
      }
      alert('Спасибо за оплату');
    }


                                            // Функция валидации
  function validate(thisBox, regV){
    if(thisBox.value == ''){
      if(thisBox.classList.contains('error')){
        thisBox.classList.remove('error');
        thisBox.style.border = '1px solid #e4e9ee';
      }
      thisBox.style.boxShadow = 'none';
      return;
    }
    if(thisBox.value.search(regV) == -1){
      if(!thisBox.classList.contains('error')){
        thisBox.style.border = '2px solid red';
        thisBox.classList.add('error');
      }
    } else{
      if(thisBox.classList.contains('error')){
        thisBox.classList.remove('error');
      }
      thisBox.style.border = '1px solid #e4e9ee';
    }
  }

});
