(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/@lit/reactive-element/development/css-tag.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ __turbopack_context__.s([
    "CSSResult",
    ()=>CSSResult,
    "adoptStyles",
    ()=>adoptStyles,
    "css",
    ()=>css,
    "getCompatibleStyle",
    ()=>getCompatibleStyle,
    "supportsAdoptingStyleSheets",
    ()=>supportsAdoptingStyleSheets,
    "unsafeCSS",
    ()=>unsafeCSS
]);
const NODE_MODE = false;
// Allows minifiers to rename references to globalThis
const global = globalThis;
const supportsAdoptingStyleSheets = global.ShadowRoot && (global.ShadyCSS === undefined || global.ShadyCSS.nativeShadow) && 'adoptedStyleSheets' in Document.prototype && 'replace' in CSSStyleSheet.prototype;
const constructionToken = Symbol();
const cssTagCache = new WeakMap();
class CSSResult {
    // This is a getter so that it's lazy. In practice, this means stylesheets
    // are not created until the first element instance is made.
    get styleSheet() {
        // If `supportsAdoptingStyleSheets` is true then we assume CSSStyleSheet is
        // constructable.
        let styleSheet = this._styleSheet;
        const strings = this._strings;
        if (supportsAdoptingStyleSheets && styleSheet === undefined) {
            const cacheable = strings !== undefined && strings.length === 1;
            if (cacheable) {
                styleSheet = cssTagCache.get(strings);
            }
            if (styleSheet === undefined) {
                (this._styleSheet = styleSheet = new CSSStyleSheet()).replaceSync(this.cssText);
                if (cacheable) {
                    cssTagCache.set(strings, styleSheet);
                }
            }
        }
        return styleSheet;
    }
    toString() {
        return this.cssText;
    }
    constructor(cssText, strings, safeToken){
        // This property needs to remain unminified.
        this['_$cssResult$'] = true;
        if (safeToken !== constructionToken) {
            throw new Error('CSSResult is not constructable. Use `unsafeCSS` or `css` instead.');
        }
        this.cssText = cssText;
        this._strings = strings;
    }
}
const textFromCSSResult = (value)=>{
    // This property needs to remain unminified.
    if (value['_$cssResult$'] === true) {
        return value.cssText;
    } else if (typeof value === 'number') {
        return value;
    } else {
        throw new Error("Value passed to 'css' function must be a 'css' function result: " + "".concat(value, ". Use 'unsafeCSS' to pass non-literal values, but take care ") + "to ensure page security.");
    }
};
const unsafeCSS = (value)=>new CSSResult(typeof value === 'string' ? value : String(value), undefined, constructionToken);
const css = function(strings) {
    for(var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
        values[_key - 1] = arguments[_key];
    }
    const cssText = strings.length === 1 ? strings[0] : values.reduce((acc, v, idx)=>acc + textFromCSSResult(v) + strings[idx + 1], strings[0]);
    return new CSSResult(cssText, strings, constructionToken);
};
const adoptStyles = (renderRoot, styles)=>{
    if (supportsAdoptingStyleSheets) {
        renderRoot.adoptedStyleSheets = styles.map((s)=>s instanceof CSSStyleSheet ? s : s.styleSheet);
    } else {
        for (const s of styles){
            const style = document.createElement('style');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const nonce = global['litNonce'];
            if (nonce !== undefined) {
                style.setAttribute('nonce', nonce);
            }
            style.textContent = s.cssText;
            renderRoot.appendChild(style);
        }
    }
};
const cssResultFromStyleSheet = (sheet)=>{
    let cssText = '';
    for (const rule of sheet.cssRules){
        cssText += rule.cssText;
    }
    return unsafeCSS(cssText);
};
const getCompatibleStyle = supportsAdoptingStyleSheets || NODE_MODE && global.CSSStyleSheet === undefined ? (s)=>s : (s)=>s instanceof CSSStyleSheet ? cssResultFromStyleSheet(s) : s; //# sourceMappingURL=css-tag.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/@lit/reactive-element/development/reactive-element.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ /**
 * Use this module if you want to create your own base class extending
 * {@link ReactiveElement}.
 * @packageDocumentation
 */ __turbopack_context__.s([
    "ReactiveElement",
    ()=>ReactiveElement,
    "defaultConverter",
    ()=>defaultConverter,
    "notEqual",
    ()=>notEqual
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/@lit/reactive-element/development/css-tag.js [app-client] (ecmascript)");
var // Ensure metadata is enabled. TypeScript does not polyfill
// Symbol.metadata, so we must ensure that it exists.
_Symbol, // Map from a class's metadata object to property options
// Note that we must use nullish-coalescing assignment so that we only use one
// map even if we load multiple version of this module.
_global, _global1;
;
;
// TODO (justinfagnani): Add `hasOwn` here when we ship ES2022
const { is, defineProperty, getOwnPropertyDescriptor, getOwnPropertyNames, getOwnPropertySymbols, getPrototypeOf } = Object;
const NODE_MODE = false;
// Lets a minifier replace globalThis references with a minified name
const global = globalThis;
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
{
    var _global2;
    var _customElements;
}
const DEV_MODE = true;
let issueWarning;
const trustedTypes = global.trustedTypes;
// Temporary workaround for https://crbug.com/993268
// Currently, any attribute starting with "on" is considered to be a
// TrustedScript source. Such boolean attributes must be set to the equivalent
// trusted emptyScript value.
const emptyStringForBooleanAttribute = trustedTypes ? trustedTypes.emptyScript : '';
const polyfillSupport = ("TURBOPACK compile-time truthy", 1) ? global.reactiveElementPolyfillSupportDevMode : "TURBOPACK unreachable";
if ("TURBOPACK compile-time truthy", 1) {
    var // Ensure warnings are issued only 1x, even if multiple versions of Lit
    // are loaded.
    _global3;
    var _litIssuedWarnings;
    (_litIssuedWarnings = (_global3 = global).litIssuedWarnings) !== null && _litIssuedWarnings !== void 0 ? _litIssuedWarnings : _global3.litIssuedWarnings = new Set();
    /**
     * Issue a warning if we haven't already, based either on `code` or `warning`.
     * Warnings are disabled automatically only by `warning`; disabling via `code`
     * can be done by users.
     */ issueWarning = (code, warning)=>{
        warning += " See https://lit.dev/msg/".concat(code, " for more information.");
        if (!global.litIssuedWarnings.has(warning) && !global.litIssuedWarnings.has(code)) {
            console.warn(warning);
            global.litIssuedWarnings.add(warning);
        }
    };
    queueMicrotask(()=>{
        var _global_ShadyDOM;
        issueWarning('dev-mode', "Lit is in dev mode. Not recommended for production!");
        // Issue polyfill support warning.
        if (((_global_ShadyDOM = global.ShadyDOM) === null || _global_ShadyDOM === void 0 ? void 0 : _global_ShadyDOM.inUse) && polyfillSupport === undefined) {
            issueWarning('polyfill-support-missing', "Shadow DOM is being polyfilled via `ShadyDOM` but " + "the `polyfill-support` module has not been loaded.");
        }
    });
}
/**
 * Useful for visualizing and logging insights into what the Lit template system is doing.
 *
 * Compiled out of prod mode builds.
 */ const debugLogEvent = ("TURBOPACK compile-time truthy", 1) ? (event)=>{
    const shouldEmit = global.emitLitDebugLogEvents;
    if (!shouldEmit) {
        return;
    }
    global.dispatchEvent(new CustomEvent('lit-debug', {
        detail: event
    }));
} : "TURBOPACK unreachable";
/*
 * When using Closure Compiler, JSCompiler_renameProperty(property, object) is
 * replaced at compile time by the munged name for object[property]. We cannot
 * alias this function, so we have to use a small shim that has the same
 * behavior when not compiling.
 */ /*@__INLINE__*/ const JSCompiler_renameProperty = (prop, _obj)=>prop;
const defaultConverter = {
    toAttribute (value, type) {
        switch(type){
            case Boolean:
                value = value ? emptyStringForBooleanAttribute : null;
                break;
            case Object:
            case Array:
                // if the value is `null` or `undefined` pass this through
                // to allow removing/no change behavior.
                value = value == null ? value : JSON.stringify(value);
                break;
        }
        return value;
    },
    fromAttribute (value, type) {
        let fromValue = value;
        switch(type){
            case Boolean:
                fromValue = value !== null;
                break;
            case Number:
                fromValue = value === null ? null : Number(value);
                break;
            case Object:
            case Array:
                // Do *not* generate exception when invalid JSON is set as elements
                // don't normally complain on being mis-configured.
                // TODO(sorvell): Do generate exception in *dev mode*.
                try {
                    // Assert to adhere to Bazel's "must type assert JSON parse" rule.
                    fromValue = JSON.parse(value);
                } catch (e) {
                    fromValue = null;
                }
                break;
        }
        return fromValue;
    }
};
const notEqual = (value, old)=>!is(value, old);
const defaultPropertyDeclaration = {
    attribute: true,
    type: String,
    converter: defaultConverter,
    reflect: false,
    useDefault: false,
    hasChanged: notEqual
};
var _metadata;
(_metadata = (_Symbol = Symbol).metadata) !== null && _metadata !== void 0 ? _metadata : _Symbol.metadata = Symbol('metadata');
var _litPropertyMetadata;
(_litPropertyMetadata = (_global = global).litPropertyMetadata) !== null && _litPropertyMetadata !== void 0 ? _litPropertyMetadata : _global.litPropertyMetadata = new WeakMap();
class ReactiveElement extends HTMLElement {
    /**
     * Adds an initializer function to the class that is called during instance
     * construction.
     *
     * This is useful for code that runs against a `ReactiveElement`
     * subclass, such as a decorator, that needs to do work for each
     * instance, such as setting up a `ReactiveController`.
     *
     * ```ts
     * const myDecorator = (target: typeof ReactiveElement, key: string) => {
     *   target.addInitializer((instance: ReactiveElement) => {
     *     // This is run during construction of the element
     *     new MyController(instance);
     *   });
     * }
     * ```
     *
     * Decorating a field will then cause each instance to run an initializer
     * that adds a controller:
     *
     * ```ts
     * class MyElement extends LitElement {
     *   @myDecorator foo;
     * }
     * ```
     *
     * Initializers are stored per-constructor. Adding an initializer to a
     * subclass does not add it to a superclass. Since initializers are run in
     * constructors, initializers will run in order of the class hierarchy,
     * starting with superclasses and progressing to the instance's class.
     *
     * @nocollapse
     */ static addInitializer(initializer) {
        this.__prepare();
        var _this__initializers;
        ((_this__initializers = this._initializers) !== null && _this__initializers !== void 0 ? _this__initializers : this._initializers = []).push(initializer);
    }
    /**
     * Returns a list of attributes corresponding to the registered properties.
     * @nocollapse
     * @category attributes
     */ static get observedAttributes() {
        // Ensure we've created all properties
        this.finalize();
        // this.__attributeToPropertyMap is only undefined after finalize() in
        // ReactiveElement itself. ReactiveElement.observedAttributes is only
        // accessed with ReactiveElement as the receiver when a subclass or mixin
        // calls super.observedAttributes
        return this.__attributeToPropertyMap && [
            ...this.__attributeToPropertyMap.keys()
        ];
    }
    /**
     * Creates a property accessor on the element prototype if one does not exist
     * and stores a {@linkcode PropertyDeclaration} for the property with the
     * given options. The property setter calls the property's `hasChanged`
     * property option or uses a strict identity check to determine whether or not
     * to request an update.
     *
     * This method may be overridden to customize properties; however,
     * when doing so, it's important to call `super.createProperty` to ensure
     * the property is setup correctly. This method calls
     * `getPropertyDescriptor` internally to get a descriptor to install.
     * To customize what properties do when they are get or set, override
     * `getPropertyDescriptor`. To customize the options for a property,
     * implement `createProperty` like this:
     *
     * ```ts
     * static createProperty(name, options) {
     *   options = Object.assign(options, {myOption: true});
     *   super.createProperty(name, options);
     * }
     * ```
     *
     * @nocollapse
     * @category properties
     */ static createProperty(name) {
        let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : defaultPropertyDeclaration;
        // If this is a state property, force the attribute to false.
        if (options.state) {
            options.attribute = false;
        }
        this.__prepare();
        // Whether this property is wrapping accessors.
        // Helps control the initial value change and reflection logic.
        if (this.prototype.hasOwnProperty(name)) {
            options = Object.create(options);
            options.wrapped = true;
        }
        this.elementProperties.set(name, options);
        if (!options.noAccessor) {
            const key = ("TURBOPACK compile-time truthy", 1) ? // when doing HMR.
            Symbol.for("".concat(String(name), " (@property() cache)")) : "TURBOPACK unreachable";
            const descriptor = this.getPropertyDescriptor(name, key, options);
            if (descriptor !== undefined) {
                defineProperty(this.prototype, name, descriptor);
            }
        }
    }
    /**
     * Returns a property descriptor to be defined on the given named property.
     * If no descriptor is returned, the property will not become an accessor.
     * For example,
     *
     * ```ts
     * class MyElement extends LitElement {
     *   static getPropertyDescriptor(name, key, options) {
     *     const defaultDescriptor =
     *         super.getPropertyDescriptor(name, key, options);
     *     const setter = defaultDescriptor.set;
     *     return {
     *       get: defaultDescriptor.get,
     *       set(value) {
     *         setter.call(this, value);
     *         // custom action.
     *       },
     *       configurable: true,
     *       enumerable: true
     *     }
     *   }
     * }
     * ```
     *
     * @nocollapse
     * @category properties
     */ static getPropertyDescriptor(name, key, options) {
        var _getOwnPropertyDescriptor;
        const { get, set } = (_getOwnPropertyDescriptor = getOwnPropertyDescriptor(this.prototype, name)) !== null && _getOwnPropertyDescriptor !== void 0 ? _getOwnPropertyDescriptor : {
            get () {
                return this[key];
            },
            set (v) {
                this[key] = v;
            }
        };
        if (DEV_MODE && get == null) {
            var _getOwnPropertyDescriptor1;
            if ('value' in ((_getOwnPropertyDescriptor1 = getOwnPropertyDescriptor(this.prototype, name)) !== null && _getOwnPropertyDescriptor1 !== void 0 ? _getOwnPropertyDescriptor1 : {})) {
                throw new Error("Field ".concat(JSON.stringify(String(name)), " on ") + "".concat(this.name, " was declared as a reactive property ") + "but it's actually declared as a value on the prototype. " + "Usually this is due to using @property or @state on a method.");
            }
            issueWarning('reactive-property-without-getter', "Field ".concat(JSON.stringify(String(name)), " on ") + "".concat(this.name, " was declared as a reactive property ") + "but it does not have a getter. This will be an error in a " + "future version of Lit.");
        }
        return {
            get,
            set (value) {
                const oldValue = get === null || get === void 0 ? void 0 : get.call(this);
                set === null || set === void 0 ? void 0 : set.call(this, value);
                this.requestUpdate(name, oldValue, options);
            },
            configurable: true,
            enumerable: true
        };
    }
    /**
     * Returns the property options associated with the given property.
     * These options are defined with a `PropertyDeclaration` via the `properties`
     * object or the `@property` decorator and are registered in
     * `createProperty(...)`.
     *
     * Note, this method should be considered "final" and not overridden. To
     * customize the options for a given property, override
     * {@linkcode createProperty}.
     *
     * @nocollapse
     * @final
     * @category properties
     */ static getPropertyOptions(name) {
        var _this_elementProperties_get;
        return (_this_elementProperties_get = this.elementProperties.get(name)) !== null && _this_elementProperties_get !== void 0 ? _this_elementProperties_get : defaultPropertyDeclaration;
    }
    /**
     * Initializes static own properties of the class used in bookkeeping
     * for element properties, initializers, etc.
     *
     * Can be called multiple times by code that needs to ensure these
     * properties exist before using them.
     *
     * This method ensures the superclass is finalized so that inherited
     * property metadata can be copied down.
     * @nocollapse
     */ static __prepare() {
        if (this.hasOwnProperty(JSCompiler_renameProperty('elementProperties', this))) {
            // Already prepared
            return;
        }
        // Finalize any superclasses
        const superCtor = getPrototypeOf(this);
        superCtor.finalize();
        // Create own set of initializers for this class if any exist on the
        // superclass and copy them down. Note, for a small perf boost, avoid
        // creating initializers unless needed.
        if (superCtor._initializers !== undefined) {
            this._initializers = [
                ...superCtor._initializers
            ];
        }
        // Initialize elementProperties from the superclass
        this.elementProperties = new Map(superCtor.elementProperties);
    }
    /**
     * Finishes setting up the class so that it's ready to be registered
     * as a custom element and instantiated.
     *
     * This method is called by the ReactiveElement.observedAttributes getter.
     * If you override the observedAttributes getter, you must either call
     * super.observedAttributes to trigger finalization, or call finalize()
     * yourself.
     *
     * @nocollapse
     */ static finalize() {
        if (this.hasOwnProperty(JSCompiler_renameProperty('finalized', this))) {
            return;
        }
        this.finalized = true;
        this.__prepare();
        // Create properties from the static properties block:
        if (this.hasOwnProperty(JSCompiler_renameProperty('properties', this))) {
            const props = this.properties;
            const propKeys = [
                ...getOwnPropertyNames(props),
                ...getOwnPropertySymbols(props)
            ];
            for (const p of propKeys){
                this.createProperty(p, props[p]);
            }
        }
        // Create properties from standard decorator metadata:
        const metadata = this[Symbol.metadata];
        if (metadata !== null) {
            const properties = litPropertyMetadata.get(metadata);
            if (properties !== undefined) {
                for (const [p, options] of properties){
                    this.elementProperties.set(p, options);
                }
            }
        }
        // Create the attribute-to-property map
        this.__attributeToPropertyMap = new Map();
        for (const [p, options] of this.elementProperties){
            const attr = this.__attributeNameForProperty(p, options);
            if (attr !== undefined) {
                this.__attributeToPropertyMap.set(attr, p);
            }
        }
        this.elementStyles = this.finalizeStyles(this.styles);
        if ("TURBOPACK compile-time truthy", 1) {
            if (this.hasOwnProperty('createProperty')) {
                issueWarning('no-override-create-property', 'Overriding ReactiveElement.createProperty() is deprecated. ' + 'The override will not be called with standard decorators');
            }
            if (this.hasOwnProperty('getPropertyDescriptor')) {
                issueWarning('no-override-get-property-descriptor', 'Overriding ReactiveElement.getPropertyDescriptor() is deprecated. ' + 'The override will not be called with standard decorators');
            }
        }
    }
    /**
     * Takes the styles the user supplied via the `static styles` property and
     * returns the array of styles to apply to the element.
     * Override this method to integrate into a style management system.
     *
     * Styles are deduplicated preserving the _last_ instance in the list. This
     * is a performance optimization to avoid duplicated styles that can occur
     * especially when composing via subclassing. The last item is kept to try
     * to preserve the cascade order with the assumption that it's most important
     * that last added styles override previous styles.
     *
     * @nocollapse
     * @category styles
     */ static finalizeStyles(styles) {
        const elementStyles = [];
        if (Array.isArray(styles)) {
            // Dedupe the flattened array in reverse order to preserve the last items.
            // Casting to Array<unknown> works around TS error that
            // appears to come from trying to flatten a type CSSResultArray.
            const set = new Set(styles.flat(Infinity).reverse());
            // Then preserve original order by adding the set items in reverse order.
            for (const s of set){
                elementStyles.unshift((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCompatibleStyle"])(s));
            }
        } else if (styles !== undefined) {
            elementStyles.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCompatibleStyle"])(styles));
        }
        return elementStyles;
    }
    /**
     * Returns the property name for the given attribute `name`.
     * @nocollapse
     */ static __attributeNameForProperty(name, options) {
        const attribute = options.attribute;
        return attribute === false ? undefined : typeof attribute === 'string' ? attribute : typeof name === 'string' ? name.toLowerCase() : undefined;
    }
    /**
     * Internal only override point for customizing work done when elements
     * are constructed.
     */ __initialize() {
        var _this_constructor__initializers;
        this.__updatePromise = new Promise((res)=>this.enableUpdating = res);
        this._$changedProperties = new Map();
        // This enqueues a microtask that must run before the first update, so it
        // must be called before requestUpdate()
        this.__saveInstanceProperties();
        // ensures first update will be caught by an early access of
        // `updateComplete`
        this.requestUpdate();
        (_this_constructor__initializers = this.constructor._initializers) === null || _this_constructor__initializers === void 0 ? void 0 : _this_constructor__initializers.forEach((i)=>i(this));
    }
    /**
     * Registers a `ReactiveController` to participate in the element's reactive
     * update cycle. The element automatically calls into any registered
     * controllers during its lifecycle callbacks.
     *
     * If the element is connected when `addController()` is called, the
     * controller's `hostConnected()` callback will be immediately called.
     * @category controllers
     */ addController(controller) {
        var _this___controllers;
        ((_this___controllers = this.__controllers) !== null && _this___controllers !== void 0 ? _this___controllers : this.__controllers = new Set()).add(controller);
        // If a controller is added after the element has been connected,
        // call hostConnected. Note, re-using existence of `renderRoot` here
        // (which is set in connectedCallback) to avoid the need to track a
        // first connected state.
        if (this.renderRoot !== undefined && this.isConnected) {
            var _controller_hostConnected;
            (_controller_hostConnected = controller.hostConnected) === null || _controller_hostConnected === void 0 ? void 0 : _controller_hostConnected.call(controller);
        }
    }
    /**
     * Removes a `ReactiveController` from the element.
     * @category controllers
     */ removeController(controller) {
        var _this___controllers;
        (_this___controllers = this.__controllers) === null || _this___controllers === void 0 ? void 0 : _this___controllers.delete(controller);
    }
    /**
     * Fixes any properties set on the instance before upgrade time.
     * Otherwise these would shadow the accessor and break these properties.
     * The properties are stored in a Map which is played back after the
     * constructor runs.
     */ __saveInstanceProperties() {
        const instanceProperties = new Map();
        const elementProperties = this.constructor.elementProperties;
        for (const p of elementProperties.keys()){
            if (this.hasOwnProperty(p)) {
                instanceProperties.set(p, this[p]);
                delete this[p];
            }
        }
        if (instanceProperties.size > 0) {
            this.__instanceProperties = instanceProperties;
        }
    }
    /**
     * Returns the node into which the element should render and by default
     * creates and returns an open shadowRoot. Implement to customize where the
     * element's DOM is rendered. For example, to render into the element's
     * childNodes, return `this`.
     *
     * @return Returns a node into which to render.
     * @category rendering
     */ createRenderRoot() {
        var _this_shadowRoot;
        const renderRoot = (_this_shadowRoot = this.shadowRoot) !== null && _this_shadowRoot !== void 0 ? _this_shadowRoot : this.attachShadow(this.constructor.shadowRootOptions);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["adoptStyles"])(renderRoot, this.constructor.elementStyles);
        return renderRoot;
    }
    /**
     * On first connection, creates the element's renderRoot, sets up
     * element styling, and enables updating.
     * @category lifecycle
     */ connectedCallback() {
        var _this___controllers;
        var _this_renderRoot;
        // Create renderRoot before controllers `hostConnected`
        (_this_renderRoot = this.renderRoot) !== null && _this_renderRoot !== void 0 ? _this_renderRoot : this.renderRoot = this.createRenderRoot();
        this.enableUpdating(true);
        (_this___controllers = this.__controllers) === null || _this___controllers === void 0 ? void 0 : _this___controllers.forEach((c)=>{
            var _c_hostConnected;
            return (_c_hostConnected = c.hostConnected) === null || _c_hostConnected === void 0 ? void 0 : _c_hostConnected.call(c);
        });
    }
    /**
     * Note, this method should be considered final and not overridden. It is
     * overridden on the element instance with a function that triggers the first
     * update.
     * @category updates
     */ enableUpdating(_requestedUpdate) {}
    /**
     * Allows for `super.disconnectedCallback()` in extensions while
     * reserving the possibility of making non-breaking feature additions
     * when disconnecting at some point in the future.
     * @category lifecycle
     */ disconnectedCallback() {
        var _this___controllers;
        (_this___controllers = this.__controllers) === null || _this___controllers === void 0 ? void 0 : _this___controllers.forEach((c)=>{
            var _c_hostDisconnected;
            return (_c_hostDisconnected = c.hostDisconnected) === null || _c_hostDisconnected === void 0 ? void 0 : _c_hostDisconnected.call(c);
        });
    }
    /**
     * Synchronizes property values when attributes change.
     *
     * Specifically, when an attribute is set, the corresponding property is set.
     * You should rarely need to implement this callback. If this method is
     * overridden, `super.attributeChangedCallback(name, _old, value)` must be
     * called.
     *
     * See [responding to attribute changes](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#responding_to_attribute_changes)
     * on MDN for more information about the `attributeChangedCallback`.
     * @category attributes
     */ attributeChangedCallback(name, _old, value) {
        this._$attributeToProperty(name, value);
    }
    __propertyToAttribute(name, value) {
        const elemProperties = this.constructor.elementProperties;
        const options = elemProperties.get(name);
        const attr = this.constructor.__attributeNameForProperty(name, options);
        if (attr !== undefined && options.reflect === true) {
            var _options_converter;
            const converter = ((_options_converter = options.converter) === null || _options_converter === void 0 ? void 0 : _options_converter.toAttribute) !== undefined ? options.converter : defaultConverter;
            const attrValue = converter.toAttribute(value, options.type);
            if (DEV_MODE && this.constructor.enabledWarnings.includes('migration') && attrValue === undefined) {
                issueWarning('undefined-attribute-value', "The attribute value for the ".concat(name, " property is ") + "undefined on element ".concat(this.localName, ". The attribute will be ") + "removed, but in the previous version of `ReactiveElement`, " + "the attribute would not have changed.");
            }
            // Track if the property is being reflected to avoid
            // setting the property again via `attributeChangedCallback`. Note:
            // 1. this takes advantage of the fact that the callback is synchronous.
            // 2. will behave incorrectly if multiple attributes are in the reaction
            // stack at time of calling. However, since we process attributes
            // in `update` this should not be possible (or an extreme corner case
            // that we'd like to discover).
            // mark state reflecting
            this.__reflectingProperty = name;
            if (attrValue == null) {
                this.removeAttribute(attr);
            } else {
                this.setAttribute(attr, attrValue);
            }
            // mark state not reflecting
            this.__reflectingProperty = null;
        }
    }
    /** @internal */ _$attributeToProperty(name, value) {
        const ctor = this.constructor;
        // Note, hint this as an `AttributeMap` so closure clearly understands
        // the type; it has issues with tracking types through statics
        const propName = ctor.__attributeToPropertyMap.get(name);
        // Use tracking info to avoid reflecting a property value to an attribute
        // if it was just set because the attribute changed.
        if (propName !== undefined && this.__reflectingProperty !== propName) {
            var _options_converter, _this___defaultValues;
            const options = ctor.getPropertyOptions(propName);
            const converter = typeof options.converter === 'function' ? {
                fromAttribute: options.converter
            } : ((_options_converter = options.converter) === null || _options_converter === void 0 ? void 0 : _options_converter.fromAttribute) !== undefined ? options.converter : defaultConverter;
            // mark state reflecting
            this.__reflectingProperty = propName;
            const convertedValue = converter.fromAttribute(value, options.type);
            var _ref;
            this[propName] = (_ref = convertedValue !== null && convertedValue !== void 0 ? convertedValue : (_this___defaultValues = this.__defaultValues) === null || _this___defaultValues === void 0 ? void 0 : _this___defaultValues.get(propName)) !== null && _ref !== void 0 ? _ref : // eslint-disable-next-line @typescript-eslint/no-explicit-any
            convertedValue;
            // mark state not reflecting
            this.__reflectingProperty = null;
        }
    }
    /**
     * Requests an update which is processed asynchronously. This should be called
     * when an element should update based on some state not triggered by setting
     * a reactive property. In this case, pass no arguments. It should also be
     * called when manually implementing a property setter. In this case, pass the
     * property `name` and `oldValue` to ensure that any configured property
     * options are honored.
     *
     * @param name name of requesting property
     * @param oldValue old value of requesting property
     * @param options property options to use instead of the previously
     *     configured options
     * @category updates
     */ requestUpdate(name, oldValue, options) {
        // If we have a property key, perform property update steps.
        if (name !== undefined) {
            var _this___defaultValues;
            if (DEV_MODE && name instanceof Event) {
                issueWarning("", "The requestUpdate() method was called with an Event as the property name. This is probably a mistake caused by binding this.requestUpdate as an event listener. Instead bind a function that will call it with no arguments: () => this.requestUpdate()");
            }
            const ctor = this.constructor;
            const newValue = this[name];
            options !== null && options !== void 0 ? options : options = ctor.getPropertyOptions(name);
            var _options_hasChanged;
            const changed = ((_options_hasChanged = options.hasChanged) !== null && _options_hasChanged !== void 0 ? _options_hasChanged : notEqual)(newValue, oldValue) || options.useDefault && options.reflect && newValue === ((_this___defaultValues = this.__defaultValues) === null || _this___defaultValues === void 0 ? void 0 : _this___defaultValues.get(name)) && !this.hasAttribute(ctor.__attributeNameForProperty(name, options));
            if (changed) {
                this._$changeProperty(name, oldValue, options);
            } else {
                // Abort the request if the property should not be considered changed.
                return;
            }
        }
        if (this.isUpdatePending === false) {
            this.__updatePromise = this.__enqueueUpdate();
        }
    }
    /**
     * @internal
     */ _$changeProperty(name, oldValue, param, initializeValue) {
        let { useDefault, reflect, wrapped } = param;
        var _this___defaultValues;
        // Record default value when useDefault is used. This allows us to
        // restore this value when the attribute is removed.
        if (useDefault && !((_this___defaultValues = this.__defaultValues) !== null && _this___defaultValues !== void 0 ? _this___defaultValues : this.__defaultValues = new Map()).has(name)) {
            var _ref;
            this.__defaultValues.set(name, (_ref = initializeValue !== null && initializeValue !== void 0 ? initializeValue : oldValue) !== null && _ref !== void 0 ? _ref : this[name]);
            // if this is not wrapping an accessor, it must be an initial setting
            // and in this case we do not want to record the change or reflect.
            if (wrapped !== true || initializeValue !== undefined) {
                return;
            }
        }
        // TODO (justinfagnani): Create a benchmark of Map.has() + Map.set(
        // vs just Map.set()
        if (!this._$changedProperties.has(name)) {
            // On the initial change, the old value should be `undefined`, except
            // with `useDefault`
            if (!this.hasUpdated && !useDefault) {
                oldValue = undefined;
            }
            this._$changedProperties.set(name, oldValue);
        }
        // Add to reflecting properties set.
        // Note, it's important that every change has a chance to add the
        // property to `__reflectingProperties`. This ensures setting
        // attribute + property reflects correctly.
        if (reflect === true && this.__reflectingProperty !== name) {
            var _this___reflectingProperties;
            ((_this___reflectingProperties = this.__reflectingProperties) !== null && _this___reflectingProperties !== void 0 ? _this___reflectingProperties : this.__reflectingProperties = new Set()).add(name);
        }
    }
    /**
     * Sets up the element to asynchronously update.
     */ async __enqueueUpdate() {
        this.isUpdatePending = true;
        try {
            // Ensure any previous update has resolved before updating.
            // This `await` also ensures that property changes are batched.
            await this.__updatePromise;
        } catch (e) {
            // Refire any previous errors async so they do not disrupt the update
            // cycle. Errors are refired so developers have a chance to observe
            // them, and this can be done by implementing
            // `window.onunhandledrejection`.
            Promise.reject(e);
        }
        const result = this.scheduleUpdate();
        // If `scheduleUpdate` returns a Promise, we await it. This is done to
        // enable coordinating updates with a scheduler. Note, the result is
        // checked to avoid delaying an additional microtask unless we need to.
        if (result != null) {
            await result;
        }
        return !this.isUpdatePending;
    }
    /**
     * Schedules an element update. You can override this method to change the
     * timing of updates by returning a Promise. The update will await the
     * returned Promise, and you should resolve the Promise to allow the update
     * to proceed. If this method is overridden, `super.scheduleUpdate()`
     * must be called.
     *
     * For instance, to schedule updates to occur just before the next frame:
     *
     * ```ts
     * override protected async scheduleUpdate(): Promise<unknown> {
     *   await new Promise((resolve) => requestAnimationFrame(() => resolve()));
     *   super.scheduleUpdate();
     * }
     * ```
     * @category updates
     */ scheduleUpdate() {
        const result = this.performUpdate();
        if (DEV_MODE && this.constructor.enabledWarnings.includes('async-perform-update') && typeof (result === null || result === void 0 ? void 0 : result.then) === 'function') {
            issueWarning('async-perform-update', "Element ".concat(this.localName, " returned a Promise from performUpdate(). ") + "This behavior is deprecated and will be removed in a future " + "version of ReactiveElement.");
        }
        return result;
    }
    /**
     * Performs an element update. Note, if an exception is thrown during the
     * update, `firstUpdated` and `updated` will not be called.
     *
     * Call `performUpdate()` to immediately process a pending update. This should
     * generally not be needed, but it can be done in rare cases when you need to
     * update synchronously.
     *
     * @category updates
     */ performUpdate() {
        // Abort any update if one is not pending when this is called.
        // This can happen if `performUpdate` is called early to "flush"
        // the update.
        if (!this.isUpdatePending) {
            return;
        }
        debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
            kind: 'update'
        });
        if (!this.hasUpdated) {
            var _this_renderRoot;
            // Create renderRoot before first update. This occurs in `connectedCallback`
            // but is done here to support out of tree calls to `enableUpdating`/`performUpdate`.
            (_this_renderRoot = this.renderRoot) !== null && _this_renderRoot !== void 0 ? _this_renderRoot : this.renderRoot = this.createRenderRoot();
            if ("TURBOPACK compile-time truthy", 1) {
                // Produce warning if any reactive properties on the prototype are
                // shadowed by class fields. Instance fields set before upgrade are
                // deleted by this point, so any own property is caused by class field
                // initialization in the constructor.
                const ctor = this.constructor;
                const shadowedProperties = [
                    ...ctor.elementProperties.keys()
                ].filter((p)=>this.hasOwnProperty(p) && p in getPrototypeOf(this));
                if (shadowedProperties.length) {
                    throw new Error("The following properties on element ".concat(this.localName, " will not ") + "trigger updates as expected because they are set using class " + "fields: ".concat(shadowedProperties.join(', '), ". ") + "Native class fields and some compiled output will overwrite " + "accessors used for detecting changes. See " + "https://lit.dev/msg/class-field-shadowing " + "for more information.");
                }
            }
            // Mixin instance properties once, if they exist.
            if (this.__instanceProperties) {
                // TODO (justinfagnani): should we use the stored value? Could a new value
                // have been set since we stored the own property value?
                for (const [p, value] of this.__instanceProperties){
                    this[p] = value;
                }
                this.__instanceProperties = undefined;
            }
            // Trigger initial value reflection and populate the initial
            // `changedProperties` map, but only for the case of properties created
            // via `createProperty` on accessors, which will not have already
            // populated the `changedProperties` map since they are not set.
            // We can't know if these accessors had initializers, so we just set
            // them anyway - a difference from experimental decorators on fields and
            // standard decorators on auto-accessors.
            // For context see:
            // https://github.com/lit/lit/pull/4183#issuecomment-1711959635
            const elementProperties = this.constructor.elementProperties;
            if (elementProperties.size > 0) {
                for (const [p, options] of elementProperties){
                    const { wrapped } = options;
                    const value = this[p];
                    if (wrapped === true && !this._$changedProperties.has(p) && value !== undefined) {
                        this._$changeProperty(p, undefined, options, value);
                    }
                }
            }
        }
        let shouldUpdate = false;
        const changedProperties = this._$changedProperties;
        try {
            shouldUpdate = this.shouldUpdate(changedProperties);
            if (shouldUpdate) {
                var _this___controllers;
                this.willUpdate(changedProperties);
                (_this___controllers = this.__controllers) === null || _this___controllers === void 0 ? void 0 : _this___controllers.forEach((c)=>{
                    var _c_hostUpdate;
                    return (_c_hostUpdate = c.hostUpdate) === null || _c_hostUpdate === void 0 ? void 0 : _c_hostUpdate.call(c);
                });
                this.update(changedProperties);
            } else {
                this.__markUpdated();
            }
        } catch (e) {
            // Prevent `firstUpdated` and `updated` from running when there's an
            // update exception.
            shouldUpdate = false;
            // Ensure element can accept additional updates after an exception.
            this.__markUpdated();
            throw e;
        }
        // The update is no longer considered pending and further updates are now allowed.
        if (shouldUpdate) {
            this._$didUpdate(changedProperties);
        }
    }
    /**
     * Invoked before `update()` to compute values needed during the update.
     *
     * Implement `willUpdate` to compute property values that depend on other
     * properties and are used in the rest of the update process.
     *
     * ```ts
     * willUpdate(changedProperties) {
     *   // only need to check changed properties for an expensive computation.
     *   if (changedProperties.has('firstName') || changedProperties.has('lastName')) {
     *     this.sha = computeSHA(`${this.firstName} ${this.lastName}`);
     *   }
     * }
     *
     * render() {
     *   return html`SHA: ${this.sha}`;
     * }
     * ```
     *
     * @category updates
     */ willUpdate(_changedProperties) {}
    // Note, this is an override point for polyfill-support.
    // @internal
    _$didUpdate(changedProperties) {
        var _this___controllers;
        (_this___controllers = this.__controllers) === null || _this___controllers === void 0 ? void 0 : _this___controllers.forEach((c)=>{
            var _c_hostUpdated;
            return (_c_hostUpdated = c.hostUpdated) === null || _c_hostUpdated === void 0 ? void 0 : _c_hostUpdated.call(c);
        });
        if (!this.hasUpdated) {
            this.hasUpdated = true;
            this.firstUpdated(changedProperties);
        }
        this.updated(changedProperties);
        if (DEV_MODE && this.isUpdatePending && this.constructor.enabledWarnings.includes('change-in-update')) {
            issueWarning('change-in-update', "Element ".concat(this.localName, " scheduled an update ") + "(generally because a property was set) " + "after an update completed, causing a new update to be scheduled. " + "This is inefficient and should be avoided unless the next update " + "can only be scheduled as a side effect of the previous update.");
        }
    }
    __markUpdated() {
        this._$changedProperties = new Map();
        this.isUpdatePending = false;
    }
    /**
     * Returns a Promise that resolves when the element has completed updating.
     * The Promise value is a boolean that is `true` if the element completed the
     * update without triggering another update. The Promise result is `false` if
     * a property was set inside `updated()`. If the Promise is rejected, an
     * exception was thrown during the update.
     *
     * To await additional asynchronous work, override the `getUpdateComplete`
     * method. For example, it is sometimes useful to await a rendered element
     * before fulfilling this Promise. To do this, first await
     * `super.getUpdateComplete()`, then any subsequent state.
     *
     * @return A promise of a boolean that resolves to true if the update completed
     *     without triggering another update.
     * @category updates
     */ get updateComplete() {
        return this.getUpdateComplete();
    }
    /**
     * Override point for the `updateComplete` promise.
     *
     * It is not safe to override the `updateComplete` getter directly due to a
     * limitation in TypeScript which means it is not possible to call a
     * superclass getter (e.g. `super.updateComplete.then(...)`) when the target
     * language is ES5 (https://github.com/microsoft/TypeScript/issues/338).
     * This method should be overridden instead. For example:
     *
     * ```ts
     * class MyElement extends LitElement {
     *   override async getUpdateComplete() {
     *     const result = await super.getUpdateComplete();
     *     await this._myChild.updateComplete;
     *     return result;
     *   }
     * }
     * ```
     *
     * @return A promise of a boolean that resolves to true if the update completed
     *     without triggering another update.
     * @category updates
     */ getUpdateComplete() {
        return this.__updatePromise;
    }
    /**
     * Controls whether or not `update()` should be called when the element requests
     * an update. By default, this method always returns `true`, but this can be
     * customized to control when to update.
     *
     * @param _changedProperties Map of changed properties with old values
     * @category updates
     */ shouldUpdate(_changedProperties) {
        return true;
    }
    /**
     * Updates the element. This method reflects property values to attributes.
     * It can be overridden to render and keep updated element DOM.
     * Setting properties inside this method will *not* trigger
     * another update.
     *
     * @param _changedProperties Map of changed properties with old values
     * @category updates
     */ update(_changedProperties) {
        // The forEach() expression will only run when __reflectingProperties is
        // defined, and it returns undefined, setting __reflectingProperties to
        // undefined
        this.__reflectingProperties && (this.__reflectingProperties = this.__reflectingProperties.forEach((p)=>this.__propertyToAttribute(p, this[p])));
        this.__markUpdated();
    }
    /**
     * Invoked whenever the element is updated. Implement to perform
     * post-updating tasks via DOM APIs, for example, focusing an element.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * @param _changedProperties Map of changed properties with old values
     * @category updates
     */ updated(_changedProperties) {}
    /**
     * Invoked when the element is first updated. Implement to perform one time
     * work on the element after update.
     *
     * ```ts
     * firstUpdated() {
     *   this.renderRoot.getElementById('my-text-area').focus();
     * }
     * ```
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * @param _changedProperties Map of changed properties with old values
     * @category updates
     */ firstUpdated(_changedProperties) {}
    constructor(){
        super();
        this.__instanceProperties = undefined;
        /**
         * True if there is a pending update as a result of calling `requestUpdate()`.
         * Should only be read.
         * @category updates
         */ this.isUpdatePending = false;
        /**
         * Is set to `true` after the first update. The element code cannot assume
         * that `renderRoot` exists before the element `hasUpdated`.
         * @category updates
         */ this.hasUpdated = false;
        /**
         * Name of currently reflecting property
         */ this.__reflectingProperty = null;
        this.__initialize();
    }
}
/**
 * Memoized list of all element styles.
 * Created lazily on user subclasses when finalizing the class.
 * @nocollapse
 * @category styles
 */ ReactiveElement.elementStyles = [];
/**
 * Options used when calling `attachShadow`. Set this property to customize
 * the options for the shadowRoot; for example, to create a closed
 * shadowRoot: `{mode: 'closed'}`.
 *
 * Note, these options are used in `createRenderRoot`. If this method
 * is customized, options should be respected if possible.
 * @nocollapse
 * @category rendering
 */ ReactiveElement.shadowRootOptions = {
    mode: 'open'
};
// Assigned here to work around a jscompiler bug with static fields
// when compiling to ES5.
// https://github.com/google/closure-compiler/issues/3177
ReactiveElement[JSCompiler_renameProperty('elementProperties', ReactiveElement)] = new Map();
ReactiveElement[JSCompiler_renameProperty('finalized', ReactiveElement)] = new Map();
// Apply polyfills if available
polyfillSupport === null || polyfillSupport === void 0 ? void 0 : polyfillSupport({
    ReactiveElement
});
// Dev mode warnings...
if ("TURBOPACK compile-time truthy", 1) {
    // Default warning set.
    ReactiveElement.enabledWarnings = [
        'change-in-update',
        'async-perform-update'
    ];
    const ensureOwnWarnings = function(ctor) {
        if (!ctor.hasOwnProperty(JSCompiler_renameProperty('enabledWarnings', ctor))) {
            ctor.enabledWarnings = ctor.enabledWarnings.slice();
        }
    };
    ReactiveElement.enableWarning = function(warning) {
        ensureOwnWarnings(this);
        if (!this.enabledWarnings.includes(warning)) {
            this.enabledWarnings.push(warning);
        }
    };
    ReactiveElement.disableWarning = function(warning) {
        ensureOwnWarnings(this);
        const i = this.enabledWarnings.indexOf(warning);
        if (i >= 0) {
            this.enabledWarnings.splice(i, 1);
        }
    };
}
var _reactiveElementVersions;
// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for ReactiveElement usage.
((_reactiveElementVersions = (_global1 = global).reactiveElementVersions) !== null && _reactiveElementVersions !== void 0 ? _reactiveElementVersions : _global1.reactiveElementVersions = []).push('2.1.1');
if (DEV_MODE && global.reactiveElementVersions.length > 1) {
    queueMicrotask(()=>{
        issueWarning('multiple-versions', "Multiple versions of Lit loaded. Loading multiple versions " + "is not recommended.");
    });
} //# sourceMappingURL=reactive-element.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/@lit/reactive-element/development/reactive-element.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CSSResult",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CSSResult"],
    "ReactiveElement",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ReactiveElement"],
    "adoptStyles",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["adoptStyles"],
    "css",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["css"],
    "defaultConverter",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["defaultConverter"],
    "getCompatibleStyle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCompatibleStyle"],
    "notEqual",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["notEqual"],
    "supportsAdoptingStyleSheets",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supportsAdoptingStyleSheets"],
    "unsafeCSS",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["unsafeCSS"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/@lit/reactive-element/development/reactive-element.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/@lit/reactive-element/development/css-tag.js [app-client] (ecmascript)");
}),
"[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/@lit/reactive-element/development/decorators/custom-element.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ /**
 * Class decorator factory that defines the decorated class as a custom element.
 *
 * ```js
 * @customElement('my-element')
 * class MyElement extends LitElement {
 *   render() {
 *     return html``;
 *   }
 * }
 * ```
 * @category Decorator
 * @param tagName The tag name of the custom element to define.
 */ __turbopack_context__.s([
    "customElement",
    ()=>customElement
]);
const customElement = (tagName)=>(classOrTarget, context)=>{
        if (context !== undefined) {
            context.addInitializer(()=>{
                customElements.define(tagName, classOrTarget);
            });
        } else {
            customElements.define(tagName, classOrTarget);
        }
    }; //# sourceMappingURL=custom-element.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/@lit/reactive-element/development/decorators/property.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ /*
 * IMPORTANT: For compatibility with tsickle and the Closure JS compiler, all
 * property decorators (but not class decorators) in this file that have
 * an @ExportDecoratedItems annotation must be defined as a regular function,
 * not an arrow function.
 */ __turbopack_context__.s([
    "property",
    ()=>property,
    "standardProperty",
    ()=>standardProperty
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/@lit/reactive-element/development/reactive-element.js [app-client] (ecmascript) <locals>");
;
const DEV_MODE = true;
let issueWarning;
if ("TURBOPACK compile-time truthy", 1) {
    var // Ensure warnings are issued only 1x, even if multiple versions of Lit
    // are loaded.
    _globalThis;
    var _litIssuedWarnings;
    (_litIssuedWarnings = (_globalThis = globalThis).litIssuedWarnings) !== null && _litIssuedWarnings !== void 0 ? _litIssuedWarnings : _globalThis.litIssuedWarnings = new Set();
    /**
     * Issue a warning if we haven't already, based either on `code` or `warning`.
     * Warnings are disabled automatically only by `warning`; disabling via `code`
     * can be done by users.
     */ issueWarning = (code, warning)=>{
        warning += " See https://lit.dev/msg/".concat(code, " for more information.");
        if (!globalThis.litIssuedWarnings.has(warning) && !globalThis.litIssuedWarnings.has(code)) {
            console.warn(warning);
            globalThis.litIssuedWarnings.add(warning);
        }
    };
}
const legacyProperty = (options, proto, name)=>{
    const hasOwnProperty = proto.hasOwnProperty(name);
    proto.constructor.createProperty(name, options);
    // For accessors (which have a descriptor on the prototype) we need to
    // return a descriptor, otherwise TypeScript overwrites the descriptor we
    // define in createProperty() with the original descriptor. We don't do this
    // for fields, which don't have a descriptor, because this could overwrite
    // descriptor defined by other decorators.
    return hasOwnProperty ? Object.getOwnPropertyDescriptor(proto, name) : undefined;
};
// This is duplicated from a similar variable in reactive-element.ts, but
// actually makes sense to have this default defined with the decorator, so
// that different decorators could have different defaults.
const defaultPropertyDeclaration = {
    attribute: true,
    type: String,
    converter: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["defaultConverter"],
    reflect: false,
    hasChanged: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["notEqual"]
};
const standardProperty = function() {
    let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : defaultPropertyDeclaration, target = arguments.length > 1 ? arguments[1] : void 0, context = arguments.length > 2 ? arguments[2] : void 0;
    const { kind, metadata } = context;
    if (DEV_MODE && metadata == null) {
        issueWarning('missing-class-metadata', "The class ".concat(target, " is missing decorator metadata. This ") + "could mean that you're using a compiler that supports decorators " + "but doesn't support decorator metadata, such as TypeScript 5.1. " + "Please update your compiler.");
    }
    // Store the property options
    let properties = globalThis.litPropertyMetadata.get(metadata);
    if (properties === undefined) {
        globalThis.litPropertyMetadata.set(metadata, properties = new Map());
    }
    if (kind === 'setter') {
        options = Object.create(options);
        options.wrapped = true;
    }
    properties.set(context.name, options);
    if (kind === 'accessor') {
        // Standard decorators cannot dynamically modify the class, so we can't
        // replace a field with accessors. The user must use the new `accessor`
        // keyword instead.
        const { name } = context;
        return {
            set (v) {
                const oldValue = target.get.call(this);
                target.set.call(this, v);
                this.requestUpdate(name, oldValue, options);
            },
            init (v) {
                if (v !== undefined) {
                    this._$changeProperty(name, undefined, options, v);
                }
                return v;
            }
        };
    } else if (kind === 'setter') {
        const { name } = context;
        return function(value) {
            const oldValue = this[name];
            target.call(this, value);
            this.requestUpdate(name, oldValue, options);
        };
    }
    throw new Error("Unsupported decorator location: ".concat(kind));
};
function property(options) {
    return (protoOrTarget, nameOrContext)=>{
        return typeof nameOrContext === 'object' ? standardProperty(options, protoOrTarget, nameOrContext) : legacyProperty(options, protoOrTarget, nameOrContext);
    };
} //# sourceMappingURL=property.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/@lit/reactive-element/development/decorators/state.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ /*
 * IMPORTANT: For compatibility with tsickle and the Closure JS compiler, all
 * property decorators (but not class decorators) in this file that have
 * an @ExportDecoratedItems annotation must be defined as a regular function,
 * not an arrow function.
 */ __turbopack_context__.s([
    "state",
    ()=>state
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/@lit/reactive-element/development/decorators/property.js [app-client] (ecmascript)");
;
function state(options) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])({
        ...options,
        // Add both `state` and `attribute` because we found a third party
        // controller that is keying off of PropertyOptions.state to determine
        // whether a field is a private internal property or not.
        state: true,
        attribute: false
    });
} //# sourceMappingURL=state.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/@lit/reactive-element/development/decorators/event-options.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ /**
 * Adds event listener options to a method used as an event listener in a
 * lit-html template.
 *
 * @param options An object that specifies event listener options as accepted by
 * `EventTarget#addEventListener` and `EventTarget#removeEventListener`.
 *
 * Current browsers support the `capture`, `passive`, and `once` options. See:
 * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Parameters
 *
 * ```ts
 * class MyElement {
 *   clicked = false;
 *
 *   render() {
 *     return html`
 *       <div @click=${this._onClick}>
 *         <button></button>
 *       </div>
 *     `;
 *   }
 *
 *   @eventOptions({capture: true})
 *   _onClick(e) {
 *     this.clicked = true;
 *   }
 * }
 * ```
 * @category Decorator
 */ __turbopack_context__.s([
    "eventOptions",
    ()=>eventOptions
]);
function eventOptions(options) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (protoOrValue, nameOrContext)=>{
        const method = typeof protoOrValue === 'function' ? protoOrValue : protoOrValue[nameOrContext];
        Object.assign(method, options);
    };
} //# sourceMappingURL=event-options.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/@lit/reactive-element/development/decorators/base.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ /**
 * Wraps up a few best practices when returning a property descriptor from a
 * decorator.
 *
 * Marks the defined property as configurable, and enumerable, and handles
 * the case where we have a busted Reflect.decorate zombiefill (e.g. in Angular
 * apps).
 *
 * @internal
 */ __turbopack_context__.s([
    "desc",
    ()=>desc
]);
const desc = (obj, name, descriptor)=>{
    // For backwards compatibility, we keep them configurable and enumerable.
    descriptor.configurable = true;
    descriptor.enumerable = true;
    if (// We check for Reflect.decorate each time, in case the zombiefill
    // is applied via lazy loading some Angular code.
    Reflect.decorate && typeof name !== 'object') {
        // If we're called as a legacy decorator, and Reflect.decorate is present
        // then we have no guarantees that the returned descriptor will be
        // defined on the class, so we must apply it directly ourselves.
        Object.defineProperty(obj, name, descriptor);
    }
    return descriptor;
}; //# sourceMappingURL=base.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/@lit/reactive-element/development/decorators/query.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ __turbopack_context__.s([
    "query",
    ()=>query
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/@lit/reactive-element/development/decorators/base.js [app-client] (ecmascript)");
;
const DEV_MODE = true;
let issueWarning;
if ("TURBOPACK compile-time truthy", 1) {
    var // Ensure warnings are issued only 1x, even if multiple versions of Lit
    // are loaded.
    _globalThis;
    var _litIssuedWarnings;
    (_litIssuedWarnings = (_globalThis = globalThis).litIssuedWarnings) !== null && _litIssuedWarnings !== void 0 ? _litIssuedWarnings : _globalThis.litIssuedWarnings = new Set();
    /**
     * Issue a warning if we haven't already, based either on `code` or `warning`.
     * Warnings are disabled automatically only by `warning`; disabling via `code`
     * can be done by users.
     */ issueWarning = (code, warning)=>{
        warning += code ? " See https://lit.dev/msg/".concat(code, " for more information.") : '';
        if (!globalThis.litIssuedWarnings.has(warning) && !globalThis.litIssuedWarnings.has(code)) {
            console.warn(warning);
            globalThis.litIssuedWarnings.add(warning);
        }
    };
}
function query(selector, cache) {
    return (protoOrTarget, nameOrContext, descriptor)=>{
        const doQuery = (el)=>{
            var _el_renderRoot;
            var _el_renderRoot_querySelector;
            const result = (_el_renderRoot_querySelector = (_el_renderRoot = el.renderRoot) === null || _el_renderRoot === void 0 ? void 0 : _el_renderRoot.querySelector(selector)) !== null && _el_renderRoot_querySelector !== void 0 ? _el_renderRoot_querySelector : null;
            if (DEV_MODE && result === null && cache && !el.hasUpdated) {
                const name = typeof nameOrContext === 'object' ? nameOrContext.name : nameOrContext;
                issueWarning('', "@query'd field ".concat(JSON.stringify(String(name)), " with the 'cache' ") + "flag set for selector '".concat(selector, "' has been accessed before ") + "the first update and returned null. This is expected if the " + "renderRoot tree has not been provided beforehand (e.g. via " + "Declarative Shadow DOM). Therefore the value hasn't been cached.");
            }
            // TODO: if we want to allow users to assert that the query will never
            // return null, we need a new option and to throw here if the result
            // is null.
            return result;
        };
        if (cache) {
            // Accessors to wrap from either:
            //   1. The decorator target, in the case of standard decorators
            //   2. The property descriptor, in the case of experimental decorators
            //      on auto-accessors.
            //   3. Functions that access our own cache-key property on the instance,
            //      in the case of experimental decorators on fields.
            const { get, set } = typeof nameOrContext === 'object' ? protoOrTarget : descriptor !== null && descriptor !== void 0 ? descriptor : (()=>{
                const key = ("TURBOPACK compile-time truthy", 1) ? Symbol("".concat(String(nameOrContext), " (@query() cache)")) : "TURBOPACK unreachable";
                return {
                    get () {
                        return this[key];
                    },
                    set (v) {
                        this[key] = v;
                    }
                };
            })();
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["desc"])(protoOrTarget, nameOrContext, {
                get () {
                    let result = get.call(this);
                    if (result === undefined) {
                        result = doQuery(this);
                        if (result !== null || this.hasUpdated) {
                            set.call(this, result);
                        }
                    }
                    return result;
                }
            });
        } else {
            // This object works as the return type for both standard and
            // experimental decorators.
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["desc"])(protoOrTarget, nameOrContext, {
                get () {
                    return doQuery(this);
                }
            });
        }
    };
} //# sourceMappingURL=query.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/@lit/reactive-element/development/decorators/query-all.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ __turbopack_context__.s([
    "queryAll",
    ()=>queryAll
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/@lit/reactive-element/development/decorators/base.js [app-client] (ecmascript)");
;
// Shared fragment used to generate empty NodeLists when a render root is
// undefined
let fragment;
function queryAll(selector) {
    return (obj, name)=>{
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["desc"])(obj, name, {
            get () {
                var _this_renderRoot;
                const container = (_this_renderRoot = this.renderRoot) !== null && _this_renderRoot !== void 0 ? _this_renderRoot : fragment !== null && fragment !== void 0 ? fragment : fragment = document.createDocumentFragment();
                return container.querySelectorAll(selector);
            }
        });
    };
} //# sourceMappingURL=query-all.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/@lit/reactive-element/development/decorators/query-async.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ __turbopack_context__.s([
    "queryAsync",
    ()=>queryAsync
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/@lit/reactive-element/development/decorators/base.js [app-client] (ecmascript)");
;
function queryAsync(selector) {
    return (obj, name)=>{
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["desc"])(obj, name, {
            async get () {
                var _this_renderRoot;
                await this.updateComplete;
                var _this_renderRoot_querySelector;
                return (_this_renderRoot_querySelector = (_this_renderRoot = this.renderRoot) === null || _this_renderRoot === void 0 ? void 0 : _this_renderRoot.querySelector(selector)) !== null && _this_renderRoot_querySelector !== void 0 ? _this_renderRoot_querySelector : null;
            }
        });
    };
} //# sourceMappingURL=query-async.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/@lit/reactive-element/development/decorators/query-assigned-elements.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ __turbopack_context__.s([
    "queryAssignedElements",
    ()=>queryAssignedElements
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/@lit/reactive-element/development/decorators/base.js [app-client] (ecmascript)");
;
function queryAssignedElements(options) {
    return (obj, name)=>{
        const { slot, selector } = options !== null && options !== void 0 ? options : {};
        const slotSelector = "slot".concat(slot ? "[name=".concat(slot, "]") : ':not([name])');
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["desc"])(obj, name, {
            get () {
                var _this_renderRoot;
                const slotEl = (_this_renderRoot = this.renderRoot) === null || _this_renderRoot === void 0 ? void 0 : _this_renderRoot.querySelector(slotSelector);
                var _slotEl_assignedElements;
                const elements = (_slotEl_assignedElements = slotEl === null || slotEl === void 0 ? void 0 : slotEl.assignedElements(options)) !== null && _slotEl_assignedElements !== void 0 ? _slotEl_assignedElements : [];
                return selector === undefined ? elements : elements.filter((node)=>node.matches(selector));
            }
        });
    };
} //# sourceMappingURL=query-assigned-elements.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/@lit/reactive-element/development/decorators/query-assigned-nodes.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ __turbopack_context__.s([
    "queryAssignedNodes",
    ()=>queryAssignedNodes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/@lit/reactive-element/development/decorators/base.js [app-client] (ecmascript)");
