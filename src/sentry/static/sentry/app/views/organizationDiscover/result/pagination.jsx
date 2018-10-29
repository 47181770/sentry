import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import {Flex} from 'grid-emotion';

import Button from 'app/components/button';

export default class Pagination extends React.Component {
  static propTypes = {
    getNextPage: PropTypes.func.isRequired,
    getPreviousPage: PropTypes.func.isRequired,
    previous: PropTypes.string,
    next: PropTypes.string,
    pageLimit: PropTypes.number.isRequired,
    dataLength: PropTypes.number.isRequired,
  };

  getPageNumber() {
    const {next, dataLength, pageLimit} = this.props;
    const endRange = next.split(':')[1];
    console.log(dataLength);

    if (dataLength) {
      const from = endRange - pageLimit + 1;
      const to = dataLength < pageLimit ? from + dataLength : endRange;

      return (
        <NumberResultsShown>
          Results {from} - {to}
        </NumberResultsShown>
      );
    } else {
      return <NumberResultsShown>0 Results</NumberResultsShown>;
    }
  }

  render() {
    const {getPreviousPage, getNextPage, previous, next} = this.props;

    return (
      <React.Fragment>
        <PaginationButtons className="btn-group">
          <Button
            className="btn"
            disabled={!previous}
            size="xsmall"
            icon="icon-chevron-left"
            onClick={getPreviousPage}
          />
          <Button
            className="btn"
            disabled={!next}
            size="xsmall"
            icon="icon-chevron-right"
            onClick={getNextPage}
          />
        </PaginationButtons>
        {next && this.getPageNumber()}
      </React.Fragment>
    );
  }
}

const PaginationButtons = styled(Flex)`
  justify-content: flex-end;
`;

export const NumberResultsShown = styled(Flex)`
  justify-content: flex-end;
  color: ${p => p.theme.gray6};
  font-size: ${p => p.theme.fontSizeSmall};
`;
