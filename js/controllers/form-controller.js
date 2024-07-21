import Address from "../models/address.js";
import * as requestService from "../services/request-service.js";

function State()
{
   this.address = new Address();
   
   this.inputCep = null;
   this.inputStreet = null;
   this.inputNumber = null;
   this.inputCity = null;

   this.btnSave = null;
   this.btnClear = null;

   this.errorCep = null;
   this.errorNumber = null;
}

const state = new State();

export function init()
{
   state.inputCep = document.forms.newAddress.cep;
   state.inputStreet = document.forms.newAddress.street;
   state.inputNumber = document.forms.newAddress.number;
   state.inputCity = document.forms.newAddress.city;

   state.btnSave = document.forms.newAddress.btnSave;
   state.btnClear = document.forms.newAddress.btnClear;

   state.errorCep = document.querySelector('[data-error="cep"]');
   state.errorNumber = document.querySelector('[data-error="number"]');
   
   state.inputNumber.addEventListener('change', handleInputNumberChange);
   state.btnClear.addEventListener('click', handleBtnClearClick);
   state.btnSave.addEventListener('click', handleBtnSaveClick);
}

function handleInputNumberChange(event)
{
   if (event.target.value == "")
   {
      setFormError("number", "Campo requerido!");
   }
   else
   {
      setFormError("number", "");
   }
}

function handleBtnClearClick(event)
{
   event.preventDefault();
   clearForm();
}

async function handleBtnSaveClick(event)
{
   event.preventDefault();
   const result = await requestService.getJson('https://viacep.com.br/ws/29101545/json/');
   console.log(result);
}

function clearForm()
{
   state.inputCep.value = "";
   state.inputStreet.value = "";
   state.inputNumber.value = "";
   state.inputCity.value = "";

   setFormError("cep", "");
   setFormError("number", "");

   state.inputCep.focus();
}

function setFormError(key, value)
{
   const element = document.querySelector(`[data-error="${key}"]`);
   element.innerHTML = value;
}