import "./index.scss";
import ExternalLink from "@src/shared/components/ExternalLink";

const Redirect: React.FC = () => {
	return (
		<div className="wrapper">
			<p>Select a project to work on</p>
			<div className="btn-grp">
				<ExternalLink
					href="https://intranet.alxswe.com/projects/current"
					className="button"
					text="Current Project"
				/>
				<ExternalLink href="https://intranet.alxswe.com/" className="link" text="Dashboard" />
			</div>
			<p>Need Help!</p>
			<div className="btn-grp">
				<ExternalLink href="https://youtu.be/6FhrEXUd1m4" className="link" text="Tutorial" />
				<ExternalLink href="https://www.twitter.com/amasin76" className="link" text="Contact Developer" />
			</div>
		</div>
	);
};

export default Redirect;
