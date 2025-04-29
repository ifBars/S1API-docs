# Quest Generator

::: warning
This generator is still in development and may not function as expected.
:::

Generate boilerplate code for custom quests by filling out the form below.

<div class="generator-form">
  <h3>Quest Info</h3>
  <div class="form-group">
    <label for="className">Class Name:</label>
    <input type="text" id="className" placeholder="MyCustomQuest" />
  </div>
  <div class="form-group">
    <label for="questId">Quest ID:</label>
    <input type="text" id="questId" placeholder="my_custom_quest" />
  </div>
  <div class="form-group">
    <label for="questTitle">Quest Title:</label>
    <input type="text" id="questTitle" placeholder="The Big Adventure" />
  </div>
  <div class="form-group">
    <label for="questDescription">Quest Description:</label>
    <textarea id="questDescription" placeholder="Embark on an epic journey!"></textarea>
  </div>

  <h3>Settings</h3>
  <div class="form-group">
    <label>Quest Settings:</label>
    <div class="checkbox-group grid">
      <div><input type="checkbox" id="autoBegin" checked /><label for="autoBegin">Auto Begin</label></div>
      <div><input type="checkbox" id="customIcon" /><label for="customIcon">Custom Icon</label></div>
      <div><input type="checkbox" id="hasRewards" checked /><label for="hasRewards">Quest Rewards</label></div>
      <div><input type="checkbox" id="saveableData" /><label for="saveableData">Generate Data Class</label></div>
    </div>
  </div>

  <div class="form-group reward-options" id="rewardOptionsContainer" style="display: none;">
    <h3>Rewards</h3>
    <label>Quest Rewards:</label>
    <div class="reward-row">
      <label>Money Reward:</label>
      <input type="number" id="moneyReward" value="500" min="0" />
    </div>
    <div class="reward-row">
      <label>Experience Reward:</label>
      <input type="number" id="experienceReward" value="1000" min="0" />
    </div>
    <div class="reward-row">
      <label>Add Item Rewards:</label>
      <button type="button" id="addItemButton">+ Add Item</button>
    </div>
    <div id="itemRewardsContainer"></div>
  </div>

  <div class="form-group data-options" id="dataOptionsContainer" style="display: none;">
    <h3>Data Options</h3>
    <label>Data class will be generated with the following structure:</label>
    <div class="code-sample">
      <pre><code>[Serializable]
public class YourQuestData
{
    /// Custom value for specific quest behavior
    /// Add your own data fields here as needed
    public int CustomValue { get; set; } = 0;
}</code></pre>
    </div>
  </div>

  <h3>Objectives</h3>
  <div class="form-group">
    <label>Quest Objectives:</label>
    <div id="objectivesContainer">
      <div class="objective-row">
        <div class="objective-header">
          <input type="text" class="objective-id" placeholder="objective_1" />
          <input type="text" class="objective-title" placeholder="Find the artifact" />
          <button type="button" class="remove-objective">✕</button>
        </div>
        <div class="objective-details">
          <div class="objective-setting">
            <label>Required Progress:</label>
            <input type="number" class="required-progress" value="1" min="1" />
          </div>
          <div class="objective-setting">
            <label class="location-toggle">
              <input type="checkbox" class="has-location" />
              Has Location
            </label>
            <div class="location-inputs hidden">
              <input type="number" class="pos-x" placeholder="X" value="0" />
              <input type="number" class="pos-y" placeholder="Y" value="0" />
              <input type="number" class="pos-z" placeholder="Z" value="0" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <button type="button" id="addObjectiveButton">+ Add Objective</button>
  </div>

  <div class="form-group full-width center">
    <button id="generateButton">Generate Code</button>
  </div>
</div>

<div class="code-output">
  <h2 class="center">Generated Code</h2>
  <pre><code id="generatedCode">// Generated code will appear here</code></pre>
  <button id="copyButton" class="center">Copy Code</button>
</div>

