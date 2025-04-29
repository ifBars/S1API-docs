# NPC Generator

::: warning
This generator is still in development and may not function as expected.
:::

Generate boilerplate code for custom NPCs by filling out the form below.

<div class="generator-form">
  <h3>NPC Info</h3>
  <div class="form-group">
    <label for="className">Class Name:</label>
    <input type="text" id="className" placeholder="MyCustomNPC" />
  </div>
  <div class="form-group">
    <label for="npcId">NPC ID:</label>
    <input type="text" id="npcId" placeholder="my_custom_npc" />
  </div>
  <div class="form-group">
    <label for="firstName">First Name:</label>
    <input type="text" id="firstName" placeholder="John" />
  </div>
  <div class="form-group">
    <label for="lastName">Last Name:</label>
    <input type="text" id="lastName" placeholder="Doe" />
  </div>

  <h3>Properties</h3>
  <div class="form-group">
    <label for="aggressiveness">Aggressiveness (0-1):</label>
    <input type="range" id="aggressiveness" min="0" max="1" step="0.1" value="0.5" />
    <span id="aggressivenessValue">0.5</span>
  </div>
  <div class="form-group">
    <label for="maxHealth">Max Health:</label>
    <input type="number" id="maxHealth" value="100" min="1" max="1000" />
  </div>

  <h3>Features</h3>
  <div class="form-group">
    <label>NPC Features:</label>
    <div class="checkbox-group grid">
      <div><input type="checkbox" id="sendMessages" checked /><label for="sendMessages">Send Messages</label></div>
      <div><input type="checkbox" id="invincible" /><label for="invincible">Invincible</label></div>
      <div><input type="checkbox" id="addResponses" checked /><label for="addResponses">Add Responses</label></div>
      <div><input type="checkbox" id="onDayPass" checked /><label for="onDayPass">Day Pass Event</label></div>
      <div><input type="checkbox" id="customIcon" /><label for="customIcon">Custom Icon</label></div>
      <div><input type="checkbox" id="saveableData" /><label for="saveableData">Generate Data Class</label></div>
    </div>
  </div>

  <div class="form-group data-options" id="dataOptionsContainer" style="display: none;">
    <h3>Data Options</h3>
    <label>Data class will be generated with the following structure:</label>
    <div class="code-sample">
      <pre><code>[Serializable]
