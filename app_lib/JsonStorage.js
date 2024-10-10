const JsonStorage = {
    updateLocalStorage: function (keyOrObject, newValue) {
    
        function serializeResponse(data) {
            if (Array.isArray(data)) {
                return data.map((item) => ({
                    ...item,
                }));
            } else if (typeof data === 'object') {
                // Se for um objeto simples, serializa as propriedades relevantes
                console.info(data)
                return {
                    ...data,
                };
            }
            return data; // Para dados que não são arrays nem objetos
        }

        const storageKey = 'jsonStorage';
        let storedData = localStorage.getItem(storageKey);

        let jsonData = storedData ? JSON.parse(storedData) : {};

        if (typeof keyOrObject === 'object') {
            jsonData = { ...jsonData, ...keyOrObject };
        } else {
            jsonData[keyOrObject] = newValue;
        }

        jsonData = serializeResponse(jsonData); // Serializando os dados
        localStorage.setItem(storageKey, JSON.stringify(jsonData));
    },

    getLocalStorageData: function () {
        const storageKey = 'jsonStorage';
        let storedData = localStorage.getItem(storageKey);
        return storedData ? JSON.parse(storedData) : {};
    }
};

export default JsonStorage;