<script>
// Will be executed when the page loads
export default {
  mounted() {
    // Get elements
    const generateButton = document.getElementById('generateButton');
    const copyButton = document.getElementById('copyButton');
    const codeOutput = document.getElementById('generatedCode');
    const addObjectiveButton = document.getElementById('addObjectiveButton');
    const objectivesContainer = document.getElementById('objectivesContainer');
    const saveableDataCheckbox = document.getElementById('saveableData');
    const dataOptionsContainer = document.getElementById('dataOptionsContainer');
    const hasRewardsCheckbox = document.getElementById('hasRewards');
    const rewardOptionsContainer = document.getElementById('rewardOptionsContainer');
    const addItemButton = document.getElementById('addItemButton');
    const itemRewardsContainer = document.getElementById('itemRewardsContainer');
    
    // Show/hide data options when saveableData is toggled
    saveableDataCheckbox.addEventListener('change', function() {
      dataOptionsContainer.style.display = this.checked ? 'block' : 'none';
    });
    
    // Show/hide reward options when hasRewards is toggled
    hasRewardsCheckbox.addEventListener('change', function() {
      rewardOptionsContainer.style.display = this.checked ? 'block' : 'none';
    });
    
    // Add new item reward
    addItemButton.addEventListener('click', function() {
      const newItem = document.createElement('div');
      newItem.className = 'item-reward-row';
      newItem.innerHTML = `
        <input type="text" class="item-id" placeholder="item.health_potion" />
        <input type="number" class="item-quantity" value="1" min="1" />
        <button type="button" class="remove-item">✕</button>
      `;
      itemRewardsContainer.appendChild(newItem);
      
      // Add event listener to remove button
      newItem.querySelector('.remove-item').addEventListener('click', function() {
        this.closest('.item-reward-row').remove();
      });
    });
    
    // Add event listeners for location checkboxes
    function setupLocationCheckboxes() {
      document.querySelectorAll('.has-location').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
          const locationInputs = this.closest('.objective-details').querySelector('.location-inputs');
          if (this.checked) {
            locationInputs.classList.remove('hidden');
          } else {
            locationInputs.classList.add('hidden');
          }
        });
      });
      
      document.querySelectorAll('.remove-objective').forEach(button => {
        button.addEventListener('click', function() {
          if (objectivesContainer.children.length > 1) {
            this.closest('.objective-row').remove();
          }
        });
      });
    }
    
    // Initial setup
    setupLocationCheckboxes();
    
    // Add new objective
    addObjectiveButton.addEventListener('click', function() {
      const newObjective = document.createElement('div');
      newObjective.className = 'objective-row';
      newObjective.innerHTML = `
        <div class="objective-header">
          <input type="text" class="objective-id" placeholder="objective_${objectivesContainer.children.length + 1}" />
          <input type="text" class="objective-title" placeholder="Complete objective" />
          <button type="button" class="remove-objective">✕</button>
        </div>
        <div class="objective-details">
          <div class="objective-setting">
            <label>Required Progress:</label>
            <input type="number" class="required-progress" value="1" min="1" />
          </div>
          <div class="objective-setting">
            <label class="location-toggle">
              <input type="checkbox" class="has-location" />
              Has Location
            </label>
            <div class="location-inputs hidden">
              <input type="number" class="pos-x" placeholder="X" value="0" />
              <input type="number" class="pos-y" placeholder="Y" value="0" />
              <input type="number" class="pos-z" placeholder="Z" value="0" />
            </div>
          </div>
        </div>
      `;
      objectivesContainer.appendChild(newObjective);
      setupLocationCheckboxes();
    });
    
    // Generate code
    generateButton.addEventListener('click', function() {
      const className = document.getElementById('className').value || 'MyCustomQuest';
      const questId = document.getElementById('questId').value || 'my_custom_quest';
      const questTitle = document.getElementById('questTitle').value || 'The Big Adventure';
      const questDescription = document.getElementById('questDescription').value || 'Embark on an epic journey!';
      const autoBegin = document.getElementById('autoBegin').checked;
      const customIcon = document.getElementById('customIcon').checked;
      const hasRewards = document.getElementById('hasRewards').checked;
      const saveableData = document.getElementById('saveableData').checked;
      
      // Get reward data
      let rewardData = null;
      if (hasRewards) {
        const moneyReward = document.getElementById('moneyReward').value || 0;
        const experienceReward = document.getElementById('experienceReward').value || 0;
        
        // Get item rewards
        const itemRewards = [];
        document.querySelectorAll('.item-reward-row').forEach(row => {
          const itemId = row.querySelector('.item-id').value || 'item.default';
          const quantity = row.querySelector('.item-quantity').value || 1;
          itemRewards.push({ itemId, quantity });
        });
        
        rewardData = { money: moneyReward, experience: experienceReward, items: itemRewards };
      }
      
      // Get objectives
      const objectives = [];
      document.querySelectorAll('.objective-row').forEach(row => {
        const id = row.querySelector('.objective-id').value || `objective_${objectives.length + 1}`;
        const title = row.querySelector('.objective-title').value || 'Complete objective';
        const requiredProgress = row.querySelector('.required-progress').value || 1;
        const hasLocation = row.querySelector('.has-location').checked;
        let location = null;
        
        if (hasLocation) {
          const x = row.querySelector('.pos-x').value || 0;
          const y = row.querySelector('.pos-y').value || 0;
          const z = row.querySelector('.pos-z').value || 0;
          location = { x, y, z };
        }
        
        objectives.push({ id, title, requiredProgress, hasLocation, location });
      });
      
      const code = generateQuestCode(
        className,
        questId,
        questTitle,
        questDescription,
        autoBegin,
        customIcon,
        hasRewards,
        rewardData,
        saveableData,
        objectives
      );
      
      codeOutput.textContent = code;
    });
    
    // Copy code
    copyButton.addEventListener('click', function() {
      const code = document.getElementById('generatedCode').textContent;
      navigator.clipboard.writeText(code).then(
        () => {
          const originalText = copyButton.textContent;
          copyButton.textContent = 'Copied!';
          setTimeout(() => {
            copyButton.textContent = originalText;
          }, 2000);
        },
        () => {
          copyButton.textContent = 'Error!';
        }
      );
    });
    
    // Generate Quest code
    function generateQuestCode(
      className,
      questId,
      questTitle,
      questDescription,
      autoBegin,
      customIcon,
      hasRewards,
      rewardData,
      saveableData,
      objectives
    ) {
      let code = '';
      
      // Add data class first if enabled
      if (saveableData) {
        code += `using System;
using S1API.Quests;

/// <summary>
/// Data class for ${className} to store persistent data
/// </summary>
[Serializable]
public class ${className}Data
{
    /// <summary>
    /// Custom value for specific quest behavior
    /// Add your own data fields here as needed
    /// </summary>
    public int CustomValue { get; set; } = 0;
}

`;
      }
      
      // Main Quest class
      code += `using S1API.Quests;
using System;
using System.Linq;
using System.Collections.Generic;
using UnityEngine;

/// <summary>
/// Custom Quest: ${questTitle}
/// </summary>
public class ${className} : Quest
{
    /// <summary>
    /// The title of the quest
    /// </summary>
    protected override string Title => "${questTitle}";
    
    /// <summary>
    /// The description of the quest
    /// </summary>
    protected override string Description => "${questDescription}";
`;

      if (!autoBegin) {
        code += `    
    /// <summary>
    /// Whether the quest begins automatically when created
    /// </summary>
    protected override bool AutoBegin => false;
`;
      }
      
      if (customIcon) {
        code += `    
    /// <summary>
    /// Custom icon for the quest
    /// </summary>
    protected override Sprite? QuestIcon => ImageUtils.LoadSprite("mod_folder/${className.toLowerCase()}_icon.png");
`;
      }
      
      // Add saveable data field if needed
      if (saveableData) {
        code += `
    /// <summary>
    /// Persistent data for this quest
    /// </summary>
    [SaveableField("QuestData")]
    private ${className}Data _data = new ${className}Data();
`;
      }
      
      // Add quest entry fields
      objectives.forEach(objective => {
        const safeId = objective.id.replace(/[^a-zA-Z0-9_]/g, '_');
        code += `
    /// <summary>
    /// Quest entry: ${objective.title}
    /// </summary>
    private QuestEntry? _${safeId};`;
      });
      
      // Constructor/initialization methods
      code += `

    /// <summary>
    /// Called when the quest is created
    /// </summary>
    protected override void OnCreated()
    {`;
      
      // Create quest entries
      objectives.forEach(objective => {
        const safeId = objective.id.replace(/[^a-zA-Z0-9_]/g, '_');
        
        let locationParam = "null";
        if (objective.hasLocation && objective.location) {
          locationParam = `new Vector3(${objective.location.x}f, ${objective.location.y}f, ${objective.location.z}f)`;
        }
        
        code += `
        // Add quest entry: ${objective.title}
        _${safeId} = AddEntry("${objective.title}", ${locationParam});`;
      });
      
      // Setup quest rewards
      if (hasRewards && rewardData) {
        code += `

        // Set up rewards on individual quest entries
`;
        
        // Add rewards to the first entry if possible
        if (objectives.length > 0) {
          const firstObjective = objectives[0];
          const safeId = firstObjective.id.replace(/[^a-zA-Z0-9_]/g, '_');
          
          code += `        _${safeId}.OnComplete += () => {
            // Add money
`;
          
          if (rewardData.items && rewardData.items.length > 0) {
            rewardData.items.forEach(item => {
              code += `            // ItemManager.GiveItem("${item.itemId}", ${item.quantity}); // Give item
`;
            });
          }
          
          code += `        };`;
        }
      }
      
      code += `
    }`;
      
      code += `
}`;
      
      return code;
    }
  }
}
</script>