;
function queryAssignedNodes(options) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (obj, name)=>{
        const { slot } = options !== null && options !== void 0 ? options : {};
        const slotSelector = "slot".concat(slot ? "[name=".concat(slot, "]") : ':not([name])');
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["desc"])(obj, name, {
            get () {
                var _this_renderRoot;
                const slotEl = (_this_renderRoot = this.renderRoot) === null || _this_renderRoot === void 0 ? void 0 : _this_renderRoot.querySelector(slotSelector);
                var _slotEl_assignedNodes;
                return (_slotEl_assignedNodes = slotEl === null || slotEl === void 0 ? void 0 : slotEl.assignedNodes(options)) !== null && _slotEl_assignedNodes !== void 0 ? _slotEl_assignedNodes : [];
            }
        });
    };
} //# sourceMappingURL=query-assigned-nodes.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/reactive-element.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CSSResult",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CSSResult"],
    "ReactiveElement",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ReactiveElement"],
    "adoptStyles",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["adoptStyles"],
    "css",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["css"],
    "defaultConverter",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["defaultConverter"],
    "getCompatibleStyle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCompatibleStyle"],
    "notEqual",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["notEqual"],
    "supportsAdoptingStyleSheets",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supportsAdoptingStyleSheets"],
    "unsafeCSS",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["unsafeCSS"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/reactive-element.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/css-tag.js [app-client] (ecmascript)");
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/decorators/custom-element.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ /**
 * Class decorator factory that defines the decorated class as a custom element.
 *
 * ```js
 * @customElement('my-element')
 * class MyElement extends LitElement {
 *   render() {
 *     return html``;
 *   }
 * }
 * ```
 * @category Decorator
 * @param tagName The tag name of the custom element to define.
 */ __turbopack_context__.s([
    "customElement",
    ()=>customElement
]);
const customElement = (tagName)=>(classOrTarget, context)=>{
        if (context !== undefined) {
            context.addInitializer(()=>{
                customElements.define(tagName, classOrTarget);
            });
        } else {
            customElements.define(tagName, classOrTarget);
        }
    }; //# sourceMappingURL=custom-element.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/decorators/property.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ /*
 * IMPORTANT: For compatibility with tsickle and the Closure JS compiler, all
 * property decorators (but not class decorators) in this file that have
 * an @ExportDecoratedItems annotation must be defined as a regular function,
 * not an arrow function.
 */ __turbopack_context__.s([
    "property",
    ()=>property,
    "standardProperty",
    ()=>standardProperty
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/reactive-element.js [app-client] (ecmascript) <locals>");
;
const DEV_MODE = true;
let issueWarning;
if ("TURBOPACK compile-time truthy", 1) {
    var // Ensure warnings are issued only 1x, even if multiple versions of Lit
    // are loaded.
    _globalThis;
    var _litIssuedWarnings;
    (_litIssuedWarnings = (_globalThis = globalThis).litIssuedWarnings) !== null && _litIssuedWarnings !== void 0 ? _litIssuedWarnings : _globalThis.litIssuedWarnings = new Set();
    /**
     * Issue a warning if we haven't already, based either on `code` or `warning`.
     * Warnings are disabled automatically only by `warning`; disabling via `code`
     * can be done by users.
     */ issueWarning = (code, warning)=>{
        warning += " See https://lit.dev/msg/".concat(code, " for more information.");
        if (!globalThis.litIssuedWarnings.has(warning) && !globalThis.litIssuedWarnings.has(code)) {
            console.warn(warning);
            globalThis.litIssuedWarnings.add(warning);
        }
    };
}
const legacyProperty = (options, proto, name)=>{
    const hasOwnProperty = proto.hasOwnProperty(name);
    proto.constructor.createProperty(name, options);
    // For accessors (which have a descriptor on the prototype) we need to
    // return a descriptor, otherwise TypeScript overwrites the descriptor we
    // define in createProperty() with the original descriptor. We don't do this
    // for fields, which don't have a descriptor, because this could overwrite
    // descriptor defined by other decorators.
    return hasOwnProperty ? Object.getOwnPropertyDescriptor(proto, name) : undefined;
};
// This is duplicated from a similar variable in reactive-element.ts, but
// actually makes sense to have this default defined with the decorator, so
// that different decorators could have different defaults.
const defaultPropertyDeclaration = {
    attribute: true,
    type: String,
    converter: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["defaultConverter"],
    reflect: false,
    hasChanged: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["notEqual"]
};
const standardProperty = function() {
    let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : defaultPropertyDeclaration, target = arguments.length > 1 ? arguments[1] : void 0, context = arguments.length > 2 ? arguments[2] : void 0;
    const { kind, metadata } = context;
    if (DEV_MODE && metadata == null) {
        issueWarning('missing-class-metadata', "The class ".concat(target, " is missing decorator metadata. This ") + "could mean that you're using a compiler that supports decorators " + "but doesn't support decorator metadata, such as TypeScript 5.1. " + "Please update your compiler.");
    }
    // Store the property options
    let properties = globalThis.litPropertyMetadata.get(metadata);
    if (properties === undefined) {
        globalThis.litPropertyMetadata.set(metadata, properties = new Map());
    }
    if (kind === 'setter') {
        options = Object.create(options);
        options.wrapped = true;
    }
    properties.set(context.name, options);
    if (kind === 'accessor') {
        // Standard decorators cannot dynamically modify the class, so we can't
        // replace a field with accessors. The user must use the new `accessor`
        // keyword instead.
        const { name } = context;
        return {
            set (v) {
                const oldValue = target.get.call(this);
                target.set.call(this, v);
                this.requestUpdate(name, oldValue, options);
            },
            init (v) {
                if (v !== undefined) {
                    this._$changeProperty(name, undefined, options, v);
                }
                return v;
            }
        };
    } else if (kind === 'setter') {
        const { name } = context;
        return function(value) {
            const oldValue = this[name];
            target.call(this, value);
            this.requestUpdate(name, oldValue, options);
        };
    }
    throw new Error("Unsupported decorator location: ".concat(kind));
};
function property(options) {
    return (protoOrTarget, nameOrContext)=>{
        return typeof nameOrContext === 'object' ? standardProperty(options, protoOrTarget, nameOrContext) : legacyProperty(options, protoOrTarget, nameOrContext);
    };
} //# sourceMappingURL=property.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/decorators/state.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ /*
 * IMPORTANT: For compatibility with tsickle and the Closure JS compiler, all
 * property decorators (but not class decorators) in this file that have
 * an @ExportDecoratedItems annotation must be defined as a regular function,
 * not an arrow function.
 */ __turbopack_context__.s([
    "state",
    ()=>state
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/decorators/property.js [app-client] (ecmascript)");
;
function state(options) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])({
        ...options,
        // Add both `state` and `attribute` because we found a third party
        // controller that is keying off of PropertyOptions.state to determine
        // whether a field is a private internal property or not.
        state: true,
        attribute: false
    });
} //# sourceMappingURL=state.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/decorators/event-options.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ /**
 * Adds event listener options to a method used as an event listener in a
 * lit-html template.
 *
 * @param options An object that specifies event listener options as accepted by
 * `EventTarget#addEventListener` and `EventTarget#removeEventListener`.
 *
 * Current browsers support the `capture`, `passive`, and `once` options. See:
 * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Parameters
 *
 * ```ts
 * class MyElement {
 *   clicked = false;
 *
 *   render() {
 *     return html`
 *       <div @click=${this._onClick}>
 *         <button></button>
 *       </div>
 *     `;
 *   }
 *
 *   @eventOptions({capture: true})
 *   _onClick(e) {
 *     this.clicked = true;
 *   }
 * }
 * ```
 * @category Decorator
 */ __turbopack_context__.s([
    "eventOptions",
    ()=>eventOptions
]);
function eventOptions(options) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (protoOrValue, nameOrContext)=>{
        const method = typeof protoOrValue === 'function' ? protoOrValue : protoOrValue[nameOrContext];
        Object.assign(method, options);
    };
} //# sourceMappingURL=event-options.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/decorators/base.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ /**
 * Wraps up a few best practices when returning a property descriptor from a
 * decorator.
 *
 * Marks the defined property as configurable, and enumerable, and handles
 * the case where we have a busted Reflect.decorate zombiefill (e.g. in Angular
 * apps).
 *
 * @internal
 */ __turbopack_context__.s([
    "desc",
    ()=>desc
]);
const desc = (obj, name, descriptor)=>{
    // For backwards compatibility, we keep them configurable and enumerable.
    descriptor.configurable = true;
    descriptor.enumerable = true;
    if (// We check for Reflect.decorate each time, in case the zombiefill
    // is applied via lazy loading some Angular code.
    Reflect.decorate && typeof name !== 'object') {
        // If we're called as a legacy decorator, and Reflect.decorate is present
        // then we have no guarantees that the returned descriptor will be
        // defined on the class, so we must apply it directly ourselves.
        Object.defineProperty(obj, name, descriptor);
    }
    return descriptor;
}; //# sourceMappingURL=base.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/decorators/query.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ __turbopack_context__.s([
    "query",
    ()=>query
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/decorators/base.js [app-client] (ecmascript)");
;
const DEV_MODE = true;
let issueWarning;
if ("TURBOPACK compile-time truthy", 1) {
    var // Ensure warnings are issued only 1x, even if multiple versions of Lit
    // are loaded.
    _globalThis;
    var _litIssuedWarnings;
    (_litIssuedWarnings = (_globalThis = globalThis).litIssuedWarnings) !== null && _litIssuedWarnings !== void 0 ? _litIssuedWarnings : _globalThis.litIssuedWarnings = new Set();
    /**
     * Issue a warning if we haven't already, based either on `code` or `warning`.
     * Warnings are disabled automatically only by `warning`; disabling via `code`
     * can be done by users.
     */ issueWarning = (code, warning)=>{
        warning += code ? " See https://lit.dev/msg/".concat(code, " for more information.") : '';
        if (!globalThis.litIssuedWarnings.has(warning) && !globalThis.litIssuedWarnings.has(code)) {
            console.warn(warning);
            globalThis.litIssuedWarnings.add(warning);
        }
    };
}
function query(selector, cache) {
    return (protoOrTarget, nameOrContext, descriptor)=>{
        const doQuery = (el)=>{
            var _el_renderRoot;
            var _el_renderRoot_querySelector;
            const result = (_el_renderRoot_querySelector = (_el_renderRoot = el.renderRoot) === null || _el_renderRoot === void 0 ? void 0 : _el_renderRoot.querySelector(selector)) !== null && _el_renderRoot_querySelector !== void 0 ? _el_renderRoot_querySelector : null;
            if (DEV_MODE && result === null && cache && !el.hasUpdated) {
                const name = typeof nameOrContext === 'object' ? nameOrContext.name : nameOrContext;
                issueWarning('', "@query'd field ".concat(JSON.stringify(String(name)), " with the 'cache' ") + "flag set for selector '".concat(selector, "' has been accessed before ") + "the first update and returned null. This is expected if the " + "renderRoot tree has not been provided beforehand (e.g. via " + "Declarative Shadow DOM). Therefore the value hasn't been cached.");
            }
            // TODO: if we want to allow users to assert that the query will never
            // return null, we need a new option and to throw here if the result
            // is null.
            return result;
        };
        if (cache) {
            // Accessors to wrap from either:
            //   1. The decorator target, in the case of standard decorators
            //   2. The property descriptor, in the case of experimental decorators
            //      on auto-accessors.
            //   3. Functions that access our own cache-key property on the instance,
            //      in the case of experimental decorators on fields.
            const { get, set } = typeof nameOrContext === 'object' ? protoOrTarget : descriptor !== null && descriptor !== void 0 ? descriptor : (()=>{
                const key = ("TURBOPACK compile-time truthy", 1) ? Symbol("".concat(String(nameOrContext), " (@query() cache)")) : "TURBOPACK unreachable";
                return {
                    get () {
                        return this[key];
                    },
                    set (v) {
                        this[key] = v;
                    }
                };
            })();
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["desc"])(protoOrTarget, nameOrContext, {
                get () {
                    let result = get.call(this);
                    if (result === undefined) {
                        result = doQuery(this);
                        if (result !== null || this.hasUpdated) {
                            set.call(this, result);
                        }
                    }
                    return result;
                }
            });
        } else {
            // This object works as the return type for both standard and
            // experimental decorators.
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["desc"])(protoOrTarget, nameOrContext, {
                get () {
                    return doQuery(this);
                }
            });
        }
    };
} //# sourceMappingURL=query.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/decorators/query-all.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ __turbopack_context__.s([
    "queryAll",
    ()=>queryAll
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/decorators/base.js [app-client] (ecmascript)");
;
// Shared fragment used to generate empty NodeLists when a render root is
// undefined
let fragment;
function queryAll(selector) {
    return (obj, name)=>{
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["desc"])(obj, name, {
            get () {
                var _this_renderRoot;
                const container = (_this_renderRoot = this.renderRoot) !== null && _this_renderRoot !== void 0 ? _this_renderRoot : fragment !== null && fragment !== void 0 ? fragment : fragment = document.createDocumentFragment();
                return container.querySelectorAll(selector);
            }
        });
    };
} //# sourceMappingURL=query-all.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/decorators/query-async.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ __turbopack_context__.s([
    "queryAsync",
    ()=>queryAsync
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/decorators/base.js [app-client] (ecmascript)");
;
function queryAsync(selector) {
    return (obj, name)=>{
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["desc"])(obj, name, {
            async get () {
                var _this_renderRoot;
                await this.updateComplete;
                var _this_renderRoot_querySelector;
                return (_this_renderRoot_querySelector = (_this_renderRoot = this.renderRoot) === null || _this_renderRoot === void 0 ? void 0 : _this_renderRoot.querySelector(selector)) !== null && _this_renderRoot_querySelector !== void 0 ? _this_renderRoot_querySelector : null;
            }
        });
    };
} //# sourceMappingURL=query-async.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/decorators/query-assigned-elements.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ __turbopack_context__.s([
    "queryAssignedElements",
    ()=>queryAssignedElements
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/decorators/base.js [app-client] (ecmascript)");
;
function queryAssignedElements(options) {
    return (obj, name)=>{
        const { slot, selector } = options !== null && options !== void 0 ? options : {};
        const slotSelector = "slot".concat(slot ? "[name=".concat(slot, "]") : ':not([name])');
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["desc"])(obj, name, {
            get () {
                var _this_renderRoot;
                const slotEl = (_this_renderRoot = this.renderRoot) === null || _this_renderRoot === void 0 ? void 0 : _this_renderRoot.querySelector(slotSelector);
                var _slotEl_assignedElements;
                const elements = (_slotEl_assignedElements = slotEl === null || slotEl === void 0 ? void 0 : slotEl.assignedElements(options)) !== null && _slotEl_assignedElements !== void 0 ? _slotEl_assignedElements : [];
                return selector === undefined ? elements : elements.filter((node)=>node.matches(selector));
            }
        });
    };
} //# sourceMappingURL=query-assigned-elements.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/decorators/query-assigned-nodes.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ __turbopack_context__.s([
    "queryAssignedNodes",
    ()=>queryAssignedNodes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/decorators/base.js [app-client] (ecmascript)");
