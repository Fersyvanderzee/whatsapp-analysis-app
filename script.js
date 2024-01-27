document.getElementById('fileInput').addEventListener('change', handleFileSelect);

function handleFileSelect(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const content = e.target.result;
            const regex = /\[(\d{2}\/\d{2}\/\d{4}), (\d{2}:\d{2}:\d{2})\] ([^:]+):([\s\S]+?)(?=\n\[|$)/g;

            const database = [];
            let match;

            while ((match = regex.exec(content)) !== null) {
                const [, date, time, user, message] = match;
                database.push([date, time, user, message.trim()]);
            }

            document.getElementById('output').textContent = JSON.stringify(database, null, 2);
        };

        testFunc();

        reader.readAsText(file);
    } else {
        alert('Please select a file.');
    }
};

