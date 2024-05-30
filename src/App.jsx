import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Navbar from './components/Navbar';
// import Bienvenida from './components/Bienvenida';
import VistaMedicamentos from './components/VistaMedicamentos';
import DetalleMedicamento from './components/DetalleMedicamento';
import SuministrarMedicamento from './components/SuministrarMedicamento';
import useSpeechRecognition from './hooks/useSpeechRecognition';
import './App.css';
import axios from 'axios';

const medicamentos = [
  {
    imageUrl: 'https://lh3.googleusercontent.com/WosmG5aKrxuUPRuBQhQPVzGWDWsuSTycwugGGIIzRurh5WIKDz1ip7qoamP3DNpBETs_sSnmv1E_k_IfLnvbY_19JLrD0GQ8kg=s360',
    name: 'Medicamento 1',
    price: 10.0,
    type: 'Tipo 1',
    content: 'Contenido 1',
    laboratory: 'Laboratorio 1',
  },
  {
    imageUrl: 'https://colmed.com.co/WebColmedInternational/media/products/Tramadol-50mg-x-10.webp',
    name: 'Medicamento 2',
    price: 10.0,
    type: 'Tipo 1',
    content: 'Contenido 1',
    laboratory: 'Laboratorio 1',
  },
  {
    imageUrl: 'https://cdn.pim.mesoigner.fr/mesoigner/ca09962b989bb7d213f25dd7c773d0af/mesoigner-thumbnail-1000-1000-inset/806/033/alprazolam-arrow-0-25-mg-comprime-secable.webp',
    name: 'Medicamento 3',
    price: 250.0,
    type: 'Tipo 1',
    content: 'Contenido 1',
    laboratory: 'Laboratorio 4',
  },
  {
    imageUrl: 'https://lh3.googleusercontent.com/y0szA0Xw5LkQJ2wPUz7rZwlF-XURh2yGPC9NkuUlZj_2tVpkPnHOuRd0I29PucdWqaY35IytzzxtN9nT6iWroRpgO-MPC14o17dWJPZkh01DxBS6=s360',
    name: 'Medicamento 15',
    price: 10.0,
    type: 'Tipo 1',
    content: 'Contenido 1',
    laboratory: 'Laboratorio 1',
  },
  {
    imageUrl: 'https://lh3.googleusercontent.com/ApskHwkCxvPok3EvTjHYTqvzXAcm4dRoLoDTcVYQO_S6xqKeya1heTlTdOcsYktpKLDIzGcwZnsz-f7P0r9yh6RkKpUhDKgNtfMTk9uCIrt_DIb8=s360',
    name: 'Medicamento 20',
    price: 10.0,
    type: 'Tipo 1',
    content: 'Contenido 1',
    laboratory: 'Laboratorio 1',
  },
  {
    imageUrl: 'https://lh3.googleusercontent.com/proxy/ibVQJ6qbAA4n6haQr0fMEn46w5Lvvn8i1-29f-DOHQRabv_NtN4K9sHhq07o1A7khWpU4801vkv6ZxzEGEGqcVkV-FWjMx9DwUFUEnYpI_L5HDmMMB7t',
    name: 'Medicamento 3',
    price: 250.0,
    type: 'Tipo 1',
    content: 'Contenido 80',
    laboratory: 'Laboratorio 4',
  }
  // Añade más objetos de medicamentos según sea necesario
];

function App() {
  const [view, setView] = useState('medicamentos');
  const [selectedMedicamento, setSelectedMedicamento] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const socket = io('http://127.0.0.1:5000');
    socket.on('connect', () => {
      console.log('Conectado al WebSocket');
    });
    socket.on('serial_message', (data) => {
      console.log(`Mensaje recibido del WebSocket: ${data.message}`);
      alert(`Mensaje recibido: ${data.message}`);
    });
    socket.on('disconnect', () => {
      console.log('Desconectado del WebSocket');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendSerialMessage = async (message) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/send', { message });
      alert(`Mensaje enviado: ${response.data.status}`);
    } catch (error) {
      console.error('Error enviando mensaje:', error);
      alert('Error enviando mensaje');
    }
  };

  const handleVerDetalle = (medicamento) => {
    setSelectedMedicamento(medicamento);
    setView('detalle');
  };

  const handleSuministrar = (medicamento) => {
    setSelectedMedicamento(medicamento);
    setView('suministrar');
    sendSerialMessage(`Suministrando ${medicamento.name}`);
  };

  const handleVolver = () => {
    setView('medicamentos');
    setSelectedMedicamento(null);
  };

  const handleRealizarPedido = () => {
    setView('pedido');
  };

  const handleVoiceCommand = (command) => {
    const lowerCaseCommand = command.toLowerCase();

    if (lowerCaseCommand.includes('vista medicamentos')) {
      setView('medicamentos');
    } else if (lowerCaseCommand.includes('vista pedidos')) {
      setView('pedido');
    } else if (lowerCaseCommand.includes('medicamento')) {
      const number = lowerCaseCommand.replace('medicamento', '').trim();
      if (['1', '2', '3', '4', '5', '6'].includes(number)) {
        sendSerialMessage(number);
      }
    } else if (lowerCaseCommand.includes('ver detalles de medicamento')) {
      const name = lowerCaseCommand.replace('ver detalles de medicamento', '').trim();
      const medicamento = medicamentos.find(m => m.name.toLowerCase() === name.toLowerCase());
      if (medicamento) {
        handleVerDetalle(medicamento);
      }
    } else if (lowerCaseCommand.includes('buscar medicamento')) {
      const name = lowerCaseCommand.replace('buscar medicamento', '').trim();
      setSearchTerm(name);
    } else if (lowerCaseCommand.includes('realizar pedido')) {
      handleRealizarPedido();
    } else if (lowerCaseCommand.includes('volver')) {
      handleVolver();
    }
  };

  const { isListening, setIsListening } = useSpeechRecognition(handleVoiceCommand);

  return (
    <div className="App">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {view === 'medicamentos' && (
        <VistaMedicamentos
          onVerDetalle={handleVerDetalle}
          onSuministrar={handleSuministrar}
          onRealizarPedido={handleRealizarPedido}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      )}
      {view === 'detalle' && selectedMedicamento && (
        <DetalleMedicamento medicamento={selectedMedicamento} onVolver={handleVolver} />
      )}
      {view === 'suministrar' && selectedMedicamento && (
        <SuministrarMedicamento medicamento={selectedMedicamento} onVolver={handleVolver} />
      )}
      <button onClick={() => setIsListening(!isListening)} style={{ position: 'fixed', bottom: '10px', right: '10px' }}>
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button>
    </div>
  );
}

export default App;