;
function queryAssignedNodes(options) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (obj, name)=>{
        const { slot } = options !== null && options !== void 0 ? options : {};
        const slotSelector = "slot".concat(slot ? "[name=".concat(slot, "]") : ':not([name])');
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["desc"])(obj, name, {
            get () {
                var _this_renderRoot;
                const slotEl = (_this_renderRoot = this.renderRoot) === null || _this_renderRoot === void 0 ? void 0 : _this_renderRoot.querySelector(slotSelector);
                var _slotEl_assignedNodes;
                return (_slotEl_assignedNodes = slotEl === null || slotEl === void 0 ? void 0 : slotEl.assignedNodes(options)) !== null && _slotEl_assignedNodes !== void 0 ? _slotEl_assignedNodes : [];
            }
        });
    };
} //# sourceMappingURL=query-assigned-nodes.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit-html/development/lit-html.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ __turbopack_context__.s([
    "_$LH",
    ()=>_$LH,
    "html",
    ()=>html,
    "mathml",
    ()=>mathml,
    "noChange",
    ()=>noChange,
    "nothing",
    ()=>nothing,
    "render",
    ()=>render,
    "svg",
    ()=>svg
]);
var _global_ShadyDOM, _global_ShadyDOM1;
var _global;
const DEV_MODE = true;
const ENABLE_EXTRA_SECURITY_HOOKS = true;
const ENABLE_SHADYDOM_NOPATCH = true;
const NODE_MODE = false;
// Allows minifiers to rename references to globalThis
const global = globalThis;
/**
 * Useful for visualizing and logging insights into what the Lit template system is doing.
 *
 * Compiled out of prod mode builds.
 */ const debugLogEvent = ("TURBOPACK compile-time truthy", 1) ? (event)=>{
    const shouldEmit = global.emitLitDebugLogEvents;
    if (!shouldEmit) {
        return;
    }
    global.dispatchEvent(new CustomEvent('lit-debug', {
        detail: event
    }));
} : "TURBOPACK unreachable";
// Used for connecting beginRender and endRender events when there are nested
// renders when errors are thrown preventing an endRender event from being
// called.
let debugLogRenderId = 0;
let issueWarning;
if ("TURBOPACK compile-time truthy", 1) {
    var _global1;
    var _litIssuedWarnings;
    (_litIssuedWarnings = (_global1 = global).litIssuedWarnings) !== null && _litIssuedWarnings !== void 0 ? _litIssuedWarnings : _global1.litIssuedWarnings = new Set();
    /**
     * Issue a warning if we haven't already, based either on `code` or `warning`.
     * Warnings are disabled automatically only by `warning`; disabling via `code`
     * can be done by users.
     */ issueWarning = (code, warning)=>{
        warning += code ? " See https://lit.dev/msg/".concat(code, " for more information.") : '';
        if (!global.litIssuedWarnings.has(warning) && !global.litIssuedWarnings.has(code)) {
            console.warn(warning);
            global.litIssuedWarnings.add(warning);
        }
    };
    queueMicrotask(()=>{
        issueWarning('dev-mode', "Lit is in dev mode. Not recommended for production!");
    });
}
const wrap = ENABLE_SHADYDOM_NOPATCH && ((_global_ShadyDOM = global.ShadyDOM) === null || _global_ShadyDOM === void 0 ? void 0 : _global_ShadyDOM.inUse) && ((_global_ShadyDOM1 = global.ShadyDOM) === null || _global_ShadyDOM1 === void 0 ? void 0 : _global_ShadyDOM1.noPatch) === true ? global.ShadyDOM.wrap : (node)=>node;
const trustedTypes = global.trustedTypes;
/**
 * Our TrustedTypePolicy for HTML which is declared using the html template
 * tag function.
 *
 * That HTML is a developer-authored constant, and is parsed with innerHTML
 * before any untrusted expressions have been mixed in. Therefor it is
 * considered safe by construction.
 */ const policy = trustedTypes ? trustedTypes.createPolicy('lit-html', {
    createHTML: (s)=>s
}) : undefined;
const identityFunction = (value)=>value;
const noopSanitizer = (_node, _name, _type)=>identityFunction;
/** Sets the global sanitizer factory. */ const setSanitizer = (newSanitizer)=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if (sanitizerFactoryInternal !== noopSanitizer) {
        throw new Error("Attempted to overwrite existing lit-html security policy." + " setSanitizeDOMValueFactory should be called at most once.");
    }
    sanitizerFactoryInternal = newSanitizer;
};
/**
 * Only used in internal tests, not a part of the public API.
 */ const _testOnlyClearSanitizerFactoryDoNotCallOrElse = ()=>{
    sanitizerFactoryInternal = noopSanitizer;
};
const createSanitizer = (node, name, type)=>{
    return sanitizerFactoryInternal(node, name, type);
};
// Added to an attribute name to mark the attribute as bound so we can find
// it easily.
const boundAttributeSuffix = '$lit$';
// This marker is used in many syntactic positions in HTML, so it must be
// a valid element name and attribute name. We don't support dynamic names (yet)
// but this at least ensures that the parse tree is closer to the template
// intention.
const marker = "lit$".concat(Math.random().toFixed(9).slice(2), "$");
// String used to tell if a comment is a marker comment
const markerMatch = '?' + marker;
// Text used to insert a comment marker node. We use processing instruction
// syntax because it's slightly smaller, but parses as a comment node.
const nodeMarker = "<".concat(markerMatch, ">");
const d = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : document;
// Creates a dynamic marker. We never have to search for these in the DOM.
const createMarker = ()=>d.createComment('');
const isPrimitive = (value)=>value === null || typeof value != 'object' && typeof value != 'function';
const isArray = Array.isArray;
const isIterable = (value)=>isArray(value) || // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeof (value === null || value === void 0 ? void 0 : value[Symbol.iterator]) === 'function';
const SPACE_CHAR = "[ 	\n\f\r]";
const ATTR_VALUE_CHAR = "[^ 	\n\f\r\"'`<>=]";
const NAME_CHAR = "[^\\s\"'>=/]";
// These regexes represent the five parsing states that we care about in the
// Template's HTML scanner. They match the *end* of the state they're named
// after.
// Depending on the match, we transition to a new state. If there's no match,
// we stay in the same state.
// Note that the regexes are stateful. We utilize lastIndex and sync it
// across the multiple regexes used. In addition to the five regexes below
// we also dynamically create a regex to find the matching end tags for raw
// text elements.
/**
 * End of text is: `<` followed by:
 *   (comment start) or (tag) or (dynamic tag binding)
 */ const textEndRegex = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
const COMMENT_START = 1;
const TAG_NAME = 2;
const DYNAMIC_TAG_NAME = 3;
const commentEndRegex = /-->/g;
/**
 * Comments not started with <!--, like </{, can be ended by a single `>`
 */ const comment2EndRegex = />/g;
/**
 * The tagEnd regex matches the end of the "inside an opening" tag syntax
 * position. It either matches a `>`, an attribute-like sequence, or the end
 * of the string after a space (attribute-name position ending).
 *
 * See attributes in the HTML spec:
 * https://www.w3.org/TR/html5/syntax.html#elements-attributes
 *
 * " \t\n\f\r" are HTML space characters:
 * https://infra.spec.whatwg.org/#ascii-whitespace
 *
 * So an attribute is:
 *  * The name: any character except a whitespace character, ("), ('), ">",
 *    "=", or "/". Note: this is different from the HTML spec which also excludes control characters.
 *  * Followed by zero or more space characters
 *  * Followed by "="
 *  * Followed by zero or more space characters
 *  * Followed by:
 *    * Any character except space, ('), ("), "<", ">", "=", (`), or
 *    * (") then any non-("), or
 *    * (') then any non-(')
 */ const tagEndRegex = new RegExp(">|".concat(SPACE_CHAR, "(?:(").concat(NAME_CHAR, "+)(").concat(SPACE_CHAR, "*=").concat(SPACE_CHAR, "*(?:").concat(ATTR_VALUE_CHAR, "|(\"|')|))|$)"), 'g');
const ENTIRE_MATCH = 0;
const ATTRIBUTE_NAME = 1;
const SPACES_AND_EQUALS = 2;
const QUOTE_CHAR = 3;
const singleQuoteAttrEndRegex = /'/g;
const doubleQuoteAttrEndRegex = /"/g;
/**
 * Matches the raw text elements.
 *
 * Comments are not parsed within raw text elements, so we need to search their
 * text content for marker strings.
 */ const rawTextElement = /^(?:script|style|textarea|title)$/i;
/** TemplateResult types */ const HTML_RESULT = 1;
const SVG_RESULT = 2;
const MATHML_RESULT = 3;
// TemplatePart types
// IMPORTANT: these must match the values in PartType
const ATTRIBUTE_PART = 1;
const CHILD_PART = 2;
const PROPERTY_PART = 3;
const BOOLEAN_ATTRIBUTE_PART = 4;
const EVENT_PART = 5;
const ELEMENT_PART = 6;
const COMMENT_PART = 7;
/**
 * Generates a template literal tag function that returns a TemplateResult with
 * the given result type.
 */ const tag = (type)=>function(strings) {
        for(var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
            values[_key - 1] = arguments[_key];
        }
        // Warn against templates octal escape sequences
        // We do this here rather than in render so that the warning is closer to the
        // template definition.
        if (DEV_MODE && strings.some((s)=>s === undefined)) {
            console.warn('Some template strings are undefined.\n' + 'This is probably caused by illegal octal escape sequences.');
        }
        if ("TURBOPACK compile-time truthy", 1) {
            // Import static-html.js results in a circular dependency which g3 doesn't
            // handle. Instead we know that static values must have the field
            // `_$litStatic$`.
            if (values.some((val)=>val === null || val === void 0 ? void 0 : val['_$litStatic$'])) {
                issueWarning('', "Static values 'literal' or 'unsafeStatic' cannot be used as values to non-static templates.\n" + "Please use the static 'html' tag function. See https://lit.dev/docs/templates/expressions/#static-expressions");
            }
        }
        return {
            // This property needs to remain unminified.
            ['_$litType$']: type,
            strings,
            values
        };
    };
const html = tag(HTML_RESULT);
const svg = tag(SVG_RESULT);
const mathml = tag(MATHML_RESULT);
const noChange = Symbol.for('lit-noChange');
const nothing = Symbol.for('lit-nothing');
/**
 * The cache of prepared templates, keyed by the tagged TemplateStringsArray
 * and _not_ accounting for the specific template tag used. This means that
 * template tags cannot be dynamic - they must statically be one of html, svg,
 * or attr. This restriction simplifies the cache lookup, which is on the hot
 * path for rendering.
 */ const templateCache = new WeakMap();