<style>
.generator-form {
  background-color: var(--vp-c-bg-soft);
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px 32px;
}
@media (max-width: 900px) {
  .generator-form {
    grid-template-columns: 1fr;
  }
}
.form-group {
  margin-bottom: 0;
}
.form-group.full-width {
  grid-column: 1 / -1;
}
.center {
  text-align: center;
}
h3 {
  grid-column: 1 / -1;
  margin-top: 24px;
  margin-bottom: 8px;
  font-size: 1.1em;
  color: var(--vp-c-brand);
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 4px;
}
.data-options, .reward-options {
  margin-left: 20px;
  padding: 10px;
  border-left: 3px solid var(--vp-c-brand);
  background-color: var(--vp-c-bg);
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.form-group textarea {
  min-height: 80px;
  resize: vertical;
}

.checkbox-group {
  margin-bottom: 8px;
}

.checkbox-group.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px 24px;
}

@media (max-width: 600px) {
  .checkbox-group.grid {
    grid-template-columns: 1fr;
  }
}

.checkbox-group input[type="checkbox"] {
  margin-right: 8px;
}

.checkbox-group > div {
  display: flex;
  align-items: center;
  gap: 8px;
}

.objective-row {
  margin-bottom: 15px;
  background-color: var(--vp-c-bg);
  border-radius: 4px;
  overflow: hidden;
}

