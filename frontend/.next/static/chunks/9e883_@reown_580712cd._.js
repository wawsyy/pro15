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
"[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit/directives/if-defined.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$directives$2f$if$2d$defined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit-html/development/directives/if-defined.js [app-client] (ecmascript)"); //# sourceMappingURL=if-defined.js.map
;
}),
"[project]/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/ModalUtil.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ModalUtil",
    ()=>ModalUtil
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ModalController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/RouterController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$SIWXUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/SIWXUtil.js [app-client] (ecmascript)");
;
;
;
const ModalUtil = {
    isUnsupportedChainView () {
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].state.view === 'UnsupportedChain' || __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].state.view === 'SwitchNetwork' && __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].state.history.includes('UnsupportedChain');
    },
    async safeClose () {
        if (this.isUnsupportedChainView()) {
            __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].shake();
            return;
        }
        const isSIWXCloseDisabled = await __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$SIWXUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SIWXUtil"].isSIWXCloseDisabled();
        if (isSIWXCloseDisabled) {
            __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].shake();
            return;
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].close();
    }
}; //# sourceMappingURL=ModalUtil.js.map
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
"[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/components/wui-card/styles.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@swc/helpers/esm/_tagged_template_literal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/css-tag.js [app-client] (ecmascript)");
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  :host {\n    display: block;\n    border-radius: clamp(0px, var(--wui-border-radius-l), 44px);\n    box-shadow: 0 0 0 1px var(--wui-color-gray-glass-005);\n    background-color: var(--wui-color-modal-bg);\n    overflow: hidden;\n  }\n\n  :host([data-embedded='true']) {\n    box-shadow:\n      0 0 0 1px var(--wui-color-gray-glass-005),\n      0px 4px 12px 4px var(--w3m-card-embedded-shadow-color);\n  }\n"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["css"])(_templateObject());
 //# sourceMappingURL=styles.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/components/wui-card/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WuiCard",
    ()=>WuiCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@swc/helpers/esm/_tagged_template_literal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$element$2f$development$2f$lit$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-element/development/lit-element.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-html/development/lit-html.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/ThemeUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WebComponentsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/WebComponentsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$components$2f$wui$2d$card$2f$styles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/components/wui-card/styles.js [app-client] (ecmascript)");
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<slot></slot>"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
var __decorate = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__decorate || function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
;
;
;
;
let WuiCard = class WuiCard extends __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$element$2f$development$2f$lit$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LitElement"] {
    render() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject());
    }
};
WuiCard.styles = [
    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resetStyles"],
    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$components$2f$wui$2d$card$2f$styles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
];
WuiCard = __decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WebComponentsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["customElement"])('wui-card')
], WuiCard);
;
 //# sourceMappingURL=index.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/exports/wui-card.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$components$2f$wui$2d$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/components/wui-card/index.js [app-client] (ecmascript)"); //# sourceMappingURL=wui-card.js.map
;
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
"[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/layout/wui-flex/styles.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@swc/helpers/esm/_tagged_template_literal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/css-tag.js [app-client] (ecmascript)");
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  :host {\n    display: flex;\n    width: inherit;\n    height: inherit;\n  }\n"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["css"])(_templateObject());
 //# sourceMappingURL=styles.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/layout/wui-flex/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WuiFlex",
    ()=>WuiFlex
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@swc/helpers/esm/_tagged_template_literal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$element$2f$development$2f$lit$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-element/development/lit-element.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-html/development/lit-html.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2f$decorators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit/decorators.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/decorators/property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/ThemeUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$UiHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/UiHelperUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WebComponentsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/WebComponentsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$layout$2f$wui$2d$flex$2f$styles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/layout/wui-flex/styles.js [app-client] (ecmascript)");
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<slot></slot>"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
var __decorate = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__decorate || function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
;
;
;
;
;
;
let WuiFlex = class WuiFlex extends __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$element$2f$development$2f$lit$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LitElement"] {
    render() {
        this.style.cssText = "\n      flex-direction: ".concat(this.flexDirection, ";\n      flex-wrap: ").concat(this.flexWrap, ";\n      flex-basis: ").concat(this.flexBasis, ";\n      flex-grow: ").concat(this.flexGrow, ";\n      flex-shrink: ").concat(this.flexShrink, ";\n      align-items: ").concat(this.alignItems, ";\n      justify-content: ").concat(this.justifyContent, ";\n      column-gap: ").concat(this.columnGap && "var(--wui-spacing-".concat(this.columnGap, ")"), ";\n      row-gap: ").concat(this.rowGap && "var(--wui-spacing-".concat(this.rowGap, ")"), ";\n      gap: ").concat(this.gap && "var(--wui-spacing-".concat(this.gap, ")"), ";\n      padding-top: ").concat(this.padding && __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$UiHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UiHelperUtil"].getSpacingStyles(this.padding, 0), ";\n      padding-right: ").concat(this.padding && __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$UiHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UiHelperUtil"].getSpacingStyles(this.padding, 1), ";\n      padding-bottom: ").concat(this.padding && __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$UiHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UiHelperUtil"].getSpacingStyles(this.padding, 2), ";\n      padding-left: ").concat(this.padding && __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$UiHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UiHelperUtil"].getSpacingStyles(this.padding, 3), ";\n      margin-top: ").concat(this.margin && __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$UiHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UiHelperUtil"].getSpacingStyles(this.margin, 0), ";\n      margin-right: ").concat(this.margin && __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$UiHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UiHelperUtil"].getSpacingStyles(this.margin, 1), ";\n      margin-bottom: ").concat(this.margin && __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$UiHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UiHelperUtil"].getSpacingStyles(this.margin, 2), ";\n      margin-left: ").concat(this.margin && __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$UiHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UiHelperUtil"].getSpacingStyles(this.margin, 3), ";\n    ");
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject());
    }
};
WuiFlex.styles = [
    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resetStyles"],
    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$layout$2f$wui$2d$flex$2f$styles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
];
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])()
], WuiFlex.prototype, "flexDirection", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])()
], WuiFlex.prototype, "flexWrap", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])()
], WuiFlex.prototype, "flexBasis", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])()
], WuiFlex.prototype, "flexGrow", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])()
], WuiFlex.prototype, "flexShrink", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])()
], WuiFlex.prototype, "alignItems", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])()
], WuiFlex.prototype, "justifyContent", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])()
], WuiFlex.prototype, "columnGap", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])()
], WuiFlex.prototype, "rowGap", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])()
], WuiFlex.prototype, "gap", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])()
], WuiFlex.prototype, "padding", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])()
], WuiFlex.prototype, "margin", void 0);
WuiFlex = __decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WebComponentsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["customElement"])('wui-flex')
], WuiFlex);
;
 //# sourceMappingURL=index.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/exports/wui-flex.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$layout$2f$wui$2d$flex$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/layout/wui-flex/index.js [app-client] (ecmascript)"); //# sourceMappingURL=wui-flex.js.map