const walker = d.createTreeWalker(d, 129 /* NodeFilter.SHOW_{ELEMENT|COMMENT} */ );
let sanitizerFactoryInternal = noopSanitizer;
function trustFromTemplateString(tsa, stringFromTSA) {
    // A security check to prevent spoofing of Lit template results.
    // In the future, we may be able to replace this with Array.isTemplateObject,
    // though we might need to make that check inside of the html and svg
    // functions, because precompiled templates don't come in as
    // TemplateStringArray objects.
    if (!isArray(tsa) || !tsa.hasOwnProperty('raw')) {
        let message = 'invalid template strings array';
        if ("TURBOPACK compile-time truthy", 1) {
            message = "\n          Internal Error: expected template strings to be an array\n          with a 'raw' field. Faking a template strings array by\n          calling html or svg like an ordinary function is effectively\n          the same as calling unsafeHtml and can lead to major security\n          issues, e.g. opening your code up to XSS attacks.\n          If you're using the html or svg tagged template functions normally\n          and still seeing this error, please file a bug at\n          https://github.com/lit/lit/issues/new?template=bug_report.md\n          and include information about your build tooling, if any.\n        ".trim().replace(/\n */g, '\n');
        }
        throw new Error(message);
    }
    return policy !== undefined ? policy.createHTML(stringFromTSA) : stringFromTSA;
}
/**
 * Returns an HTML string for the given TemplateStringsArray and result type
 * (HTML or SVG), along with the case-sensitive bound attribute names in
 * template order. The HTML contains comment markers denoting the `ChildPart`s
 * and suffixes on bound attributes denoting the `AttributeParts`.
 *
 * @param strings template strings array
 * @param type HTML or SVG
 * @return Array containing `[html, attrNames]` (array returned for terseness,
 *     to avoid object fields since this code is shared with non-minified SSR
 *     code)
 */ const getTemplateHtml = (strings, type)=>{
    // Insert makers into the template HTML to represent the position of
    // bindings. The following code scans the template strings to determine the
    // syntactic position of the bindings. They can be in text position, where
    // we insert an HTML comment, attribute value position, where we insert a
    // sentinel string and re-write the attribute name, or inside a tag where
    // we insert the sentinel string.
    const l = strings.length - 1;
    // Stores the case-sensitive bound attribute names in the order of their
    // parts. ElementParts are also reflected in this array as undefined
    // rather than a string, to disambiguate from attribute bindings.
    const attrNames = [];
    let html = type === SVG_RESULT ? '<svg>' : type === MATHML_RESULT ? '<math>' : '';
    // When we're inside a raw text tag (not it's text content), the regex
    // will still be tagRegex so we can find attributes, but will switch to
    // this regex when the tag ends.
    let rawTextEndRegex;
    // The current parsing state, represented as a reference to one of the
    // regexes
    let regex = textEndRegex;
    for(let i = 0; i < l; i++){
        const s = strings[i];
        // The index of the end of the last attribute name. When this is
        // positive at end of a string, it means we're in an attribute value
        // position and need to rewrite the attribute name.
        // We also use a special value of -2 to indicate that we encountered
        // the end of a string in attribute name position.
        let attrNameEndIndex = -1;
        let attrName;
        let lastIndex = 0;
        let match;
        // The conditions in this loop handle the current parse state, and the
        // assignments to the `regex` variable are the state transitions.
        while(lastIndex < s.length){
            // Make sure we start searching from where we previously left off
            regex.lastIndex = lastIndex;
            match = regex.exec(s);
            if (match === null) {
                break;
            }
            lastIndex = regex.lastIndex;
            if (regex === textEndRegex) {
                if (match[COMMENT_START] === '!--') {
                    regex = commentEndRegex;
                } else if (match[COMMENT_START] !== undefined) {
                    // We started a weird comment, like </{
                    regex = comment2EndRegex;
                } else if (match[TAG_NAME] !== undefined) {
                    if (rawTextElement.test(match[TAG_NAME])) {
                        // Record if we encounter a raw-text element. We'll switch to
                        // this regex at the end of the tag.
                        rawTextEndRegex = new RegExp("</".concat(match[TAG_NAME]), 'g');
                    }
                    regex = tagEndRegex;
                } else if (match[DYNAMIC_TAG_NAME] !== undefined) {
                    if ("TURBOPACK compile-time truthy", 1) {
                        throw new Error('Bindings in tag names are not supported. Please use static templates instead. ' + 'See https://lit.dev/docs/templates/expressions/#static-expressions');
                    }
                    regex = tagEndRegex;
                }
            } else if (regex === tagEndRegex) {
                if (match[ENTIRE_MATCH] === '>') {
                    // End of a tag. If we had started a raw-text element, use that
                    // regex
                    regex = rawTextEndRegex !== null && rawTextEndRegex !== void 0 ? rawTextEndRegex : textEndRegex;
                    // We may be ending an unquoted attribute value, so make sure we
                    // clear any pending attrNameEndIndex
                    attrNameEndIndex = -1;
                } else if (match[ATTRIBUTE_NAME] === undefined) {
                    // Attribute name position
                    attrNameEndIndex = -2;
                } else {
                    attrNameEndIndex = regex.lastIndex - match[SPACES_AND_EQUALS].length;
                    attrName = match[ATTRIBUTE_NAME];
                    regex = match[QUOTE_CHAR] === undefined ? tagEndRegex : match[QUOTE_CHAR] === '"' ? doubleQuoteAttrEndRegex : singleQuoteAttrEndRegex;
                }
            } else if (regex === doubleQuoteAttrEndRegex || regex === singleQuoteAttrEndRegex) {
                regex = tagEndRegex;
            } else if (regex === commentEndRegex || regex === comment2EndRegex) {
                regex = textEndRegex;
            } else {
                // Not one of the five state regexes, so it must be the dynamically
                // created raw text regex and we're at the close of that element.
                regex = tagEndRegex;
                rawTextEndRegex = undefined;
            }
        }
        if ("TURBOPACK compile-time truthy", 1) {
            // If we have a attrNameEndIndex, which indicates that we should
            // rewrite the attribute name, assert that we're in a valid attribute
            // position - either in a tag, or a quoted attribute value.
            console.assert(attrNameEndIndex === -1 || regex === tagEndRegex || regex === singleQuoteAttrEndRegex || regex === doubleQuoteAttrEndRegex, 'unexpected parse state B');
        }
        // We have four cases:
        //  1. We're in text position, and not in a raw text element
        //     (regex === textEndRegex): insert a comment marker.
        //  2. We have a non-negative attrNameEndIndex which means we need to
        //     rewrite the attribute name to add a bound attribute suffix.
        //  3. We're at the non-first binding in a multi-binding attribute, use a
        //     plain marker.
        //  4. We're somewhere else inside the tag. If we're in attribute name
        //     position (attrNameEndIndex === -2), add a sequential suffix to
        //     generate a unique attribute name.
        // Detect a binding next to self-closing tag end and insert a space to
        // separate the marker from the tag end:
        const end = regex === tagEndRegex && strings[i + 1].startsWith('/>') ? ' ' : '';
        html += regex === textEndRegex ? s + nodeMarker : attrNameEndIndex >= 0 ? (attrNames.push(attrName), s.slice(0, attrNameEndIndex) + boundAttributeSuffix + s.slice(attrNameEndIndex)) + marker + end : s + marker + (attrNameEndIndex === -2 ? i : end);
    }
    const htmlResult = html + (strings[l] || '<?>') + (type === SVG_RESULT ? '</svg>' : type === MATHML_RESULT ? '</math>' : '');
    // Returned as an array for terseness
    return [
        trustFromTemplateString(strings, htmlResult),
        attrNames
    ];
};
class Template {
    // Overridden via `litHtmlPolyfillSupport` to provide platform support.
    /** @nocollapse */ static createElement(html, _options) {
        const el = d.createElement('template');
        el.innerHTML = html;
        return el;
    }
    constructor(// This property needs to remain unminified.
    { strings, ['_$litType$']: type }, options){
        this.parts = [];
        let node;
        let nodeIndex = 0;
        let attrNameIndex = 0;
        const partCount = strings.length - 1;
        const parts = this.parts;
        // Create template element
        const [html, attrNames] = getTemplateHtml(strings, type);
        this.el = Template.createElement(html, options);
        walker.currentNode = this.el.content;
        // Re-parent SVG or MathML nodes into template root
        if (type === SVG_RESULT || type === MATHML_RESULT) {
            const wrapper = this.el.content.firstChild;
            wrapper.replaceWith(...wrapper.childNodes);
        }
        // Walk the template to find binding markers and create TemplateParts
        while((node = walker.nextNode()) !== null && parts.length < partCount){
            if (node.nodeType === 1) {
                if ("TURBOPACK compile-time truthy", 1) {
                    const tag = node.localName;
                    // Warn if `textarea` includes an expression and throw if `template`
                    // does since these are not supported. We do this by checking
                    // innerHTML for anything that looks like a marker. This catches
                    // cases like bindings in textarea there markers turn into text nodes.
                    if (/^(?:textarea|template)$/i.test(tag) && node.innerHTML.includes(marker)) {
                        const m = "Expressions are not supported inside `".concat(tag, "` ") + "elements. See https://lit.dev/msg/expression-in-".concat(tag, " for more ") + "information.";
                        if (tag === 'template') {
                            throw new Error(m);
                        } else issueWarning('', m);
                    }
                }
                // TODO (justinfagnani): for attempted dynamic tag names, we don't
                // increment the bindingIndex, and it'll be off by 1 in the element
                // and off by two after it.
                if (node.hasAttributes()) {
                    for (const name of node.getAttributeNames()){
                        if (name.endsWith(boundAttributeSuffix)) {
                            const realName = attrNames[attrNameIndex++];
                            const value = node.getAttribute(name);
                            const statics = value.split(marker);
                            const m = /([.?@])?(.*)/.exec(realName);
                            parts.push({
                                type: ATTRIBUTE_PART,
                                index: nodeIndex,
                                name: m[2],
                                strings: statics,
                                ctor: m[1] === '.' ? PropertyPart : m[1] === '?' ? BooleanAttributePart : m[1] === '@' ? EventPart : AttributePart
                            });
                            node.removeAttribute(name);
                        } else if (name.startsWith(marker)) {
                            parts.push({
                                type: ELEMENT_PART,
                                index: nodeIndex
                            });
                            node.removeAttribute(name);
                        }
                    }
                }
                // TODO (justinfagnani): benchmark the regex against testing for each
                // of the 3 raw text element names.
                if (rawTextElement.test(node.tagName)) {
                    // For raw text elements we need to split the text content on
                    // markers, create a Text node for each segment, and create
                    // a TemplatePart for each marker.
                    const strings = node.textContent.split(marker);
                    const lastIndex = strings.length - 1;
                    if (lastIndex > 0) {
                        node.textContent = trustedTypes ? trustedTypes.emptyScript : '';
                        // Generate a new text node for each literal section
                        // These nodes are also used as the markers for child parts
                        for(let i = 0; i < lastIndex; i++){
                            node.append(strings[i], createMarker());
                            // Walk past the marker node we just added
                            walker.nextNode();
                            parts.push({
                                type: CHILD_PART,
                                index: ++nodeIndex
                            });
                        }
                        // Note because this marker is added after the walker's current
                        // node, it will be walked to in the outer loop (and ignored), so
                        // we don't need to adjust nodeIndex here
                        node.append(strings[lastIndex], createMarker());
                    }
                }
            } else if (node.nodeType === 8) {
                const data = node.data;
                if (data === markerMatch) {
                    parts.push({
                        type: CHILD_PART,
                        index: nodeIndex
                    });
                } else {
                    let i = -1;
                    while((i = node.data.indexOf(marker, i + 1)) !== -1){
                        // Comment node has a binding marker inside, make an inactive part
                        // The binding won't work, but subsequent bindings will
                        parts.push({
                            type: COMMENT_PART,
                            index: nodeIndex
                        });
                        // Move to the end of the match
                        i += marker.length - 1;
                    }
                }
            }
            nodeIndex++;
        }
        if ("TURBOPACK compile-time truthy", 1) {
            // If there was a duplicate attribute on a tag, then when the tag is
            // parsed into an element the attribute gets de-duplicated. We can detect
            // this mismatch if we haven't precisely consumed every attribute name
            // when preparing the template. This works because `attrNames` is built
            // from the template string and `attrNameIndex` comes from processing the
            // resulting DOM.
            if (attrNames.length !== attrNameIndex) {
                throw new Error("Detected duplicate attribute bindings. This occurs if your template " + "has duplicate attributes on an element tag. For example " + '"<input ?disabled=${true} ?disabled=${false}>" contains a ' + 'duplicate "disabled" attribute. The error was detected in ' + "the following template: \n" + '`' + strings.join('${...}') + '`');
            }
        }
        // We could set walker.currentNode to another node here to prevent a memory
        // leak, but every time we prepare a template, we immediately render it
        // and re-use the walker in new TemplateInstance._clone().
        debugLogEvent && debugLogEvent({
            kind: 'template prep',
            template: this,
            clonableTemplate: this.el,
            parts: this.parts,
            strings
        });
    }
}
function resolveDirective(part, value) {
    let parent = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : part, attributeIndex = arguments.length > 3 ? arguments[3] : void 0;
    var _parent___directives;
    // Bail early if the value is explicitly noChange. Note, this means any
    // nested directive is still attached and is not run.
    if (value === noChange) {
        return value;
    }
    let currentDirective = attributeIndex !== undefined ? (_parent___directives = parent.__directives) === null || _parent___directives === void 0 ? void 0 : _parent___directives[attributeIndex] : parent.__directive;
    const nextDirectiveConstructor = isPrimitive(value) ? undefined : value['_$litDirective$'];
    if ((currentDirective === null || currentDirective === void 0 ? void 0 : currentDirective.constructor) !== nextDirectiveConstructor) {
        var // This property needs to remain unminified.
        _currentDirective__$notifyDirectiveConnectionChanged;
        currentDirective === null || currentDirective === void 0 ? void 0 : (_currentDirective__$notifyDirectiveConnectionChanged = currentDirective['_$notifyDirectiveConnectionChanged']) === null || _currentDirective__$notifyDirectiveConnectionChanged === void 0 ? void 0 : _currentDirective__$notifyDirectiveConnectionChanged.call(currentDirective, false);
        if (nextDirectiveConstructor === undefined) {
            currentDirective = undefined;
        } else {
            currentDirective = new nextDirectiveConstructor(part);
            currentDirective._$initialize(part, parent, attributeIndex);
        }
        if (attributeIndex !== undefined) {
            var _parent;
            var ___directives;
            ((___directives = (_parent = parent).__directives) !== null && ___directives !== void 0 ? ___directives : _parent.__directives = [])[attributeIndex] = currentDirective;
        } else {
            parent.__directive = currentDirective;
        }
    }
    if (currentDirective !== undefined) {
        value = resolveDirective(part, currentDirective._$resolve(part, value.values), currentDirective, attributeIndex);
    }
    return value;
}
/**
 * An updateable instance of a Template. Holds references to the Parts used to
 * update the template instance.
 */ class TemplateInstance {
    // Called by ChildPart parentNode getter
    get parentNode() {
        return this._$parent.parentNode;
    }
    // See comment in Disconnectable interface for why this is a getter
    get _$isConnected() {
        return this._$parent._$isConnected;
    }
    // This method is separate from the constructor because we need to return a
    // DocumentFragment and we don't want to hold onto it with an instance field.
    _clone(options) {
        const { el: { content }, parts: parts } = this._$template;
        var _options_creationScope;
        const fragment = ((_options_creationScope = options === null || options === void 0 ? void 0 : options.creationScope) !== null && _options_creationScope !== void 0 ? _options_creationScope : d).importNode(content, true);
        walker.currentNode = fragment;
        let node = walker.nextNode();
        let nodeIndex = 0;
        let partIndex = 0;
        let templatePart = parts[0];
        while(templatePart !== undefined){
            if (nodeIndex === templatePart.index) {
                let part;
                if (templatePart.type === CHILD_PART) {
                    part = new ChildPart(node, node.nextSibling, this, options);
                } else if (templatePart.type === ATTRIBUTE_PART) {
                    part = new templatePart.ctor(node, templatePart.name, templatePart.strings, this, options);
                } else if (templatePart.type === ELEMENT_PART) {
                    part = new ElementPart(node, this, options);
                }
                this._$parts.push(part);
                templatePart = parts[++partIndex];
            }
            if (nodeIndex !== (templatePart === null || templatePart === void 0 ? void 0 : templatePart.index)) {
                node = walker.nextNode();
                nodeIndex++;
            }
        }
        // We need to set the currentNode away from the cloned tree so that we
        // don't hold onto the tree even if the tree is detached and should be
        // freed.
        walker.currentNode = d;
        return fragment;
    }
    _update(values) {
        let i = 0;
        for (const part of this._$parts){
            if (part !== undefined) {
                debugLogEvent && debugLogEvent({
                    kind: 'set part',
                    part,
                    value: values[i],
                    valueIndex: i,
                    values,
                    templateInstance: this
                });
                if (part.strings !== undefined) {
                    part._$setValue(values, part, i);
                    // The number of values the part consumes is part.strings.length - 1
                    // since values are in between template spans. We increment i by 1
                    // later in the loop, so increment it by part.strings.length - 2 here
                    i += part.strings.length - 2;
                } else {
                    part._$setValue(values[i]);
                }
            }
            i++;
        }
    }
    constructor(template, parent){
        this._$parts = [];
        /** @internal */ this._$disconnectableChildren = undefined;
        this._$template = template;
        this._$parent = parent;
    }
}
class ChildPart {
    // See comment in Disconnectable interface for why this is a getter
    get _$isConnected() {
        var _this__$parent;
        var _this__$parent__$isConnected;
        // ChildParts that are not at the root should always be created with a
        // parent; only RootChildNode's won't, so they return the local isConnected
        // state
        return (_this__$parent__$isConnected = (_this__$parent = this._$parent) === null || _this__$parent === void 0 ? void 0 : _this__$parent._$isConnected) !== null && _this__$parent__$isConnected !== void 0 ? _this__$parent__$isConnected : this.__isConnected;
    }
    /**
     * The parent node into which the part renders its content.
     *
     * A ChildPart's content consists of a range of adjacent child nodes of
     * `.parentNode`, possibly bordered by 'marker nodes' (`.startNode` and
     * `.endNode`).
     *
     * - If both `.startNode` and `.endNode` are non-null, then the part's content
     * consists of all siblings between `.startNode` and `.endNode`, exclusively.
     *
     * - If `.startNode` is non-null but `.endNode` is null, then the part's
     * content consists of all siblings following `.startNode`, up to and
     * including the last child of `.parentNode`. If `.endNode` is non-null, then
     * `.startNode` will always be non-null.
     *
     * - If both `.endNode` and `.startNode` are null, then the part's content
     * consists of all child nodes of `.parentNode`.
     */ get parentNode() {
        let parentNode = wrap(this._$startNode).parentNode;
        const parent = this._$parent;
        if (parent !== undefined && (parentNode === null || parentNode === void 0 ? void 0 : parentNode.nodeType) === 11 /* Node.DOCUMENT_FRAGMENT */ ) {
            // If the parentNode is a DocumentFragment, it may be because the DOM is
            // still in the cloned fragment during initial render; if so, get the real
            // parentNode the part will be committed into by asking the parent.
            parentNode = parent.parentNode;
        }
        return parentNode;
    }
    /**
     * The part's leading marker node, if any. See `.parentNode` for more
     * information.
     */ get startNode() {
        return this._$startNode;
    }
    /**
     * The part's trailing marker node, if any. See `.parentNode` for more
     * information.
     */ get endNode() {
        return this._$endNode;
    }
    _$setValue(value) {
        let directiveParent = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this;
        if (DEV_MODE && this.parentNode === null) {
            throw new Error("This `ChildPart` has no `parentNode` and therefore cannot accept a value. This likely means the element containing the part was manipulated in an unsupported way outside of Lit's control such that the part's marker nodes were ejected from DOM. For example, setting the element's `innerHTML` or `textContent` can do this.");
        }
        value = resolveDirective(this, value, directiveParent);
        if (isPrimitive(value)) {
            // Non-rendering child values. It's important that these do not render
            // empty text nodes to avoid issues with preventing default <slot>
            // fallback content.
            if (value === nothing || value == null || value === '') {
                if (this._$committedValue !== nothing) {
                    debugLogEvent && debugLogEvent({
                        kind: 'commit nothing to child',
                        start: this._$startNode,
                        end: this._$endNode,
                        parent: this._$parent,
                        options: this.options
                    });
                    this._$clear();
                }
                this._$committedValue = nothing;
            } else if (value !== this._$committedValue && value !== noChange) {
                this._commitText(value);
            }
        // This property needs to remain unminified.
        } else if (value['_$litType$'] !== undefined) {
            this._commitTemplateResult(value);
        } else if (value.nodeType !== undefined) {
            var _this_options;
            if (DEV_MODE && ((_this_options = this.options) === null || _this_options === void 0 ? void 0 : _this_options.host) === value) {
                this._commitText("[probable mistake: rendered a template's host in itself " + "(commonly caused by writing ${this} in a template]");
                console.warn("Attempted to render the template host", value, "inside itself. This is almost always a mistake, and in dev mode ", "we render some warning text. In production however, we'll ", "render it, which will usually result in an error, and sometimes ", "in the element disappearing from the DOM.");
                return;
            }
            this._commitNode(value);
        } else if (isIterable(value)) {
            this._commitIterable(value);
        } else {
            // Fallback, will render the string representation
            this._commitText(value);
        }
    }
    _insert(node) {
        return wrap(wrap(this._$startNode).parentNode).insertBefore(node, this._$endNode);
    }
    _commitNode(value) {
        if (this._$committedValue !== value) {
            this._$clear();
            if (ENABLE_EXTRA_SECURITY_HOOKS && sanitizerFactoryInternal !== noopSanitizer) {
                var _this__$startNode_parentNode;
                const parentNodeName = (_this__$startNode_parentNode = this._$startNode.parentNode) === null || _this__$startNode_parentNode === void 0 ? void 0 : _this__$startNode_parentNode.nodeName;
                if (parentNodeName === 'STYLE' || parentNodeName === 'SCRIPT') {
                    let message = 'Forbidden';
                    if (DEV_MODE) {
                        if (parentNodeName === 'STYLE') {
                            message = "Lit does not support binding inside style nodes. " + "This is a security risk, as style injection attacks can " + "exfiltrate data and spoof UIs. " + "Consider instead using css`...` literals " + "to compose styles, and do dynamic styling with " + "css custom properties, ::parts, <slot>s, " + "and by mutating the DOM rather than stylesheets.";
                        } else {
                            message = "Lit does not support binding inside script nodes. " + "This is a security risk, as it could allow arbitrary " + "code execution.";
                        }
                    }
                    throw new Error(message);
                }
            }
            debugLogEvent && debugLogEvent({
                kind: 'commit node',
                start: this._$startNode,
                parent: this._$parent,
                value: value,
                options: this.options
            });
            this._$committedValue = this._insert(value);
        }
    }
    _commitText(value) {
        // If the committed value is a primitive it means we called _commitText on
        // the previous render, and we know that this._$startNode.nextSibling is a
        // Text node. We can now just replace the text content (.data) of the node.
        if (this._$committedValue !== nothing && isPrimitive(this._$committedValue)) {
            const node = wrap(this._$startNode).nextSibling;
            if ("TURBOPACK compile-time truthy", 1) {
                if (this._textSanitizer === undefined) {
                    this._textSanitizer = createSanitizer(node, 'data', 'property');
                }
                value = this._textSanitizer(value);
            }
            debugLogEvent && debugLogEvent({
                kind: 'commit text',
                node,
                value,
                options: this.options
            });
            node.data = value;
        } else {
            if ("TURBOPACK compile-time truthy", 1) {
                const textNode = d.createTextNode('');
                this._commitNode(textNode);
                // When setting text content, for security purposes it matters a lot
                // what the parent is. For example, <style> and <script> need to be
                // handled with care, while <span> does not. So first we need to put a
                // text node into the document, then we can sanitize its content.
                if (this._textSanitizer === undefined) {
                    this._textSanitizer = createSanitizer(textNode, 'data', 'property');
                }
                value = this._textSanitizer(value);
                debugLogEvent && debugLogEvent({
                    kind: 'commit text',
                    node: textNode,
                    value,
                    options: this.options
                });
                textNode.data = value;
            } else //TURBOPACK unreachable
            ;
        }
        this._$committedValue = value;
    }
    _commitTemplateResult(result) {
        var _this__$committedValue;
        // This property needs to remain unminified.
        const { values, ['_$litType$']: type } = result;
        // If $litType$ is a number, result is a plain TemplateResult and we get
        // the template from the template cache. If not, result is a
        // CompiledTemplateResult and _$litType$ is a CompiledTemplate and we need
        // to create the <template> element the first time we see it.
        const template = typeof type === 'number' ? this._$getTemplate(result) : (type.el === undefined && (type.el = Template.createElement(trustFromTemplateString(type.h, type.h[0]), this.options)), type);
        if (((_this__$committedValue = this._$committedValue) === null || _this__$committedValue === void 0 ? void 0 : _this__$committedValue._$template) === template) {
            debugLogEvent && debugLogEvent({
                kind: 'template updating',
                template,
                instance: this._$committedValue,
                parts: this._$committedValue._$parts,
                options: this.options,
                values
            });
            this._$committedValue._update(values);
        } else {
            const instance = new TemplateInstance(template, this);
            const fragment = instance._clone(this.options);
            debugLogEvent && debugLogEvent({
                kind: 'template instantiated',
                template,
                instance,
                parts: instance._$parts,
                options: this.options,
                fragment,
                values
            });
            instance._update(values);
            debugLogEvent && debugLogEvent({
                kind: 'template instantiated and updated',
                template,
                instance,
                parts: instance._$parts,
                options: this.options,
                fragment,
                values
            });
            this._commitNode(fragment);
            this._$committedValue = instance;
        }
    }
    // Overridden via `litHtmlPolyfillSupport` to provide platform support.
    /** @internal */ _$getTemplate(result) {
        let template = templateCache.get(result.strings);
        if (template === undefined) {
            templateCache.set(result.strings, template = new Template(result));
        }
        return template;
    }
    _commitIterable(value) {
        // For an Iterable, we create a new InstancePart per item, then set its
        // value to the item. This is a little bit of overhead for every item in
        // an Iterable, but it lets us recurse easily and efficiently update Arrays
        // of TemplateResults that will be commonly returned from expressions like:
        // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
        // If value is an array, then the previous render was of an
        // iterable and value will contain the ChildParts from the previous
        // render. If value is not an array, clear this part and make a new
        // array for ChildParts.
        if (!isArray(this._$committedValue)) {
            this._$committedValue = [];
            this._$clear();
        }
        // Lets us keep track of how many items we stamped so we can clear leftover
        // items from a previous render
        const itemParts = this._$committedValue;
        let partIndex = 0;
        let itemPart;
        for (const item of value){
            if (partIndex === itemParts.length) {
                // If no existing part, create a new one
                // TODO (justinfagnani): test perf impact of always creating two parts
                // instead of sharing parts between nodes
                // https://github.com/lit/lit/issues/1266
                itemParts.push(itemPart = new ChildPart(this._insert(createMarker()), this._insert(createMarker()), this, this.options));
            } else {
                // Reuse an existing part
                itemPart = itemParts[partIndex];
            }
            itemPart._$setValue(item);
            partIndex++;
        }
        if (partIndex < itemParts.length) {
            // itemParts always have end nodes
            this._$clear(itemPart && wrap(itemPart._$endNode).nextSibling, partIndex);
            // Truncate the parts array so _value reflects the current state
            itemParts.length = partIndex;
        }
    }
    /**
     * Removes the nodes contained within this Part from the DOM.
     *
     * @param start Start node to clear from, for clearing a subset of the part's
     *     DOM (used when truncating iterables)
     * @param from  When `start` is specified, the index within the iterable from
     *     which ChildParts are being removed, used for disconnecting directives
     *     in those Parts.
     *
     * @internal
     */ _$clear() {
        let start = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : wrap(this._$startNode).nextSibling, from = arguments.length > 1 ? arguments[1] : void 0;
        var _this__$notifyConnectionChanged, _this;
        (_this__$notifyConnectionChanged = (_this = this)._$notifyConnectionChanged) === null || _this__$notifyConnectionChanged === void 0 ? void 0 : _this__$notifyConnectionChanged.call(_this, false, true, from);
        while(start !== this._$endNode){
            // The non-null assertion is safe because if _$startNode.nextSibling is
            // null, then _$endNode is also null, and we would not have entered this
            // loop.
            const n = wrap(start).nextSibling;
            wrap(start).remove();
            start = n;
        }
    }
    /**
     * Implementation of RootPart's `isConnected`. Note that this method
     * should only be called on `RootPart`s (the `ChildPart` returned from a
     * top-level `render()` call). It has no effect on non-root ChildParts.
     * @param isConnected Whether to set
     * @internal
     */ setConnected(isConnected) {
        if (this._$parent === undefined) {
            var _this__$notifyConnectionChanged, _this;
            this.__isConnected = isConnected;
            (_this__$notifyConnectionChanged = (_this = this)._$notifyConnectionChanged) === null || _this__$notifyConnectionChanged === void 0 ? void 0 : _this__$notifyConnectionChanged.call(_this, isConnected);
        } else if ("TURBOPACK compile-time truthy", 1) {
            throw new Error('part.setConnected() may only be called on a ' + 'RootPart returned from render().');
        }
    }
    constructor(startNode, endNode, parent, options){
        this.type = CHILD_PART;
        this._$committedValue = nothing;
        // The following fields will be patched onto ChildParts when required by
        // AsyncDirective
        /** @internal */ this._$disconnectableChildren = undefined;
        this._$startNode = startNode;
        this._$endNode = endNode;
        this._$parent = parent;
        this.options = options;
        var _options_isConnected;
        // Note __isConnected is only ever accessed on RootParts (i.e. when there is
        // no _$parent); the value on a non-root-part is "don't care", but checking
        // for parent would be more code
        this.__isConnected = (_options_isConnected = options === null || options === void 0 ? void 0 : options.isConnected) !== null && _options_isConnected !== void 0 ? _options_isConnected : true;
        if ("TURBOPACK compile-time truthy", 1) {
            // Explicitly initialize for consistent class shape.
            this._textSanitizer = undefined;
        }
    }
}
class AttributePart {
    get tagName() {
        return this.element.tagName;
    }
    // See comment in Disconnectable interface for why this is a getter
    get _$isConnected() {
        return this._$parent._$isConnected;
    }
    /**
     * Sets the value of this part by resolving the value from possibly multiple
     * values and static strings and committing it to the DOM.
     * If this part is single-valued, `this._strings` will be undefined, and the
     * method will be called with a single value argument. If this part is
     * multi-value, `this._strings` will be defined, and the method is called
     * with the value array of the part's owning TemplateInstance, and an offset
     * into the value array from which the values should be read.
     * This method is overloaded this way to eliminate short-lived array slices
     * of the template instance values, and allow a fast-path for single-valued
     * parts.
     *
     * @param value The part value, or an array of values for multi-valued parts
     * @param valueIndex the index to start reading values from. `undefined` for
     *   single-valued parts
     * @param noCommit causes the part to not commit its value to the DOM. Used
     *   in hydration to prime attribute parts with their first-rendered value,
     *   but not set the attribute, and in SSR to no-op the DOM operation and
     *   capture the value for serialization.
     *
     * @internal
     */ _$setValue(value) {
        let directiveParent = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this, valueIndex = arguments.length > 2 ? arguments[2] : void 0, noCommit = arguments.length > 3 ? arguments[3] : void 0;
        const strings = this.strings;
        // Whether any of the values has changed, for dirty-checking
        let change = false;
        if (strings === undefined) {
            // Single-value binding case
            value = resolveDirective(this, value, directiveParent, 0);
            change = !isPrimitive(value) || value !== this._$committedValue && value !== noChange;
            if (change) {
                this._$committedValue = value;
            }
        } else {
            // Interpolation case
            const values = value;
            value = strings[0];
            let i, v;
            for(i = 0; i < strings.length - 1; i++){
                v = resolveDirective(this, values[valueIndex + i], directiveParent, i);
                if (v === noChange) {
                    // If the user-provided value is `noChange`, use the previous value
                    v = this._$committedValue[i];
                }
                change || (change = !isPrimitive(v) || v !== this._$committedValue[i]);
                if (v === nothing) {
                    value = nothing;
                } else if (value !== nothing) {
                    value += (v !== null && v !== void 0 ? v : '') + strings[i + 1];
                }
                // We always record each value, even if one is `nothing`, for future
                // change detection.
                this._$committedValue[i] = v;
            }
        }
        if (change && !noCommit) {
            this._commitValue(value);
        }
    }
    /** @internal */ _commitValue(value) {
        if (value === nothing) {
            wrap(this.element).removeAttribute(this.name);
        } else {
            if ("TURBOPACK compile-time truthy", 1) {
                if (this._sanitizer === undefined) {
                    this._sanitizer = sanitizerFactoryInternal(this.element, this.name, 'attribute');
                }
                value = this._sanitizer(value !== null && value !== void 0 ? value : '');
            }
            debugLogEvent && debugLogEvent({
                kind: 'commit attribute',
                element: this.element,
                name: this.name,
                value,
                options: this.options
            });
            wrap(this.element).setAttribute(this.name, value !== null && value !== void 0 ? value : '');
        }
    }
    constructor(element, name, strings, parent, options){
        this.type = ATTRIBUTE_PART;
        /** @internal */ this._$committedValue = nothing;
        /** @internal */ this._$disconnectableChildren = undefined;
        this.element = element;
        this.name = name;
        this._$parent = parent;
        this.options = options;
        if (strings.length > 2 || strings[0] !== '' || strings[1] !== '') {
            this._$committedValue = new Array(strings.length - 1).fill(new String());
            this.strings = strings;
        } else {
            this._$committedValue = nothing;
        }
        if ("TURBOPACK compile-time truthy", 1) {
            this._sanitizer = undefined;
        }
    }
}
class PropertyPart extends AttributePart {
    /** @internal */ _commitValue(value) {
        if ("TURBOPACK compile-time truthy", 1) {
            if (this._sanitizer === undefined) {
                this._sanitizer = sanitizerFactoryInternal(this.element, this.name, 'property');
            }
            value = this._sanitizer(value);
        }
        debugLogEvent && debugLogEvent({
            kind: 'commit property',
            element: this.element,
            name: this.name,
            value,
            options: this.options
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.element[this.name] = value === nothing ? undefined : value;
    }
    constructor(){
        super(...arguments);
        this.type = PROPERTY_PART;
    }
}
class BooleanAttributePart extends AttributePart {
    /** @internal */ _commitValue(value) {
        debugLogEvent && debugLogEvent({
            kind: 'commit boolean attribute',
            element: this.element,
            name: this.name,
            value: !!(value && value !== nothing),
            options: this.options
        });
        wrap(this.element).toggleAttribute(this.name, !!value && value !== nothing);
    }
    constructor(){
        super(...arguments);
        this.type = BOOLEAN_ATTRIBUTE_PART;
    }
}
class EventPart extends AttributePart {
    // EventPart does not use the base _$setValue/_resolveValue implementation
    // since the dirty checking is more complex
    /** @internal */ _$setValue(newListener) {
        let directiveParent = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this;
        var _resolveDirective;
        newListener = (_resolveDirective = resolveDirective(this, newListener, directiveParent, 0)) !== null && _resolveDirective !== void 0 ? _resolveDirective : nothing;
        if (newListener === noChange) {
            return;
        }
        const oldListener = this._$committedValue;
        // If the new value is nothing or any options change we have to remove the
        // part as a listener.
        const shouldRemoveListener = newListener === nothing && oldListener !== nothing || newListener.capture !== oldListener.capture || newListener.once !== oldListener.once || newListener.passive !== oldListener.passive;
        // If the new value is not nothing and we removed the listener, we have
        // to add the part as a listener.
        const shouldAddListener = newListener !== nothing && (oldListener === nothing || shouldRemoveListener);
        debugLogEvent && debugLogEvent({
            kind: 'commit event listener',
            element: this.element,
            name: this.name,
            value: newListener,
            options: this.options,
            removeListener: shouldRemoveListener,
            addListener: shouldAddListener,
            oldListener
        });
        if (shouldRemoveListener) {
            this.element.removeEventListener(this.name, this, oldListener);
        }
        if (shouldAddListener) {
            this.element.addEventListener(this.name, this, newListener);
        }
        this._$committedValue = newListener;
    }
    handleEvent(event) {
        if (typeof this._$committedValue === 'function') {
            var _this_options;
            var _this_options_host;
            this._$committedValue.call((_this_options_host = (_this_options = this.options) === null || _this_options === void 0 ? void 0 : _this_options.host) !== null && _this_options_host !== void 0 ? _this_options_host : this.element, event);
        } else {
            this._$committedValue.handleEvent(event);
        }
    }
    constructor(element, name, strings, parent, options){
        super(element, name, strings, parent, options);
        this.type = EVENT_PART;
        if (DEV_MODE && this.strings !== undefined) {
            throw new Error("A `<".concat(element.localName, ">` has a `@").concat(name, "=...` listener with ") + 'invalid content. Event listeners in templates must have exactly ' + 'one expression and no surrounding text.');
        }
    }
}
class ElementPart {
    // See comment in Disconnectable interface for why this is a getter
    get _$isConnected() {
        return this._$parent._$isConnected;
    }
    _$setValue(value) {
        debugLogEvent && debugLogEvent({
            kind: 'commit to element binding',
            element: this.element,
            value,
            options: this.options
        });
        resolveDirective(this, value);
    }
    constructor(element, parent, options){
        this.element = element;
        this.type = ELEMENT_PART;
        /** @internal */ this._$disconnectableChildren = undefined;
        this._$parent = parent;
        this.options = options;
    }
}
const _$LH = {
    // Used in lit-ssr
    _boundAttributeSuffix: boundAttributeSuffix,
    _marker: marker,
    _markerMatch: markerMatch,
    _HTML_RESULT: HTML_RESULT,
    _getTemplateHtml: getTemplateHtml,
    // Used in tests and private-ssr-support
    _TemplateInstance: TemplateInstance,
    _isIterable: isIterable,
    _resolveDirective: resolveDirective,
    _ChildPart: ChildPart,
    _AttributePart: AttributePart,
    _BooleanAttributePart: BooleanAttributePart,
    _EventPart: EventPart,
    _PropertyPart: PropertyPart,
    _ElementPart: ElementPart
};
// Apply polyfills if available
const polyfillSupport = ("TURBOPACK compile-time truthy", 1) ? global.litHtmlPolyfillSupportDevMode : "TURBOPACK unreachable";
polyfillSupport === null || polyfillSupport === void 0 ? void 0 : polyfillSupport(Template, ChildPart);
var _litHtmlVersions;
// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for lit-html usage.
((_litHtmlVersions = (_global = global).litHtmlVersions) !== null && _litHtmlVersions !== void 0 ? _litHtmlVersions : _global.litHtmlVersions = []).push('3.3.1');
if (DEV_MODE && global.litHtmlVersions.length > 1) {
    queueMicrotask(()=>{
        issueWarning('multiple-versions', "Multiple versions of Lit loaded. " + "Loading multiple versions is not recommended.");
    });
}
const render = (value, container, options)=>{
    if (DEV_MODE && container == null) {
        // Give a clearer error message than
        //     Uncaught TypeError: Cannot read properties of null (reading
        //     '_$litPart$')
        // which reads like an internal Lit error.
        throw new TypeError("The container to render into may not be ".concat(container));
    }
    const renderId = ("TURBOPACK compile-time truthy", 1) ? debugLogRenderId++ : "TURBOPACK unreachable";
    var _options_renderBefore;
    const partOwnerNode = (_options_renderBefore = options === null || options === void 0 ? void 0 : options.renderBefore) !== null && _options_renderBefore !== void 0 ? _options_renderBefore : container;
    // This property needs to remain unminified.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let part = partOwnerNode['_$litPart$'];
    debugLogEvent && debugLogEvent({
        kind: 'begin render',
        id: renderId,
        value,
        container,
        options,
        part
    });
    if (part === undefined) {
        var _options_renderBefore1;
        const endNode = (_options_renderBefore1 = options === null || options === void 0 ? void 0 : options.renderBefore) !== null && _options_renderBefore1 !== void 0 ? _options_renderBefore1 : null;
        // This property needs to remain unminified.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        partOwnerNode['_$litPart$'] = part = new ChildPart(container.insertBefore(createMarker(), endNode), endNode, undefined, options !== null && options !== void 0 ? options : {});
    }
    part._$setValue(value);
    debugLogEvent && debugLogEvent({
        kind: 'end render',
        id: renderId,
        value,
        container,
        options,
        part
    });
    return part;
};
if ("TURBOPACK compile-time truthy", 1) {
    render.setSanitizer = setSanitizer;
    render.createSanitizer = createSanitizer;
    if ("TURBOPACK compile-time truthy", 1) {
        render._testOnlyClearSanitizerFactoryDoNotCallOrElse = _testOnlyClearSanitizerFactoryDoNotCallOrElse;
    }
} //# sourceMappingURL=lit-html.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit-html/development/is-server.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ /**
 * @fileoverview
 *
 * This file exports a boolean const whose value will depend on what environment
 * the module is being imported from.
 */ __turbopack_context__.s([
    "isServer",
    ()=>isServer
]);
const NODE_MODE = false;
const isServer = NODE_MODE; //# sourceMappingURL=is-server.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit-html/development/directives/if-defined.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ __turbopack_context__.s([
    "ifDefined",
    ()=>ifDefined
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit-html/development/lit-html.js [app-client] (ecmascript)");
;
const ifDefined = (value)=>value !== null && value !== void 0 ? value : __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nothing"]; //# sourceMappingURL=if-defined.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-html/development/directives/if-defined.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ __turbopack_context__.s([
    "ifDefined",
    ()=>ifDefined
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-html/development/lit-html.js [app-client] (ecmascript)");
;
const ifDefined = (value)=>value !== null && value !== void 0 ? value : __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nothing"]; //# sourceMappingURL=if-defined.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-html/development/directive-helpers.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ __turbopack_context__.s([
    "TemplateResultType",
    ()=>TemplateResultType,
    "clearPart",
    ()=>clearPart,
    "getCommittedValue",
    ()=>getCommittedValue,
    "getDirectiveClass",
    ()=>getDirectiveClass,
    "insertPart",
    ()=>insertPart,
    "isCompiledTemplateResult",
    ()=>isCompiledTemplateResult,
    "isDirectiveResult",
    ()=>isDirectiveResult,
    "isPrimitive",
    ()=>isPrimitive,
    "isSingleExpression",
    ()=>isSingleExpression,
    "isTemplateResult",
    ()=>isTemplateResult,
    "removePart",
    ()=>removePart,
    "setChildPartValue",
    ()=>setChildPartValue,
    "setCommittedValue",
    ()=>setCommittedValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-html/development/lit-html.js [app-client] (ecmascript)");
var _window_ShadyDOM, _window_ShadyDOM1;
;
const { _ChildPart: ChildPart } = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_$LH"];
const ENABLE_SHADYDOM_NOPATCH = true;
const wrap = ENABLE_SHADYDOM_NOPATCH && ((_window_ShadyDOM = window.ShadyDOM) === null || _window_ShadyDOM === void 0 ? void 0 : _window_ShadyDOM.inUse) && ((_window_ShadyDOM1 = window.ShadyDOM) === null || _window_ShadyDOM1 === void 0 ? void 0 : _window_ShadyDOM1.noPatch) === true ? window.ShadyDOM.wrap : (node)=>node;
const isPrimitive = (value)=>value === null || typeof value != 'object' && typeof value != 'function';
const TemplateResultType = {
    HTML: 1,
    SVG: 2,
    MATHML: 3
};
const isTemplateResult = (value, type)=>type === undefined ? (value === null || value === void 0 ? void 0 : value['_$litType$']) !== undefined : (value === null || value === void 0 ? void 0 : value['_$litType$']) === type;
const isCompiledTemplateResult = (value)=>{
    var _value__$litType$;
    return (value === null || value === void 0 ? void 0 : (_value__$litType$ = value['_$litType$']) === null || _value__$litType$ === void 0 ? void 0 : _value__$litType$.h) != null;
};
const isDirectiveResult = (value)=>// This property needs to remain unminified.
    (value === null || value === void 0 ? void 0 : value['_$litDirective$']) !== undefined;
const getDirectiveClass = (value)=>// This property needs to remain unminified.
    value === null || value === void 0 ? void 0 : value['_$litDirective$'];
const isSingleExpression = (part)=>part.strings === undefined;
const createMarker = ()=>document.createComment('');
const insertPart = (containerPart, refPart, part)=>{
    const container = wrap(containerPart._$startNode).parentNode;
    const refNode = refPart === undefined ? containerPart._$endNode : refPart._$startNode;
    if (part === undefined) {
        const startNode = wrap(container).insertBefore(createMarker(), refNode);
        const endNode = wrap(container).insertBefore(createMarker(), refNode);
        part = new ChildPart(startNode, endNode, containerPart, containerPart.options);
    } else {
        const endNode = wrap(part._$endNode).nextSibling;
        const oldParent = part._$parent;
        const parentChanged = oldParent !== containerPart;
        if (parentChanged) {
            var _part__$reparentDisconnectables;
            (_part__$reparentDisconnectables = part._$reparentDisconnectables) === null || _part__$reparentDisconnectables === void 0 ? void 0 : _part__$reparentDisconnectables.call(part, containerPart);
            // Note that although `_$reparentDisconnectables` updates the part's
            // `_$parent` reference after unlinking from its current parent, that
            // method only exists if Disconnectables are present, so we need to
            // unconditionally set it here
            part._$parent = containerPart;
            // Since the _$isConnected getter is somewhat costly, only
            // read it once we know the subtree has directives that need
            // to be notified
            let newConnectionState;
            if (part._$notifyConnectionChanged !== undefined && (newConnectionState = containerPart._$isConnected) !== oldParent._$isConnected) {
                part._$notifyConnectionChanged(newConnectionState);
            }
        }
        if (endNode !== refNode || parentChanged) {
            let start = part._$startNode;
            while(start !== endNode){
                const n = wrap(start).nextSibling;
                wrap(container).insertBefore(start, refNode);
                start = n;
            }
        }
    }
    return part;
};
const setChildPartValue = function(part, value) {
    let directiveParent = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : part;
    part._$setValue(value, directiveParent);
    return part;
};
// A sentinel value that can never appear as a part value except when set by
// live(). Used to force a dirty-check to fail and cause a re-render.
const RESET_VALUE = {};
const setCommittedValue = function(part) {
    let value = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : RESET_VALUE;
    return part._$committedValue = value;
};
const getCommittedValue = (part)=>part._$committedValue;
const removePart = (part)=>{
    part._$clear();
    part._$startNode.remove();
};
const clearPart = (part)=>{
    part._$clear();
}; //# sourceMappingURL=directive-helpers.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-html/development/directive.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ __turbopack_context__.s([
    "Directive",
    ()=>Directive,
    "PartType",
    ()=>PartType,
    "directive",
    ()=>directive
]);
const PartType = {
    ATTRIBUTE: 1,
    CHILD: 2,
    PROPERTY: 3,
    BOOLEAN_ATTRIBUTE: 4,
    EVENT: 5,
    ELEMENT: 6
};
const directive = (c)=>function() {
        for(var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++){
            values[_key] = arguments[_key];
        }
        return {
            // This property needs to remain unminified.
            ['_$litDirective$']: c,
            values
        };
    };
