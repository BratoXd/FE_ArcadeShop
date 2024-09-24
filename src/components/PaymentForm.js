import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const publicKey = 'TEST-02a8da45-a7c0-44ff-b8c7-240ae4b4ba2f'; // Llave de prueba

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  gap: '16px',
  padding: '20px',
  backgroundColor: '#1e1e1e',
  borderRadius: '8px',
  color: 'white',
  width: '90%',
  maxWidth: '400px',
  height: 'auto',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  position: 'relative',
};

const inputStyle = {
  width: '80%',
  marginBottom: '10px',
  padding: '12px',
  backgroundColor: '#282828',
  color: 'white',
  fontSize: '16px',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

const selectStyle = {
  width: '85%',
  marginBottom: '10px',
  padding: '12px',
  backgroundColor: '#282828',
  color: 'white',
  fontSize: '16px',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

const buttonStyle = (isSubmitting, isSuccess) => ({
  backgroundColor: isSubmitting
    ? '#1DB954' // Verde claro mientras se procesa el pago
    : isSuccess === true
    ? '#28a745' // Verde oscuro si el pago fue exitoso
    : isSuccess === false
    ? '#dc3545' // Rojo si hubo un error en el pago
    : '#007bff', // Azul predeterminado si no hay estado de éxito/fallo
  color: 'white',
  border: 'none',
  padding: '10px',
  borderRadius: '4px',
  cursor: isSubmitting ? 'not-allowed' : 'pointer',
  width: '85%',
  marginBottom: '10px',
  marginTop: '10px',
  transition: 'background-color 0.3s ease',
  position: 'relative',
});

const PaymentForm = ({ handleClose, labelTotal }) => {
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controlar el envío
  const [cardForm, setCardForm] = useState(null); // Guardar referencia del cardForm
  const [isSuccess, setIsSuccess] = useState(null);


  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    document.head.appendChild(script);

    script.onload = () => {

      if (!window.MercadoPago) {
        console.error("El SDK de Mercado Pago no se cargó correctamente.");
        return;
      }
      const mp = new window.MercadoPago(publicKey);

      const form = mp.cardForm({
        amount: labelTotal.toString(),
        form: {
          id: 'form-checkout',
          cardNumber: { id: 'form-checkout__cardNumber', placeholder: 'Número de tarjeta' },
          expirationDate: { id: 'form-checkout__expirationDate', placeholder: 'MM/YY' },
          securityCode: { id: 'form-checkout__securityCode', placeholder: 'Código de seguridad' },
          cardholderName: { id: 'form-checkout__cardholderName', placeholder: 'Titular de la tarjeta' },
          cardholderEmail: { id: 'form-checkout__cardholderEmail', placeholder: 'E-mail' },
          issuer: { id: 'form-checkout__issuer', placeholder: 'Seleccione el emisor' },
          installments: { id: 'form-checkout__installments', placeholder: 'Seleccione las cuotas' },
        },
        callbacks: {
          onFormMounted: (error) => {
            if (error) return console.warn('Error al montar el formulario:', error);
            console.log('Formulario montado');
          },
          onFetching: (resource) => {
            console.log('Buscando recurso:', resource);
          },
        },
      });

      setCardForm(form); // Guardar la instancia del cardForm

      return () => {
        form.unmount();
        const existingScript = document.querySelector('script[src="https://sdk.mercadopago.com/js/v2"]');
        if (existingScript) existingScript.remove();
      };
    };
  }, [labelTotal]);

  const handlePay = async (event) => {
    event.preventDefault(); // Previene el envío del formulario

    if (isSubmitting) return;  // Evitar múltiples solicitudes
    setIsSubmitting(true); // Bloquea el botón

    const {
      paymentMethodId: payment_method_id,
      issuerId: issuer_id,
      cardholderEmail: email,
      amount,
      token,
      installments,
      identificationNumber,
      identificationType,
    } = cardForm.getCardFormData();


    if (token=== '') {
      console.error('Error: No se generó el token.');
      setIsSubmitting(false);
      setIsSuccess(false); // Indica fallo
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/process_payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          issuer_id,
          payment_method_id,
          transaction_amount: Number(amount),
          installments: Number(installments),
          description: 'Descripción del producto',
          payer: {
            email,
            identification: {
              type: identificationType,
              number: identificationNumber,
            },
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor'); // Lanza un error si la respuesta no es OK
      }

      const data = await response.json(); // Convierte la respuesta en JSON

      // Verifica el estado del pago usando data.status
      if (data.data.status === 'approved') {
        setIsSuccess(true); // Indica éxito
        console.log('Pago exitoso:', data);
        document.getElementById('form-checkout').reset(); // Limpia el formulario
      } else {
        setIsSuccess(false); // Indica fallo
        console.log('Error en el pago:', data);
      }
    } catch (error) {
      console.error('Error en el fetch:', error);
      setIsSuccess(false); // Indica fallo
    } finally {
      setIsSubmitting(false); // Liberar el botón
    }
  };

  return (
    <Box sx={formStyle}>
      <IconButton
        onClick={handleClose}
        style={{ position: 'absolute', top: '10px', right: '10px', color: 'white' }}
      >
        <CloseIcon />
      </IconButton>

      <Typography variant="h6" sx={{ mb: 2 }}>
        Pago Seguro
      </Typography>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Total: $ {labelTotal}
      </Typography>

      <form id="form-checkout" style={{ textAlign: 'center' }} onSubmit={handlePay}>
        <input
          type="text"
          id="form-checkout__cardNumber"
          className="mp-input"
          placeholder="Número de Tarjeta"
          style={inputStyle}
        />
        <input
          type="text"
          id="form-checkout__expirationDate"
          className="mp-input"
          placeholder="MM/YY"
          style={inputStyle}
        />
        <input
          type="text"
          id="form-checkout__securityCode"
          className="mp-input"
          placeholder="CVV"
          style={inputStyle}
        />
        <input
          type="text"
          id="form-checkout__cardholderName"
          className="mp-input"
          placeholder="Titular de la tarjeta"
          style={inputStyle}
        />
        <input
          type="email"
          id="form-checkout__cardholderEmail"
          className="mp-input"
          placeholder="E-mail"
          style={inputStyle}
        />
        <select id="form-checkout__issuer" className="mp-input" style={selectStyle}></select>
        <select id="form-checkout__installments" className="mp-input" style={selectStyle}></select>

        <button
          type="submit"
          id="form-checkout__submit"
          style={buttonStyle(isSubmitting, isSuccess)}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Procesando...' : isSuccess === true ? 'Pago Exitoso' : 'Pagar'}
        </button>
        {isSuccess === false && <p style={{ color: 'red' }}>Error en el pago.</p>}

      </form>
    </Box>
  );
};

export default PaymentForm;