;
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
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit/directives/until.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$directives$2f$until$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-html/development/directives/until.js [app-client] (ecmascript)"); //# sourceMappingURL=until.js.map
;
}),
"[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/CacheUtil.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CacheUtil",
    ()=>CacheUtil,
    "globalSvgCache",
    ()=>globalSvgCache
]);
class CacheUtil {
    set(key, value) {
        this.cache.set(key, value);
    }
    get(key) {
        return this.cache.get(key);
    }
    has(key) {
        return this.cache.has(key);
    }
    delete(key) {
        this.cache.delete(key);
    }
    clear() {
        this.cache.clear();
    }
    constructor(){
        this.cache = new Map();
    }
}
const globalSvgCache = new CacheUtil(); //# sourceMappingURL=CacheUtil.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/components/wui-icon/styles.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@swc/helpers/esm/_tagged_template_literal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/css-tag.js [app-client] (ecmascript)");
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  :host {\n    display: flex;\n    aspect-ratio: var(--local-aspect-ratio);\n    color: var(--local-color);\n    width: var(--local-width);\n  }\n\n  svg {\n    width: inherit;\n    height: inherit;\n    object-fit: contain;\n    object-position: center;\n  }\n\n  .fallback {\n    width: var(--local-width);\n    height: var(--local-height);\n  }\n"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["css"])(_templateObject());
 //# sourceMappingURL=styles.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/components/wui-icon/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WuiIcon",
    ()=>WuiIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@swc/helpers/esm/_tagged_template_literal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$element$2f$development$2f$lit$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-element/development/lit-element.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-html/development/lit-html.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2f$decorators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit/decorators.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/decorators/property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2f$directives$2f$until$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit/directives/until.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$directives$2f$until$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-html/development/directives/until.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$CacheUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/CacheUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/ThemeUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WebComponentsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/WebComponentsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$components$2f$wui$2d$icon$2f$styles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/components/wui-icon/styles.js [app-client] (ecmascript)");
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        '<div class="fallback"></div>'
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "",
        ""
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
var __decorate = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__decorate || function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
;
;
;
;
;
;
;
const ICONS = {
    add: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/add.js [app-client] (ecmascript, async loader)")).addSvg,
    allWallets: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/all-wallets.js [app-client] (ecmascript, async loader)")).allWalletsSvg,
    arrowBottomCircle: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/arrow-bottom-circle.js [app-client] (ecmascript, async loader)")).arrowBottomCircleSvg,
    appStore: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/app-store.js [app-client] (ecmascript, async loader)")).appStoreSvg,
    apple: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/apple.js [app-client] (ecmascript, async loader)")).appleSvg,
    arrowBottom: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/arrow-bottom.js [app-client] (ecmascript, async loader)")).arrowBottomSvg,
    arrowLeft: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/arrow-left.js [app-client] (ecmascript, async loader)")).arrowLeftSvg,
    arrowRight: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/arrow-right.js [app-client] (ecmascript, async loader)")).arrowRightSvg,
    arrowTop: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/arrow-top.js [app-client] (ecmascript, async loader)")).arrowTopSvg,
    bank: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/bank.js [app-client] (ecmascript, async loader)")).bankSvg,
    browser: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/browser.js [app-client] (ecmascript, async loader)")).browserSvg,
    card: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/card.js [app-client] (ecmascript, async loader)")).cardSvg,
    checkmark: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/checkmark.js [app-client] (ecmascript, async loader)")).checkmarkSvg,
    checkmarkBold: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/checkmark-bold.js [app-client] (ecmascript, async loader)")).checkmarkBoldSvg,
    chevronBottom: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/chevron-bottom.js [app-client] (ecmascript, async loader)")).chevronBottomSvg,
    chevronLeft: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/chevron-left.js [app-client] (ecmascript, async loader)")).chevronLeftSvg,
    chevronRight: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/chevron-right.js [app-client] (ecmascript, async loader)")).chevronRightSvg,
    chevronTop: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/chevron-top.js [app-client] (ecmascript, async loader)")).chevronTopSvg,
    chromeStore: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/chrome-store.js [app-client] (ecmascript, async loader)")).chromeStoreSvg,
    clock: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/clock.js [app-client] (ecmascript, async loader)")).clockSvg,
    close: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/close.js [app-client] (ecmascript, async loader)")).closeSvg,
    compass: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/compass.js [app-client] (ecmascript, async loader)")).compassSvg,
    coinPlaceholder: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/coinPlaceholder.js [app-client] (ecmascript, async loader)")).coinPlaceholderSvg,
    copy: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/copy.js [app-client] (ecmascript, async loader)")).copySvg,
    cursor: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/cursor.js [app-client] (ecmascript, async loader)")).cursorSvg,
    cursorTransparent: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/cursor-transparent.js [app-client] (ecmascript, async loader)")).cursorTransparentSvg,
    desktop: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/desktop.js [app-client] (ecmascript, async loader)")).desktopSvg,
    disconnect: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/disconnect.js [app-client] (ecmascript, async loader)")).disconnectSvg,
    discord: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/discord.js [app-client] (ecmascript, async loader)")).discordSvg,
    etherscan: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/etherscan.js [app-client] (ecmascript, async loader)")).etherscanSvg,
    extension: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/extension.js [app-client] (ecmascript, async loader)")).extensionSvg,
    externalLink: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/external-link.js [app-client] (ecmascript, async loader)")).externalLinkSvg,
    facebook: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/facebook.js [app-client] (ecmascript, async loader)")).facebookSvg,
    farcaster: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/farcaster.js [app-client] (ecmascript, async loader)")).farcasterSvg,
    filters: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/filters.js [app-client] (ecmascript, async loader)")).filtersSvg,
    github: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/github.js [app-client] (ecmascript, async loader)")).githubSvg,
    google: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/google.js [app-client] (ecmascript, async loader)")).googleSvg,
    helpCircle: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/help-circle.js [app-client] (ecmascript, async loader)")).helpCircleSvg,
    image: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/image.js [app-client] (ecmascript, async loader)")).imageSvg,
    id: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/id.js [app-client] (ecmascript, async loader)")).idSvg,
    infoCircle: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/info-circle.js [app-client] (ecmascript, async loader)")).infoCircleSvg,
    lightbulb: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/lightbulb.js [app-client] (ecmascript, async loader)")).lightbulbSvg,
    mail: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/mail.js [app-client] (ecmascript, async loader)")).mailSvg,
    mobile: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/mobile.js [app-client] (ecmascript, async loader)")).mobileSvg,
    more: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/more.js [app-client] (ecmascript, async loader)")).moreSvg,
    networkPlaceholder: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/network-placeholder.js [app-client] (ecmascript, async loader)")).networkPlaceholderSvg,
    nftPlaceholder: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/nftPlaceholder.js [app-client] (ecmascript, async loader)")).nftPlaceholderSvg,
    off: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/off.js [app-client] (ecmascript, async loader)")).offSvg,
    playStore: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/play-store.js [app-client] (ecmascript, async loader)")).playStoreSvg,
    plus: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/plus.js [app-client] (ecmascript, async loader)")).plusSvg,
    qrCode: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/qr-code.js [app-client] (ecmascript, async loader)")).qrCodeIcon,
    recycleHorizontal: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/recycle-horizontal.js [app-client] (ecmascript, async loader)")).recycleHorizontalSvg,
    refresh: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/refresh.js [app-client] (ecmascript, async loader)")).refreshSvg,
    search: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/search.js [app-client] (ecmascript, async loader)")).searchSvg,
    send: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/send.js [app-client] (ecmascript, async loader)")).sendSvg,
    swapHorizontal: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/swapHorizontal.js [app-client] (ecmascript, async loader)")).swapHorizontalSvg,
    swapHorizontalMedium: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/swapHorizontalMedium.js [app-client] (ecmascript, async loader)")).swapHorizontalMediumSvg,
    swapHorizontalBold: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/swapHorizontalBold.js [app-client] (ecmascript, async loader)")).swapHorizontalBoldSvg,
    swapHorizontalRoundedBold: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/swapHorizontalRoundedBold.js [app-client] (ecmascript, async loader)")).swapHorizontalRoundedBoldSvg,
    swapVertical: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/swapVertical.js [app-client] (ecmascript, async loader)")).swapVerticalSvg,
    telegram: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/telegram.js [app-client] (ecmascript, async loader)")).telegramSvg,
    threeDots: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/three-dots.js [app-client] (ecmascript, async loader)")).threeDotsSvg,
    twitch: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/twitch.js [app-client] (ecmascript, async loader)")).twitchSvg,
    twitter: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/x.js [app-client] (ecmascript, async loader)")).xSvg,
    twitterIcon: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/twitterIcon.js [app-client] (ecmascript, async loader)")).twitterIconSvg,
    verify: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/verify.js [app-client] (ecmascript, async loader)")).verifySvg,
    verifyFilled: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/verify-filled.js [app-client] (ecmascript, async loader)")).verifyFilledSvg,
    wallet: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/wallet.js [app-client] (ecmascript, async loader)")).walletSvg,
    walletConnect: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/walletconnect.js [app-client] (ecmascript, async loader)")).walletConnectSvg,
    walletConnectLightBrown: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/walletconnect.js [app-client] (ecmascript, async loader)")).walletConnectLightBrownSvg,
    walletConnectBrown: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/walletconnect.js [app-client] (ecmascript, async loader)")).walletConnectBrownSvg,
    walletPlaceholder: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/wallet-placeholder.js [app-client] (ecmascript, async loader)")).walletPlaceholderSvg,
    warningCircle: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/warning-circle.js [app-client] (ecmascript, async loader)")).warningCircleSvg,
    x: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/x.js [app-client] (ecmascript, async loader)")).xSvg,
    info: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/info.js [app-client] (ecmascript, async loader)")).infoSvg,
    exclamationTriangle: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/exclamation-triangle.js [app-client] (ecmascript, async loader)")).exclamationTriangleSvg,
    reown: async ()=>(await __turbopack_context__.A("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/reown-logo.js [app-client] (ecmascript, async loader)")).reownSvg
};
async function getSvg(name) {
    if (__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$CacheUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["globalSvgCache"].has(name)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$CacheUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["globalSvgCache"].get(name);
    }
    var _ICONS_name;
    const importFn = (_ICONS_name = ICONS[name]) !== null && _ICONS_name !== void 0 ? _ICONS_name : ICONS.copy;
    const svgPromise = importFn();
    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$CacheUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["globalSvgCache"].set(name, svgPromise);
    return svgPromise;
}
let WuiIcon = class WuiIcon extends __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$element$2f$development$2f$lit$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LitElement"] {
    render() {
        this.style.cssText = "\n      --local-color: ".concat("var(--wui-color-".concat(this.color, ");"), "\n      --local-width: ").concat("var(--wui-icon-size-".concat(this.size, ");"), "\n      --local-aspect-ratio: ").concat(this.aspectRatio, "\n    ");
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject1(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$directives$2f$until$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["until"])(getSvg(this.name), (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject())));
    }
    constructor(){
        super(...arguments);
        this.size = 'md';
        this.name = 'copy';
        this.color = 'fg-300';
        this.aspectRatio = '1 / 1';
    }
};
WuiIcon.styles = [
    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resetStyles"],
    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["colorStyles"],
    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$components$2f$wui$2d$icon$2f$styles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
];
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])()
], WuiIcon.prototype, "size", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])()
], WuiIcon.prototype, "name", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])()
], WuiIcon.prototype, "color", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])()
], WuiIcon.prototype, "aspectRatio", void 0);
WuiIcon = __decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WebComponentsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["customElement"])('wui-icon')
], WuiIcon);
;
 //# sourceMappingURL=index.js.map
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
"[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit/directives/class-map.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$directives$2f$class$2d$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-html/development/directives/class-map.js [app-client] (ecmascript)"); //# sourceMappingURL=class-map.js.map
;
}),
"[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/components/wui-text/styles.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@swc/helpers/esm/_tagged_template_literal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/css-tag.js [app-client] (ecmascript)");
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  :host {\n    display: inline-flex !important;\n  }\n\n  slot {\n    width: 100%;\n    display: inline-block;\n    font-style: normal;\n    font-family: var(--wui-font-family);\n    font-feature-settings:\n      'tnum' on,\n      'lnum' on,\n      'case' on;\n    line-height: 130%;\n    font-weight: var(--wui-font-weight-regular);\n    overflow: inherit;\n    text-overflow: inherit;\n    text-align: var(--local-align);\n    color: var(--local-color);\n  }\n\n  .wui-line-clamp-1 {\n    overflow: hidden;\n    display: -webkit-box;\n    -webkit-box-orient: vertical;\n    -webkit-line-clamp: 1;\n  }\n\n  .wui-line-clamp-2 {\n    overflow: hidden;\n    display: -webkit-box;\n    -webkit-box-orient: vertical;\n    -webkit-line-clamp: 2;\n  }\n\n  .wui-font-medium-400 {\n    font-size: var(--wui-font-size-medium);\n    font-weight: var(--wui-font-weight-light);\n    letter-spacing: var(--wui-letter-spacing-medium);\n  }\n\n  .wui-font-medium-600 {\n    font-size: var(--wui-font-size-medium);\n    letter-spacing: var(--wui-letter-spacing-medium);\n  }\n\n  .wui-font-title-600 {\n    font-size: var(--wui-font-size-title);\n    letter-spacing: var(--wui-letter-spacing-title);\n  }\n\n  .wui-font-title-6-600 {\n    font-size: var(--wui-font-size-title-6);\n    letter-spacing: var(--wui-letter-spacing-title-6);\n  }\n\n  .wui-font-mini-700 {\n    font-size: var(--wui-font-size-mini);\n    letter-spacing: var(--wui-letter-spacing-mini);\n    text-transform: uppercase;\n  }\n\n  .wui-font-large-500,\n  .wui-font-large-600,\n  .wui-font-large-700 {\n    font-size: var(--wui-font-size-large);\n    letter-spacing: var(--wui-letter-spacing-large);\n  }\n\n  .wui-font-2xl-500,\n  .wui-font-2xl-600,\n  .wui-font-2xl-700 {\n    font-size: var(--wui-font-size-2xl);\n    letter-spacing: var(--wui-letter-spacing-2xl);\n  }\n\n  .wui-font-paragraph-400,\n  .wui-font-paragraph-500,\n  .wui-font-paragraph-600,\n  .wui-font-paragraph-700 {\n    font-size: var(--wui-font-size-paragraph);\n    letter-spacing: var(--wui-letter-spacing-paragraph);\n  }\n\n  .wui-font-small-400,\n  .wui-font-small-500,\n  .wui-font-small-600 {\n    font-size: var(--wui-font-size-small);\n    letter-spacing: var(--wui-letter-spacing-small);\n  }\n\n  .wui-font-tiny-400,\n  .wui-font-tiny-500,\n  .wui-font-tiny-600 {\n    font-size: var(--wui-font-size-tiny);\n    letter-spacing: var(--wui-letter-spacing-tiny);\n  }\n\n  .wui-font-micro-700,\n  .wui-font-micro-600 {\n    font-size: var(--wui-font-size-micro);\n    letter-spacing: var(--wui-letter-spacing-micro);\n    text-transform: uppercase;\n  }\n\n  .wui-font-tiny-400,\n  .wui-font-small-400,\n  .wui-font-medium-400,\n  .wui-font-paragraph-400 {\n    font-weight: var(--wui-font-weight-light);\n  }\n\n  .wui-font-large-700,\n  .wui-font-paragraph-700,\n  .wui-font-micro-700,\n  .wui-font-mini-700 {\n    font-weight: var(--wui-font-weight-bold);\n  }\n\n  .wui-font-medium-600,\n  .wui-font-medium-title-600,\n  .wui-font-title-6-600,\n  .wui-font-large-600,\n  .wui-font-paragraph-600,\n  .wui-font-small-600,\n  .wui-font-tiny-600,\n  .wui-font-micro-600 {\n    font-weight: var(--wui-font-weight-medium);\n  }\n\n  :host([disabled]) {\n    opacity: 0.4;\n  }\n"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["css"])(_templateObject());
 //# sourceMappingURL=styles.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/components/wui-text/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WuiText",
    ()=>WuiText
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@swc/helpers/esm/_tagged_template_literal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$element$2f$development$2f$lit$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-element/development/lit-element.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-html/development/lit-html.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2f$decorators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit/decorators.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/decorators/property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2f$directives$2f$class$2d$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit/directives/class-map.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$directives$2f$class$2d$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-html/development/directives/class-map.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/ThemeUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WebComponentsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/WebComponentsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$components$2f$wui$2d$text$2f$styles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/components/wui-text/styles.js [app-client] (ecmascript)");
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<slot class=",
        "></slot>"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
var __decorate = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__decorate || function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
;
;
;
;
;
;
let WuiText = class WuiText extends __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$element$2f$development$2f$lit$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LitElement"] {
    render() {
        const classes = {
            ["wui-font-".concat(this.variant)]: true,
            ["wui-color-".concat(this.color)]: true,
            ["wui-line-clamp-".concat(this.lineClamp)]: this.lineClamp ? true : false
        };
        this.style.cssText = "\n      --local-align: ".concat(this.align, ";\n      --local-color: var(--wui-color-").concat(this.color, ");\n    ");
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$directives$2f$class$2d$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["classMap"])(classes));
    }
    constructor(){
        super(...arguments);
        this.variant = 'paragraph-500';
        this.color = 'fg-300';
        this.align = 'left';
        this.lineClamp = undefined;
    }
};
WuiText.styles = [
    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resetStyles"],
    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$components$2f$wui$2d$text$2f$styles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
];
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])()
], WuiText.prototype, "variant", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])()
], WuiText.prototype, "color", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])()
], WuiText.prototype, "align", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])()
], WuiText.prototype, "lineClamp", void 0);
WuiText = __decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WebComponentsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["customElement"])('wui-text')
], WuiText);
;
 //# sourceMappingURL=index.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-alertbar/styles.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@swc/helpers/esm/_tagged_template_literal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/css-tag.js [app-client] (ecmascript)");
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  :host {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    padding: var(--wui-spacing-s);\n    border-radius: var(--wui-border-radius-s);\n    border: 1px solid var(--wui-color-dark-glass-100);\n    box-sizing: border-box;\n    background-color: var(--wui-color-bg-325);\n    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.25);\n  }\n\n  wui-flex {\n    width: 100%;\n  }\n\n  wui-text {\n    word-break: break-word;\n    flex: 1;\n  }\n\n  .close {\n    cursor: pointer;\n  }\n\n  .icon-box {\n    height: 40px;\n    width: 40px;\n    border-radius: var(--wui-border-radius-3xs);\n    background-color: var(--local-icon-bg-value);\n  }\n"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["css"])(_templateObject());
 //# sourceMappingURL=styles.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-alertbar/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WuiAlertBar",
    ()=>WuiAlertBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@swc/helpers/esm/_tagged_template_literal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$element$2f$development$2f$lit$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-element/development/lit-element.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-html/development/lit-html.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2f$decorators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit/decorators.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/decorators/property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AlertController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/AlertController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$components$2f$wui$2d$icon$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/components/wui-icon/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$components$2f$wui$2d$text$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/components/wui-text/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$layout$2f$wui$2d$flex$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/layout/wui-flex/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/ThemeUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WebComponentsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/WebComponentsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$composites$2f$wui$2d$alertbar$2f$styles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-alertbar/styles.js [app-client] (ecmascript)");
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        '\n      <wui-flex flexDirection="row" justifyContent="space-between" alignItems="center">\n        <wui-flex columnGap="xs" flexDirection="row" alignItems="center">\n          <wui-flex\n            flexDirection="row"\n            alignItems="center"\n            justifyContent="center"\n            class="icon-box"\n          >\n            <wui-icon color=',
        ' size="md" name=',
        '></wui-icon>\n          </wui-flex>\n          <wui-text variant="small-500" color="bg-350" data-testid="wui-alertbar-text"\n            >',
        '</wui-text\n          >\n        </wui-flex>\n        <wui-icon\n          class="close"\n          color="bg-350"\n          size="sm"\n          name="close"\n          @click=',
        "\n        ></wui-icon>\n      </wui-flex>\n    "
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
var __decorate = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__decorate || function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
;
;
;
;
;
;
;
;
;
let WuiAlertBar = class WuiAlertBar extends __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$element$2f$development$2f$lit$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LitElement"] {
    render() {
        this.style.cssText = "\n      --local-icon-bg-value: var(--wui-color-".concat(this.backgroundColor, ");\n   ");
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject(), this.iconColor, this.icon, this.message, this.onClose);
    }
    onClose() {
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AlertController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertController"].close();
    }
    constructor(){
        super(...arguments);
        this.message = '';
        this.backgroundColor = 'accent-100';
        this.iconColor = 'accent-100';
        this.icon = 'info';
    }
};
WuiAlertBar.styles = [
    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resetStyles"],
    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$composites$2f$wui$2d$alertbar$2f$styles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
];
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])()
], WuiAlertBar.prototype, "message", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])()
], WuiAlertBar.prototype, "backgroundColor", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])()
], WuiAlertBar.prototype, "iconColor", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])()
], WuiAlertBar.prototype, "icon", void 0);
WuiAlertBar = __decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WebComponentsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["customElement"])('wui-alertbar')
], WuiAlertBar);
;
 //# sourceMappingURL=index.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/exports/wui-alertbar.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$composites$2f$wui$2d$alertbar$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-alertbar/index.js [app-client] (ecmascript)"); //# sourceMappingURL=wui-alertbar.js.map