class Directive {
    // See comment in Disconnectable interface for why this is a getter
    get _$isConnected() {
        return this._$parent._$isConnected;
    }
    /** @internal */ _$initialize(part, parent, attributeIndex) {
        this.__part = part;
        this._$parent = parent;
        this.__attributeIndex = attributeIndex;
    }
    /** @internal */ _$resolve(part, props) {
        return this.update(part, props);
    }
    update(_part, props) {
        return this.render(...props);
    }
    constructor(_partInfo){}
} //# sourceMappingURL=directive.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-html/development/async-directive.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ __turbopack_context__.s([
    "AsyncDirective",
    ()=>AsyncDirective
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$directive$2d$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-html/development/directive-helpers.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$directive$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-html/development/directive.js [app-client] (ecmascript)");
;
;
;
const DEV_MODE = true;
/**
 * Recursively walks down the tree of Parts/TemplateInstances/Directives to set
 * the connected state of directives and run `disconnected`/ `reconnected`
 * callbacks.
 *
 * @return True if there were children to disconnect; false otherwise
 */ const notifyChildrenConnectedChanged = (parent, isConnected)=>{
    const children = parent._$disconnectableChildren;
    if (children === undefined) {
        return false;
    }
    for (const obj of children){
        var // The existence of `_$notifyDirectiveConnectionChanged` is used as a "brand" to
        // disambiguate AsyncDirectives from other DisconnectableChildren
        // (as opposed to using an instanceof check to know when to call it); the
        // redundancy of "Directive" in the API name is to avoid conflicting with
        // `_$notifyConnectionChanged`, which exists `ChildParts` which are also in
        // this list
        // Disconnect Directive (and any nested directives contained within)
        // This property needs to remain unminified.
        _obj__$notifyDirectiveConnectionChanged;
        (_obj__$notifyDirectiveConnectionChanged = obj['_$notifyDirectiveConnectionChanged']) === null || _obj__$notifyDirectiveConnectionChanged === void 0 ? void 0 : _obj__$notifyDirectiveConnectionChanged.call(obj, isConnected, false);
        // Disconnect Part/TemplateInstance
        notifyChildrenConnectedChanged(obj, isConnected);
    }
    return true;
};
/**
 * Removes the given child from its parent list of disconnectable children, and
 * if the parent list becomes empty as a result, removes the parent from its
 * parent, and so forth up the tree when that causes subsequent parent lists to
 * become empty.
 */ const removeDisconnectableFromParent = (obj)=>{
    let parent, children;
    do {
        if ((parent = obj._$parent) === undefined) {
            break;
        }
        children = parent._$disconnectableChildren;
        children.delete(obj);
        obj = parent;
    }while ((children === null || children === void 0 ? void 0 : children.size) === 0)
};
const addDisconnectableToParent = (obj)=>{
    // Climb the parent tree, creating a sparse tree of children needing
    // disconnection
    for(let parent; parent = obj._$parent; obj = parent){
        let children = parent._$disconnectableChildren;
        if (children === undefined) {
            parent._$disconnectableChildren = children = new Set();
        } else if (children.has(obj)) {
            break;
        }
        children.add(obj);
        installDisconnectAPI(parent);
    }
};
/**
 * Changes the parent reference of the ChildPart, and updates the sparse tree of
 * Disconnectable children accordingly.
 *
 * Note, this method will be patched onto ChildPart instances and called from
 * the core code when parts are moved between different parents.
 */ function reparentDisconnectables(newParent) {
    if (this._$disconnectableChildren !== undefined) {
        removeDisconnectableFromParent(this);
        this._$parent = newParent;
        addDisconnectableToParent(this);
    } else {
        this._$parent = newParent;
    }
}
/**
 * Sets the connected state on any directives contained within the committed
 * value of this part (i.e. within a TemplateInstance or iterable of
 * ChildParts) and runs their `disconnected`/`reconnected`s, as well as within
 * any directives stored on the ChildPart (when `valueOnly` is false).
 *
 * `isClearingValue` should be passed as `true` on a top-level part that is
 * clearing itself, and not as a result of recursively disconnecting directives
 * as part of a `clear` operation higher up the tree. This both ensures that any
 * directive on this ChildPart that produced a value that caused the clear
 * operation is not disconnected, and also serves as a performance optimization
 * to avoid needless bookkeeping when a subtree is going away; when clearing a
 * subtree, only the top-most part need to remove itself from the parent.
 *
 * `fromPartIndex` is passed only in the case of a partial `_clear` running as a
 * result of truncating an iterable.
 *
 * Note, this method will be patched onto ChildPart instances and called from the
 * core code when parts are cleared or the connection state is changed by the
 * user.
 */ function notifyChildPartConnectedChanged(isConnected) {
    let isClearingValue = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false, fromPartIndex = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
    const value = this._$committedValue;
    const children = this._$disconnectableChildren;
    if (children === undefined || children.size === 0) {
        return;
    }
    if (isClearingValue) {
        if (Array.isArray(value)) {
            // Iterable case: Any ChildParts created by the iterable should be
            // disconnected and removed from this ChildPart's disconnectable
            // children (starting at `fromPartIndex` in the case of truncation)
            for(let i = fromPartIndex; i < value.length; i++){
                notifyChildrenConnectedChanged(value[i], false);
                removeDisconnectableFromParent(value[i]);
            }
        } else if (value != null) {
            // TemplateInstance case: If the value has disconnectable children (will
            // only be in the case that it is a TemplateInstance), we disconnect it
            // and remove it from this ChildPart's disconnectable children
            notifyChildrenConnectedChanged(value, false);
            removeDisconnectableFromParent(value);
        }
    } else {
        notifyChildrenConnectedChanged(this, isConnected);
    }
}
/**
 * Patches disconnection API onto ChildParts.
 */ const installDisconnectAPI = (obj)=>{
    if (obj.type == __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$directive$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PartType"].CHILD) {
        var _obj, _obj1;
        var __$notifyConnectionChanged;
        (__$notifyConnectionChanged = (_obj = obj)._$notifyConnectionChanged) !== null && __$notifyConnectionChanged !== void 0 ? __$notifyConnectionChanged : _obj._$notifyConnectionChanged = notifyChildPartConnectedChanged;
        var __$reparentDisconnectables;
        (__$reparentDisconnectables = (_obj1 = obj)._$reparentDisconnectables) !== null && __$reparentDisconnectables !== void 0 ? __$reparentDisconnectables : _obj1._$reparentDisconnectables = reparentDisconnectables;
    }
};
class AsyncDirective extends __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$directive$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Directive"] {
    /**
     * Initialize the part with internal fields
     * @param part
     * @param parent
     * @param attributeIndex
     */ _$initialize(part, parent, attributeIndex) {
        super._$initialize(part, parent, attributeIndex);
        addDisconnectableToParent(this);
        this.isConnected = part._$isConnected;
    }
    // This property needs to remain unminified.
    /**
     * Called from the core code when a directive is going away from a part (in
     * which case `shouldRemoveFromParent` should be true), and from the
     * `setChildrenConnected` helper function when recursively changing the
     * connection state of a tree (in which case `shouldRemoveFromParent` should
     * be false).
     *
     * @param isConnected
     * @param isClearingDirective - True when the directive itself is being
     *     removed; false when the tree is being disconnected
     * @internal
     */ ['_$notifyDirectiveConnectionChanged'](isConnected) {
        let isClearingDirective = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
        if (isConnected !== this.isConnected) {
            this.isConnected = isConnected;
            if (isConnected) {
                var _this_reconnected, _this;
                (_this_reconnected = (_this = this).reconnected) === null || _this_reconnected === void 0 ? void 0 : _this_reconnected.call(_this);
            } else {
                var _this_disconnected, _this1;
                (_this_disconnected = (_this1 = this).disconnected) === null || _this_disconnected === void 0 ? void 0 : _this_disconnected.call(_this1);
            }
        }
        if (isClearingDirective) {
            notifyChildrenConnectedChanged(this, isConnected);
            removeDisconnectableFromParent(this);
        }
    }
    /**
     * Sets the value of the directive's Part outside the normal `update`/`render`
     * lifecycle of a directive.
     *
     * This method should not be called synchronously from a directive's `update`
     * or `render`.
     *
     * @param directive The directive to update
     * @param value The value to set
     */ setValue(value) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$directive$2d$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSingleExpression"])(this.__part)) {
            this.__part._$setValue(value, this);
        } else {
            // this.__attributeIndex will be defined in this case, but
            // assert it in dev mode
            if (DEV_MODE && this.__attributeIndex === undefined) {
                throw new Error("Expected this.__attributeIndex to be a number");
            }
            const newValues = [
                ...this.__part._$committedValue
            ];
            newValues[this.__attributeIndex] = value;
            this.__part._$setValue(newValues, this, 0);
        }
    }
    /**
     * User callbacks for implementing logic to release any resources/subscriptions
     * that may have been retained by this directive. Since directives may also be
     * re-connected, `reconnected` should also be implemented to restore the
     * working state of the directive prior to the next render.
     */ disconnected() {}
    reconnected() {}
    constructor(){
        super(...arguments);
        // @internal
        this._$disconnectableChildren = undefined;
    }
} //# sourceMappingURL=async-directive.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-html/development/directives/private-async-helpers.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ // Note, this module is not included in package exports so that it's private to
// our first-party directives. If it ends up being useful, we can open it up and
// export it.
/**
 * Helper to iterate an AsyncIterable in its own closure.
 * @param iterable The iterable to iterate
 * @param callback The callback to call for each value. If the callback returns
 * `false`, the loop will be broken.
 */ __turbopack_context__.s([
    "Pauser",
    ()=>Pauser,
    "PseudoWeakRef",
    ()=>PseudoWeakRef,
    "forAwaitOf",
    ()=>forAwaitOf
]);
const forAwaitOf = async (iterable, callback)=>{
    for await (const v of iterable){
        if (await callback(v) === false) {
            return;
        }
    }
};
class PseudoWeakRef {
    /**
     * Disassociates the ref with the backing instance.
     */ disconnect() {
        this._ref = undefined;
    }
    /**
     * Reassociates the ref with the backing instance.
     */ reconnect(ref) {
        this._ref = ref;
    }
    /**
     * Retrieves the backing instance (will be undefined when disconnected)
     */ deref() {
        return this._ref;
    }
    constructor(ref){
        this._ref = ref;
    }
}
class Pauser {
    /**
     * When paused, returns a promise to be awaited; when unpaused, returns
     * undefined. Note that in the microtask between the pauser being resumed
     * an await of this promise resolving, the pauser could be paused again,
     * hence callers should check the promise in a loop when awaiting.
     * @returns A promise to be awaited when paused or undefined
     */ get() {
        return this._promise;
    }
    /**
     * Creates a promise to be awaited
     */ pause() {
        var _this__promise;
        (_this__promise = this._promise) !== null && _this__promise !== void 0 ? _this__promise : this._promise = new Promise((resolve)=>this._resolve = resolve);
    }
    /**
     * Resolves the promise which may be awaited
     */ resume() {
        var _this__resolve, _this;
        (_this__resolve = (_this = this)._resolve) === null || _this__resolve === void 0 ? void 0 : _this__resolve.call(_this);
        this._promise = this._resolve = undefined;
    }
    constructor(){
        this._promise = undefined;
        this._resolve = undefined;
    }
} //# sourceMappingURL=private-async-helpers.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-html/development/directives/until.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ __turbopack_context__.s([
    "UntilDirective",
    ()=>UntilDirective,
    "until",
    ()=>until
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-html/development/lit-html.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$directive$2d$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-html/development/directive-helpers.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$async$2d$directive$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-html/development/async-directive.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$directive$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-html/development/directive.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$directives$2f$private$2d$async$2d$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-html/development/directives/private-async-helpers.js [app-client] (ecmascript)");
;
;
;
;
const isPromise = (x)=>{
    return !(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$directive$2d$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isPrimitive"])(x) && typeof x.then === 'function';
};
// Effectively infinity, but a SMI.
const _infinity = 0x3fffffff;
class UntilDirective extends __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$async$2d$directive$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["AsyncDirective"] {
    render() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        var _args_find;
        return (_args_find = args.find((x)=>!isPromise(x))) !== null && _args_find !== void 0 ? _args_find : __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noChange"];
    }
    update(_part, args) {
        const previousValues = this.__values;
        let previousLength = previousValues.length;
        this.__values = args;
        const weakThis = this.__weakThis;
        const pauser = this.__pauser;
        // If our initial render occurs while disconnected, ensure that the pauser
        // and weakThis are in the disconnected state
        if (!this.isConnected) {
            this.disconnected();
        }
        for(let i = 0; i < args.length; i++){
            // If we've rendered a higher-priority value already, stop.
            if (i > this.__lastRenderedIndex) {
                break;
            }
            const value = args[i];
            // Render non-Promise values immediately
            if (!isPromise(value)) {
                this.__lastRenderedIndex = i;
                // Since a lower-priority value will never overwrite a higher-priority
                // synchronous value, we can stop processing now.
                return value;
            }
            // If this is a Promise we've already handled, skip it.
            if (i < previousLength && value === previousValues[i]) {
                continue;
            }
            // We have a Promise that we haven't seen before, so priorities may have
            // changed. Forget what we rendered before.
            this.__lastRenderedIndex = _infinity;
            previousLength = 0;
            // Note, the callback avoids closing over `this` so that the directive
            // can be gc'ed before the promise resolves; instead `this` is retrieved
            // from `weakThis`, which can break the hard reference in the closure when
            // the directive disconnects
            Promise.resolve(value).then(async (result)=>{
                // If we're disconnected, wait until we're (maybe) reconnected
                // The while loop here handles the case that the connection state
                // thrashes, causing the pauser to resume and then get re-paused
                while(pauser.get()){
                    await pauser.get();
                }
                // If the callback gets here and there is no `this`, it means that the
                // directive has been disconnected and garbage collected and we don't
                // need to do anything else
                const _this = weakThis.deref();
                if (_this !== undefined) {
                    const index = _this.__values.indexOf(value);
                    // If state.values doesn't contain the value, we've re-rendered without
                    // the value, so don't render it. Then, only render if the value is
                    // higher-priority than what's already been rendered.
                    if (index > -1 && index < _this.__lastRenderedIndex) {
                        _this.__lastRenderedIndex = index;
                        _this.setValue(result);
                    }
                }
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noChange"];
    }
    disconnected() {
        this.__weakThis.disconnect();
        this.__pauser.pause();
    }
    reconnected() {
        this.__weakThis.reconnect(this);
        this.__pauser.resume();
    }
    constructor(){
        super(...arguments);
        this.__lastRenderedIndex = _infinity;
        this.__values = [];
        this.__weakThis = new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$directives$2f$private$2d$async$2d$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PseudoWeakRef"](this);
        this.__pauser = new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$directives$2f$private$2d$async$2d$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pauser"]();
    }
}
const until = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$directive$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["directive"])(UntilDirective); /**
 * The type of the class that powers this directive. Necessary for naming the
 * directive's return type.
 */  // export type {UntilDirective};
 //# sourceMappingURL=until.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-html/development/directives/class-map.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ __turbopack_context__.s([
    "classMap",
    ()=>classMap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-html/development/lit-html.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$directive$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-html/development/directive.js [app-client] (ecmascript)");
;
;
class ClassMapDirective extends __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$directive$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Directive"] {
    render(classInfo) {
        // Add spaces to ensure separation from static classes
        return ' ' + Object.keys(classInfo).filter((key)=>classInfo[key]).join(' ') + ' ';
    }
    update(part, param) {
        let [classInfo] = param;
        // Remember dynamic classes on the first render
        if (this._previousClasses === undefined) {
            this._previousClasses = new Set();
            if (part.strings !== undefined) {
                this._staticClasses = new Set(part.strings.join(' ').split(/\s/).filter((s)=>s !== ''));
            }
            for(const name in classInfo){
                var _this__staticClasses;
                if (classInfo[name] && !((_this__staticClasses = this._staticClasses) === null || _this__staticClasses === void 0 ? void 0 : _this__staticClasses.has(name))) {
                    this._previousClasses.add(name);
                }
            }
            return this.render(classInfo);
        }
        const classList = part.element.classList;
        // Remove old classes that no longer apply
        for (const name of this._previousClasses){
            if (!(name in classInfo)) {
                classList.remove(name);
                this._previousClasses.delete(name);
            }
        }
        // Add or remove classes based on their classMap value
        for(const name in classInfo){
            var _this__staticClasses1;
            // We explicitly want a loose truthy check of `value` because it seems
            // more convenient that '' and 0 are skipped.
            const value = !!classInfo[name];
            if (value !== this._previousClasses.has(name) && !((_this__staticClasses1 = this._staticClasses) === null || _this__staticClasses1 === void 0 ? void 0 : _this__staticClasses1.has(name))) {
                if (value) {
                    classList.add(name);
                    this._previousClasses.add(name);
                } else {
                    classList.remove(name);
                    this._previousClasses.delete(name);
                }
            }
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noChange"];
    }
    constructor(partInfo){
        var _partInfo_strings;
        super(partInfo);
        if (partInfo.type !== __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$directive$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PartType"].ATTRIBUTE || partInfo.name !== 'class' || ((_partInfo_strings = partInfo.strings) === null || _partInfo_strings === void 0 ? void 0 : _partInfo_strings.length) > 2) {
            throw new Error('`classMap()` can only be used in the `class` attribute ' + 'and must be the only part in the attribute.');
        }
    }
}
const classMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$directive$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["directive"])(ClassMapDirective); //# sourceMappingURL=class-map.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-html/development/directives/ref.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ __turbopack_context__.s([
    "createRef",
    ()=>createRef,
    "ref",
    ()=>ref
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-html/development/lit-html.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$async$2d$directive$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-html/development/async-directive.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$directive$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-html/development/directive.js [app-client] (ecmascript)");
;
;
const createRef = ()=>new Ref();
/**
 * An object that holds a ref value.
 */ class Ref {
}
// When callbacks are used for refs, this map tracks the last value the callback
// was called with, for ensuring a directive doesn't clear the ref if the ref
// has already been rendered to a new spot. It is double-keyed on both the
// context (`options.host`) and the callback, since we auto-bind class methods
// to `options.host`.
const lastElementForContextAndCallback = new WeakMap();
class RefDirective extends __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$async$2d$directive$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["AsyncDirective"] {
    render(_ref) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nothing"];
    }
    update(part, param) {
        let [ref] = param;
        const refChanged = ref !== this._ref;
        if (refChanged && this._ref !== undefined) {
            // The ref passed to the directive has changed;
            // unset the previous ref's value
            this._updateRefValue(undefined);
        }
        if (refChanged || this._lastElementForRef !== this._element) {
            var _part_options;
            // We either got a new ref or this is the first render;
            // store the ref/element & update the ref value
            this._ref = ref;
            this._context = (_part_options = part.options) === null || _part_options === void 0 ? void 0 : _part_options.host;
            this._updateRefValue(this._element = part.element);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nothing"];
    }
    _updateRefValue(element) {
        if (!this.isConnected) {
            element = undefined;
        }
        if (typeof this._ref === 'function') {
            var _this__context;
            // If the current ref was called with a previous value, call with
            // `undefined`; We do this to ensure callbacks are called in a consistent
            // way regardless of whether a ref might be moving up in the tree (in
            // which case it would otherwise be called with the new value before the
            // previous one unsets it) and down in the tree (where it would be unset
            // before being set). Note that element lookup is keyed by
            // both the context and the callback, since we allow passing unbound
            // functions that are called on options.host, and we want to treat
            // these as unique "instances" of a function.
            const context = (_this__context = this._context) !== null && _this__context !== void 0 ? _this__context : globalThis;
            let lastElementForCallback = lastElementForContextAndCallback.get(context);
            if (lastElementForCallback === undefined) {
                lastElementForCallback = new WeakMap();
                lastElementForContextAndCallback.set(context, lastElementForCallback);
            }
            if (lastElementForCallback.get(this._ref) !== undefined) {
                this._ref.call(this._context, undefined);
            }
            lastElementForCallback.set(this._ref, element);
            // Call the ref with the new element value
            if (element !== undefined) {
                this._ref.call(this._context, element);
            }
        } else {
            this._ref.value = element;
        }
    }
    get _lastElementForRef() {
        var _lastElementForContextAndCallback_get, _this__ref;
        var _this__context;
        return typeof this._ref === 'function' ? (_lastElementForContextAndCallback_get = lastElementForContextAndCallback.get((_this__context = this._context) !== null && _this__context !== void 0 ? _this__context : globalThis)) === null || _lastElementForContextAndCallback_get === void 0 ? void 0 : _lastElementForContextAndCallback_get.get(this._ref) : (_this__ref = this._ref) === null || _this__ref === void 0 ? void 0 : _this__ref.value;
    }
    disconnected() {
        // Only clear the box if our element is still the one in it (i.e. another
        // directive instance hasn't rendered its element to it before us); that
        // only happens in the event of the directive being cleared (not via manual
        // disconnection)
        if (this._lastElementForRef === this._element) {
            this._updateRefValue(undefined);
        }
    }
    reconnected() {
        // If we were manually disconnected, we can safely put our element back in
        // the box, since no rendering could have occurred to change its state
        this._updateRefValue(this._element);
    }
}
const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$directive$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["directive"])(RefDirective); //# sourceMappingURL=ref.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit-element/development/lit-element.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ /**
 * The main LitElement module, which defines the {@linkcode LitElement} base
 * class and related APIs.
 *
 * LitElement components can define a template and a set of observed
 * properties. Changing an observed property triggers a re-render of the
 * element.
 *
 * Import {@linkcode LitElement} and {@linkcode html} from this module to
 * create a component:
 *
 *  ```js
 * import {LitElement, html} from 'lit-element';
 *
 * class MyElement extends LitElement {
 *
 *   // Declare observed properties
 *   static get properties() {
 *     return {
 *       adjective: {}
 *     }
 *   }
 *
 *   constructor() {
 *     this.adjective = 'awesome';
 *   }
 *
 *   // Define the element's template
 *   render() {
 *     return html`<p>your ${adjective} template here</p>`;
 *   }
 * }
 *
 * customElements.define('my-element', MyElement);
 * ```
 *
 * `LitElement` extends {@linkcode ReactiveElement} and adds lit-html
 * templating. The `ReactiveElement` class is provided for users that want to
 * build their own custom element base classes that don't use lit-html.
 *
 * @packageDocumentation
 */ __turbopack_context__.s([
    "LitElement",
    ()=>LitElement,
    "_$LE",
    ()=>_$LE
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/@lit/reactive-element/development/reactive-element.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit-html/development/lit-html.js [app-client] (ecmascript)");
var // Install hydration if available
_global_litElementHydrateSupport;
var _global;
;
;
;
;
/*
 * When using Closure Compiler, JSCompiler_renameProperty(property, object) is
 * replaced at compile time by the munged name for object[property]. We cannot
 * alias this function, so we have to use a small shim that has the same
 * behavior when not compiling.
 */ /*@__INLINE__*/ const JSCompiler_renameProperty = (prop, _obj)=>prop;
const DEV_MODE = true;
// Allows minifiers to rename references to globalThis
const global = globalThis;
let issueWarning;
if ("TURBOPACK compile-time truthy", 1) {
    var // Ensure warnings are issued only 1x, even if multiple versions of Lit
    // are loaded.
    _global1;
    var _litIssuedWarnings;
    (_litIssuedWarnings = (_global1 = global).litIssuedWarnings) !== null && _litIssuedWarnings !== void 0 ? _litIssuedWarnings : _global1.litIssuedWarnings = new Set();
    /**
     * Issue a warning if we haven't already, based either on `code` or `warning`.
     * Warnings are disabled automatically only by `warning`; disabling via `code`
     * can be done by users.
     */ issueWarning = (code, warning)=>{
        warning += " See https://lit.dev/msg/".concat(code, " for more information.");
        if (!global.litIssuedWarnings.has(warning) && !global.litIssuedWarnings.has(code)) {
            console.warn(warning);
            global.litIssuedWarnings.add(warning);
        }
    };
}
class LitElement extends __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ReactiveElement"] {
    /**
     * @category rendering
     */ createRenderRoot() {
        var // When adoptedStyleSheets are shimmed, they are inserted into the
        // shadowRoot by createRenderRoot. Adjust the renderBefore node so that
        // any styles in Lit content render before adoptedStyleSheets. This is
        // important so that adoptedStyleSheets have precedence over styles in
        // the shadowRoot.
        _this_renderOptions;
        const renderRoot = super.createRenderRoot();
        var _renderBefore;
        (_renderBefore = (_this_renderOptions = this.renderOptions).renderBefore) !== null && _renderBefore !== void 0 ? _renderBefore : _this_renderOptions.renderBefore = renderRoot.firstChild;
        return renderRoot;
    }
    /**
     * Updates the element. This method reflects property values to attributes
     * and calls `render` to render DOM via lit-html. Setting properties inside
     * this method will *not* trigger another update.
     * @param changedProperties Map of changed properties with old values
     * @category updates
     */ update(changedProperties) {
        // Setting properties in `render` should not trigger an update. Since
        // updates are allowed after super.update, it's important to call `render`
        // before that.
        const value = this.render();
        if (!this.hasUpdated) {
            this.renderOptions.isConnected = this.isConnected;
        }
        super.update(changedProperties);
        this.__childPart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["render"])(value, this.renderRoot, this.renderOptions);
    }
    /**
     * Invoked when the component is added to the document's DOM.
     *
     * In `connectedCallback()` you should setup tasks that should only occur when
     * the element is connected to the document. The most common of these is
     * adding event listeners to nodes external to the element, like a keydown
     * event handler added to the window.
     *
     * ```ts
     * connectedCallback() {
     *   super.connectedCallback();
     *   addEventListener('keydown', this._handleKeydown);
     * }
     * ```
     *
     * Typically, anything done in `connectedCallback()` should be undone when the
     * element is disconnected, in `disconnectedCallback()`.
     *
     * @category lifecycle
     */ connectedCallback() {
        var _this___childPart;
        super.connectedCallback();
        (_this___childPart = this.__childPart) === null || _this___childPart === void 0 ? void 0 : _this___childPart.setConnected(true);
    }
    /**
     * Invoked when the component is removed from the document's DOM.
     *
     * This callback is the main signal to the element that it may no longer be
     * used. `disconnectedCallback()` should ensure that nothing is holding a
     * reference to the element (such as event listeners added to nodes external
     * to the element), so that it is free to be garbage collected.
     *
     * ```ts
     * disconnectedCallback() {
     *   super.disconnectedCallback();
     *   window.removeEventListener('keydown', this._handleKeydown);
     * }
     * ```
     *
     * An element may be re-connected after being disconnected.
     *
     * @category lifecycle
     */ disconnectedCallback() {
        var _this___childPart;
        super.disconnectedCallback();
        (_this___childPart = this.__childPart) === null || _this___childPart === void 0 ? void 0 : _this___childPart.setConnected(false);
    }
    /**
     * Invoked on each update to perform rendering tasks. This method may return
     * any value renderable by lit-html's `ChildPart` - typically a
     * `TemplateResult`. Setting properties inside this method will *not* trigger
     * the element to update.
     * @category rendering
     */ render() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noChange"];
    }
    constructor(){
        super(...arguments);
        /**
         * @category rendering
         */ this.renderOptions = {
            host: this
        };
        this.__childPart = undefined;
    }
}
// This property needs to remain unminified.
LitElement['_$litElement$'] = true;
/**
 * Ensure this class is marked as `finalized` as an optimization ensuring
 * it will not needlessly try to `finalize`.
 *
 * Note this property name is a string to prevent breaking Closure JS Compiler
 * optimizations. See @lit/reactive-element for more information.
 */ LitElement[JSCompiler_renameProperty('finalized', LitElement)] = true;