public class YourNPCData
{
    /// Custom value for specific NPC behavior
    /// Add your own data fields here as needed
    public int CustomValue { get; set; } = 0;
}</code></pre>
    </div>
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
    const aggressivenessRange = document.getElementById('aggressiveness');
    const aggressivenessValue = document.getElementById('aggressivenessValue');
    const generateButton = document.getElementById('generateButton');
    const copyButton = document.getElementById('copyButton');
    const codeOutput = document.getElementById('generatedCode');
    const saveableDataCheckbox = document.getElementById('saveableData');
    const dataOptionsContainer = document.getElementById('dataOptionsContainer');
    
    // Show/hide data options when saveableData is toggled
    saveableDataCheckbox.addEventListener('change', function() {
      dataOptionsContainer.style.display = this.checked ? 'block' : 'none';
    });
    
    // Update aggressiveness value display
    aggressivenessRange.addEventListener('input', function() {
      aggressivenessValue.textContent = this.value;
    });
    
    // Generate code
    generateButton.addEventListener('click', function() {
      const className = document.getElementById('className').value || 'MyCustomNPC';
      const npcId = document.getElementById('npcId').value || 'my_custom_npc';
      const firstName = document.getElementById('firstName').value || 'John';
      const lastName = document.getElementById('lastName').value || 'Doe';
      const aggressiveness = document.getElementById('aggressiveness').value;
      const maxHealth = document.getElementById('maxHealth').value;
      const sendMessages = document.getElementById('sendMessages').checked;
      const invincible = document.getElementById('invincible').checked;
      const addResponses = document.getElementById('addResponses').checked;
      const onDayPass = document.getElementById('onDayPass').checked;
      const customIcon = document.getElementById('customIcon').checked;
      const saveableData = document.getElementById('saveableData').checked;
      
      const code = generateNPCCode(
        className, 
        npcId, 
        firstName, 
        lastName, 
        aggressiveness, 
        maxHealth, 
        sendMessages, 
        invincible, 
        addResponses, 
        onDayPass,
        customIcon,
        saveableData
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
    
    // Generate NPC code
    function generateNPCCode(
      className, 
      npcId, 
      firstName, 
      lastName, 
      aggressiveness, 
      maxHealth, 
      sendMessages, 
      invincible, 
      addResponses, 
      onDayPass,
      customIcon,
      saveableData
    ) {
      let code = '';
      
      // Add data class first if enabled
      if (saveableData) {
        code += `using System;
using S1API.Entities;

/// <summary>
/// Data class for ${className} to store persistent data
/// </summary>
[Serializable]
public class ${className}Data
{
    /// <summary>
    /// Custom value for specific NPC behavior
    /// Add your own data fields here as needed
    /// </summary>
    public int CustomValue { get; set; } = 0;
}

`;
      }
      
      // Main NPC class
      code += `using S1API.Entities;
using S1API.Messaging;
using System;
using System.Collections.Generic;
using UnityEngine;

/// <summary>
/// Custom NPC: ${firstName} ${lastName}
/// </summary>
public class ${className} : NPC
{`;

      // Add saveable data field if needed
      if (saveableData) {
        code += `
    /// <summary>
    /// Persistent data for this NPC
    /// </summary>
    [SaveableField("NPCData")]
    private ${className}Data _data = new ${className}Data();
`;
      }

      // Add response tracking if using responses
      if (addResponses) {
        code += `
    /// <summary>
    /// Response message tracking
    /// </summary>
    private static readonly (string message, string response)[] _conversationTexts = 
    {
        (
            "Hey there! Nice to meet you.", 
            "Nice to meet you too!"
        ),
        (
            "How can I help you today?", 
            "Just looking around, thanks."
        ),
        (
            "Come back anytime!", 
            ""
        )
    };
`;
      }

      // Add other properties
      if (onDayPass) {
        code += `
    /// <summary>
    /// Tracks the last message day to avoid duplicate messages
    /// </summary>
    private int _lastMessageDay = -1;
`;
      }

      // Constructor using base constructor as per documentation
      code += `
    /// <summary>
    /// Constructor for ${className}
    /// </summary>
    public ${className}() : base("${npcId}", "${firstName}", "${lastName}"${customIcon ? ', null /* Replace with your custom icon */' : ''})
    {
        // Initialize NPC properties
        IsInvincible = ${invincible};
        Aggressiveness = ${aggressiveness}f;
        MaxHealth = ${maxHealth}f;

`;

      // Add day pass event if needed
      if (onDayPass) {
        code += `        // Subscribe to the day passing event
        GameEvents.OnDayPass += OnDayPass;
`;
      }

      code += `    }
`;

      // Add day pass handler if needed
      if (onDayPass) {
        code += `
    /// <summary>
    /// Handles the day passing event
    /// </summary>
    private void OnDayPass(int newDay)
    {
        // Only send a message if we haven't sent one today
        if (newDay != _lastMessageDay)
        {
            _lastMessageDay = newDay;
            SendDailyMessage();
        }
    }
    
    /// <summary>
    /// Sends a daily message to the player
    /// </summary>
    private void SendDailyMessage()
    {`;

        if (saveableData) {
          code += `
        // Example of accessing custom data
        _data.CustomValue++;
`;
        }

        if (addResponses) {
          code += `
        // Get appropriate conversation based on progress
        int conversationIndex = 0;
        
        var responses = new[]
        {
            new Response 
            { 
                Label = "continue", 
                Text = _conversationTexts[conversationIndex].response, 
                OnTriggered = ProgressConversation 
            }
        };
        
        SendTextMessage(_conversationTexts[conversationIndex].message, responses);`;
        } else {
          code += `
        SendTextMessage($"Day {_lastMessageDay}: Hey {S1API.Player.Player.Instance.FirstName}! Hope you're having a good day.");`;
        }

        code += `
    }`;
      }

      // Add response callbacks if needed
      if (addResponses) {
        code += `
    
    /// <summary>
    /// Override to handle responses loaded from save file
    /// </summary>
    protected override void OnResponseLoaded(Response response)
    {
        // Match responses by label and assign callbacks
        switch(response.Label)
        {
            case "continue":
                response.OnTriggered = ProgressConversation;
                break;
        }
    }
    
    /// <summary>
    /// Progresses the conversation with the player
    /// </summary>
    private void ProgressConversation()
    {`;
        
        if (saveableData) {
          code += `
        // Example of using custom data
        _data.CustomValue++;
`;
        }
        
        if (sendMessages) {
          code += `
        // Check if we have more conversation steps
        if (0 < _conversationTexts.Length - 1)
        {
            // Send next conversation step
            int nextIndex = 1;
            SendTextMessage(_conversationTexts[nextIndex].message);
        }
        else
        {
            // Final response
            SendTextMessage("It was nice talking to you!");
        }`;
        }
        
        code += `
    }`;
      }

      // Add example of accessor for custom data if using saveable data
      if (saveableData) {
        code += `
    
    /// <summary>
    /// Example of a helper method using custom data
    /// </summary>
    public int GetCustomValue()
    {
        return _data.CustomValue;
    }`;
      }

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
.data-options {
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
.form-group input[type="number"] {
  width: 100%;
  padding: 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.form-group input[type="range"] {
  width: calc(100% - 30px);
  vertical-align: middle;
}

#aggressivenessValue {
  display: inline-block;
  width: 25px;
  text-align: center;
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