;
}),
"[project]/frontend/node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-alertbar/styles.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@swc/helpers/esm/_tagged_template_literal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/@lit/reactive-element/development/css-tag.js [app-client] (ecmascript)");
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  :host {\n    display: block;\n    position: absolute;\n    top: var(--wui-spacing-s);\n    left: var(--wui-spacing-l);\n    right: var(--wui-spacing-l);\n    opacity: 0;\n    pointer-events: none;\n  }\n"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["css"])(_templateObject());
 //# sourceMappingURL=styles.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-alertbar/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "W3mAlertBar",
    ()=>W3mAlertBar,
    "presets",
    ()=>presets
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@swc/helpers/esm/_tagged_template_literal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$element$2f$development$2f$lit$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit-element/development/lit-element.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit-html/development/lit-html.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2f$decorators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit/decorators.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$state$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/@lit/reactive-element/development/decorators/state.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AlertController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/AlertController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$exports$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/exports/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WebComponentsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/WebComponentsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$exports$2f$wui$2d$alertbar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/exports/wui-alertbar.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$partials$2f$w3m$2d$alertbar$2f$styles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-alertbar/styles.js [app-client] (ecmascript)");
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "\n      <wui-alertbar\n        message=",
        "\n        backgroundColor=",
        "\n        iconColor=",
        "\n        icon=",
        "\n      ></wui-alertbar>\n    "
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
var __decorate = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__decorate || function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
;
;
;
;
;
;
const presets = {
    info: {
        backgroundColor: 'fg-350',
        iconColor: 'fg-325',
        icon: 'info'
    },
    success: {
        backgroundColor: 'success-glass-reown-020',
        iconColor: 'success-125',
        icon: 'checkmark'
    },
    warning: {
        backgroundColor: 'warning-glass-reown-020',
        iconColor: 'warning-100',
        icon: 'warningCircle'
    },
    error: {
        backgroundColor: 'error-glass-reown-020',
        iconColor: 'error-125',
        icon: 'exclamationTriangle'
    }
};
let W3mAlertBar = class W3mAlertBar extends __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$element$2f$development$2f$lit$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LitElement"] {
    disconnectedCallback() {
        this.unsubscribe.forEach((unsubscribe)=>unsubscribe());
    }
    render() {
        const { message, variant } = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AlertController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertController"].state;
        const preset = presets[variant];
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject(), message, preset === null || preset === void 0 ? void 0 : preset.backgroundColor, preset === null || preset === void 0 ? void 0 : preset.iconColor, preset === null || preset === void 0 ? void 0 : preset.icon);
    }
    onOpen(isMounted) {
        if (this.open) {
            this.animate([
                {
                    opacity: 0,
                    transform: 'scale(0.85)'
                },
                {
                    opacity: 1,
                    transform: 'scale(1)'
                }
            ], {
                duration: 150,
                fill: 'forwards',
                easing: 'ease'
            });
            this.style.cssText = "pointer-events: auto";
        } else if (!isMounted) {
            this.animate([
                {
                    opacity: 1,
                    transform: 'scale(1)'
                },
                {
                    opacity: 0,
                    transform: 'scale(0.85)'
                }
            ], {
                duration: 150,
                fill: 'forwards',
                easing: 'ease'
            });
            this.style.cssText = "pointer-events: none";
        }
    }
    constructor(){
        super();
        this.unsubscribe = [];
        this.open = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AlertController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertController"].state.open;
        this.onOpen(true);
        this.unsubscribe.push(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AlertController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertController"].subscribeKey('open', (val)=>{
            this.open = val;
            this.onOpen(false);
        }));
    }
};
W3mAlertBar.styles = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$partials$2f$w3m$2d$alertbar$2f$styles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$state$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["state"])()
], W3mAlertBar.prototype, "open", void 0);
W3mAlertBar = __decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WebComponentsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["customElement"])('w3m-alertbar')
], W3mAlertBar);
;
 //# sourceMappingURL=index.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-icon-link/styles.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@swc/helpers/esm/_tagged_template_literal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/css-tag.js [app-client] (ecmascript)");
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  button {\n    border-radius: var(--local-border-radius);\n    color: var(--wui-color-fg-100);\n    padding: var(--local-padding);\n  }\n\n  @media (max-width: 700px) {\n    button {\n      padding: var(--wui-spacing-s);\n    }\n  }\n\n  button > wui-icon {\n    pointer-events: none;\n  }\n\n  button:disabled > wui-icon {\n    color: var(--wui-color-bg-300) !important;\n  }\n\n  button:disabled {\n    background-color: transparent;\n  }\n"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["css"])(_templateObject());
 //# sourceMappingURL=styles.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-icon-link/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WuiIconLink",
    ()=>WuiIconLink
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@swc/helpers/esm/_tagged_template_literal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$element$2f$development$2f$lit$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-element/development/lit-element.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-html/development/lit-html.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2f$decorators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit/decorators.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/decorators/property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$components$2f$wui$2d$icon$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/components/wui-icon/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/ThemeUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WebComponentsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/WebComponentsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$composites$2f$wui$2d$icon$2d$link$2f$styles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-icon-link/styles.js [app-client] (ecmascript)");
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "\n      <button ?disabled=",
        ">\n        <wui-icon color=",
        " size=",
        " name=",
        "></wui-icon>\n      </button>\n    "
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
var __decorate = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__decorate || function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
;
;
;
;
;
;
let WuiIconLink = class WuiIconLink extends __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$element$2f$development$2f$lit$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LitElement"] {
    render() {
        const borderRadius = this.size === 'lg' ? '--wui-border-radius-xs' : '--wui-border-radius-xxs';
        const padding = this.size === 'lg' ? '--wui-spacing-1xs' : '--wui-spacing-2xs';
        this.style.cssText = "\n    --local-border-radius: var(".concat(borderRadius, ");\n    --local-padding: var(").concat(padding, ");\n");
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject(), this.disabled, this.iconColor, this.size, this.icon);
    }
    constructor(){
        super(...arguments);
        this.size = 'md';
        this.disabled = false;
        this.icon = 'copy';
        this.iconColor = 'inherit';
    }
};
WuiIconLink.styles = [
    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resetStyles"],
    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["elementStyles"],
    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["colorStyles"],
    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$composites$2f$wui$2d$icon$2d$link$2f$styles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
];
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])()
], WuiIconLink.prototype, "size", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])({
        type: Boolean
    })
], WuiIconLink.prototype, "disabled", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])()
], WuiIconLink.prototype, "icon", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])()
], WuiIconLink.prototype, "iconColor", void 0);
WuiIconLink = __decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WebComponentsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["customElement"])('wui-icon-link')
], WuiIconLink);
;
 //# sourceMappingURL=index.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/exports/wui-icon-link.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$composites$2f$wui$2d$icon$2d$link$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-icon-link/index.js [app-client] (ecmascript)"); //# sourceMappingURL=wui-icon-link.js.map
;
}),
"[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/components/wui-image/styles.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@swc/helpers/esm/_tagged_template_literal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/css-tag.js [app-client] (ecmascript)");
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  :host {\n    display: block;\n    width: var(--local-width);\n    height: var(--local-height);\n  }\n\n  img {\n    display: block;\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    object-position: center center;\n    border-radius: inherit;\n  }\n"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["css"])(_templateObject());
 //# sourceMappingURL=styles.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/components/wui-image/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WuiImage",
    ()=>WuiImage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@swc/helpers/esm/_tagged_template_literal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$element$2f$development$2f$lit$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-element/development/lit-element.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-html/development/lit-html.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2f$decorators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit/decorators.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/decorators/property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/ThemeUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WebComponentsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/WebComponentsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$components$2f$wui$2d$image$2f$styles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/components/wui-image/styles.js [app-client] (ecmascript)");
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<img src=",
        " alt=",
        " @error=",
        " />"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
var __decorate = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__decorate || function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
;
;
;
;
;
let WuiImage = class WuiImage extends __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$element$2f$development$2f$lit$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LitElement"] {
    render() {
        this.style.cssText = "\n      --local-width: ".concat(this.size ? "var(--wui-icon-size-".concat(this.size, ");") : '100%', ";\n      --local-height: ").concat(this.size ? "var(--wui-icon-size-".concat(this.size, ");") : '100%', ";\n      ");
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject(), this.src, this.alt, this.handleImageError);
    }
    handleImageError() {
        this.dispatchEvent(new CustomEvent('onLoadError', {
            bubbles: true,
            composed: true
        }));
    }
    constructor(){
        super(...arguments);
        this.src = './path/to/image.jpg';
        this.alt = 'Image';
        this.size = undefined;
    }
};
WuiImage.styles = [
    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resetStyles"],
    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["colorStyles"],
    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$components$2f$wui$2d$image$2f$styles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
];
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])()
], WuiImage.prototype, "src", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])()
], WuiImage.prototype, "alt", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])()
], WuiImage.prototype, "size", void 0);
WuiImage = __decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WebComponentsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["customElement"])('wui-image')
], WuiImage);
;
 //# sourceMappingURL=index.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-icon-box/styles.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@swc/helpers/esm/_tagged_template_literal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/css-tag.js [app-client] (ecmascript)");
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  :host {\n    display: inline-flex;\n    justify-content: center;\n    align-items: center;\n    position: relative;\n    overflow: hidden;\n    background-color: var(--wui-color-gray-glass-020);\n    border-radius: var(--local-border-radius);\n    border: var(--local-border);\n    box-sizing: content-box;\n    width: var(--local-size);\n    height: var(--local-size);\n    min-height: var(--local-size);\n    min-width: var(--local-size);\n  }\n\n  @supports (background: color-mix(in srgb, white 50%, black)) {\n    :host {\n      background-color: color-mix(in srgb, var(--local-bg-value) var(--local-bg-mix), transparent);\n    }\n  }\n"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["css"])(_templateObject());
 //# sourceMappingURL=styles.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-icon-box/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WuiIconBox",
    ()=>WuiIconBox
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@swc/helpers/esm/_tagged_template_literal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$element$2f$development$2f$lit$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-element/development/lit-element.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-html/development/lit-html.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2f$decorators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit/decorators.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/decorators/property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$components$2f$wui$2d$icon$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/components/wui-icon/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/ThemeUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WebComponentsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/WebComponentsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$composites$2f$wui$2d$icon$2d$box$2f$styles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-icon-box/styles.js [app-client] (ecmascript)");
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        " <wui-icon color=",
        " size=",
        " name=",
        "></wui-icon> "
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
var __decorate = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__decorate || function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
;
;
;
;
;
;
let WuiIconBox = class WuiIconBox extends __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$element$2f$development$2f$lit$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LitElement"] {
    render() {
        const iconSize = this.iconSize || this.size;
        const isLg = this.size === 'lg';
        const isXl = this.size === 'xl';
        const bgMix = isLg ? '12%' : '16%';
        const borderRadius = isLg ? 'xxs' : isXl ? 's' : '3xl';
        const isGray = this.background === 'gray';
        const isOpaque = this.background === 'opaque';
        const isColorChange = this.backgroundColor === 'accent-100' && isOpaque || this.backgroundColor === 'success-100' && isOpaque || this.backgroundColor === 'error-100' && isOpaque || this.backgroundColor === 'inverse-100' && isOpaque;
        let bgValueVariable = "var(--wui-color-".concat(this.backgroundColor, ")");
        if (isColorChange) {
            bgValueVariable = "var(--wui-icon-box-bg-".concat(this.backgroundColor, ")");
        } else if (isGray) {
            bgValueVariable = "var(--wui-color-gray-".concat(this.backgroundColor, ")");
        }
        this.style.cssText = "\n       --local-bg-value: ".concat(bgValueVariable, ";\n       --local-bg-mix: ").concat(isColorChange || isGray ? "100%" : bgMix, ";\n       --local-border-radius: var(--wui-border-radius-").concat(borderRadius, ");\n       --local-size: var(--wui-icon-box-size-").concat(this.size, ");\n       --local-border: ").concat(this.borderColor === 'wui-color-bg-125' ? "2px" : "1px", " solid ").concat(this.border ? "var(--".concat(this.borderColor, ")") : "transparent", "\n   ");
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject(), this.iconColor, iconSize, this.icon);
    }
    constructor(){
        super(...arguments);
        this.size = 'md';
        this.backgroundColor = 'accent-100';
        this.iconColor = 'accent-100';
        this.background = 'transparent';
        this.border = false;
        this.borderColor = 'wui-color-bg-125';
        this.icon = 'copy';
    }
};
WuiIconBox.styles = [
    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resetStyles"],
    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["elementStyles"],
    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$composites$2f$wui$2d$icon$2d$box$2f$styles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
];
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])()
], WuiIconBox.prototype, "size", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])()
], WuiIconBox.prototype, "backgroundColor", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])()
], WuiIconBox.prototype, "iconColor", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])()
], WuiIconBox.prototype, "iconSize", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])()
], WuiIconBox.prototype, "background", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])({
        type: Boolean
    })
], WuiIconBox.prototype, "border", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])()
], WuiIconBox.prototype, "borderColor", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])()
], WuiIconBox.prototype, "icon", void 0);
WuiIconBox = __decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WebComponentsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["customElement"])('wui-icon-box')
], WuiIconBox);
;
 //# sourceMappingURL=index.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-select/styles.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@swc/helpers/esm/_tagged_template_literal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/css-tag.js [app-client] (ecmascript)");
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  button {\n    display: block;\n    display: flex;\n    align-items: center;\n    padding: var(--wui-spacing-xxs);\n    gap: var(--wui-spacing-xxs);\n    transition: all var(--wui-ease-out-power-1) var(--wui-duration-md);\n    border-radius: var(--wui-border-radius-xxs);\n  }\n\n  wui-image {\n    border-radius: 100%;\n    width: var(--wui-spacing-xl);\n    height: var(--wui-spacing-xl);\n  }\n\n  wui-icon-box {\n    width: var(--wui-spacing-xl);\n    height: var(--wui-spacing-xl);\n  }\n\n  button:hover {\n    background-color: var(--wui-color-gray-glass-002);\n  }\n\n  button:active {\n    background-color: var(--wui-color-gray-glass-005);\n  }\n"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["css"])(_templateObject());
 //# sourceMappingURL=styles.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-select/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WuiSelect",
    ()=>WuiSelect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@swc/helpers/esm/_tagged_template_literal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$element$2f$development$2f$lit$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-element/development/lit-element.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-html/development/lit-html.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2f$decorators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit/decorators.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/decorators/property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$components$2f$wui$2d$icon$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/components/wui-icon/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$components$2f$wui$2d$image$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/components/wui-image/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$composites$2f$wui$2d$icon$2d$box$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-icon-box/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/ThemeUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WebComponentsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/WebComponentsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$composites$2f$wui$2d$select$2f$styles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-select/styles.js [app-client] (ecmascript)");
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<button>\n      ",
        '\n      <wui-icon size="xs" color="fg-200" name="chevronBottom"></wui-icon>\n    </button>'
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<wui-image src=",
        ' alt="select visual"></wui-image>'
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
function _templateObject2() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        '<wui-icon-box\n      size="xxs"\n      iconColor="fg-200"\n      backgroundColor="fg-100"\n      background="opaque"\n      icon="networkPlaceholder"\n    ></wui-icon-box>'
    ]);
    _templateObject2 = function() {
        return data;
    };
    return data;
}
var __decorate = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__decorate || function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
;
;
;
;
;
;
;
;
let WuiSelect = class WuiSelect extends __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$element$2f$development$2f$lit$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LitElement"] {
    render() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject(), this.imageTemplate());
    }
    imageTemplate() {
        if (this.imageSrc) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject1(), this.imageSrc);
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject2());
    }
    constructor(){
        super(...arguments);
        this.imageSrc = '';
    }
};
WuiSelect.styles = [
    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resetStyles"],
    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["elementStyles"],
    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["colorStyles"],
    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$composites$2f$wui$2d$select$2f$styles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
];
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])()
], WuiSelect.prototype, "imageSrc", void 0);
WuiSelect = __decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WebComponentsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["customElement"])('wui-select')
], WuiSelect);
;
 //# sourceMappingURL=index.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/exports/wui-select.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$composites$2f$wui$2d$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-select/index.js [app-client] (ecmascript)"); //# sourceMappingURL=wui-select.js.map
