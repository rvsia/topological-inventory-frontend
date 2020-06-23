import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const NodeWrapper = styled(({ level, ...props }) => <div {...props} />)`
  padding-left: ${({ level }) => (level > 0 ? 24 : 0)}px;
`;

const DefaultRenderComponent = ({ title, level }) =>
  React.createElement(`h${level + 1 <= 6 ? level + 1 : 6}`, {}, title);

DefaultRenderComponent.propTypes = {
  title: PropTypes.node.isRequired,
  level: PropTypes.number,
};

const Node = ({ title, level, children, render, ...node }) => {
  return (
    <NodeWrapper level={level}>
      {render({ title, level, ...node })}
      {children.map((node) => (
        <Node level={level + 1} key={node.id} _ {...node} render={render} />
      ))}
    </NodeWrapper>
  );
};

const nodeShape = {
  title: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
};

nodeShape.children = PropTypes.arrayOf(PropTypes.shape(nodeShape));

Node.propTypes = {
  title: PropTypes.node.isRequired,
  children: PropTypes.arrayOf(PropTypes.shape(nodeShape)),
  level: PropTypes.number,
  render: PropTypes.func,
};

Node.defaultProps = {
  children: [],
  level: 0,
  render: DefaultRenderComponent,
};

export default Node;
