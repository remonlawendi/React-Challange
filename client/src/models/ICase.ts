import IFeature from "./IFeature";
interface IMedia {
  image_url: string;
  image_thumb: string;
}
interface ISource {
  name: string;
  html_url: string;
}
interface ICase {
  id: number;
  address: string;
  title: string;
  description: string;
  occurred_at: number;
  updated_at: number;
  url: string;
  location_description: string;
  location_type: string;
  media: IMedia;
  source: ISource;
  feature?: IFeature;
}

export default ICase;
