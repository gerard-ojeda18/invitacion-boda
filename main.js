let songs = [];

        function addSong() {
            const titleInput = document.getElementById('songTitle');
            const artistInput = document.getElementById('songArtist');
            
            const title = titleInput.value.trim();
            const artist = artistInput.value.trim();
            
            if (title && artist) {
                songs.push({ title, artist });
                renderSongs();
                titleInput.value = '';
                artistInput.value = '';
            }
        }

        function removeSong(index) {
            songs.splice(index, 1);
            renderSongs();
        }

        function renderSongs() {
            const songsList = document.getElementById('songsList');
            
            if (songs.length === 0) {
                songsList.innerHTML = '';
                return;
            }
            
            songsList.innerHTML = songs.map((song, index) => `
                <div class="song-item">
                    <div class="song-info">
                        <div class="song-title">${song.title}</div>
                        <div class="song-artist">${song.artist}</div>
                    </div>
                    <button class="remove-song" onclick="removeSong(${index})">×</button>
                </div>
            `).join('');
        }

        document.getElementById('rsvpForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('guestName').value;
            const attendance = document.getElementById('attendance').value;
            const guests = document.getElementById('guests').value;
            
            if (!name || !attendance) {
                alert('Por favor completa todos los campos obligatorios');
                return;
            }
            
            // Construir mensaje de WhatsApp
            let message = `¡Hola! Confirmo mi asistencia a la boda:%0A%0A`;
            message += `*Nombre:* ${encodeURIComponent(name)}%0A`;
            message += `*Asistiré:* ${attendance === 'si' ? 'Sí ✓' : 'No'}%0A`;
            message += `*Número de personas:* ${parseInt(guests) + 1}%0A`;
            
            if (songs.length > 0) {
                message += `%0A*Canciones sugeridas:*%0A`;
                songs.forEach((song, index) => {
                    message += `${index + 1}. ${encodeURIComponent(song.title)} - ${encodeURIComponent(song.artist)}%0A`;
                });
            }
            
            message += `%0A¡Muchas gracias!`;
            
            // Reemplaza con tu número de WhatsApp (formato internacional sin +)
            const phoneNumber = '549113085-3569'; // Ejemplo: 5491112345678 para Argentina
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
            
            window.open(whatsappURL, '_blank');
        });

        // Permitir agregar canción con Enter
        document.getElementById('songArtist').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                addSong();
            }
        });