(_global_litElementHydrateSupport = global.litElementHydrateSupport) === null || _global_litElementHydrateSupport === void 0 ? void 0 : _global_litElementHydrateSupport.call(global, {
    LitElement
});
// Apply polyfills if available
const polyfillSupport = ("TURBOPACK compile-time truthy", 1) ? global.litElementPolyfillSupportDevMode : "TURBOPACK unreachable";
polyfillSupport === null || polyfillSupport === void 0 ? void 0 : polyfillSupport({
    LitElement
});
const _$LE = {
    _$attributeToProperty: (el, name, value)=>{
        // eslint-disable-next-line
        el._$attributeToProperty(name, value);
    },
    // eslint-disable-next-line
    _$changedProperties: (el)=>el._$changedProperties
};
var _litElementVersions;
// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for LitElement usage.
((_litElementVersions = (_global = global).litElementVersions) !== null && _litElementVersions !== void 0 ? _litElementVersions : _global.litElementVersions = []).push('4.2.1');
if (DEV_MODE && global.litElementVersions.length > 1) {
    queueMicrotask(()=>{
        issueWarning('multiple-versions', "Multiple versions of Lit loaded. Loading multiple versions " + "is not recommended.");
    });
} //# sourceMappingURL=lit-element.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit-element/development/lit-element.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CSSResult",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CSSResult"],
    "LitElement",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$element$2f$development$2f$lit$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LitElement"],
    "ReactiveElement",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReactiveElement"],
    "_$LE",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$element$2f$development$2f$lit$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["_$LE"],
    "_$LH",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_$LH"],
    "adoptStyles",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["adoptStyles"],
    "css",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["css"],
    "defaultConverter",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultConverter"],
    "getCompatibleStyle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCompatibleStyle"],
    "html",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"],
    "mathml",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mathml"],
    "noChange",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noChange"],
    "notEqual",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["notEqual"],
    "nothing",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nothing"],
    "render",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["render"],
    "supportsAdoptingStyleSheets",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supportsAdoptingStyleSheets"],
    "svg",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["svg"],
    "unsafeCSS",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["unsafeCSS"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$element$2f$development$2f$lit$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit-element/development/lit-element.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/@lit/reactive-element/development/reactive-element.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit-html/development/lit-html.js [app-client] (ecmascript)");
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-element/development/lit-element.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CSSResult",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CSSResult"],
    "LitElement",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$element$2f$development$2f$lit$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LitElement"],
    "ReactiveElement",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReactiveElement"],
    "_$LE",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$element$2f$development$2f$lit$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["_$LE"],
    "_$LH",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_$LH"],
    "adoptStyles",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["adoptStyles"],
    "css",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["css"],
    "defaultConverter",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultConverter"],
    "getCompatibleStyle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCompatibleStyle"],
    "html",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"],
    "mathml",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mathml"],
    "noChange",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noChange"],
    "notEqual",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["notEqual"],
    "nothing",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nothing"],
    "render",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["render"],
    "supportsAdoptingStyleSheets",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supportsAdoptingStyleSheets"],
    "svg",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["svg"],
    "unsafeCSS",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["unsafeCSS"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$element$2f$development$2f$lit$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-element/development/lit-element.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/reactive-element.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-html/development/lit-html.js [app-client] (ecmascript)");
}),
"[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit/index.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/@lit/reactive-element/development/reactive-element.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit-html/development/lit-html.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$element$2f$development$2f$lit$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit-element/development/lit-element.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$is$2d$server$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit-html/development/is-server.js [app-client] (ecmascript)"); //# sourceMappingURL=index.js.map
;
;
;
;
}),
"[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit/decorators.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$custom$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/@lit/reactive-element/development/decorators/custom-element.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/@lit/reactive-element/development/decorators/property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$state$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/@lit/reactive-element/development/decorators/state.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$event$2d$options$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/@lit/reactive-element/development/decorators/event-options.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$query$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/@lit/reactive-element/development/decorators/query.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$query$2d$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/@lit/reactive-element/development/decorators/query-all.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$query$2d$async$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/@lit/reactive-element/development/decorators/query-async.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$query$2d$assigned$2d$elements$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/@lit/reactive-element/development/decorators/query-assigned-elements.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$query$2d$assigned$2d$nodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/@lit/reactive-element/development/decorators/query-assigned-nodes.js [app-client] (ecmascript)"); //# sourceMappingURL=decorators.js.map
;
;
;
;
;
;
;
;
;
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit/decorators.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$custom$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/decorators/custom-element.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/decorators/property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$state$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/decorators/state.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$event$2d$options$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/decorators/event-options.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$query$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/decorators/query.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$query$2d$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/decorators/query-all.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$query$2d$async$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/decorators/query-async.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$query$2d$assigned$2d$elements$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/decorators/query-assigned-elements.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$query$2d$assigned$2d$nodes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/decorators/query-assigned-nodes.js [app-client] (ecmascript)"); //# sourceMappingURL=decorators.js.map
;
;
;
;
;
;
;
;
;
}),
"[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit/directives/if-defined.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$directives$2f$if$2d$defined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit-html/development/directives/if-defined.js [app-client] (ecmascript)"); //# sourceMappingURL=if-defined.js.map
;
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit/directives/if-defined.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$directives$2f$if$2d$defined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-html/development/directives/if-defined.js [app-client] (ecmascript)"); //# sourceMappingURL=if-defined.js.map
;
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit/directives/until.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$directives$2f$until$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-html/development/directives/until.js [app-client] (ecmascript)"); //# sourceMappingURL=until.js.map
;
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit/directives/class-map.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$directives$2f$class$2d$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-html/development/directives/class-map.js [app-client] (ecmascript)"); //# sourceMappingURL=class-map.js.map
;
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit/directives/ref.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$directives$2f$ref$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-html/development/directives/ref.js [app-client] (ecmascript)"); //# sourceMappingURL=ref.js.map
;
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/can-promise.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

// can-promise has a crash in some versions of react native that dont have
// standard global objects
// https://github.com/soldair/node-qrcode/issues/157
module.exports = function() {
    return typeof Promise === 'function' && Promise.prototype && Promise.prototype.then;
};
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/utils.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

let toSJISFunction;
const CODEWORDS_COUNT = [
    0,
    26,
    44,
    70,
    100,
    134,
    172,
    196,
    242,
    292,
    346,
    404,
    466,
    532,
    581,
    655,
    733,
    815,
    901,
    991,
    1085,
    1156,
    1258,
    1364,
    1474,
    1588,
    1706,
    1828,
    1921,
    2051,
    2185,
    2323,
    2465,
    2611,
    2761,
    2876,
    3034,
    3196,
    3362,
    3532,
    3706
];
/**
 * Returns the QR Code size for the specified version
 *
 * @param  {Number} version QR Code version
 * @return {Number}         size of QR code
 */ exports.getSymbolSize = function getSymbolSize(version) {
    if (!version) throw new Error('"version" cannot be null or undefined');
    if (version < 1 || version > 40) throw new Error('"version" should be in range from 1 to 40');
    return version * 4 + 17;
};
/**
 * Returns the total number of codewords used to store data and EC information.
 *
 * @param  {Number} version QR Code version
 * @return {Number}         Data length in bits
 */ exports.getSymbolTotalCodewords = function getSymbolTotalCodewords(version) {
    return CODEWORDS_COUNT[version];
};
/**
 * Encode data with Bose-Chaudhuri-Hocquenghem
 *
 * @param  {Number} data Value to encode
 * @return {Number}      Encoded value
 */ exports.getBCHDigit = function(data) {
    let digit = 0;
    while(data !== 0){
        digit++;
        data >>>= 1;
    }
    return digit;
};
exports.setToSJISFunction = function setToSJISFunction(f) {
    if (typeof f !== 'function') {
        throw new Error('"toSJISFunc" is not a valid function.');
    }
    toSJISFunction = f;
};
exports.isKanjiModeEnabled = function() {
    return typeof toSJISFunction !== 'undefined';
};
exports.toSJIS = function toSJIS(kanji) {
    return toSJISFunction(kanji);
};
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/error-correction-level.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

exports.L = {
    bit: 1
};
exports.M = {
    bit: 0
};
exports.Q = {
    bit: 3
};
exports.H = {
    bit: 2
};
function fromString(string) {
    if (typeof string !== 'string') {
        throw new Error('Param is not a string');
    }
    const lcStr = string.toLowerCase();
    switch(lcStr){
        case 'l':
        case 'low':
            return exports.L;
        case 'm':
        case 'medium':
            return exports.M;
        case 'q':
        case 'quartile':
            return exports.Q;
        case 'h':
        case 'high':
            return exports.H;
        default:
            throw new Error('Unknown EC Level: ' + string);
    }
}
exports.isValid = function isValid(level) {
    return level && typeof level.bit !== 'undefined' && level.bit >= 0 && level.bit < 4;
};
exports.from = function from(value, defaultValue) {
    if (exports.isValid(value)) {
        return value;
    }
    try {
        return fromString(value);
    } catch (e) {
        return defaultValue;
    }
};
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/bit-buffer.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

function BitBuffer() {
    this.buffer = [];
    this.length = 0;
}
BitBuffer.prototype = {
    get: function(index) {
        const bufIndex = Math.floor(index / 8);
        return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) === 1;
    },
    put: function(num, length) {
        for(let i = 0; i < length; i++){
            this.putBit((num >>> length - i - 1 & 1) === 1);
        }
    },
    getLengthInBits: function() {
        return this.length;
    },
    putBit: function(bit) {
        const bufIndex = Math.floor(this.length / 8);
        if (this.buffer.length <= bufIndex) {
            this.buffer.push(0);
        }
        if (bit) {
            this.buffer[bufIndex] |= 0x80 >>> this.length % 8;
        }
        this.length++;
    }
};
module.exports = BitBuffer;
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/bit-matrix.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * Helper class to handle QR Code symbol modules
 *
 * @param {Number} size Symbol size
 */ function BitMatrix(size) {
    if (!size || size < 1) {
        throw new Error('BitMatrix size must be defined and greater than 0');
    }
    this.size = size;
    this.data = new Uint8Array(size * size);
    this.reservedBit = new Uint8Array(size * size);
}
/**
 * Set bit value at specified location
 * If reserved flag is set, this bit will be ignored during masking process
 *
 * @param {Number}  row
 * @param {Number}  col
 * @param {Boolean} value
 * @param {Boolean} reserved
 */ BitMatrix.prototype.set = function(row, col, value, reserved) {
    const index = row * this.size + col;
    this.data[index] = value;
    if (reserved) this.reservedBit[index] = true;
};
/**
 * Returns bit value at specified location
 *
 * @param  {Number}  row
 * @param  {Number}  col
 * @return {Boolean}
 */ BitMatrix.prototype.get = function(row, col) {
    return this.data[row * this.size + col];
};
/**
 * Applies xor operator at specified location
 * (used during masking process)
 *
 * @param {Number}  row
 * @param {Number}  col
 * @param {Boolean} value
 */ BitMatrix.prototype.xor = function(row, col, value) {
    this.data[row * this.size + col] ^= value;
};
/**
 * Check if bit at specified location is reserved
 *
 * @param {Number}   row
 * @param {Number}   col
 * @return {Boolean}
 */ BitMatrix.prototype.isReserved = function(row, col) {
    return this.reservedBit[row * this.size + col];
};
module.exports = BitMatrix;
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/alignment-pattern.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * Alignment pattern are fixed reference pattern in defined positions
 * in a matrix symbology, which enables the decode software to re-synchronise
 * the coordinate mapping of the image modules in the event of moderate amounts
 * of distortion of the image.
 *
 * Alignment patterns are present only in QR Code symbols of version 2 or larger
 * and their number depends on the symbol version.
 */ const getSymbolSize = __turbopack_context__.r("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/utils.js [app-client] (ecmascript)").getSymbolSize;
