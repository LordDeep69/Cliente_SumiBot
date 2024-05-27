import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Bienvenida from './components/Bienvenida';
import VistaMedicamentos from './components/VistaMedicamentos';
import DetalleMedicamento from './components/DetalleMedicamento';
import SuministrarMedicamento from './components/SuministrarMedicamento';
import useSpeechRecognition from './hooks/useSpeechRecognition';
import './App.css';

function App() {
  const { isListening, setIsListening, transcript } = useSpeechRecognition();
  const [showBienvenida, setShowBienvenida] = useState(true);
  const [view, setView] = useState('medicamentos');
  const [selectedMedicamento, setSelectedMedicamento] = useState(null);

  const handleVerDetalle = (medicamento) => {
    setSelectedMedicamento(medicamento);
    setView('detalle');
  };

  const handleSuministrar = (medicamento) => {
    setSelectedMedicamento(medicamento);
    setView('suministrar');
  };

  const handleRealizarPedido = () => {
    setView('pedido');
  };

  const handleVolver = () => {
    setView('medicamentos');
    setSelectedMedicamento(null);
  };

  const handleVoiceCommand = (command) => {
    // Lógica para manejar comandos de voz
    console.log(command);
  };

  useEffect(() => {
    if (transcript) {
      handleVoiceCommand(transcript);
    }
  }, [transcript]);

  return (
    <div className="App">
      <Navbar />
      {showBienvenida && <Bienvenida onClose={() => setShowBienvenida(false)} />}
      {view === 'medicamentos' && (
        <VistaMedicamentos
          onVerDetalle={handleVerDetalle}
          onSuministrar={handleSuministrar}
          onRealizarPedido={handleRealizarPedido}
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
