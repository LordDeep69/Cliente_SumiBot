import { useState, useEffect } from 'react';

const useSpeechRecognition = (onCommand) => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');

    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = 'es-ES'; // Cambia el idioma según tus necesidades

            recognition.onresult = (event) => {
                let finalTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    }
                }
                setTranscript(finalTranscript);
                onCommand(finalTranscript);
            };

            if (isListening) {
                recognition.start();
            } else {
                recognition.stop();
            }

            return () => {
                recognition.stop();
            };
        }
    }, [isListening]);

    return { isListening, setIsListening, transcript };
};

export default useSpeechRecognition;