;
}),
"[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-tag/styles.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@swc/helpers/esm/_tagged_template_literal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/css-tag.js [app-client] (ecmascript)");
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  :host {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height: var(--wui-spacing-m);\n    padding: 0 var(--wui-spacing-3xs) !important;\n    border-radius: var(--wui-border-radius-5xs);\n    transition:\n      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1),\n      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1);\n    will-change: border-radius, background-color;\n  }\n\n  :host > wui-text {\n    transform: translateY(5%);\n  }\n\n  :host([data-variant='main']) {\n    background-color: var(--wui-color-accent-glass-015);\n    color: var(--wui-color-accent-100);\n  }\n\n  :host([data-variant='shade']) {\n    background-color: var(--wui-color-gray-glass-010);\n    color: var(--wui-color-fg-200);\n  }\n\n  :host([data-variant='success']) {\n    background-color: var(--wui-icon-box-bg-success-100);\n    color: var(--wui-color-success-100);\n  }\n\n  :host([data-variant='error']) {\n    background-color: var(--wui-icon-box-bg-error-100);\n    color: var(--wui-color-error-100);\n  }\n\n  :host([data-size='lg']) {\n    padding: 11px 5px !important;\n  }\n\n  :host([data-size='lg']) > wui-text {\n    transform: translateY(2%);\n  }\n"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["css"])(_templateObject());
 //# sourceMappingURL=styles.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-tag/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WuiTag",
    ()=>WuiTag
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@swc/helpers/esm/_tagged_template_literal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$element$2f$development$2f$lit$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-element/development/lit-element.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-html/development/lit-html.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2f$decorators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit/decorators.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/decorators/property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$components$2f$wui$2d$text$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/components/wui-text/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/ThemeUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WebComponentsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/WebComponentsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$composites$2f$wui$2d$tag$2f$styles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-tag/styles.js [app-client] (ecmascript)");
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "\n      <wui-text data-variant=",
        " variant=",
        ' color="inherit">\n        <slot></slot>\n      </wui-text>\n    '
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
var __decorate = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__decorate || function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
;
;
;
;
;
;
let WuiTag = class WuiTag extends __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$element$2f$development$2f$lit$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LitElement"] {
    render() {
        this.dataset['variant'] = this.variant;
        this.dataset['size'] = this.size;
        const textVariant = this.size === 'md' ? 'mini-700' : 'micro-700';
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject(), this.variant, textVariant);
    }
    constructor(){
        super(...arguments);
        this.variant = 'main';
        this.size = 'lg';
    }
};
WuiTag.styles = [
    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resetStyles"],
    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$composites$2f$wui$2d$tag$2f$styles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
];
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])()
], WuiTag.prototype, "variant", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])()
], WuiTag.prototype, "size", void 0);
WuiTag = __decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WebComponentsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["customElement"])('wui-tag')
], WuiTag);
;
 //# sourceMappingURL=index.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/exports/wui-tag.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$composites$2f$wui$2d$tag$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-tag/index.js [app-client] (ecmascript)"); //# sourceMappingURL=wui-tag.js.map
