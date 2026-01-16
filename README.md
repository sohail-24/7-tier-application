### 🔖 Project Context

* **Cluster type**: Self-managed Kubernetes using **kubeadm on AWS EC2**
* **OS**: Ubuntu
* **Nodes**:

  * 1 Control Plane
  * 1 Worker Node
* **CNI**: Calico
* **Philosophy**: GitOps-based architecture (ArgoCD + Helm planned)
* **Database**: ❌ NOT inside Kubernetes (separate DB by design)

---

## ✅ COMPLETED STEPS (Verified & Working)

### 1️⃣ kubeadm Cluster Setup

* kubeadm init completed successfully
* kubeconfig configured for non-root user
* Worker node joined successfully
* Both nodes are **Ready**

```bash
kubectl get nodes
```

✔ Control Plane: Ready
✔ Worker Node: Ready

---

### 2️⃣ CNI (Calico)

* Calico installed
* Pod IPs assigned (`192.168.x.x`)
* Pod-to-pod communication works

```bash
kubectl get pods -n kube-system
```

---

### 3️⃣ Workload Validation

* nginx deployed
* scaled replicas
* pods running correctly

```bash
kubectl create deployment nginx --image=nginx
kubectl scale deployment nginx --replicas=2
kubectl get pods
```

---

### 4️⃣ Metrics Server (⚠️ HARD PART — FIXED)

**Problems faced & fixed:**

* TLS errors
* FailedDiscoveryCheck
* MissingEndpoints
* Port mismatch (10250 vs 4443)
* Service targetPort mismatch
* APIService trust issues
* AWS Security Group blocking node-to-node traffic

**Final Working State:**

* metrics-server Pod: `Running`
* APIService: `True`
* HPA metrics available

```bash
kubectl get apiservices | grep metrics
kubectl top nodes
kubectl top pods
```

✔ Metrics API = **True**

**Important configs (final):**

* metrics-server listens on **4443**
* Service port `443 → targetPort 4443`
* kubelet accessed on **10250**
* SG allows **All traffic from same SG (node ↔ node)**

---

### 5️⃣ HPA (Horizontal Pod Autoscaler)

* Resource requests & limits set
* HPA created successfully

```bash
kubectl set resources deployment nginx \
  --requests=cpu=100m --limits=cpu=200m

kubectl autoscale deployment nginx \
  --cpu-percent=50 --min=1 --max=5

kubectl get hpa
```

✔ HPA object exists
(Load testing pending)

---

### 6️⃣ PodDisruptionBudget (PDB)

* PDB created to ensure availability during disruptions

```yaml
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: nginx-pdb
spec:
  minAvailable: 1
  selector:
    matchLabels:
      app: nginx
```

```bash
kubectl get pdb
```

✔ PDB working

---

### 7️⃣ ClusterIP Service (Internal)

* nginx exposed internally
* Verified via busybox pod

```bash
kubectl expose deployment nginx \
  --name=nginx-clusterip \
  --port=80 \
  --target-port=80 \
  --type=ClusterIP
```

```bash
wget http://nginx-clusterip.default.svc.cluster.local
```

✔ Internal service works

---

### 8️⃣ NetworkPolicies (Zero Trust)

* Default deny policy applied
* Allow traffic ONLY from ingress-nginx namespace

```yaml
# default deny
policyTypes:
- Ingress
```

```yaml
# allow from ingress
namespaceSelector:
  matchLabels:
    kubernetes.io/metadata.name: ingress-nginx
```

```bash
kubectl get networkpolicy
```

✔ Network isolation enforced correctly

---

### 9️⃣ Ingress Controller (NGINX)

* ingress-nginx deployed using bare-metal manifest
* Controller pod running
* IngressClass created

```bash
kubectl get pods -n ingress-nginx
kubectl get svc -n ingress-nginx
```

---

### 🔟 Load Balancer (NodePort-based)

* ingress-nginx exposed via NodePort
* Browser access works

Example:

```
http://<EC2_PUBLIC_IP>:30368
```

✔ Browser shows **Welcome to nginx**

⚠️ Important:

* `http://IP` alone does NOT work
* NodePort must be used
* This is correct for kubeadm (no managed LB)

---

## 📊 CURRENT COMPLETION STATUS

| Step                   | Status          |
| ---------------------- | --------------- |
| 1 → 10                 | ✅ 100% COMPLETE |
| Frontend (React)       | ⏳ Pending       |
| Backend (Node)         | ⏳ Pending       |
| GitOps / ArgoCD / Helm | ⏳ Next phase    |

---

## 🧠 KEY ARCHITECTURAL DECISIONS (DO NOT CHANGE)

* ❌ No database inside Kubernetes
* ✅ Database will be **separate** (RDS or separate EC2)
* ❌ No Skaffold (conflicts with GitOps)
* ✅ GitOps = Git → CI → Image → Helm → ArgoCD → K8s
* Kubernetes only **runs images**, never builds them

---

## 🚀 WHAT TO DO TOMORROW (NEXT STEPS)

### 🔹 Day Next — Application + GitOps Phase

#### 1️⃣ Node Backend

* Simple Express API
* Dockerfile
* Helm chart (Deployment + Service)
* No DB inside cluster (use env vars)

#### 2️⃣ React Frontend

* Modify `src/App.js` (real UI)
* Dockerfile
* Helm chart
* Expose via same Ingress

#### 3️⃣ Helm Charts

* `frontend/`
* `backend/`
* `values.yaml` controls image tag

#### 4️⃣ GitOps Setup

* Install ArgoCD
* Connect Git repo
* Auto-sync enabled

---

## 🗣️ HOW TO CONTINUE TOMORROW (IMPORTANT)

When you come back, just say **ONE line**:

> **“Mentor, continue from React + Node + Helm (cluster already ready)”**

No need to explain anything again.
I will continue **directly from application + GitOps layer**.

---

### ✅ End of Recovery Notes
