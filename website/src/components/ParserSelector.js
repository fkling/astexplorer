import React from 'react';
import LoadingIndicator from './LoadingIndicator';
import './ParserSelector.css';

export default class ParserSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parsers: [],
      filter: '',
      category: 'All',
      loading: true,
    };

    this._onFilterChange = this._onFilterChange.bind(this);
    this._selectCategory = this._selectCategory.bind(this);
    this._selectParser = this._selectParser.bind(this);
  }

  componentDidMount() {
    this.props.registry.loadParsers().then(parsers => {
      this.setState({
        parsers: parsers,
        filter: '',
        loading: false,
      });
    });
  }

  _onFilterChange(event) {
    this.setState({
      filter: event.target.value,
    });
  }

  _selectCategory(category) {
    this.setState({category, filter: ''});
  }

  _selectParser(id) {
    console.log(id);
    this.props.loadParser(id);
  }

  render() {
    if (this.state.loading) {
      return (
        <div style={{position: 'relative', flexGrow: 1}}>
          <LoadingIndicator visible={true}/>
        </div>
      );
    }

    let parsers = this.state.parsers;
    const groups = [
      'All',
      ...new Set(parsers.map(p => p.category)),
    ];

    if (this.state.category !== 'All') {
      parsers = this.state.parsers.filter(
        p => p.category === this.state.category
      );
    }
    if (this.state.filter) {
      parsers = this.state.parsers.filter(
        p => p.displayName.indexOf(event.target.value) > -1
      );
    }

    return (
      <div id="ParserSelector">
        <h2>Select a parser</h2>
        <div className="nameFilter">
          <input
            value={this.state.filter}
            onChange={this._onFilterChange}
            placeholder="Filter by name..."
          />
        </div>
        <div className="categoryFilter">
          {groups.map(name => (
            <GroupButton
              key={name}
              label={name}
              selected={name === this.state.category}
              onClick={this._selectCategory}
            />
          ))}
        </div>
        <div className="parserList">
          {parsers.map(p => (
            <Parser key={p.name} parser={p} onSelection={this._selectParser} />
          ))}
        </div>
      </div>
    );
  }
}

function GroupButton({label, onClick, selected}) {
  return (
    <button
      className={selected ? 'selected' : ''}
      onClick={() => onClick(label)}>
      {label}
    </button>
  );
}

function Parser({parser, onSelection}) {
  const versions = [
    {name: 'Select...', value: ''},
    ...parser.versions,
  ];
  return (
    <div className="parser">
      <h3>{parser.displayName} <small>{parser.category}</small></h3>
      <p><a href={parser.homepage}>{parser.homepage}</a></p>
      <p>Version:{' '}
        <select
          defaultValue=""
          onChange={e => {
            if (e.target.value !== '') {
              onSelection(e.target.value);
            }
          }}>
          {versions.map(v => <option key={v.name} value={v.value}>{v.name}</option>)}
        </select>
      </p>
    </div>
  );
}

ParserSelector.propTypes = {
  registry: React.PropTypes.object.isRequired,
};
