import Address from "../models/address.js";
import * as addressService from "../services/address-service.js";

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
   
   state.inputCep.addEventListener('change', handleInputCepChange);
   state.inputNumber.addEventListener('change', handleInputNumberChange);
   state.inputNumber.addEventListener('keyup', handleInputNumberKeyup);
   state.btnClear.addEventListener('click', handleBtnClearClick);
   state.btnSave.addEventListener('click', handleBtnSaveClick);   
}

async function handleInputCepChange(event)
{
   const cep = event.target.value;

   try
   {
      const address = await addressService.findByCep(cep);

      state.inputStreet.value = address.street;    
      state.inputCity.value = address.city;
      state.address = address;
      setFormError("cep", "");
      state.inputNumber.focus();
   }
   catch (e)
   {
      state.inputStreet.value = "";
      state.inputCity.value = "";
      setFormError("cep", "Informe um CEP válido!");
   }
      
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

function handleInputNumberKeyup(event)
{
   state.address.number = event.target.value;
}

function handleBtnClearClick(event)
{
   event.preventDefault();
   clearForm();
}

async function handleBtnSaveClick(event)
{
   event.preventDefault();
   console.log(state.address);
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