import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navbar
      home: 'Home',
      explore: 'Explore',
      chat: 'Chat',
      history: 'History',
      profile: 'Profile',
      settings: 'Settings',
      marketplace: 'Marketplace',
      
      // Home
      hero_title: 'Your Safe Space to',
      hero_gradient: 'Talk & Connect',
      hero_description: 'Experience meaningful conversations with AI companions designed to understand and support you.',
      get_started: 'Get Started Free',
      sign_in: 'Sign In',
      
      // Explore
      explore_title: 'Explore',
      explore_gradient: 'Characters',
      explore_description: 'Choose an AI companion and start your conversation',
      search_placeholder: 'Search characters...',
      create_character: 'Create Your Own',
      
      // Chat
      type_message: 'Type your message...',
      listening: 'Listening...',
      export: 'Export',
      export_txt: 'Export as TXT',
      export_pdf: 'Export as PDF',
      
      // Common
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      close: 'Close',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      
      // Toasts
      toast_favorite_added: 'Added to favorites',
      toast_favorite_removed: 'Removed from favorites',
      toast_character_downloaded: 'Character added to your collection! 🎉',
      toast_export_success: 'Chat exported successfully',
      toast_export_error: 'Failed to export chat',
    }
  },
  es: {
    translation: {
      // Navbar
      home: 'Inicio',
      explore: 'Explorar',
      chat: 'Chat',
      history: 'Historial',
      profile: 'Perfil',
      settings: 'Ajustes',
      marketplace: 'Mercado',
      
      // Home
      hero_title: 'Tu Espacio Seguro para',
      hero_gradient: 'Hablar y Conectar',
      hero_description: 'Experimenta conversaciones significativas con compañeros de IA diseñados para entenderte y apoyarte.',
      get_started: 'Comenzar Gratis',
      sign_in: 'Iniciar Sesión',
      
      // Explore
      explore_title: 'Explorar',
      explore_gradient: 'Personajes',
      explore_description: 'Elige un compañero de IA y comienza tu conversación',
      search_placeholder: 'Buscar personajes...',
      create_character: 'Crea el Tuyo',
      
      // Chat
      type_message: 'Escribe tu mensaje...',
      listening: 'Escuchando...',
      export: 'Exportar',
      export_txt: 'Exportar como TXT',
      export_pdf: 'Exportar como PDF',
      
      // Common
      cancel: 'Cancelar',
      save: 'Guardar',
      delete: 'Eliminar',
      edit: 'Editar',
      close: 'Cerrar',
      loading: 'Cargando...',
      error: 'Error',
      success: 'Éxito',
      
      // Toasts
      toast_favorite_added: 'Añadido a favoritos',
      toast_favorite_removed: 'Eliminado de favoritos',
      toast_character_downloaded: '¡Personaje añadido a tu colección! 🎉',
      toast_export_success: 'Chat exportado exitosamente',
      toast_export_error: 'Error al exportar chat',
    }
  },
  fr: {
    translation: {
      // Navbar
      home: 'Accueil',
      explore: 'Explorer',
      chat: 'Chat',
      history: 'Historique',
      profile: 'Profil',
      settings: 'Paramètres',
      marketplace: 'Marché',
      
      // Home
      hero_title: 'Votre Espace Sûr pour',
      hero_gradient: 'Parler et Connecter',
      hero_description: 'Vivez des conversations significatives avec des compagnons IA conçus pour vous comprendre et vous soutenir.',
      get_started: 'Commencer Gratuitement',
      sign_in: 'Se Connecter',
      
      // Explore
      explore_title: 'Explorer',
      explore_gradient: 'Personnages',
      explore_description: 'Choisissez un compagnon IA et commencez votre conversation',
      search_placeholder: 'Rechercher des personnages...',
      create_character: 'Créer le Vôtre',
      
      // Chat
      type_message: 'Tapez votre message...',
      listening: 'Écoute...',
      export: 'Exporter',
      export_txt: 'Exporter en TXT',
      export_pdf: 'Exporter en PDF',
      
      // Common
      cancel: 'Annuler',
      save: 'Enregistrer',
      delete: 'Supprimer',
      edit: 'Modifier',
      close: 'Fermer',
      loading: 'Chargement...',
      error: 'Erreur',
      success: 'Succès',
      
      // Toasts
      toast_favorite_added: 'Ajouté aux favoris',
      toast_favorite_removed: 'Retiré des favoris',
      toast_character_downloaded: 'Personnage ajouté à votre collection ! 🎉',
      toast_export_success: 'Chat exporté avec succès',
      toast_export_error: 'Échec de l\'exportation du chat',
    }
  },
  de: {
    translation: {
      // Navbar
      home: 'Startseite',
      explore: 'Erkunden',
      chat: 'Chat',
      history: 'Verlauf',
      profile: 'Profil',
      settings: 'Einstellungen',
      marketplace: 'Marktplatz',
      
      // Home
      hero_title: 'Ihr sicherer Ort zum',
      hero_gradient: 'Sprechen & Verbinden',
      hero_description: 'Erleben Sie bedeutungsvolle Gespräche mit KI-Begleitern, die Sie verstehen und unterstützen.',
      get_started: 'Kostenlos Starten',
      sign_in: 'Anmelden',
      
      // Explore
      explore_title: 'Erkunden',
      explore_gradient: 'Charaktere',
      explore_description: 'Wählen Sie einen KI-Begleiter und starten Sie Ihr Gespräch',
      search_placeholder: 'Charaktere suchen...',
      create_character: 'Erstellen Sie Ihren Eigenen',
      
      // Chat
      type_message: 'Geben Sie Ihre Nachricht ein...',
      listening: 'Hört zu...',
      export: 'Exportieren',
      export_txt: 'Als TXT exportieren',
      export_pdf: 'Als PDF exportieren',
      
      // Common
      cancel: 'Abbrechen',
      save: 'Speichern',
      delete: 'Löschen',
      edit: 'Bearbeiten',
      close: 'Schließen',
      loading: 'Wird geladen...',
      error: 'Fehler',
      success: 'Erfolg',
      
      // Toasts
      toast_favorite_added: 'Zu Favoriten hinzugefügt',
      toast_favorite_removed: 'Aus Favoriten entfernt',
      toast_character_downloaded: 'Charakter zu Ihrer Sammlung hinzugefügt! 🎉',
      toast_export_success: 'Chat erfolgreich exportiert',
      toast_export_error: 'Fehler beim Exportieren des Chats',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;