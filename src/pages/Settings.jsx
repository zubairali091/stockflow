import { Settings } from "lucide-react";
import "./Settings.css";

function SettingsPage() {
	return (
		<main className="settings-page">
			<header className="settings-header">
				<span className="settings-eyebrow">WORKSPACE</span>
				<h1>Settings</h1>
				<p>Manage your StockFlow workspace preferences.</p>
			</header>

			<section className="settings-panel" aria-labelledby="preferences-title">
				<div className="settings-panel-heading">
					<span className="settings-panel-icon">
						<Settings size={19} />
					</span>
					<div>
						<h2 id="preferences-title">Preferences</h2>
						<p>Inventory defaults for this workspace.</p>
					</div>
				</div>

				<div className="settings-row">
					<div>
						<h3>Low stock threshold</h3>
						<p>Products at or below this quantity need attention.</p>
					</div>
					<label className="settings-number-field">
						<span className="sr-only">Low stock threshold quantity</span>
						<input type="number" min="0" defaultValue="5" />
						<span>units</span>
					</label>
				</div>

				<div className="settings-row">
					<div>
						<h3>Currency</h3>
						<p>Currency used for inventory values.</p>
					</div>
					<label>
						<span className="sr-only">Currency</span>
						<select defaultValue="PKR">
							<option value="PKR">PKR - Pakistani Rupee</option>
							<option value="USD">USD - US Dollar</option>
						</select>
					</label>
				</div>
			</section>
		</main>
	);
}

export default SettingsPage;
