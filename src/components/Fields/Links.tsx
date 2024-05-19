import React from 'react';
import { Link } from 'react-router-dom';
import { Text, Tooltip } from '@mantine/core';
import styles from './styles.module.css'

interface LinkItemProps {
	url: string;
	text: string;
	tooltip?: string;
	openDelay?: number;
	loading?: boolean;

  }

  const LinkItem: React.FC<LinkItemProps> = ({ url, text, tooltip,loading, openDelay = 30 }) => {
	if ((!url || !text) && !loading) return null;
	return (
	  <Tooltip label={tooltip} openDelay={openDelay} disabled={!tooltip}>
		<Link to={url || '/'} key={url} className={styles.link}>
		  {loading? 'Place Holder' : text }
		</Link>
	  </Tooltip>
	);
  };

interface LinksProps {
  links: LinkItemProps[] | LinkItemProps;
  loading?: boolean;
}

const Links: React.FC<LinksProps> = ({ links,loading }) => {
	// if(!links) return null
	const renderLinks = (linksArray: LinkItemProps[]) => {
		return linksArray.map(({ url, text, tooltip, openDelay,  }, index) => (
		  <React.Fragment key={url}>
			<LinkItem url={url} text={text} tooltip={tooltip} openDelay={openDelay} loading={loading} />
			{index < linksArray.length - 1 && ', '}
		  </React.Fragment>
		));
	  };

  return (
    <Text style={{wordBreak:'break-word'}}>
      {Array.isArray(links) ? renderLinks(links) : <LinkItem url={links?.url} text={links?.text} tooltip={links?.tooltip} openDelay={links?.openDelay} loading={loading} />}
    </Text>
  );
};

export default Links;