/**
 * Calculate the row/column coordinates of the center module of each alignment pattern
 * for the specified QR Code version.
 *
 * The alignment patterns are positioned symmetrically on either side of the diagonal
 * running from the top left corner of the symbol to the bottom right corner.
 *
 * Since positions are simmetrical only half of the coordinates are returned.
 * Each item of the array will represent in turn the x and y coordinate.
 * @see {@link getPositions}
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinate
 */ exports.getRowColCoords = function getRowColCoords(version) {
    if (version === 1) return [];
    const posCount = Math.floor(version / 7) + 2;
    const size = getSymbolSize(version);
    const intervals = size === 145 ? 26 : Math.ceil((size - 13) / (2 * posCount - 2)) * 2;
    const positions = [
        size - 7
    ] // Last coord is always (size - 7)
    ;
    for(let i = 1; i < posCount - 1; i++){
        positions[i] = positions[i - 1] - intervals;
    }
    positions.push(6); // First coord is always 6
    return positions.reverse();
};
/**
 * Returns an array containing the positions of each alignment pattern.
 * Each array's element represent the center point of the pattern as (x, y) coordinates
 *
 * Coordinates are calculated expanding the row/column coordinates returned by {@link getRowColCoords}
 * and filtering out the items that overlaps with finder pattern
 *
 * @example
 * For a Version 7 symbol {@link getRowColCoords} returns values 6, 22 and 38.
 * The alignment patterns, therefore, are to be centered on (row, column)
 * positions (6,22), (22,6), (22,22), (22,38), (38,22), (38,38).
 * Note that the coordinates (6,6), (6,38), (38,6) are occupied by finder patterns
 * and are not therefore used for alignment patterns.
 *
 * let pos = getPositions(7)
 * // [[6,22], [22,6], [22,22], [22,38], [38,22], [38,38]]
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinates
 */ exports.getPositions = function getPositions(version) {
    const coords = [];
    const pos = exports.getRowColCoords(version);
    const posLength = pos.length;
    for(let i = 0; i < posLength; i++){
        for(let j = 0; j < posLength; j++){
            // Skip if position is occupied by finder patterns
            if (i === 0 && j === 0 || i === 0 && j === posLength - 1 || i === posLength - 1 && j === 0) {
                continue;
            }
            coords.push([
                pos[i],
                pos[j]
            ]);
        }
    }
    return coords;
};
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/finder-pattern.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const getSymbolSize = __turbopack_context__.r("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/utils.js [app-client] (ecmascript)").getSymbolSize;
const FINDER_PATTERN_SIZE = 7;
/**
 * Returns an array containing the positions of each finder pattern.
 * Each array's element represent the top-left point of the pattern as (x, y) coordinates
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinates
 */ exports.getPositions = function getPositions(version) {
    const size = getSymbolSize(version);
    return [
        // top-left
        [
            0,
            0
        ],
        // top-right
        [
            size - FINDER_PATTERN_SIZE,
            0
        ],
        // bottom-left
        [
            0,
            size - FINDER_PATTERN_SIZE
        ]
    ];
};
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/mask-pattern.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * Data mask pattern reference
 * @type {Object}
 */ exports.Patterns = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7
};
/**
 * Weighted penalty scores for the undesirable features
 * @type {Object}
 */ const PenaltyScores = {
    N1: 3,
    N2: 3,
    N3: 40,
    N4: 10
};
/**
 * Check if mask pattern value is valid
 *
 * @param  {Number}  mask    Mask pattern
 * @return {Boolean}         true if valid, false otherwise
 */ exports.isValid = function isValid(mask) {
    return mask != null && mask !== '' && !isNaN(mask) && mask >= 0 && mask <= 7;
};
/**
 * Returns mask pattern from a value.
 * If value is not valid, returns undefined
 *
 * @param  {Number|String} value        Mask pattern value
 * @return {Number}                     Valid mask pattern or undefined
 */ exports.from = function from(value) {
    return exports.isValid(value) ? parseInt(value, 10) : undefined;
};
/**
* Find adjacent modules in row/column with the same color
* and assign a penalty value.
*
* Points: N1 + i
* i is the amount by which the number of adjacent modules of the same color exceeds 5
*/ exports.getPenaltyN1 = function getPenaltyN1(data) {
    const size = data.size;
    let points = 0;
    let sameCountCol = 0;
    let sameCountRow = 0;
    let lastCol = null;
    let lastRow = null;
    for(let row = 0; row < size; row++){
        sameCountCol = sameCountRow = 0;
        lastCol = lastRow = null;
        for(let col = 0; col < size; col++){
            let module = data.get(row, col);
            if (module === lastCol) {
                sameCountCol++;
            } else {
                if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
                lastCol = module;
                sameCountCol = 1;
            }
            module = data.get(col, row);
            if (module === lastRow) {
                sameCountRow++;
            } else {
                if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
                lastRow = module;
                sameCountRow = 1;
            }
        }
        if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
        if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
    }
    return points;
};
/**
 * Find 2x2 blocks with the same color and assign a penalty value
 *
 * Points: N2 * (m - 1) * (n - 1)
 */ exports.getPenaltyN2 = function getPenaltyN2(data) {
    const size = data.size;
    let points = 0;
    for(let row = 0; row < size - 1; row++){
        for(let col = 0; col < size - 1; col++){
            const last = data.get(row, col) + data.get(row, col + 1) + data.get(row + 1, col) + data.get(row + 1, col + 1);
            if (last === 4 || last === 0) points++;
        }
    }
    return points * PenaltyScores.N2;
};
/**
 * Find 1:1:3:1:1 ratio (dark:light:dark:light:dark) pattern in row/column,
 * preceded or followed by light area 4 modules wide
 *
 * Points: N3 * number of pattern found
 */ exports.getPenaltyN3 = function getPenaltyN3(data) {
    const size = data.size;
    let points = 0;
    let bitsCol = 0;
    let bitsRow = 0;
    for(let row = 0; row < size; row++){
        bitsCol = bitsRow = 0;
        for(let col = 0; col < size; col++){
            bitsCol = bitsCol << 1 & 0x7FF | data.get(row, col);
            if (col >= 10 && (bitsCol === 0x5D0 || bitsCol === 0x05D)) points++;
            bitsRow = bitsRow << 1 & 0x7FF | data.get(col, row);
            if (col >= 10 && (bitsRow === 0x5D0 || bitsRow === 0x05D)) points++;
        }
    }
    return points * PenaltyScores.N3;
};
/**
 * Calculate proportion of dark modules in entire symbol
 *
 * Points: N4 * k
 *
 * k is the rating of the deviation of the proportion of dark modules
 * in the symbol from 50% in steps of 5%
 */ exports.getPenaltyN4 = function getPenaltyN4(data) {
    let darkCount = 0;
    const modulesCount = data.data.length;
    for(let i = 0; i < modulesCount; i++)darkCount += data.data[i];
    const k = Math.abs(Math.ceil(darkCount * 100 / modulesCount / 5) - 10);
    return k * PenaltyScores.N4;
};
/**
 * Return mask value at given position
 *
 * @param  {Number} maskPattern Pattern reference value
 * @param  {Number} i           Row
 * @param  {Number} j           Column
 * @return {Boolean}            Mask value
 */ function getMaskAt(maskPattern, i, j) {
    switch(maskPattern){
        case exports.Patterns.PATTERN000:
            return (i + j) % 2 === 0;
        case exports.Patterns.PATTERN001:
            return i % 2 === 0;
        case exports.Patterns.PATTERN010:
            return j % 3 === 0;
        case exports.Patterns.PATTERN011:
            return (i + j) % 3 === 0;
        case exports.Patterns.PATTERN100:
            return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0;
        case exports.Patterns.PATTERN101:
            return i * j % 2 + i * j % 3 === 0;
        case exports.Patterns.PATTERN110:
            return (i * j % 2 + i * j % 3) % 2 === 0;
        case exports.Patterns.PATTERN111:
            return (i * j % 3 + (i + j) % 2) % 2 === 0;
        default:
            throw new Error('bad maskPattern:' + maskPattern);
    }
}
/**
 * Apply a mask pattern to a BitMatrix
 *
 * @param  {Number}    pattern Pattern reference number
 * @param  {BitMatrix} data    BitMatrix data
 */ exports.applyMask = function applyMask(pattern, data) {
    const size = data.size;
    for(let col = 0; col < size; col++){
        for(let row = 0; row < size; row++){
            if (data.isReserved(row, col)) continue;
            data.xor(row, col, getMaskAt(pattern, row, col));
        }
    }
};
/**
 * Returns the best mask pattern for data
 *
 * @param  {BitMatrix} data
 * @return {Number} Mask pattern reference number
 */ exports.getBestMask = function getBestMask(data, setupFormatFunc) {
    const numPatterns = Object.keys(exports.Patterns).length;
    let bestPattern = 0;
    let lowerPenalty = Infinity;
    for(let p = 0; p < numPatterns; p++){
        setupFormatFunc(p);
        exports.applyMask(p, data);
        // Calculate penalty
        const penalty = exports.getPenaltyN1(data) + exports.getPenaltyN2(data) + exports.getPenaltyN3(data) + exports.getPenaltyN4(data);
        // Undo previously applied mask
        exports.applyMask(p, data);
        if (penalty < lowerPenalty) {
            lowerPenalty = penalty;
            bestPattern = p;
        }
    }
    return bestPattern;
};
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/error-correction-code.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const ECLevel = __turbopack_context__.r("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/error-correction-level.js [app-client] (ecmascript)");
const EC_BLOCKS_TABLE = [
    // L  M  Q  H
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    2,
    2,
    1,
    2,
    2,
    4,
    1,
    2,
    4,
    4,
    2,
    4,
    4,
    4,
    2,
    4,
    6,
    5,
    2,
    4,
    6,
    6,
    2,
    5,
    8,
    8,
    4,
    5,
    8,
    8,
    4,
    5,
    8,
    11,
    4,
    8,
    10,
    11,
    4,
    9,
    12,
    16,
    4,
    9,
    16,
    16,
    6,
    10,
    12,
    18,
    6,
    10,
    17,
    16,
    6,
    11,
    16,
    19,
    6,
    13,
    18,
    21,
    7,
    14,
    21,
    25,
    8,
    16,
    20,
    25,
    8,
    17,
    23,
    25,
    9,
    17,
    23,
    34,
    9,
    18,
    25,
    30,
    10,
    20,
    27,
    32,
    12,
    21,
    29,
    35,
    12,
    23,
    34,
    37,
    12,
    25,
    34,
    40,
    13,
    26,
    35,
    42,
    14,
    28,
    38,
    45,
    15,
    29,
    40,
    48,
    16,
    31,
    43,
    51,
    17,
    33,
    45,
    54,
    18,
    35,
    48,
    57,
    19,
    37,
    51,
    60,
    19,
    38,
    53,
    63,
    20,
    40,
    56,
    66,
    21,
    43,
    59,
    70,
    22,
    45,
    62,
    74,
    24,
    47,
    65,
    77,
    25,
    49,
    68,
    81
];
const EC_CODEWORDS_TABLE = [
    // L  M  Q  H
    7,
    10,
    13,
    17,
    10,
    16,
    22,
    28,
    15,
    26,
    36,
    44,
    20,
    36,
    52,
    64,
    26,
    48,
    72,
    88,
    36,
    64,
    96,
    112,
    40,
    72,
    108,
    130,
    48,
    88,
    132,
    156,
    60,
    110,
    160,
    192,
    72,
    130,
    192,
    224,
    80,
    150,
    224,
    264,
    96,
    176,
    260,
    308,
    104,
    198,
    288,
    352,
    120,
    216,
    320,
    384,
    132,
    240,
    360,
    432,
    144,
    280,
    408,
    480,
    168,
    308,
    448,
    532,
    180,
    338,
    504,
    588,
    196,
    364,
    546,
    650,
    224,
    416,
    600,
    700,
    224,
    442,
    644,
    750,
    252,
    476,
    690,
    816,
    270,
    504,
    750,
    900,
    300,
    560,
    810,
    960,
    312,
    588,
    870,
    1050,
    336,
    644,
    952,
    1110,
    360,
    700,
    1020,
    1200,
    390,
    728,
    1050,
    1260,
    420,
    784,
    1140,
    1350,
    450,
    812,
    1200,
    1440,
    480,
    868,
    1290,
    1530,
    510,
    924,
    1350,
    1620,
    540,
    980,
    1440,
    1710,
    570,
    1036,
    1530,
    1800,
    570,
    1064,
    1590,
    1890,
    600,
    1120,
    1680,
    1980,
    630,
    1204,
    1770,
    2100,
    660,
    1260,
    1860,
    2220,
    720,
    1316,
    1950,
    2310,
    750,
    1372,
    2040,
    2430
];
/**
 * Returns the number of error correction block that the QR Code should contain
 * for the specified version and error correction level.
 *
 * @param  {Number} version              QR Code version
 * @param  {Number} errorCorrectionLevel Error correction level
 * @return {Number}                      Number of error correction blocks
 */ exports.getBlocksCount = function getBlocksCount(version, errorCorrectionLevel) {
    switch(errorCorrectionLevel){
        case ECLevel.L:
            return EC_BLOCKS_TABLE[(version - 1) * 4 + 0];
        case ECLevel.M:
            return EC_BLOCKS_TABLE[(version - 1) * 4 + 1];
        case ECLevel.Q:
            return EC_BLOCKS_TABLE[(version - 1) * 4 + 2];
        case ECLevel.H:
            return EC_BLOCKS_TABLE[(version - 1) * 4 + 3];
        default:
            return undefined;
    }
};
/**
 * Returns the number of error correction codewords to use for the specified
 * version and error correction level.
 *
 * @param  {Number} version              QR Code version
 * @param  {Number} errorCorrectionLevel Error correction level
 * @return {Number}                      Number of error correction codewords
 */ exports.getTotalCodewordsCount = function getTotalCodewordsCount(version, errorCorrectionLevel) {
    switch(errorCorrectionLevel){
        case ECLevel.L:
            return EC_CODEWORDS_TABLE[(version - 1) * 4 + 0];
        case ECLevel.M:
            return EC_CODEWORDS_TABLE[(version - 1) * 4 + 1];
        case ECLevel.Q:
            return EC_CODEWORDS_TABLE[(version - 1) * 4 + 2];
        case ECLevel.H:
            return EC_CODEWORDS_TABLE[(version - 1) * 4 + 3];
        default:
            return undefined;
    }
};
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/galois-field.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const EXP_TABLE = new Uint8Array(512);
const LOG_TABLE = new Uint8Array(256);
(function initTables() {
    let x = 1;
    for(let i = 0; i < 255; i++){
        EXP_TABLE[i] = x;
        LOG_TABLE[x] = i;
        x <<= 1; // multiply by 2
        // The QR code specification says to use byte-wise modulo 100011101 arithmetic.
        // This means that when a number is 256 or larger, it should be XORed with 0x11D.
        if (x & 0x100) {
            x ^= 0x11D;
        }
    }
    // Optimization: double the size of the anti-log table so that we don't need to mod 255 to
    // stay inside the bounds (because we will mainly use this table for the multiplication of
    // two GF numbers, no more).
    // @see {@link mul}
    for(let i = 255; i < 512; i++){
        EXP_TABLE[i] = EXP_TABLE[i - 255];
    }
})();
/**
 * Returns log value of n inside Galois Field
 *
 * @param  {Number} n
 * @return {Number}
 */ exports.log = function log(n) {
    if (n < 1) throw new Error('log(' + n + ')');
    return LOG_TABLE[n];
};
/**
 * Returns anti-log value of n inside Galois Field
 *
 * @param  {Number} n
 * @return {Number}
 */ exports.exp = function exp(n) {
    return EXP_TABLE[n];
};
/**
 * Multiplies two number inside Galois Field
 *
 * @param  {Number} x
 * @param  {Number} y
 * @return {Number}
 */ exports.mul = function mul(x, y) {
    if (x === 0 || y === 0) return 0;
    // should be EXP_TABLE[(LOG_TABLE[x] + LOG_TABLE[y]) % 255] if EXP_TABLE wasn't oversized
    // @see {@link initTables}
    return EXP_TABLE[LOG_TABLE[x] + LOG_TABLE[y]];
};
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/polynomial.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const GF = __turbopack_context__.r("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/galois-field.js [app-client] (ecmascript)");
/**
 * Multiplies two polynomials inside Galois Field
 *
 * @param  {Uint8Array} p1 Polynomial
 * @param  {Uint8Array} p2 Polynomial
 * @return {Uint8Array}    Product of p1 and p2
 */ exports.mul = function mul(p1, p2) {
    const coeff = new Uint8Array(p1.length + p2.length - 1);
    for(let i = 0; i < p1.length; i++){
        for(let j = 0; j < p2.length; j++){
            coeff[i + j] ^= GF.mul(p1[i], p2[j]);
        }
    }
    return coeff;
};
/**
 * Calculate the remainder of polynomials division
 *
 * @param  {Uint8Array} divident Polynomial
 * @param  {Uint8Array} divisor  Polynomial
 * @return {Uint8Array}          Remainder
 */ exports.mod = function mod(divident, divisor) {
    let result = new Uint8Array(divident);
    while(result.length - divisor.length >= 0){
        const coeff = result[0];
        for(let i = 0; i < divisor.length; i++){
            result[i] ^= GF.mul(divisor[i], coeff);
        }
        // remove all zeros from buffer head
        let offset = 0;
        while(offset < result.length && result[offset] === 0)offset++;
        result = result.slice(offset);
    }
    return result;
};
/**
 * Generate an irreducible generator polynomial of specified degree
 * (used by Reed-Solomon encoder)
 *
 * @param  {Number} degree Degree of the generator polynomial
 * @return {Uint8Array}    Buffer containing polynomial coefficients
 */ exports.generateECPolynomial = function generateECPolynomial(degree) {
    let poly = new Uint8Array([
        1
    ]);
    for(let i = 0; i < degree; i++){
        poly = exports.mul(poly, new Uint8Array([
            1,
            GF.exp(i)
        ]));
    }
    return poly;
};
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/reed-solomon-encoder.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const Polynomial = __turbopack_context__.r("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/polynomial.js [app-client] (ecmascript)");
function ReedSolomonEncoder(degree) {
    this.genPoly = undefined;
    this.degree = degree;
    if (this.degree) this.initialize(this.degree);
}
/**
 * Initialize the encoder.
 * The input param should correspond to the number of error correction codewords.
 *
 * @param  {Number} degree
 */ ReedSolomonEncoder.prototype.initialize = function initialize(degree) {
    // create an irreducible generator polynomial
    this.degree = degree;
    this.genPoly = Polynomial.generateECPolynomial(this.degree);
};
/**
 * Encodes a chunk of data
 *
 * @param  {Uint8Array} data Buffer containing input data
 * @return {Uint8Array}      Buffer containing encoded data
 */ ReedSolomonEncoder.prototype.encode = function encode(data) {
    if (!this.genPoly) {
        throw new Error('Encoder not initialized');
    }
    // Calculate EC for this data block
    // extends data size to data+genPoly size
    const paddedData = new Uint8Array(data.length + this.degree);
    paddedData.set(data);
    // The error correction codewords are the remainder after dividing the data codewords
    // by a generator polynomial
    const remainder = Polynomial.mod(paddedData, this.genPoly);
    // return EC data blocks (last n byte, where n is the degree of genPoly)
    // If coefficients number in remainder are less than genPoly degree,
    // pad with 0s to the left to reach the needed number of coefficients
    const start = this.degree - remainder.length;
    if (start > 0) {
        const buff = new Uint8Array(this.degree);
        buff.set(remainder, start);
        return buff;
    }
    return remainder;
};
module.exports = ReedSolomonEncoder;
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/version-check.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * Check if QR Code version is valid
 *
 * @param  {Number}  version QR Code version
 * @return {Boolean}         true if valid version, false otherwise
 */ exports.isValid = function isValid(version) {
    return !isNaN(version) && version >= 1 && version <= 40;
};
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/regex.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const numeric = '[0-9]+';
const alphanumeric = '[A-Z $%*+\\-./:]+';
let kanji = '(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|' + '[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|' + '[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|' + '[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+';
kanji = kanji.replace(/u/g, '\\u');
const byte = '(?:(?![A-Z0-9 $%*+\\-./:]|' + kanji + ')(?:.|[\r\n]))+';
exports.KANJI = new RegExp(kanji, 'g');
exports.BYTE_KANJI = new RegExp('[^A-Z0-9 $%*+\\-./:]+', 'g');
exports.BYTE = new RegExp(byte, 'g');
exports.NUMERIC = new RegExp(numeric, 'g');
exports.ALPHANUMERIC = new RegExp(alphanumeric, 'g');
const TEST_KANJI = new RegExp('^' + kanji + '$');
const TEST_NUMERIC = new RegExp('^' + numeric + '$');
const TEST_ALPHANUMERIC = new RegExp('^[A-Z0-9 $%*+\\-./:]+$');
exports.testKanji = function testKanji(str) {
    return TEST_KANJI.test(str);
};
exports.testNumeric = function testNumeric(str) {
    return TEST_NUMERIC.test(str);
};
exports.testAlphanumeric = function testAlphanumeric(str) {
    return TEST_ALPHANUMERIC.test(str);
};
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/mode.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const VersionCheck = __turbopack_context__.r("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/version-check.js [app-client] (ecmascript)");
const Regex = __turbopack_context__.r("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/regex.js [app-client] (ecmascript)");
/**
 * Numeric mode encodes data from the decimal digit set (0 - 9)
 * (byte values 30HEX to 39HEX).
 * Normally, 3 data characters are represented by 10 bits.
 *
 * @type {Object}
 */ exports.NUMERIC = {
    id: 'Numeric',
    bit: 1 << 0,
    ccBits: [
        10,
        12,
        14
    ]
};
/**
 * Alphanumeric mode encodes data from a set of 45 characters,
 * i.e. 10 numeric digits (0 - 9),
 *      26 alphabetic characters (A - Z),
 *   and 9 symbols (SP, $, %, *, +, -, ., /, :).
 * Normally, two input characters are represented by 11 bits.
 *
 * @type {Object}
 */ exports.ALPHANUMERIC = {
    id: 'Alphanumeric',
    bit: 1 << 1,
    ccBits: [
        9,
        11,
        13
    ]
};
/**
 * In byte mode, data is encoded at 8 bits per character.
 *
 * @type {Object}
 */ exports.BYTE = {
    id: 'Byte',
    bit: 1 << 2,
    ccBits: [
        8,
        16,
        16
    ]
};
/**
 * The Kanji mode efficiently encodes Kanji characters in accordance with
 * the Shift JIS system based on JIS X 0208.
 * The Shift JIS values are shifted from the JIS X 0208 values.
 * JIS X 0208 gives details of the shift coded representation.
 * Each two-byte character value is compacted to a 13-bit binary codeword.
 *
 * @type {Object}
 */ exports.KANJI = {
    id: 'Kanji',
    bit: 1 << 3,
    ccBits: [
        8,
        10,
        12
    ]
};
/**
 * Mixed mode will contain a sequences of data in a combination of any of
 * the modes described above
 *
 * @type {Object}
 */ exports.MIXED = {
    bit: -1
};
/**
 * Returns the number of bits needed to store the data length
 * according to QR Code specifications.
 *
 * @param  {Mode}   mode    Data mode
 * @param  {Number} version QR Code version
 * @return {Number}         Number of bits
 */ exports.getCharCountIndicator = function getCharCountIndicator(mode, version) {
    if (!mode.ccBits) throw new Error('Invalid mode: ' + mode);
    if (!VersionCheck.isValid(version)) {
        throw new Error('Invalid version: ' + version);
    }
    if (version >= 1 && version < 10) return mode.ccBits[0];
    else if (version < 27) return mode.ccBits[1];
    return mode.ccBits[2];
};
/**
 * Returns the most efficient mode to store the specified data
 *
 * @param  {String} dataStr Input data string
 * @return {Mode}           Best mode
 */ exports.getBestModeForData = function getBestModeForData(dataStr) {
    if (Regex.testNumeric(dataStr)) return exports.NUMERIC;
    else if (Regex.testAlphanumeric(dataStr)) return exports.ALPHANUMERIC;
    else if (Regex.testKanji(dataStr)) return exports.KANJI;
    else return exports.BYTE;
};
/**
 * Return mode name as string
 *
 * @param {Mode} mode Mode object
 * @returns {String}  Mode name
 */ exports.toString = function toString(mode) {
    if (mode && mode.id) return mode.id;
    throw new Error('Invalid mode');
};
/**
 * Check if input param is a valid mode object
 *
 * @param   {Mode}    mode Mode object
 * @returns {Boolean} True if valid mode, false otherwise
 */ exports.isValid = function isValid(mode) {
    return mode && mode.bit && mode.ccBits;
};
/**
 * Get mode object from its name
 *
 * @param   {String} string Mode name
 * @returns {Mode}          Mode object
 */ function fromString(string) {
    if (typeof string !== 'string') {
        throw new Error('Param is not a string');
    }
    const lcStr = string.toLowerCase();
    switch(lcStr){
        case 'numeric':
            return exports.NUMERIC;
        case 'alphanumeric':
            return exports.ALPHANUMERIC;
        case 'kanji':
            return exports.KANJI;
        case 'byte':
            return exports.BYTE;
        default:
            throw new Error('Unknown mode: ' + string);
    }
}
/**
 * Returns mode from a value.
 * If value is not a valid mode, returns defaultValue
 *
 * @param  {Mode|String} value        Encoding mode
 * @param  {Mode}        defaultValue Fallback value
 * @return {Mode}                     Encoding mode
 */ exports.from = function from(value, defaultValue) {
    if (exports.isValid(value)) {
        return value;
    }
    try {
        return fromString(value);
    } catch (e) {
        return defaultValue;
    }
};
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/version.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const Utils = __turbopack_context__.r("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/utils.js [app-client] (ecmascript)");
const ECCode = __turbopack_context__.r("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/error-correction-code.js [app-client] (ecmascript)");
const ECLevel = __turbopack_context__.r("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/error-correction-level.js [app-client] (ecmascript)");
const Mode = __turbopack_context__.r("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/mode.js [app-client] (ecmascript)");
const VersionCheck = __turbopack_context__.r("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/version-check.js [app-client] (ecmascript)");
// Generator polynomial used to encode version information
const G18 = 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0;
const G18_BCH = Utils.getBCHDigit(G18);
function getBestVersionForDataLength(mode, length, errorCorrectionLevel) {
    for(let currentVersion = 1; currentVersion <= 40; currentVersion++){
        if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, mode)) {
            return currentVersion;
        }
    }
    return undefined;
}
function getReservedBitsCount(mode, version) {
    // Character count indicator + mode indicator bits
    return Mode.getCharCountIndicator(mode, version) + 4;
}
function getTotalBitsFromDataArray(segments, version) {
    let totalBits = 0;
    segments.forEach(function(data) {
        const reservedBits = getReservedBitsCount(data.mode, version);
        totalBits += reservedBits + data.getBitsLength();
    });
    return totalBits;
}
function getBestVersionForMixedData(segments, errorCorrectionLevel) {
    for(let currentVersion = 1; currentVersion <= 40; currentVersion++){
        const length = getTotalBitsFromDataArray(segments, currentVersion);
        if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, Mode.MIXED)) {
            return currentVersion;
        }
    }
    return undefined;
}
/**
 * Returns version number from a value.
 * If value is not a valid version, returns defaultValue
 *
 * @param  {Number|String} value        QR Code version
 * @param  {Number}        defaultValue Fallback value
 * @return {Number}                     QR Code version number
 */ exports.from = function from(value, defaultValue) {
    if (VersionCheck.isValid(value)) {
        return parseInt(value, 10);
    }
    return defaultValue;
};
/**
 * Returns how much data can be stored with the specified QR code version
 * and error correction level
 *
 * @param  {Number} version              QR Code version (1-40)
 * @param  {Number} errorCorrectionLevel Error correction level
 * @param  {Mode}   mode                 Data mode
 * @return {Number}                      Quantity of storable data
 */ exports.getCapacity = function getCapacity(version, errorCorrectionLevel, mode) {
    if (!VersionCheck.isValid(version)) {
        throw new Error('Invalid QR Code version');
    }
    // Use Byte mode as default
    if (typeof mode === 'undefined') mode = Mode.BYTE;
    // Total codewords for this QR code version (Data + Error correction)
    const totalCodewords = Utils.getSymbolTotalCodewords(version);
    // Total number of error correction codewords
    const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
    // Total number of data codewords
    const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
    if (mode === Mode.MIXED) return dataTotalCodewordsBits;
    const usableBits = dataTotalCodewordsBits - getReservedBitsCount(mode, version);
    // Return max number of storable codewords
    switch(mode){
        case Mode.NUMERIC:
            return Math.floor(usableBits / 10 * 3);
        case Mode.ALPHANUMERIC:
            return Math.floor(usableBits / 11 * 2);
        case Mode.KANJI:
            return Math.floor(usableBits / 13);
        case Mode.BYTE:
        default:
            return Math.floor(usableBits / 8);
    }
};
/**
 * Returns the minimum version needed to contain the amount of data
 *
 * @param  {Segment} data                    Segment of data
 * @param  {Number} [errorCorrectionLevel=H] Error correction level
 * @param  {Mode} mode                       Data mode
 * @return {Number}                          QR Code version
 */ exports.getBestVersionForData = function getBestVersionForData(data, errorCorrectionLevel) {
    let seg;
    const ecl = ECLevel.from(errorCorrectionLevel, ECLevel.M);
    if (Array.isArray(data)) {
        if (data.length > 1) {
            return getBestVersionForMixedData(data, ecl);
        }
        if (data.length === 0) {
            return 1;
        }
        seg = data[0];
    } else {
        seg = data;
    }
    return getBestVersionForDataLength(seg.mode, seg.getLength(), ecl);
};
/**
 * Returns version information with relative error correction bits
 *
 * The version information is included in QR Code symbols of version 7 or larger.
 * It consists of an 18-bit sequence containing 6 data bits,
 * with 12 error correction bits calculated using the (18, 6) Golay code.
 *
 * @param  {Number} version QR Code version
 * @return {Number}         Encoded version info bits
 */ exports.getEncodedBits = function getEncodedBits(version) {
    if (!VersionCheck.isValid(version) || version < 7) {
        throw new Error('Invalid QR Code version');
    }
    let d = version << 12;
    while(Utils.getBCHDigit(d) - G18_BCH >= 0){
        d ^= G18 << Utils.getBCHDigit(d) - G18_BCH;
    }
    return version << 12 | d;
};
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/format-info.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const Utils = __turbopack_context__.r("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/utils.js [app-client] (ecmascript)");
const G15 = 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0;
const G15_MASK = 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1;
const G15_BCH = Utils.getBCHDigit(G15);
/**
 * Returns format information with relative error correction bits
 *
 * The format information is a 15-bit sequence containing 5 data bits,
 * with 10 error correction bits calculated using the (15, 5) BCH code.
 *
 * @param  {Number} errorCorrectionLevel Error correction level
 * @param  {Number} mask                 Mask pattern
 * @return {Number}                      Encoded format information bits
 */ exports.getEncodedBits = function getEncodedBits(errorCorrectionLevel, mask) {
    const data = errorCorrectionLevel.bit << 3 | mask;
    let d = data << 10;
    while(Utils.getBCHDigit(d) - G15_BCH >= 0){
        d ^= G15 << Utils.getBCHDigit(d) - G15_BCH;
    }
    // xor final data with mask pattern in order to ensure that
    // no combination of Error Correction Level and data mask pattern
    // will result in an all-zero data string
    return (data << 10 | d) ^ G15_MASK;
};
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/numeric-data.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const Mode = __turbopack_context__.r("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/mode.js [app-client] (ecmascript)");
function NumericData(data) {
    this.mode = Mode.NUMERIC;
    this.data = data.toString();
}
NumericData.getBitsLength = function getBitsLength(length) {
    return 10 * Math.floor(length / 3) + (length % 3 ? length % 3 * 3 + 1 : 0);
};
NumericData.prototype.getLength = function getLength() {
    return this.data.length;
};
NumericData.prototype.getBitsLength = function getBitsLength() {
    return NumericData.getBitsLength(this.data.length);
};
NumericData.prototype.write = function write(bitBuffer) {
    let i, group, value;
    // The input data string is divided into groups of three digits,
    // and each group is converted to its 10-bit binary equivalent.
    for(i = 0; i + 3 <= this.data.length; i += 3){
        group = this.data.substr(i, 3);
        value = parseInt(group, 10);
        bitBuffer.put(value, 10);
    }
    // If the number of input digits is not an exact multiple of three,
    // the final one or two digits are converted to 4 or 7 bits respectively.
    const remainingNum = this.data.length - i;
    if (remainingNum > 0) {
        group = this.data.substr(i);
        value = parseInt(group, 10);
        bitBuffer.put(value, remainingNum * 3 + 1);
    }
};
module.exports = NumericData;
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/alphanumeric-data.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const Mode = __turbopack_context__.r("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/mode.js [app-client] (ecmascript)");
/**
 * Array of characters available in alphanumeric mode
 *
 * As per QR Code specification, to each character
 * is assigned a value from 0 to 44 which in this case coincides
 * with the array index
 *
 * @type {Array}
 */ const ALPHA_NUM_CHARS = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    ' ',
    '$',
    '%',
    '*',
    '+',
    '-',
    '.',
    '/',
    ':'
];
function AlphanumericData(data) {
    this.mode = Mode.ALPHANUMERIC;
    this.data = data;
}
AlphanumericData.getBitsLength = function getBitsLength(length) {
    return 11 * Math.floor(length / 2) + 6 * (length % 2);
};
AlphanumericData.prototype.getLength = function getLength() {
    return this.data.length;
};
AlphanumericData.prototype.getBitsLength = function getBitsLength() {
    return AlphanumericData.getBitsLength(this.data.length);
};
AlphanumericData.prototype.write = function write(bitBuffer) {
    let i;
    // Input data characters are divided into groups of two characters
    // and encoded as 11-bit binary codes.
    for(i = 0; i + 2 <= this.data.length; i += 2){
        // The character value of the first character is multiplied by 45
        let value = ALPHA_NUM_CHARS.indexOf(this.data[i]) * 45;
        // The character value of the second digit is added to the product
        value += ALPHA_NUM_CHARS.indexOf(this.data[i + 1]);
        // The sum is then stored as 11-bit binary number
        bitBuffer.put(value, 11);
    }
    // If the number of input data characters is not a multiple of two,
    // the character value of the final character is encoded as a 6-bit binary number.
    if (this.data.length % 2) {
        bitBuffer.put(ALPHA_NUM_CHARS.indexOf(this.data[i]), 6);
    }
};
module.exports = AlphanumericData;
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/byte-data.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const encodeUtf8 = __turbopack_context__.r("[project]/frontend/node_modules/encode-utf8/index.js [app-client] (ecmascript)");
const Mode = __turbopack_context__.r("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/mode.js [app-client] (ecmascript)");
function ByteData(data) {
    this.mode = Mode.BYTE;
    if (typeof data === 'string') {
        data = encodeUtf8(data);
    }
    this.data = new Uint8Array(data);
}
ByteData.getBitsLength = function getBitsLength(length) {
    return length * 8;
};
ByteData.prototype.getLength = function getLength() {
    return this.data.length;
};
ByteData.prototype.getBitsLength = function getBitsLength() {
    return ByteData.getBitsLength(this.data.length);
};
ByteData.prototype.write = function(bitBuffer) {
    for(let i = 0, l = this.data.length; i < l; i++){
        bitBuffer.put(this.data[i], 8);
    }
};
module.exports = ByteData;
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/kanji-data.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const Mode = __turbopack_context__.r("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/mode.js [app-client] (ecmascript)");
const Utils = __turbopack_context__.r("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/utils.js [app-client] (ecmascript)");
function KanjiData(data) {
    this.mode = Mode.KANJI;
    this.data = data;
}
KanjiData.getBitsLength = function getBitsLength(length) {
    return length * 13;
};
KanjiData.prototype.getLength = function getLength() {
    return this.data.length;
};
KanjiData.prototype.getBitsLength = function getBitsLength() {
    return KanjiData.getBitsLength(this.data.length);
};
KanjiData.prototype.write = function(bitBuffer) {
    let i;
    // In the Shift JIS system, Kanji characters are represented by a two byte combination.
    // These byte values are shifted from the JIS X 0208 values.
    // JIS X 0208 gives details of the shift coded representation.
    for(i = 0; i < this.data.length; i++){
        let value = Utils.toSJIS(this.data[i]);
        // For characters with Shift JIS values from 0x8140 to 0x9FFC:
        if (value >= 0x8140 && value <= 0x9FFC) {
            // Subtract 0x8140 from Shift JIS value
            value -= 0x8140;
        // For characters with Shift JIS values from 0xE040 to 0xEBBF
        } else if (value >= 0xE040 && value <= 0xEBBF) {
            // Subtract 0xC140 from Shift JIS value
            value -= 0xC140;
        } else {
            throw new Error('Invalid SJIS character: ' + this.data[i] + '\n' + 'Make sure your charset is UTF-8');
        }
        // Multiply most significant byte of result by 0xC0
        // and add least significant byte to product
        value = (value >>> 8 & 0xff) * 0xC0 + (value & 0xff);
        // Convert result to a 13-bit binary string
        bitBuffer.put(value, 13);
    }
};
module.exports = KanjiData;
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/segments.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const Mode = __turbopack_context__.r("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/mode.js [app-client] (ecmascript)");
const NumericData = __turbopack_context__.r("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/numeric-data.js [app-client] (ecmascript)");
const AlphanumericData = __turbopack_context__.r("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/alphanumeric-data.js [app-client] (ecmascript)");
const ByteData = __turbopack_context__.r("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/byte-data.js [app-client] (ecmascript)");
const KanjiData = __turbopack_context__.r("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/kanji-data.js [app-client] (ecmascript)");
const Regex = __turbopack_context__.r("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/regex.js [app-client] (ecmascript)");
const Utils = __turbopack_context__.r("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/utils.js [app-client] (ecmascript)");
const dijkstra = __turbopack_context__.r("[project]/frontend/node_modules/dijkstrajs/dijkstra.js [app-client] (ecmascript)");
/**
 * Returns UTF8 byte length
 *
 * @param  {String} str Input string
 * @return {Number}     Number of byte
 */ function getStringByteLength(str) {
    return unescape(encodeURIComponent(str)).length;
}
/**
 * Get a list of segments of the specified mode
 * from a string
 *
 * @param  {Mode}   mode Segment mode
 * @param  {String} str  String to process
 * @return {Array}       Array of object with segments data
 */ function getSegments(regex, mode, str) {
    const segments = [];
    let result;
    while((result = regex.exec(str)) !== null){
        segments.push({
            data: result[0],
            index: result.index,
            mode: mode,
            length: result[0].length
        });
    }
    return segments;
}
/**
 * Extracts a series of segments with the appropriate
 * modes from a string
 *
 * @param  {String} dataStr Input string
 * @return {Array}          Array of object with segments data
 */ function getSegmentsFromString(dataStr) {
    const numSegs = getSegments(Regex.NUMERIC, Mode.NUMERIC, dataStr);
    const alphaNumSegs = getSegments(Regex.ALPHANUMERIC, Mode.ALPHANUMERIC, dataStr);
    let byteSegs;
    let kanjiSegs;
    if (Utils.isKanjiModeEnabled()) {
        byteSegs = getSegments(Regex.BYTE, Mode.BYTE, dataStr);
        kanjiSegs = getSegments(Regex.KANJI, Mode.KANJI, dataStr);
    } else {
        byteSegs = getSegments(Regex.BYTE_KANJI, Mode.BYTE, dataStr);
        kanjiSegs = [];
    }
    const segs = numSegs.concat(alphaNumSegs, byteSegs, kanjiSegs);
    return segs.sort(function(s1, s2) {
        return s1.index - s2.index;
    }).map(function(obj) {
        return {
            data: obj.data,
            mode: obj.mode,
            length: obj.length
        };
    });
}
/**
 * Returns how many bits are needed to encode a string of
 * specified length with the specified mode
 *
 * @param  {Number} length String length
 * @param  {Mode} mode     Segment mode
 * @return {Number}        Bit length
 */ function getSegmentBitsLength(length, mode) {
    switch(mode){
        case Mode.NUMERIC:
            return NumericData.getBitsLength(length);
        case Mode.ALPHANUMERIC:
            return AlphanumericData.getBitsLength(length);
        case Mode.KANJI:
            return KanjiData.getBitsLength(length);
        case Mode.BYTE:
            return ByteData.getBitsLength(length);
    }
}
/**
 * Merges adjacent segments which have the same mode
 *
 * @param  {Array} segs Array of object with segments data
 * @return {Array}      Array of object with segments data
 */ function mergeSegments(segs) {
    return segs.reduce(function(acc, curr) {
        const prevSeg = acc.length - 1 >= 0 ? acc[acc.length - 1] : null;
        if (prevSeg && prevSeg.mode === curr.mode) {
            acc[acc.length - 1].data += curr.data;
            return acc;
        }
        acc.push(curr);
        return acc;
    }, []);
}
/**
 * Generates a list of all possible nodes combination which
 * will be used to build a segments graph.
 *
 * Nodes are divided by groups. Each group will contain a list of all the modes
 * in which is possible to encode the given text.
 *
 * For example the text '12345' can be encoded as Numeric, Alphanumeric or Byte.
 * The group for '12345' will contain then 3 objects, one for each
 * possible encoding mode.
 *
 * Each node represents a possible segment.
 *
 * @param  {Array} segs Array of object with segments data
 * @return {Array}      Array of object with segments data
 */ function buildNodes(segs) {
    const nodes = [];
    for(let i = 0; i < segs.length; i++){
        const seg = segs[i];
        switch(seg.mode){
            case Mode.NUMERIC:
                nodes.push([
                    seg,
                    {
                        data: seg.data,
                        mode: Mode.ALPHANUMERIC,
                        length: seg.length
                    },
                    {
                        data: seg.data,
                        mode: Mode.BYTE,
                        length: seg.length
                    }
                ]);
                break;
            case Mode.ALPHANUMERIC:
                nodes.push([
                    seg,
                    {
                        data: seg.data,
                        mode: Mode.BYTE,
                        length: seg.length
                    }
                ]);
                break;
            case Mode.KANJI:
                nodes.push([
                    seg,
                    {
                        data: seg.data,
                        mode: Mode.BYTE,
                        length: getStringByteLength(seg.data)
                    }
                ]);
                break;
            case Mode.BYTE:
                nodes.push([
                    {
                        data: seg.data,
                        mode: Mode.BYTE,
                        length: getStringByteLength(seg.data)
                    }
                ]);
        }
    }
    return nodes;
}
/**
 * Builds a graph from a list of nodes.
 * All segments in each node group will be connected with all the segments of
 * the next group and so on.
 *
 * At each connection will be assigned a weight depending on the
 * segment's byte length.
 *
 * @param  {Array} nodes    Array of object with segments data
 * @param  {Number} version QR Code version
 * @return {Object}         Graph of all possible segments
 */ function buildGraph(nodes, version) {
    const table = {};
    const graph = {
        start: {}
    };
    let prevNodeIds = [
        'start'
    ];
    for(let i = 0; i < nodes.length; i++){
        const nodeGroup = nodes[i];
        const currentNodeIds = [];
        for(let j = 0; j < nodeGroup.length; j++){
            const node = nodeGroup[j];
            const key = '' + i + j;
            currentNodeIds.push(key);
            table[key] = {
                node: node,
                lastCount: 0
            };
            graph[key] = {};
            for(let n = 0; n < prevNodeIds.length; n++){
                const prevNodeId = prevNodeIds[n];
                if (table[prevNodeId] && table[prevNodeId].node.mode === node.mode) {
                    graph[prevNodeId][key] = getSegmentBitsLength(table[prevNodeId].lastCount + node.length, node.mode) - getSegmentBitsLength(table[prevNodeId].lastCount, node.mode);
                    table[prevNodeId].lastCount += node.length;
                } else {
                    if (table[prevNodeId]) table[prevNodeId].lastCount = node.length;
                    graph[prevNodeId][key] = getSegmentBitsLength(node.length, node.mode) + 4 + Mode.getCharCountIndicator(node.mode, version); // switch cost
                }
            }
        }
        prevNodeIds = currentNodeIds;
    }
    for(let n = 0; n < prevNodeIds.length; n++){
        graph[prevNodeIds[n]].end = 0;
    }
    return {
        map: graph,
        table: table
    };
}
/**
 * Builds a segment from a specified data and mode.
 * If a mode is not specified, the more suitable will be used.
 *
 * @param  {String} data             Input data
 * @param  {Mode | String} modesHint Data mode
 * @return {Segment}                 Segment
 */ function buildSingleSegment(data, modesHint) {
    let mode;
    const bestMode = Mode.getBestModeForData(data);
    mode = Mode.from(modesHint, bestMode);
    // Make sure data can be encoded
    if (mode !== Mode.BYTE && mode.bit < bestMode.bit) {
        throw new Error('"' + data + '"' + ' cannot be encoded with mode ' + Mode.toString(mode) + '.\n Suggested mode is: ' + Mode.toString(bestMode));
    }
    // Use Mode.BYTE if Kanji support is disabled
    if (mode === Mode.KANJI && !Utils.isKanjiModeEnabled()) {
        mode = Mode.BYTE;
    }
    switch(mode){
        case Mode.NUMERIC:
            return new NumericData(data);
        case Mode.ALPHANUMERIC:
            return new AlphanumericData(data);
        case Mode.KANJI:
            return new KanjiData(data);
        case Mode.BYTE:
            return new ByteData(data);
    }
}
/**
 * Builds a list of segments from an array.
 * Array can contain Strings or Objects with segment's info.
 *
 * For each item which is a string, will be generated a segment with the given
 * string and the more appropriate encoding mode.
 *
 * For each item which is an object, will be generated a segment with the given
 * data and mode.
 * Objects must contain at least the property "data".
 * If property "mode" is not present, the more suitable mode will be used.
 *
 * @param  {Array} array Array of objects with segments data
 * @return {Array}       Array of Segments
 */ exports.fromArray = function fromArray(array) {
    return array.reduce(function(acc, seg) {
        if (typeof seg === 'string') {
            acc.push(buildSingleSegment(seg, null));
        } else if (seg.data) {
            acc.push(buildSingleSegment(seg.data, seg.mode));
        }
        return acc;
    }, []);
};
/**
 * Builds an optimized sequence of segments from a string,
 * which will produce the shortest possible bitstream.
 *
 * @param  {String} data    Input string
 * @param  {Number} version QR Code version
 * @return {Array}          Array of segments
 */ exports.fromString = function fromString(data, version) {
    const segs = getSegmentsFromString(data, Utils.isKanjiModeEnabled());
    const nodes = buildNodes(segs);
    const graph = buildGraph(nodes, version);
    const path = dijkstra.find_path(graph.map, 'start', 'end');
    const optimizedSegs = [];
    for(let i = 1; i < path.length - 1; i++){
        optimizedSegs.push(graph.table[path[i]].node);
    }
    return exports.fromArray(mergeSegments(optimizedSegs));
};
/**
 * Splits a string in various segments with the modes which
 * best represent their content.
 * The produced segments are far from being optimized.
 * The output of this function is only used to estimate a QR Code version
 * which may contain the data.
 *
 * @param  {string} data Input string
 * @return {Array}       Array of segments
 */ exports.rawSplit = function rawSplit(data) {
    return exports.fromArray(getSegmentsFromString(data, Utils.isKanjiModeEnabled()));
};
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/qrcode.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const Utils = __turbopack_context__.r("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/utils.js [app-client] (ecmascript)");
const ECLevel = __turbopack_context__.r("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/error-correction-level.js [app-client] (ecmascript)");
const BitBuffer = __turbopack_context__.r("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/bit-buffer.js [app-client] (ecmascript)");
const BitMatrix = __turbopack_context__.r("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/bit-matrix.js [app-client] (ecmascript)");
const AlignmentPattern = __turbopack_context__.r("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/alignment-pattern.js [app-client] (ecmascript)");
const FinderPattern = __turbopack_context__.r("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/finder-pattern.js [app-client] (ecmascript)");
const MaskPattern = __turbopack_context__.r("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/mask-pattern.js [app-client] (ecmascript)");
const ECCode = __turbopack_context__.r("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/error-correction-code.js [app-client] (ecmascript)");
const ReedSolomonEncoder = __turbopack_context__.r("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/reed-solomon-encoder.js [app-client] (ecmascript)");
const Version = __turbopack_context__.r("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/version.js [app-client] (ecmascript)");
const FormatInfo = __turbopack_context__.r("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/format-info.js [app-client] (ecmascript)");
const Mode = __turbopack_context__.r("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/mode.js [app-client] (ecmascript)");
const Segments = __turbopack_context__.r("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/segments.js [app-client] (ecmascript)");
/**
 * QRCode for JavaScript
 *
 * modified by Ryan Day for nodejs support
 * Copyright (c) 2011 Ryan Day
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
//---------------------------------------------------------------------
// QRCode for JavaScript
//
// Copyright (c) 2009 Kazuhiko Arase
//
// URL: http://www.d-project.com/
//
// Licensed under the MIT license:
//   http://www.opensource.org/licenses/mit-license.php
//
// The word "QR Code" is registered trademark of
// DENSO WAVE INCORPORATED
//   http://www.denso-wave.com/qrcode/faqpatent-e.html
//
//---------------------------------------------------------------------
*/ /**
 * Add finder patterns bits to matrix
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */ function setupFinderPattern(matrix, version) {
    const size = matrix.size;
    const pos = FinderPattern.getPositions(version);
    for(let i = 0; i < pos.length; i++){
        const row = pos[i][0];
        const col = pos[i][1];
        for(let r = -1; r <= 7; r++){
            if (row + r <= -1 || size <= row + r) continue;
            for(let c = -1; c <= 7; c++){
                if (col + c <= -1 || size <= col + c) continue;
                if (r >= 0 && r <= 6 && (c === 0 || c === 6) || c >= 0 && c <= 6 && (r === 0 || r === 6) || r >= 2 && r <= 4 && c >= 2 && c <= 4) {
                    matrix.set(row + r, col + c, true, true);
                } else {
                    matrix.set(row + r, col + c, false, true);
                }
            }
        }
    }
}
/**
 * Add timing pattern bits to matrix
 *
 * Note: this function must be called before {@link setupAlignmentPattern}
 *
 * @param  {BitMatrix} matrix Modules matrix
 */ function setupTimingPattern(matrix) {
    const size = matrix.size;
    for(let r = 8; r < size - 8; r++){
        const value = r % 2 === 0;
        matrix.set(r, 6, value, true);
        matrix.set(6, r, value, true);
    }
}
/**
 * Add alignment patterns bits to matrix
 *
 * Note: this function must be called after {@link setupTimingPattern}
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */ function setupAlignmentPattern(matrix, version) {
    const pos = AlignmentPattern.getPositions(version);
    for(let i = 0; i < pos.length; i++){
        const row = pos[i][0];
        const col = pos[i][1];
        for(let r = -2; r <= 2; r++){
            for(let c = -2; c <= 2; c++){
                if (r === -2 || r === 2 || c === -2 || c === 2 || r === 0 && c === 0) {
                    matrix.set(row + r, col + c, true, true);
                } else {
                    matrix.set(row + r, col + c, false, true);
                }
            }
        }
    }
}
/**
 * Add version info bits to matrix
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */ function setupVersionInfo(matrix, version) {
    const size = matrix.size;
    const bits = Version.getEncodedBits(version);
    let row, col, mod;
    for(let i = 0; i < 18; i++){
        row = Math.floor(i / 3);
        col = i % 3 + size - 8 - 3;
        mod = (bits >> i & 1) === 1;
        matrix.set(row, col, mod, true);
        matrix.set(col, row, mod, true);
    }
}
/**
 * Add format info bits to matrix
 *
 * @param  {BitMatrix} matrix               Modules matrix
 * @param  {ErrorCorrectionLevel}    errorCorrectionLevel Error correction level
 * @param  {Number}    maskPattern          Mask pattern reference value
 */ function setupFormatInfo(matrix, errorCorrectionLevel, maskPattern) {
    const size = matrix.size;
    const bits = FormatInfo.getEncodedBits(errorCorrectionLevel, maskPattern);
    let i, mod;
    for(i = 0; i < 15; i++){
        mod = (bits >> i & 1) === 1;
        // vertical
        if (i < 6) {
            matrix.set(i, 8, mod, true);
        } else if (i < 8) {
            matrix.set(i + 1, 8, mod, true);
        } else {
            matrix.set(size - 15 + i, 8, mod, true);
        }
        // horizontal
        if (i < 8) {
            matrix.set(8, size - i - 1, mod, true);
        } else if (i < 9) {
            matrix.set(8, 15 - i - 1 + 1, mod, true);
        } else {
            matrix.set(8, 15 - i - 1, mod, true);
        }
    }
    // fixed module
    matrix.set(size - 8, 8, 1, true);
}
/**
 * Add encoded data bits to matrix
 *
 * @param  {BitMatrix}  matrix Modules matrix
 * @param  {Uint8Array} data   Data codewords
 */ function setupData(matrix, data) {
    const size = matrix.size;
    let inc = -1;
    let row = size - 1;
    let bitIndex = 7;
    let byteIndex = 0;
    for(let col = size - 1; col > 0; col -= 2){
        if (col === 6) col--;
        while(true){
            for(let c = 0; c < 2; c++){
                if (!matrix.isReserved(row, col - c)) {
                    let dark = false;
                    if (byteIndex < data.length) {
                        dark = (data[byteIndex] >>> bitIndex & 1) === 1;
                    }
                    matrix.set(row, col - c, dark);
                    bitIndex--;
                    if (bitIndex === -1) {
                        byteIndex++;
                        bitIndex = 7;
                    }
                }
            }
            row += inc;
            if (row < 0 || size <= row) {
                row -= inc;
                inc = -inc;
                break;
            }
        }
    }
}
/**
 * Create encoded codewords from data input
 *
 * @param  {Number}   version              QR Code version
 * @param  {ErrorCorrectionLevel}   errorCorrectionLevel Error correction level
 * @param  {ByteData} data                 Data input
 * @return {Uint8Array}                    Buffer containing encoded codewords
 */ function createData(version, errorCorrectionLevel, segments) {
    // Prepare data buffer
    const buffer = new BitBuffer();
    segments.forEach(function(data) {
        // prefix data with mode indicator (4 bits)
        buffer.put(data.mode.bit, 4);
        // Prefix data with character count indicator.
        // The character count indicator is a string of bits that represents the
        // number of characters that are being encoded.
        // The character count indicator must be placed after the mode indicator
        // and must be a certain number of bits long, depending on the QR version
        // and data mode
        // @see {@link Mode.getCharCountIndicator}.
        buffer.put(data.getLength(), Mode.getCharCountIndicator(data.mode, version));
        // add binary data sequence to buffer
        data.write(buffer);
    });
    // Calculate required number of bits
    const totalCodewords = Utils.getSymbolTotalCodewords(version);
    const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
    const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
    // Add a terminator.
    // If the bit string is shorter than the total number of required bits,
    // a terminator of up to four 0s must be added to the right side of the string.
    // If the bit string is more than four bits shorter than the required number of bits,
    // add four 0s to the end.
    if (buffer.getLengthInBits() + 4 <= dataTotalCodewordsBits) {
        buffer.put(0, 4);
    }
    // If the bit string is fewer than four bits shorter, add only the number of 0s that
    // are needed to reach the required number of bits.
    // After adding the terminator, if the number of bits in the string is not a multiple of 8,
    // pad the string on the right with 0s to make the string's length a multiple of 8.
    while(buffer.getLengthInBits() % 8 !== 0){
        buffer.putBit(0);
    }
    // Add pad bytes if the string is still shorter than the total number of required bits.
    // Extend the buffer to fill the data capacity of the symbol corresponding to
    // the Version and Error Correction Level by adding the Pad Codewords 11101100 (0xEC)
    // and 00010001 (0x11) alternately.
    const remainingByte = (dataTotalCodewordsBits - buffer.getLengthInBits()) / 8;
    for(let i = 0; i < remainingByte; i++){
        buffer.put(i % 2 ? 0x11 : 0xEC, 8);
    }
    return createCodewords(buffer, version, errorCorrectionLevel);
}
/**
 * Encode input data with Reed-Solomon and return codewords with
 * relative error correction bits
 *
 * @param  {BitBuffer} bitBuffer            Data to encode
 * @param  {Number}    version              QR Code version
 * @param  {ErrorCorrectionLevel} errorCorrectionLevel Error correction level
 * @return {Uint8Array}                     Buffer containing encoded codewords
 */ function createCodewords(bitBuffer, version, errorCorrectionLevel) {
    // Total codewords for this QR code version (Data + Error correction)
    const totalCodewords = Utils.getSymbolTotalCodewords(version);
    // Total number of error correction codewords
    const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
    // Total number of data codewords
    const dataTotalCodewords = totalCodewords - ecTotalCodewords;
    // Total number of blocks
    const ecTotalBlocks = ECCode.getBlocksCount(version, errorCorrectionLevel);
    // Calculate how many blocks each group should contain
    const blocksInGroup2 = totalCodewords % ecTotalBlocks;
    const blocksInGroup1 = ecTotalBlocks - blocksInGroup2;
    const totalCodewordsInGroup1 = Math.floor(totalCodewords / ecTotalBlocks);
    const dataCodewordsInGroup1 = Math.floor(dataTotalCodewords / ecTotalBlocks);
    const dataCodewordsInGroup2 = dataCodewordsInGroup1 + 1;
    // Number of EC codewords is the same for both groups
    const ecCount = totalCodewordsInGroup1 - dataCodewordsInGroup1;
    // Initialize a Reed-Solomon encoder with a generator polynomial of degree ecCount
    const rs = new ReedSolomonEncoder(ecCount);
    let offset = 0;
    const dcData = new Array(ecTotalBlocks);
    const ecData = new Array(ecTotalBlocks);
    let maxDataSize = 0;
    const buffer = new Uint8Array(bitBuffer.buffer);
    // Divide the buffer into the required number of blocks
    for(let b = 0; b < ecTotalBlocks; b++){
        const dataSize = b < blocksInGroup1 ? dataCodewordsInGroup1 : dataCodewordsInGroup2;
        // extract a block of data from buffer
        dcData[b] = buffer.slice(offset, offset + dataSize);
        // Calculate EC codewords for this data block
        ecData[b] = rs.encode(dcData[b]);
        offset += dataSize;
        maxDataSize = Math.max(maxDataSize, dataSize);
    }
    // Create final data
    // Interleave the data and error correction codewords from each block
    const data = new Uint8Array(totalCodewords);
    let index = 0;
    let i, r;
    // Add data codewords
    for(i = 0; i < maxDataSize; i++){
        for(r = 0; r < ecTotalBlocks; r++){
            if (i < dcData[r].length) {
                data[index++] = dcData[r][i];
            }
        }
    }
    // Apped EC codewords
    for(i = 0; i < ecCount; i++){
        for(r = 0; r < ecTotalBlocks; r++){
            data[index++] = ecData[r][i];
        }
    }
    return data;
}
/**
 * Build QR Code symbol
 *
 * @param  {String} data                 Input string
 * @param  {Number} version              QR Code version
 * @param  {ErrorCorretionLevel} errorCorrectionLevel Error level
 * @param  {MaskPattern} maskPattern     Mask pattern
 * @return {Object}                      Object containing symbol data
 */ function createSymbol(data, version, errorCorrectionLevel, maskPattern) {
    let segments;
    if (Array.isArray(data)) {
        segments = Segments.fromArray(data);
    } else if (typeof data === 'string') {
        let estimatedVersion = version;
        if (!estimatedVersion) {
            const rawSegments = Segments.rawSplit(data);
            // Estimate best version that can contain raw splitted segments
            estimatedVersion = Version.getBestVersionForData(rawSegments, errorCorrectionLevel);
        }
        // Build optimized segments
        // If estimated version is undefined, try with the highest version
        segments = Segments.fromString(data, estimatedVersion || 40);
    } else {
        throw new Error('Invalid data');
    }
    // Get the min version that can contain data
    const bestVersion = Version.getBestVersionForData(segments, errorCorrectionLevel);
    // If no version is found, data cannot be stored
    if (!bestVersion) {
        throw new Error('The amount of data is too big to be stored in a QR Code');
    }
    // If not specified, use min version as default
    if (!version) {
        version = bestVersion;
    // Check if the specified version can contain the data
    } else if (version < bestVersion) {
        throw new Error('\n' + 'The chosen QR Code version cannot contain this amount of data.\n' + 'Minimum version required to store current data is: ' + bestVersion + '.\n');
    }
    const dataBits = createData(version, errorCorrectionLevel, segments);
    // Allocate matrix buffer
    const moduleCount = Utils.getSymbolSize(version);
    const modules = new BitMatrix(moduleCount);
    // Add function modules
    setupFinderPattern(modules, version);
    setupTimingPattern(modules);
    setupAlignmentPattern(modules, version);
    // Add temporary dummy bits for format info just to set them as reserved.
    // This is needed to prevent these bits from being masked by {@link MaskPattern.applyMask}
    // since the masking operation must be performed only on the encoding region.
    // These blocks will be replaced with correct values later in code.
    setupFormatInfo(modules, errorCorrectionLevel, 0);
    if (version >= 7) {
        setupVersionInfo(modules, version);
    }
    // Add data codewords
    setupData(modules, dataBits);
    if (isNaN(maskPattern)) {
        // Find best mask pattern
        maskPattern = MaskPattern.getBestMask(modules, setupFormatInfo.bind(null, modules, errorCorrectionLevel));
    }
    // Apply mask pattern
    MaskPattern.applyMask(maskPattern, modules);
    // Replace format info bits with correct values
    setupFormatInfo(modules, errorCorrectionLevel, maskPattern);
    return {
        modules: modules,
        version: version,
        errorCorrectionLevel: errorCorrectionLevel,
        maskPattern: maskPattern,
        segments: segments
    };
}
/**
 * QR Code
 *
 * @param {String | Array} data                 Input data
 * @param {Object} options                      Optional configurations
 * @param {Number} options.version              QR Code version
 * @param {String} options.errorCorrectionLevel Error correction level
 * @param {Function} options.toSJISFunc         Helper func to convert utf8 to sjis
 */ exports.create = function create(data, options) {
    if (typeof data === 'undefined' || data === '') {
        throw new Error('No input text');
    }
    let errorCorrectionLevel = ECLevel.M;
    let version;
    let mask;
    if (typeof options !== 'undefined') {
        // Use higher error correction level as default
        errorCorrectionLevel = ECLevel.from(options.errorCorrectionLevel, ECLevel.M);
        version = Version.from(options.version);
        mask = MaskPattern.from(options.maskPattern);
        if (options.toSJISFunc) {
            Utils.setToSJISFunction(options.toSJISFunc);
        }
    }
    return createSymbol(data, version, errorCorrectionLevel, mask);
};
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/renderer/utils.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