.objective-header {
  display: flex;
  gap: 10px;
  padding: 10px;
  background-color: rgba(0,0,0,0.1);
}

.objective-id {
  width: 30% !important;
}

.objective-title {
  flex: 1;
}

.objective-details {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.objective-setting {
  min-width: 200px;
}

.objective-setting label {
  font-weight: normal;
  display: block;
  margin-bottom: 5px;
}

.location-toggle {
  display: flex;
  align-items: center;
  margin: 0;
  font-weight: normal;
  white-space: nowrap;
}

.location-inputs {
  display: flex;
  gap: 5px;
  margin-top: 5px;
}

.location-inputs input {
  width: 60px;
}

.hidden {
  display: none;
}

.remove-objective, .remove-item {
  background-color: var(--vp-c-danger);
  color: white;
  width: 24px;
  height: 24px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  min-width: 24px;
}

.item-reward-row {
  display: flex;
  gap: 10px;
  margin-bottom: 5px;
  align-items: center;
  padding: 5px;
  background-color: rgba(0,0,0,0.05);
  border-radius: 4px;
}

.item-id {
  flex: 1;
}

.item-quantity {
  width: 60px;
}

.reward-row {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  align-items: center;
}

.reward-row label {
  width: 150px;
  margin-bottom: 0 !important;
}

.reward-row input {
  width: 120px !important;
}

#addObjectiveButton, #addItemButton {
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  margin-top: 10px;
}

button {
  background-color: var(--vp-c-brand);
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

button:hover {
  background-color: var(--vp-c-brand-dark);
}

.code-output {
  margin-top: 30px;
}

.code-output pre {
  background-color: var(--vp-c-bg-soft);
  padding: 15px;
  border-radius: 8px;
  overflow-x: auto;
  white-space: pre-wrap;
}

#copyButton {
  margin-top: 10px;
  background-color: var(--vp-c-gray);
}

#copyButton:hover {
  background-color: var(--vp-c-gray-dark);
}

.code-sample {
  background-color: var(--vp-c-bg);
  padding: 12px;
  border-radius: 6px;
  margin-top: 10px;
  border: 1px solid var(--vp-c-divider);
}

.code-sample pre {
  margin: 0;
}
</style> 