;
}),
"[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/exports/wui-text.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$components$2f$wui$2d$text$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/components/wui-text/index.js [app-client] (ecmascript)"); //# sourceMappingURL=wui-text.js.map
;
}),
"[project]/frontend/node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-header/styles.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@swc/helpers/esm/_tagged_template_literal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/@lit/reactive-element/development/css-tag.js [app-client] (ecmascript)");
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  :host {\n    height: 64px;\n  }\n\n  wui-text {\n    text-transform: capitalize;\n  }\n\n  wui-flex.w3m-header-title {\n    transform: translateY(0);\n    opacity: 1;\n  }\n\n  wui-flex.w3m-header-title[view-direction='prev'] {\n    animation:\n      slide-down-out 120ms forwards var(--wui-ease-out-power-2),\n      slide-down-in 120ms forwards var(--wui-ease-out-power-2);\n    animation-delay: 0ms, 200ms;\n  }\n\n  wui-flex.w3m-header-title[view-direction='next'] {\n    animation:\n      slide-up-out 120ms forwards var(--wui-ease-out-power-2),\n      slide-up-in 120ms forwards var(--wui-ease-out-power-2);\n    animation-delay: 0ms, 200ms;\n  }\n\n  wui-icon-link[data-hidden='true'] {\n    opacity: 0 !important;\n    pointer-events: none;\n  }\n\n  @keyframes slide-up-out {\n    from {\n      transform: translateY(0px);\n      opacity: 1;\n    }\n    to {\n      transform: translateY(3px);\n      opacity: 0;\n    }\n  }\n\n  @keyframes slide-up-in {\n    from {\n      transform: translateY(-3px);\n      opacity: 0;\n    }\n    to {\n      transform: translateY(0);\n      opacity: 1;\n    }\n  }\n\n  @keyframes slide-down-out {\n    from {\n      transform: translateY(0px);\n      opacity: 1;\n    }\n    to {\n      transform: translateY(-3px);\n      opacity: 0;\n    }\n  }\n\n  @keyframes slide-down-in {\n    from {\n      transform: translateY(3px);\n      opacity: 0;\n    }\n    to {\n      transform: translateY(0);\n      opacity: 1;\n    }\n  }\n"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["css"])(_templateObject());
 //# sourceMappingURL=styles.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-header/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "W3mHeader",
    ()=>W3mHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@swc/helpers/esm/_tagged_template_literal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$element$2f$development$2f$lit$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit-element/development/lit-element.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit-html/development/lit-html.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2f$decorators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit/decorators.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$state$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/@lit/reactive-element/development/decorators/state.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2f$directives$2f$if$2d$defined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit/directives/if-defined.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$directives$2f$if$2d$defined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit-html/development/directives/if-defined.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/AccountController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AssetController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/AssetController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$AssetUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/AssetUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ConnectorController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/EventsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ModalUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/ModalUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/OptionsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/RouterController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$exports$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/exports/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WebComponentsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/WebComponentsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$exports$2f$wui$2d$flex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/exports/wui-flex.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$exports$2f$wui$2d$icon$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/exports/wui-icon-link.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$exports$2f$wui$2d$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/exports/wui-select.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$exports$2f$wui$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/exports/wui-tag.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$exports$2f$wui$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/exports/wui-text.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$partials$2f$w3m$2d$header$2f$styles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-header/styles.js [app-client] (ecmascript)");
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "\n      <wui-flex .padding=",
        ' justifyContent="space-between" alignItems="center">\n        ',
        " ",
        " ",
        "\n      </wui-flex>\n    "
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        '<wui-flex>\n      <wui-icon-link\n        icon="clock"\n        @click=',
        '\n        data-testid="w3m-header-smart-sessions"\n      ></wui-icon-link>\n      ',
        "\n    </wui-flex> "
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
function _templateObject2() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        '\n      <wui-icon-link\n        icon="close"\n        @click=',
        '\n        data-testid="w3m-header-close"\n      ></wui-icon-link>\n    '
    ]);
    _templateObject2 = function() {
        return data;
    };
    return data;
}
function _templateObject3() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        '<wui-tag variant="main">Beta</wui-tag>'
    ]);
    _templateObject3 = function() {
        return data;
    };
    return data;
}
function _templateObject4() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        '\n      <wui-flex\n        view-direction="',
        '"\n        class="w3m-header-title"\n        alignItems="center"\n        gap="xs"\n      >\n        <wui-text variant="paragraph-700" color="fg-100" data-testid="w3m-header-text"\n          >',
        "</wui-text\n        >\n        ",
        "\n      </wui-flex>\n    "
    ]);
    _templateObject4 = function() {
        return data;
    };
    return data;
}
function _templateObject5() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        '<wui-select\n        id="dynamic"\n        data-testid="w3m-account-select-network"\n        active-network=',
        "\n        @click=",
        "\n        imageSrc=",
        "\n      ></wui-select>"
    ]);
    _templateObject5 = function() {
        return data;
    };
    return data;
}
function _templateObject6() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        '<wui-icon-link\n        data-testid="header-back"\n        id="dynamic"\n        icon="chevronLeft"\n        @click=',
        "\n      ></wui-icon-link>"
    ]);
    _templateObject6 = function() {
        return data;
    };
    return data;
}
function _templateObject7() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<wui-icon-link\n      data-hidden=",
        '\n      id="dynamic"\n      icon="helpCircle"\n      @click=',
        "\n    ></wui-icon-link>"
    ]);
    _templateObject7 = function() {
        return data;
    };
    return data;
}
var __decorate = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__decorate || function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
;
;
;
;
;
;
;
;
;
;
;
;
const BETA_SCREENS = [
    'SmartSessionList'
];
function headings() {
    var _RouterController_state_data_connector, _RouterController_state_data, _RouterController_state_data_wallet, _RouterController_state_data1, _RouterController_state_data_network, _RouterController_state_data2, _connectors_;
    const connectorName = (_RouterController_state_data = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].state.data) === null || _RouterController_state_data === void 0 ? void 0 : (_RouterController_state_data_connector = _RouterController_state_data.connector) === null || _RouterController_state_data_connector === void 0 ? void 0 : _RouterController_state_data_connector.name;
    const walletName = (_RouterController_state_data1 = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].state.data) === null || _RouterController_state_data1 === void 0 ? void 0 : (_RouterController_state_data_wallet = _RouterController_state_data1.wallet) === null || _RouterController_state_data_wallet === void 0 ? void 0 : _RouterController_state_data_wallet.name;
    const networkName = (_RouterController_state_data2 = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].state.data) === null || _RouterController_state_data2 === void 0 ? void 0 : (_RouterController_state_data_network = _RouterController_state_data2.network) === null || _RouterController_state_data_network === void 0 ? void 0 : _RouterController_state_data_network.name;
    const name = walletName !== null && walletName !== void 0 ? walletName : connectorName;
    const connectors = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].getConnectors();
    const isEmail = connectors.length === 1 && ((_connectors_ = connectors[0]) === null || _connectors_ === void 0 ? void 0 : _connectors_.id) === 'w3m-email';
    return {
        Connect: "Connect ".concat(isEmail ? 'Email' : '', " Wallet"),
        Create: 'Create Wallet',
        ChooseAccountName: undefined,
        Account: undefined,
        AccountSettings: undefined,
        AllWallets: 'All Wallets',
        ApproveTransaction: 'Approve Transaction',
        BuyInProgress: 'Buy',
        ConnectingExternal: name !== null && name !== void 0 ? name : 'Connect Wallet',
        ConnectingWalletConnect: name !== null && name !== void 0 ? name : 'WalletConnect',
        ConnectingWalletConnectBasic: 'WalletConnect',
        ConnectingSiwe: 'Sign In',
        Convert: 'Convert',
        ConvertSelectToken: 'Select token',
        ConvertPreview: 'Preview convert',
        Downloads: name ? "Get ".concat(name) : 'Downloads',
        EmailLogin: 'Email Login',
        EmailVerifyOtp: 'Confirm Email',
        EmailVerifyDevice: 'Register Device',
        GetWallet: 'Get a wallet',
        Networks: 'Choose Network',
        OnRampProviders: 'Choose Provider',
        OnRampActivity: 'Activity',
        OnRampTokenSelect: 'Select Token',
        OnRampFiatSelect: 'Select Currency',
        Pay: 'How you pay',
        Profile: undefined,
        SwitchNetwork: networkName !== null && networkName !== void 0 ? networkName : 'Switch Network',
        SwitchAddress: 'Switch Address',
        Transactions: 'Activity',
        UnsupportedChain: 'Switch Network',
        UpgradeEmailWallet: 'Upgrade your Wallet',
        UpdateEmailWallet: 'Edit Email',
        UpdateEmailPrimaryOtp: 'Confirm Current Email',
        UpdateEmailSecondaryOtp: 'Confirm New Email',
        WhatIsABuy: 'What is Buy?',
        RegisterAccountName: 'Choose name',
        RegisterAccountNameSuccess: '',
        WalletReceive: 'Receive',
        WalletCompatibleNetworks: 'Compatible Networks',
        Swap: 'Swap',
        SwapSelectToken: 'Select token',
        SwapPreview: 'Preview swap',
        WalletSend: 'Send',
        WalletSendPreview: 'Review send',
        WalletSendSelectToken: 'Select Token',
        WhatIsANetwork: 'What is a network?',
        WhatIsAWallet: 'What is a wallet?',
        ConnectWallets: 'Connect wallet',
        ConnectSocials: 'All socials',
        ConnectingSocial: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.socialProvider ? __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.socialProvider : 'Connect Social',
        ConnectingMultiChain: 'Select chain',
        ConnectingFarcaster: 'Farcaster',
        SwitchActiveChain: 'Switch chain',
        SmartSessionCreated: undefined,
        SmartSessionList: 'Smart Sessions',
        SIWXSignMessage: 'Sign In',
        PayLoading: 'Payment in progress'
    };
}
let W3mHeader = class W3mHeader extends __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$element$2f$development$2f$lit$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LitElement"] {
    disconnectCallback() {
        this.unsubscribe.forEach((unsubscribe)=>unsubscribe());
    }
    render() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject(), this.getPadding(), this.leftHeaderTemplate(), this.titleTemplate(), this.rightHeaderTemplate());
    }
    onWalletHelp() {
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
            type: 'track',
            event: 'CLICK_WALLET_HELP'
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].push('WhatIsAWallet');
    }
    async onClose() {
        await __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ModalUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalUtil"].safeClose();
    }
    rightHeaderTemplate() {
        var _OptionsController_state_features, _OptionsController_state;
        const isSmartSessionsEnabled = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"] === null || __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"] === void 0 ? void 0 : (_OptionsController_state = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state) === null || _OptionsController_state === void 0 ? void 0 : (_OptionsController_state_features = _OptionsController_state.features) === null || _OptionsController_state_features === void 0 ? void 0 : _OptionsController_state_features.smartSessions;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].state.view !== 'Account' || !isSmartSessionsEnabled) {
            return this.closeButtonTemplate();
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject1(), ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].push('SmartSessionList'), this.closeButtonTemplate());
    }
    closeButtonTemplate() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject2(), this.onClose.bind(this));
    }
    titleTemplate() {
        const isBeta = BETA_SCREENS.includes(this.view);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject4(), this.viewDirection, this.headerText, isBeta ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject3()) : null);
    }
    leftHeaderTemplate() {
        const { view } = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].state;
        const isConnectHelp = view === 'Connect';
        const isEmbeddedEnable = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.enableEmbedded;
        const isApproveTransaction = view === 'ApproveTransaction';
        const isConnectingSIWEView = view === 'ConnectingSiwe';
        const isAccountView = view === 'Account';
        const enableNetworkSwitch = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.enableNetworkSwitch;
        const shouldHideBack = isApproveTransaction || isConnectingSIWEView || isConnectHelp && isEmbeddedEnable;
        if (isAccountView && enableNetworkSwitch) {
            var _this_network;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject5(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$directives$2f$if$2d$defined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ifDefined"])((_this_network = this.network) === null || _this_network === void 0 ? void 0 : _this_network.name), this.onNetworks.bind(this), (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$directives$2f$if$2d$defined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ifDefined"])(this.networkImage));
        }
        if (this.showBack && !shouldHideBack) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject6(), this.onGoBack.bind(this));
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject7(), !isConnectHelp, this.onWalletHelp.bind(this));
    }
    onNetworks() {
        if (this.isAllowedNetworkSwitch()) {
            __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
                type: 'track',
                event: 'CLICK_NETWORKS'
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].push('Networks');
        }
    }
    isAllowedNetworkSwitch() {
        const requestedCaipNetworks = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getAllRequestedCaipNetworks();
        const isMultiNetwork = requestedCaipNetworks ? requestedCaipNetworks.length > 1 : false;
        const isValidNetwork = requestedCaipNetworks === null || requestedCaipNetworks === void 0 ? void 0 : requestedCaipNetworks.find((param)=>{
            let { id } = param;
            var _this_network;
            return id === ((_this_network = this.network) === null || _this_network === void 0 ? void 0 : _this_network.id);
        });
        return isMultiNetwork || !isValidNetwork;
    }
    getPadding() {
        if (this.heading) {
            return [
                'l',
                '2l',
                'l',
                '2l'
            ];
        }
        return [
            '0',
            '2l',
            '0',
            '2l'
        ];
    }
    onViewChange() {
        const { history } = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].state;
        let direction = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].VIEW_DIRECTION.Next;
        if (history.length < this.prevHistoryLength) {
            direction = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].VIEW_DIRECTION.Prev;
        }
        this.prevHistoryLength = history.length;
        this.viewDirection = direction;
    }
    async onHistoryChange() {
        var _this_shadowRoot;
        const { history } = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].state;
        const buttonEl = (_this_shadowRoot = this.shadowRoot) === null || _this_shadowRoot === void 0 ? void 0 : _this_shadowRoot.querySelector('#dynamic');
        if (history.length > 1 && !this.showBack && buttonEl) {
            await buttonEl.animate([
                {
                    opacity: 1
                },
                {
                    opacity: 0
                }
            ], {
                duration: 200,
                fill: 'forwards',
                easing: 'ease'
            }).finished;
            this.showBack = true;
            buttonEl.animate([
                {
                    opacity: 0
                },
                {
                    opacity: 1
                }
            ], {
                duration: 200,
                fill: 'forwards',
                easing: 'ease'
            });
        } else if (history.length <= 1 && this.showBack && buttonEl) {
            await buttonEl.animate([
                {
                    opacity: 1
                },
                {
                    opacity: 0
                }
            ], {
                duration: 200,
                fill: 'forwards',
                easing: 'ease'
            }).finished;
            this.showBack = false;
            buttonEl.animate([
                {
                    opacity: 0
                },
                {
                    opacity: 1
                }
            ], {
                duration: 200,
                fill: 'forwards',
                easing: 'ease'
            });
        }
    }
    onGoBack() {
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].goBack();
    }
    constructor(){
        super();
        this.unsubscribe = [];
        this.heading = headings()[__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].state.view];
        this.network = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork;
        this.networkImage = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$AssetUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssetUtil"].getNetworkImage(this.network);
        this.showBack = false;
        this.prevHistoryLength = 1;
        this.view = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].state.view;
        this.viewDirection = '';
        this.headerText = headings()[__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].state.view];
        this.unsubscribe.push(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AssetController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssetController"].subscribeNetworkImages(()=>{
            this.networkImage = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$AssetUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssetUtil"].getNetworkImage(this.network);
        }), __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].subscribeKey('view', (val)=>{
            setTimeout(()=>{
                this.view = val;
                this.headerText = headings()[val];
            }, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].ANIMATION_DURATIONS.HeaderText);
            this.onViewChange();
            this.onHistoryChange();
        }), __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].subscribeKey('activeCaipNetwork', (val)=>{
            this.network = val;
            this.networkImage = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$AssetUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssetUtil"].getNetworkImage(this.network);
        }));
    }
};
W3mHeader.styles = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$partials$2f$w3m$2d$header$2f$styles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$state$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["state"])()
], W3mHeader.prototype, "heading", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$state$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["state"])()
], W3mHeader.prototype, "network", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$state$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["state"])()
], W3mHeader.prototype, "networkImage", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$state$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["state"])()
], W3mHeader.prototype, "showBack", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$state$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["state"])()
], W3mHeader.prototype, "prevHistoryLength", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$state$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["state"])()
], W3mHeader.prototype, "view", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$state$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["state"])()
], W3mHeader.prototype, "viewDirection", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$state$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["state"])()
], W3mHeader.prototype, "headerText", void 0);
W3mHeader = __decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WebComponentsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["customElement"])('w3m-header')
], W3mHeader);
;
 //# sourceMappingURL=index.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/components/wui-loading-spinner/styles.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@swc/helpers/esm/_tagged_template_literal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/css-tag.js [app-client] (ecmascript)");
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  :host {\n    display: flex;\n  }\n\n  :host([data-size='sm']) > svg {\n    width: 12px;\n    height: 12px;\n  }\n\n  :host([data-size='md']) > svg {\n    width: 16px;\n    height: 16px;\n  }\n\n  :host([data-size='lg']) > svg {\n    width: 24px;\n    height: 24px;\n  }\n\n  :host([data-size='xl']) > svg {\n    width: 32px;\n    height: 32px;\n  }\n\n  svg {\n    animation: rotate 2s linear infinite;\n  }\n\n  circle {\n    fill: none;\n    stroke: var(--local-color);\n    stroke-width: 4px;\n    stroke-dasharray: 1, 124;\n    stroke-dashoffset: 0;\n    stroke-linecap: round;\n    animation: dash 1.5s ease-in-out infinite;\n  }\n\n  :host([data-size='md']) > svg > circle {\n    stroke-width: 6px;\n  }\n\n  :host([data-size='sm']) > svg > circle {\n    stroke-width: 8px;\n  }\n\n  @keyframes rotate {\n    100% {\n      transform: rotate(360deg);\n    }\n  }\n\n  @keyframes dash {\n    0% {\n      stroke-dasharray: 1, 124;\n      stroke-dashoffset: 0;\n    }\n\n    50% {\n      stroke-dasharray: 90, 124;\n      stroke-dashoffset: -35;\n    }\n\n    100% {\n      stroke-dashoffset: -125;\n    }\n  }\n"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["css"])(_templateObject());
 //# sourceMappingURL=styles.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/components/wui-loading-spinner/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WuiLoadingSpinner",
    ()=>WuiLoadingSpinner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@swc/helpers/esm/_tagged_template_literal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$element$2f$development$2f$lit$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-element/development/lit-element.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-html/development/lit-html.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2f$decorators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit/decorators.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/decorators/property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/ThemeUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WebComponentsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/WebComponentsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$components$2f$wui$2d$loading$2d$spinner$2f$styles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/components/wui-loading-spinner/styles.js [app-client] (ecmascript)");
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        '<svg viewBox="25 25 50 50">\n      <circle r="20" cy="50" cx="50"></circle>\n    </svg>'
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
var __decorate = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__decorate || function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
;
;
;
;
;
let WuiLoadingSpinner = class WuiLoadingSpinner extends __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$element$2f$development$2f$lit$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LitElement"] {
    render() {
        this.style.cssText = "--local-color: ".concat(this.color === 'inherit' ? 'inherit' : "var(--wui-color-".concat(this.color, ")"));
        this.dataset['size'] = this.size;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject());
    }
    constructor(){
        super(...arguments);
        this.color = 'accent-100';
        this.size = 'lg';
    }
};
WuiLoadingSpinner.styles = [
    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resetStyles"],
    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$components$2f$wui$2d$loading$2d$spinner$2f$styles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
];
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])()
], WuiLoadingSpinner.prototype, "color", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])()
], WuiLoadingSpinner.prototype, "size", void 0);
WuiLoadingSpinner = __decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WebComponentsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["customElement"])('wui-loading-spinner')
], WuiLoadingSpinner);
;
 //# sourceMappingURL=index.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-snackbar/styles.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@swc/helpers/esm/_tagged_template_literal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/css-tag.js [app-client] (ecmascript)");
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  :host {\n    display: flex;\n    column-gap: var(--wui-spacing-s);\n    align-items: center;\n    padding: var(--wui-spacing-xs) var(--wui-spacing-m) var(--wui-spacing-xs) var(--wui-spacing-xs);\n    border-radius: var(--wui-border-radius-s);\n    border: 1px solid var(--wui-color-gray-glass-005);\n    box-sizing: border-box;\n    background-color: var(--wui-color-bg-175);\n    box-shadow:\n      0px 14px 64px -4px rgba(0, 0, 0, 0.15),\n      0px 8px 22px -6px rgba(0, 0, 0, 0.15);\n\n    max-width: 300px;\n  }\n\n  :host wui-loading-spinner {\n    margin-left: var(--wui-spacing-3xs);\n  }\n"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["css"])(_templateObject());
 //# sourceMappingURL=styles.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-snackbar/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WuiSnackbar",
    ()=>WuiSnackbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@swc/helpers/esm/_tagged_template_literal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$element$2f$development$2f$lit$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-element/development/lit-element.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit-html/development/lit-html.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2f$decorators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/lit/decorators.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/node_modules/@lit/reactive-element/development/decorators/property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$components$2f$wui$2d$icon$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/components/wui-icon/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$components$2f$wui$2d$loading$2d$spinner$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/components/wui-loading-spinner/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$components$2f$wui$2d$text$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/components/wui-text/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/ThemeUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WebComponentsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/WebComponentsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$composites$2f$wui$2d$icon$2d$box$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-icon-box/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$composites$2f$wui$2d$snackbar$2f$styles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-snackbar/styles.js [app-client] (ecmascript)");
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "\n      ",
        '\n      <wui-text variant="paragraph-500" color="fg-100" data-testid="wui-snackbar-message"\n        >',
        "</wui-text\n      >\n    "
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        '<wui-loading-spinner size="md" color="accent-100"></wui-loading-spinner>'
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
function _templateObject2() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        '<wui-icon size="xl" color=',
        " name=",
        "></wui-icon>"
    ]);
    _templateObject2 = function() {
        return data;
    };
    return data;
}
function _templateObject3() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        '<wui-icon-box\n      size="sm"\n      iconSize="xs"\n      iconColor=',
        "\n      backgroundColor=",
        "\n      icon=",
        '\n      background="opaque"\n    ></wui-icon-box>'
    ]);
    _templateObject3 = function() {
        return data;
    };
    return data;
}
var __decorate = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__decorate || function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
;
;
;
;
;
;
;
;
;
let WuiSnackbar = class WuiSnackbar extends __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$element$2f$development$2f$lit$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LitElement"] {
    render() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject(), this.templateIcon(), this.message);
    }
    templateIcon() {
        if (this.loading) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject1());
        }
        if (this.iconType === 'default') {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject2(), this.iconColor, this.icon);
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject3(), this.iconColor, this.backgroundColor, this.icon);
    }
    constructor(){
        super(...arguments);
        this.backgroundColor = 'accent-100';
        this.iconColor = 'accent-100';
        this.icon = 'checkmark';
        this.message = '';
        this.loading = false;
        this.iconType = 'default';
    }
};
WuiSnackbar.styles = [
    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resetStyles"],
    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$composites$2f$wui$2d$snackbar$2f$styles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
];
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])()
], WuiSnackbar.prototype, "backgroundColor", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])()
], WuiSnackbar.prototype, "iconColor", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])()
], WuiSnackbar.prototype, "icon", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])()
], WuiSnackbar.prototype, "message", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])()
], WuiSnackbar.prototype, "loading", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])()
], WuiSnackbar.prototype, "iconType", void 0);
WuiSnackbar = __decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WebComponentsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["customElement"])('wui-snackbar')
], WuiSnackbar);
;
 //# sourceMappingURL=index.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/exports/wui-snackbar.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$composites$2f$wui$2d$snackbar$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-snackbar/index.js [app-client] (ecmascript)"); //# sourceMappingURL=wui-snackbar.js.map
