export default defineNuxtPlugin(() => {
  // Configurar posición y estilos de las notificaciones
  if (import.meta.client) {
    // Esperar a que el DOM esté listo
    nextTick(() => {
      // Crear estilos personalizados
      const style = document.createElement('style')
      style.innerHTML = `
        /* Forzar posición arriba derecha */
        [data-sonner-toaster] {
          position: fixed !important;
          top: 1rem !important;
          right: 1rem !important;
          left: auto !important;
          bottom: auto !important;
          z-index: 9999 !important;
          pointer-events: none;
        }
        
        [data-sonner-toast] {
          pointer-events: auto;
        }
        
        /* Colores personalizados para errores */
        [data-sonner-toast][data-styled="true"][data-type="error"],
        [data-sonner-toast][data-type="error"] {
          background-color: #dc2626 !important;
          border: 1px solid #b91c1c !important;
          color: white !important;
        }
        
        [data-sonner-toast][data-type="error"] [data-title] {
          color: white !important;
          font-weight: 600 !important;
        }
        
        [data-sonner-toast][data-type="error"] [data-description] {
          color: #fca5a5 !important;
        }
        
        /* Colores personalizados para éxito */
        [data-sonner-toast][data-styled="true"][data-type="success"],
        [data-sonner-toast][data-type="success"] {
          background-color: #16a34a !important;
          border: 1px solid #15803d !important;
          color: white !important;
        }
        
        [data-sonner-toast][data-type="success"] [data-title] {
          color: white !important;
          font-weight: 600 !important;
        }
        
        [data-sonner-toast][data-type="success"] [data-description] {
          color: #86efac !important;
        }
        
        /* Para notificaciones con color red */
        [data-sonner-toast][data-styled="true"][data-theme="red"],
        [data-sonner-toast][data-theme="red"] {
          background-color: #dc2626 !important;
          border: 1px solid #b91c1c !important;
          color: white !important;
        }
        
        [data-sonner-toast][data-theme="red"] [data-title] {
          color: white !important;
        }
        
        [data-sonner-toast][data-theme="red"] [data-description] {
          color: #fca5a5 !important;
        }
        
        /* Para notificaciones con color green */
        [data-sonner-toast][data-styled="true"][data-theme="green"],
        [data-sonner-toast][data-theme="green"] {
          background-color: #16a34a !important;
          border: 1px solid #15803d !important;
          color: white !important;
        }
        
        [data-sonner-toast][data-theme="green"] [data-title] {
          color: white !important;
        }
        
        [data-sonner-toast][data-theme="green"] [data-description] {
          color: #86efac !important;
        }
      `
      document.head.appendChild(style)
      
      // Observer para mover notificaciones cuando aparezcan
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element
              
              // Buscar el contenedor de toaster
              const toaster = element.querySelector('[data-sonner-toaster]') || 
                             (element.hasAttribute && element.hasAttribute('data-sonner-toaster') ? element : null)
              
              if (toaster) {
                (toaster as HTMLElement).style.cssText = `
                  position: fixed !important;
                  top: 1rem !important;
                  right: 1rem !important;
                  left: auto !important;
                  bottom: auto !important;
                  z-index: 9999 !important;
                  pointer-events: none;
                `
              }
            }
          })
        })
      })
      
      // Observar cambios en el body
      observer.observe(document.body, {
        childList: true,
        subtree: true
      })
      
      // Configurar posición inicial si ya existe
      setTimeout(() => {
        const existingToaster = document.querySelector('[data-sonner-toaster]')
        if (existingToaster) {
          (existingToaster as HTMLElement).style.cssText = `
            position: fixed !important;
            top: 1rem !important;
            right: 1rem !important;
            left: auto !important;
            bottom: auto !important;
            z-index: 9999 !important;
            pointer-events: none;
          `
        }
      }, 5000)
    })
  }
})
