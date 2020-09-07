'use strict'
let start = document.querySelector('#start');
let btnPlus = document.getElementsByTagName('button');
   let incomePlus = btnPlus[0];
   let expensesPlus = btnPlus[1];
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');
let depositCheck = document.querySelectorAll('#deposit-check');
let budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
let budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
let expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
let accumulatedMonthValue = document.getElementsByClassName('accumulated_month-value')[0];
let additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
let incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
let targetMonthValue = document.getElementsByClassName('target_month-value')[0];
let salaryAmount = document.querySelector('.salary-amount');
let incomeTitle = document.querySelector('.income-title');
let expensesTitle = document.querySelector('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
let additionalExpenses = document.querySelector('.additional_expenses');
let targetAmount = document.querySelector('.target-amount');
let incomeItem = document.querySelectorAll('.income-items');
let periodSelect = document.querySelector('.period-select');
let periodAmount = document.querySelector('.period-amount');



let appData = {
   income: {},
   addIncome: [],
   expenses: {},
   addExpenses: [],
   incomeMonth: 0,
   deposit: false,
   percentDeposit: 0,
   moneyDeposit: 0,
   budget: 0,
   budgetDay: 0,
   budgetMonth: 0,
   expensesMonth: 0,
  

   start : function(){
    if(salaryAmount.value ===''){
        start.disabled = 'true';

    }
    appData.budget = +salaryAmount.value;
    

     
     appData.getExpenses();
     appData.getAddIncome();
     appData.getIncome();
     appData.getExpensesMonth();
     appData.getAddIncomeMonth();
     appData.range();
     appData.getAddExpenses();
     appData.getAddIncome();
     
    
     appData.getBudget();
     appData.showResult();
     appData.clear();
     
    },


    showResult: function(){
        
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        
        incomePeriodValue.value = appData.calcSavedMoney();
        

        periodSelect.addEventListener('input', appData.range);

    },

   
    addExpensesBlock : function(){
     let cloneExpensesItem = expensesItems[0].cloneNode(true);
     expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus );
     expensesItems = document.querySelectorAll('.expenses-items');

     if(expensesItems.length == 3){
         expensesPlus.style.display = 'none';
       }
    },


    getExpenses: function(){
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== '' ){
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },

    addGetIncomeBlock : function(){
        let cloneIncomeTitle = incomeItem[0].cloneNode(true);
        incomeItem[0].parentNode.insertBefore(cloneIncomeTitle, incomePlus );
        incomeItem = document.querySelectorAll('.income-items');
   
        if(incomeItem.length == 3){
            incomePlus.style.display = 'none';
          }
       },
/*                         */
    getIncome: function(){
      incomeItem.forEach(function(item){
          let itemIncomeExp = item.querySelector('.income-title').value;
          let cashIncomeExp = item.querySelector('.income-amount').value;
           if(itemIncomeExp !== '' && cashIncomeExp !== ''){
               appData.income[itemIncomeExp] = cashIncomeExp;
           }
      });
    },


    getAddExpenses: function(){
     let addExpenses = additionalExpensesItem.value.split(',');
     addExpenses.forEach(function(item){
         item = item.trim();
         if(item!==''){
             appData.addExpenses.push(item);
         }
     });
    },


    getAddIncome: function(){
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if (itemValue !== ''){
                appData.addIncome.push(itemValue);
            }
        })

    },
     
  
    getExpensesMonth: function(){     
        for (let key in appData.expenses) {
            appData.expensesMonth += Number(appData.expenses[key]);
            }
            return appData.expensesMonth;
      },

      getAddIncomeMonth: function(){
          for(let key in appData.income){
              appData.incomeMonth += Number(appData.income[key]);
          }
          return appData.incomeMonth;
      },


      getBudget: function(){
        appData.budgetMonth += Math.round(appData.budget + appData.incomeMonth  - appData.expensesMonth);
        appData.budgetDay +=  Math.round((appData.budgetMonth * 12) / 365);
       },

       
       getTargetMonth : function(){
      
       return targetAmount.value / appData.budgetMonth;
    
        },


    getStatusIncome: function () {
            if (appData.budgetDay >= 1200) {
            return ('У вас высокий доход');
            } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
            return ('У вас средний уровень дохода');
            } else if (appData.budgetDay <= 600 && appData.budgetDay >= 0) {
            return ('К сожалению у вас уровень дохода ниже среднего');
            } else {
            return ('Что то пошло не так');
            }
    },
    
    
    getInfoDeposit: function(){
        let percentDeposit, moneyDeposit
        if(appData.deposit){
            do{
              percentDeposit = prompt('Какой годовой процент?','10');
            } while(isNaN(percentDeposit) || percentDeposit.trim() === '' || percentDeposit === null);
            appData.percentDeposit = percentDeposit;


            do{
            moneyDeposit = prompt('Какая сумма заложена?', '10000');
            }while(isNaN(moneyDeposit) || moneyDeposit.trim() === '' || moneyDeposit === null);
            appData.moneyDeposit = moneyDeposit;

        }
    },

    range:  function(){
        periodAmount.innerHTML = periodSelect.value;
        incomePeriodValue.value = appData.calcSavedMoney();
    },
    
    
    calcSavedMoney: function(){
      return appData.budgetMonth * periodSelect.value  ;
    },
    clear: function(){
    appData.income = {};
    appData.addIncome = []; 
    appData.expenses = {};
    appData.addExpenses = [];
    appData.incomeMonth = 0;
    appData.percentDeposit = 0;
    appData.moneyDeposit = 0;
    appData.budget = 0;
    appData.budgetDay = 0;
    //appData.budgetMonth = 0;
    appData.expensesMonth = 0;
     }
};

start.addEventListener('click', appData.start)
incomePlus.addEventListener('click',appData.addGetIncomeBlock);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
periodSelect.addEventListener('input', appData.addPeriodBlock);

periodSelect.addEventListener('input', function () {
    periodAmount.innerHTML = periodSelect.value;
});












