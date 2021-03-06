import useQueryParam from './use-query-param';

/**
 * Appends current query mapper value to URL
 * @param {string} link url string to be appended with current mapper query param
 */
const useMapperLink = (link = '') => {
  const mapperQuery = useQueryParam('mapper');
  return link.includes('component-example/') ? `${link}${mapperQuery}` : link;
};

export default useMapperLink;
