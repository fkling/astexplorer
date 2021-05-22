import React from 'react';
import SettingsRenderer from '../utils/SettingsRenderer';

/**
 * The minimal interface that every parser must implement. This object provides
 * default values/implementations. Methods/properties that must be provided
 * by the parser are mentioned in comments.
 */
export default {
  /**
   * The unique ID of the parser. This is stored in snippets and used to load
   * the parser, so it should never change.
   */
  // id (string)

  /**
   * The name of the parser as diplayed in the UI.
   */
  // displayName (string)

  /**
   * The version of the parser, usually taken from the package.json file of the
   * npm package.
   */
  // version (string)

  /**
   * A URL to the parser's homepage, github page, npm package page, etc. (to
   * link to it in the UI). Usually taken from the package.json file in the
   * npm package.
   */
  // homepage (?string)

  // loadParser
  // parse

  /**
   * Whether or not to surface this parser in the UI.
   */
  showInMenu: true,

  /**
   * Used by `forEachProperty` to skip properties.
   */
  _ignoredProperties: new Set(),

  /**
   * Those properties of an AST node (object) that provide location information
   * so that they can be hidden in the UI if the option is selected.
   */
  locationProps: new Set(),

  /**
   * Those properties of an AST node (object) that provide node name
   * so that they can be hidden in the UI if the option is selected.
   */
  typeProps: new Set(['type']),

  /**
   * Whether or not the provided node should be automatically expanded.
   */
  opensByDefault(_node, _key) {
    return false;
  },

  /**
   * The start and end indicies of the node in the source text. The return value
   * is an array of form `[start, end]`. This is used for highlighting source
   * text and focusing nodes in the tree.
   */
  nodeToRange(node) {
    return node.range;
  },

  /**
   * A more or less human readable name of the node.
   */
  getNodeName(node) {
    if (node && typeof node.type !== 'object') {
      return node.type;
    }
  },

  /**
   * A generator to iterate over each "property" of the node. Overwriting this
   * function allows a parser to expose information from a node if the node
   * is not implemented as plain JavaScript object.
   */
  *forEachProperty(node) {
    if (node && typeof node === 'object') {
      for (let prop in node) {
        if (this._ignoredProperties.has(prop)) {
          continue;
        }
        yield {
          value: node[prop],
          key: prop,
          computed: false,
        }
      }
    }
  },

  /**
   * Many parsers accept settings, usually as plain JavaScript
   * objects, with simple values (boolean, string, number) assigned to
   * properties. We provided a way to describe these options to automatically
   * render a UI for them.
   *
   * The settings configuration object can describe
   *   - boolean options, rendered as checkboxes
   *   - list options, rendered as selectors
   *   - nested option objects.
   *
   * A settings configuration object has the following properties:
   *
   *   - title: A heading that should be rendered above the options, useful
   *            for nested settings objects.
   *   - fields: An array of settings definitions, see blow.
   *   - required: A set of option names whose value cannot change, but should
   *               be shown in the UI to inform the user.
   *   - update: An optional function that gets passed the current settings
   *             object the name of a setting and the new value of the setting.
   *             It should return an updated settings object.
   *             This is mostly useful for nested options where the settings
   *             value should not just be assigned to the name.
   *   - key: Property name in the parent object to which a nested settings
   *          object should be assigned.
   *
   * Field definitions: The `fields` array can contain the following values
   *
   *   - string: A simple boolean option, will be rendered as checkbox
   *   - array: An array of the form
   *            `[<setting name>, <setting values>, <optional value mapper>]`
   *            Will be rendered as selector.
   *      - <setting name>: The name of the setting on the settings object.
   *      - <setting values>: An array of available options
   *      - <value mapper>: An optional function that converts the value
   *                        received from the selector to the correct value
   *                        set on the settings object (useful for e.g. numbers)
   *   - a settings configuration object: Same structured as described above,
   *                                      used to describe nested options.
   *
   */
  _getSettingsConfiguration(defaultOptions) {
    const keys = Object.keys(defaultOptions);
    return keys.length > 0 ?
      {
        fields: keys,
      } :
      null;
  },

  hasSettings() {
    return this._getSettingsConfiguration(this.getDefaultOptions()) != null;
  },

  /**
   * A complete settings object passed to the parser that defines the default
   * value for each option.
   */
  getDefaultOptions() {
    return {};
  },

  /**
   * Defines how to merge default options into current options. While this may
   * not seem necessary, we don't know which version of the options are stored
   * in a snippet or the client browser, so this function is called to ensure
   * that all options are set.
   */
  _mergeDefaultOptions(currentOptions, defaultOptions) {
    return {...defaultOptions, ...currentOptions};
  },

  /**
   * This method is called when the settingds UI is rendered. It is passed the
   * current parser settings and a callback that should be called with the
   * updated settings object.
   */
  renderSettings(settings, onChange) {
    const defaultOptions = this.getDefaultOptions();
    const settingsConfiguration = this._getSettingsConfiguration(
      defaultOptions,
    );
    if (!settingsConfiguration) {
      return null;
    }

    settings = settings == null ?
      defaultOptions :
      this._mergeDefaultOptions(settings, defaultOptions);

    return (
      <SettingsRenderer
        settingsConfiguration={settingsConfiguration}
        parserSettings={settings}
        onChange={onChange}
      />
    );
  },
};
