import{_ as A,c as Q,o as D,a2 as L}from"./chunks/framework.CFHYvIe4.js";const T={mounted(){const f=document.getElementById("generateButton"),s=document.getElementById("copyButton"),q=document.getElementById("generatedCode"),I=document.getElementById("addObjectiveButton"),r=document.getElementById("objectivesContainer"),C=document.getElementById("saveableData"),E=document.getElementById("dataOptionsContainer"),B=document.getElementById("hasRewards"),x=document.getElementById("rewardOptionsContainer"),_=document.getElementById("addItemButton"),k=document.getElementById("itemRewardsContainer");C.addEventListener("change",function(){E.style.display=this.checked?"block":"none"}),B.addEventListener("change",function(){x.style.display=this.checked?"block":"none"}),_.addEventListener("click",function(){const e=document.createElement("div");e.className="item-reward-row",e.innerHTML=`
        <input type="text" class="item-id" placeholder="item.health_potion" />
        <input type="number" class="item-quantity" value="1" min="1" />
        <button type="button" class="remove-item">✕</button>
      `,k.appendChild(e),e.querySelector(".remove-item").addEventListener("click",function(){this.closest(".item-reward-row").remove()})});function w(){document.querySelectorAll(".has-location").forEach(e=>{e.addEventListener("change",function(){const l=this.closest(".objective-details").querySelector(".location-inputs");this.checked?l.classList.remove("hidden"):l.classList.add("hidden")})}),document.querySelectorAll(".remove-objective").forEach(e=>{e.addEventListener("click",function(){r.children.length>1&&this.closest(".objective-row").remove()})})}w(),I.addEventListener("click",function(){const e=document.createElement("div");e.className="objective-row",e.innerHTML=`
        <div class="objective-header">
          <input type="text" class="objective-id" placeholder="objective_${r.children.length+1}" />
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
      `,r.appendChild(e),w()}),f.addEventListener("click",function(){const e=document.getElementById("className").value||"MyCustomQuest",l=document.getElementById("questId").value||"my_custom_quest",u=document.getElementById("questTitle").value||"The Big Adventure",y=document.getElementById("questDescription").value||"Embark on an epic journey!",h=document.getElementById("autoBegin").checked,g=document.getElementById("customIcon").checked,m=document.getElementById("hasRewards").checked,c=document.getElementById("saveableData").checked;let d=null;if(m){const t=document.getElementById("moneyReward").value||0,a=document.getElementById("experienceReward").value||0,n=[];document.querySelectorAll(".item-reward-row").forEach(p=>{const v=p.querySelector(".item-id").value||"item.default",b=p.querySelector(".item-quantity").value||1;n.push({itemId:v,quantity:b})}),d={money:t,experience:a,items:n}}const i=[];document.querySelectorAll(".objective-row").forEach(t=>{const a=t.querySelector(".objective-id").value||`objective_${i.length+1}`,n=t.querySelector(".objective-title").value||"Complete objective",p=t.querySelector(".required-progress").value||1,v=t.querySelector(".has-location").checked;let b=null;if(v){const j=t.querySelector(".pos-x").value||0,$=t.querySelector(".pos-y").value||0,R=t.querySelector(".pos-z").value||0;b={x:j,y:$,z:R}}i.push({id:a,title:n,requiredProgress:p,hasLocation:v,location:b})});const o=S(e,l,u,y,h,g,m,d,c,i);q.textContent=o}),s.addEventListener("click",function(){const e=document.getElementById("generatedCode").textContent;navigator.clipboard.writeText(e).then(()=>{const l=s.textContent;s.textContent="Copied!",setTimeout(()=>{s.textContent=l},2e3)},()=>{s.textContent="Error!"})});function S(e,l,u,y,h,g,m,c,d,i){let o="";if(d&&(o+=`using System;
using S1API.Quests;

/// <summary>
/// Data class for ${e} to store persistent data
/// </summary>
[Serializable]
public class ${e}Data
{
    /// <summary>
    /// Custom value for specific quest behavior
    /// Add your own data fields here as needed
    /// </summary>
    public int CustomValue { get; set; } = 0;
}

`),o+=`using S1API.Quests;
using System;
using System.Linq;
using System.Collections.Generic;
using UnityEngine;

/// <summary>
/// Custom Quest: ${u}
/// </summary>
public class ${e} : Quest
{
    /// <summary>
    /// The title of the quest
    /// </summary>
    protected override string Title => "${u}";
    
    /// <summary>
    /// The description of the quest
    /// </summary>
    protected override string Description => "${y}";
`,h||(o+=`    
    /// <summary>
    /// Whether the quest begins automatically when created
    /// </summary>
    protected override bool AutoBegin => false;
`),g&&(o+=`    
    /// <summary>
    /// Custom icon for the quest
    /// </summary>
    protected override Sprite? QuestIcon => ImageUtils.LoadSprite("mod_folder/${e.toLowerCase()}_icon.png");
`),d&&(o+=`
    /// <summary>
    /// Persistent data for this quest
    /// </summary>
    [SaveableField("QuestData")]
    private ${e}Data _data = new ${e}Data();
`),i.forEach(t=>{const a=t.id.replace(/[^a-zA-Z0-9_]/g,"_");o+=`
    /// <summary>
    /// Quest entry: ${t.title}
    /// </summary>
    private QuestEntry? _${a};`}),o+=`

    /// <summary>
    /// Called when the quest is created
    /// </summary>
    protected override void OnCreated()
    {`,i.forEach(t=>{const a=t.id.replace(/[^a-zA-Z0-9_]/g,"_");let n="null";t.hasLocation&&t.location&&(n=`new Vector3(${t.location.x}f, ${t.location.y}f, ${t.location.z}f)`),o+=`
        // Add quest entry: ${t.title}
        _${a} = AddEntry("${t.title}", ${n});`}),m&&c&&(o+=`

        // Set up rewards on individual quest entries
`,i.length>0)){const a=i[0].id.replace(/[^a-zA-Z0-9_]/g,"_");o+=`        _${a}.OnComplete += () => {
            // Add money
`,c.items&&c.items.length>0&&c.items.forEach(n=>{o+=`            // ItemManager.GiveItem("${n.itemId}", ${n.quantity}); // Give item
`}),o+="        };"}return o+=`
    }`,o+=`
}`,o}}},P=JSON.parse('{"title":"Quest Generator","description":"","frontmatter":{},"headers":[],"relativePath":"code-generator/quest.md","filePath":"code-generator/quest.md","lastUpdated":1756461828000}');function O(f,s,q,I,r,C){return D(),Q("div",null,s[0]||(s[0]=[L("",5)]))}const z=A(T,[["render",O]]);export{P as __pageData,z as default};
