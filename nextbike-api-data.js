(() => {
  "use strict";
  window.API_LIBRARY.push({
    id: "nextbike",
    sourceId: "nextbike",
    name: "API de Nextbike",
    provider: "Nextbike GmbH",
    protocol: "API XML",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFuylFKHT4KfRZiCLQR3IywJ48OncuGjps8swfhNkP4w&s=10",
    description:
      "API XML para integrar usuarios, bicicletas, ubicaciones, alquileres, reservas, tarifas, pagos y operaciones del servicio Nextbike.",
    baseUrl: "https://api.nextbike.net/api/",
    authentication: "API key; determinadas operaciones requieren loginkey.",
    versioning:
      "Las respuestas XML declaran la versión en el elemento nextbike.",
    refreshFrequency: "En tiempo real, según la operación solicitada.",
    document: {
      name: "Documentación original de la API de Nextbike",
      url: "docs/nextbike-api.html",
      pages: 1,
      format: "HTML",
    },
    conventions: [
      "Operaciones HTTP con respuestas XML.",
      "La URL de cada operación utiliza la extensión .xml.",
      "apikey identifica la integración; loginkey autentica al usuario cuando la operación lo requiere.",
      "La documentación técnica original está en inglés.",
    ],
    unresolved: [
      "Confirmar qué API key debe utilizar SAGULPA en producción.",
      "Confirmar los permisos habilitados para la cuenta y las operaciones disponibles.",
      "Validar los límites de uso, tiempos de espera y política de reintentos.",
      "Documentar el tratamiento y la retención de datos personales devueltos por la API.",
    ],
    groupLabel: "categorías",
    groupType: "CATEGORÍA FUNCIONAL",
    defaultEndpointOpen: false,
    notes: [
      "Se han inventariado todas las operaciones presentes en el HTML facilitado.",
      "Las claves incluidas en la URL de origen se han retirado del documento conservado y no se publican en el catálogo.",
      "Los ejemplos y esquemas se reproducen desde la documentación técnica original.",
    ],
    groups: [
      {
        departmentId: "moxsi",
        name: "Usuarios y autenticación",
        scope: "19 operaciones documentadas",
        endpoints: [
          {
            id: "acceptAgreement",
            name: "acceptAgreement",
            title: "Accept Agreement",
            description: "Accepts an agreement",
            route:
              "https://api.nextbike.net/api/acceptAgreement.xml?apikey=XXXXXXXXXXXXX&loginkey=XXXXXXXXXXXX&agreement_id=X",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  [
                    "agreement_id",
                    "Integer",
                    "Specific Agreement UID (You get that with getAgreementDataForDomain)",
                    "Required",
                  ],
                ],
              },
            ],
            examples: [
              {
                title: "Ejemplo de respuesta",
                content:
                  '<?xml version="1.0" encoding="utf-8"?>\n<nextbike version="1.0" server_time="1234567890">\n  <agreementaccept status="1"/>\n</nextbike>',
              },
            ],
            schemas: [],
          },
          {
            id: "addAppMessageToken",
            name: "addAppMessageToken",
            title:
              "Register the device by emit a FcmPushMessageTokenRegisterEvent",
            description:
              "Register the device by emit a FcmPushMessageTokenRegisterEvent",
            route:
              "https://api.nextbike.net/api/addAppMessageToken.xml?apikey=XXXXXXXXXXXXX&os_type=ios&message_token=jksdfsdf&device_id=24234234",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  [
                    "apikey",
                    "String",
                    "API-key of your application",
                    "required",
                  ],
                  [
                    "loginkey",
                    "String",
                    "login-token of the customer",
                    "required",
                  ],
                  ["message_token", "String", "fcm message token", "required"],
                  ["device_id", "String", "the unique device-id", "optional"],
                  [
                    "os_type",
                    "String",
                    "operating system type: supported: ios or android",
                    "required",
                  ],
                  ["type", "String", "operating system type", "optional"],
                  [
                    "cloud_messenger",
                    "String",
                    "cloud messenger type: supported: mvg_rad",
                    "optional",
                  ],
                ],
              },
            ],
            examples: [],
            schemas: [],
          },
          {
            id: "checkAgreement",
            name: "checkAgreement",
            title: "Check Agreement",
            description: "Checks if User accepted an agreement",
            route:
              "https://api.nextbike.net/api/checkAgreement.xml?apikey=XXXXXXXXXXXXX&loginkey=XXXXXXXXXXXX&agreement_id=X",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  [
                    "agreement_id",
                    "Integer",
                    "Specific Agreement UID (You get that with getAgreementDataForDomain)",
                    "Required",
                  ],
                ],
              },
            ],
            examples: [
              {
                title: "Ejemplo de respuesta",
                content:
                  '<?xml version="1.0" encoding="utf-8"?>\n<nextbike version="1.0" server_time="1234567890">\n  <agreement status="1" valid="1"/>\n</nextbike>',
              },
            ],
            schemas: [],
          },
          {
            id: "getAgreementDataForDomain",
            name: "getAgreementDataForDomain",
            title: "Get Agreement Data For Domain",
            description: "Get all agreements infos for a specific domain",
            route:
              "https://api.nextbike.net/api/getAgreementDataForDomain.xml?apikey=XXXXXXXXXXXXX&domain=de",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  ["domain", "String", "Two Digit domain code", "Optional"],
                  [
                    "loginkey",
                    "String",
                    "Session ID of user (to user domain of user)",
                    "Optional",
                  ],
                ],
              },
            ],
            examples: [
              {
                title: "Ejemplo de respuesta",
                content:
                  '<?xml version="1.0" encoding="utf-8"?>\n<nextbike version="1.0" server_time="1234567890">\n  <agreementdata>\n    <agreement uid="32" tstamp="1458151061" crdate="1458151061" country_id="89" agreement_url="http://www.lodzkirowerpubliczny.pl/regulamin/" agreement_url_old="http://www.nextbike.pl/regulamin.html" valid_from="1461846375" valid_from_old="1458151061" agreement_type="terms"/>\n    <agreement uid="236" tstamp="1459438775" crdate="1458151061" country_id="89" agreement_url="https://nextbike.pl/wp-content/uploads/2016/04/dane-os_%C%81RP_.pdf" agreement_url_old="TESTURL" valid_from="1461846274" valid_from_old="1459438775" agreement_type="privacy_policy"/>\n  </agreementdata>\n</nextbike>',
              },
            ],
            schemas: [],
          },
          {
            id: "getLoginToken",
            name: "getLoginToken",
            title:
              'Creates as short-living "login token" for a user to be shared with a different API key',
            description:
              'Creates a "login token" that you can share with a different application to create a valid loginkey for their API key',
            route:
              "https://api.nextbike.net/api/getLoginToken.json?apikey=XXXXXXXXXXXXX&version=1.0&loginkey=XXXXXXXXXXXX",
            tables: [],
            examples: [],
            schemas: [
              {
                title: "Esquema de entrada",
                content: "@../types/getLoginToken-input.json",
              },
              {
                title: "Esquema de salida",
                content: "@../types/getLoginToken-output.json",
              },
            ],
          },
          {
            id: "getUserDetails",
            name: "getUserDetails",
            title: "Get user details",
            description: "Limited to special API keys",
            route: "https://api.nextbike.net/api/getUserDetails.xml",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  ["apikey", "String", "Your API key", "Required"],
                  [
                    "version",
                    "float",
                    "API version",
                    "optional (default latest)",
                  ],
                  [
                    "loginkey",
                    "String",
                    "Login token of the employee",
                    "Required",
                  ],
                ],
              },
              {
                title: "Valores y códigos documentados",
                headers: ["Node", "Response-Parameter", "Type", "Description"],
                rows: [
                  ["user", "mobile", "String", "Mobile phone number"],
                  [
                    "",
                    "active",
                    "Boolean",
                    "Customer is unlocked (e.g. private trips not paid / no private payment method set)",
                  ],
                  ["", "email", "String", "Email address"],
                  ["", "forename", "String", "First name"],
                  ["", "name", "String", "Last name"],
                  ["", "zip", "String", "ZIP"],
                  ["", "address", "String", "Street + Number"],
                  ["", "city", "String", "City"],
                  ["", "payment", "String", "Payment method (see below)"],
                  ["", "iban", "String", "IBAN of bank account"],
                  ["", "bic", "String", "BIC of bank account"],
                  ["", "language", "String", "2-letter ISO language code"],
                  ["", "country", "String", "2-letter ISO country code"],
                  ["", "newsletter", "Bool", "Subscribe to newsletter"],
                  ["", "domain", "String", "Code of the nextbike brand"],
                  ["", "currency", "String", "Currency"],
                  [
                    "",
                    "team_owner",
                    "bool",
                    "Is the team / company owner (and can access administrative team-functions)",
                  ],
                ],
              },
            ],
            examples: [],
            schemas: [],
          },
          {
            id: "getUserInfo",
            name: "getUserInfo",
            title: "getUserInfo",
            description: "getUserInfo",
            route: "https://api.nextbike.net/api/getUserInfo.xml",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  ["apikey", "String", "Your API key", "Required"],
                  [
                    "version",
                    "Float",
                    "API version",
                    "optional (default latest)",
                  ],
                  [
                    "loginkey",
                    "String",
                    "Login token of the customer",
                    "Required",
                  ],
                ],
              },
              {
                title: "Valores y códigos documentados",
                headers: ["Node", "Response-Parameter", "Type", "Description"],
                rows: [["user", "", "Array", "customer node"]],
              },
            ],
            examples: [],
            schemas: [],
          },
          {
            id: "login",
            name: "login",
            title: "Check phone number for existence",
            description:
              "Checks phone number for existence and provides information about language and nextbike brand",
            route:
              "https://api.nextbike.net/api/login.xml?apikey=XXXXXXXXXXXXX&version=1.0&mobile=491238234123",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Condensed",
                  "Type",
                  "Meaning",
                  "Required",
                ],
                rows: [
                  [
                    "apikey",
                    "k",
                    "String",
                    "API-key of your application",
                    "required",
                  ],
                  [
                    "version",
                    "v",
                    "Float",
                    "API-version",
                    "optional (default latest)",
                  ],
                  [
                    "mobile",
                    "m",
                    "String",
                    "Phone number in international format (+49...)",
                    "required (or bike number)",
                  ],
                ],
              },
              {
                title: "Valores y códigos documentados",
                headers: [
                  "Node",
                  "Condensed",
                  "Response-Parameter",
                  "Condensed",
                  "Typ",
                  "Description",
                ],
                rows: [
                  ["nextbike", "nb", "version", "v", "Float", "API-Version"],
                  ["user", "u", "mobile", "m", "String", "Phone number"],
                  [
                    "",
                    "",
                    "lang",
                    "l",
                    "String",
                    "Language of the customer (e.g. de)",
                  ],
                  [
                    "",
                    "",
                    "domain",
                    "d",
                    "String",
                    "Code of the nextbike brand (z.B. de)",
                  ],
                  [
                    "",
                    "",
                    "bikes",
                    "",
                    "String",
                    "Comma separated list of bike numbers",
                  ],
                ],
              },
              {
                title: "Valores y códigos documentados",
                headers: ["Payment key", "Description"],
                rows: [
                  ["cs", "Cash / Prepaid"],
                  ["dd", "Direct debit (SEPA)"],
                  ["cc", "WorldPay Business"],
                  ["no", "No payment"],
                  ["in", "Invoice"],
                  ["cp", "CorvusPay (Croatia/Bosnia)"],
                  ["dl", "DVB Logpay"],
                  ["pp", "PayPal"],
                  ["ap", "ApcoPay (Malta)"],
                  ["lp", "LiqPay (Ukraine)"],
                  ["ty", "TPay card register (Poland, Cyprus)"],
                  ["wc", "WorldPay Corporate"],
                  ["wp", "WorldPay Online (UK)"],
                ],
              },
            ],
            examples: [
              {
                title: "Ejemplo de respuesta",
                content:
                  '<nextbike version="1.0">\n  <user mobile="491238234123" lang="de" domain="de" />\n</nextbike>',
              },
              {
                title: "Ejemplo de respuesta",
                content:
                  '<nextbike version="1.0">\n  <user mobile="491238234123" loginkey="s4dfjSDF3243" active="1" lang="de" domain="de" currency="EUR" />\n</nextbike>',
              },
            ],
            schemas: [
              {
                title: "Esquema de entrada",
                content: "@../types/login-input.json",
              },
              {
                title: "Esquema de salida",
                content: "@../types/login-output.json",
              },
            ],
          },
          {
            id: "loginByLoginToken",
            name: "loginByLoginToken",
            title: 'Login using a "login token" for a user',
            description:
              'Creates a user session (loginkey) based on a "login token" that you received from a different API key by getLoginToken or in a "rent_url"',
            route:
              "https://api.nextbike.net/api/loginByLoginToken.json?apikey=XXXXXXXXXXXXX&version=1.0&login_token=fHpJnfApSgAYxP1t",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  [
                    "apikey",
                    "String",
                    "API-key of your application",
                    "required",
                  ],
                  [
                    "version",
                    "float",
                    "API-version",
                    "optional (default latest)",
                  ],
                  [
                    "login_token",
                    "String",
                    'Login token received by getLoginToken or in a "rent_url"',
                    "required",
                  ],
                ],
              },
            ],
            examples: [],
            schemas: [],
          },
          {
            id: "logout",
            name: "logout",
            title: "Logout",
            description:
              "Delete session(s) of the customer Default usage (without scope parameter): delete only the session with used loginkey",
            route:
              "https://api.nextbike.net/api/logout.xml?apikey=XXXXXXXXXXXXX&loginkey=XXXXXXXXXXXX&scope=apikey",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  [
                    "apikey",
                    "String",
                    "API-key of your application",
                    "required",
                  ],
                  [
                    "version",
                    "float",
                    "API-version",
                    "optional (default latest)",
                  ],
                  [
                    "loginkey",
                    "String",
                    "Login-Token of the customer",
                    "required",
                  ],
                  [
                    "scope",
                    "String",
                    "'all': delete all sessions of customer or 'apikey': delete sessions with same apikey",
                    "optional",
                  ],
                  [
                    "device_id",
                    "String",
                    "the device that you are logging out",
                    "optional",
                  ],
                  ["os_type", "String", "operating system type", "optional"],
                  [
                    "cloud_messenger",
                    "String",
                    "cloud messenger type",
                    "optional",
                  ],
                  ["message_token", "String", "fcm message token", "optional"],
                ],
              },
            ],
            examples: [],
            schemas: [],
          },
          {
            id: "orderRfidCard",
            name: "orderRfidCard",
            title: "orderRfidCard",
            description: "orderRfidCard",
            route: "https://api.nextbike.net/api/orderRfidCard.xml",
            tables: [],
            examples: [],
            schemas: [],
          },
          {
            id: "partner",
            name: "partner",
            title: "Partner - Get the details of a Partner",
            description: "Get the details of a Partner",
            route:
              "https://api.nextbike.net/api/partner.xml?apikey=XXXXXXXXXXXXX&loginkey=XXXXXXXXXXXX&partner_id=xxxx",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  ["partner_id", "Integer", "Internal Partner UID", "Required"],
                  ["apikey", "String", "Your API key", "Required"],
                  [
                    "version",
                    "Float",
                    "API version",
                    "optional (default latest)",
                  ],
                  [
                    "loginkey",
                    "String",
                    "Login token of the customer, to check customer-specific availability (e.g. bike limits)",
                    "Required",
                  ],
                ],
              },
              {
                title: "Valores y códigos documentados",
                headers: ["Node", "Response-Parameter", "Type", "Description"],
                rows: [
                  [
                    "partner",
                    "partner",
                    "Node",
                    "Detailed description of the given partner",
                  ],
                  ["", "uid", "int", "Internal id of the partner"],
                  ["", "partner_name", "string", "Name of the partner"],
                  ["", "domain", "string", "Domain of the partner"],
                  [
                    "",
                    "verification_type",
                    "string",
                    'Connection path ("number", "mail", "link", "foreign_system")',
                  ],
                  [
                    "",
                    "description_conditions",
                    "string/null",
                    "a textual description of the conditions of the partner",
                  ],
                  [
                    "",
                    "description_details",
                    "string/null",
                    "a textual description of the details of the partner",
                  ],
                  [
                    "",
                    "description_hint",
                    "string/null",
                    "an additional hint for the partner",
                  ],
                  ["", "category", "string/null"],
                  [
                    "",
                    "partner_number",
                    "string",
                    'First number identifier to connect with the partner (only if verification_type "number")',
                  ],
                  [
                    "",
                    "partner_number2",
                    "string/null",
                    'Second identifier to connect with the partner (only if verification_type "number")',
                  ],
                  [
                    "",
                    "is_connected",
                    "boolean",
                    "whether the customer requesting is connected to the partner",
                  ],
                  [
                    "",
                    "user_number",
                    "string/null",
                    'First identifier used to connect to the partner (only if verification_type "number" and is_connected is true)',
                  ],
                  [
                    "",
                    "user_number2",
                    "string/null",
                    'Second identifier used to connect to the partner (only if verification_type "number" and is_connected is true)',
                  ],
                  [
                    "",
                    "link",
                    "String",
                    'url to external verification service (only if verification_type "link")',
                  ],
                ],
              },
            ],
            examples: [
              {
                title: "Ejemplo de respuesta",
                content:
                  '<?xml version="1.0" encoding="utf-8"?>\n<nextbike version="1.0" server_time="1234567890">\n  <item server_time="1566881394">\n    <partner uid="367" partner_name="PartnerMe" partner_number="Zugangsnummer" partner_number2="BenefitCard" domain="fr" verification_type="number" description_conditions="Abc" description_details="Abc" description_hint="Abc" category="university_1" is_connected="1" user_number="123-44-55"/>\n  </item>\n</nextbike>',
              },
            ],
            schemas: [],
          },
          {
            id: "partnerLogin",
            name: "partnerLogin",
            title: "Login for nextbike partners",
            description:
              "Get a loginkey for one of your customers using the partner connection data",
            route:
              "https://api.nextbike.net/api/partnerLogin.xml?apikey=XXXXXXXXXXXXX&version=1.0&partner_number=1234556&partner_number2=ABcdEF12",
            tables: [],
            examples: [],
            schemas: [
              {
                title: "Esquema de entrada",
                content: "@../types/partnerLogin-input.json",
              },
            ],
          },
          {
            id: "partnerTokenLogin",
            name: "partnerTokenLogin",
            title: "partnerTokenLogin",
            description: "partnerTokenLogin",
            route: "https://api.nextbike.net/api/partnerTokenLogin.xml",
            tables: [],
            examples: [],
            schemas: [],
          },
          {
            id: "pinRecover",
            name: "pinRecover",
            title: "Reset PIN",
            description:
              'Sends a text message with the PIN to the phone number Response like "Check phone number for existence"',
            route:
              "https://api.nextbike.net/api/pinRecover.xml?apikey=XXXXXXXXXXXXX&version=1.0&mobile=491238234123",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  [
                    "apikey",
                    "String",
                    "API-key of your application",
                    "required",
                  ],
                  [
                    "version",
                    "float",
                    "API-version",
                    "optional (default latest)",
                  ],
                  [
                    "mobile",
                    "String",
                    "Phone number in international format (+49...)",
                    "required",
                  ],
                ],
              },
            ],
            examples: [],
            schemas: [],
          },
          {
            id: "register",
            name: "register",
            title: "Registration / Signup",
            description: "Only for terminals and nextbike partners",
            route: "https://api.nextbike.net/api/register.xml",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  [
                    "apikey",
                    "String",
                    "API key of the application",
                    "required",
                  ],
                  ["version", "float", "API version", "optional (default 1.0)"],
                  [
                    "domain",
                    "String",
                    "short code of the nextbike brand the customer shall be registered in",
                  ],
                  [
                    "mobile",
                    "String",
                    "Mobile phone number (if not in international format, default country prefix of user domain will be prepended), will be used for login / as username",
                    "optional",
                  ],
                  [
                    "sms_mobile",
                    "String",
                    "Mobile phone number to send SMS to",
                    "optional",
                  ],
                  ["email", "String", "Email address", "optional"],
                  ["forename", "String", "First name", "optional"],
                  ["name", "String", "Last name", "optional"],
                  ["birthday", "String", "Date of birth", "optional"],
                  ["id_number", "String", "ID/Passport number", "optional"],
                  ["zip", "String", "ZIP", "optional"],
                  ["address", "String", "Street + Number", "optional"],
                  ["city", "String", "City", "optional"],
                  [
                    "language",
                    "String",
                    "2-letter ISO language code",
                    "optional",
                  ],
                  ["newsletter", "Bool", "Subscribe to newsletter", "optional"],
                  [
                    "rfid_uid",
                    "String",
                    "RFID UID of customer card (uint64)",
                    "optional",
                  ],
                  [
                    "partner_number",
                    "String",
                    "Identification key of partner",
                    "optional",
                  ],
                  [
                    "partner_number_2",
                    "String",
                    "Additional identification key of partner",
                    "optional",
                  ],
                  ["rfid_card", "String", "Order customer card?", "optional"],
                  [
                    "pesel",
                    "String",
                    "Polish personal identification number",
                    "optional",
                  ],
                  [
                    "gender",
                    "String",
                    "Abbreviation for male (m), female (f) or other (o)",
                    "optional",
                  ],
                  ["data_{yourkey}", "String", "Additional fields", "optional"],
                  [
                    "benefit_card_number",
                    "String",
                    "Benefit card number",
                    "optional",
                  ],
                  [
                    "app_hash",
                    "String",
                    "Android App hash [ https://developers.google.com/identity/sms-retriever/verify#computing_your_apps_hash_string] for verification SMS",
                    "optional",
                  ],
                ],
              },
            ],
            examples: [
              {
                title: "Ejemplo de respuesta",
                content:
                  '<?xml version="1.0" encoding="utf-8"?>\n<nextbike version="1.0" server_time="1234567890">\n  <user mobile="6356510154731" lang="SV" domain="zg"/>\n</nextbike>',
              },
            ],
            schemas: [],
          },
          {
            id: "revokeAgreement",
            name: "revokeAgreement",
            title: "Revoke Agreement",
            description: "Revokes an agreement",
            route:
              "https://api.nextbike.net/api/revokeAgreement.xml?apikey=XXXXXXXXXXXXX&loginkey=XXXXXXXXXXXX&agreement_id=X",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  [
                    "apikey",
                    "String",
                    "API-Key of the application",
                    "required",
                  ],
                  ["loginkey", "String", "Login-Token of customer", "required"],
                  [
                    "agreement_id",
                    "Integer",
                    "Specific Agreement UID (You get that with getAgreementDataForDomain)",
                    "Required",
                  ],
                  [
                    "version",
                    "Number",
                    "API-Version",
                    "optional (default: newest)",
                  ],
                ],
              },
            ],
            examples: [],
            schemas: [],
          },
          {
            id: "setAdId",
            name: "setAdId",
            title: "stores the advertisement-id for a given device & user",
            description:
              "stores the advertisement-id for a given device & user",
            route:
              "https://api.nextbike.net/api/setAdId.xml?apikey=XXXXXXXXXXXXX&os_type=ios&ad_id=jksdfsdf&device_id=24234234",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  [
                    "apikey",
                    "String",
                    "API-key of your application",
                    "required",
                  ],
                  [
                    "loginkey",
                    "String",
                    "login-token of the customer",
                    "required",
                  ],
                  ["ad_id", "String", "the advertisement-id", "required"],
                  [
                    "device_id",
                    "String",
                    "the unique device-id the ad-id belongs to",
                    "required",
                  ],
                  [
                    "os_type",
                    "String",
                    "operating system type: supported: ios or android",
                    "required",
                  ],
                ],
              },
            ],
            examples: [],
            schemas: [],
          },
          {
            id: "updateUser",
            name: "updateUser",
            title: "Update user",
            description: "Limited to special API keys",
            route: "https://api.nextbike.net/api/updateUser.xml",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  ["apikey", "String", "Your API key", "Required"],
                  [
                    "version",
                    "float",
                    "API version",
                    "optional (default latest)",
                  ],
                  [
                    "loginkey",
                    "String",
                    "Login token of the employee",
                    "Required",
                  ],
                  [
                    "mobile",
                    "String",
                    "Mobile phone number (if not in international format, default country prefix of user domain will be prepended)",
                    "optional",
                  ],
                  [
                    "sms_mobile",
                    "String",
                    "Mobile phone number to send SMS to",
                    "optional",
                  ],
                  ["email", "String", "Email address", "optional"],
                  ["forename", "String", "First name", "optional"],
                  ["name", "String", "Last name", "optional"],
                  ["birthday", "String", "Date of birth", "optional"],
                  ["id_number", "String", "ID/Passport number", "optional"],
                  ["zip", "String", "ZIP", "optional"],
                  ["address", "String", "Street + Number", "optional"],
                  ["city", "String", "City", "optional"],
                  [
                    "payment",
                    "String",
                    "Payment method (see below)",
                    "optional",
                  ],
                  ["iban", "String", "IBAN of bank account", "optional"],
                  ["bic", "String", "BIC of bank account", "optional"],
                  [
                    "language",
                    "String",
                    "2-letter ISO language code",
                    "optional",
                  ],
                  [
                    "country",
                    "String",
                    "2-letter ISO country code",
                    "optional",
                  ],
                  ["newsletter", "Bool", "Subscribe to newsletter", "optional"],
                  [
                    "active",
                    "Bool",
                    "Set to 0 to lock the account (activation is not possible)",
                    "optional",
                  ],
                  [
                    "forbid_rentals",
                    "Bool",
                    "Set to 1 to disable rentals for the account - regardless of activation state (deactivation is not possible) - only for special API keys",
                    "optional",
                  ],
                  [
                    "comment",
                    "String",
                    "add an comment to customer account",
                    "optional",
                  ],
                  [
                    "pesel",
                    "String",
                    "Polish personal identification number",
                    "optional",
                  ],
                  [
                    "gender",
                    "String",
                    "Abbreviation for male (m), female (f) or other (o)",
                    "optional",
                  ],
                  ["data_{yourkey}", "String", "Additional fields", "optional"],
                  [
                    "benefit_card_number",
                    "String",
                    "Benefit card number",
                    "optional",
                  ],
                  [
                    "callback_{event}",
                    "String",
                    'Callback URL for user events (callback will be sent as HTTP POST) - see "Callback events"',
                    "optional",
                  ],
                ],
              },
              {
                title: "Valores y códigos documentados",
                headers: ["Callback event", "Description"],
                rows: [
                  [
                    "detected_nfc",
                    "Rfid/eTicket detected and related customer is known to us. We will send eTicket data, customer loginkey and bike number to be able to rent directly afterwards.",
                  ],
                  [
                    "notification",
                    "We sent a notification (email, sms, push) to the user that can be retrieved via getNotifications API",
                  ],
                  [
                    "notification_email",
                    "As 'notification' but limited to emails",
                  ],
                  ["notification_sms", "As 'notification' but limited to sms"],
                  [
                    "notification_push",
                    "As 'notification' but limited to push notifications",
                  ],
                  [
                    "user",
                    "The user object has changed, e.g. activation, credits, details or benefits like partner connections",
                  ],
                  [
                    "user_details",
                    "The user details changed (everything that is not in the other types)",
                  ],
                  ["user_credits", "Credits changed, e.g. by usage or payment"],
                  [
                    "user_activation",
                    "Active status changed, e.g. after being activated or banned from renting vehicles",
                  ],
                  [
                    "user_deleted",
                    "The user has requested account deletion or the user has been deleted finally",
                  ],
                  [
                    "user_benefits",
                    "A partner connection has been established or released. Subscription expiry is not yet included",
                  ],
                ],
              },
              {
                title: "Valores y códigos documentados",
                headers: ["Code", "Description"],
                rows: [
                  ["cc", "Credit card (WorldPay)"],
                  ["cp", "CorvusPay"],
                  ["cs", "Cash / Prepaid"],
                  ["dd", "Direct Debit (SEPA)"],
                  ["in", "Invoice (can not be set by user)"],
                  ["pp", "PayPal"],
                  ["ep", "External-Provider"],
                ],
              },
            ],
            examples: [],
            schemas: [],
          },
        ],
      },
      {
        departmentId: "moxsi",
        name: "Vehículos y ubicaciones",
        scope: "12 operaciones documentadas",
        endpoints: [
          {
            id: "getBikeList",
            name: "getBikeList",
            title: "getBikeList",
            description:
              "Provides information about the availability of bikes (rented, active, not active) at a station Optional in dependency of the user. Some bikes are not available for every user (because of reservation)",
            route:
              "https://api.nextbike.net/api/getBikeList.xml?apikey=XXXXXXXXXXXXX&version=1.0&station=1001",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  [
                    "apikey",
                    "String",
                    "API-key of your application",
                    "required",
                  ],
                  [
                    "version",
                    "float",
                    "API-version",
                    "optional (default latest)",
                  ],
                  [
                    "loginkey",
                    "String",
                    "Login-Token of the customer",
                    "optional",
                  ],
                  ["station", "String", "4-digit station number", "optional"],
                ],
              },
            ],
            examples: [
              {
                title: "Ejemplo de respuesta",
                content:
                  '<nextbike version="1.0">\n  <bike number="55554" state="ok" bike_type="4"/>\n  <bike number="55555" state="ok" bike_type="4"/>\n</nextbike>',
              },
            ],
            schemas: [],
          },
          {
            id: "getBikeState",
            name: "getBikeState",
            title: "getBikeState",
            description:
              "Provides information about the availability of bikes (rented, active, not active) Optional in dependency of the user. Some bikes are not available for every user (because of reservation) See getBikeTypes for infos about bike type",
            route:
              "https://api.nextbike.net/api/getBikeState.xml?apikey=XXXXXXXXXXXXX&version=1.0&bike=10000",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  [
                    "apikey",
                    "String",
                    "API-key of your application",
                    "required",
                  ],
                  [
                    "version",
                    "float",
                    "API-version",
                    "optional (default latest)",
                  ],
                  [
                    "loginkey",
                    "String",
                    "Login-Token of the customer",
                    "optional",
                  ],
                  [
                    "bike",
                    "String",
                    "bike number (5 or more digits)",
                    "optional",
                  ],
                  [
                    "boardcomputer",
                    "Int",
                    "Serial number of board computer",
                    "Optional (replaces bike)",
                  ],
                  [
                    "qr_code",
                    "String",
                    "Content of the QR code sticker",
                    "Optional (replaces bike)",
                  ],
                  [
                    "imei",
                    "int",
                    "IMEI of the IoT device",
                    "Optional (replaces bike)",
                  ],
                  [
                    "vehicle_id",
                    "String",
                    "Vehicle UUID",
                    "Optional (replaces bike)",
                  ],
                  [
                    "bluetooth_mac",
                    "String",
                    "MAC of the Bluetooth module",
                    "Optional (replaces bike)",
                  ],
                  [
                    "gbfs_vehicle_id",
                    "String",
                    "Vehicle ID from GBFS feed",
                    "Optional (replaces bike)",
                  ],
                ],
              },
              {
                title: "Valores y códigos documentados",
                headers: ["State", "Meaning"],
                rows: [
                  ["ok", "Bike is available to rent"],
                  [
                    "ok_but_unknown_number",
                    "Bike may available to rent, but unknown customer information",
                  ],
                  ["unknown", "bike is not existent"],
                  ["return", "return (by providing loginkey)"],
                  [
                    "return_but_unknown_number",
                    "return (without providing loginkey)",
                  ],
                  ["locked", "user is not active"],
                  ["limit", "too many bikes"],
                  ["occupied", "occupied/rented (without providing loginkey)"],
                  ["recently_returned", "recently returned"],
                  [
                    "low_credits",
                    "credits less than 0, Top up! (Customer account got locked - applies to customers without valid payment information (credit card, etc.))",
                  ],
                  [
                    "ok_but_foreign",
                    "different provider - there are different terms and conditions",
                  ],
                  [
                    "ok_but_foreign_terms",
                    "different provider, customer has not accepted these terms and conditions",
                  ],
                  [
                    "not_available_over_night",
                    "bike not lendable or bookable at night",
                  ],
                  [
                    "no_roaming",
                    "different provider - user can not rent bikes there but should create a local account",
                  ],
                  ["service", "bike is not available for renting"],
                ],
              },
            ],
            examples: [
              {
                title: "Ejemplo de respuesta",
                content:
                  '<?xml version="1.0" encoding="utf-8"?>\n<nextbike version="1.0" server_time="1234567890">\n  <bike number="10900" language="de" boardcomputer="7551004163" battery="145" snap="0" target_firmware="190805E0" target_configuration="18020106" electric_lock="1" gps_tracking="0" rfid="0" rfid_uid="0" bluetooth_mac="B4A82805A42D" state="ok_but_unknown_number" bike_type="4" lock_types="frame_lock,dls" active="1" app_campaign_picture="https://websites.nextbike.net/media/campaigns/business-bike-werbung.png" app_campaign_picture_link="https://www.nextbike.net/businessbike/" app_campaign_uid="2531" campaign_name="App-Kampagne" pedelec="0" pedelec_battery="" place_id="9364216" city_id="685" bike_domain="dx" domain="dx" rate_id="123" gbfs_pricing_plan_id="Rate0123" place_name="BIKE 10900" place_address="" place_type="12" is_free_floating="1">\n    <texts>\n      <text type="biketype_name">\nComfortEn\n</text>\n      <text type="info">\n\n</text>\n      <text type="warning">\n\n</text>\n      <text type="biketype_description">\n- Tiefer Einstieg\n- Shimano 3-Gang oder 7-Gang-Nabenschaltung\n- Nabendynamo\n- Korbausstattung\n</text>\n    </texts>\n  </bike>\n</nextbike>',
              },
            ],
            schemas: [],
          },
          {
            id: "getBikeTrackingLocations",
            name: "getBikeTrackingLocations",
            title: "Get Bike Tracking Locations",
            description:
              "Get all tracked positions for a bike will return 404 if the bike is not found or no positions are known or 401 is the user is not found or not allowed see https://github.com/mapbox/simplestyle-spec",
            route:
              "https://api.nextbike.net/api/getBikeTrackingLocations.xml?apikey=XXXXXXXXXXXXX&loginkey=XXXXXXXXXXXX&bike=12345&limit=15&days_ago=4&geojson=1",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  ["bike", "Integer", "Bike Name", "Required"],
                  [
                    "loginkey",
                    "String",
                    "Login token of the employee",
                    "Required",
                  ],
                  [
                    "limit",
                    "Integer",
                    "Number of Locations you want to get back (default 20, max 100)",
                    "Optional",
                  ],
                  [
                    "days_ago",
                    "Integer",
                    "Maximum days for that the locations are returned (default 2, max 30)",
                    "Optional",
                  ],
                  [
                    "geojson",
                    "Integer",
                    "If set to 1 the return will contain a simplestyled GeoJSON FeatureCollection instead of a list of BikeTrackingEntities (default 0)",
                    "Optional",
                  ],
                ],
              },
            ],
            examples: [
              {
                title: "Ejemplo de respuesta",
                content:
                  '<?xml version="1.0" encoding="utf-8"?>\n<nextbike version="1.0" server_time="1234567890">\n  <item bike_name="21095">\n    <geojson>\n{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Point","coordinates":[11.578632,48.166605]},"properties":{"title":"Current bike place","marker-symbol":"b","marker-color":"#000000","marker-size":"large"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[11.578632,48.166605]},"properties":{"title":"2019-06-19 17:12:26","hours_ago":19,"precise":true,"marker-symbol":19,"marker-color":"#FF0000","marker-size":"medium"},"id":130076289},{"type":"Feature","geometry":{"type":"Point","coordinates":[11.189057,48.119593]},"properties":{"title":"2019-06-19 03:24:26","hours_ago":33,"precise":false,"marker-symbol":33,"marker-color":"#A9A9A9","marker-size":"small"},"id":130076287},{"type":"Feature","geometry":{"type":"LineString","coordinates":[[11.578632,48.166605],[11.189057,48.119593]]},"properties":null}]}\n</geojson>\n  </item>\n</nextbike>',
              },
              {
                title: "Ejemplo de respuesta",
                content:
                  '<?xml version="1.0" encoding="utf-8"?>\n<nextbike version="1.0" server_time="1234567890">\n  <item bike_name="21095">\n    <bike_trackings>\n      <item uid="130076289" tstamp="1560957146" bikeId="29758" lat="48.166605" lng="11.578632" lendingId="5029"/>\n      <item uid="130076287" tstamp="1560907466" bikeId="29758" lat="48.119593" lng="11.189057" comments="E" lendingId="5028"/>\n    </bike_trackings>\n  </item>\n</nextbike>',
              },
            ],
            schemas: [],
          },
          {
            id: "getBikeTypeGroups",
            name: "getBikeTypeGroups",
            title: "Get Bike Type Groups",
            description:
              "Bike types can be grouped by their properties Reserved for some API-keys",
            route:
              "https://api.nextbike.net/api/getBikeTypeGroups.xml?apikey=XXXXXXXXXXXXX&language=en",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  ["apikey", "String", "Your API key", "Required"],
                  [
                    "version",
                    "float",
                    "API version",
                    "optional (default latest)",
                  ],
                  [
                    "language",
                    "String",
                    "ISO-Code of the language the group name should be shown in",
                    "optional(default english)",
                  ],
                ],
              },
              {
                title: "Valores y códigos documentados",
                headers: ["Node", "Response-Parameter", "Type", "Description"],
                rows: [
                  [
                    "bikeTypeGroup",
                    "uid",
                    "Intger",
                    "ID of the bike type group",
                  ],
                  [
                    "",
                    "name",
                    "String",
                    "Name of the Bike type group in chosen language",
                  ],
                  [
                    "",
                    "bike_types",
                    "String",
                    "Comma separated list of bike types that belong to this group",
                  ],
                ],
              },
            ],
            examples: [
              {
                title: "Ejemplo de respuesta",
                content:
                  '<nextbike version="1.0" server_time="1458134606">\n<bikeTypeGroup uid="0" name="Unknown" bike_types="7,8,9,18"/>\n<bikeTypeGroup uid="1" name="Bike with low step" bike_types="1,2,3,4,14,15"/>\n<bikeTypeGroup uid="2" name="Classic bike" bike_types="5,13"/>\n<bikeTypeGroup uid="3" name="Pedelec" bike_types="6,17"/>\n<bikeTypeGroup uid="4" name="Accessories" bike_types="10,11,12"/>\n<bikeTypeGroup uid="5" name="Bike parking spot" bike_types="16"/>\n</nextbike>',
              },
            ],
            schemas: [],
          },
          {
            id: "getBikeTypes",
            name: "getBikeTypes",
            title: "Get Bike Types",
            description:
              'Bike are separated in bike types Every bike type belongs to a more general "bike type group" (see getBikeTypeGroups) Bike types can be grouped into a hierarchy using parent_biketype_id',
            route:
              "https://api.nextbike.net/api/getBikeTypes.xml?apikey=XXXXXXXXXXXXX&language=en",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  ["apikey", "String", "Your API key", "Required"],
                  [
                    "version",
                    "float",
                    "API version",
                    "optional (default latest)",
                  ],
                  [
                    "language",
                    "String",
                    "ISO-Code of the language the bike type name should be shown in",
                    "optional(default none)",
                  ],
                ],
              },
              {
                title: "Valores y códigos documentados",
                headers: ["Node", "Response-Parameter", "Type", "Description"],
                rows: [
                  ["bikeType", "uid", "Intger", "ID of the bike type"],
                  [
                    "",
                    "name",
                    "String",
                    "Name of the bike type in chosen language",
                  ],
                  [
                    "",
                    "biketype_group",
                    "Integer",
                    "ID of the bike type group the type belongs to",
                  ],
                  ["", "formfactor_code", "String", ""],
                  [
                    "",
                    "parent_biketype_id",
                    "Integer",
                    "This is a sub-type of the parent bike type (for bike_type hierarchy",
                  ],
                  [
                    "",
                    "name",
                    "String",
                    "ID of the bike type group the type belongs to",
                  ],
                  [
                    "",
                    "description",
                    "String",
                    "Description text, may contain line breaks. But should not contain HTML",
                  ],
                  [
                    "",
                    "info",
                    "String",
                    "Info text, e.g. Please find the helmet under the seat. May contain line breaks. But should not contain HTML",
                  ],
                  [
                    "",
                    "warning",
                    "String",
                    "Info text, e.g. Only return to mobility hubs with cargo bike racks allowed! May contain line breaks. But should not contain HTML",
                  ],
                ],
              },
            ],
            examples: [
              {
                title: "Ejemplo de respuesta",
                content:
                  '<?xml version="1.0" encoding="utf-8"?>\n<nextbike version="1.0" server_time="1234567890">\n  <bikeType uid="4" biketype_group="1" formfactor_code="Co" parent_biketype_id="0" name="Comfort" description="- Tiefer Einstieg- Shimano 3-Gang oder 7-Gang-Nabenschaltung- Nabendynamo- Korbausstattung"/>\n  <bikeType uid="5" biketype_group="2" formfactor_code="Cl" parent_biketype_id="0" name="Classic" description="- Shimano 3-Gang oder 7-Gang-Nabenschaltung- Nabendynamo- Korbausstattung- besonders bequem f&#xFC;r gro&#xDF;e Menschen"/>\n  <bikeType uid="14" biketype_group="1" formfactor_code="Co" parent_biketype_id="0" name="Comfort 2" description="- Tiefer Einstieg- Shimano 3-Gang oder 7-Gang-Nabenschaltung- Nabendynamo- Korbausstattung- verst&#xE4;rktes Sattelrohr- verst&#xE4;rkter Vorbau"/>\n  <bikeType uid="15" biketype_group="1" formfactor_code="Co" parent_biketype_id="0" name="SmartBike 1.0" description="- Tiefer Einstieg- Shimano 3-Gang oder 7-Gang-Nabenschaltung- Nabendynamo- Korbausstattung- verst&#xE4;rktes Sattelrohr- verst&#xE4;rkter Vorbau- mit Boardcomputer"/>\n</nextbike>',
              },
            ],
            schemas: [],
          },
          {
            id: "getFlexzones",
            name: "getFlexzones",
            title: "Get Flexzones",
            description:
              "returns flexzone polygon geometries and properties (of a given domain) as GeoJSON and an corresponding hash or HTTP `304` (if `show_errors` is enabled) consumers should save the hash and use it as parameter for the next request if the flexzones did not change and the given hash reflects the latest version, the response will be HTTP `304 Not Modified` - please note that this requires enabled error codes (e.g. HTTP `GET` `show_errors=1`, see further below) otherwise the complete dataset will be returned",
            route: "https://api.nextbike.net/api/getFlexzones.xml",
            tables: [
              {
                title: "Valores y códigos documentados",
                headers: ["Category", "Description"],
                rows: [
                  ["free_return", "Vehicles can be returned for free"],
                  [
                    "force_free_return",
                    "Vehicles can be returned for free (overrides all other zones in the area)",
                  ],
                  [
                    "chargeable_return",
                    "Return in the zone gets charged with a service fee",
                  ],
                  [
                    "force_chargeable_return",
                    "Return in the zone gets charged with a service fee (overrides all other zones in the area)",
                  ],
                  [
                    "active_ebike_zone",
                    "eBikes, pedelecs, scooters, eCargos (etc.) are active in this area, outside the motor support will be disabled",
                  ],
                  [
                    "slow_go_zone",
                    "Areas where the speed of electric vehicles gets limited",
                  ],
                  [
                    "service_zone",
                    "Internal service zone for rebalancing and operational pick-up/drop-off tasks",
                  ],
                  [
                    "business_area",
                    "The operating area where the service is provided and vehicles can be used",
                  ],
                ],
              },
            ],
            examples: [],
            schemas: [
              {
                title: "Esquema de entrada",
                content: "@../types/getFlexzones-input.json",
              },
              {
                title: "Esquema de salida",
                content: "@../types/getFlexzones-output.json",
              },
            ],
          },
          {
            id: "getLocation",
            name: "getLocation",
            title: "Get closest location",
            description:
              "Find closest station for given IP or GeoData Response siehe Maps API",
            route:
              "https://api.nextbike.net/api/getLocation.xml?apikey=XXXXXXXXXXXXX&ip=82.23.123.23&lat=52.323&lng=43.212",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  [
                    "apikey",
                    "String",
                    "API-Schlüssel der Anwendung",
                    "Pflicht",
                  ],
                  [
                    "version",
                    "float",
                    "API-Version",
                    "optional (default Neuste)",
                  ],
                  ["ip", "String", "IP address", "optional"],
                  ["lat", "Float", "Latiude", "optional"],
                  ["lng", "Float", "Longitude", "optional"],
                ],
              },
            ],
            examples: [
              {
                title: "Ejemplo de respuesta",
                content:
                  '<nextbike version="1.0">\n  <country lat="51.3412" lng="12.3654" zoom="5" name="Germany" hotline="+493069205046" domain="de">\n    <city uid="1" lat="51.3402" lng="12.3722" zoom="14" name="Leipzig">\n      <place uid="125" lat="51.3396707275931" lng="12.3732796311378" name="Thomaskirchhof" spot="1" bikes="0"/>\n    </city>\n  </country>\n</nextbike>',
              },
            ],
            schemas: [],
          },
          {
            id: "getWorkshops",
            name: "getWorkshops",
            title: "getWorkshops",
            description: "getWorkshops",
            route: "https://api.nextbike.net/api/getWorkshops.xml",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  ["apikey", "String", "Your API key", "Required"],
                  [
                    "version",
                    "float",
                    "API version",
                    "optional (default latest)",
                  ],
                  [
                    "loginkey",
                    "String",
                    "Login token of the customer",
                    "Required",
                  ],
                  ["brand_id", "Int", "Id of the brand", "Optional"],
                ],
              },
            ],
            examples: [],
            schemas: [],
          },
          {
            id: "openHelmetBox",
            name: "openHelmetBox",
            title: "Open the helmet box of a vehicle",
            description: "Open the helmet box of a vehicle",
            route: "https://api.nextbike.net/api/openLock.json",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  [
                    "version",
                    "Float",
                    "API version",
                    "Optional (default latest)",
                  ],
                  [
                    "apikey",
                    "String",
                    "API-key of your application",
                    "Required",
                  ],
                  ["loginkey", "String", "Login token of the user", "Required"],
                  ["rental", "Int", "ID of the rental", "required, or bike"],
                  [
                    "bike",
                    "Int",
                    "bike number (00000-99999)",
                    "required, or rental",
                  ],
                ],
              },
            ],
            examples: [],
            schemas: [],
          },
          {
            id: "openLock",
            name: "openLock",
            title: "Open a bike lock",
            description: "Open a bike lock",
            route: "https://api.nextbike.net/api/openLock.json",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  [
                    "version",
                    "Float",
                    "API version",
                    "Optional (default latest)",
                  ],
                  [
                    "apikey",
                    "String",
                    "API-key of your application",
                    "Required",
                  ],
                  ["loginkey", "String", "Login token of the user", "Required"],
                  ["rental", "Int", "ID of the rental", "required, or bike"],
                  [
                    "bike",
                    "Int",
                    "bike number (00000-99999)",
                    "required, or rental",
                  ],
                  [
                    "just_open",
                    "Bool",
                    "if set to 1 only open lock and don't execute other (pedelec-specific) steps",
                  ],
                ],
              },
            ],
            examples: [],
            schemas: [],
          },
          {
            id: "rentMultipleBikes",
            name: "rentMultipleBikes",
            title: "Rental",
            description: "Rental",
            route:
              "https://api.nextbike.net/api/rent.xml?apikey=XXXXXXXXXXXXX&loginkey=XXXXXXXXXXXX&number_of_bikes=3&place=142871",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  [
                    "apikey",
                    "String",
                    "API-key of your application",
                    "required",
                  ],
                  [
                    "version",
                    "float",
                    "API-version",
                    "optional (default latest)",
                  ],
                  [
                    "loginkey",
                    "String",
                    "Login-Token of the customer",
                    "required",
                  ],
                  [
                    "place",
                    "Int",
                    "ID of the start place for rental",
                    "optional*²",
                  ],
                  [
                    "station",
                    "String",
                    "Station number of the start place for rental",
                    "optional*²",
                  ],
                  ["rfid", "Int", "Rfid Uid", "optional"],
                  [
                    "number_of_bikes",
                    "Int",
                    "Number of bikes to rent",
                    "optional*³",
                  ],
                  [
                    "bike_numbers",
                    "String",
                    "List with comma seperated bike numbers",
                    "optional*³",
                  ],
                  [
                    "callback_rent",
                    "String",
                    'Callback URL for bike rental (hostname of Callback URL has to be whitelisted in brand config, e.g. "website" host in maps XML, callback will be sent as HTTP POST)',
                    "optional",
                  ],
                  [
                    "callback_return",
                    "String",
                    "Callback URL for bike return",
                    "optional",
                  ],
                ],
              },
            ],
            examples: [
              {
                title: "Ejemplo de respuesta",
                content:
                  '<nextbike version="1.0" server_time="1493197695">\n    <rentals>\n        <rental id="12345678" show_close_lock_info="0" invalid="0" return_via_app="1" city_id="1" city="Leipzig" domain="de" bike="12345" biketype="4" code="3210" start_place="888844" start_place_lat="51.0" start_place_lng="12.0" start_place_name="Mussterstr. / Musterkreuzstr." end_place="0" end_place_lat="0" end_place_lng="0" end_place_name="" start_time="1493197694" end_time="0" price="100" price_service="0" />\n        <rental id="12345679" show_close_lock_info="0" invalid="0" return_via_app="1" city_id="1" city="Leipzig" domain="de" bike="12346" biketype="5" code="1023" start_place="888844" start_place_lat="51.0" start_place_lng="12.0" start_place_name="Mussterstr. / Musterkreuzstr." end_place="0" end_place_lat="0" end_place_lng="0" end_place_name="" start_time="1493197695" end_time="0" price="100" price_service="0" />\n    </rentals>\n</nextbike>',
              },
            ],
            schemas: [],
          },
          {
            id: "triggerBikeAlarm",
            name: "triggerBikeAlarm",
            title: "triggerBikeAlarm",
            description: "triggerBikeAlarm",
            route: "https://api.nextbike.net/api/triggerBikeAlarm.xml",
            tables: [],
            examples: [],
            schemas: [],
          },
        ],
      },
      {
        departmentId: "moxsi",
        name: "Alquileres y reservas",
        scope: "12 operaciones documentadas",
        endpoints: [
          {
            id: "activeBookings",
            name: "activeBookings",
            title: "Reservation - Ask for running bookings",
            description:
              "Get all bookings information of bookings of a user that got started within the last seven days",
            route:
              "https://api.nextbike.net/api/activeBookings.xml?apikey=XXXXXXXXXXXXX&loginkey=XXXXXXXXXXXX",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  ["apikey", "String", "Your API key", "Required"],
                  [
                    "version",
                    "Float",
                    "API version",
                    "optional (default latest)",
                  ],
                  [
                    "loginkey",
                    "String",
                    "Login token of the customer",
                    "Required",
                  ],
                ],
              },
              {
                title: "Valores y códigos documentados",
                headers: ["Node", "Response-Parameter", "Type", "Description"],
                rows: [
                  ["booking", "id", "Int", "UID of a active Reservation"],
                  [
                    "",
                    "bike_types",
                    "String (JSON)",
                    "Types of the reserved bikes",
                  ],
                  [
                    "",
                    "biketypes",
                    "String (JSON)",
                    "Types of the reserved bikes - deprecated, will be removed in the future, use bike_types instead",
                  ],
                  [
                    "",
                    "place_id",
                    "Int",
                    "UID of the Place for the Reservation",
                  ],
                  [
                    "",
                    "place_name",
                    "string",
                    "human readable name of the Place for the Reservation",
                  ],
                  [
                    "",
                    "lat",
                    "Float",
                    "Latitude of the Place for the Reservation",
                  ],
                  [
                    "",
                    "lng",
                    "Float",
                    "Longitude of the Place for the Reservation",
                  ],
                  [
                    "",
                    "spot",
                    "Boolean",
                    "if the reservation is at an officical stage",
                  ],
                  [
                    "",
                    "start_time",
                    "Int",
                    "Unixtime of the desired start time for rental (can also be the time difference from now until start of the booking in seconds, if lower than 160000000)",
                  ],
                  [
                    "",
                    "end_time",
                    "Int",
                    "Unixtime of the desired end time for rental (only relevant for UsedomRad)",
                  ],
                  ["", "num_bikes", "Int", "Number of booked bikes"],
                  ["", "booked", "Int", "Number of booked bikes"],
                  ["", "state_id", "Int", "state ID of the Reservation"],
                  [
                    "",
                    "state",
                    "String",
                    "human readable state of the Reservation",
                  ],
                  [
                    "",
                    "max_bookingtime_before_rental",
                    "Int",
                    "mininum count of minutes which has to pass between booking and rental begin",
                  ],
                  ["", "cust_id", "Int", "User ID"],
                  [
                    "",
                    "booking_code",
                    "?",
                    "the booking code which is to be entered on fetching the bike",
                  ],
                  ["", "price", "Int", "Price in cents that was charged"],
                  ["", "price_service", "Service charge in cents"],
                  [
                    "",
                    "confirm",
                    "Boolean",
                    "if the booking was confirmed by the system",
                  ],
                  [
                    "",
                    "used_free_seconds",
                    'amount of free seconds that were used to "pay"',
                  ],
                  [
                    "",
                    "bike_blocking_time_seconds",
                    "amount of seconds of bike blocking time",
                  ],
                  [
                    "",
                    "max_bookingtime_before_rental_in_s",
                    "same as max_bookingtime_before_rental but in seconds instead minutes",
                  ],
                  [
                    "",
                    "domain",
                    "String",
                    "short code of the nextbike brand of the place",
                  ],
                  [
                    "",
                    "station_number",
                    "String",
                    "Station number of the start place",
                  ],
                ],
              },
            ],
            examples: [
              {
                title: "Ejemplo de respuesta",
                content:
                  '<nextbike version="1.0">\n  <booking id="12345" place="123" start_time="123456789" num_bikes="2" state="1" />\n  <booking id="12381" place="321" start_time="123459789" num_bikes="1" state="2"/>\n</nextbike>',
              },
            ],
            schemas: [],
          },
          {
            id: "booking",
            name: "booking",
            title: "Reservation - Booking",
            description:
              "Book a defined numbers of bikes on a defined place Please consider the brand specific conditions",
            route:
              "https://api.nextbike.net/api/booking.xml?apikey=XXXXXXXXXXXXX&loginkey=XXXXXXXXXXXX&start_time=1421780107&end_time=1422482068&num_bikes=2&place=123&biketypes={4:3,5:1}",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  ["apikey", "String", "Your API key", "Required"],
                  [
                    "version",
                    "Float",
                    "API version",
                    "optional (default latest)",
                  ],
                  [
                    "loginkey",
                    "String",
                    "Login token of the customer, to check customer-specific availability (e.g. bike limits)",
                    "Required",
                  ],
                  [
                    "num_bikes",
                    "Int",
                    "Total number of bikes",
                    "Required, or biketypes",
                  ],
                  ["place", "Int", "id of the desired place", "Required"],
                  [
                    "bike",
                    "String",
                    "Bike name to reserve immediately for the configured city booking period at an official station or individual bike place; requires booking_specific_bike_enabled. Booking at an individual bike place also requires booking_at_unofficial for the city. Scheduling and manual fallback options are ignored.",
                    "Optional",
                  ],
                  [
                    "start_time",
                    "Int",
                    "Time of the desired rentals",
                    "Required",
                  ],
                  ["end_time", "Int", "Time of the desired return", "optional"],
                  [
                    "biketypes",
                    "Int",
                    'Number of bikes per biketype. JSON, eg: {"3":1,"5":2} (1 bike type of 3 + 2 bikes of type 5)',
                    "Optional, or num_bikes",
                  ],
                  [
                    "accept_manual",
                    "Int",
                    "Set to 1, if you accept creation of manual bookings (availability is not automatically guaranteed but requires intervention from customer support)",
                    "optional",
                  ],
                  [
                    "callback_{event}",
                    "String",
                    'Callback URL for booking, will be copied to rental, once connected - see "Callback events"',
                    "optional",
                  ],
                ],
              },
              {
                title: "Valores y códigos documentados",
                headers: ["Callback event", "Description"],
                rows: [
                  [
                    "connect",
                    "booking has been connected to a new rental, happens for every rental for this booking (4 bikes booked -> 4 rentals connected)",
                  ],
                ],
              },
              {
                title: "Valores y códigos documentados",
                headers: ["Node", "Response-Parameter", "Type", "Description"],
                rows: [
                  ["booking", "id", "Int", "UID of a active Reservation"],
                  [
                    "",
                    "bike_types",
                    "String (JSON)",
                    "Types of the reserved bikes",
                  ],
                  [
                    "",
                    "biketypes",
                    "String (JSON)",
                    "Types of the reserved bikes - deprecated, will be removed in the future, use bike_types instead",
                  ],
                  [
                    "",
                    "place_id",
                    "Int",
                    "UID of the Place for the Reservation",
                  ],
                  [
                    "",
                    "station_id",
                    "Int",
                    "Original station for a specific-bike reservation at a station (create response only)",
                  ],
                  [
                    "",
                    "bike",
                    "String",
                    "Number of the selected bike for a specific-bike reservation",
                  ],
                  [
                    "",
                    "place_name",
                    "string",
                    "human readable name of the Place for the Reservation",
                  ],
                  [
                    "",
                    "lat",
                    "Float",
                    "Latitude of the Place for the Reservation",
                  ],
                  [
                    "",
                    "lng",
                    "Float",
                    "Longitude of the Place for the Reservation",
                  ],
                  [
                    "",
                    "spot",
                    "Boolean",
                    "if the reservation is at an official stage",
                  ],
                  [
                    "",
                    "start_time",
                    "Int",
                    "Unixtime of the desired start time for rental (can also be the time difference from now until start of the booking in seconds, if lower than 160000000)",
                  ],
                  [
                    "",
                    "end_time",
                    "Int",
                    "Unixtime of the desired end time for rental (only relevant for UsedomRad)",
                  ],
                  ["", "num_bikes", "Int", "Number of booked bikes"],
                  ["", "booked", "Int", "Number of booked bikes"],
                  ["", "state_id", "Int", "state ID of the Reservation"],
                  [
                    "",
                    "state",
                    "String",
                    "human readable state of the Reservation",
                  ],
                  [
                    "",
                    "max_bookingtime_before_rental",
                    "Int",
                    "minimum count of minutes which has to pass between booking and rental begin",
                  ],
                  ["", "cust_id", "Int", "User ID"],
                  [
                    "",
                    "booking_code",
                    "?",
                    "the booking code which is to be entered on fetching the bike",
                  ],
                  ["", "price", "Int", "Price in cents that was charged"],
                  ["", "price_service", "Service charge in cents"],
                  [
                    "",
                    "confirm",
                    "Boolean",
                    "if the booking was confirmed by the system",
                  ],
                  [
                    "",
                    "used_free_seconds",
                    'amount of free seconds that were used to "pay"',
                  ],
                  [
                    "",
                    "bike_blocking_time_seconds",
                    "amount of seconds of bike blocking time",
                  ],
                  [
                    "",
                    "max_bookingtime_before_rental_in_s",
                    "same as max_bookingtime_before_rental but in seconds instead minutes",
                  ],
                  [
                    "",
                    "domain",
                    "String",
                    "short code of the nextbike brand of the place",
                  ],
                  [
                    "",
                    "station_number",
                    "String",
                    "Station number of the start place",
                  ],
                ],
              },
            ],
            examples: [
              {
                title: "Ejemplo de respuesta",
                content:
                  '<nextbike version="1.0">\n  <booking id="12345" place_id="123" place_name="Nameless Street" booked="2" confirm="1" />\n</nextbike>',
              },
            ],
            schemas: [],
          },
          {
            id: "bookingCost",
            name: "bookingCost",
            title: "Reservation - bookingCosts",
            description:
              "return price information for a defined place in the three scenarios, that either the customer (1) cancels the booking using the API or (2) actually rents a bike at the place the booking was made or (3) lets the booking expire without renting or cancelling a bike",
            route:
              "https://api.nextbike.net/api/v1.1/bookingCost.json?apikey=XXXXXXXXXXXXX&loginkey=XXXXXXXXXXXX&place=123&bike_types=%7B%2271%22%3A%202%7D",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  ["apikey", "String", "Your API key", "Required"],
                  [
                    "version",
                    "Float",
                    "API version",
                    "optional (default latest)",
                  ],
                  [
                    "loginkey",
                    "String",
                    "Login token of the customer, to check customer-specifics like currency and free seconds",
                    "Required",
                  ],
                  [
                    "place",
                    "Int",
                    "Id of the place the booking shall be made for",
                    "Required (or city)",
                  ],
                  [
                    "city",
                    "Int",
                    "Id of the city the booking shall be made for",
                    "Required (or place)",
                  ],
                  [
                    "start_time",
                    "Int",
                    "UNIX timestamp of the desired rentals",
                    "optional (now)",
                  ],
                  [
                    "end_time",
                    "Int",
                    "UNIX timestamp of the end of booking (start of rental, should be < max_bookingtime_before_rental)",
                    "optional (max_bookingtime_before_rental is used otherwise. (max_bookingtime_before_rental: a parameter set in city settings; it defines the time in minutes before the customer will start the rental, respectively before the booking appointment.)",
                  ],
                  [
                    "num_bikes",
                    "Int",
                    "number of bikes to be booked",
                    "optional (one)",
                  ],
                  [
                    "biketypes",
                    "Int",
                    'Number of bikes per biketype. JSON, eg: {"3":1,"5":2} (1 bike type of 3 + 2 bikes of type 5)',
                    "Optional, or num_bikes",
                  ],
                ],
              },
              {
                title: "Valores y códigos documentados",
                headers: ["Node", "Response-Parameter", "Type", "Description"],
                rows: [
                  [
                    "bookings_enabled",
                    "Bool",
                    "whether bookings are enabled for this city",
                  ],
                  [
                    "booking_specific_bike_enabled",
                    "Bool",
                    "whether booking a specific bike at station is enabled",
                  ],
                  ["booking_costs"],
                  [
                    "",
                    "currency",
                    "String",
                    "currency of the customer and of the maximum_price's within the response",
                  ],
                  [
                    "",
                    "booking_maximum_duration_seconds",
                    "Int",
                    "the maximum amount of time a booked bike is blocked/that will be charged, see bike_blocking_time_seconds",
                  ],
                  [
                    "",
                    "amount_of_bikes",
                    "Int",
                    "amount of bikes (specified either by using num_bikes or biketypes parameter)",
                  ],
                  [
                    "",
                    "prices_are_exchanged",
                    "Bool",
                    "whether the stated prices had to be converted into the currency of the customer -> if true, prices may slightly vary for actual bookings because of exchange rate variations",
                  ],
                  [
                    "",
                    "customer_has_free_seconds",
                    "Bool",
                    "whether the customer (currently) has _any_ free seconds. If she/he has free seconds, they will usually be used first, and the resulting price will be lower",
                  ],
                  [
                    "",
                    "pricing_url",
                    "String",
                    "Nulls",
                    "URL to the website of the city / domain containing more information about pricing",
                  ],
                  ["", "prices_per_bike", "Node", ""],
                ],
              },
              {
                title: "Valores y códigos documentados",
                headers: ["Node", "Response-Parameter", "Type", "Description"],
                rows: [
                  ["prices_per_bike"],
                  [
                    "",
                    "cancels_booking",
                    "Node",
                    "Information about the (maximally charged) costs if the customer cancels the booking using cancelBooking API before it expires",
                  ],
                  [
                    "",
                    "rents_bike",
                    "Node",
                    "Information about the (maximally charged) costs if the customer will rent a bike of the booking",
                  ],
                  [
                    "",
                    "booking_expires",
                    "Node",
                    "Information about the costs if the customer lets the booking expire without renting a bike",
                  ],
                ],
              },
              {
                title: "Valores y códigos documentados",
                headers: ["Node", "Response-Parameter", "Type", "Description"],
                rows: [
                  ["cancels_booking"],
                  [
                    "",
                    "maximum_price",
                    "Int",
                    'maximum price (amount in 1/100 of customer currency) if the booking is cancelled by the customer - the effective price may vary depending on "price_varies" and the amount of used free seconds',
                  ],
                  [
                    "",
                    "price_varies",
                    "Bool",
                    "whether the price depends on the amount of time that is between start and cancellation of the booking (e.g. 0.15 EUR per minute)",
                  ],
                  [
                    "",
                    "maximum_free_seconds_charged",
                    "Int",
                    'How many free seconds of the customer are used maximally - the effective amount may vary depending on "price_varies" (irrelevant if the the customer has none)',
                  ],
                  [
                    "",
                    "minutes_free_of_charge",
                    "Int",
                    "Is set if a certain amount of time is never charged, e.g. the booking is free if it gets cancelled within the first 5 minutes",
                  ],
                ],
              },
              {
                title: "Valores y códigos documentados",
                headers: ["Node", "Response-Parameter", "Type", "Description"],
                rows: [
                  ["rents_bike"],
                  [
                    "",
                    "maximum_price",
                    "Int",
                    'maximum price (amount in 1/100 of customer currency) if an actual rental of a reserved bike is started - the effective price may vary depending on "price_varies" and the amount of used free seconds',
                  ],
                  [
                    "",
                    "price_varies",
                    "Bool",
                    "whether the price depends on the amount of time that is between start of the booking and start of the rental (e.g. 0.15 EUR per minute)",
                  ],
                  [
                    "",
                    "maximum_free_seconds_charged",
                    "Int",
                    'How many free seconds of the customer are used maximally - the effective amount may vary depending on "price_varies" (irrelevant if the the customer has none)',
                  ],
                  [
                    "",
                    "minutes_free_of_charge",
                    "Int",
                    "Is set if a certain amount of time is never charged, e.g. the booking is free if a bike gets rented within the first 5 minutes",
                  ],
                ],
              },
              {
                title: "Valores y códigos documentados",
                headers: ["Node", "Response-Parameter", "Type", "Description"],
                rows: [
                  ["booking_expires"],
                  [
                    "",
                    "maximum_price",
                    "Int",
                    "price (amount in 1/100 of customer currency) if the booking is expiring - the effective price may vary depending on the number of used free seconds",
                  ],
                  [
                    "",
                    "maximum_free_seconds_charged",
                    "Int",
                    "How many free seconds of the customer are used maximally (irrelevant if the customer has none)",
                  ],
                ],
              },
            ],
            examples: [
              {
                title: "Ejemplo de respuesta",
                content:
                  '<?xml version="1.0" encoding="utf-8"?>\n<nextbike version="1.0" server_time="1234567890">\n  <item bookings_enabled="1" booking_specific_bike_enabled="0">\n    <booking_costs currency="EUR" booking_maximum_duration_seconds="900" amount_of_bikes="1" prices_are_exchanged="0" customer_has_free_seconds="0" pricing_url="https://www.nextbike.de/de/leipzig/preise/">\n      <prices_per_bike>\n        <cancels_booking maximum_price="0" price_varies="0" maximum_free_seconds_charged="0" minutes_free_of_charge="0"/>\n        <rents_bike maximum_price="0" price_varies="0" maximum_free_seconds_charged="0" minutes_free_of_charge="0"/>\n        <booking_expires maximum_price="0" maximum_free_seconds_charged="0"/>\n      </prices_per_bike>\n    </booking_costs>\n  </item>\n</nextbike>',
              },
              {
                title: "Ejemplo de respuesta",
                content:
                  '<?xml version="1.0" encoding="utf-8"?>\n<nextbike version="1.0" server_time="1234567890">\n  <item bookings_enabled="1" booking_specific_bike_enabled="0">\n    <booking_costs currency="MXN" booking_maximum_duration_seconds="600" amount_of_bikes="1" prices_are_exchanged="0" customer_has_free_seconds="1" pricing_url="https://www.nextbike.de/de/leipzig/preise/">\n      <prices_per_bike>\n        <cancels_booking maximum_price="1200" price_varies="1" maximum_free_seconds_charged="600" minutes_free_of_charge="0"/>\n        <rents_bike maximum_price="1200" price_varies="1" maximum_free_seconds_charged="600" minutes_free_of_charge="0"/>\n        <booking_expires maximum_price="1200" maximum_free_seconds_charged="600"/>\n      </prices_per_bike>\n    </booking_costs>\n  </item>\n</nextbike>',
              },
              {
                title: "Ejemplo de respuesta",
                content:
                  '<?xml version="1.0" encoding="utf-8"?>\n<nextbike version="1.0" server_time="1234567890">\n  <item bookings_enabled="1" booking_specific_bike_enabled="0">\n    <booking_costs currency="PLN" booking_maximum_duration_seconds="900" amount_of_bikes="1" prices_are_exchanged="0" customer_has_free_seconds="0" pricing_url="https://www.nextbike.de/de/leipzig/preise/">\n      <prices_per_bike>\n        <cancels_booking maximum_price="50" price_varies="1" maximum_free_seconds_charged="600" minutes_free_of_charge="5"/>\n        <rents_bike maximum_price="50" price_varies="1" maximum_free_seconds_charged="600" minutes_free_of_charge="5"/>\n        <booking_expires maximum_price="50" maximum_free_seconds_charged="600"/>\n      </prices_per_bike>\n    </booking_costs>\n  </item>\n</nextbike>',
              },
              {
                title: "Ejemplo de respuesta",
                content:
                  '<?xml version="1.0" encoding="utf-8"?>\n<nextbike version="1.0" server_time="1234567890">\n  <item bookings_enabled="1" booking_specific_bike_enabled="0">\n    <booking_costs currency="EUR" booking_maximum_duration_seconds="600" amount_of_bikes="1" prices_are_exchanged="0" customer_has_free_seconds="0" pricing_url="https://www.nextbike.de/de/leipzig/preise/">\n      <prices_per_bike>\n        <cancels_booking maximum_price="0" price_varies="0" maximum_free_seconds_charged="0" minutes_free_of_charge="0"/>\n        <rents_bike maximum_price="0" price_varies="0" maximum_free_seconds_charged="0" minutes_free_of_charge="0"/>\n        <booking_expires maximum_price="500" maximum_free_seconds_charged="600"/>\n      </prices_per_bike>\n    </booking_costs>\n  </item>\n</nextbike>',
              },
            ],
            schemas: [],
          },
          {
            id: "bookingInfo",
            name: "bookingInfo",
            title:
              "Reservation - Check available bike types at a certain place for a customer",
            description:
              "Get the available bike types and relevant settings for reservation of bikes at the given place for a certain customer",
            route:
              "https://api.nextbike.net/api/bookingInfo.xml?apikey=XXXXXXXXXXXXX&loginkey=XXXXXXXXXXXX&place=4660971",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  ["apikey", "String", "Your API key", "Required"],
                  [
                    "place",
                    "Int",
                    "id of the place where bikes should be booked",
                    "Required",
                  ],
                  [
                    "loginkey",
                    "String",
                    "Login token of the customer, to check customer-specific availability (e.g. bike limits)",
                    "Required",
                  ],
                ],
              },
              {
                title: "Valores y códigos documentados",
                headers: ["Node", "Response-Parameter", "Type", "Description"],
                rows: [
                  ["place", "id", "Int", "Id of the requested place"],
                  ["", "name", "String", "Name of the place"],
                  ["", "number", "Int", "Station Number of the place"],
                  [
                    "",
                    "domain",
                    "String",
                    "short code of the nextbike brand of the place",
                  ],
                  ["", "city_id", "Int", "Id of the city of the of the place"],
                  ["", "city_name", "String", "Name of the city of the place"],
                  [
                    "",
                    "available",
                    "Int",
                    "Amount of bikes that the customer can book at the given place. It depends on the place AND the customer",
                  ],
                  [
                    "",
                    "max_booking_time_before_rental_seconds",
                    "Int",
                    "Time in seconds that a booking can be made in advance",
                  ],
                  [
                    "",
                    "bike_blocking_time_seconds",
                    "Int",
                    'Time in seconds until the booking expires and the bike will be available to other customers again"',
                  ],
                  [
                    "",
                    "free_of_charge",
                    "Bool",
                    "Whether bookings at the place are free of charge in general. If false, bookingCost API should be called to get a detailed overview of fees that could occur.",
                  ],
                  ["bike_types", "id", "Int", "Id of the bike type"],
                  ["", "name", "String", "Name of the bike type"],
                  [
                    "",
                    "group_id",
                    "Int",
                    "Id of the bike type group of the bike type",
                  ],
                  [
                    "",
                    "available",
                    "Int",
                    "Amount of the bikes of that type that can be reserved",
                  ],
                ],
              },
            ],
            examples: [
              {
                title: "Ejemplo de respuesta",
                content:
                  '<?xml version="1.0" encoding="utf-8"?>\n<nextbike version="1.0" server_time="1234567890">\n  <place id="4660971" name="Karl-Heine-Str. 46/nextbike HQ" number="4051" domain="le" available="4" city_name="Leipzig" city_id="1" max_booking_time_before_rental_seconds="4200" bike_blocking_time_seconds="900">\n    <bike_types>\n      <item id="71" name="ECObike (A) 2018" group_id="1" available="12"/>\n    </bike_types>\n  </place>\n</nextbike>',
              },
            ],
            schemas: [],
          },
          {
            id: "cancelBooking",
            name: "cancelBooking",
            title: "Reservation - Cancel a booking",
            description: "Cancel a running booking",
            route:
              "https://api.nextbike.net/api/cancelBooking.xml?apikey=XXXXXXXXXXXXX&loginkey=XXXXXXXXXXXX&booking_id=123",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  ["apikey", "String", "Your API key", "Required"],
                  [
                    "version",
                    "Float",
                    "API version",
                    "optional (default latest)",
                  ],
                  [
                    "loginkey",
                    "String",
                    "Login token of the customer",
                    "Required",
                  ],
                  ["booking_id", "Int", "Reservation UID", "Required"],
                ],
              },
              {
                title: "Valores y códigos documentados",
                headers: ["Node", "Response-Parameter", "Type", "Description"],
                rows: [
                  ["booking", "id", "Int", "Reservation UID"],
                  [
                    "",
                    "canceled",
                    "Boolean",
                    "confirmation that the reservation has successfully been canceled",
                  ],
                ],
              },
            ],
            examples: [
              {
                title: "Ejemplo de respuesta",
                content:
                  '<nextbike version="1.0">\n  <booking id="12345" canceled="1" />\n</nextbike>',
              },
            ],
            schemas: [],
          },
          {
            id: "getRentalDetails",
            name: "getRentalDetails",
            title: "Return",
            description: "Return",
            route:
              "https://api.nextbike.net/api/getRentalDetails.xml?apikey=XXXXXXXXXXXXX&loginkey=XXXXXXXXXXXX&rental=123456",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  [
                    "apikey",
                    "String",
                    "API-key of your application",
                    "required",
                  ],
                  [
                    "version",
                    "float",
                    "API-version",
                    "optional (default latest)",
                  ],
                  [
                    "loginkey",
                    "String",
                    "Login-Token of the customer",
                    "required",
                  ],
                  ["rental", "Int", "ID of the rental", "required"],
                ],
              },
              {
                title: "Valores y códigos documentados",
                headers: ["PlacetypeId", "Meaning"],
                rows: [
                  ["0", "STANDARD_PLACE"],
                  ["1", "MISSED_BIKES"],
                  ["2", "STOLEN_BIKES"],
                  ["3", "NEXTBIKE_STORAGE"],
                  ["4", "NEXTBIKE_FACTORY"],
                  ["5", "NEXTBIKE_OFFICE"],
                  ["6", "STATION_WITH_EMPLOYEE"],
                  ["7", "HOTEL"],
                  ["8", "TOURIST_INFORMATION"],
                  ["9", "COMPANY"],
                  ["10", "SHOP"],
                  ["11", "MISSED_BIKES_ARCHIVE"],
                  ["12", "INDIVIDUAL_BIKE"],
                  ["13", "SERVICE_CAR"],
                  ["14", "E_BIKE_STATION"],
                  ["15", "KIDS_BIKE_STATION"],
                  ["16", "STATION_WITH_FURNITURE"],
                  ["17", "VIRTUAL_STATION"],
                  ["18", "MOBILITY_HUB"],
                  ["19", "VIRTUAL_STATION_WITH_ROAD_MARKING"],
                  ["20", "INDIVIDUAL_E_BIKE"],
                  ["21", "CARGO_BIKE_STATION"],
                  ["22", "INDIVIDUAL_CARGO_BIKE"],
                  ["23", "E_CARGO_BIKE_STATION"],
                  ["24", "INDIVIDUAL_E_CARGO_BIKE"],
                  ["25", "PLACE_WITH_SPECIAL_OFFER"],
                  ["26", "NEXTBIKE_WORKSHOP_E_BIKE_CHARGING"],
                  ["27", "STATION_WITH_DISCOUNT"],
                  ["28", "STATION_WITH_ELECTRIC_INSERTION_LOCK"],
                  ["29", "SCRAPPED_BIKES"],
                  ["30", "INDIVIDUAL_SCOOTER"],
                  ["31", "INDIVIDUAL_MOPED"],
                  ["32", "ESCOOTER_STATION"],
                  ["33", "E_BIKE_STATION_WITH_DISCOUNT"],
                ],
              },
            ],
            examples: [
              {
                title: "Ejemplo de respuesta",
                content:
                  '<?xml version="1.0" encoding="utf-8"?>\n<nextbike version="1.0" server_time="1234567890">\n  <rental id="111127648" show_close_lock_info="0" invalid="0" return_via_app="0" return_to_official_only="0" city_id="685" city="Dresden" domain="dx" bike="930875" boardcomputer="7551060121" customer_comment="" electric_lock="1" biketype="150" lock_types="frame_lock,dls" code="6151" start_place="40524016" start_place_lat="51.069124444444" start_place_lng="13.751143333333" start_place_name="BIKE 930875" start_place_type="12" start_rack="0" end_place="40537295" end_place_lat="51.070555555556" end_place_lng="13.753884444444" end_place_name="BIKE 930875" end_place_type="12" start_time="1609165076" end_time="1609165199" price="0" price_service="0" completed="1" rfid_uid="0" review_state="0" trip_type="0" app_campaign_uid="0" break="0" rating="0" used_free_seconds="0" distance="0" start_channel="264">\n    <transactions>\n      <item amount="-100" id="81293923" comment="Rental, original base price" category="baseprice_original" timestamp="1609165199"/>\n      <item id="81293924" amount="0" comment="Rental, original service fee" category="servicefee_original" timestamp="1609165199"/>\n      <item id="82345678" amount="100" comment="Decrease rental base price, because rental is invalid" category="baseprice_adjustment" timestamp="1612345678"/>\n    </transactions>\n    <invoices>\n      <item invoice_id="81293923" amount="100" type="invoice" timestamp="1609165199"/>\n      <item invoice_id="82345678" amount="-100" type="credit_note" timestamp="1612345678"/>\n    </invoices>\n  </rental>\n</nextbike>',
              },
            ],
            schemas: [],
          },
          {
            id: "getRentalPdf",
            name: "getRentalPdf",
            title:
              "Get a PDF of current overview, associated invoices and credit notes for a rental",
            description:
              'See invoice_id in invoices attribute of "getRentalDetails" (after receiving "complete" callback - or "completed" Flag is set) If rental is not yet "completed" it will always fall back to "overview_only"',
            route:
              "https://api.nextbike.net/api/getRentalPdf.xml?apikey=XXXXXXXXXXXXX&loginkey=XXXXXXXXXXXX&rental=123456",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  [
                    "apikey",
                    "String",
                    "API-key of your application",
                    "required",
                  ],
                  [
                    "version",
                    "float",
                    "API-version",
                    "optional (default latest)",
                  ],
                  [
                    "loginkey",
                    "String",
                    "Login-Token of the customer",
                    "required (or invoice_token)",
                  ],
                  [
                    "invoice_token",
                    "String",
                    "Temporary access token for this invoice",
                    "optional",
                  ],
                  ["rental", "Int", "ID of the rental", "required"],
                  [
                    "invoice_id",
                    "Int",
                    "ID of a specific invoice and credit note (default: combined PDF of all invoices and credit notes to date), ignored, if overview_only is set",
                    "optional",
                  ],
                  [
                    "overview_only",
                    "bool",
                    "Only return an overview (w/o invoice number) of all associated transactions to date",
                    "optional",
                  ],
                ],
              },
            ],
            examples: [],
            schemas: [],
          },
          {
            id: "rent",
            name: "rent",
            title: "Rental",
            description:
              "Callback events: These states represent a typical life cycle of a rental",
            route:
              "https://api.nextbike.net/api/rent.xml?apikey=XXXXXXXXXXXXX&loginkey=XXXXXXXXXXXX&bike=12345",
            tables: [
              {
                title: "Valores y códigos documentados",
                headers: ["Callback event", "Description"],
                rows: [
                  [
                    "rent",
                    'bike has been rented (though makes no sense, if you trigger "rent", but could be used for strictly event-based architectures or if a booking turns into a rental)',
                  ],
                  [
                    "unlock",
                    "the lock has been opened (only available for specific bike types)",
                  ],
                  [
                    "pause_start",
                    'the rental is in "pause" / "break" state, closing the lock will not return the bike',
                  ],
                  [
                    "lock",
                    "the lock has been closed (only available for specific bike types) - could be during pause or to return the bike",
                  ],
                  [
                    "pause_end",
                    "an active break has ended; if the rental is still running, the next closing of the lock will return the bike",
                  ],
                  [
                    "return",
                    "bike returned has been registered successfully, but price calculation may not be completed yet",
                  ],
                  [
                    "service_case",
                    'A "service case" has been triggered, e.g. additional fees for returning outside of flex zone, a free warning about this, a bonus for returning to an empty station',
                  ],
                  [
                    "complete",
                    "Our typical price calculations are completed, we received a good GPS position and applied all service fees, if required",
                  ],
                  [
                    "price",
                    "The price of the rental changed. This happen during return (if price > 0) or completed, but also if customer service invalidates a rental or adjusts its price later",
                  ],
                  [
                    "comment",
                    'The "comments for customer" changed, e.g. including infos from customer service or feedback regarding the rental',
                  ],
                  [
                    "resume",
                    'the same bike has been rented again by the same customer, without another customer renting it in between and it would be cheaper for the customer to have one continuous rental instead of two separate. (E.g. after service fee for return outside of flex zone has been applied and customer wants to bring it back to an official station). Rental ID remains the same, time between original return and resume will be converted into a rental pause / break. All paid fees will be credited to the customer account and a new price calculation will take place with next return. You may turn of resume by setting "no_resume" (though it could be resumed through another channel)',
                  ],
                  [
                    "overtime",
                    'The rental takes longer than typical rentals (feature is enabled for a few brands, "typical" rental duration set by brands). Can trigger multiple times (e.g. after 2, 12, 24, 36, 48 hours)',
                  ],
                  [
                    "distance",
                    "The distance of the rental has been calculated (happen 15mns after the bike has been returned)",
                  ],
                ],
              },
            ],
            examples: [],
            schemas: [
              {
                title: "Esquema de entrada",
                content: "@../types/rent-input.json",
              },
              {
                title: "Esquema de salida",
                content: "@../types/rent-output.json",
              },
            ],
          },
          {
            id: "rentalBreak",
            name: "rentalBreak",
            title: "Parking",
            description:
              'User can park the bike by making rentalBreak Start parking without parameter \'end\' Start example: https://api.nextbike.net/api/rentalBreak.xml?apikey=XXXXXXXXXXX&loginkey=XXXXXXXXXXX&rental=123456&lat=52.323001&lng=43.212223 Response includes the rental node with the attribute "break" If "break" is true, then the rental is in pause mode User have to close the lock manually (starts a return request) API cancels the return process because the rental is in break Starting a break sends pause_start before the lock is closed Closing the lock during a break sends lock and does not return the bike Opening the lock or ending the break sends pause_end Returning a bike during a break ends the break and sends pause_end and return End parking with parameter \'end\' End example: https://api.nextbike.net/api/rentalBreak.xml?apikey=XXXXXXXXXXX&loginkey=XXXXXXXXXXX&rental=123456&end=1 Response parameter "break" will be false If the customer already returned the bike, starting a new rentalBreak is the same like rent with start_paused=1&resume=1 (previous rental will be resumed and directly set to break mode)',
            route:
              "https://api.nextbike.net/api/rentalBreak.xml?apikey=XXXXXXXXXXXXX&loginkey=XXXXXXXXXXXX&rental=123456&lat=52.323001&lng=43.212223",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  [
                    "apikey",
                    "String",
                    "API-key of your application",
                    "required",
                  ],
                  [
                    "version",
                    "float",
                    "API-version",
                    "optional (default latest)",
                  ],
                  [
                    "loginkey",
                    "String",
                    "Login-Token of the customer",
                    "required",
                  ],
                  ["rental", "Int", "ID of the rental", "required"],
                  [
                    "end",
                    "Boolean",
                    "Flag to end the break",
                    "required to end the current break",
                  ],
                  ["lat", "Float", "Latitude by start", "optional"],
                  ["lng", "Float", "Longitude by start", "optional"],
                ],
              },
            ],
            examples: [
              {
                title: "Ejemplo de respuesta",
                content:
                  '{\n    "server_time": 1537880582,\n    "rental": {\n        "id": 59751851,\n        "show_close_lock_info": false,\n        "invalid": false,\n        [...]\n        "break": true,\n        "rating": 0\n    }\n}',
              },
            ],
            schemas: [],
          },
          {
            id: "rentals",
            name: "rentals",
            title: "Get Open and closed rentals",
            description: "Get Open and closed rentals",
            route:
              "https://api.nextbike.net/api/rentals.xml?apikey=XXXXXXXXXXXXX&loginkey=XXXXXXXXXXXX",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  [
                    "apikey",
                    "String",
                    "API-key of your application",
                    "required",
                  ],
                  [
                    "version",
                    "float",
                    "API-version",
                    "optional (default latest)",
                  ],
                  [
                    "loginkey",
                    "String",
                    "Login-Token of the customer",
                    "required",
                  ],
                  [
                    "limit",
                    "Int",
                    "length of the account list",
                    "optional (default 20) all open rentals are always shown",
                  ],
                  [
                    "offset",
                    "Int",
                    "start of the list",
                    "optional (default 0)",
                  ],
                ],
              },
            ],
            examples: [],
            schemas: [],
          },
          {
            id: "transfer",
            name: "transfer",
            title: "transfer",
            description: "transfer",
            route: "https://api.nextbike.net/api/transfer.xml",
            tables: [],
            examples: [],
            schemas: [],
          },
          {
            id: "updateRentalPrice",
            name: "updateRentalPrice",
            title: "updateRentalPrice",
            description: "updateRentalPrice",
            route: "https://api.nextbike.net/api/updateRentalPrice.xml",
            tables: [],
            examples: [],
            schemas: [],
          },
        ],
      },
      {
        departmentId: "moxsi",
        name: "Tarifas, beneficios y pagos",
        scope: "14 operaciones documentadas",
        endpoints: [
          {
            id: "activeBenefits",
            name: "activeBenefits",
            title:
              "Active Benefits - Display the active benefits of the customer",
            description:
              "Get the users active benefits (active and valid tickets and connected partners)",
            route:
              "https://api.nextbike.net/api/activeBenefits.xml?apikey=XXXXXXXXXXXXX&loginkey=XXXXXXXXXXXX",
            tables: [],
            examples: [],
            schemas: [
              {
                title: "Esquema de entrada",
                content:
                  '{\n  "type": "object",\n  "nullable": true,\n  "properties": {},\n  "additionalProperties": {\n    "nullable": true\n  },\n  "required": []\n}',
              },
              {
                title: "Esquema de salida",
                content:
                  '{\n  "type": "object",\n  "nullable": false,\n  "properties": {\n    "server_time": {\n      "type": "integer",\n      "description": "UNIX timestamp of the server time"\n    },\n    "tariffs": {\n      "type": "array",\n      "items": {\n        "type": "object",\n        "properties": {\n          "uid": {\n            "type": "integer",\n            "nullable": false,\n            "description": "Internal id of the tariff"\n          },\n          "name": {\n            "type": "string",\n            "nullable": false,\n            "description": "Name of the tariff"\n          },\n          "type": {\n            "type": "integer",\n            "nullable": false,\n            "description": "Type of the tariff"\n          },\n          "code": {\n            "anyOf": [\n              {\n                "nullable": true\n              },\n              {\n                "type": "string",\n                "nullable": false\n              }\n            ],\n            "description": "Code required to redeem the tariff"\n          },\n          "price": {\n            "type": "integer",\n            "nullable": false,\n            "description": "Price of the tariff including VAT"\n          },\n          "net_price": {\n            "type": "integer",\n            "nullable": false,\n            "description": "Price of the tariff excluding VAT"\n          },\n          "end_date": {\n            "type": "integer",\n            "nullable": false,\n            "description": "end date of the tariff"\n          },\n          "valid_days": {\n            "type": "integer",\n            "nullable": false,\n            "description": "Validity extension limit (in number of days) of the tariff"\n          },\n          "auto_renew": {\n            "anyOf": [\n              {\n                "nullable": true\n              },\n              {\n                "type": "string",\n                "nullable": false,\n                "enum": [\n                  "day",\n                  "week",\n                  "month",\n                  "quarter",\n                  "semester",\n                  "year"\n                ]\n              }\n            ],\n            "description": "the subscription interval"\n          },\n          "free_text": {\n            "type": "string",\n            "nullable": false,\n            "description": "Free text Description of the tariff"\n          },\n          "partner_id": {\n            "type": "integer",\n            "nullable": false,\n            "description": "Internal id of the partner which offers the tariff"\n          },\n          "domain": {\n            "type": "string",\n            "nullable": false,\n            "description": "Domain of the tariff"\n          },\n          "currency": {\n            "type": "string",\n            "nullable": false,\n            "description": "Currency of the tariff"\n          },\n          "brand": {\n            "type": "string",\n            "nullable": false,\n            "description": "Brand of the tariff"\n          },\n          "description_conditions": {\n            "anyOf": [\n              {\n                "nullable": true\n              },\n              {\n                "type": "string",\n                "nullable": false\n              }\n            ],\n            "description": "a textual description of the conditions of the tariff"\n          },\n          "description_details": {\n            "anyOf": [\n              {\n                "nullable": true\n              },\n              {\n                "type": "string",\n                "nullable": false\n              }\n            ],\n            "description": "a textual description of the details of the tariff"\n          },\n          "description_hint": {\n            "anyOf": [\n              {\n                "nullable": true\n              },\n              {\n                "type": "string",\n                "nullable": false\n              }\n            ],\n            "description": "an additional hint for the tariff"\n          },\n          "category": {\n            "anyOf": [\n              {\n                "nullable": true\n              },\n              {\n                "type": "string",\n                "nullable": false,\n                "enum": [\n                  "university_1",\n                  "university_2",\n                  "university_3",\n                  "subscription_sub_daily",\n                  "subscription_daily",\n                  "subscription_sub_weekly",\n                  "subscription_weekly",\n                  "subscription_biweekly",\n                  "subscription_sub_monthly",\n                  "subscription_monthly",\n                  "subscription_sub_yearly",\n                  "subscription_yearly",\n                  "corporate_tier_1",\n                  "corporate_tier_2",\n                  "mobility",\n                  "corporate_benefit",\n                  "university_subscription",\n                  "charity",\n                  "fee",\n                  "promotion",\n                  "municipal_benefit",\n                  "pay_as_you_go"\n                ]\n              }\n            ],\n            "description": "enum that can be used to show an icon"\n          },\n          "terms_url": {\n            "anyOf": [\n              {\n                "nullable": true\n              },\n              {\n                "type": "string",\n                "nullable": false\n              }\n            ],\n            "description": "URL to the terms and conditions of the brand"\n          },\n          "withdrawal_policy_url": {\n            "anyOf": [\n              {\n                "nullable": true\n              },\n              {\n                "type": "string",\n                "nullable": false\n              }\n            ],\n            "description": "URL to the withdrawal policy of the brand"\n          },\n          "redeem_id": {\n            "type": "integer",\n            "nullable": false,\n            "description": "the id of the coupon redeem, e.g. needed to cancel the ticket"\n          },\n          "redeem_valid_from": {\n            "type": "integer",\n            "nullable": false,\n            "description": "UNIX-timestamp of the point in time when the ticket is valid"\n          },\n          "redeem_valid_thru": {\n            "type": "integer",\n            "nullable": false,\n            "description": "UNIX-timestamp of the point in time when the ticket is not valid anymore (expiration of ticket without auto-renew or termination of a cancelled ticket with auto-renew)"\n          },\n          "redeem_is_cancelled": {\n            "type": "boolean",\n            "nullable": false,\n            "description": "is true if the ticket is already cancelled"\n          },\n          "redeem_is_cancellable": {\n            "type": "boolean",\n            "nullable": false,\n            "description": "is true if the ticket can be cancelled (see `cancelSubscription`)"\n          },\n          "redeem_earliest_termination_date": {\n            "anyOf": [\n              {\n                "nullable": true\n              },\n              {\n                "type": "integer",\n                "nullable": false\n              }\n            ],\n            "description": "UNIX-timestamp of the point in time when an instant cancellation of the ticket would take effect"\n          },\n          "redeem_expiration_notice_period": {\n            "anyOf": [\n              {\n                "nullable": true\n              },\n              {\n                "type": "integer",\n                "nullable": false\n              }\n            ],\n            "description": "UNIX-timestamp of the point in time until when the cancellation of the ticket should be done so that it will end at redeem_earliest_termination_date"\n          }\n        },\n        "nullable": false,\n        "required": [\n          "uid",\n          "name",\n          "type",\n          "code",\n          "price",\n          "end_date",\n          "valid_days",\n          "auto_renew",\n          "free_text",\n          "partner_id",\n          "domain",\n          "currency",\n          "brand",\n          "description_conditions",\n          "description_details",\n          "description_hint",\n          "category",\n          "terms_url",\n          "withdrawal_policy_url"\n        ]\n      }\n    },\n    "partners": {\n      "type": "array",\n      "items": {\n        "type": "object",\n        "properties": {\n          "uid": {\n            "type": "integer",\n            "nullable": false,\n            "description": "Internal id of the partner"\n          },\n          "partner_name": {\n            "type": "string",\n            "nullable": false,\n            "description": "Name of the partner"\n          },\n          "domain": {\n            "type": "string",\n            "nullable": false,\n            "description": "Domain of the partner"\n          },\n          "verification_type": {\n            "type": "string",\n            "nullable": false,\n            "enum": [\n              "number",\n              "mail",\n              "link",\n              "foreign_system"\n            ],\n            "description": "Connection path"\n          },\n          "description_conditions": {\n            "anyOf": [\n              {\n                "nullable": true\n              },\n              {\n                "type": "string",\n                "nullable": false\n              }\n            ],\n            "description": "a textual description of the conditions of the partner"\n          },\n          "description_details": {\n            "anyOf": [\n              {\n                "nullable": true\n              },\n              {\n                "type": "string",\n                "nullable": false\n              }\n            ],\n            "description": "a textual description of the details of the partner"\n          },\n          "description_hint": {\n            "anyOf": [\n              {\n                "nullable": true\n              },\n              {\n                "type": "string",\n                "nullable": false\n              }\n            ],\n            "description": "an additional hint for the partner"\n          },\n          "partner_number": {\n            "type": "string",\n            "nullable": false,\n            "description": "First number identifier to connect with the partner (only if `verification_type` is `\\"number\\"`)"\n          },\n          "partner_number2": {\n            "anyOf": [\n              {\n                "nullable": true\n              },\n              {\n                "type": "string",\n                "nullable": false\n              }\n            ],\n            "description": "Second identifier to connect with the partner (only if `verification_type` is `\\"number\\"`)"\n          },\n          "link": {\n            "type": "string",\n            "nullable": false,\n            "description": "url to external verification service (only if `verification_type` is `\\"link\\"`)"\n          },\n          "is_connected": {\n            "type": "boolean",\n            "nullable": false,\n            "description": "whether the customer requesting is connected to the partner"\n          },\n          "user_number": {\n            "anyOf": [\n              {\n                "nullable": true\n              },\n              {\n                "type": "string",\n                "nullable": false\n              }\n            ],\n            "description": "First identifier used to connect to the partner (only if `verification_type` is `\\"number\\"` and `is_connected` is `true`)"\n          },\n          "user_number2": {\n            "anyOf": [\n              {\n                "nullable": true\n              },\n              {\n                "type": "string",\n                "nullable": false\n              }\n            ],\n            "description": "Second identifier used to connect to the partner (only if `verification_type` `\\"number\\"` and is_connected is `true`)"\n          }\n        },\n        "nullable": false,\n        "required": [\n          "uid",\n          "partner_name",\n          "domain",\n          "verification_type",\n          "description_conditions",\n          "description_details",\n          "description_hint",\n          "partner_number",\n          "partner_number2",\n          "link",\n          "is_connected",\n          "user_number",\n          "user_number2"\n        ]\n      }\n    }\n  },\n  "additionalProperties": {\n    "nullable": true\n  },\n  "required": [\n    "server_time",\n    "tariffs",\n    "partners"\n  ]\n}',
              },
            ],
          },
          {
            id: "availableBenefits",
            name: "availableBenefits",
            title:
              "Available Benefits - Display the benefits that are available to the customer",
            description: "Get available benefits for the given user",
            route:
              "https://api.nextbike.net/api/availableBenefits.xml?apikey=XXXXXXXXXXXXX&loginkey=XXXXXXXXXXXX",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  ["apikey", "String", "Your API key", "Required"],
                  [
                    "version",
                    "Float",
                    "API version",
                    "optional (default latest)",
                  ],
                  [
                    "loginkey",
                    "String",
                    "Login token of the customer, to check customer-specific availability (e.g. bike limits)",
                    "Required",
                  ],
                  [
                    "language",
                    "String",
                    "language code for translated partners/tariffs if available",
                    "Optional",
                  ],
                  [
                    "include_all_types",
                    "Boolean",
                    "Determines whether vouchers of all types, instead of only tickets, shall be included",
                    "Optional",
                  ],
                  [
                    "include_active_vouchers",
                    "Boolean",
                    "Determines whether vouchers, which are currently in use by the customer, shall be included",
                    "Optional",
                  ],
                ],
              },
              {
                title: "Valores y códigos documentados",
                headers: ["Node", "Response-Parameter", "Type", "Description"],
                rows: [
                  [
                    "tariffs",
                    "tariff",
                    "Node",
                    "Benefits that are available to the user",
                  ],
                  ["", "uid", "int", "Internal id of the tariff"],
                  ["", "name", "string", "Name of the tariff"],
                  ["", "type", "int", "Type of the tariff"],
                  ["", "code", "string", "Code required to redeem the tariff"],
                  ["", "price", "int", "Price of the tariff including VAT"],
                  [
                    "",
                    "net_price",
                    "int",
                    "Price of the tariff excluding VAT (optional)",
                  ],
                  ["", "start_date", "int", "start date of the tariff"],
                  ["", "end_date", "int", "end date of the tariff"],
                  [
                    "",
                    "valid_days",
                    "int",
                    "Validity extension limit (in number of days) of the tariff",
                  ],
                  [
                    "",
                    "auto_renew",
                    "string/null",
                    'the subscription interval - is either "day", "week", "month", "quarter" (3 month), "semester" (6 month), "year"',
                  ],
                  [
                    "",
                    "free_text",
                    "string",
                    "Free text Description of the tariff",
                  ],
                  [
                    "",
                    "partner_id",
                    "int",
                    "Internal id of the partner which offers the tariff",
                  ],
                  ["", "domain", "string", "Domain of the tariff"],
                  ["", "currency", "string", "Currency of the tariff"],
                  ["", "brand", "string", "Brand of the tariff"],
                  [
                    "",
                    "description_conditions",
                    "string/null",
                    "a textual description of the conditions of the tariff",
                  ],
                  [
                    "",
                    "description_details",
                    "string/null",
                    "a textual description of the details of the tariff",
                  ],
                  [
                    "",
                    "description_hint",
                    "string/null",
                    "an additional hint for the tariff",
                  ],
                  [
                    "",
                    "category",
                    "string/null",
                    "enum that can be used to show an icon - one of 'university_1', 'university_2', 'university_3', 'subscription_sub_daily ', 'subscription_daily', 'subscription_sub_weekly', 'subscription_weekly', 'subscription_biweekly', 'subscription_sub_monthly', 'subscription_monthly', 'subscription_sub_yearly', 'subscription_yearly', 'corporate_tier_1', 'corporate_tier_2', 'mobility', 'corporate_benefit', 'university_subscription', 'charity', 'fee', 'promotion', 'municipal_benefit', 'pay_as_you_go'",
                  ],
                  [
                    "",
                    "terms_url",
                    "string/null",
                    "URL to the terms and conditions of the brand",
                  ],
                  [
                    "",
                    "withdrawal_policy_url",
                    "string/null",
                    "URL to the withdrawal policy of the brand",
                  ],
                  [
                    "partners",
                    "partner",
                    "Node",
                    "Partner connections that are available to the user",
                  ],
                  ["", "uid", "int", "Internal id of the partner"],
                  ["", "partner_name", "string", "Name of the partner"],
                  ["", "domain", "string", "Domain of the partner"],
                  [
                    "",
                    "verification_type",
                    "string",
                    'Connection path ("number", "mail", "link", "foreign_system")',
                  ],
                  [
                    "",
                    "description_conditions",
                    "string/null",
                    "a textual description of the conditions of the partner",
                  ],
                  [
                    "",
                    "description_details",
                    "string/null",
                    "a textual description of the details of the partner",
                  ],
                  [
                    "",
                    "description_hint",
                    "string/null",
                    "an additional hint for the partner",
                  ],
                  ["", "category", "string/null"],
                  [
                    "",
                    "partner_number",
                    "string",
                    'First number identifier to connect with the partner (only if verification_type "number")',
                  ],
                  [
                    "",
                    "partner_number2",
                    "string/null",
                    'Second identifier to connect with the partner (only if verification_type "number")',
                  ],
                  [
                    "",
                    "link",
                    "String",
                    'url to external verification service (only if verification_type "link")',
                  ],
                  [
                    "",
                    "is_connected",
                    "boolean",
                    "whether the customer requesting is connected to the partner (will be always false here)",
                  ],
                ],
              },
            ],
            examples: [
              {
                title: "Ejemplo de respuesta",
                content:
                  '<?xml version="1.0" encoding="utf-8"?>\n<nextbike version="1.0" server_time="1234567890">\n  <tariffs>\n    <item uid="2682" name="ticketAutoRenew" type="3" code="754948" price="30" net_price="25" start_date="1595761059" end_date="1627469859" valid_days="30" auto_renew="month" domain="de" currency="EUR" brand="nextbike Germany" description_conditions="Abc" description_details="Abc" description_hint="Abc" category="university_1" terms_url="https://www.nextbike.de/de/agb/" withdrawal_policy_url="https://www.nextbike.de/de/widerrufsbelehrung"/>\n  </tariffs>\n  <partners>\n    <item uid="367" partner_name="PartnerMe" partner_number="Zugangsnummer" partner_number2="BenefitCard" domain="fr" verification_type="number" is_connected="0" category="university_1"/>\n  </partners>\n</nextbike>',
              },
            ],
            schemas: [],
          },
          {
            id: "benefit",
            name: "benefit",
            title: "Benefit - Get the details of a benefit",
            description:
              "Get the details of a benefit might contains redeem-specific details if the given benefit is currently active for the customer see activeBenefits, availableBenefits",
            route:
              "https://api.nextbike.net/api/benefit.xml?apikey=XXXXXXXXXXXXX&loginkey=XXXXXXXXXXXX&coupon_id=xxx",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  [
                    "coupon_id",
                    "Integer",
                    "Internal id of the tariff",
                    "Required",
                  ],
                  ["apikey", "String", "Your API key", "Required"],
                  [
                    "loginkey",
                    "String",
                    "Login token of the customer, to check customer-specific availability (e.g. bike limits)",
                    "Required",
                  ],
                  [
                    "version",
                    "Float",
                    "API version",
                    "optional (default latest)",
                  ],
                ],
              },
              {
                title: "Valores y códigos documentados",
                headers: ["Node", "Response-Parameter", "Type", "Description"],
                rows: [
                  [
                    "tariff",
                    "tariff",
                    "Node",
                    "Details of tariff that is active or available for the user",
                  ],
                  ["", "uid", "int", "Internal id of the tariff"],
                  ["", "name", "string", "Name of the tariff"],
                  ["", "type", "int", "Type of the tariff"],
                  [
                    "",
                    "code",
                    "string/null",
                    "Code required to redeem the tariff",
                  ],
                  ["", "price", "int", "Price of the tariff including VAT"],
                  [
                    "",
                    "net_price",
                    "int",
                    "Price of the tariff excluding VAT (optional)",
                  ],
                  ["", "end_date", "int", "end date of the tariff"],
                  [
                    "",
                    "valid_days",
                    "int",
                    "Validity extension limit (in number of days) of the tariff",
                  ],
                  [
                    "",
                    "auto_renew",
                    "string/null",
                    'the subscription interval - is either "day", "week", "month", "quarter" (3 month), "semester" (6 month), "year"',
                  ],
                  [
                    "",
                    "free_text",
                    "string",
                    "Free text Description of the tariff",
                  ],
                  [
                    "",
                    "partner_id",
                    "int",
                    "Internal id of the partner which offers the tariff",
                  ],
                  ["", "domain", "string", "Domain of the tariff"],
                  ["", "currency", "string", "Currency of the tariff"],
                  ["", "brand", "string", "Brand of the tariff"],
                  [
                    "",
                    "description_conditions",
                    "string/null",
                    "a textual description of the conditions of the tariff",
                  ],
                  [
                    "",
                    "description_details",
                    "string/null",
                    "a textual description of the details of the tariff",
                  ],
                  [
                    "",
                    "description_hint",
                    "string/null",
                    "an additional hint for the tariff",
                  ],
                  [
                    "",
                    "category",
                    "string/null",
                    "enum that can be used to show an icon - one of 'university_1', 'university_2', 'university_3', 'subscription_sub_daily ', 'subscription_daily', 'subscription_sub_weekly', 'subscription_weekly', 'subscription_biweekly', 'subscription_sub_monthly', 'subscription_monthly', 'subscription_sub_yearly', 'subscription_yearly', 'corporate_tier_1', 'corporate_tier_2', 'mobility', 'corporate_benefit', 'university_subscription', 'charity', 'fee', 'promotion', 'municipal_benefit', 'pay_as_you_go'",
                  ],
                  [
                    "",
                    "terms_url",
                    "string/null",
                    "URL to the terms and conditions of the brand",
                  ],
                  [
                    "",
                    "withdrawal_policy_url",
                    "string/null",
                    "URL to the withdrawal policy of the brand",
                  ],
                  [
                    "",
                    "redeem_id (optional)",
                    "integer",
                    "the id of the coupon redeem, e.g. needed to cancel the ticket",
                  ],
                  [
                    "",
                    "redeem_valid_from (optional)",
                    "int",
                    "UNIX-timestamp of the point in time when the ticket is valid",
                  ],
                  [
                    "",
                    "redeem_valid_thru (optional)",
                    "int",
                    "UNIX-timestamp of the point in time when the ticket is not valid anymore (expiration of ticket without auto-renew or termination of a cancelled ticket with auto-renew)",
                  ],
                  [
                    "",
                    "redeem_is_cancelled (optional)",
                    "boolean",
                    "is true if the ticket is already cancelled",
                  ],
                  [
                    "",
                    "redeem_is_cancellable (optional)",
                    "boolean",
                    "is true if the ticket can be cancelled (see cancelSubscription)",
                  ],
                  [
                    "",
                    "redeem_earliest_termination_date (optional)",
                    "int/null",
                    "UNIX-timestamp of the point in time when an instant cancellation of the ticket would take effect",
                  ],
                  [
                    "",
                    "redeem_expiration_notice_period (optional)",
                    "int/null",
                    "UNIX-timestamp of the point in time until when the cancellation of the ticket should be done so that it will end at redeem_earliest_termination_date",
                  ],
                ],
              },
            ],
            examples: [
              {
                title: "Ejemplo de respuesta",
                content:
                  '<?xml version="1.0" encoding="utf-8"?>\n<nextbike version="1.0" server_time="1234567890">\n  <tariff uid="2682" name="ticketAutoRenew" type="3" code="754948" price="30" net_price="25" start_date="1595761059" end_date="1627469859" valid_days="30" auto_renew="month" domain="de" currency="EUR" brand="nextbike Germany" description_conditions="Abc" description_details="Abc" description_hint="Abc" category="university_1" terms_url="https://www.nextbike.de/de/agb/" withdrawal_policy_url="https://www.nextbike.de/de/widerrufsbelehrung" redeem_id="10423" redeem_is_cancelled="0" redeem_is_cancellable="1" redeem_earliest_termination_date="1598525861" redeem_expiration_notice_period="1598525861"/>\n</nextbike>',
              },
            ],
            schemas: [],
          },
          {
            id: "cancelSubscription",
            name: "cancelSubscription",
            title: "cancelSubscription",
            description: "cancelSubscription",
            route: "https://api.nextbike.net/api/cancelSubscription.xml",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  ["apikey", "String", "Your API key", "Required"],
                  [
                    "version",
                    "Float",
                    "API version",
                    "optional (default latest)",
                  ],
                  [
                    "loginkey",
                    "String",
                    "Login token of the customer",
                    "Required",
                  ],
                  [
                    "redeem_id",
                    "Int",
                    "Which subscription to cancel",
                    "Required",
                  ],
                  [
                    "immediate",
                    "Bool",
                    "Set 1 to immediately cancel the subscription (only for controlling partners)",
                    "optional",
                  ],
                  [
                    "refund_amount",
                    "Int",
                    "Refund amount for immediate cancellation (only for controlling partners)",
                    "optional",
                  ],
                  [
                    "valid_thru",
                    "Int",
                    "Set specific end time (UNIX timestamp) for end of subscription (only for controlling partners)",
                    "optional",
                  ],
                ],
              },
              {
                title: "Valores y códigos documentados",
                headers: ["Node", "Response-Parameter", "Type", "Description"],
                rows: [
                  [
                    "successful",
                    "",
                    "Bool",
                    "Whether the cancellation was successful",
                  ],
                ],
              },
            ],
            examples: [],
            schemas: [],
          },
          {
            id: "createCoupon",
            name: "createCoupon",
            title: "create a Coupon",
            description: "create a Coupon",
            route:
              "https://api.nextbike.net/api/createCoupon.json?apikey=XXXXXXXXXXXXX&coupon_id=ID&coupon_credits=1200&coupon_name=NAME",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  ["apikey", "String", "Your API key", "Required"],
                  [
                    "version",
                    "Float",
                    "API version",
                    "optional (default latest)",
                  ],
                  [
                    "coupon_id",
                    "String",
                    "The uid of an already existing coupon which should used as a template",
                    "Required",
                  ],
                  [
                    "coupon_name",
                    "String",
                    "The name of the coupon",
                    "Optional",
                  ],
                  [
                    "coupon_credits",
                    "Integer",
                    "The amount of benefit",
                    "Optional",
                  ],
                  [
                    "start_date",
                    "Integer",
                    "The start date of the coupon",
                    "Optional (default now)",
                  ],
                  [
                    "end_date",
                    "Integer",
                    "The end date of the coupon",
                    "Optional (default 3 years from start_date)",
                  ],
                ],
              },
            ],
            examples: [],
            schemas: [],
          },
          {
            id: "createCouponItem",
            name: "createCouponItem",
            title: "create a CouponItem",
            description: "create a CouponItem",
            route:
              "https://api.nextbike.net/api/createCouponItem.json?apikey=XXXXXXXXXXXXX&coupon_id=ID&coupon_credits=1200&coupon_name=NAME",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  ["apikey", "String", "Your API key", "Required"],
                  [
                    "version",
                    "Float",
                    "API version",
                    "optional (default latest)",
                  ],
                  [
                    "coupon_id",
                    "String",
                    "The uid of an already existing coupon",
                    "Required",
                  ],
                  [
                    "coupon_item_code",
                    "String",
                    "Future coupon code",
                    "Required",
                  ],
                ],
              },
            ],
            examples: [],
            schemas: [],
          },
          {
            id: "deleteCouponItem",
            name: "deleteCouponItem",
            title: "Delete a coupon item",
            description: "Delete a coupon item",
            route:
              "https://api.nextbike.net/api/deleteCouponItem.json?apikey=XXXXXXXXXXXXX&coupon_item_code=CODE",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  ["apikey", "String", "Your API key", "Required"],
                  [
                    "version",
                    "Float",
                    "API version",
                    "optional (default latest)",
                  ],
                  [
                    "coupon_item_code",
                    "String",
                    "The voucher code",
                    "Required",
                  ],
                ],
              },
            ],
            examples: [],
            schemas: [],
          },
          {
            id: "getApplicableCoupons",
            name: "getApplicableCoupons",
            title: "getApplicapleCoupons",
            description: "getApplicapleCoupons",
            route:
              "https://api.nextbike.net/api/getApplicableCoupons.json?rental_id=5034&show_errors=1&api_key=TR6EHaaNTSFGFmMt&loginkey=XXXXXXXXXXXX",
            tables: [],
            examples: [],
            schemas: [],
          },
          {
            id: "getCouponItemStatus",
            name: "getCouponItemStatus",
            title: "get the Status of a coupon item",
            description: "get the Status of a coupon item",
            route:
              "https://api.nextbike.net/api/getCouponItemstatus.json?apikey=XXXXXXXXXXXXX&voucher_code=CODE",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  ["apikey", "String", "Your API key", "Required"],
                  [
                    "version",
                    "Float",
                    "API version",
                    "optional (default latest)",
                  ],
                  ["voucher_code", "String", "The voucher code", "Required"],
                ],
              },
            ],
            examples: [],
            schemas: [],
          },
          {
            id: "getPaymentLinks",
            name: "getPaymentLinks",
            title: "Get Payment Links",
            description:
              "This function is limited to a few API keys Provides simple links that can be used to open WebView or pass to browser via normal GET method - no POST required",
            route:
              "https://api.nextbike.net/api/getPaymentLinks.xml?apikey=XXXXXXXXXXXXX&loginkey=XXXXXXXXXXXX&amount=100&payment=wp&success_url=http://www.nextbike.net&failure_url=http://www.nextbike.net&tickets=123456,234567",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  ["apikey", "String", "Your API key", "required"],
                  [
                    "version",
                    "float",
                    "API version",
                    "optional (default latest)",
                  ],
                  [
                    "loginkey",
                    "String",
                    "Login-Token of customer for accounting",
                    "required",
                  ],
                  [
                    "amount",
                    "int",
                    "Amount in cent",
                    "optional (default maximum of subscription fee and sum of ticket prices)",
                  ],
                  [
                    "language",
                    "String",
                    "2-letter ISO code of preferred language (default: user language)",
                    "optional",
                  ],
                  [
                    "tickets",
                    "String",
                    "Comma separated list of coupon codes of tickets bought with this payment",
                    "optional",
                  ],
                  [
                    "ticket_ids",
                    "String",
                    "Comma separated list of ids of tickets bought with this payment",
                    "optional",
                  ],
                  [
                    "success_url",
                    "String",
                    'URL to go to after successful payment / could be "close" to automatically close the tab/browser after successful payment',
                    "optional (effect only for payment=wp)",
                  ],
                  [
                    "failure_url",
                    "String",
                    "URL to go to after failed payment",
                    "optional (effect only for payment=wp)",
                  ],
                  [
                    "oneclick",
                    "bool",
                    'Press the "submit" button automatically to proceed to final payment form (works only, if oneclick is supported - see attribute in payment link)',
                  ],
                ],
              },
            ],
            examples: [
              {
                title: "Ejemplo de respuesta",
                content:
                  '<nextbike version="1.0">\n  <paymentlinks>\n    <paymentlink option="credit_card" payment="cc" title="Kreditkarte" link_url="https://securepay.nextbike.net/pay/credit_card/de/49123456789/3ca686cbd9266d9e2e8cac3d0d748590?amount=100&amp;tickets=123456" is_current_payment="1" oneclick="0" amount="100" />\n    <paymentlink option="direct_debit" payment="dd" title="Bankeinzug" link_url="https://securepay.nextbike.net/pay/direct_debit/de/49123456789/5fc99ad818e6212d8cba5614d1795074?amount=100&amp;tickets=123456" oneclick="0" amount="100" />\n  </paymentlinks>\n</nextbike>',
              },
            ],
            schemas: [],
          },
          {
            id: "payBlik",
            name: "payBlik",
            title: "Pay with BLIK",
            description: "Pay with BLIK",
            route:
              "https://api.nextbike.net/api/payBlik.xml?apikey=XXXXXXXXXXXXX&loginkey=XXXXXXXXXXXX&amount=1000&description=Top-up&code=123456",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  [
                    "apikey",
                    "String",
                    "API-Key of the application",
                    "Required",
                  ],
                  [
                    "version",
                    "float",
                    "API-Version",
                    "Optional (default: newest)",
                  ],
                  [
                    "loginkey",
                    "String",
                    "Login-Token of the customer",
                    "required",
                  ],
                  ["code", "String", "BLIK code", "Required"],
                  ["amount", "int", "Amount in cent", "Optional"],
                  [
                    "description",
                    "String",
                    "Transaction description (only A-Za-z0-9 characters + space)",
                    "Optional",
                  ],
                ],
              },
            ],
            examples: [
              {
                title: "Ejemplo de respuesta",
                content:
                  '<?xml version="1.0" encoding="utf-8"?>\n<nextbike version="1.0" server_time="1234567890">\n  <blikpayment amount="1000" description="Top-up" code="123456" success="1"/>\n</nextbike>',
              },
            ],
            schemas: [],
          },
          {
            id: "tariffs",
            name: "tariffs",
            title: "Tariffs",
            description: "Tariffs",
            route:
              "https://api.nextbike.net/api/tariffs.xml?apikey=XXXXXXXXXXXXX&domain=bu",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  [
                    "apikey",
                    "String",
                    "API-Key of the application",
                    "Required",
                  ],
                  [
                    "version",
                    "float",
                    "API-Version",
                    "Optional (default: newest)",
                  ],
                  [
                    "domain",
                    "String",
                    "Get all tariffs of this domain",
                    "Optional",
                  ],
                  [
                    "language",
                    "String",
                    "Language code to display texts (if available)",
                    "Optional",
                  ],
                  ["code", "String", "Unique code of the tariff", "Optional"],
                  ["uid", "String", "Unique ID of the tariff", "Optional"],
                  [
                    "loginkey",
                    "String",
                    "Loginkey of customer (to use customer language, customer domain)",
                    "Optional",
                  ],
                ],
              },
            ],
            examples: [
              {
                title: "Ejemplo de respuesta",
                content:
                  '<?xml version="1.0" encoding="utf-8"?>\n<nextbike version="1.0" server_time="1234567890">\n  <country name="BelfastBikes" domain="bu" subscription_fee="500" rfid_card_fee="0" ticket_required="1" vat="0"/>\n  <tariff uid="1090" name="3 day account" domain="bu" brand="BelfastBikes" price="500" currency="GBP" code="590959" valid_days="3" partner_id="0" terms_url="https://www.nextbike.de/de/agb/" withdrawal_policy_url="https://www.nextbike.de/de/widerrufsbelehrung"/>\n  <tariff uid="1089" name="annual account" domain="bu" brand="BelfastBikes" price="2000" currency="GBP" code="937693" valid_days="365" partner_id="0" terms_url="https://www.nextbike.de/de/agb/" withdrawal_policy_url="https://www.nextbike.de/de/widerrufsbelehrung"/>\n</nextbike>',
              },
              {
                title: "Ejemplo de respuesta",
                content:
                  '<?xml version="1.0" encoding="utf-8"?>\n<nextbike version="1.0" server_time="1234567890">\n  <tariff uid="1090" name="3 day account" domain="bu" brand="BelfastBikes" price="500" currency="GBP" code="590959" valid_days="3" partner_id="0" terms_url="https://www.nextbike.de/de/agb/" withdrawal_policy_url="https://www.nextbike.de/de/widerrufsbelehrung"/>\n</nextbike>',
              },
            ],
            schemas: [],
          },
          {
            id: "tpayDirectSale",
            name: "tpayDirectSale",
            title: "tpayDirectSale",
            description: "tpayDirectSale",
            route: "https://api.nextbike.net/api/tpayDirectSale.xml",
            tables: [],
            examples: [],
            schemas: [],
          },
          {
            id: "voucher",
            name: "voucher",
            title: "Redeem vouchers / coupons",
            description: "Redeem vouchers / coupons",
            route:
              "https://api.nextbike.net/api/voucher.xml?apikey=XXXXXXXXXXXXX&loginkey=XXXXXXXXXXXX&code=1234567890",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  [
                    "apikey",
                    "String",
                    "API-Key of the application",
                    "required",
                  ],
                  [
                    "version",
                    "float",
                    "API-Version",
                    "optional (default: newest)",
                  ],
                  ["loginkey", "String", "Login-Token of customer", "required"],
                  [
                    "code",
                    "String",
                    "Voucher code; 6- or 10-digit or alphanumeric, can be comma-separated",
                    "conditionally required",
                  ],
                  [
                    "ticket_id",
                    "Int",
                    "Internal ticket_id (can replace code)",
                    "optional",
                  ],
                  [
                    "start_time",
                    "Int",
                    "Set specific time (UNIX timestamp) for start of subscription",
                    "optional",
                  ],
                  [
                    "description",
                    "String",
                    "Text to be stored in customer account along with the voucher description",
                    "optional",
                  ],
                  [
                    "callback_due_renew",
                    "String",
                    "Callback URL for notification about planned renewal",
                    "optional",
                  ],
                  [
                    "callback_used",
                    "String",
                    "Callback URL for notification about an applied voucher (e.g. used to decrease a rental price)",
                    "optional",
                  ],
                  [
                    "callback_canceled",
                    "String",
                    "Notification about an actively canceled subscription (not expired) - please note that the subscription can still be valid until the end of the period",
                    "optional",
                  ],
                ],
              },
              {
                title: "Valores y códigos documentados",
                headers: ["Node", "Response-Parameter", "Type", "Description"],
                rows: [
                  [
                    "voucher",
                    "amount",
                    "number",
                    "Credit provided by voucher in cents",
                  ],
                  ["", "code", "String", "Voucher code redeemed"],
                  ["", "ticket_id", "Number", "ID of the voucher / ticket"],
                  ["", "currency", "String", "Currency of price and amount"],
                  ["", "date", "Number", "Current timestamp"],
                  [
                    "",
                    "description",
                    "String",
                    "Description on redeemed voucher",
                  ],
                  ["", "price", "String", "Costs"],
                  ["", "text", "String", "Tiny voucher description"],
                ],
              },
            ],
            examples: [
              {
                title: "Ejemplo de respuesta",
                content:
                  '<?xml version="1.0" encoding="utf-8"?>\n<nextbike version="1.0" server_time="1234567890">\n  <voucher amount="0" code="867867" currency="EUR" date="12367234" description="Using the voucher you get EUR 1 bonus for a ride." price="100" text="Voucher: #867867 EUR 1"/>\n</nextbike>',
              },
            ],
            schemas: [],
          },
        ],
      },
      {
        departmentId: "moxsi",
        name: "Operación y contenidos",
        scope: "14 operaciones documentadas",
        endpoints: [
          {
            id: "echo",
            name: "echo",
            title: "echo",
            description: "echo",
            route: "https://api.nextbike.net/api/echo.xml",
            tables: [],
            examples: [],
            schemas: [],
          },
          {
            id: "getApiErrorList",
            name: "getApiErrorList",
            title: "Check phone number for existence",
            description: "Lists all API Errors",
            route:
              "https://api.nextbike.net/api/getApiErrorList.xml?apikey=XXXXXXXXXXXXX",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: ["Request-Parameter", "Type", "Meaning", "Required"],
                rows: [
                  [
                    "apikey",
                    "String",
                    "API-key of your application",
                    "required",
                  ],
                ],
              },
            ],
            examples: [],
            schemas: [],
          },
          {
            id: "getBoardcomputerHistory",
            name: "getBoardcomputerHistory",
            title: "Retrieve the last communication of a boardcomputer",
            description: "Retrieve the last communication of a boardcomputer",
            route: "https://api.nextbike.net/api/getBoardcomputerHistory.xml",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  ["apikey", "String", "Your API key", "Required"],
                  [
                    "version",
                    "Float",
                    "API version",
                    "optional (default latest)",
                  ],
                  [
                    "loginkey",
                    "String",
                    "Login token of the employee",
                    "Required",
                  ],
                  [
                    "boardcomputer",
                    "Integer",
                    "The serial number of the board computer",
                    "Optional",
                  ],
                  [
                    "bike",
                    "String",
                    'Alternative to "boardcomputer", name of the bike',
                    "Optional",
                  ],
                  [
                    "imei",
                    "String",
                    'Alternative to "boardcomputer", IMEI of the boardcomputer',
                    "Optional",
                  ],
                  [
                    "short_imei",
                    "String",
                    'Alternative to "boardcomputer", short IMEI of the boardcomputer',
                    "Optional",
                  ],
                  [
                    "limit",
                    "Integer",
                    "How many entries shall be returned at most",
                    "Optional",
                  ],
                ],
              },
            ],
            examples: [
              {
                title: "Ejemplo de respuesta",
                content:
                  '<?xml version="1.0" encoding="utf-8"?>\n<nextbike version="1.0" server_time="1234567890">\n  <data>\n    <item last_communication="1561975200" battery="80" firmware_version="19101500" configuration_version="19020006" channel="sim" reason="GPS"/>\n    <item last_communication="1561975200" battery="80" firmware_version="19101500" configuration_version="19020006" channel="sim" reason="GPS"/>\n  </data>\n</nextbike>',
              },
            ],
            schemas: [],
          },
          {
            id: "getErrorReports",
            name: "getErrorReports",
            title: "getErrorReports",
            description: "getErrorReports",
            route: "https://api.nextbike.net/api/getErrorReports.xml",
            tables: [],
            examples: [],
            schemas: [],
          },
          {
            id: "getErrorTreeAsJson",
            name: "getErrorTreeAsJson",
            title: "Get Error Tree As Json",
            description:
              "Gets the error tree as json *Deprecated* : Please use the enpoint getReportableProblems instead, and include a reportable_problem_ids parameter to the call of sendErrorReport",
            route: "https://api.nextbike.net/api/getErrorTreeAsJson.xml",
            tables: [],
            examples: [],
            schemas: [],
          },
          {
            id: "getNews",
            name: "getNews",
            title: "Get News",
            description:
              "External applications can get nextbike news returns only active news",
            route: "https://api.nextbike.net/api/getNews.json",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  [
                    "version",
                    "Float",
                    "API version",
                    "Optional (default latest)",
                  ],
                  [
                    "apikey",
                    "String",
                    "API-key of your application",
                    "Required",
                  ],
                  [
                    "loginkey",
                    "String",
                    "Login token of the user",
                    "Required or domain and language",
                  ],
                  [
                    "fallback_domain",
                    "String",
                    "Fallback domain, to use when no loginkey is provided",
                    "Optional or loginkey",
                  ],
                  [
                    "language",
                    "String",
                    "Language of the news, overriding the account language",
                    "Optional or loginkey",
                  ],
                  [
                    "limit",
                    "Integer",
                    "Number of news you want to get back",
                    "Optional",
                  ],
                  [
                    "offset",
                    "Integer",
                    "Leave out number of news - use for pagination",
                    "Optional",
                  ],
                ],
              },
            ],
            examples: [
              {
                title: "Ejemplo de respuesta",
                content:
                  '{\n    "server_time": 1519719953,\n    "news_collection": [\n        {\n            "node": "news",\n            "uid": 4,\n            "title": "News Example 1",\n            "created_time": 1519719948,\n            "updated_time": 1519719948,\n            "featured_image": "https://websites.nextbike.net/media/480/example-image-1.png",\n            "teaser_text": "That\'s a very nice article. Click me!",\n            "cities": [\n                "Warszawa",\n                "Milton Keynes"\n            ]\n            "order": 0,\n            "url_webview": "https://appnews.nextbike.net/en/news/news-example-1/",\n        },\n        {\n            "node": "news",\n            "uid": 3,\n            "title": "News Example 2",\n            "created_time": 1519634347,\n            "updated_time": 1519637706,\n            "featured_image": "https://websites.nextbike.net/media/480/example-image-2.png",\n            "teaser_text": "That\'s the best article ever.",\n            "cities": [\n                "München",\n                "Leipzig"\n            ]\n            "order": 1,\n            "url_webview": "https://appnews.nextbike.net/en/news/news-example-2/",\n        }\n    ]\n}',
              },
            ],
            schemas: [],
          },
          {
            id: "getNewsDetails",
            name: "getNewsDetails",
            title: "Get News Details",
            description:
              "External applications can get nextbike news returns the details of one news translated in the given language (or default language, if the translation is not available)",
            route: "https://api.nextbike.net/api/getNewsDetails.json",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  [
                    "version",
                    "Float",
                    "API version",
                    "Optional (default latest)",
                  ],
                  [
                    "apikey",
                    "String",
                    "API-key of your application",
                    "Required",
                  ],
                  [
                    "loginkey",
                    "String",
                    "Login token of the user",
                    "Required or fallback_domain and language",
                  ],
                  ["news_id", "int", "id of the news", "Required"],
                  [
                    "fallback_domain",
                    "String",
                    "Fallback domain, to use when no loginkey is provided",
                    "Optional or loginkey",
                  ],
                  [
                    "language",
                    "String",
                    "Language of the news, overriding the account language",
                    "Optional or loginkey",
                  ],
                ],
              },
            ],
            examples: [
              {
                title: "Ejemplo de respuesta",
                content: '<?xml version="1.0" encoding="utf-8"?>',
              },
            ],
            schemas: [],
          },
          {
            id: "getNotifications",
            name: "getNotifications",
            title: "Get notifications",
            description: "Limited to special API keys",
            route: "https://api.nextbike.net/api/getNotifications.xml",
            tables: [],
            examples: [],
            schemas: [
              {
                title: "Esquema de entrada",
                content: "@../types/getNotifications-input.json",
              },
              {
                title: "Esquema de salida",
                content: "@../types/getNotifications-output.json",
              },
            ],
          },
          {
            id: "getPlaceDetails",
            name: "getPlaceDetails",
            title: "Get place details",
            description: "Limited to special API keys",
            route: "https://api.nextbike.net/api/getPlaceDetails.xml",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  ["apikey", "String", "Your API key", "Required"],
                  [
                    "version",
                    "float",
                    "API version",
                    "optional (default latest)",
                  ],
                  [
                    "loginkey",
                    "String",
                    "Login token of the employee",
                    "Optional",
                  ],
                  ["station", "Int", "Station number", "Required OR place"],
                  [
                    "place",
                    "Int",
                    "Associated place id",
                    "Required OR station",
                  ],
                ],
              },
              {
                title: "Valores y códigos documentados",
                headers: ["Node", "Response-Parameter", "Type", "Description"],
                rows: [
                  ["booking", "id", "Int", "UID of a active Reservation"],
                  [
                    "",
                    "bike_types",
                    "String (JSON)",
                    "Types of the reserved bikes",
                  ],
                  [
                    "",
                    "biketypes",
                    "String (JSON)",
                    "Types of the reserved bikes - deprecated, will be removed in the future, use bike_types instead",
                  ],
                  [
                    "",
                    "place_id",
                    "Int",
                    "UID of the Place for the Reservation",
                  ],
                  [
                    "",
                    "place_name",
                    "string",
                    "human readable name of the Place for the Reservation",
                  ],
                  [
                    "",
                    "lat",
                    "Float",
                    "Latitude of the Place for the Reservation",
                  ],
                  [
                    "",
                    "lng",
                    "Float",
                    "Longitude of the Place for the Reservation",
                  ],
                  [
                    "",
                    "spot",
                    "Boolean",
                    "if the reservation is at an official stage",
                  ],
                  [
                    "",
                    "start_time",
                    "Int",
                    "Unixtime of the desired start time for rental (can also be the time difference from now until start of the booking in seconds, if lower than 160000000)",
                  ],
                  [
                    "",
                    "end_time",
                    "Int",
                    "Unixtime of the desired end time for rental (only relevant for UsedomRad)",
                  ],
                  ["", "num_bikes", "Int", "Number of booked bikes"],
                  ["", "booked", "Int", "Number of booked bikes"],
                  ["", "state_id", "Int", "state ID of the Reservation"],
                  [
                    "",
                    "state",
                    "String",
                    "human readable state of the Reservation",
                  ],
                  [
                    "",
                    "max_bookingtime_before_rental",
                    "Int",
                    "minimum count of minutes which has to pass between booking and rental begin",
                  ],
                  ["", "cust_id", "Int", "User ID"],
                  [
                    "",
                    "booking_code",
                    "?",
                    "the booking code which is to be entered on fetching the bike",
                  ],
                  ["", "price", "Int", "Price in cents that was charged"],
                  ["", "price_service", "Service charge in cents"],
                  [
                    "",
                    "confirm",
                    "Boolean",
                    "if the booking was confirmed by the system",
                  ],
                  [
                    "",
                    "used_free_seconds",
                    'amount of free seconds that were used to "pay"',
                  ],
                  [
                    "",
                    "bike_blocking_time_seconds",
                    "amount of seconds of bike blocking time",
                  ],
                  [
                    "",
                    "max_bookingtime_before_rental_in_s",
                    "same as max_bookingtime_before_rental but in seconds instead minutes",
                  ],
                  [
                    "",
                    "domain",
                    "String",
                    "short code of the nextbike brand of the place",
                  ],
                  [
                    "",
                    "station_number",
                    "String",
                    "Station number of the start place",
                  ],
                ],
              },
              {
                title: "Valores y códigos documentados",
                headers: ["Node", "Response-Parameter", "Type", "Meaning"],
                rows: [
                  ["bike", "number", "String", "bike number"],
                  ["", "state", "String", "Status"],
                  ["", "bike_type", "integer", "id of the bike type"],
                  ["", "number", "integer", "id of the bike"],
                ],
              },
              {
                title: "Valores y códigos documentados",
                headers: ["State", "Meaning"],
                rows: [
                  ["ok", "Bike is available to rent"],
                  [
                    "ok_but_unknown_number",
                    "Bike may available to rent, but unknown customer information",
                  ],
                  ["unknown", "bike is not existent"],
                  ["return", "return (by providing loginkey)"],
                  [
                    "return_but_unknown_number",
                    "return (without providing loginkey)",
                  ],
                  ["locked", "user is not active"],
                  ["limit", "too many bikes"],
                  ["occupied", "occupied/rented (without providing loginkey)"],
                  ["recently_returned", "recently returned"],
                  [
                    "low_credits",
                    "credits less than 0, Top up! (Customer account got locked - applies to customers without valid payment information (credit card, etc.))",
                  ],
                  [
                    "ok_but_foreign",
                    "different provider - there are different terms and conditions",
                  ],
                  [
                    "ok_but_foreign_terms",
                    "different provider, customer has not accepted these terms and conditions",
                  ],
                  [
                    "not_available_over_night",
                    "bike not lendable or bookable at night",
                  ],
                ],
              },
              {
                title: "Valores y códigos documentados",
                headers: ["bike type id", "bike type"],
                rows: [
                  ["1", "26″ - Touring bike"],
                  ["2", "28″ - Touring bike"],
                  ["3", "UseBike"],
                  ["4", "Comfort"],
                  ["5", "Classic"],
                  ["6", "Pedelec"],
                  ["7", "20″ - Kids bike"],
                  ["8", "24″ - Kids bike"],
                  ["9", "Tandem (Usedom)"],
                  ["10", "Bike trailer"],
                  ["11", "child's seat"],
                  ["12", "Bike helmet"],
                  ["13", "UseBike Classic"],
                  ["14", "Comfort 1 1/8″"],
                  ["15", "Comfort 1 1/8″ with onboard computer"],
                  ["16", "Rack/Parking spot"],
                  ["17", "eBike"],
                  ["18", "Tandem (Poland)"],
                ],
              },
            ],
            examples: [
              {
                title: "Ejemplo de respuesta",
                content:
                  '<?xml version="1.0" encoding="utf-8"?>\n<nextbike version="1.0" server_time="1234567890">\n  <place uid="16337" number="4024" name="Hauptbahnhof/LVB-Mobilit&#xE4;tszentrale" address="" bike_racks="0" lat="51.343658438648" lng="12.378786206245" spot="1" city_name="Leipzig" place_type="0" domain="de" free_racks="0" broken_racks="0" terminal_type="7inch" maintenance="0" bike="0" bike_numbers="10655,10337" bike_types="[]" num_booked_bikes="0" available_bikes="2" bikes_available_to_book="1">\n    <bikes>\n      <bike number="10655" language="de" boardcomputer="0" battery="0" snap="0" electric_lock="0" gps_tracking="0" rfid="0" state="ok" bike_type="4" active="1" app_campaign_uid="0" campaign_name="nextbike Leipzig" pedelec="0" pedelec_battery="0" time_to_charge="0" place_id="16337" city_id="1" bike_domain="de"/>\n      <bike number="10337" language="de" boardcomputer="0" battery="0" snap="0" electric_lock="0" gps_tracking="0" rfid="0" state="ok" bike_type="5" active="1" app_campaign_uid="0" campaign_name="Capita Europe" pedelec="0" pedelec_battery="0" time_to_charge="0" place_id="16337" city_id="1" bike_domain="de"/>\n    </bikes>\n  </place>\n</nextbike>',
              },
            ],
            schemas: [],
          },
          {
            id: "getServiceCases",
            name: "getServiceCases",
            title: "Service cases",
            description: "Service cases",
            route:
              "https://api.nextbike.net/api/getServiceCases.xml?apikey=XXXXXXXXXXXXX&domains=le",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  [
                    "apikey",
                    "String",
                    "API-key of your application",
                    "required",
                  ],
                  [
                    "domains",
                    "String",
                    "Comma separated list of domains of the service cases",
                    'optional (default "all")',
                  ],
                  [
                    "service_cases",
                    "String",
                    "Comma separated list of service case IDs",
                    'optional (default "all")',
                  ],
                ],
              },
            ],
            examples: [
              {
                title: "Ejemplo de respuesta",
                content:
                  '<nextbike version="1.0">\n    <service-cases>\n        <service-case uid="16" item="flexzone_return" domain="le" fee="100" free_trials="1" currency="EUR" />\n    </service-cases>\n</nextbike>',
              },
            ],
            schemas: [],
          },
          {
            id: "getTranslations",
            name: "getTranslations",
            title: "Get translations",
            description: "Limited to special API keys",
            route: "https://api.nextbike.net/api/getTranslations.xml",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  ["apikey", "String", "Your API key", "Required"],
                  [
                    "version",
                    "float",
                    "API version",
                    "optional (default latest)",
                  ],
                  [
                    "type",
                    "String",
                    "The translation type, like 'app-webview'",
                    "Required",
                  ],
                  ["language", "String", "The requested language", "Required"],
                  ["format", "String", "json", "Required"],
                ],
              },
            ],
            examples: [],
            schemas: [],
          },
          {
            id: "list",
            name: "list",
            title: "Customer account",
            description: "lists recent activities of a customer",
            route: "https://api.nextbike.net/api/list.xml",
            tables: [],
            examples: [],
            schemas: [
              {
                title: "Esquema de entrada",
                content: "@../types/list-input.json",
              },
              {
                title: "Esquema de salida",
                content: "@../types/list-output.json",
              },
            ],
          },
          {
            id: "return",
            name: "return",
            title: "Return",
            description: "Return",
            route:
              "https://api.nextbike.net/api/return.xml?apikey=XXXXXXXXXXXXX&loginkey=XXXXXXXXXXXX&rental=123456&bike=12345&place=123&lat=52.323&lng=43.212&place_name=R%C3%BCckgabe+ort&comment=hat+spa%C3%9F+gemacht",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  [
                    "apikey",
                    "String",
                    "API-key of your application",
                    "required",
                  ],
                  [
                    "version",
                    "float",
                    "API-version",
                    "optional (default latest)",
                  ],
                  [
                    "loginkey",
                    "String",
                    "Login-Token of the customer",
                    "required",
                  ],
                  ["rental", "Int", "ID of the rental", "required, or bike"],
                  [
                    "bike",
                    "Int",
                    "bike number (00000-99999)",
                    "required, or rental",
                  ],
                  [
                    "place",
                    "Int",
                    "ID of return place",
                    "required, or lat and lng",
                  ],
                  ["lat", "Float", "Latitude", "optional"],
                  ["lng", "Float", "Longitude", "optional"],
                  ["comment", "String", "Return comment", "optional"],
                  ["rating", "Int", "0-5 (5 is good)", "optional"],
                  [
                    "return_code",
                    "Int",
                    "Return confirmation code displayed by the boardcomputer",
                    "optional",
                  ],
                  [
                    "do_calc_auto_service_fee",
                    "Boolean",
                    "Customer has accepted the automatic service fee for return bike outside of official place and flexzone",
                    "optional",
                  ],
                  [
                    "force",
                    "Boolean",
                    "If set skip some checks and force return.",
                    "optional",
                  ],
                ],
              },
            ],
            examples: [
              {
                title: "Ejemplo de respuesta",
                content:
                  '<nextbike version="1.0">\n  <rental id="123456" bike="12345" code="1234" start_place="123" end_place="123" start_time="123483434" end_time="123234234" price="100" price_service="500" />\n</nextbike>',
              },
            ],
            schemas: [],
          },
          {
            id: "sendErrorReport",
            name: "sendErrorReport",
            title: "Send Error Report",
            description: "Sends an error report",
            route:
              "https://api.nextbike.net/api/sendErrorReport.xml?apikey=XXXXXXXXXXXXX&loginkey=XXXXXXXXXXXX&maincategory=XXXX&number=XXXX&date=XXXX&rack=XXXX&lng=XX.XXX&lat=XX.XXX&message=XXX",
            tables: [
              {
                title: "Parámetros de solicitud",
                headers: [
                  "Request-Parameter",
                  "Type",
                  "Description",
                  "Required",
                ],
                rows: [
                  [
                    "loginkey",
                    "String",
                    "Login token of the customer",
                    "Required, optional for problems of category system if 'reportable_problem_ids' are set",
                  ],
                  ["apikey", "String", "Your API key", "Required"],
                  [
                    "maincategory",
                    "String",
                    "Main category of error report (in: bikes, rentals, stations, message)",
                    "Required OR reportable_problem_ids",
                  ],
                  [
                    "number",
                    "Integer",
                    "Bike number or station number or rental id for main category 'bikes', 'stations', 'rentals' (for category 'rentals' number is interpreted as bike number if reportable_problem_ids is not set)",
                    "Optional",
                  ],
                  [
                    "object_id",
                    "Integer",
                    "Internal bike or place UID for main category 'bikes' or 'stations' (ignored, when 'number' is given)",
                    "Optional",
                  ],
                  [
                    "message",
                    "String",
                    "The content of your error report",
                    "Optional",
                  ],
                  [
                    "reports",
                    "String",
                    'The subcategories as json encoded object, like: {"1":{"1":"ad","2":"pl","3":"cl"}}. You get the subcategories with: getErrorTreeAsJson.xml',
                    "Optional",
                  ],
                  [
                    "date",
                    "String",
                    "The time you have found out the problem in format: 'd.m.y' (17.05.2016)",
                    "Optional",
                  ],
                  [
                    "lat",
                    "String",
                    "The latitude coordinate from the problem report",
                    "Optional",
                  ],
                  [
                    "lng",
                    "String",
                    "The longitude coordinate from the problem report",
                    "Optional",
                  ],
                  [
                    "image",
                    "File",
                    "JPG or PNG image file (e.g. screenshot or photo of the problem), max. 10 MB file size",
                    "Optional",
                  ],
                  [
                    "callback",
                    "String",
                    "URL that will be called when error is fixed, has to be whitelisted",
                    "Optional for maincategory bikes",
                  ],
                  [
                    "reportable_problem_ids",
                    "String",
                    "comma seperated list of uids of the reportable problems (see getReportableProblems)",
                    "Required OR maincategory",
                  ],
                  [
                    "extras",
                    "String",
                    "Extra information, e.g. stack trace - must be JSON encoded",
                    "optional",
                  ],
                  [
                    "domain",
                    "String",
                    "short code of the nextbike brand, is used only for reports in maincategory system",
                    "Optional, required if maincategory 'system'",
                  ],
                ],
              },
              {
                title: "Valores y códigos documentados",
                headers: ["Node", "Response-Parameter", "Type", "Description"],
                rows: [
                  ["errorReports", "", "Node", ""],
                  ["errorReport", "", "Node", ""],
                  ["", "uid", "int", "Internal id the saved error report"],
                ],
              },
            ],
            examples: [
              {
                title: "Ejemplo de respuesta",
                content:
                  '<nextbike version="1.0" server_time="1580391084">\n<errorReport uid="60" />\n<errorReport uid="61" />\n</nextbike>',
              },
              {
                title: "Ejemplo de respuesta",
                content:
                  '{\n  "server_time": 1580391196,\n  "errorReports": [\n    {\n      "errorReport": {\n        "uid": 62\n      }\n    },\n    {\n      "errorReport": {\n        "uid": 63\n      }\n    }\n  ]\n}',
              },
            ],
            schemas: [],
          },
        ],
      },
    ],
    fieldLabels: null,
  });
})();