function hex2rgba(hex) {
    if (typeof hex === 'number') {
        hex = hex.toString();
    }
    if (typeof hex !== 'string') {
        throw new Error('Color should be defined as hex string');
    }
    let hexCode = hex.slice().replace('#', '').split('');
    if (hexCode.length < 3 || hexCode.length === 5 || hexCode.length > 8) {
        throw new Error('Invalid hex color: ' + hex);
    }
    // Convert from short to long form (fff -> ffffff)
    if (hexCode.length === 3 || hexCode.length === 4) {
        hexCode = Array.prototype.concat.apply([], hexCode.map(function(c) {
            return [
                c,
                c
            ];
        }));
    }
    // Add default alpha value
    if (hexCode.length === 6) hexCode.push('F', 'F');
    const hexValue = parseInt(hexCode.join(''), 16);
    return {
        r: hexValue >> 24 & 255,
        g: hexValue >> 16 & 255,
        b: hexValue >> 8 & 255,
        a: hexValue & 255,
        hex: '#' + hexCode.slice(0, 6).join('')
    };
}
exports.getOptions = function getOptions(options) {
    if (!options) options = {};
    if (!options.color) options.color = {};
    const margin = typeof options.margin === 'undefined' || options.margin === null || options.margin < 0 ? 4 : options.margin;
    const width = options.width && options.width >= 21 ? options.width : undefined;
    const scale = options.scale || 4;
    return {
        width: width,
        scale: width ? 4 : scale,
        margin: margin,
        color: {
            dark: hex2rgba(options.color.dark || '#000000ff'),
            light: hex2rgba(options.color.light || '#ffffffff')
        },
        type: options.type,
        rendererOpts: options.rendererOpts || {}
    };
};
exports.getScale = function getScale(qrSize, opts) {
    return opts.width && opts.width >= qrSize + opts.margin * 2 ? opts.width / (qrSize + opts.margin * 2) : opts.scale;
};
exports.getImageWidth = function getImageWidth(qrSize, opts) {
    const scale = exports.getScale(qrSize, opts);
    return Math.floor((qrSize + opts.margin * 2) * scale);
};
exports.qrToImageData = function qrToImageData(imgData, qr, opts) {
    const size = qr.modules.size;
    const data = qr.modules.data;
    const scale = exports.getScale(size, opts);
    const symbolSize = Math.floor((size + opts.margin * 2) * scale);
    const scaledMargin = opts.margin * scale;
    const palette = [
        opts.color.light,
        opts.color.dark
    ];
    for(let i = 0; i < symbolSize; i++){
        for(let j = 0; j < symbolSize; j++){
            let posDst = (i * symbolSize + j) * 4;
            let pxColor = opts.color.light;
            if (i >= scaledMargin && j >= scaledMargin && i < symbolSize - scaledMargin && j < symbolSize - scaledMargin) {
                const iSrc = Math.floor((i - scaledMargin) / scale);
                const jSrc = Math.floor((j - scaledMargin) / scale);
                pxColor = palette[data[iSrc * size + jSrc] ? 1 : 0];
            }
            imgData[posDst++] = pxColor.r;
            imgData[posDst++] = pxColor.g;
            imgData[posDst++] = pxColor.b;
            imgData[posDst] = pxColor.a;
        }
    }
};
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/renderer/canvas.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const Utils = __turbopack_context__.r("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/renderer/utils.js [app-client] (ecmascript)");
function clearCanvas(ctx, canvas, size) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!canvas.style) canvas.style = {};
    canvas.height = size;
    canvas.width = size;
    canvas.style.height = size + 'px';
    canvas.style.width = size + 'px';
}
function getCanvasElement() {
    try {
        return document.createElement('canvas');
    } catch (e) {
        throw new Error('You need to specify a canvas element');
    }
}
exports.render = function render(qrData, canvas, options) {
    let opts = options;
    let canvasEl = canvas;
    if (typeof opts === 'undefined' && (!canvas || !canvas.getContext)) {
        opts = canvas;
        canvas = undefined;
    }
    if (!canvas) {
        canvasEl = getCanvasElement();
    }
    opts = Utils.getOptions(opts);
    const size = Utils.getImageWidth(qrData.modules.size, opts);
    const ctx = canvasEl.getContext('2d');
    const image = ctx.createImageData(size, size);
    Utils.qrToImageData(image.data, qrData, opts);
    clearCanvas(ctx, canvasEl, size);
    ctx.putImageData(image, 0, 0);
    return canvasEl;
};
exports.renderToDataURL = function renderToDataURL(qrData, canvas, options) {
    let opts = options;
    if (typeof opts === 'undefined' && (!canvas || !canvas.getContext)) {
        opts = canvas;
        canvas = undefined;
    }
    if (!opts) opts = {};
    const canvasEl = exports.render(qrData, canvas, opts);
    const type = opts.type || 'image/png';
    const rendererOpts = opts.rendererOpts || {};
    return canvasEl.toDataURL(type, rendererOpts.quality);
};
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/renderer/svg-tag.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const Utils = __turbopack_context__.r("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/renderer/utils.js [app-client] (ecmascript)");
function getColorAttrib(color, attrib) {
    const alpha = color.a / 255;
    const str = attrib + '="' + color.hex + '"';
    return alpha < 1 ? str + ' ' + attrib + '-opacity="' + alpha.toFixed(2).slice(1) + '"' : str;
}
function svgCmd(cmd, x, y) {
    let str = cmd + x;
    if (typeof y !== 'undefined') str += ' ' + y;
    return str;
}
function qrToPath(data, size, margin) {
    let path = '';
    let moveBy = 0;
    let newRow = false;
    let lineLength = 0;
    for(let i = 0; i < data.length; i++){
        const col = Math.floor(i % size);
        const row = Math.floor(i / size);
        if (!col && !newRow) newRow = true;
        if (data[i]) {
            lineLength++;
            if (!(i > 0 && col > 0 && data[i - 1])) {
                path += newRow ? svgCmd('M', col + margin, 0.5 + row + margin) : svgCmd('m', moveBy, 0);
                moveBy = 0;
                newRow = false;
            }
            if (!(col + 1 < size && data[i + 1])) {
                path += svgCmd('h', lineLength);
                lineLength = 0;
            }
        } else {
            moveBy++;
        }
    }
    return path;
}
exports.render = function render(qrData, options, cb) {
    const opts = Utils.getOptions(options);
    const size = qrData.modules.size;
    const data = qrData.modules.data;
    const qrcodesize = size + opts.margin * 2;
    const bg = !opts.color.light.a ? '' : '<path ' + getColorAttrib(opts.color.light, 'fill') + ' d="M0 0h' + qrcodesize + 'v' + qrcodesize + 'H0z"/>';
    const path = '<path ' + getColorAttrib(opts.color.dark, 'stroke') + ' d="' + qrToPath(data, size, opts.margin) + '"/>';
    const viewBox = 'viewBox="' + '0 0 ' + qrcodesize + ' ' + qrcodesize + '"';
    const width = !opts.width ? '' : 'width="' + opts.width + '" height="' + opts.width + '" ';
    const svgTag = '<svg xmlns="http://www.w3.org/2000/svg" ' + width + viewBox + ' shape-rendering="crispEdges">' + bg + path + '</svg>\n';
    if (typeof cb === 'function') {
        cb(null, svgTag);
    }
    return svgTag;
};
}),
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/browser.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const canPromise = __turbopack_context__.r("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/can-promise.js [app-client] (ecmascript)");
const QRCode = __turbopack_context__.r("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/qrcode.js [app-client] (ecmascript)");
const CanvasRenderer = __turbopack_context__.r("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/renderer/canvas.js [app-client] (ecmascript)");
const SvgRenderer = __turbopack_context__.r("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/qrcode/lib/renderer/svg-tag.js [app-client] (ecmascript)");
function renderCanvas(renderFunc, canvas, text, opts, cb) {
    const args = [].slice.call(arguments, 1);
    const argsNum = args.length;
    const isLastArgCb = typeof args[argsNum - 1] === 'function';
    if (!isLastArgCb && !canPromise()) {
        throw new Error('Callback required as last argument');
    }
    if (isLastArgCb) {
        if (argsNum < 2) {
            throw new Error('Too few arguments provided');
        }
        if (argsNum === 2) {
            cb = text;
            text = canvas;
            canvas = opts = undefined;
        } else if (argsNum === 3) {
            if (canvas.getContext && typeof cb === 'undefined') {
                cb = opts;
                opts = undefined;
            } else {
                cb = opts;
                opts = text;
                text = canvas;
                canvas = undefined;
            }
        }
    } else {
        if (argsNum < 1) {
            throw new Error('Too few arguments provided');
        }
        if (argsNum === 1) {
            text = canvas;
            canvas = opts = undefined;
        } else if (argsNum === 2 && !canvas.getContext) {
            opts = text;
            text = canvas;
            canvas = undefined;
        }
        return new Promise(function(resolve, reject) {
            try {
                const data = QRCode.create(text, opts);
                resolve(renderFunc(data, canvas, opts));
            } catch (e) {
                reject(e);
            }
        });
    }
    try {
        const data = QRCode.create(text, opts);
        cb(null, renderFunc(data, canvas, opts));
    } catch (e) {
        cb(e);
    }
}
exports.create = QRCode.create;
exports.toCanvas = renderCanvas.bind(null, CanvasRenderer.render);
exports.toDataURL = renderCanvas.bind(null, CanvasRenderer.renderToDataURL);
// only svg for now.
exports.toString = renderCanvas.bind(null, function(data, _, opts) {
    return SvgRenderer.render(data, opts);
});
}),
"[project]/frontend/node_modules/encode-utf8/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = function encodeUtf8(input) {
    var result = [];
    var size = input.length;
    for(var index = 0; index < size; index++){
        var point = input.charCodeAt(index);
        if (point >= 0xD800 && point <= 0xDBFF && size > index + 1) {
            var second = input.charCodeAt(index + 1);
            if (second >= 0xDC00 && second <= 0xDFFF) {
                // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
                point = (point - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
                index += 1;
            }
        }
        // US-ASCII
        if (point < 0x80) {
            result.push(point);
            continue;
        }
        // 2-byte UTF-8
        if (point < 0x800) {
            result.push(point >> 6 | 192);
            result.push(point & 63 | 128);
            continue;
        }
        // 3-byte UTF-8
        if (point < 0xD800 || point >= 0xE000 && point < 0x10000) {
            result.push(point >> 12 | 224);
            result.push(point >> 6 & 63 | 128);
            result.push(point & 63 | 128);
            continue;
        }
        // 4-byte UTF-8
        if (point >= 0x10000 && point <= 0x10FFFF) {
            result.push(point >> 18 | 240);
            result.push(point >> 12 & 63 | 128);
            result.push(point >> 6 & 63 | 128);
            result.push(point & 63 | 128);
            continue;
        }
        // Invalid character
        result.push(0xEF, 0xBF, 0xBD);
    }
    return new Uint8Array(result).buffer;
};
}),
"[project]/frontend/node_modules/dijkstrajs/dijkstra.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/******************************************************************************
 * Created 2008-08-19.
 *
 * Dijkstra path-finding functions. Adapted from the Dijkstar Python project.
 *
 * Copyright (C) 2008
 *   Wyatt Baldwin <self@wyattbaldwin.com>
 *   All rights reserved
 *
 * Licensed under the MIT license.
 *
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *****************************************************************************/ var dijkstra = {
    single_source_shortest_paths: function(graph, s, d) {
        // Predecessor map for each node that has been encountered.
        // node ID => predecessor node ID
        var predecessors = {};
        // Costs of shortest paths from s to all nodes encountered.
        // node ID => cost
        var costs = {};
        costs[s] = 0;
        // Costs of shortest paths from s to all nodes encountered; differs from
        // `costs` in that it provides easy access to the node that currently has
        // the known shortest path from s.
        // XXX: Do we actually need both `costs` and `open`?
        var open = dijkstra.PriorityQueue.make();
        open.push(s, 0);
        var closest, u, v, cost_of_s_to_u, adjacent_nodes, cost_of_e, cost_of_s_to_u_plus_cost_of_e, cost_of_s_to_v, first_visit;
        while(!open.empty()){
            // In the nodes remaining in graph that have a known cost from s,
            // find the node, u, that currently has the shortest path from s.
            closest = open.pop();
            u = closest.value;
            cost_of_s_to_u = closest.cost;
            // Get nodes adjacent to u...
            adjacent_nodes = graph[u] || {};
            // ...and explore the edges that connect u to those nodes, updating
            // the cost of the shortest paths to any or all of those nodes as
            // necessary. v is the node across the current edge from u.
            for(v in adjacent_nodes){
                if (adjacent_nodes.hasOwnProperty(v)) {
                    // Get the cost of the edge running from u to v.
                    cost_of_e = adjacent_nodes[v];
                    // Cost of s to u plus the cost of u to v across e--this is *a*
                    // cost from s to v that may or may not be less than the current
                    // known cost to v.
                    cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;
                    // If we haven't visited v yet OR if the current known cost from s to
                    // v is greater than the new cost we just found (cost of s to u plus
                    // cost of u to v across e), update v's cost in the cost list and
                    // update v's predecessor in the predecessor list (it's now u).
                    cost_of_s_to_v = costs[v];
                    first_visit = typeof costs[v] === 'undefined';
                    if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
                        costs[v] = cost_of_s_to_u_plus_cost_of_e;
                        open.push(v, cost_of_s_to_u_plus_cost_of_e);
                        predecessors[v] = u;
                    }
                }
            }
        }
        if (typeof d !== 'undefined' && typeof costs[d] === 'undefined') {
            var msg = [
                'Could not find a path from ',
                s,
                ' to ',
                d,
                '.'
            ].join('');
            throw new Error(msg);
        }
        return predecessors;
    },
    extract_shortest_path_from_predecessor_list: function(predecessors, d) {
        var nodes = [];
        var u = d;
        var predecessor;
        while(u){
            nodes.push(u);
            predecessor = predecessors[u];
            u = predecessors[u];
        }
        nodes.reverse();
        return nodes;
    },
    find_path: function(graph, s, d) {
        var predecessors = dijkstra.single_source_shortest_paths(graph, s, d);
        return dijkstra.extract_shortest_path_from_predecessor_list(predecessors, d);
    },
    /**
   * A very naive priority queue implementation.
   */ PriorityQueue: {
        make: function(opts) {
            var T = dijkstra.PriorityQueue, t = {}, key;
            opts = opts || {};
            for(key in T){
                if (T.hasOwnProperty(key)) {
                    t[key] = T[key];
                }
            }
            t.queue = [];
            t.sorter = opts.sorter || T.default_sorter;
            return t;
        },
        default_sorter: function(a, b) {
            return a.cost - b.cost;
        },
        /**
     * Add a new item to the queue and ensure the highest priority element
     * is at the front of the queue.
     */ push: function(value, cost) {
            var item = {
                value: value,
                cost: cost
            };
            this.queue.push(item);
            this.queue.sort(this.sorter);
        },
        /**
     * Return the highest priority element in the queue.
     */ pop: function() {
            return this.queue.shift();
        },
        empty: function() {
            return this.queue.length === 0;
        }
    }
};
// node.js module exports
if ("TURBOPACK compile-time truthy", 1) {
    module.exports = dijkstra;
}
}),
]);

//# sourceMappingURL=9e883_3f79110c._.js.map