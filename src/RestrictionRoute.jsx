import PropTypes from 'prop-types'
import React from 'react'
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router'

import Restriction from './Restriction'

const RestrictionRoute = ({ conditions, component, render, children, ...props }) => (
  <Route {...props}>
    {(
      conditions.reduceRight((child, condition) => (
        <Restriction {...props} {...condition}>
          {(child)}
        </Restriction>
      ), (
        <Route
          {...props}
          {...{
            component,
            render,
            children,
          }}
        />
      ))
    )}
  </Route>
)

RestrictionRoute.propTypes = {
  conditions: PropTypes.arrayOf(PropTypes.shape({
    not: PropTypes.bool,
    condition: PropTypes.func,
    updateState: PropTypes.func,
    fixState: PropTypes.func,
  })),

  component: PropTypes.func,
  render: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
  ]),
}

RestrictionRoute.defaultProps = {
  conditions: [],
}

const ConnectedRestrictionRoute = withRouter(RestrictionRoute)
ConnectedRestrictionRoute.displayName = 'RestrictionRoute'
export default ConnectedRestrictionRoute