export const ROLES = {
    ANDROID: 'android_dev',
    KMP: 'kmp_dev',
    KTOR: 'ktor_dev'
};

export const EXPERIENCE_CATEGORIES = {
    LANGUAGES: 'languages',
    PLATFORMS: 'platforms',
    ARCHITECTURE: 'architecture',
    ENGINEERING_PRACTICES: 'practices',
    METHODOLOGIES: 'methodologies',
    QUALITY: 'quality',
    UI_FRAMEWORKS: 'ui_frameworks',
    DI: 'di',
    NETWORK: 'network',
    STORAGE: 'storage',
    ASYNC: 'async',
    VCS_CI_CD: 'vcs_ci_cd',
    BUILD_SYSTEMS: 'build_systems',
    INTEGRATIONS: 'integrations'
};

export const EXPERIENCE = {
    // Languages
    KOTLIN: { id: 'kotlin', name: 'Kotlin', cat: EXPERIENCE_CATEGORIES.LANGUAGES },
    JAVA: { id: 'java', name: 'Java', cat: EXPERIENCE_CATEGORIES.LANGUAGES },
    SQL: { id: 'sql', name: 'SQL', cat: EXPERIENCE_CATEGORIES.LANGUAGES },

    // Platforms
    ANDROID_SDK: { id: 'android_sdk', name: 'Android SDK', cat: EXPERIENCE_CATEGORIES.PLATFORMS },
    KMP: { id: 'kmp', name: 'KMP', cat: EXPERIENCE_CATEGORIES.PLATFORMS },
    KTOR: { id: 'ktor', name: 'Ktor', cat: EXPERIENCE_CATEGORIES.PLATFORMS },

    // Architecture
    MVVM: { id: 'mvvm', name: 'MVVM', cat: EXPERIENCE_CATEGORIES.ARCHITECTURE },
    MVI: { id: 'mvi', name: 'MVI', cat: EXPERIENCE_CATEGORIES.ARCHITECTURE },
    MVP: { id: 'mvp', name: 'MVP', cat: EXPERIENCE_CATEGORIES.ARCHITECTURE },
    CLEAN: { id: 'clean_arch', name: 'Clean Architecture', cat: EXPERIENCE_CATEGORIES.ARCHITECTURE },
    SOLID: { id: 'solid', name: 'SOLID', cat: EXPERIENCE_CATEGORIES.ARCHITECTURE },
    MULTI_MODULE: { id: 'multi_module', name: 'Multi-module', cat: EXPERIENCE_CATEGORIES.ARCHITECTURE },
    SDUI: { id: 'sdui', name: 'SDUI', cat: EXPERIENCE_CATEGORIES.ARCHITECTURE },

    // Engineering Practices
    REFACTORING: { id: 'refactoring', name: 'Refactoring', cat: EXPERIENCE_CATEGORIES.ENGINEERING_PRACTICES },
    MIGRATION: { id: 'migration', name: 'Migration', cat: EXPERIENCE_CATEGORIES.ENGINEERING_PRACTICES },
    LEGACY_SUPPORT: { id: 'legacy_support', name: 'Legacy Support', cat: EXPERIENCE_CATEGORIES.ENGINEERING_PRACTICES },
    CODE_REVIEW: { id: 'code_review', name: 'Code Review', cat: EXPERIENCE_CATEGORIES.ENGINEERING_PRACTICES },
    MENTORING: { id: 'mentoring', name: 'Mentoring', cat: EXPERIENCE_CATEGORIES.ENGINEERING_PRACTICES },
    HIRING: { id: 'hiring', name: 'Hiring', cat: EXPERIENCE_CATEGORIES.ENGINEERING_PRACTICES },
    DOCUMENTATION: { id: 'documentation', name: 'Documentation', cat: EXPERIENCE_CATEGORIES.ENGINEERING_PRACTICES },

    // Methodologies
    SCRUM: { id: 'scrum', name: 'Scrum', cat: EXPERIENCE_CATEGORIES.METHODOLOGIES },
    AGILE: { id: 'agile', name: 'Agile', cat: EXPERIENCE_CATEGORIES.METHODOLOGIES },
    KANBAN: { id: 'kanban', name: 'Kanban', cat: EXPERIENCE_CATEGORIES.METHODOLOGIES },

    // Quality
    JUNIT: { id: 'junit', name: 'JUnit', cat: EXPERIENCE_CATEGORIES.QUALITY },
    INTEGRATION_TESTING: { id: 'integration_testing', name: 'Integration Testing', cat: EXPERIENCE_CATEGORIES.QUALITY },
    OPENTELEMETRY: { id: 'openTelemetry', name: 'OpenTelemetry', cat: EXPERIENCE_CATEGORIES.QUALITY },

    // UI Frameworks & Navigation
    VIEW_SYSTEM: { id: 'view_system', name: 'View System', cat: EXPERIENCE_CATEGORIES.UI_FRAMEWORKS },
    COMPOSE: { id: 'compose', name: 'Jetpack Compose', cat: EXPERIENCE_CATEGORIES.UI_FRAMEWORKS },
    DECOMPOSE: { id: 'decompose', name: 'Decompose', cat: EXPERIENCE_CATEGORIES.UI_FRAMEWORKS },
    JETPACK_NAV: { id: 'jetpack_nav', name: 'Jetpack Navigation', cat: EXPERIENCE_CATEGORIES.UI_FRAMEWORKS },
    CICERONE: { id: 'cicerone', name: 'Cicerone', cat: EXPERIENCE_CATEGORIES.UI_FRAMEWORKS },
    MP_CHARTS: { id: 'mp_charts', name: 'MPAndroidCharts', cat: EXPERIENCE_CATEGORIES.UI_FRAMEWORKS },

    // DI
    DAGGER: { id: 'dagger', name: 'Dagger 2', cat: EXPERIENCE_CATEGORIES.DI },
    HILT: { id: 'hilt', name: 'Hilt', cat: EXPERIENCE_CATEGORIES.DI },
    KOIN: { id: 'koin', name: 'Koin', cat: EXPERIENCE_CATEGORIES.DI },
    CUSTOM_DI: { id: 'custom_di', name: 'Custom DI', cat: EXPERIENCE_CATEGORIES.DI },

    // Network
    RETROFIT: { id: 'retrofit', name: 'Retrofit', cat: EXPERIENCE_CATEGORIES.NETWORK },
    OKHTTP: { id: 'okhttp', name: 'OkHttp', cat: EXPERIENCE_CATEGORIES.NETWORK },
    WEBSOCKET: { id: 'websocket', name: 'WebSockets', cat: EXPERIENCE_CATEGORIES.NETWORK },

    // Storage
    ROOM: { id: 'room', name: 'Room', cat: EXPERIENCE_CATEGORIES.STORAGE },
    REALM: { id: 'realm', name: 'Realm', cat: EXPERIENCE_CATEGORIES.STORAGE },
    POSTGRES: { id: 'postgres', name: 'PostgreSQL', cat: EXPERIENCE_CATEGORIES.STORAGE },
    FLYWAY: { id: 'flyway', name: 'Flyway', cat: EXPERIENCE_CATEGORIES.STORAGE },

    // Async
    COROUTINES: { id: 'coroutines', name: 'Kotlin Coroutines', cat: EXPERIENCE_CATEGORIES.ASYNC },
    FLOW: { id: 'flow', name: 'Kotlin Flow', cat: EXPERIENCE_CATEGORIES.ASYNC },
    RXJAVA: { id: 'rxjava', name: 'RxJava', cat: EXPERIENCE_CATEGORIES.ASYNC },

    // VCS / CI/CD
    GIT_FLOW: { id: 'git_flow', name: 'Git Flow', cat: EXPERIENCE_CATEGORIES.VCS_CI_CD },
    TRUNK_BASED: { id: 'trunk_based', name: 'Trunk Based Development', cat: EXPERIENCE_CATEGORIES.VCS_CI_CD },
    GITLAB_CI: { id: 'gitlab_ci', name: 'GitLab CI', cat: EXPERIENCE_CATEGORIES.VCS_CI_CD },
    DOCKER: { id: 'docker', name: 'Docker', cat: EXPERIENCE_CATEGORIES.VCS_CI_CD },

    // Build Systems
    GRADLE_GROOVY: { id: 'gradle_groovy', name: 'Gradle (Groovy)', cat: EXPERIENCE_CATEGORIES.BUILD_SYSTEMS },
    GRADLE_KTS: { id: 'gradle_kts', name: 'Gradle (Kotlin DSL)', cat: EXPERIENCE_CATEGORIES.BUILD_SYSTEMS },

    // Integrations
    FIREBASE: { id: 'firebase', name: 'Firebase', cat: EXPERIENCE_CATEGORIES.INTEGRATIONS },
    GOOGLE_MAPS: { id: 'google_maps', name: 'Google Maps API', cat: EXPERIENCE_CATEGORIES.INTEGRATIONS },
    BILLING: { id: 'billing', name: 'In-App Billing', cat: EXPERIENCE_CATEGORIES.INTEGRATIONS },
    WEBRTC: { id: 'webrtc', name: 'WebRTC', cat: EXPERIENCE_CATEGORIES.INTEGRATIONS },
    EXOPLAYER: { id: 'exoplayer', name: 'ExoPlayer', cat: EXPERIENCE_CATEGORIES.INTEGRATIONS }
};