import{_ as x,c as I,o as P,a2 as _}from"./chunks/framework.CFHYvIe4.js";const k={mounted(){const v=document.getElementById("aggressiveness"),r=document.getElementById("aggressivenessValue"),y=document.getElementById("generateButton"),a=document.getElementById("copyButton"),h=document.getElementById("generatedCode"),b=document.getElementById("saveableData"),f=document.getElementById("dataOptionsContainer");b.addEventListener("change",function(){f.style.display=this.checked?"block":"none"}),v.addEventListener("input",function(){r.textContent=this.value}),y.addEventListener("click",function(){const t=document.getElementById("className").value||"MyCustomNPC",n=document.getElementById("npcId").value||"my_custom_npc",d=document.getElementById("firstName").value||"John",l=document.getElementById("lastName").value||"Doe",c=document.getElementById("aggressiveness").value,u=document.getElementById("maxHealth").value,m=document.getElementById("sendMessages").checked,p=document.getElementById("invincible").checked,o=document.getElementById("addResponses").checked,i=document.getElementById("onDayPass").checked,g=document.getElementById("customIcon").checked,s=document.getElementById("saveableData").checked,e=C(t,n,d,l,c,u,m,p,o,i,g,s);h.textContent=e}),a.addEventListener("click",function(){const t=document.getElementById("generatedCode").textContent;navigator.clipboard.writeText(t).then(()=>{const n=a.textContent;a.textContent="Copied!",setTimeout(()=>{a.textContent=n},2e3)},()=>{a.textContent="Error!"})});function C(t,n,d,l,c,u,m,p,o,i,g,s){let e="";return s&&(e+=`using System;
using S1API.Entities;

/// <summary>
/// Data class for ${t} to store persistent data
/// </summary>
[Serializable]
public class ${t}Data
{
    /// <summary>
    /// Custom value for specific NPC behavior
    /// Add your own data fields here as needed
    /// </summary>
    public int CustomValue { get; set; } = 0;
}

`),e+=`using S1API.Entities;
using S1API.Messaging;
using System;
using System.Collections.Generic;
using UnityEngine;

/// <summary>
/// Custom NPC: ${d} ${l}
/// </summary>
public class ${t} : NPC
{`,s&&(e+=`
    /// <summary>
    /// Persistent data for this NPC
    /// </summary>
    [SaveableField("NPCData")]
    private ${t}Data _data = new ${t}Data();
`),o&&(e+=`
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
`),i&&(e+=`
    /// <summary>
    /// Tracks the last message day to avoid duplicate messages
    /// </summary>
    private int _lastMessageDay = -1;
`),e+=`
    /// <summary>
    /// Constructor for ${t}
    /// </summary>
    public ${t}() : base("${n}", "${d}", "${l}"${g?", null /* Replace with your custom icon */":""})
    {
        // Initialize NPC properties
        IsInvincible = ${p};
        Aggressiveness = ${c}f;
        MaxHealth = ${u}f;

`,i&&(e+=`        // Subscribe to the day passing event
        GameEvents.OnDayPass += OnDayPass;
`),e+=`    }
`,i&&(e+=`
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
    {`,s&&(e+=`
        // Example of accessing custom data
        _data.CustomValue++;
`),o?e+=`
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
        
        SendTextMessage(_conversationTexts[conversationIndex].message, responses);`:e+=`
        SendTextMessage($"Day {_lastMessageDay}: Hey {S1API.Player.Player.Instance.FirstName}! Hope you're having a good day.");`,e+=`
    }`),o&&(e+=`
    
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
    {`,s&&(e+=`
        // Example of using custom data
        _data.CustomValue++;
`),m&&(e+=`
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
        }`),e+=`
    }`),s&&(e+=`
    
    /// <summary>
    /// Example of a helper method using custom data
    /// </summary>
    public int GetCustomValue()
    {
        return _data.CustomValue;
    }`),e+=`
}`,e}}},D=JSON.parse('{"title":"NPC Generator","description":"","frontmatter":{},"headers":[],"relativePath":"code-generator/npc.md","filePath":"code-generator/npc.md","lastUpdated":1756461828000}');function E(v,r,y,a,h,b){return P(),I("div",null,r[0]||(r[0]=[_("",5)]))}const B=x(k,[["render",E]]);export{D as __pageData,B as default};