;
}),
"[project]/frontend/node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-snackbar/styles.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@swc/helpers/esm/_tagged_template_literal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/@lit/reactive-element/development/css-tag.js [app-client] (ecmascript)");
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  :host {\n    display: block;\n    position: absolute;\n    opacity: 0;\n    pointer-events: none;\n    top: 11px;\n    left: 50%;\n    width: max-content;\n  }\n"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["css"])(_templateObject());
 //# sourceMappingURL=styles.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-snackbar/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "W3mSnackBar",
    ()=>W3mSnackBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@swc/helpers/esm/_tagged_template_literal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$element$2f$development$2f$lit$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit-element/development/lit-element.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit-html/development/lit-html.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2f$decorators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit/decorators.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$state$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/@lit/reactive-element/development/decorators/state.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/SnackController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$exports$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/exports/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WebComponentsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/WebComponentsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$exports$2f$wui$2d$snackbar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/exports/wui-snackbar.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$partials$2f$w3m$2d$snackbar$2f$styles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-snackbar/styles.js [app-client] (ecmascript)");
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "\n      <wui-snackbar\n        message=",
        "\n        backgroundColor=",
        "\n        iconColor=",
        "\n        icon=",
        "\n        .loading=",
        "\n      ></wui-snackbar>\n    "
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
var __decorate = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__decorate || function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
;
;
;
;
;
;
const presets = {
    loading: undefined,
    success: {
        backgroundColor: 'success-100',
        iconColor: 'success-100',
        icon: 'checkmark'
    },
    error: {
        backgroundColor: 'error-100',
        iconColor: 'error-100',
        icon: 'close'
    }
};
let W3mSnackBar = class W3mSnackBar extends __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$element$2f$development$2f$lit$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LitElement"] {
    disconnectedCallback() {
        clearTimeout(this.timeout);
        this.unsubscribe.forEach((unsubscribe)=>unsubscribe());
    }
    render() {
        const { message, variant, svg } = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnackController"].state;
        const preset = presets[variant];
        var _ref;
        const { icon, iconColor } = (_ref = svg !== null && svg !== void 0 ? svg : preset) !== null && _ref !== void 0 ? _ref : {};
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject(), message, preset === null || preset === void 0 ? void 0 : preset.backgroundColor, iconColor, icon, variant === 'loading');
    }
    onOpen() {
        clearTimeout(this.timeout);
        if (this.open) {
            this.animate([
                {
                    opacity: 0,
                    transform: 'translateX(-50%) scale(0.85)'
                },
                {
                    opacity: 1,
                    transform: 'translateX(-50%) scale(1)'
                }
            ], {
                duration: 150,
                fill: 'forwards',
                easing: 'ease'
            });
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
            if (__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnackController"].state.autoClose) {
                this.timeout = setTimeout(()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnackController"].hide(), 2500);
            }
        } else {
            this.animate([
                {
                    opacity: 1,
                    transform: 'translateX(-50%) scale(1)'
                },
                {
                    opacity: 0,
                    transform: 'translateX(-50%) scale(0.85)'
                }
            ], {
                duration: 150,
                fill: 'forwards',
                easing: 'ease'
            });
        }
    }
    constructor(){
        super();
        this.unsubscribe = [];
        this.timeout = undefined;
        this.open = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnackController"].state.open;
        this.unsubscribe.push(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnackController"].subscribeKey('open', (val)=>{
            this.open = val;
            this.onOpen();
        }));
    }
};
W3mSnackBar.styles = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$partials$2f$w3m$2d$snackbar$2f$styles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$state$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["state"])()
], W3mSnackBar.prototype, "open", void 0);
W3mSnackBar = __decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WebComponentsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["customElement"])('w3m-snackbar')
], W3mSnackBar);
;
 //# sourceMappingURL=index.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/TooltipController.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TooltipController",
    ()=>TooltipController
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-controllers/node_modules/valtio/esm/vanilla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-controllers/node_modules/valtio/esm/vanilla/utils.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$withErrorBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/withErrorBoundary.js [app-client] (ecmascript)");
;
;
;
// -- State --------------------------------------------- //
const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])({
    message: '',
    open: false,
    triggerRect: {
        width: 0,
        height: 0,
        top: 0,
        left: 0
    },
    variant: 'shade'
});
// -- Controller ---------------------------------------- //
const controller = {
    state,
    subscribe (callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribe"])(state, ()=>callback(state));
    },
    subscribeKey (key, callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["subscribeKey"])(state, key, callback);
    },
    showTooltip (param) {
        let { message, triggerRect, variant } = param;
        state.open = true;
        state.message = message;
        state.triggerRect = triggerRect;
        state.variant = variant;
    },
    hide () {
        state.open = false;
        state.message = '';
        state.triggerRect = {
            width: 0,
            height: 0,
            top: 0,
            left: 0
        };
    }
};
const TooltipController = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$withErrorBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withErrorBoundary"])(controller); //# sourceMappingURL=TooltipController.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/exports/wui-icon.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$components$2f$wui$2d$icon$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/components/wui-icon/index.js [app-client] (ecmascript)"); //# sourceMappingURL=wui-icon.js.map
;
}),
"[project]/frontend/node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-tooltip/styles.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@swc/helpers/esm/_tagged_template_literal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/@lit/reactive-element/development/css-tag.js [app-client] (ecmascript)");
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  :host {\n    pointer-events: none;\n  }\n\n  :host > wui-flex {\n    display: var(--w3m-tooltip-display);\n    opacity: var(--w3m-tooltip-opacity);\n    padding: 9px var(--wui-spacing-s) 10px var(--wui-spacing-s);\n    border-radius: var(--wui-border-radius-xxs);\n    color: var(--wui-color-bg-100);\n    position: fixed;\n    top: var(--w3m-tooltip-top);\n    left: var(--w3m-tooltip-left);\n    transform: translate(calc(-50% + var(--w3m-tooltip-parent-width)), calc(-100% - 8px));\n    max-width: calc(var(--w3m-modal-width) - var(--wui-spacing-xl));\n    transition: opacity 0.2s var(--wui-ease-out-power-2);\n    will-change: opacity;\n  }\n\n  :host([data-variant='shade']) > wui-flex {\n    background-color: var(--wui-color-bg-150);\n    border: 1px solid var(--wui-color-gray-glass-005);\n  }\n\n  :host([data-variant='shade']) > wui-flex > wui-text {\n    color: var(--wui-color-fg-150);\n  }\n\n  :host([data-variant='fill']) > wui-flex {\n    background-color: var(--wui-color-fg-100);\n    border: none;\n  }\n\n  wui-icon {\n    position: absolute;\n    width: 12px !important;\n    height: 4px !important;\n    color: var(--wui-color-bg-150);\n  }\n\n  wui-icon[data-placement='top'] {\n    bottom: 0px;\n    left: 50%;\n    transform: translate(-50%, 95%);\n  }\n\n  wui-icon[data-placement='bottom'] {\n    top: 0;\n    left: 50%;\n    transform: translate(-50%, -95%) rotate(180deg);\n  }\n\n  wui-icon[data-placement='right'] {\n    top: 50%;\n    left: 0;\n    transform: translate(-65%, -50%) rotate(90deg);\n  }\n\n  wui-icon[data-placement='left'] {\n    top: 50%;\n    right: 0%;\n    transform: translate(65%, -50%) rotate(270deg);\n  }\n"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["css"])(_templateObject());
 //# sourceMappingURL=styles.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-tooltip/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "W3mTooltip",
    ()=>W3mTooltip
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@swc/helpers/esm/_tagged_template_literal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$element$2f$development$2f$lit$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit-element/development/lit-element.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit-html/development/lit-html.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2f$decorators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit/decorators.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$state$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/@lit/reactive-element/development/decorators/state.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$TooltipController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/TooltipController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$exports$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/exports/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WebComponentsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/WebComponentsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$exports$2f$wui$2d$flex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/exports/wui-flex.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$exports$2f$wui$2d$icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/exports/wui-icon.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$exports$2f$wui$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/exports/wui-text.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$partials$2f$w3m$2d$tooltip$2f$styles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-tooltip/styles.js [app-client] (ecmascript)");
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        '<wui-flex>\n      <wui-icon data-placement="top" color="fg-100" size="inherit" name="cursor"></wui-icon>\n      <wui-text color="inherit" variant="small-500">',
        "</wui-text>\n    </wui-flex>"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
