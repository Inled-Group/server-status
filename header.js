    // Obtener elementos
    const serverstatusBtn = document.getElementById('serverstatus-btn');
    const domaininfoBtn = document.getElementById('domaininfo-btn');
    const currentPageSpan = document.getElementById('current-page');

    // Función para actualizar estado activo
    function setActiveButton(activeBtn, inactiveBtn, pageName) {
      activeBtn.classList.add('active');
      inactiveBtn.classList.remove('active');
      currentPageSpan.textContent = pageName;
    }

    // Event listeners
    inledBtn.addEventListener('click', (e) => {
      e.preventDefault(); // Para demo, quita esto si quieres navegación real
      setActiveButton(serverstatusBtn, domaininfoBtn, 'Server Status');
       window.location.href = 'index.html'; // Para navegación real
    });

    webBtn.addEventListener('click', (e) => {
      e.preventDefault(); // Para demo, quita esto si quieres navegación real
      setActiveButton(domaininfoBtn, serverstatusBtn, 'DomainInfo');
       window.location.href = 'ipcheck.html'; // Para navegación real
    });

    // Detectar página actual (opcional)
    function detectCurrentPage() {
      const currentUrl = window.location.hostname;
      if (currentUrl.includes('inled.es')) {
        setActiveButton(inledBtn, webBtn, 'inled.es');
      } else if (currentUrl.includes('web.net')) {
        setActiveButton(webBtn, inledBtn, 'web.net');
      }
    }

    // Llamar al cargar la página
     detectCurrentPage();