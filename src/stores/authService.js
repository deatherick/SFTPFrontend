export async function loginUser(values) {
    try {
        const response = await fetch('http://localhost:8080/code/validate/key', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function getFiles() {
    try {
        const response = await fetch('http://localhost:8080/data', {
            method: 'GET',
        });
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function getData(values) {
    try {
        const response = await fetch('http://localhost:8080/data/downloadFile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });
        return await response.text();
    } catch (error) {
        console.error('Error:', error);
    }
}