var __decorate = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__decorate || function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
;
;
;
;
;
;
;
;
let W3mTooltip = class W3mTooltip extends __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$element$2f$development$2f$lit$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LitElement"] {
    disconnectedCallback() {
        this.unsubscribe.forEach((unsubscribe)=>unsubscribe());
    }
    render() {
        this.dataset['variant'] = this.variant;
        const topValue = this.triggerRect.top;
        const leftValue = this.triggerRect.left;
        this.style.cssText = "\n    --w3m-tooltip-top: ".concat(topValue, "px;\n    --w3m-tooltip-left: ").concat(leftValue, "px;\n    --w3m-tooltip-parent-width: ").concat(this.triggerRect.width / 2, "px;\n    --w3m-tooltip-display: ").concat(this.open ? 'flex' : 'none', ";\n    --w3m-tooltip-opacity: ").concat(this.open ? 1 : 0, ";\n    ");
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject(), this.message);
    }
    constructor(){
        super();
        this.unsubscribe = [];
        this.open = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$TooltipController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipController"].state.open;
        this.message = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$TooltipController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipController"].state.message;
        this.triggerRect = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$TooltipController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipController"].state.triggerRect;
        this.variant = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$TooltipController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipController"].state.variant;
        this.unsubscribe.push(...[
            __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$TooltipController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipController"].subscribe((newState)=>{
                this.open = newState.open;
                this.message = newState.message;
                this.triggerRect = newState.triggerRect;
                this.variant = newState.variant;
            })
        ]);
    }
};
W3mTooltip.styles = [
    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$partials$2f$w3m$2d$tooltip$2f$styles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
];
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$state$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["state"])()
], W3mTooltip.prototype, "open", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$state$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["state"])()
], W3mTooltip.prototype, "message", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$state$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["state"])()
], W3mTooltip.prototype, "triggerRect", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$state$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["state"])()
], W3mTooltip.prototype, "variant", void 0);
W3mTooltip = __decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WebComponentsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["customElement"])('w3m-tooltip'),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WebComponentsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["customElement"])('w3m-tooltip')
], W3mTooltip);
;
 //# sourceMappingURL=index.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-scaffold-ui/dist/esm/src/modal/w3m-router/styles.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@swc/helpers/esm/_tagged_template_literal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/@lit/reactive-element/development/css-tag.js [app-client] (ecmascript)");
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  :host {\n    --prev-height: 0px;\n    --new-height: 0px;\n    display: block;\n  }\n\n  div.w3m-router-container {\n    transform: translateY(0);\n    opacity: 1;\n  }\n\n  div.w3m-router-container[view-direction='prev'] {\n    animation:\n      slide-left-out 150ms forwards ease,\n      slide-left-in 150ms forwards ease;\n    animation-delay: 0ms, 200ms;\n  }\n\n  div.w3m-router-container[view-direction='next'] {\n    animation:\n      slide-right-out 150ms forwards ease,\n      slide-right-in 150ms forwards ease;\n    animation-delay: 0ms, 200ms;\n  }\n\n  @keyframes slide-left-out {\n    from {\n      transform: translateX(0px);\n      opacity: 1;\n    }\n    to {\n      transform: translateX(10px);\n      opacity: 0;\n    }\n  }\n\n  @keyframes slide-left-in {\n    from {\n      transform: translateX(-10px);\n      opacity: 0;\n    }\n    to {\n      transform: translateX(0);\n      opacity: 1;\n    }\n  }\n\n  @keyframes slide-right-out {\n    from {\n      transform: translateX(0px);\n      opacity: 1;\n    }\n    to {\n      transform: translateX(-10px);\n      opacity: 0;\n    }\n  }\n\n  @keyframes slide-right-in {\n    from {\n      transform: translateX(10px);\n      opacity: 0;\n    }\n    to {\n      transform: translateX(0);\n      opacity: 1;\n    }\n  }\n"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["css"])(_templateObject());
 //# sourceMappingURL=styles.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-scaffold-ui/dist/esm/src/modal/w3m-router/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "W3mRouter",
    ()=>W3mRouter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@swc/helpers/esm/_tagged_template_literal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$element$2f$development$2f$lit$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit-element/development/lit-element.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit-html/development/lit-html.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2f$decorators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit/decorators.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$state$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/@lit/reactive-element/development/decorators/state.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/RouterController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$TooltipController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/TooltipController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$exports$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/exports/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WebComponentsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/WebComponentsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$modal$2f$w3m$2d$router$2f$styles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/dist/esm/src/modal/w3m-router/styles.js [app-client] (ecmascript)");
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        '<div class="w3m-router-container" view-direction="',
        '">\n      ',
        "\n    </div>"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-account-settings-view></w3m-account-settings-view>"
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
function _templateObject2() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-account-view></w3m-account-view>"
    ]);
    _templateObject2 = function() {
        return data;
    };
    return data;
}
function _templateObject3() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-all-wallets-view></w3m-all-wallets-view>"
    ]);
    _templateObject3 = function() {
        return data;
    };
    return data;
}
function _templateObject4() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-approve-transaction-view></w3m-approve-transaction-view>"
    ]);
    _templateObject4 = function() {
        return data;
    };
    return data;
}
function _templateObject5() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-buy-in-progress-view></w3m-buy-in-progress-view>"
    ]);
    _templateObject5 = function() {
        return data;
    };
    return data;
}
function _templateObject6() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-choose-account-name-view></w3m-choose-account-name-view>"
    ]);
    _templateObject6 = function() {
        return data;
    };
    return data;
}
function _templateObject7() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-connect-view></w3m-connect-view>"
    ]);
    _templateObject7 = function() {
        return data;
    };
    return data;
}
function _templateObject8() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        '<w3m-connect-view walletGuide="explore"></w3m-connect-view>'
    ]);
    _templateObject8 = function() {
        return data;
    };
    return data;
}
function _templateObject9() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-connecting-wc-view></w3m-connecting-wc-view>"
    ]);
    _templateObject9 = function() {
        return data;
    };
    return data;
}
function _templateObject10() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-connecting-wc-basic-view></w3m-connecting-wc-basic-view>"
    ]);
    _templateObject10 = function() {
        return data;
    };
    return data;
}
function _templateObject11() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-connecting-external-view></w3m-connecting-external-view>"
    ]);
    _templateObject11 = function() {
        return data;
    };
    return data;
}
function _templateObject12() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-connecting-siwe-view></w3m-connecting-siwe-view>"
    ]);
    _templateObject12 = function() {
        return data;
    };
    return data;
}
function _templateObject13() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-connect-wallets-view></w3m-connect-wallets-view>"
    ]);
    _templateObject13 = function() {
        return data;
    };
    return data;
}
function _templateObject14() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-connect-socials-view></w3m-connect-socials-view>"
    ]);
    _templateObject14 = function() {
        return data;
    };
    return data;
}
function _templateObject15() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-connecting-social-view></w3m-connecting-social-view>"
    ]);
    _templateObject15 = function() {
        return data;
    };
    return data;
}
function _templateObject16() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-downloads-view></w3m-downloads-view>"
    ]);
    _templateObject16 = function() {
        return data;
    };
    return data;
}
function _templateObject17() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-email-login-view></w3m-email-login-view>"
    ]);
    _templateObject17 = function() {
        return data;
    };
    return data;
}
function _templateObject18() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-email-verify-otp-view></w3m-email-verify-otp-view>"
    ]);
    _templateObject18 = function() {
        return data;
    };
    return data;
}
function _templateObject19() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-email-verify-device-view></w3m-email-verify-device-view>"
    ]);
    _templateObject19 = function() {
        return data;
    };
    return data;
}
function _templateObject20() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-get-wallet-view></w3m-get-wallet-view>"
    ]);
    _templateObject20 = function() {
        return data;
    };
    return data;
}
function _templateObject21() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-networks-view></w3m-networks-view>"
    ]);
    _templateObject21 = function() {
        return data;
    };
    return data;
}
function _templateObject22() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-network-switch-view></w3m-network-switch-view>"
    ]);
    _templateObject22 = function() {
        return data;
    };
    return data;
}
function _templateObject23() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-profile-view></w3m-profile-view>"
    ]);
    _templateObject23 = function() {
        return data;
    };
    return data;
}
function _templateObject24() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-switch-address-view></w3m-switch-address-view>"
    ]);
    _templateObject24 = function() {
        return data;
    };
    return data;
}
function _templateObject25() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-transactions-view></w3m-transactions-view>"
    ]);
    _templateObject25 = function() {
        return data;
    };
    return data;
}
function _templateObject26() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-onramp-providers-view></w3m-onramp-providers-view>"
    ]);
    _templateObject26 = function() {
        return data;
    };
    return data;
}
function _templateObject27() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-onramp-activity-view></w3m-onramp-activity-view>"
    ]);
    _templateObject27 = function() {
        return data;
    };
    return data;
}
function _templateObject28() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-onramp-token-select-view></w3m-onramp-token-select-view>"
    ]);
    _templateObject28 = function() {
        return data;
    };
    return data;
}
function _templateObject29() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-onramp-fiat-select-view></w3m-onramp-fiat-select-view>"
    ]);
    _templateObject29 = function() {
        return data;
    };
    return data;
}
function _templateObject30() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-upgrade-wallet-view></w3m-upgrade-wallet-view>"
    ]);
    _templateObject30 = function() {
        return data;
    };
    return data;
}
function _templateObject31() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-update-email-wallet-view></w3m-update-email-wallet-view>"
    ]);
    _templateObject31 = function() {
        return data;
    };
    return data;
}
function _templateObject32() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-update-email-primary-otp-view></w3m-update-email-primary-otp-view>"
    ]);
    _templateObject32 = function() {
        return data;
    };
    return data;
}
function _templateObject33() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-update-email-secondary-otp-view></w3m-update-email-secondary-otp-view>"
    ]);
    _templateObject33 = function() {
        return data;
    };
    return data;
}
function _templateObject34() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-unsupported-chain-view></w3m-unsupported-chain-view>"
    ]);
    _templateObject34 = function() {
        return data;
    };
    return data;
}
function _templateObject35() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-swap-view></w3m-swap-view>"
    ]);
    _templateObject35 = function() {
        return data;
    };
    return data;
}
function _templateObject36() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-swap-select-token-view></w3m-swap-select-token-view>"
    ]);
    _templateObject36 = function() {
        return data;
    };
    return data;
}
function _templateObject37() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-swap-preview-view></w3m-swap-preview-view>"
    ]);
    _templateObject37 = function() {
        return data;
    };
    return data;
}
function _templateObject38() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-wallet-send-view></w3m-wallet-send-view>"
    ]);
    _templateObject38 = function() {
        return data;
    };
    return data;
}
function _templateObject39() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-wallet-send-select-token-view></w3m-wallet-send-select-token-view>"
    ]);
    _templateObject39 = function() {
        return data;
    };
    return data;
}
function _templateObject40() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-wallet-send-preview-view></w3m-wallet-send-preview-view>"
    ]);
    _templateObject40 = function() {
        return data;
    };
    return data;
}
function _templateObject41() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-what-is-a-buy-view></w3m-what-is-a-buy-view>"
    ]);
    _templateObject41 = function() {
        return data;
    };
    return data;
}
function _templateObject42() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-wallet-receive-view></w3m-wallet-receive-view>"
    ]);
    _templateObject42 = function() {
        return data;
    };
    return data;
}
function _templateObject43() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-wallet-compatible-networks-view></w3m-wallet-compatible-networks-view>"
    ]);
    _templateObject43 = function() {
        return data;
    };
    return data;
}
function _templateObject44() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-what-is-a-wallet-view></w3m-what-is-a-wallet-view>"
    ]);
    _templateObject44 = function() {
        return data;
    };
    return data;
}
function _templateObject45() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-connecting-multi-chain-view></w3m-connecting-multi-chain-view>"
    ]);
    _templateObject45 = function() {
        return data;
    };
    return data;
}
function _templateObject46() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-what-is-a-network-view></w3m-what-is-a-network-view>"
    ]);
    _templateObject46 = function() {
        return data;
    };
    return data;
}
function _templateObject47() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-connecting-farcaster-view></w3m-connecting-farcaster-view>"
    ]);
    _templateObject47 = function() {
        return data;
    };
    return data;
}
function _templateObject48() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-switch-active-chain-view></w3m-switch-active-chain-view>"
    ]);
    _templateObject48 = function() {
        return data;
    };
    return data;
}
function _templateObject49() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-register-account-name-view></w3m-register-account-name-view>"
    ]);
    _templateObject49 = function() {
        return data;
    };
    return data;
}
function _templateObject50() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-register-account-name-success-view></w3m-register-account-name-success-view>"
    ]);
    _templateObject50 = function() {
        return data;
    };
    return data;
}
function _templateObject51() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-smart-session-created-view></w3m-smart-session-created-view>"
    ]);
    _templateObject51 = function() {
        return data;
    };
    return data;
}
function _templateObject52() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-smart-session-list-view></w3m-smart-session-list-view>"
    ]);
    _templateObject52 = function() {
        return data;
    };
    return data;
}
function _templateObject53() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-siwx-sign-message-view></w3m-siwx-sign-message-view>"
    ]);
    _templateObject53 = function() {
        return data;
    };
    return data;
}
function _templateObject54() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-pay-view></w3m-pay-view>"
    ]);
    _templateObject54 = function() {
        return data;
    };
    return data;
}
function _templateObject55() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-pay-loading-view></w3m-pay-loading-view>"
    ]);
    _templateObject55 = function() {
        return data;
    };
    return data;
}
function _templateObject56() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "<w3m-connect-view></w3m-connect-view>"
    ]);
    _templateObject56 = function() {
        return data;
    };
    return data;
}
var __decorate = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__decorate || function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
;
;
;
;
;
;
let W3mRouter = class W3mRouter extends __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$element$2f$development$2f$lit$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LitElement"] {
    firstUpdated() {
        var _this_resizeObserver;
        this.resizeObserver = new ResizeObserver((param)=>{
            let [content] = param;
            const height = "".concat(content === null || content === void 0 ? void 0 : content.contentRect.height, "px");
            if (this.prevHeight !== '0px') {
                this.style.setProperty('--prev-height', this.prevHeight);
                this.style.setProperty('--new-height', height);
                this.style.animation = 'w3m-view-height 150ms forwards ease';
                this.style.height = 'auto';
            }
            setTimeout(()=>{
                this.prevHeight = height;
                this.style.animation = 'unset';
            }, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].ANIMATION_DURATIONS.ModalHeight);
        });
        (_this_resizeObserver = this.resizeObserver) === null || _this_resizeObserver === void 0 ? void 0 : _this_resizeObserver.observe(this.getWrapper());
    }
    disconnectedCallback() {
        var _this_resizeObserver;
        (_this_resizeObserver = this.resizeObserver) === null || _this_resizeObserver === void 0 ? void 0 : _this_resizeObserver.unobserve(this.getWrapper());
        this.unsubscribe.forEach((unsubscribe)=>unsubscribe());
    }
    render() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject(), this.viewDirection, this.viewTemplate());
    }
    viewTemplate() {
        switch(this.view){
            case 'AccountSettings':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject1());
            case 'Account':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject2());
            case 'AllWallets':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject3());
            case 'ApproveTransaction':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject4());
            case 'BuyInProgress':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject5());
            case 'ChooseAccountName':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject6());
            case 'Connect':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject7());
            case 'Create':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject8());
            case 'ConnectingWalletConnect':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject9());
            case 'ConnectingWalletConnectBasic':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject10());
            case 'ConnectingExternal':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject11());
            case 'ConnectingSiwe':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject12());
            case 'ConnectWallets':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject13());
            case 'ConnectSocials':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject14());
            case 'ConnectingSocial':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject15());
            case 'Downloads':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject16());
            case 'EmailLogin':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject17());
            case 'EmailVerifyOtp':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject18());
            case 'EmailVerifyDevice':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject19());
            case 'GetWallet':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject20());
            case 'Networks':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject21());
            case 'SwitchNetwork':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject22());
            case 'Profile':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject23());
            case 'SwitchAddress':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject24());
            case 'Transactions':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject25());
            case 'OnRampProviders':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject26());
            case 'OnRampActivity':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject27());
            case 'OnRampTokenSelect':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject28());
            case 'OnRampFiatSelect':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject29());
            case 'UpgradeEmailWallet':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject30());
            case 'UpdateEmailWallet':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject31());
            case 'UpdateEmailPrimaryOtp':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject32());
            case 'UpdateEmailSecondaryOtp':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject33());
            case 'UnsupportedChain':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject34());
            case 'Swap':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject35());
            case 'SwapSelectToken':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject36());
            case 'SwapPreview':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject37());
            case 'WalletSend':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject38());
            case 'WalletSendSelectToken':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject39());
            case 'WalletSendPreview':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject40());
            case 'WhatIsABuy':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject41());
            case 'WalletReceive':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject42());
            case 'WalletCompatibleNetworks':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject43());
            case 'WhatIsAWallet':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject44());
            case 'ConnectingMultiChain':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject45());
            case 'WhatIsANetwork':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject46());
            case 'ConnectingFarcaster':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject47());
            case 'SwitchActiveChain':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject48());
            case 'RegisterAccountName':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject49());
            case 'RegisterAccountNameSuccess':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject50());
            case 'SmartSessionCreated':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject51());
            case 'SmartSessionList':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject52());
            case 'SIWXSignMessage':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject53());
            case 'Pay':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject54());
            case 'PayLoading':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject55());
            default:
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject56());
        }
    }
    onViewChange(newView) {
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$TooltipController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipController"].hide();
        let direction = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].VIEW_DIRECTION.Next;
        const { history } = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].state;
        if (history.length < this.prevHistoryLength) {
            direction = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].VIEW_DIRECTION.Prev;
        }
        this.prevHistoryLength = history.length;
        this.viewDirection = direction;
        setTimeout(()=>{
            this.view = newView;
        }, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].ANIMATION_DURATIONS.ViewTransition);
    }
    getWrapper() {
        var _this_shadowRoot;
        return (_this_shadowRoot = this.shadowRoot) === null || _this_shadowRoot === void 0 ? void 0 : _this_shadowRoot.querySelector('div');
    }
    constructor(){
        super();
        this.resizeObserver = undefined;
        this.prevHeight = '0px';
        this.prevHistoryLength = 1;
        this.unsubscribe = [];
        this.view = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].state.view;
        this.viewDirection = '';
        this.unsubscribe.push(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].subscribeKey('view', (val)=>this.onViewChange(val)));
    }
};
W3mRouter.styles = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$modal$2f$w3m$2d$router$2f$styles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$state$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["state"])()
], W3mRouter.prototype, "view", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$state$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["state"])()
], W3mRouter.prototype, "viewDirection", void 0);
W3mRouter = __decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WebComponentsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["customElement"])('w3m-router')
], W3mRouter);
;
 //# sourceMappingURL=index.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-scaffold-ui/dist/esm/src/modal/w3m-modal/styles.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@swc/helpers/esm/_tagged_template_literal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/@lit/reactive-element/development/css-tag.js [app-client] (ecmascript)");
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  :host {\n    z-index: var(--w3m-z-index);\n    display: block;\n    backface-visibility: hidden;\n    will-change: opacity;\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    pointer-events: none;\n    opacity: 0;\n    background-color: var(--wui-cover);\n    transition: opacity 0.2s var(--wui-ease-out-power-2);\n    will-change: opacity;\n  }\n\n  :host(.open) {\n    opacity: 1;\n  }\n\n  :host(.appkit-modal) {\n    position: relative;\n    pointer-events: unset;\n    background: none;\n    width: 100%;\n    opacity: 1;\n  }\n\n  wui-card {\n    max-width: var(--w3m-modal-width);\n    width: 100%;\n    position: relative;\n    animation: zoom-in 0.2s var(--wui-ease-out-power-2);\n    animation-fill-mode: backwards;\n    outline: none;\n    transition:\n      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1),\n      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1);\n    will-change: border-radius, background-color;\n  }\n\n  :host(.appkit-modal) wui-card {\n    max-width: 400px;\n  }\n\n  wui-card[shake='true'] {\n    animation:\n      zoom-in 0.2s var(--wui-ease-out-power-2),\n      w3m-shake 0.5s var(--wui-ease-out-power-2);\n  }\n\n  wui-flex {\n    overflow-x: hidden;\n    overflow-y: auto;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 100%;\n    height: 100%;\n  }\n\n  @media (max-height: 700px) and (min-width: 431px) {\n    wui-flex {\n      align-items: flex-start;\n    }\n\n    wui-card {\n      margin: var(--wui-spacing-xxl) 0px;\n    }\n  }\n\n  @media (max-width: 430px) {\n    wui-flex {\n      align-items: flex-end;\n    }\n\n    wui-card {\n      max-width: 100%;\n      border-bottom-left-radius: var(--local-border-bottom-mobile-radius);\n      border-bottom-right-radius: var(--local-border-bottom-mobile-radius);\n      border-bottom: none;\n      animation: slide-in 0.2s var(--wui-ease-out-power-2);\n    }\n\n    wui-card[shake='true'] {\n      animation:\n        slide-in 0.2s var(--wui-ease-out-power-2),\n        w3m-shake 0.5s var(--wui-ease-out-power-2);\n    }\n  }\n\n  @keyframes zoom-in {\n    0% {\n      transform: scale(0.95) translateY(0);\n    }\n    100% {\n      transform: scale(1) translateY(0);\n    }\n  }\n\n  @keyframes slide-in {\n    0% {\n      transform: scale(1) translateY(50px);\n    }\n    100% {\n      transform: scale(1) translateY(0);\n    }\n  }\n\n  @keyframes w3m-shake {\n    0% {\n      transform: scale(1) rotate(0deg);\n    }\n    20% {\n      transform: scale(1) rotate(-1deg);\n    }\n    40% {\n      transform: scale(1) rotate(1.5deg);\n    }\n    60% {\n      transform: scale(1) rotate(-1.5deg);\n    }\n    80% {\n      transform: scale(1) rotate(1deg);\n    }\n    100% {\n      transform: scale(1) rotate(0deg);\n    }\n  }\n\n  @keyframes w3m-view-height {\n    from {\n      height: var(--prev-height);\n    }\n    to {\n      height: var(--new-height);\n    }\n  }\n"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["css"])(_templateObject());
 //# sourceMappingURL=styles.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-scaffold-ui/dist/esm/src/modal/w3m-modal/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppKitModal",
    ()=>AppKitModal,
    "W3mModal",
    ()=>W3mModal,
    "W3mModalBase",
    ()=>W3mModalBase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@swc/helpers/esm/_tagged_template_literal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$element$2f$development$2f$lit$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit-element/development/lit-element.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit-html/development/lit-html.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2f$decorators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit/decorators.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/@lit/reactive-element/development/decorators/property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$state$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/@lit/reactive-element/development/decorators/state.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2f$directives$2f$if$2d$defined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit/directives/if-defined.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$directives$2f$if$2d$defined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/node_modules/lit-html/development/directives/if-defined.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ApiController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ConnectorController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/CoreHelperUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ModalController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ModalUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/ModalUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/OptionsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/RouterController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$SIWXUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/SIWXUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/SnackController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ThemeController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ThemeController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$exports$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/exports/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$UiHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/UiHelperUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WebComponentsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/WebComponentsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/ThemeUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$exports$2f$wui$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/exports/wui-card.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$exports$2f$wui$2d$flex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-ui/dist/esm/exports/wui-flex.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$partials$2f$w3m$2d$alertbar$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-alertbar/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$partials$2f$w3m$2d$header$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-header/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$partials$2f$w3m$2d$snackbar$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-snackbar/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$partials$2f$w3m$2d$tooltip$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-tooltip/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$modal$2f$w3m$2d$router$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/dist/esm/src/modal/w3m-router/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$modal$2f$w3m$2d$modal$2f$styles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/dist/esm/src/modal/w3m-modal/styles.js [app-client] (ecmascript)");
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "",
        "\n        <w3m-tooltip></w3m-tooltip> "
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "\n          <wui-flex @click=",
        ' data-testid="w3m-modal-overlay">\n            ',
        "\n          </wui-flex>\n          <w3m-tooltip></w3m-tooltip>\n        "
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
function _templateObject2() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        ' <wui-card\n      shake="',
        '"\n      data-embedded="',
        '"\n      role="alertdialog"\n      aria-modal="true"\n      tabindex="0"\n      data-testid="w3m-modal-card"\n    >\n      <w3m-header></w3m-header>\n      <w3m-router></w3m-router>\n      <w3m-snackbar></w3m-snackbar>\n      <w3m-alertbar></w3m-alertbar>\n    </wui-card>'
    ]);
    _templateObject2 = function() {
        return data;
    };
    return data;
}
var __decorate = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__decorate || function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const SCROLL_LOCK = 'scroll-lock';
class W3mModalBase extends __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$element$2f$development$2f$lit$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LitElement"] {
    firstUpdated() {
        if (this.caipAddress) {
            if (this.enableEmbedded) {
                __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].close();
                this.prefetch();
                return;
            }
            this.onNewAddress(this.caipAddress);
        }
        if (this.open) {
            this.onOpen();
        }
        if (this.enableEmbedded) {
            this.prefetch();
        }
    }
    disconnectedCallback() {
        this.unsubscribe.forEach((unsubscribe)=>unsubscribe());
        this.onRemoveKeyboardListener();
    }
    render() {
        this.style.cssText = "\n      --local-border-bottom-mobile-radius: ".concat(this.enableEmbedded ? 'clamp(0px, var(--wui-border-radius-l), 44px)' : '0px', ";\n    ");
        if (this.enableEmbedded) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject(), this.contentTemplate());
        }
        return this.open ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject1(), this.onOverlayClick.bind(this), this.contentTemplate()) : null;
    }
    contentTemplate() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(_templateObject2(), this.shake, (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f$lit$2d$html$2f$development$2f$directives$2f$if$2d$defined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ifDefined"])(this.enableEmbedded));
    }
    async onOverlayClick(event) {
        if (event.target === event.currentTarget) {
            await this.handleClose();
        }
    }
    async handleClose() {
        await __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ModalUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalUtil"].safeClose();
    }
    initializeTheming() {
        const { themeVariables, themeMode } = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ThemeController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeController"].state;
        const defaultThemeMode = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$UiHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UiHelperUtil"].getColorTheme(themeMode);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initializeTheming"])(themeVariables, defaultThemeMode);
    }
    onClose() {
        this.open = false;
        this.classList.remove('open');
        this.onScrollUnlock();
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnackController"].hide();
        this.onRemoveKeyboardListener();
    }
    onOpen() {
        this.open = true;
        this.classList.add('open');
        this.onScrollLock();
        this.onAddKeyboardListener();
    }
    onScrollLock() {
        const styleTag = document.createElement('style');
        styleTag.dataset['w3m'] = SCROLL_LOCK;
        styleTag.textContent = "\n      body {\n        touch-action: none;\n        overflow: hidden;\n        overscroll-behavior: contain;\n      }\n      w3m-modal {\n        pointer-events: auto;\n      }\n    ";
        document.head.appendChild(styleTag);
    }
    onScrollUnlock() {
        const styleTag = document.head.querySelector('style[data-w3m="'.concat(SCROLL_LOCK, '"]'));
        if (styleTag) {
            styleTag.remove();
        }
    }
    onAddKeyboardListener() {
        var _this_shadowRoot;
        this.abortController = new AbortController();
        const card = (_this_shadowRoot = this.shadowRoot) === null || _this_shadowRoot === void 0 ? void 0 : _this_shadowRoot.querySelector('wui-card');
        card === null || card === void 0 ? void 0 : card.focus();
        window.addEventListener('keydown', (event)=>{
            if (event.key === 'Escape') {
                this.handleClose();
            } else if (event.key === 'Tab') {
                const { tagName } = event.target;
                if (tagName && !tagName.includes('W3M-') && !tagName.includes('WUI-')) {
                    card === null || card === void 0 ? void 0 : card.focus();
                }
            }
        }, this.abortController);
    }
    onRemoveKeyboardListener() {
        var _this_abortController;
        (_this_abortController = this.abortController) === null || _this_abortController === void 0 ? void 0 : _this_abortController.abort();
        this.abortController = undefined;
    }
    async onNewAddress(caipAddress) {
        const isSwitchingNamespace = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.isSwitchingNamespace;
        const nextConnected = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].getPlainAddress(caipAddress);
        const isDisconnectedInSameNamespace = !nextConnected && !isSwitchingNamespace;
        const isSwitchingNamespaceAndConnected = isSwitchingNamespace && nextConnected;
        if (isDisconnectedInSameNamespace) {
            __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].close();
        } else if (isSwitchingNamespaceAndConnected) {
            __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].goBack();
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$SIWXUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SIWXUtil"].initializeIfEnabled();
        this.caipAddress = caipAddress;
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setIsSwitchingNamespace(false);
    }
    onNewNetwork(nextCaipNetwork) {
        var _prevCaipNetwork_caipNetworkId, _nextCaipNetwork_caipNetworkId, _ChainController_getAccountData;
        const prevCaipNetwork = this.caipNetwork;
        const prevCaipNetworkId = prevCaipNetwork === null || prevCaipNetwork === void 0 ? void 0 : (_prevCaipNetwork_caipNetworkId = prevCaipNetwork.caipNetworkId) === null || _prevCaipNetwork_caipNetworkId === void 0 ? void 0 : _prevCaipNetwork_caipNetworkId.toString();
        const prevChainNamespace = prevCaipNetwork === null || prevCaipNetwork === void 0 ? void 0 : prevCaipNetwork.chainNamespace;
        const nextNetworkId = nextCaipNetwork === null || nextCaipNetwork === void 0 ? void 0 : (_nextCaipNetwork_caipNetworkId = nextCaipNetwork.caipNetworkId) === null || _nextCaipNetwork_caipNetworkId === void 0 ? void 0 : _nextCaipNetwork_caipNetworkId.toString();
        const nextChainNamespace = nextCaipNetwork === null || nextCaipNetwork === void 0 ? void 0 : nextCaipNetwork.chainNamespace;
        const networkIdChanged = prevCaipNetworkId !== nextNetworkId;
        const namespaceChanged = prevChainNamespace !== nextChainNamespace;
        const isNetworkChangedInSameNamespace = networkIdChanged && !namespaceChanged;
        const wasUnsupportedNetwork = (prevCaipNetwork === null || prevCaipNetwork === void 0 ? void 0 : prevCaipNetwork.name) === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].UNSUPPORTED_NETWORK_NAME;
        const isConnectingExternal = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].state.view === 'ConnectingExternal';
        const isNotConnected = !((_ChainController_getAccountData = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getAccountData(nextCaipNetwork === null || nextCaipNetwork === void 0 ? void 0 : nextCaipNetwork.chainNamespace)) === null || _ChainController_getAccountData === void 0 ? void 0 : _ChainController_getAccountData.caipAddress);
        const isUnsupportedNetworkScreen = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].state.view === 'UnsupportedChain';
        const isModalOpen = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].state.open;
        let shouldGoBack = false;
        if (isModalOpen && !isConnectingExternal) {
            if (isNotConnected) {
                if (networkIdChanged) {
                    shouldGoBack = true;
                }
            } else if (isUnsupportedNetworkScreen) {
                shouldGoBack = true;
            } else if (isNetworkChangedInSameNamespace && !wasUnsupportedNetwork) {
                shouldGoBack = true;
            }
        }
        if (shouldGoBack && __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].state.view !== 'SIWXSignMessage') {
            __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].goBack();
        }
        this.caipNetwork = nextCaipNetwork;
    }
    prefetch() {
        if (!this.hasPrefetched) {
            __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiController"].prefetch();
            __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiController"].fetchWalletsByPage({
                page: 1
            });
            this.hasPrefetched = true;
        }
    }
    constructor(){
        super();
        this.unsubscribe = [];
        this.abortController = undefined;
        this.hasPrefetched = false;
        this.enableEmbedded = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.enableEmbedded;
        this.open = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].state.open;
        this.caipAddress = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipAddress;
        this.caipNetwork = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork;
        this.shake = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].state.shake;
        this.filterByNamespace = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].state.filterByNamespace;
        this.initializeTheming();
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiController"].prefetchAnalyticsConfig();
        this.unsubscribe.push(...[
            __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].subscribeKey('open', (val)=>val ? this.onOpen() : this.onClose()),
            __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].subscribeKey('shake', (val)=>this.shake = val),
            __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].subscribeKey('activeCaipNetwork', (val)=>this.onNewNetwork(val)),
            __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].subscribeKey('activeCaipAddress', (val)=>this.onNewAddress(val)),
            __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].subscribeKey('enableEmbedded', (val)=>this.enableEmbedded = val),
            __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].subscribeKey('filterByNamespace', (val)=>{
                var _ChainController_getAccountData;
                if (this.filterByNamespace !== val && !((_ChainController_getAccountData = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getAccountData(val)) === null || _ChainController_getAccountData === void 0 ? void 0 : _ChainController_getAccountData.caipAddress)) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiController"].fetchRecommendedWallets();
                    this.filterByNamespace = val;
                }
            })
        ]);
    }
}
W3mModalBase.styles = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$modal$2f$w3m$2d$modal$2f$styles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["property"])({
        type: Boolean
    })
], W3mModalBase.prototype, "enableEmbedded", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$state$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["state"])()
], W3mModalBase.prototype, "open", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$state$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["state"])()
], W3mModalBase.prototype, "caipAddress", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$state$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["state"])()
], W3mModalBase.prototype, "caipNetwork", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$state$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["state"])()
], W3mModalBase.prototype, "shake", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$development$2f$decorators$2f$state$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["state"])()
], W3mModalBase.prototype, "filterByNamespace", void 0);
let W3mModal = class W3mModal extends W3mModalBase {
};
W3mModal = __decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WebComponentsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["customElement"])('w3m-modal')
], W3mModal);
;
let AppKitModal = class AppKitModal extends W3mModalBase {
};
AppKitModal = __decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WebComponentsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["customElement"])('appkit-modal')
], AppKitModal);
;
 //# sourceMappingURL=index.js.map
}),
"[project]/frontend/node_modules/@reown/appkit-scaffold-ui/dist/esm/exports/w3m-modal.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$modal$2f$w3m$2d$modal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/dist/esm/src/modal/w3m-modal/index.js [app-client] (ecmascript)"); //# sourceMappingURL=w3m-modal.js.map
;
}),
"[project]/frontend/node_modules/@reown/appkit-scaffold-ui/dist/esm/exports/w3m-modal.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppKitModal",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$modal$2f$w3m$2d$modal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppKitModal"],
    "W3mModal",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$modal$2f$w3m$2d$modal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mModal"],
    "W3mModalBase",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$modal$2f$w3m$2d$modal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mModalBase"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$exports$2f$w3m$2d$modal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/dist/esm/exports/w3m-modal.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$modal$2f$w3m$2d$modal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reown/appkit-scaffold-ui/dist/esm/src/modal/w3m-modal/index.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=9e883_%40reown_580712cd._.js.map